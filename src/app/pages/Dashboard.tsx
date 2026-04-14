import { useNavigate } from "react-router";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Package, DollarSign, TrendingUp, Activity } from "lucide-react";
import { products, revenueData, demandPriceData } from "../data/mockData";

export function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Products",
      value: products.length.toString(),
      change: "+12%",
      icon: Package,
      color: "#5a67d8",
      onClick: () => navigate("/app/products"),
    },
    {
      label: "Revenue Impact",
      value: "₹12,45,800",
      change: "+24%",
      icon: DollarSign,
      color: "#667eea",
      onClick: () => navigate("/app/analytics"),
    },
    {
      label: "Price Changes Today",
      value: "23",
      change: "Active",
      icon: TrendingUp,
      color: "#48bb78",
      onClick: () => navigate("/app/analytics"),
    },
    {
      label: "Active Rules",
      value: "4",
      change: "Running",
      icon: Activity,
      color: "#ed8936",
      onClick: () => navigate("/app/pricing-rules"),
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Cloud-powered pricing insights at your fingertips</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <button
              key={idx}
              onClick={stat.onClick}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </button>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Price vs Demand Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Price vs Demand</h3>
              <p className="text-sm text-gray-600">Last 7 days performance</p>
            </div>
            <button
              onClick={() => navigate("/app/analytics")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View Details →
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="x-axis" dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis key="y-axis-left" yAxisId="left" stroke="#3b82f6" fontSize={12} />
              <YAxis key="y-axis-right" yAxisId="right" orientation="right" stroke="#8b5cf6" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                key="price-line"
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
                name="Avg Price (₹)"
              />
              <Line
                key="demand-line"
                yAxisId="right"
                type="monotone"
                dataKey="demand"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 4 }}
                name="Demand (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">Revenue Impact</h3>
              <p className="text-sm text-gray-600">Before vs After optimization</p>
            </div>
            <button
              onClick={() => navigate("/app/analytics")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View Details →
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="bar-x-axis" dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis key="bar-y-axis" stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar key="before-bar" dataKey="before" fill="#94a3b8" name="Before" radius={[4, 4, 0, 0]} />
              <Bar key="after-bar" dataKey="after" fill="#3b82f6" name="After" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/app/products")}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
          >
            <Package className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">View All Products</p>
            <p className="text-sm text-gray-600 mt-1">{products.length} products</p>
          </button>
          <button
            onClick={() => navigate("/app/pricing-rules")}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left"
          >
            <Activity className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Manage Rules</p>
            <p className="text-sm text-gray-600 mt-1">4 active rules</p>
          </button>
          <button
            onClick={() => navigate("/app/analytics")}
            className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all text-left"
          >
            <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">View Analytics</p>
            <p className="text-sm text-gray-600 mt-1">Detailed insights</p>
          </button>
          <button
            onClick={() => navigate("/app/alerts")}
            className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all text-left"
          >
            <Activity className="w-6 h-6 text-orange-600 mb-2" />
            <p className="font-medium text-gray-900">Check Alerts</p>
            <p className="text-sm text-gray-600 mt-1">3 unread</p>
          </button>
        </div>
      </div>
    </div>
  );
}