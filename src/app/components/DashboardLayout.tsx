import { ReactNode, useState } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router";
import { 
  LayoutDashboard, 
  Package, 
  Sliders, 
  BarChart3, 
  Bell, 
  Settings,
  LogOut,
  Search,
  ChevronDown,
  User
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../../assets/361c0df7f81c202133b4901aa71fba34b0ff83c9.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app" },
  { icon: Package, label: "Products", path: "/app/products" },
  { icon: Sliders, label: "Pricing Rules", path: "/app/pricing-rules" },
  { icon: BarChart3, label: "Analytics", path: "/app/analytics" },
  { icon: Bell, label: "Alerts", path: "/app/alerts" },
  { icon: Settings, label: "Settings", path: "/app/settings" },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Calculate user initials
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const userInitials = user?.name ? getInitials(user.name) : "U";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={logo} alt="PricePilot Logo" className="h-8 w-auto" />
            <div>
              <h1 className="font-bold text-xl text-[#2c3e50]">
                PricePilot
              </h1>
              <p className="text-xs text-gray-500 mt-1">Dynamic Pricing Engine</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#2c3e50] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-[#e8eaf0] rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900">Upgrade to Pro</p>
            <p className="text-xs text-gray-600 mt-1">
              Unlock enterprise cloud features and advanced AI analytics
            </p>
            <button className="mt-3 w-full bg-[#2c3e50] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1a252f] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, rules, analytics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-6">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <Link
                        to="/app/alerts"
                        className="block p-4 hover:bg-gray-50 border-b border-gray-100"
                        onClick={() => setShowNotifications(false)}
                      >
                        <p className="text-sm font-medium text-gray-900">
                          High demand detected
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          3 products showing significant demand spike
                        </p>
                      </Link>
                      <Link
                        to="/app/alerts"
                        className="block p-4 hover:bg-gray-50 border-b border-gray-100"
                        onClick={() => setShowNotifications(false)}
                      >
                        <p className="text-sm font-medium text-gray-900">
                          Low stock alert
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          2 products need restocking
                        </p>
                      </Link>
                      <Link
                        to="/app/alerts"
                        className="block p-4 text-center text-sm text-blue-600 hover:bg-gray-50 font-medium"
                        onClick={() => setShowNotifications(false)}
                      >
                        View all alerts
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#2c3e50] rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {userInitials}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-medium text-gray-900">{user?.name || "User"}</p>
                      <p className="text-sm text-gray-600">{user?.email || ""}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/app/settings"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">Profile Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
