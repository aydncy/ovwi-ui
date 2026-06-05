const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

file += `
<section style="margin-top:80px;text-align:center">
  <p style="color:#888">
    Trusted by developers building real applications
  </p>
</section>
`;

fs.writeFileSync('app/page.tsx', file);
