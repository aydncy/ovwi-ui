const fs = require('fs');

let file = fs.readFileSync('app/api/gumroad-webhook/route.ts','utf8');

file = file.replace(
"action: 'upgrade'",
`action: 'upgrade'
});

await supabase.from('revenue').insert({
  user_id: user.id,
  amount: 9
}`
);

fs.writeFileSync('app/api/gumroad-webhook/route.ts', file);
