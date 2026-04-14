import { products as seedProducts, type Product } from "./mockData";

const STORAGE_KEY = "pricepilot-products";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getStoredProducts(): Product[] {
  if (!canUseStorage()) {
    return seedProducts;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }

  try {
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed : seedProducts;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }
}

export function saveProducts(products: Product[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function applySuggestedPrice(productId: string): Product[] {
  const updatedProducts = getStoredProducts().map((product) => {
    if (product.id !== productId) {
      return product;
    }

    return {
      ...product,
      currentPrice: product.suggestedPrice,
      priceHistory: [
        ...product.priceHistory,
        {
          date: new Date().toISOString().slice(0, 10),
          price: product.suggestedPrice,
          demand: product.priceHistory[product.priceHistory.length - 1]?.demand ?? 0,
        },
      ],
    };
  });

  saveProducts(updatedProducts);
  return updatedProducts;
}

export function addProduct(product: Product): Product[] {
  const updatedProducts = [product, ...getStoredProducts()];
  saveProducts(updatedProducts);
  return updatedProducts;
}
