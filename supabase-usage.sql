create table if not exists public.ovwi_usage (
  id bigint generated always as identity primary key,
  email text unique not null,
  plan text default 'free',
  usage integer default 0,
  updated_at timestamp with time zone default now()
);

alter table public.ovwi_usage enable row level security;

create policy "enable_all"
on public.ovwi_usage
for all
using (true)
with check (true);
