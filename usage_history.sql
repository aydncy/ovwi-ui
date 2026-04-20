create table if not exists usage_history (
  id bigint generated always as identity primary key,
  email text,
  usage integer,
  created_at timestamp default now()
);
