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

3. Create `src/data/users.json` for local auth storage.

   You can copy `src/data/users.example.json` to `src/data/users.json`, or let the app
   create it automatically on first run.

4. Start the server:

   `npm run dev`

The backend runs on `http://localhost:4000` by default.

## Storage

Users are stored in `src/data/users.json` for now. That file is intentionally ignored by Git
so local demo accounts and hashed passwords are not committed publicly. The repository includes
`src/data/users.example.json` as a safe starter file. This should still be replaced with a real
database before production.
