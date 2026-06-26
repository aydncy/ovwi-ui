import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function validateApiKey(apiKey: string) {
  const { data, error } = await supabase
    .from('users_licenses')
    .select('*')
    .eq('api_key', apiKey)
    .single();

  if (error || !data) return null;
  return data;
}

export async function checkRateLimit(userId: string) {
  const { data } = await supabase
    .from('users_licenses')
    .select('monthly_usage, monthly_limit')
    .eq('user_id', userId)
    .single();

  if (!data) return false;
  return data.monthly_usage < data.monthly_limit;
}

export async function recordApiCall(userId: string, endpoint: string, status: number) {
  await supabase.from('api_calls').insert([{
    user_id: userId,
    endpoint,
    status,
  }]);
}
