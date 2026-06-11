const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'setEmail(data.user.email || \'\');',
`setEmail(data.user.email || '');

      // ✅ LOAD USAGE FROM DB
      const { data: usageData } = await supabase
        .from('users_usage')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (usageData) {
        setUsage(usageData.usage);
        setLimit(usageData.monthly_limit);
      }
`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
