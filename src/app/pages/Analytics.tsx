import { useState } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, DollarSign, Activity, Target, Cloud, Server, Zap } from "lucide-react";
import { revenueData, demandPriceData } from "../data/mockData";

const impactData = [
  { category: "Electronics", impact: 525000 },
  { category: "Wearables", impact: 298000 },
  { category: "Furniture", impact: 185000 },
  { category: "Home Appliances", impact: 156000 },
  { category: "Sports & Outdoors", impact: 81800 },
];

const demandPatterns = [
  { hour: "12AM", demand: 20 },
  { hour: "3AM", demand: 15 },
  { hour: "6AM", demand: 35 },
  { hour: "9AM", demand: 65 },
  { hour: "12PM", demand: 75 },
  { hour: "3PM", demand: 70 },
  { hour: "6PM", demand: 90 },
  { hour: "9PM", demand: 85 },
];

export function Analytics() {
  const [dateRange, setDateRange] = useState("7d");
  const [category, setCategory] = useState("all");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Detailed insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="wearables">Wearables</option>
            <option value="furniture">Furniture</option>
            <option value="home">Home Appliances</option>
            <option value="sports">Sports & Outdoors</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Revenue Impact",
            value: "₹12,45,800",
            change: "+24.5%",
            icon: DollarSign,
            color: "#48bb78",
          },
          {
            label: "Avg. Price Increase",
            value: "8.2%",
            change: "+2.1%",
            icon: TrendingUp,
            color: "#5a67d8",
          },
          {
            label: "Products Optimized",
            value: "156",
            change: "+18",
            icon: Activity,
            color: "#667eea",
          },
          {
            label: "Conversion Rate",
            value: "12.8%",
            change: "+3.2%",
            icon: Target,
            color: "#ed8936",
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-gray-200"
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
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Revenue Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Revenue Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="revenue-x-axis" dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis key="revenue-y-axis" stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                key="before-area"
                type="monotone"
                dataKey="before"
                stroke="#94a3b8"
                fillOpacity={1}
                fill="url(#colorBefore)"
                name="Before Optimization"
              />
              <Area
                key="after-area"
                type="monotone"
                dataKey="after"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorAfter)"
                name="After Optimization"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Impact */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Revenue Impact by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="impact-x-axis" type="number" stroke="#9ca3af" fontSize={12} />
              <YAxis key="impact-y-axis" dataKey="category" type="category" stroke="#9ca3af" fontSize={12} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar key="impact-bar" dataKey="impact" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Revenue Impact (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Price vs Demand Correlation */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            Price vs Demand Correlation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="correlation-x-axis" dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis key="correlation-y-axis-left" yAxisId="left" stroke="#3b82f6" fontSize={12} />
              <YAxis key="correlation-y-axis-right" yAxisId="right" orientation="right" stroke="#8b5cf6" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                key="correlation-price-line"
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
                name="Avg Price (₹)"
              />
              <Line
                key="correlation-demand-line"
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

        {/* Demand Patterns */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            24-Hour Demand Patterns
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={demandPatterns}>
              <defs>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="demand-x-axis" dataKey="hour" stroke="#9ca3af" fontSize={12} />
              <YAxis key="demand-y-axis" stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                key="demand-area"
                type="monotone"
                dataKey="demand"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorDemand)"
                name="Demand Level (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cloud Infrastructure Metrics */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-6">
          Cloud Infrastructure Performance
        </h3>
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              icon: Cloud,
              label: "Cloud Uptime",
              value: "99.99%",
              description: "Last 30 days",
              color: "#3b82f6",
            },
            {
              icon: Server,
              label: "API Response Time",
              value: "12ms",
              description: "Average latency",
              color: "#8b5cf6",
            },
            {
              icon: Zap,
              label: "Price Updates/Day",
              value: "1.2M",
              description: "Real-time syncs",
              color: "#f59e0b",
            },
            {
              icon: Activity,
              label: "AI Computations",
              value: "847K",
              description: "Daily predictions",
              color: "#10b981",
            },
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: metric.color }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Cloud className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Cloud-Powered Infrastructure</p>
              <p className="text-sm text-blue-700 mt-1">
                Your pricing engine runs on enterprise-grade cloud infrastructure with auto-scaling, 
                distributed AI processing, and real-time data synchronization across global regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}