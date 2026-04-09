"use client";

export default function Home() {
  return (
    <div style={wrap}>
      <nav style={nav}>
        <div>Cyzora</div>
        <div style={{display:"flex", gap:20}}>
          <a href="/dashboard">Dashboard</a>
          <a href={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO}>Upgrade</a>
        </div>
      </nav>

      <section style={hero}>
        <h1 style={title}>
          Stop debugging.<br/>
          <span style={{color:"#4f46e5"}}>Start verifying.</span>
        </h1>

        <p style={{opacity:0.6}}>
          Track API usage instantly with zero setup.
        </p>

        <div style={{display:"flex", gap:12}}>
          <a href="/dashboard" style={cta}>Get Started</a>
          <a href="/docs" style={ghost}>View Docs</a>
        </div>
      </section>

      <section style={pricing}>
        <Card name="Free" price="$0" />
        <Card name="Pro" price="€6" link={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO} />
        <Card name="Enterprise" price="€18" link={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE} />
        <Card name="Scale" price="€49" link={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE} />
      </section>
    </div>
  );
}

function Card({name, price, link}: any) {
  return (
    <div style={card}>
      <div>{name}</div>
      <h2>{price}</h2>
      {link && <a href={link} style={buy}>Buy</a>}
    </div>
  );
}

const wrap = {background:"#050816", color:"#fff", minHeight:"100vh"};
const nav = {display:"flex", justifyContent:"space-between", padding:20};
const hero = {padding:"100px 40px"};
const title = {fontSize:56, fontWeight:800};
const cta = {background:"#4f46e5", padding:"10px 20px", borderRadius:10};
const ghost = {border:"1px solid #444", padding:"10px 20px", borderRadius:10};
const pricing = {display:"flex", gap:20, padding:40};
const card = {padding:20, background:"#0b1220", borderRadius:16};
const buy = {display:"block", marginTop:10, color:"#22c55e"};
