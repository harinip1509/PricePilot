import { useState } from "react";
import { useNavigate } from "react-router";
import { AlertTriangle, Info, CheckCircle, ChevronRight, Filter } from "lucide-react";
import { alerts as initialAlerts } from "../data/mockData";

const getAlertIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-5 h-5" />;
    case "info":
      return <Info className="w-5 h-5" />;
    case "success":
      return <CheckCircle className="w-5 h-5" />;
    default:
      return <Info className="w-5 h-5" />;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case "warning":
      return {
        bg: "bg-orange-50",
        border: "border-orange-200",
        icon: "text-orange-600",
        text: "text-orange-900",
      };
    case "info":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "text-blue-600",
        text: "text-blue-900",
      };
    case "success":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "text-green-600",
        text: "text-green-900",
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        icon: "text-gray-600",
        text: "text-gray-900",
      };
  }
};

export function Alerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState<"all" | "unread" | "warning" | "info" | "success">("all");

  const markAsRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const handleAlertClick = (alert: typeof alerts[0]) => {
    markAsRead(alert.id);
    if (alert.productId) {
      navigate(`/app/products/${alert.productId}`);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    if (filter === "unread") return !alert.read;
    return alert.type === filter;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))}
          className="px-6 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-600" />
        <div className="flex items-center gap-2">
          {[
            { label: "All", value: "all" as const },
            { label: "Unread", value: "unread" as const },
            { label: "Warnings", value: "warning" as const },
            { label: "Info", value: "info" as const },
            { label: "Success", value: "success" as const },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === tab.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No alerts to display</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const colors = getAlertColor(alert.type);
            return (
              <div
                key={alert.id}
                onClick={() => handleAlertClick(alert)}
                className={`${colors.bg} border ${colors.border} rounded-xl p-6 transition-all ${
                  alert.productId ? "cursor-pointer hover:shadow-lg" : ""
                } ${!alert.read ? "ring-2 ring-blue-200" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${colors.icon} mt-1`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${colors.text}`}>
                        {alert.title}
                      </h3>
                      {!alert.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-2"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        {alert.timestamp}
                      </span>
                      {alert.productId && (
                        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                          View Product
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Alert Settings */}
      <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          Alert Preferences
        </h3>
        <div className="space-y-4">
          {[
            { label: "High demand detected", description: "Alert when demand exceeds 85%" },
            { label: "Low stock warnings", description: "Alert when stock falls below threshold" },
            { label: "Cloud AI price recommendations", description: "Receive intelligent pricing suggestions from our cloud platform" },
            { label: "Competitor price changes", description: "Monitor competitor pricing updates" },
            { label: "Revenue milestones", description: "Celebrate when reaching revenue goals" },
          ].map((pref, idx) => (
            <label
              key={idx}
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                defaultChecked={idx < 3}
              />
              <div>
                <p className="font-medium text-gray-900">{pref.label}</p>
                <p className="text-sm text-gray-600 mt-1">{pref.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}