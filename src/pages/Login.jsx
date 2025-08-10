import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../utils/auth";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success, message, data } = await login(email, password);

    setLoading(false);
    if (success) {
      localStorage.setItem("token", data.idToken);
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error(message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-stone-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-stone-800">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-800 text-white py-2 rounded hover:bg-stone-700 font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-stone-900 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="mt-1 text-center text-sm">
          <Link to="/forgot-password" className="text-stone-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
