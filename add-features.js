const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

file = file.replace(
'</div>\n\n      <div className="hero-card">',
`</div>

<section style={{marginTop:'80px'}}>
  <h2>What you get</h2>

  <div style={{display:'flex',gap:'20px',marginTop:'20px'}}>
    <div>
      <h3>API Infrastructure</h3>
      <p>Production-ready API with authentication and usage tracking.</p>
    </div>

    <div>
      <h3>Usage Control</h3>
      <p>Built-in limits, tracking, and scalable plans.</p>
    </div>

    <div>
      <h3>Developer Ready</h3>
      <p>Simple API, fast integration, real-world usage.</p>
    </div>
  </div>
</section>

      <div className="hero-card">`
);

fs.writeFileSync('app/page.tsx', file);
