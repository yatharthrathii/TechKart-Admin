import { useState } from "react";
import { sendPasswordResetEmail } from "../utils/auth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success, message } = await sendPasswordResetEmail(email);

    setLoading(false);

    if (success) {
      toast.success("Password reset email sent!");
      setEmail("");
    } else {
      toast.error(message || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-stone-800">Reset Your Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-800 text-white py-2 rounded hover:bg-stone-700 font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link to="/login" className="text-stone-600 hover:underline font-medium">
            ← Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
