-- =====================================================================
--  10X HEALTH ACADEMY — vollständiges Datenbank-Schema (eigenes Supabase-Projekt)
--  Stand 16.09.2026, 1:1 aus der Live-Datenbank der NOVO ACADEMY ausgelesen
--  (inkl. Sicherheits-Migration vom 06.08.2026), damit beide Instanzen
--  identisch funktionieren, aber getrennte Nutzer und Admins haben.
--
--  IM SQL-EDITOR DES 10X-PROJEKTS AUSFÜHREN. Idempotent — mehrfach ausführbar.
--  Danach: sich auf der 10X-Seite registrieren und Abschnitt 8 ausführen.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) Tabellen
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text,
  name          text,
  lang          text default 'en',
  is_admin      boolean default false,
  created_at    timestamptz default now(),
  last_seen_at  timestamptz default now(),
  deleted_at    timestamptz
);
create index if not exists profiles_deleted_at_idx on public.profiles (deleted_at);

create table if not exists public.user_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  course_uid   text not null,
  watched      boolean not null default false,
  test_passed  boolean not null default false,
  test_score   integer not null default 0,
  updated_at   timestamptz not null default now(),
  primary key (user_id, course_uid)
);

-- ---------------------------------------------------------------------
-- 2) Profil automatisch bei Registrierung anlegen
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name',
             new.raw_user_meta_data->>'full_name',
             new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- 3) is_admin() — für Zugriffsregeln und die App
-- ---------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ---------------------------------------------------------------------
-- 4) Zugriffsregeln (RLS)
-- ---------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;

drop policy if exists "users read own profile"     on public.profiles;
drop policy if exists "users update own profile"   on public.profiles;
drop policy if exists "admins read all profiles"   on public.profiles;
drop policy if exists "admins update all profiles" on public.profiles;
drop policy if exists "admins delete profiles"     on public.profiles;

create policy "users read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "admins read all profiles" on public.profiles
  for select using (public.is_admin());
create policy "admins update all profiles" on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());
create policy "admins delete profiles" on public.profiles
  for delete using (public.is_admin());

drop policy if exists "users read own progress"    on public.user_progress;
drop policy if exists "users insert own progress"  on public.user_progress;
drop policy if exists "users write own progress"   on public.user_progress;
drop policy if exists "users update own progress"  on public.user_progress;
drop policy if exists "users delete own progress"  on public.user_progress;
drop policy if exists "admins read all progress"   on public.user_progress;
drop policy if exists "admins write all progress"  on public.user_progress;
drop policy if exists "admins delete all progress" on public.user_progress;

create policy "users read own progress" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "users insert own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "users update own progress" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users delete own progress" on public.user_progress
  for delete using (auth.uid() = user_id);
create policy "admins read all progress" on public.user_progress
  for select using (public.is_admin());
create policy "admins write all progress" on public.user_progress
  for all using (public.is_admin()) with check (true);
create policy "admins delete all progress" on public.user_progress
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------
-- 5) Spaltenrechte: is_admin und deleted_at sind für keinen Client schreibbar
-- ---------------------------------------------------------------------
revoke update on public.profiles from anon, authenticated;
grant  update (name, lang, last_seen_at) on public.profiles to authenticated;

-- ---------------------------------------------------------------------
-- 6) Admin-Operationen (Rechteprüfung serverseitig)
-- ---------------------------------------------------------------------
create or replace function public.admin_set_is_admin(target_id uuid, make_admin boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorised';
  end if;
  if make_admin = false
     and (select count(*) from public.profiles
          where is_admin = true and deleted_at is null) <= 1 then
    raise exception 'cannot remove the last admin';
  end if;
  update public.profiles set is_admin = make_admin where id = target_id;
end;
$$;

create or replace function public.admin_soft_delete_user(target_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorised';
  end if;
  if target_id = auth.uid() then
    raise exception 'cannot delete yourself';
  end if;
  if (select is_admin from public.profiles where id = target_id)
     and (select count(*) from public.profiles where is_admin = true and deleted_at is null) <= 1 then
    raise exception 'cannot delete the last admin';
  end if;
  update public.profiles
     set deleted_at = now(), is_admin = false
   where id = target_id;
end;
$$;

create or replace function public.admin_undelete_user(target_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorised';
  end if;
  update public.profiles set deleted_at = null where id = target_id;
end;
$$;

revoke execute on function public.admin_set_is_admin(uuid, boolean)  from public, anon;
revoke execute on function public.admin_soft_delete_user(uuid)       from public, anon;
revoke execute on function public.admin_undelete_user(uuid)          from public, anon;
grant  execute on function public.admin_set_is_admin(uuid, boolean)  to authenticated;
grant  execute on function public.admin_soft_delete_user(uuid)       to authenticated;
grant  execute on function public.admin_undelete_user(uuid)          to authenticated;

-- ---------------------------------------------------------------------
-- 7) Kontrolle
-- ---------------------------------------------------------------------
select 'tabellen' as art, string_agg(table_name, ', ') as info
  from information_schema.tables where table_schema = 'public'
union all
select 'policies', count(*)::text from pg_policies where schemaname = 'public';

-- ---------------------------------------------------------------------
-- 8) Ersten Admin festlegen — ERST NACH der Registrierung auf der 10X-Seite
-- ---------------------------------------------------------------------
-- update public.profiles set is_admin = true where email = 'evolutionnext696@gmail.com';
