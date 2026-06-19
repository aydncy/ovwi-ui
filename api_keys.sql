create table if not exists api_keys (
  id uuid default gen_random_uuid() primary key,
  user_id text,
  api_key text unique,
  created_at timestamp default now()
);
