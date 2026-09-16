/* ===================== AUTH LAYER =====================
   Single abstraction over Supabase auth + user_progress storage.
   While Supabase env vars are missing, we run a LOCAL-ONLY mock that
   persists users + progress to localStorage. The API surface is identical,
   so swapping in the real Supabase client later is a one-import change.

   Public API:
     getCurrentSession()       → { user, profile } | null  (synchronous)
     onAuthChange(cb)          → unsubscribe  (cb gets the latest session)
     signUpWithEmail({ email, password, name }) → { error? }
     signInWithEmail({ email, password })       → { error? }
     signInWithGoogle()                         → { error? }
     signOut()                                  → void
     loadProgress(userId)      → Promise<state>
     saveProgress(userId, st)  → Promise<void>
*/

import { createClient } from '@supabase/supabase-js'

const SB_URL  = import.meta.env.VITE_SUPABASE_URL  || ''
const SB_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const USE_REAL = Boolean(SB_URL && SB_ANON)

/* ===== CLIENT-SIDE RATE LIMITER =====
   Limits sign-in + sign-up to MAX_ATTEMPTS per WINDOW_MS per browser.
   Stored in localStorage so it survives page reloads.
   (Server-side rate limiting is handled by Supabase; this is an
    extra UX layer to give clearer feedback early.) */
const RATE_KEY = 'nova-auth-attempts'
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function _rateLimitCheck() {
  try {
    const raw = localStorage.getItem(RATE_KEY)
    const rec = raw ? JSON.parse(raw) : { count: 0, since: Date.now() }
    if (Date.now() - rec.since > WINDOW_MS) {
      // Window expired — reset
      localStorage.setItem(RATE_KEY, JSON.stringify({ count: 1, since: Date.now() }))
      return null
    }
    if (rec.count >= MAX_ATTEMPTS) {
      const waitMin = Math.ceil((WINDOW_MS - (Date.now() - rec.since)) / 60000)
      // Strukturierter Code statt englischem Satz — die UI übersetzt ihn.
      return { code: 'rate_limited', minutes: waitMin }
    }
    localStorage.setItem(RATE_KEY, JSON.stringify({ count: rec.count + 1, since: rec.since }))
    return null
  } catch { return null }
}

/* Nach einer erfolgreichen Anmeldung den Zähler leeren. Ohne das sperrte sich
   ein Nutzer nach 5 Anmeldungen in 15 Minuten selbst aus — auch nach lauter
   ERFOLGREICHEN Anmeldungen, denn gezählt wurde jeder Versuch. */
function _rateLimitReset() {
  try { localStorage.removeItem(RATE_KEY) } catch {}
}

/* Input validation helpers */
const MAX_EMAIL_LEN = 254
const MAX_PASSWORD_LEN = 128
const MAX_NAME_LEN = 80

function _validateAuthInput({ email, password, name }) {
  if (!email || typeof email !== 'string' || email.length > MAX_EMAIL_LEN)
    return 'Invalid email address.'
  if (!email.includes('@'))
    return 'Invalid email address.'
  if (password !== undefined) {
    if (!password || typeof password !== 'string')
      return 'Password is required.'
    if (password.length < 8)
      return 'Password must be at least 8 characters.'
    if (password.length > MAX_PASSWORD_LEN)
      return 'Password is too long.'
  }
  if (name !== undefined && name && name.length > MAX_NAME_LEN)
    return 'Name is too long.'
  return null
}

