# PricePilot

PricePilot is a dynamic pricing web application for tracking products, monitoring stock and demand, and testing pricing recommendations powered by cloud workflows.

The project includes:
- a React + Vite frontend for product management, analytics, alerts, and pricing actions
- a lightweight Node.js backend for local authentication
- AWS-backed product APIs for product creation, simulated sales, and pricing workflows

## What The App Does

PricePilot is designed to help sellers and teams:
- add and manage products in a pricing dashboard
- view current price, suggested price, stock, and demand levels
- simulate product sales to trigger pricing logic
- test alert workflows such as low-stock and high-demand scenarios
- explore analytics and rule-based pricing ideas through a clean UI

## Main Features

- Product dashboard with pricing and stock overview
- Product detail pages with charts and pricing actions
- Add product flow with a simple form for business inputs
- Simulate sale action connected to AWS-backed endpoints
- Alerts and analytics views for demo and testing flows
- Local authentication backend for signup, login, and profile management

## Tech Stack

- Frontend: React, TypeScript, Vite
- Styling/UI: Tailwind CSS, Radix UI, MUI, Lucide icons
- Charts: Recharts
- Backend: Node.js, Express
- Cloud integrations: AWS API Gateway, Lambda, DynamoDB, SNS

## Project Structure

```text
PricePilot/
|-- src/                  # Frontend application
|-- backend/              # Local auth backend
|-- guidelines/          # Project notes and supporting docs
|-- .env                 # Frontend environment variables (ignored)
```

## Local Development

### Frontend

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a root `.env` file if needed and add your frontend environment variables.

   Example:

   ```env
   VITE_API_BASE_URL=https://your-api-id.execute-api.ap-south-1.amazonaws.com/prod
   VITE_AUTH_API_BASE_URL=http://localhost:4000
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

4. Open the Vite app in your browser:

   ```text
   http://localhost:5173
   ```

### Backend

The backend is used for local auth flows such as signup, login, and profile management.

1. Move into the backend folder:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Copy `backend/.env.example` to `backend/.env`

4. Start the backend:

   ```bash
   npm run dev
   ```

5. The backend runs on:

   ```text
   http://localhost:4000
   ```

## API Notes

- Frontend product APIs are configured through `VITE_API_BASE_URL`
- Local auth APIs are configured through `VITE_AUTH_API_BASE_URL`
- Product endpoints are expected to be served by your AWS API
- Auth endpoints are served by the local Express backend in `backend/`

## Environment And Secrets

Sensitive files are intentionally ignored from Git, including:
- `.env`
- `backend/.env`
- local user data files
- `node_modules`
- build output such as `dist`

If you clone this project, create your own local environment files before running it.

## Repository Notes

This repository is for the PricePilot application itself. It is no longer described as a Figma export bundle. The app has evolved into a working frontend + backend project with AWS-connected pricing flows.
