export interface Product {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  suggestedPrice: number;
  demand: "low" | "medium" | "high";
  stock: number;
  priceHistory: { date: string; price: number; demand: number }[];
}

export interface PricingRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  active: boolean;
}

export interface Alert {
  id: string;
  type: "warning" | "info" | "success";
  title: string;
  description: string;
  productId?: string;
  timestamp: string;
  read: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    category: "Electronics",
    currentPrice: 8999,
    suggestedPrice: 9499,
    demand: "high",
    stock: 45,
    priceHistory: [
      { date: "2026-03-28", price: 8499, demand: 65 },
      { date: "2026-03-29", price: 8499, demand: 72 },
      { date: "2026-03-30", price: 8999, demand: 78 },
      { date: "2026-03-31", price: 8999, demand: 85 },
      { date: "2026-04-01", price: 8999, demand: 88 },
      { date: "2026-04-02", price: 8999, demand: 92 },
      { date: "2026-04-03", price: 8999, demand: 95 },
      { date: "2026-04-04", price: 8999, demand: 97 },
    ],
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    category: "Wearables",
    currentPrice: 4999,
    suggestedPrice: 4499,
    demand: "medium",
    stock: 230,
    priceHistory: [
      { date: "2026-03-28", price: 4999, demand: 55 },
      { date: "2026-03-29", price: 4999, demand: 54 },
      { date: "2026-03-30", price: 4999, demand: 52 },
      { date: "2026-03-31", price: 4999, demand: 50 },
      { date: "2026-04-01", price: 4999, demand: 48 },
      { date: "2026-04-02", price: 4999, demand: 47 },
      { date: "2026-04-03", price: 4999, demand: 46 },
      { date: "2026-04-04", price: 4999, demand: 45 },
    ],
  },
  {
    id: "3",
    name: "4K Ultra HD Smart TV 55\"",
    category: "Electronics",
    currentPrice: 45999,
    suggestedPrice: 48999,
    demand: "high",
    stock: 18,
    priceHistory: [
      { date: "2026-03-28", price: 45999, demand: 70 },
      { date: "2026-03-29", price: 45999, demand: 75 },
      { date: "2026-03-30", price: 45999, demand: 82 },
      { date: "2026-03-31", price: 45999, demand: 87 },
      { date: "2026-04-01", price: 45999, demand: 90 },
      { date: "2026-04-02", price: 45999, demand: 93 },
      { date: "2026-04-03", price: 45999, demand: 95 },
      { date: "2026-04-04", price: 45999, demand: 98 },
    ],
  },
  {
    id: "4",
    name: "Premium Coffee Maker",
    category: "Home Appliances",
    currentPrice: 12999,
    suggestedPrice: 11499,
    demand: "low",
    stock: 420,
    priceHistory: [
      { date: "2026-03-28", price: 12999, demand: 35 },
      { date: "2026-03-29", price: 12999, demand: 33 },
      { date: "2026-03-30", price: 12999, demand: 30 },
      { date: "2026-03-31", price: 12999, demand: 28 },
      { date: "2026-04-01", price: 12999, demand: 25 },
      { date: "2026-04-02", price: 12999, demand: 23 },
      { date: "2026-04-03", price: 12999, demand: 22 },
      { date: "2026-04-04", price: 12999, demand: 20 },
    ],
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    currentPrice: 15999,
    suggestedPrice: 17499,
    demand: "high",
    stock: 62,
    priceHistory: [
      { date: "2026-03-28", price: 14999, demand: 68 },
      { date: "2026-03-29", price: 14999, demand: 73 },
      { date: "2026-03-30", price: 15999, demand: 80 },
      { date: "2026-03-31", price: 15999, demand: 84 },
      { date: "2026-04-01", price: 15999, demand: 88 },
      { date: "2026-04-02", price: 15999, demand: 91 },
      { date: "2026-04-03", price: 15999, demand: 93 },
      { date: "2026-04-04", price: 15999, demand: 96 },
    ],
  },
  {
    id: "6",
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    currentPrice: 6499,
    suggestedPrice: 7299,
    demand: "high",
    stock: 89,
    priceHistory: [
      { date: "2026-03-28", price: 6499, demand: 75 },
      { date: "2026-03-29", price: 6499, demand: 79 },
      { date: "2026-03-30", price: 6499, demand: 83 },
      { date: "2026-03-31", price: 6499, demand: 87 },
      { date: "2026-04-01", price: 6499, demand: 90 },
      { date: "2026-04-02", price: 6499, demand: 92 },
      { date: "2026-04-03", price: 6499, demand: 94 },
      { date: "2026-04-04", price: 6499, demand: 95 },
    ],
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    category: "Sports & Outdoors",
    currentPrice: 899,
    suggestedPrice: 749,
    demand: "medium",
    stock: 580,
    priceHistory: [
      { date: "2026-03-28", price: 899, demand: 50 },
      { date: "2026-03-29", price: 899, demand: 49 },
      { date: "2026-03-30", price: 899, demand: 48 },
      { date: "2026-03-31", price: 899, demand: 47 },
      { date: "2026-04-01", price: 899, demand: 46 },
      { date: "2026-04-02", price: 899, demand: 45 },
      { date: "2026-04-03", price: 899, demand: 44 },
      { date: "2026-04-04", price: 899, demand: 43 },
    ],
  },
  {
    id: "8",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    currentPrice: 3499,
    suggestedPrice: 3999,
    demand: "high",
    stock: 134,
    priceHistory: [
      { date: "2026-03-28", price: 3499, demand: 72 },
      { date: "2026-03-29", price: 3499, demand: 76 },
      { date: "2026-03-30", price: 3499, demand: 81 },
      { date: "2026-03-31", price: 3499, demand: 85 },
      { date: "2026-04-01", price: 3499, demand: 88 },
      { date: "2026-04-02", price: 3499, demand: 91 },
      { date: "2026-04-03", price: 3499, demand: 93 },
      { date: "2026-04-04", price: 3499, demand: 94 },
    ],
  },
];

