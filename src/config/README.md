# API & Backend Configuration Guide

This directory contains configuration files for backend APIs, AWS services, and third-party integrations.

## Files

- **api.config.ts** - Main configuration file for all backend services
- **/.env.example** - Example environment variables (located in project root)

## Quick Start

### 1. Set Up Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your actual values in `.env.local`. **Never commit this file to version control!**

### 2. Using the Configuration

Import and use the configuration in your components:

```typescript
import { API_ENDPOINTS, buildApiUrl, buildHeaders } from '@/config/api.config';

// Example: Fetch products
const response = await fetch(buildApiUrl(API_ENDPOINTS.PRODUCTS.LIST), {
  headers: buildHeaders(authToken),
});
```

### 3. AWS Services Setup

#### AWS Cognito (Authentication)
1. Create a User Pool in AWS Cognito
2. Copy the User Pool ID and Client ID to your `.env.local`
3. Update the authentication flow in `src/contexts/AuthContext.tsx`

#### AWS S3 (File Storage)
1. Create an S3 bucket for file uploads
2. Set appropriate CORS and bucket policies
3. Update the bucket name in `.env.local`

#### AWS Lambda (Serverless Functions)
1. Deploy your Lambda functions for pricing engine and analytics
2. Copy the ARNs to `.env.local`
3. Ensure proper IAM roles and permissions

#### AWS DynamoDB (Database)
1. Create tables for products and pricing rules
2. Set up appropriate indexes for queries
3. Update table names in `.env.local`

## Configuration Sections

### 1. API Configuration

```typescript
API_CONFIG.BASE_URL       // Your backend API base URL
API_CONFIG.VERSION        // API version (default: v1)
API_CONFIG.TIMEOUT        // Request timeout in milliseconds
```

### 2. API Endpoints

All endpoints are organized by feature:

- `AUTH` - Authentication endpoints
- `USER` - User management
- `PRODUCTS` - Product CRUD operations
- `PRICING_RULES` - Pricing rules management
- `ANALYTICS` - Analytics and reporting
- `ALERTS` - Notification alerts
- `CLOUD` - Cloud infrastructure metrics

### 3. AWS Configuration

Complete AWS service configuration including:

- **Cognito** - User authentication and authorization
- **S3** - File storage and static assets
- **Lambda** - Serverless function execution
- **DynamoDB** - NoSQL database for products and rules
- **CloudWatch** - Logging and monitoring
- **SQS** - Message queuing for async operations

### 4. Third-Party Integrations

- **Stripe** - Payment processing
- **Google Analytics** - User analytics
- **Sentry** - Error tracking and monitoring
- **Email Service** - SendGrid or AWS SES

### 5. Feature Flags

Control feature availability:

```typescript
FEATURE_FLAGS.ENABLE_ANALYTICS_EXPORT   // Enable CSV/PDF export
FEATURE_FLAGS.ENABLE_BULK_UPLOAD        // Enable bulk product upload
FEATURE_FLAGS.ENABLE_REAL_TIME_UPDATES  // Enable WebSocket updates
FEATURE_FLAGS.ENABLE_AI_PREDICTIONS     // Enable AI-powered pricing
```

## Helper Functions

### buildApiUrl(endpoint: string)

Builds a complete API URL with base URL and version:

```typescript
const url = buildApiUrl(API_ENDPOINTS.PRODUCTS.LIST);
// Result: https://api.pricepilot.com/v1/products
```

### replaceUrlParams(url: string, params: Record<string, string | number>)

Replace URL parameters with actual values:

```typescript
const url = replaceUrlParams(API_ENDPOINTS.PRODUCTS.GET, { id: 123 });
// Result: /products/123
```

### buildHeaders(token?: string)

Build request headers with optional authentication:

```typescript
const headers = buildHeaders(authToken);
// Result: { 'Content-Type': 'application/json', 'Authorization': 'Bearer token' }
```

## Security Best Practices

1. **Never commit `.env.local`** - Add it to `.gitignore`
2. **Use environment-specific configs** - Different values for dev/staging/prod
3. **Rotate API keys regularly** - Update credentials periodically
4. **Use AWS IAM roles** - Limit permissions to minimum required
5. **Enable HTTPS only** - Never use HTTP in production
6. **Validate configurations** - Use `validateConfig()` on app startup

## Example Usage

### Making an API Call

```typescript
import { API_ENDPOINTS, buildApiUrl, buildHeaders, replaceUrlParams } from '@/config/api.config';

async function fetchProduct(productId: number) {
  const endpoint = replaceUrlParams(API_ENDPOINTS.PRODUCTS.GET, { id: productId });
  const url = buildApiUrl(endpoint);

  const response = await fetch(url, {
    method: 'GET',
    headers: buildHeaders(authToken),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
}
```

### AWS S3 File Upload

```typescript
import { AWS_CONFIG } from '@/config/api.config';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: AWS_CONFIG.S3.REGION,
  // Configure credentials via AWS SDK
});

async function uploadFile(file: File) {
  const params = {
    Bucket: AWS_CONFIG.S3.BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.name}`,
    Body: file,
  };

  return s3.upload(params).promise();
}
```

## Troubleshooting

### Configuration Not Loading

Check that:
1. `.env.local` exists and has the correct variables
2. Variable names start with `VITE_` prefix
3. Development server was restarted after adding new variables

### CORS Errors

Ensure your backend API has proper CORS headers:

```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### AWS Credentials Issues

1. Check IAM permissions for your user/role
2. Verify region matches your resource locations
3. Ensure access keys are valid and not expired

## Production Deployment

Before deploying to production:

1. ✅ Update all environment variables in `.env.local`
2. ✅ Set `VITE_ENVIRONMENT=production`
3. ✅ Use production API URLs (not localhost)
4. ✅ Enable HTTPS and SSL certificates
5. ✅ Configure proper CORS policies
6. ✅ Set up monitoring and logging
7. ✅ Test all integrations thoroughly
8. ✅ Run `validateConfig()` to ensure all required vars are set

## Support

For issues or questions about the configuration:
1. Check the main documentation
2. Review AWS service documentation
3. Contact the development team
