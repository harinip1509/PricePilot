import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, Package, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getStoredProducts, applySuggestedPrice, saveProducts } from "../data/productStore";
import { apiService } from "../../services/api.service";
import type { Product } from "../data/mockData";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => getStoredProducts());
  const product = products.find((p) => p.id === id);
  const [currentPrice, setCurrentPrice] = useState(product?.currentPrice || 0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const normalizeProduct = (rawProduct: Record<string, unknown>): Product => {
    const currentPriceValue = Number(rawProduct.currentPrice ?? rawProduct.price ?? 0);
    const suggestedPriceValue = Number(rawProduct.suggestedPrice ?? rawProduct.price ?? currentPriceValue);

    return {
      id: String(rawProduct.id),
      name: String(rawProduct.name ?? "Untitled Product"),
      category: String(rawProduct.category ?? "General"),
      currentPrice: currentPriceValue,
      suggestedPrice: suggestedPriceValue,
      demand:
        rawProduct.demand === "high" || rawProduct.demand === "medium" || rawProduct.demand === "low"
          ? rawProduct.demand
          : "medium",
      stock: Number(rawProduct.stock ?? 0),
      priceHistory: Array.isArray(rawProduct.priceHistory)
        ? (rawProduct.priceHistory as Product["priceHistory"])
        : [
            {
              date: new Date().toISOString().slice(0, 10),
              price: currentPriceValue,
              demand: 50,
            },
          ],
    };
  };

  useEffect(() => {
    setProducts(getStoredProducts());
  }, [id]);

  useEffect(() => {
    setCurrentPrice(product?.currentPrice || 0);
  }, [product?.currentPrice]);

  if (!product) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  const handleApplyPrice = () => {
    const updatedProducts = applySuggestedPrice(product.id);
    setProducts(updatedProducts);
  };

  const handleSimulateSale = async () => {
    setIsSimulating(true);
    setError("");
    setStatusMessage("");

    try {
      const updatedProduct = await apiService.simulateSale(product.id);
      const normalizedProduct = normalizeProduct(updatedProduct as Record<string, unknown>);
      const nextProducts = products.map((entry) =>
        entry.id === product.id ? normalizedProduct : entry,
      );

      setProducts(nextProducts);
      saveProducts(nextProducts);

      const alertStatus =
        typeof (updatedProduct as Record<string, unknown>).alertStatus === "string"
          ? String((updatedProduct as Record<string, unknown>).alertStatus)
          : "updated";

      setStatusMessage(
        `Sale simulated successfully. Stock is now ${normalizedProduct.stock} and alert status is ${alertStatus}.`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message}. Check that your API Gateway route points to the Lambda and returns CORS headers.`
          : "Failed to simulate sale. Check that your API Gateway route points to the Lambda.",
      );
    } finally {
      setIsSimulating(false);
    }
  };

  const priceDiff = product.suggestedPrice - currentPrice;
  const priceDiffPercent = ((priceDiff / currentPrice) * 100).toFixed(1);

  return (
    <div className="p-8">
      {/* Header */}
      <button
        onClick={() => navigate("/app/products")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Products</span>
      </button>

      {error && (
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          {error}
        </div>
      )}

      {statusMessage && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Product Info Card */}
        <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.category}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ₹{
                product.demand === "high"
                  ? "bg-red-100 text-red-700"
                  : product.demand === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {product.demand.charAt(0).toUpperCase() + product.demand.slice(1)} Demand
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <DollarSign className="w-5 h-5" />
                <p className="text-sm font-medium">Current Price</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">₹{product.currentPrice.toFixed(2)}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <p className="text-sm font-medium">Suggested Price</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">₹{product.suggestedPrice.toFixed(2)}</p>
              <p className="text-sm text-green-600 mt-1 font-medium">
                +{((product.suggestedPrice - product.currentPrice) / product.currentPrice * 100).toFixed(1)}%
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Package className="w-5 h-5" />
                <p className="text-sm font-medium">Stock Level</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{product.stock}</p>
              <p className="text-sm text-gray-600 mt-1">units available</p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div>
              <p className="font-semibold text-amber-900">Demo SNS Trigger</p>
              <p className="text-sm text-amber-800">
                Run your AWS `simulateSale` Lambda for this product and refresh the stock and suggested price.
              </p>
            </div>
            <button
              onClick={() => void handleSimulateSale()}
              disabled={isSimulating}
              className="ml-4 rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSimulating ? "Simulating..." : "Simulate Sale"}
            </button>
          </div>

          {currentPrice !== product.suggestedPrice && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-900 mb-1">
                    Price Optimization Recommended
                  </p>
                  <p className="text-sm text-blue-700">
                    Based on current demand and market conditions, we recommend adjusting the
                    price to ₹{product.suggestedPrice.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleApplyPrice}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap ml-4"
                >
                  Apply Suggested Price
                </button>
              </div>
            </div>
          )}

          {currentPrice === product.suggestedPrice && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="font-semibold text-green-900">Price Optimized</p>
              <p className="text-sm text-green-700 mt-1">
                Current price matches the suggested optimal price
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Demand Metrics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Current Demand</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {product.priceHistory[product.priceHistory.length - 1].demand}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#5a67d8] h-2 rounded-full"
                    style={{
                      width: `₹{product.priceHistory[product.priceHistory.length - 1].demand}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">7-day trend</p>
                <p className="text-2xl font-bold text-green-600 mt-1">+35%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Revenue Impact</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Estimated weekly gain</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹28,500</p>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">If price optimized</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">₹34,200</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Price History */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Price History</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={product.priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="price-history-x-axis" dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis key="price-history-y-axis" stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                key="price-history-line"
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
                name="Price (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Demand Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Demand Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={product.priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis key="demand-trend-x-axis" dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis key="demand-trend-y-axis" stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                key="demand-trend-line"
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
      </div>
    </div>
  );
}
