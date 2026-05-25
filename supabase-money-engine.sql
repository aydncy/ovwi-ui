create table if not exists profiles (
  id uuid primary key,
  email text,
  plan text default 'free',
  api_key text,
  usage_count bigint default 0,
  usage_limit bigint default 50,
  created_at timestamptz default now()
);

create index if not exists idx_profiles_api_key
on profiles(api_key);
