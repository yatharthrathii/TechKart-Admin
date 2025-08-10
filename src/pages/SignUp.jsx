import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp, login } from "../utils/auth";
import { toast } from "sonner";

const SignUpPage = () => {
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success, message } = await signUp(email, password);

    if (!success) {
      toast.error(message || "Signup failed");
      setLoading(false);
      return;
    }

    const loginResult = await login(email, password);
    setLoading(false);

    if (!loginResult.success) {
      toast.error(loginResult.message || "Login failed after signup");
      return;
    }

    localStorage.setItem("token", loginResult.data.idToken);
    toast.success("Account created & logged in successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-stone-800">Create Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link to="/login" className="text-stone-900 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
