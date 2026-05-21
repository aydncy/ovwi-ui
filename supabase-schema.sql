-- USERS BILLING STATE
create table if not exists user_billing (
  id uuid primary key default gen_random_uuid(),
  user_id text unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free',
  status text default 'inactive',
  updated_at timestamp default now()
);

-- API KEYS
create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  key text unique,
  plan text default 'free',
  remaining_credits int default 100,
  created_at timestamp default now()
);

-- USAGE TRACKING
create table if not exists usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  endpoint text,
  created_at timestamp default now()
);