export const pricingRules: PricingRule[] = [
  {
    id: "1",
    name: "Cloud AI High Demand Optimizer",
    description: "Cloud-based AI automatically increases price when demand exceeds threshold",
    condition: "Demand Level > 85%",
    action: "Increase price by 10%",
    active: true,
  },
  {
    id: "2",
    name: "Low Stock Premium",
    description: "Real-time cloud monitoring applies premium pricing when inventory is low",
    condition: "Stock < 50 units",
    action: "Increase price by 5%",
    active: true,
  },
  {
    id: "3",
    name: "Excess Inventory Discount",
    description: "Distributed AI reduces price to move excess stock across all channels",
    condition: "Stock > 400 units",
    action: "Decrease price by 8%",
    active: false,
  },
  {
    id: "4",
    name: "Cloud Competitive Matching",
    description: "Real-time cloud sync matches competitor pricing automatically",
    condition: "Competitor price < Current price",
    action: "Match competitor price",
    active: true,
  },
  {
    id: "5",
    name: "Time-Based Surge",
    description: "Cloud-powered peak hour pricing for high-traffic periods",
    condition: "Time is 6PM - 9PM",
    action: "Increase price by 7%",
    active: false,
  },
  {
    id: "6",
    name: "Bundle Discount",
    description: "AI-driven bulk purchase incentives to encourage larger orders",
    condition: "Quantity > 3 items",
    action: "Decrease price by 12%",
    active: true,
  },
];

export const alerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "High demand detected",
    description: "Wireless Noise-Canceling Headphones showing 97% demand spike",
    productId: "1",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Low stock alert",
    description: "4K Ultra HD Smart TV 55\" inventory below threshold (18 units)",
    productId: "3",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Price drop recommended",
    description: "Premium Coffee Maker demand declining - consider price adjustment",
    productId: "4",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "success",
    title: "Rule applied successfully",
    description: "High Demand Price Increase rule triggered for 3 products",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Competitor price change",
    description: "Competitor lowered price for Mechanical Gaming Keyboard to ₹5,999",
    productId: "6",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "warning",
    title: "Excess inventory detected",
    description: "Stainless Steel Water Bottle stock at 580 units",
    productId: "7",
    timestamp: "5 hours ago",
    read: true,
  },
];

export const revenueData = [
  { month: "Oct", before: 3250000, after: 3850000 },
  { month: "Nov", before: 3580000, after: 4350000 },
  { month: "Dec", before: 3920000, after: 4850000 },
  { month: "Jan", before: 3480000, after: 4420000 },
  { month: "Feb", before: 3780000, after: 4720000 },
  { month: "Mar", before: 4050000, after: 5120000 },
];

export const demandPriceData = [
  { date: "Mar 28", price: 8499, demand: 62 },
  { date: "Mar 29", price: 8599, demand: 68 },
  { date: "Mar 30", price: 8799, demand: 75 },
  { date: "Mar 31", price: 8999, demand: 82 },
  { date: "Apr 1", price: 9199, demand: 87 },
  { date: "Apr 2", price: 9399, demand: 91 },
  { date: "Apr 3", price: 9599, demand: 94 },
  { date: "Apr 4", price: 9799, demand: 96 },
];