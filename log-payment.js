const fs = require('fs');

let file = fs.readFileSync('app/api/gumroad-webhook/route.ts','utf8');

file = file.replace(
'await supabase.from(\'users_usage\')',
`await supabase.from('usage_logs').insert({
  user_id: user.id,
  action: 'upgrade'
});

await supabase.from('users_usage')`
);

fs.writeFileSync('app/api/gumroad-webhook/route.ts', file);
