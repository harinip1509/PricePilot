import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { TrendingUp, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../../assets/361c0df7f81c202133b4901aa71fba34b0ff83c9.png";

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password);
      navigate("/app");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="PricePilot Logo" className="h-12 w-auto" />
            <h1 className="text-4xl font-bold text-[#2c3e50]">
              PricePilot
            </h1>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Start optimizing your pricing today
          </h2>

          <p className="text-xl text-gray-600">
            Join thousands of businesses leveraging cloud infrastructure and AI 
            to maximize revenue with scalable dynamic pricing.
          </p>

          <div className="space-y-3 pt-4">
            {[
              "Cloud-native real-time optimization",
              "AI-powered demand forecasting",
              "Auto-scaling pricing rules",
              "Enterprise analytics dashboard",
              "Global cloud infrastructure",
              "24/7 automated monitoring",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#5a67d8] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h3>
            <p className="text-gray-600">Get started with PricePilot for free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1"
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                  Privacy Policy
                </button>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2c3e50] text-white font-semibold py-3 rounded-lg hover:bg-[#1a252f] transition-colors disabled:opacity-50 shadow-lg"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
