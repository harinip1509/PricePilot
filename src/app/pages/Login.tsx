import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { TrendingUp, Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../../assets/361c0df7f81c202133b4901aa71fba34b0ff83c9.png";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/app");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid credentials. Please try again.");
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
            Optimize Pricing with Real-Time Insights
          </h2>

          <p className="text-xl text-gray-600">
            Leverage cloud-powered AI and distributed computing to maximize revenue 
            with enterprise-grade dynamic pricing.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-8">
            {[
              { label: "Revenue Increase", value: "24%" },
              { label: "Price Changes", value: "Real-time" },
              { label: "Active Users", value: "10K+" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <p className="text-3xl font-bold text-[#5a67d8]">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h3>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
                {error.includes("sign up") && (
                  <div className="mt-2">
                    <Link
                      to="/signup"
                      className="text-red-800 hover:text-red-900 font-semibold underline"
                    >
                      Create an account here
                    </Link>
                  </div>
                )}
              </div>
            )}

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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2c3e50] text-white font-semibold py-3 rounded-lg hover:bg-[#1a252f] transition-colors disabled:opacity-50 shadow-lg"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
