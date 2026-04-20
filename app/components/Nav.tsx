import Link from "next/link";
import Logout from "./Logout";

export default function Nav(){
  return (
    <div className="nav">
      <div>OVWI</div>

      <div>
        <Link href="/" className="btn">Home</Link>
        <Link href="/docs" className="btn">Docs</Link>
        <Link href="/dashboard" className="btn">Dashboard</Link>
        <Logout />
      </div>
    </div>
  );
}
