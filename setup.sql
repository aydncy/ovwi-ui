create table if not exists api_events (
  id bigint generated always as identity primary key,
  user_id text,
  endpoint text,
  price numeric,
  created_at timestamp default now()
);
