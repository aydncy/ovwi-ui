export default function Login() {
  return (
    <div className="max-w-md mx-auto">

      <div className="card space-y-4">

        <h1 className="text-xl font-bold">Login</h1>

        <input type="email" placeholder="Email"
          className="w-full p-2 bg-black/40 rounded" />

        <input type="password" placeholder="Password"
          className="w-full p-2 bg-black/40 rounded" />

        <button className="btn btn-primary w-full">
          Login
        </button>

      </div>
    </div>
  );
}
