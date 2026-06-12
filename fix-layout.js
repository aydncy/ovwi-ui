const fs = require('fs');

let file = fs.readFileSync('app/layout.tsx','utf8');

// import ekle
if (!file.includes('Navbar')) {
  file = file.replace(
    "import './globals.css';",
    "import './globals.css';\nimport Navbar from './components/navbar';"
  );
}

// navbar render et
file = file.replace(
'{children}',
`<Navbar />
{children}`
);

fs.writeFileSync('app/layout.tsx', file);
