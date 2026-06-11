const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'if (keyData) {',
`if (!keyData) {
        const newKey = Math.random().toString(36).substring(2);
        await supabase.from('api_keys').insert({
          user_id: data.user.id,
          key: 'ovwi_' + newKey
        });

        setApiKey('ovwi_' + newKey);
      }

      if (keyData) {
`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
