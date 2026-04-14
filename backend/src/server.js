require("dotenv").config();

const app = require("./app");

const port = Number(process.env.PORT) || 4000;
const fallbackJwtSecret = "pricepilot-local-dev-secret-change-me";

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = fallbackJwtSecret;
  console.warn(
    "JWT_SECRET was not found in backend/.env. Using a temporary local development secret.",
  );
}

app.listen(port, () => {
  console.log(`PricePilot auth backend is running on http://localhost:${port}`);
});