let supabase = null
if (USE_REAL) {
  try {
    supabase = createClient(SB_URL, SB_ANON, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  } catch (e) {
    console.warn('[auth] Supabase init failed — falling back to local mock:', e.message)
  }
}

/* ============================================================
   LOCAL MOCK (no Supabase env vars). Stores users + progress in
   localStorage so the UI is fully testable during development. */
const MOCK_USERS_KEY    = 'novoacademy_mock_users'
const MOCK_SESSION_KEY  = 'novoacademy_mock_session'
const MOCK_PROGRESS_KEY = 'novoacademy_mock_progress'

const _loadMockUsers   = () => { try { return JSON.parse(localStorage.getItem(MOCK_USERS_KEY)   || '{}') } catch { return {} } }
const _saveMockUsers   = (u) => { try { localStorage.setItem(MOCK_USERS_KEY,   JSON.stringify(u)) } catch {} }
const _loadMockSession = ()  => { try { return JSON.parse(localStorage.getItem(MOCK_SESSION_KEY) || 'null') } catch { return null } }
const _saveMockSession = (s) => {
  try {
    if (s) localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(s))
    else   localStorage.removeItem(MOCK_SESSION_KEY)
  } catch {}
}
const _loadMockProgress = (uid) => {
  try { return JSON.parse(localStorage.getItem(`${MOCK_PROGRESS_KEY}_${uid}`) || '{}') } catch { return {} }
}
const _saveMockProgress = (uid, p) => {
  try { localStorage.setItem(`${MOCK_PROGRESS_KEY}_${uid}`, JSON.stringify(p)) } catch {}
}

const _uuid = () => {
  try {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
  } catch {
    // Fallback for very old browsers without crypto.getRandomValues
    return 'mock-' + Date.now() + '-' + Math.random().toString(36).slice(2)
  }
}

/* ============================================================
   PUBLIC API */

const listeners = new Set()
let _cachedSession = null

const _emit = () => {
  for (const cb of listeners) {
    try { cb(_cachedSession) } catch {}
  }
}

const _refreshSession = async () => {
  if (USE_REAL && supabase) {
    const { data } = await supabase.auth.getSession()
    if (data?.session?.user) {
      const u = data.session.user
      _cachedSession = {
        user: { id: u.id, email: u.email },
        profile: { name: u.user_metadata?.name || u.user_metadata?.full_name || u.email },
      }
    } else {
      _cachedSession = null
    }
  } else {
    _cachedSession = _loadMockSession()
  }
  return _cachedSession
}

// Initialise synchronously from cache so first render isn't blank
_cachedSession = USE_REAL ? null : _loadMockSession()
if (USE_REAL && supabase) {
  // Hydrate async — components subscribe via onAuthChange
  _refreshSession().then(_emit)
  supabase.auth.onAuthStateChange((_event, _session) => {
    _refreshSession().then(_emit)
  })
}

export const getCurrentSession = () => _cachedSession

export const onAuthChange = (cb) => {
  listeners.add(cb)
  // Fire once immediately with current state
  try { cb(_cachedSession) } catch {}
  return () => listeners.delete(cb)
}

export const signUpWithEmail = async ({ email, password, name }) => {
  const validErr = _validateAuthInput({ email, password, name })
  if (validErr) return { error: validErr }
  const rateErr = _rateLimitCheck()
  if (rateErr) return { error: rateErr }
  if (!email || !password) return { error: 'invalid' }
  if (password.length < 8) return { error: 'weak' }

  if (USE_REAL && supabase) {
    const { data, error } = await supabase.auth.signUp({
      email, password,
      /* Bestätigungslink ausdrücklich zurück auf DIESE Instanz lenken. Ohne
         Angabe nimmt Supabase die Site URL des Projekts — bei der 10X-Instanz
         wäre das die NOVO ACADEMY. Die Adresse muss in Supabase unter
         Authentication → URL Configuration → Redirect URLs erlaubt sein. */
      options: { data: { name }, emailRedirectTo: window.location.origin + (import.meta.env?.BASE_URL || '/') },
    })
    if (error) {
      const msg = String(error.message || '').toLowerCase()
      if (msg.includes('registered') || msg.includes('exists')) return { error: 'taken' }
      return { error: error.message || 'unknown' }
    }
    // With email confirm off, Supabase signs the user in immediately
    return {}
  }

  // ----- Mock -----
  const users = _loadMockUsers()
  if (users[email]) return { error: 'taken' }
  const id = _uuid()
  users[email] = { id, email, password, name: name || email }
  _saveMockUsers(users)
  _cachedSession = { user: { id, email }, profile: { name: name || email } }
  _saveMockSession(_cachedSession)
  _emit()
  return {}
}

