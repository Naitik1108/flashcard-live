export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-zinc-900"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-zinc-900"
        />

        <button className="w-full bg-blue-500 p-3 rounded">
          Login
        </button>
      </div>
    </main>
  );
}