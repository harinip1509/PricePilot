import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Plus, ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getStoredProducts, applySuggestedPrice, addProduct, saveProducts } from "../data/productStore";
import { apiService } from "../../services/api.service";
import type { Product } from "../data/mockData";

const getDemandColor = (demand: string) => {
  switch (demand) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getDemandIcon = (demand: string) => {
  switch (demand) {
    case "high":
      return <TrendingUp className="w-4 h-4" />;
    case "medium":
      return <Minus className="w-4 h-4" />;
    case "low":
      return <TrendingDown className="w-4 h-4" />;
  }
};

export function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => getStoredProducts());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Electronics");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  const [newProductDemand, setNewProductDemand] = useState<Product["demand"]>("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulatingProductId, setSimulatingProductId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const normalizeProduct = (product: Record<string, unknown>): Product => {
    const currentPrice = Number(product.currentPrice ?? product.price ?? 0);
    const suggestedPrice = Number(product.suggestedPrice ?? product.price ?? currentPrice);

    return {
      id: String(product.id),
      name: String(product.name ?? "Untitled Product"),
      category: String(product.category ?? "General"),
      currentPrice,
      suggestedPrice,
      demand:
        product.demand === "high" || product.demand === "medium" || product.demand === "low"
          ? product.demand
          : "medium",
      stock: Number(product.stock ?? 0),
      priceHistory: Array.isArray(product.priceHistory)
        ? (product.priceHistory as Product["priceHistory"])
        : [
            {
              date: new Date().toISOString().slice(0, 10),
              price: currentPrice,
              demand: 50,
            },
          ],
    };
  };

  const loadProducts = async () => {
    try {
      const apiProducts = await apiService.getProducts();
      const normalizedProducts = apiProducts.map((product) =>
        normalizeProduct(product as unknown as Record<string, unknown>),
      );
      setProducts(normalizedProducts);
      saveProducts(normalizedProducts);
    } catch {
      setProducts(getStoredProducts());
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const handleApplyPrice = (productId: string) => {
    setProducts(applySuggestedPrice(productId));
  };

  const handleSimulateSale = async (productId: string) => {
    setSimulatingProductId(productId);
    setError("");
    setStatusMessage("");

    try {
      const updatedProduct = await apiService.simulateSale(productId);
      const normalizedProduct = normalizeProduct(updatedProduct as Record<string, unknown>);
      const nextProducts = products.map((product) =>
        product.id === productId ? normalizedProduct : product,
      );

      setProducts(nextProducts);
      saveProducts(nextProducts);

      const alertStatus =
        typeof (updatedProduct as Record<string, unknown>).alertStatus === "string"
          ? String((updatedProduct as Record<string, unknown>).alertStatus)
          : "updated";

      setStatusMessage(
        `Sale simulated for ${normalizedProduct.name}. Stock is now ${normalizedProduct.stock} and alert status is ${alertStatus}.`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message}. Check that your AWS API route is deployed and CORS is enabled.`
          : "Failed to simulate sale. Check that your AWS API route is deployed and reachable.",
      );
    } finally {
      setSimulatingProductId(null);
    }
  };

  const handleAddProduct = async () => {
    const price = Number(newProductPrice);
    const stock = Number(newProductStock);

    if (
      !newProductName.trim() ||
      Number.isNaN(price) ||
      Number.isNaN(stock) ||
      price <= 0 ||
      stock < 0
    ) {
      setError("Please enter a valid product name, category, price greater than 0, and stock of 0 or more.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setStatusMessage("");

    const createPayload = {
      name: newProductName.trim(),
      category: newProductCategory,
      price,
      stock,
      demand: newProductDemand,
    };

    const localFallbackProduct: Product = {
      id: Date.now().toString(),
      name: newProductName.trim(),
      category: newProductCategory,
      currentPrice: price,
      suggestedPrice: price,
      demand: newProductDemand,
      stock,
      priceHistory: [
        {
          date: new Date().toISOString().slice(0, 10),
          price,
          demand: 50,
        },
      ],
    };

    try {
      const apiProduct = await apiService.createProduct(createPayload);
      const normalizedProduct = normalizeProduct(apiProduct as Record<string, unknown>);
      const nextProducts = [normalizedProduct, ...products.filter((product) => product.id !== normalizedProduct.id)];

      setProducts(nextProducts);
      saveProducts(nextProducts);
      setShowAddModal(false);
      setNewProductName("");
      setNewProductCategory("Electronics");
      setNewProductPrice("");
      setNewProductStock("");
      setNewProductDemand("medium");
      setStatusMessage(`${normalizedProduct.name} was added successfully.`);
    } catch (err) {
      const updatedProducts = addProduct(localFallbackProduct);

      setProducts(updatedProducts);
      setShowAddModal(false);
      setNewProductName("");
      setNewProductCategory("Electronics");
      setNewProductPrice("");
      setNewProductStock("");
      setNewProductDemand("medium");
      setError(
        err instanceof Error
          ? `${err.message}. Saved locally for now.`
          : "Product API unavailable. Saved locally for now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage and optimize pricing for {products.length} products
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#2c3e50] text-white font-medium rounded-lg hover:bg-[#1a252f] transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

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

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Wearables</option>
          <option>Home Appliances</option>
          <option>Furniture</option>
          <option>Sports & Outdoors</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Demand Levels</option>
          <option>High Demand</option>
          <option>Medium Demand</option>
          <option>Low Demand</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Sort by: Name</option>
          <option>Sort by: Price</option>
          <option>Sort by: Demand</option>
          <option>Sort by: Stock</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Current Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Suggested Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Demand
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const priceDiff = product.suggestedPrice - product.currentPrice;
              const priceDiffPercent = ((priceDiff / product.currentPrice) * 100).toFixed(1);

              return (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/app/products/${product.id}`)}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{product.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      ₹{product.currentPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        ₹{product.suggestedPrice.toFixed(2)}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          priceDiff > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {priceDiff > 0 ? "+" : ""}
                        {priceDiffPercent}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(
                        product.demand
                      )}`}
                    >
                      {getDemandIcon(product.demand)}
                      {product.demand.charAt(0).toUpperCase() + product.demand.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        product.stock < 50
                          ? "text-red-600"
                          : product.stock < 200
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {product.currentPrice !== product.suggestedPrice && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyPrice(product.id);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply Price
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          void handleSimulateSale(product.id);
                        }}
                        disabled={simulatingProductId === product.id}
                        className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {simulatingProductId === product.id ? "Simulating..." : "Simulate Sale"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/products/${product.id}`);
                        }}
                        className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
            <p className="mb-6 text-sm text-gray-600">
              Enter only the product details users control here. Backend-generated fields
              like suggested price, alert status, price history, and timestamps should be
              created automatically after submission.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Electronics</option>
                  <option>Wearables</option>
                  <option>Home Appliances</option>
                  <option>Furniture</option>
                  <option>Sports & Outdoors</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Price
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Demand Level
                </label>
                <select
                  value={newProductDemand}
                  onChange={(e) => setNewProductDemand(e.target.value as Product["demand"])}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
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
                onClick={handleAddProduct}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#2c3e50] text-white font-medium rounded-lg hover:bg-[#1a252f] transition-colors"
              >
                {isSubmitting ? "Adding..." : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
