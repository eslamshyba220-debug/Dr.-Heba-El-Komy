create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  page_url text not null,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone_number text not null,
  service_requested text not null,
  appointment_time text not null,
  notes text,
  request_key uuid,
  status text not null default 'pending'
    check (status in ('pending', 'contacted', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.appointments
  add column if not exists request_key uuid;

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists appointments_created_at_idx on public.appointments (created_at desc);
create index if not exists appointments_status_idx on public.appointments (status);
create unique index if not exists appointments_request_key_idx on public.appointments (request_key);

alter table public.page_views enable row level security;
alter table public.appointments enable row level security;

revoke all on public.page_views from anon, authenticated;
revoke all on public.appointments from anon, authenticated;
grant all on public.page_views to service_role;
grant all on public.appointments to service_role;
