import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

function handleSubmit(e) {
  e.preventDefault();

  console.log("Email:", email);
  console.log("Password:", password);
}

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-center text-purple-600">
          Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome Back
        </p>

        <div className="mt-6">

          <label className="font-medium">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-3 rounded-lg mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="mt-5">

          <label className="font-medium">Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border p-3 rounded-lg mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg mt-8 hover:bg-purple-700"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;