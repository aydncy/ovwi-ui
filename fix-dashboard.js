const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
/const runVerify[\s\S]*?};/,
`const runVerify = async () => {
  try {
    const session = await supabase!.auth.getSession();

    const token = session.data.session?.access_token;

    if (!token) {
      window.location.href = '/auth/login';
      return;
    }

    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    const data = await res.json();

    if (data.upgrade) {
      window.location.href = '/upgrade';
      return;
    }

    setUsage(Number(data.usage) || 0);
    setLimit(Number(data.limit) || 50);

  } catch (e) {
    console.error('verify error', e);
  }
};`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
