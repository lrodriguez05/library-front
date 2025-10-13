import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

function Login() {
  const [username, getUsername] = useState("");
  const [password, getPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status !== 200) {
        setError("Username o password incorrectos");
        return;
      }

      const data = await response.json();
      login({ data });
      navigate("/");
    } catch (e) {
      console.error("aaaaaaa", e);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-4 py-6 h-screen">
        <div className="w-full bg-white rounded-lg shadow max-w-md">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold text-center">
              Welcome to the library
            </h1>
            <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Username</label>
                <input
                  required
                  value={username}
                  type="text"
                  className="border p-3 rounded-lg"
                  onChange={(e) => (getUsername(e.target.value), setError(""))}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Password</label>
                <input
                  required
                  value={password}
                  type="password"
                  className="border p-3 rounded-lg"
                  onChange={(e) => (getPassword(e.target.value), setError(""))}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <input id="remember" type="checkbox" className="w-4 h-4" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a className="text-blue-500 hover:underline cursor-pointer">
                  Forgot password?
                </a>
              </div>
              <hr className="opacity-10" />
              <button className="bg-blue-500 w-full p-3 rounded-lg text-white mt-2 hover:bg-blue-600">
                Log in your account
              </button>
              <div className="flex justify-center">
                <label className="text-red-500">{error}</label>
              </div>
              <p>
                Don’t have an account yet?{" "}
                <Link
                  className="text-blue-500 hover:underline cursor-pointer"
                  to="/register"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
