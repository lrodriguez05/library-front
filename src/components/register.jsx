import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "./AuthContext";
function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          last_name: lastName,
          username,
          password,
        }),
      });

      if (response.status === 200) {
        const autoLogin = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const autoData = await autoLogin.json();

        login({ token: autoData.token });
        navigate("/");
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al crear la cuenta");
      }
    } catch (error) {
      console.error("Error: ", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-4 py-6 h-screen">
        <div className="w-full bg-white rounded-lg shadow max-w-md">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Name</label>
                <input
                  type="text"
                  className="border p-3 rounded-lg"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Last Name</label>
                <input
                  type="text"
                  className="border p-3 rounded-lg"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Username</label>
                <input
                  type="text"
                  className="border p-3 rounded-lg"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Password</label>
                <input
                  type="password"
                  className="border p-3 rounded-lg"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="border p-3 rounded-lg"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <hr className="opacity-10"></hr>{" "}
              <div className="text-center">
                <label className="text-red-500">{error}</label>
              </div>
              <button
                disabled={loading}
                className="bg-blue-500 w-full p-3 rounded-lg text-white mt-3 hover:bg-blue-600"
              >
                {loading ? "Creating..." : "Create an account"}
              </button>
              <p>
                Already have an account?{" "}
                <Link
                  className="text-blue-500 hover:underline cursor-pointer"
                  to="/login"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Register;
