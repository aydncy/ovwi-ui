const fs = require('fs');

let file = fs.readFileSync('app/api/verify/route.ts','utf8');

file = file.replace(
'return NextResponse.json({',
`
await supabase.from('usage_logs').insert({
  user_id: userId,
  action: 'verify'
});

return NextResponse.json({`
);

fs.writeFileSync('app/api/verify/route.ts', file);
