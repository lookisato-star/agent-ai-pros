create table public.audit_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  agency text not null,
  website text,
  phone text,
  process text not null,
  message text not null,
  created_at timestamptz not null default now()
);

grant insert on public.audit_requests to anon;
grant all on public.audit_requests to service_role;

alter table public.audit_requests enable row level security;

create policy "Anyone can submit an audit request"
on public.audit_requests
for insert
to anon, authenticated
with check (true);

create table public.cta_clicks (
  id uuid primary key default gen_random_uuid(),
  location text not null,
  path text not null,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

grant insert on public.cta_clicks to anon;
grant all on public.cta_clicks to service_role;

alter table public.cta_clicks enable row level security;

create policy "Anyone can log a CTA click"
on public.cta_clicks
for insert
to anon, authenticated
with check (true);