export const signInWithEmail = async ({ email, password }) => {
  const validErr = _validateAuthInput({ email, password })
  if (validErr) return { error: validErr }
  const rateErr = _rateLimitCheck()
  if (rateErr) return { error: rateErr }
  if (!email || !password) return { error: 'invalid' }

  if (USE_REAL && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: 'invalid' }
    _rateLimitReset()
    return {}
  }

  // ----- Mock -----
  const users = _loadMockUsers()
  const u = users[email]
  if (!u || u.password !== password) return { error: 'invalid' }
  _rateLimitReset()
  _cachedSession = { user: { id: u.id, email: u.email }, profile: { name: u.name } }
  _saveMockSession(_cachedSession)
  _emit()
  return {}
}

export const signInWithGoogle = async () => {
  if (USE_REAL && supabase) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      /* Muss in Supabase als Redirect URL erlaubt sein, sonst landet man auf der Site URL (NOVO ACADEMY). */
      options: { redirectTo: window.location.origin + window.location.pathname },
    })
    if (error) return { error: error.message }
    return {}
  }
  // Mock: pretend to sign in as a demo Google user
  const id = 'mock-google-' + Date.now()
  _cachedSession = { user: { id, email: 'demo.google@example.com' }, profile: { name: 'Demo Google User' } }
  _saveMockSession(_cachedSession)
  _emit()
  return {}
}

export const signOut = async () => {
  if (USE_REAL && supabase) {
    // Supabase's onAuthStateChange will call _refreshSession + _emit for us.
    // Don't manually emit again here to avoid double re-renders.
    await supabase.auth.signOut()
    return
  }
  _cachedSession = null
  _saveMockSession(null)
  _emit()
}

/* ===== Per-user progress storage ===== */

export const loadProgress = async (userId) => {
  if (!userId) return {}
  if (USE_REAL && supabase) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('course_uid, watched, test_passed, test_score')
      .eq('user_id', userId)
    // null (nicht {}) signalisiert dem Aufrufer einen FEHLGESCHLAGENEN Load.
    // {} würde "Nutzer hat noch keinen Fortschritt" bedeuten — der Aufrufer
    // würde daraufhin einen Nullzustand speichern und echten Fortschritt löschen.
    if (error || !data) return null
    const out = {}
    for (const row of data) {
      out[row.course_uid] = {
        watched: row.watched,
        testPassed: row.test_passed,
        testScore: row.test_score,
      }
    }
    return out
  }
  return _loadMockProgress(userId)
}

/** Nur Kurse mit echtem Fortschritt schreiben. Ein Nullzustand (nie gesehen,
 *  kein Test) ist identisch mit "keine Zeile" — 242 Leerzeilen pro Seitenaufruf
 *  zu schreiben macht updated_at als Aktivitätssignal wertlos und erzeugt
 *  unnötige Schreiblast. */
const _hasProgress = (v) =>
  !!v?.watched || !!v?.testPassed || Number(v?.testScore || 0) > 0

export const saveProgress = async (userId, state) => {
  if (!userId) return
  if (USE_REAL && supabase) {
    const rows = Object.entries(state)
      .filter(([, v]) => _hasProgress(v))
      .map(([course_uid, v]) => ({
        user_id: userId,
        course_uid,
        watched: !!v?.watched,
        test_passed: !!v?.testPassed,
        test_score: Number(v?.testScore || 0),
        updated_at: new Date().toISOString(),
      }))
    if (rows.length === 0) return {}
    /* Der Fehler wurde bisher verschluckt: die App zeigte weiter Fortschritt,
       der nie in der Datenbank ankam, und beim naechsten Geraet war er weg. */
    const { error } = await supabase.from('user_progress').upsert(rows, { onConflict: 'user_id,course_uid' })
    if (error) {
      console.error('[auth] saveProgress fehlgeschlagen:', error.message)
      return { error: error.message }
    }
    return {}
  }
  _saveMockProgress(userId, state)
}

