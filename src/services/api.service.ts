import { API_ENDPOINTS, buildApiUrl, replaceUrlParams } from "../config/api.config";

interface Product {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  suggestedPrice: number;
  demand: string;
  stock: number;
}

type ProductListResponse = Product[] | { value?: Product[]; items?: Product[]; Count?: number };

class ApiService {
  private isAwsApi() {
    return buildApiUrl("").includes("execute-api.");
  }

  private buildWriteHeaders() {
    return this.isAwsApi()
      ? { "Content-Type": "text/plain;charset=UTF-8" }
      : { "Content-Type": "application/json" };
  }

  private async parseResponse<T>(res: Response): Promise<T> {
    const rawText = await res.text();
    const data = rawText ? JSON.parse(rawText) : null;

    if (!res.ok) {
      const message =
        typeof data?.message === "string"
          ? data.message
          : typeof data?.error === "string"
          ? data.error
          : `Request failed with status ${res.status}`;
      throw new Error(message);
    }

    return data as T;
  }

  async getProducts(): Promise<Product[]> {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS.LIST));
    const data = await this.parseResponse<ProductListResponse>(res);

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.value)) {
      return data.value;
    }

    if (Array.isArray(data?.items)) {
      return data.items;
    }

    throw new Error("Unexpected products response format");
  }

  async createProduct(data: Record<string, unknown>) {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS.CREATE), {
      method: "POST",
      headers: this.buildWriteHeaders(),
      body: JSON.stringify(data),
    });

    return this.parseResponse(res);
  }

  async simulateSale(id: string) {
    const endpoint = replaceUrlParams(API_ENDPOINTS.PRODUCTS.SIMULATE_SALE, { id });

    const res = await fetch(buildApiUrl(endpoint), {
      method: "POST",
      headers: this.buildWriteHeaders(),
      body: JSON.stringify({ id }),
    });

    return this.parseResponse(res);
  }

  async applyPrice(id: string) {
    const endpoint = replaceUrlParams(API_ENDPOINTS.PRODUCTS.APPLY_PRICE, { id });

    const res = await fetch(buildApiUrl(endpoint), {
      method: "POST",
      headers: this.buildWriteHeaders(),
      body: JSON.stringify({ id }),
    });

    return this.parseResponse(res);
  }

  async getAlerts() {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.ALERTS.LIST));
    return this.parseResponse(res);
  }
}

export const apiService = new ApiService();
