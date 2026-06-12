const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

// import ekle
file = file.replace(
"import { supabase } from '@/lib/supabase-browser';",
`import { supabase } from '@/lib/supabase-browser';
import Console from './console';`
);

// JSX içine ekle
file = file.replace(
'</div>\n\n      {/* ✅ INFO */}',
`
<Console apiKey={apiKey} />

      {/* ✅ INFO */}
`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