export const isUsingRealSupabase = () => USE_REAL

/* =============================================================
   PROFILE + LANGUAGE TRACKING
   ============================================================= */

/** Look up the current user's profile (incl. is_admin flag). */
export const getMyProfile = async () => {
  if (!_cachedSession?.user?.id) return null
  if (USE_REAL && supabase) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, name, lang, is_admin, created_at')
      .eq('id', _cachedSession.user.id)
      .maybeSingle()
    if (error) return null
    return data
  }
  // Mock: pretend the mock user is admin (so the gear icon shows during dev)
  return {
    id: _cachedSession.user.id,
    email: _cachedSession.user.email,
    name: _cachedSession.profile?.name || _cachedSession.user.email,
    lang: 'de',
    is_admin: true,
    created_at: new Date().toISOString(),
  }
}

/** Persist the user's last-used language to their profile. */
export const updateMyLang = async (lang) => {
  if (!lang) return
  if (!_cachedSession?.user?.id) return
  if (USE_REAL && supabase) {
    await supabase
      .from('profiles')
      .update({ lang, last_seen_at: new Date().toISOString() })
      .eq('id', _cachedSession.user.id)
  }
  // mock: nothing to do (we don't persist lang in mock progress)
}

/* =============================================================
   ADMIN-ONLY QUERIES — protected by RLS in production
   ============================================================= */

/** Return all profiles + their aggregated progress. Admin only.
    Soft-deleted users (deleted_at != null) are filtered unless includeDeleted=true. */
export const adminLoadAllUsers = async ({ includeDeleted = false } = {}) => {
  if (USE_REAL && supabase) {
    let pq = supabase
      .from('profiles')
      .select('id, email, name, lang, is_admin, created_at, last_seen_at, deleted_at')
      .order('created_at', { ascending: false })
    if (!includeDeleted) pq = pq.is('deleted_at', null)
    const [{ data: profiles, error: pErr }, { data: progressRows, error: gErr }] = await Promise.all([
      pq,
      supabase
        .from('user_progress')
        .select('user_id, course_uid, watched, test_passed, test_score, updated_at'),
    ])
    /* Ohne diese Pruefung sah eine fehlende Berechtigung wie ein leeres
       Nutzerverzeichnis aus — der Admin haette den Fehler nie bemerkt. */
    if (pErr) throw new Error('Profile konnten nicht geladen werden: ' + pErr.message)
    if (gErr) throw new Error('Fortschritt konnte nicht geladen werden: ' + gErr.message)
    const progressByUser = {}
    for (const r of progressRows || []) {
      progressByUser[r.user_id] = progressByUser[r.user_id] || {}
      progressByUser[r.user_id][r.course_uid] = {
        watched: r.watched,
        testPassed: r.test_passed,
        testScore: r.test_score,
        updatedAt: r.updated_at,
      }
    }
    return (profiles || []).map(p => ({
      ...p,
      progress: progressByUser[p.id] || {},
    }))
  }
  // Mock: synthesise a small list from localStorage mock users
  const users = _loadMockUsers()
  return Object.values(users).map(u => ({
    id: u.id,
    email: u.email,
    name: u.name,
    lang: 'de',
    is_admin: false,
    created_at: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
    progress: _loadMockProgress(u.id),
  }))
}

/**
 * Admin: set a single course's state for another user.
 * action: 'complete' (watched + testPassed=true, score=100)
 *       | 'reset'    (watched=false, testPassed=false, score=0)
 */
