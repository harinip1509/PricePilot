# PricePilot Backend

This backend provides basic user authentication for the PricePilot frontend.

## Features

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/refresh`
- `GET /user/profile`
- `PATCH /user/profile`

## Run locally

1. Install dependencies:

   `npm install`

2. Copy `.env.example` to `.env` and update the values.

3. Start the server:

   `npm run dev`

The backend runs on `http://localhost:4000` by default.

## Storage

Users are stored in `src/data/users.json` for now. This is fine for local development and demos, but it should be replaced with a real database before production.
