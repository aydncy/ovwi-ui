'use client';

import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase =
  env.SUPABASE_URL && env.SUPABASE_ANON
    ? createClient(
        env.SUPABASE_URL,
        env.SUPABASE_ANON
      )
    : null as any;
