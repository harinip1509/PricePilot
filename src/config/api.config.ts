/**
 * API and Backend Configuration
 *
 * This file contains all backend API endpoints, AWS service configurations,
 * and third-party integrations. Update these values for production deployment.
 */

// =============================================================================
// BACKEND API CONFIGURATION
// =============================================================================

export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:4000" : "https://u1hanuaxhl.execute-api.ap-south-1.amazonaws.com/prod"),
  AUTH_BASE_URL:
    import.meta.env.VITE_AUTH_API_BASE_URL ||
    "http://localhost:4000",
  TIMEOUT: 30000,
};

// =============================================================================
// API ENDPOINTS
// =============================================================================

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // User Management
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    SETTINGS: '/user/settings',
  },

  // Products
  PRODUCTS: {
    LIST: '/products',
    GET: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    SIMULATE_SALE: '/products/:id/simulate-sale',
    APPLY_PRICE: '/products/:id/apply-price',
    BULK_UPLOAD: '/products/bulk',
    EXPORT: '/products/export',
  },

  // Pricing Rules
  PRICING_RULES: {
    LIST: '/pricing-rules',
    GET: '/pricing-rules/:id',
    CREATE: '/pricing-rules',
    UPDATE: '/pricing-rules/:id',
    DELETE: '/pricing-rules/:id',
    ACTIVATE: '/pricing-rules/:id/activate',
    DEACTIVATE: '/pricing-rules/:id/deactivate',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    REVENUE: '/analytics/revenue',
    DEMAND: '/analytics/demand',
    PRICE_CHANGES: '/analytics/price-changes',
    REPORTS: '/analytics/reports',
    EXPORT: '/analytics/export',
  },

  // Alerts
  ALERTS: {
    LIST: '/alerts',
    GET: '/alerts/:id',
    MARK_READ: '/alerts/:id/read',
    DELETE: '/alerts/:id',
    SETTINGS: '/alerts/settings',
  },

  // Cloud Infrastructure
  CLOUD: {
    STATUS: '/cloud/status',
    METRICS: '/cloud/metrics',
    SCALING: '/cloud/scaling',
  },
};

// =============================================================================
// AWS CONFIGURATION
// =============================================================================

export const AWS_CONFIG = {
  // AWS Region
  REGION: import.meta.env.VITE_AWS_REGION || 'us-west-2',

  // AWS Cognito (Authentication)
  COGNITO: {
    USER_POOL_ID: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID || '',
    CLIENT_ID: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID || '',
    IDENTITY_POOL_ID: import.meta.env.VITE_AWS_COGNITO_IDENTITY_POOL_ID || '',
  },

  // AWS S3 (File Storage)
  S3: {
    BUCKET_NAME: import.meta.env.VITE_AWS_S3_BUCKET || 'pricepilot-uploads',
    REGION: import.meta.env.VITE_AWS_S3_REGION || 'us-west-2',
  },

  // AWS Lambda (Serverless Functions)
  LAMBDA: {
    PRICING_ENGINE_ARN: import.meta.env.VITE_AWS_LAMBDA_PRICING_ENGINE || '',
    ANALYTICS_PROCESSOR_ARN: import.meta.env.VITE_AWS_LAMBDA_ANALYTICS || '',
  },

  // AWS DynamoDB (NoSQL Database)
  DYNAMODB: {
    PRODUCTS_TABLE: import.meta.env.VITE_AWS_DYNAMODB_PRODUCTS_TABLE || 'pricepilot-products',
    RULES_TABLE: import.meta.env.VITE_AWS_DYNAMODB_RULES_TABLE || 'pricepilot-rules',
  },

  // AWS CloudWatch (Monitoring)
  CLOUDWATCH: {
    LOG_GROUP: import.meta.env.VITE_AWS_CLOUDWATCH_LOG_GROUP || '/aws/pricepilot',
  },

  // AWS SQS (Message Queue)
  SQS: {
    PRICE_UPDATES_QUEUE: import.meta.env.VITE_AWS_SQS_PRICE_UPDATES || '',
    NOTIFICATIONS_QUEUE: import.meta.env.VITE_AWS_SQS_NOTIFICATIONS || '',
  },
};

// =============================================================================
// THIRD-PARTY INTEGRATIONS
// =============================================================================

export const INTEGRATIONS = {
  // Stripe (Payment Processing)
  STRIPE: {
    PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
  },

  // Analytics
  GOOGLE_ANALYTICS: {
    TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || '',
  },

  // Monitoring
  SENTRY: {
    DSN: import.meta.env.VITE_SENTRY_DSN || '',
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  },

  // Email Service (SendGrid/AWS SES)
  EMAIL: {
    PROVIDER: import.meta.env.VITE_EMAIL_PROVIDER || 'sendgrid',
    API_KEY: import.meta.env.VITE_EMAIL_API_KEY || '',
  },
};

// =============================================================================
// FEATURE FLAGS
// =============================================================================

export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS_EXPORT: import.meta.env.VITE_FEATURE_ANALYTICS_EXPORT === 'true',
  ENABLE_BULK_UPLOAD: import.meta.env.VITE_FEATURE_BULK_UPLOAD === 'true',
  ENABLE_REAL_TIME_UPDATES: import.meta.env.VITE_FEATURE_REAL_TIME === 'true',
  ENABLE_AI_PREDICTIONS: import.meta.env.VITE_FEATURE_AI_PREDICTIONS === 'true',
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Build a complete API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Build a complete auth API URL
 */
export const buildAuthApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.AUTH_BASE_URL}${endpoint}`;
};

/**
 * Replace URL parameters (e.g., :id with actual ID)
 */
export const replaceUrlParams = (url: string, params: Record<string, string | number>): string => {
  let finalUrl = url;
  Object.keys(params).forEach((key) => {
    finalUrl = finalUrl.replace(`:${key}`, String(params[key]));
  });
  return finalUrl;
};

/**
 * Build headers for API requests
 */
export const buildHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// =============================================================================
// VALIDATION
// =============================================================================

/**
 * Check if all required environment variables are set
 */
export const validateConfig = (): { valid: boolean; missing: string[] } => {
  const requiredVars = [
    'VITE_API_BASE_URL',
    // Add other required environment variables here
  ];

  const missing = requiredVars.filter((varName) => !import.meta.env[varName]);

  return {
    valid: missing.length === 0,
    missing,
  };
};
