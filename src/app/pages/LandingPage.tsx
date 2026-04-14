import { useNavigate } from "react-router";
import { TrendingUp, Zap, BarChart3, Shield, ArrowRight, Cloud, Server, Database } from "lucide-react";
import logo from "../../assets/361c0df7f81c202133b4901aa71fba34b0ff83c9.png";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="PricePilot Logo" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-xl text-[#2c3e50]">
                PricePilot
              </h1>
              <p className="text-xs text-gray-500">Cloud-Powered Pricing Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-[#2c3e50] text-white font-medium rounded-lg hover:bg-[#1a252f] transition-colors shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Cloud className="w-4 h-4" />
            Powered by Cloud AI & Real-Time Analytics
          </div>
          <h1 className="text-6xl font-bold mb-6 text-[#2c3e50]">
            Cloud-Scale Pricing Optimization in Real-Time
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Harness the power of cloud infrastructure and AI to monitor demand, 
            adjust product pricing automatically, and maximize revenue with enterprise-grade scalability
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-[#2c3e50] text-white font-semibold rounded-lg hover:bg-[#1a252f] transition-colors shadow-xl flex items-center gap-2"
            >
              Get Started 
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Products", value: "847", change: "+12%" },
                { label: "Revenue Impact", value: "₹12,45,800", change: "+24%" },
                { label: "Price Changes", value: "23", change: "Today" },
                { label: "Active Rules", value: "6", change: "Running" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
              ))}
            </div>
            
            {/* Revenue Chart */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">Revenue Impact Over Time</h3>
                  <p className="text-sm text-gray-600">Cloud-powered dynamic pricing optimization</p>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">+24% this month</span>
                </div>
              </div>
              
              <div className="h-64 relative">
                <svg width="100%" height="100%" viewBox="0 0 800 256" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="64" x2="800" y2="64" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="128" x2="800" y2="128" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="192" x2="800" y2="192" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Area fill */}
                  <path
                    d="M 0,200 L 100,180 L 200,160 L 300,140 L 400,120 L 500,100 L 600,90 L 700,70 L 800,50 L 800,256 L 0,256 Z"
                    fill="url(#gradient)"
                    opacity="0.3"
                  />
                  
                  {/* Line */}
                  <path
                    d="M 0,200 L 100,180 L 200,160 L 300,140 L 400,120 L 500,100 L 600,90 L 700,70 L 800,50"
                    fill="none"
                    stroke="#5a67d8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Data points */}
                  {[
                    [0, 200], [100, 180], [200, 160], [300, 140], 
                    [400, 120], [500, 100], [600, 90], [700, 70], [800, 50]
                  ].map((point, idx) => (
                    <circle key={idx} cx={point[0]} cy={point[1]} r="4" fill="#5a67d8" />
                  ))}
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5a67d8" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#5a67d8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 -ml-12">
                  <span>₹150k</span>
                  <span>₹100k</span>
                  <span>₹50k</span>
                  <span>₹0</span>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 -mb-6">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Enterprise cloud platform built for scale
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              icon: Cloud,
              title: "Cloud-Native Architecture",
              description: "Built on scalable cloud infrastructure for real-time processing of millions of price points simultaneously",
            },
            {
              icon: Server,
              title: "Distributed AI Processing",
              description: "Leverage cloud-based machine learning models that analyze demand patterns across global markets",
            },
            {
              icon: Database,
              title: "Cloud Data Analytics",
              description: "Process massive datasets in the cloud to generate actionable pricing insights instantly",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description: "Bank-grade encryption and cloud security protocols protect your pricing data 24/7",
            },
            {
              icon: TrendingUp,
              title: "Auto-Scaling Infrastructure",
              description: "Cloud resources automatically scale to handle demand spikes without performance degradation",
            },
            {
              icon: Zap,
              title: "Real-Time Cloud Sync",
              description: "Instant price updates synchronized across all channels via cloud infrastructure",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-[#5a67d8] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#2c3e50] rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              Ready to optimize your pricing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of businesses using PricePilot
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-white text-[#2c3e50] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
