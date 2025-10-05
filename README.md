# Jewelry Website

A full‑stack jewelry storefront with authentication, product browsing, cart/checkout, order + payment capture, and custom design submissions.

## Tech Stack

- Client: React 19, Vite, Tailwind CSS, React Router, Axios
- Server: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs

## Features

- Auth: Register, login, JWT-protected endpoints
- Protected pages via route guard
- Collections, categories, product detail buy flows
- Cart and checkout
- Orders and payments (Razorpay fields stored)
- Custom design submission

## Project Structure

- `client/` — React app (Vite)
- `server/` — Express API with Mongoose models
- Root scripts in `package.json` for convenience

## Getting Started (Local)

Prereqs: Node.js, MongoDB

1) Install dependencies
```bash
npm install --prefix server
npm install --prefix client
```
2) Environment variables (create `server/.env`)
```ini
MONGODB_URI=mongodb://127.0.0.1:27017/jewelry
JWT_SECRET=your-long-random-secret
JWT_EXPIRE=7d
PORT=5000
```
3) Start services
```bash
npm run server      # backend: http://localhost:5000
npm run start       # frontend: http://localhost:5173
```

The frontend is configured to call the API at `http://localhost:5000/api` (see `client/src/lib/axiosConfig.ts`).

## API Endpoints

- Auth
  - POST `/api/user/register` — create user
  - POST `/api/user/login` — obtain JWT
  - GET `/api/user/me` — current user (Authorization: Bearer <token>)
- Orders
  - POST `/api/orders/create` — create Payment + Order, returns `orderId`
- Designs
  - POST `/api/designs` — create a design submission

## Frontend Routing

- Uses `HashRouter` for static hosting compatibility
- Auth guard in `client/src/Pages/RequireAuth.tsx` checks `localStorage` for `token` and `user`

## Deployment

- Backend (Express)
  - Typical hosts: Render, Railway, Fly.io, etc.
  - Ensure environment variables are set on the host
  - CORS should allow your frontend origin
- Frontend (Vite React)
  - Typical hosts: Vercel, Netlify
  - Build: `npm run build` (from `client`)
  - Output: `client/dist/`
  - For production, set Axios baseURL to your deployed backend URL in `client/src/lib/axiosConfig.ts`

## CORS

Update `server/server.js` to allow local and deployed frontend origins, for example:
```js
app.use(cors({ origin: ["http://localhost:5173", "https://your-frontend-domain"], credentials: false }));
```

## Scripts

- `npm run start` — start client dev server
- `npm run build` — build client
- `npm run server` — start Express server

## Roadmap Ideas

- Order history pages
- Admin dashboard (products/orders/users)
- Real payment gateway integration
- Image optimization & lazy loading

## License

MIT (or your preferred license)
