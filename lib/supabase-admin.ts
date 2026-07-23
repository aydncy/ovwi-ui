import { createClient } from '@supabase/supabase-js';

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.mock';

const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-key';

export const admin = createClient(url, serviceKey);