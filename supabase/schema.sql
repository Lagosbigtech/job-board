-- Run this whole file once in Supabase: Dashboard → SQL Editor → New query → paste → Run

create extension if not exists "pgcrypto";

-- ---------- jobs ----------
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text not null,
  type text not null default 'Full-time',
  salary text,
  description text not null,
  posted_at timestamptz not null default now()
);

alter table jobs enable row level security;

-- Anyone can view listings (public job board)
create policy "public can read jobs"
  on jobs for select
  using (true);

-- Only signed-in users (you, the admin) can create/edit/remove listings
create policy "authenticated can insert jobs"
  on jobs for insert
  to authenticated
  with check (true);

create policy "authenticated can update jobs"
  on jobs for update
  to authenticated
  using (true);

create policy "authenticated can delete jobs"
  on jobs for delete
  to authenticated
  using (true);

-- ---------- applications ----------
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade,
  job_title text,
  name text not null,
  email text not null,
  phone text,
  note text,
  resume_path text not null,
  resume_filename text,
  submitted_at timestamptz not null default now()
);

alter table applications enable row level security;

-- Anyone (candidates) can submit an application, but cannot read others' applications
create policy "public can insert applications"
  on applications for insert
  with check (true);

-- Only signed-in admin can view or remove applications
create policy "authenticated can read applications"
  on applications for select
  to authenticated
  using (true);

create policy "authenticated can delete applications"
  on applications for delete
  to authenticated
  using (true);

-- ---------- storage: resumes bucket ----------
-- Create the bucket itself in the dashboard (Storage → New bucket → name: resumes → Private)
-- then run the policies below, OR run this to create it via SQL:
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Anyone can upload a resume (candidates applying), but cannot list/read others' files
create policy "public can upload resumes"
  on storage.objects for insert
  to public
  with check (bucket_id = 'resumes');

-- Only signed-in admin can read (download) resumes
create policy "authenticated can read resumes"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'resumes');

create policy "authenticated can delete resumes"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'resumes');
