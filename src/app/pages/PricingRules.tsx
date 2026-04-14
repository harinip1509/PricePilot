import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { pricingRules as initialRules } from "../data/mockData";

export function PricingRules() {
  const [rules, setRules] = useState(initialRules);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const activeRulesCount = rules.filter((r) => r.active).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Rules</h1>
          <p className="text-gray-600 mt-1">
            {activeRulesCount} of {rules.length} rules currently active
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#2c3e50] text-white font-medium rounded-lg hover:bg-[#1a252f] transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create New Rule
        </button>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-2 gap-6">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`bg-white rounded-xl p-6 border-2 transition-all ${
              rule.active
                ? "border-blue-300 shadow-lg shadow-blue-100"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {rule.name}
                </h3>
                <p className="text-sm text-gray-600">{rule.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={rule.active}
                  onChange={() => toggleRule(rule.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-medium text-gray-500 mb-1">CONDITION</p>
                <p className="text-sm font-medium text-gray-900">{rule.condition}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs font-medium text-blue-600 mb-1">ACTION</p>
                <p className="text-sm font-medium text-blue-900">{rule.action}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span
                className={`text-sm font-medium ${
                  rule.active ? "text-green-600" : "text-gray-400"
                }`}
              >
                {rule.active ? "Active" : "Inactive"}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Rule</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rule Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Weekend Surge Pricing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe what this rule does"
                ></textarea>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Condition</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trigger Type
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Demand Level</option>
                      <option>Stock Level</option>
                      <option>Time of Day</option>
                      <option>Competitor Price</option>
                      <option>Custom Metric</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operator
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Greater than</option>
                      <option>Less than</option>
                      <option>Equal to</option>
                      <option>Between</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Threshold Value
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter threshold value"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Action</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Action Type
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Increase price by %</option>
                      <option>Decrease price by %</option>
                      <option>Set fixed price</option>
                      <option>Match competitor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adjustment Value
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter percentage or amount"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Activate this rule immediately
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 bg-[#2c3e50] text-white font-medium rounded-lg hover:bg-[#1a252f] transition-colors"
              >
                Create Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}