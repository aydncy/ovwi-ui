const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
"const { data } = await supabase.auth.getUser();",
`const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      window.location.href = '/auth/login';
      return;
    }`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