export const adminSetUserCourseState = async (userId, courseUid, action) => {
  if (!userId || !courseUid) return { error: 'missing args' }
  const payload = action === 'reset'
    ? { user_id: userId, course_uid: courseUid, watched: false, test_passed: false, test_score: 0, updated_at: new Date().toISOString() }
    : { user_id: userId, course_uid: courseUid, watched: true,  test_passed: true,  test_score: 100, updated_at: new Date().toISOString() }

  if (USE_REAL && supabase) {
    const { error } = await supabase
      .from('user_progress')
      .upsert(payload, { onConflict: 'user_id,course_uid' })
    if (error) return { error: error.message }
    return {}
  }
  // Mock: update local mock progress
  const prog = _loadMockProgress(userId)
  prog[courseUid] = {
    watched: payload.watched,
    testPassed: payload.test_passed,
    testScore: payload.test_score,
  }
  _saveMockProgress(userId, prog)
  return {}
}

/** Admin: toggle is_admin for a user. */
export const adminSetIsAdmin = async (userId, isAdmin) => {
  if (!userId) return { error: 'missing user id' }
  if (USE_REAL && supabase) {
    // is_admin ist für Clients nicht schreibbar (Spalten-Grant entzogen).
    // Die Rechteprüfung passiert serverseitig in der Funktion.
    const { error } = await supabase.rpc('admin_set_is_admin', {
      target_id: userId, make_admin: !!isAdmin,
    })
    if (error) return { error: error.message }
    return {}
  }
  // Mock: stored on users object
  const users = _loadMockUsers()
  for (const k of Object.keys(users)) {
    if (users[k].id === userId) users[k].is_admin = !!isAdmin
  }
  _saveMockUsers(users)
  return {}
}

/** Admin: rename a user (update profile.name). */
export const adminUpdateUserName = async (userId, name) => {
  if (!userId || !name) return { error: 'missing args' }
  /* Dieselbe Prüfung wie im Registrierungspfad. Vorher ging von hier jeder
     beliebige Wert direkt in die Datenbank — auch ein 50-kB-String oder ein
     Objekt, das PostgREST dann als JSON schreibt. */
  const sauber = String(name).replace(/\s+/g, ' ').trim()
  if (!sauber) return { error: 'missing args' }
  if (sauber.length > MAX_NAME_LEN) return { error: 'Name is too long.' }
  if (USE_REAL && supabase) {
    const { error } = await supabase
      .from('profiles')
      .update({ name: sauber })
      .eq('id', userId)
    if (error) return { error: error.message }
    return {}
  }
  const users = _loadMockUsers()
  for (const k of Object.keys(users)) {
    if (users[k].id === userId) users[k].name = name
  }
  _saveMockUsers(users)
  return {}
}

/** Admin: wipe ALL progress rows for a user. */
export const adminResetAllProgress = async (userId) => {
  if (!userId) return { error: 'missing user id' }
  if (USE_REAL && supabase) {
    const { error } = await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', userId)
    if (error) return { error: error.message }
    return {}
  }
  _saveMockProgress(userId, {})
  return {}
}

/** Admin: soft-delete a user (set deleted_at). The auth.users row stays, but
 *  the profile is hidden from the admin list. Reversible via undelete —
 *  der Fortschritt bleibt dabei erhalten (CLAUDE.md Grundregel 2). */
export const adminSoftDeleteUser = async (userId) => {
  if (!userId) return { error: 'missing user id' }
  if (USE_REAL && supabase) {
    // deleted_at/is_admin sind für Clients nicht schreibbar — serverseitige
    // Funktion prüft die Adminrechte und setzt beides.
    const { error } = await supabase.rpc('admin_soft_delete_user', { target_id: userId })
    if (error) return { error: error.message }
    return {}
  }
  // Mock: remove from users
  const users = _loadMockUsers()
  for (const k of Object.keys(users)) {
    if (users[k].id === userId) delete users[k]
  }
  _saveMockUsers(users)
  _saveMockProgress(userId, {})
  return {}
}

/** Admin: undo a soft-delete. */
export const adminUndeleteUser = async (userId) => {
  if (!userId) return { error: 'missing user id' }
  if (USE_REAL && supabase) {
    const { error } = await supabase.rpc('admin_undelete_user', { target_id: userId })
    if (error) return { error: error.message }
    return {}
  }
  return {}
}
