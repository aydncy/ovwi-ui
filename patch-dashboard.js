const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

if (!file.includes('fetchUsage')) {

  file = file.replace(
`export default function Dashboard() {`,
`export default function Dashboard() {

  const [usage, setUsage] = useState(0);
  const limit = 50;

  async function fetchUsage() {
    const res = await fetch('/api/verify');
    const data = await res.json();

    if (data.usage) {
      setUsage(data.usage);
    }
  }

  useEffect(() => {
    fetchUsage();
  }, []);
`
  );

}

fs.writeFileSync('app/dashboard/page.tsx', file);
