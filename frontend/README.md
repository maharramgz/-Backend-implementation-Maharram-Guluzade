# Laundry Room Helper — Frontend

React application (Next.js 15 App Router) using the Express REST API.

## Requirements

- Node.js 18+
- Backend running (see repository root `README.md`)

## Install and run

```bash
npm install
npm run dev
```

Dev server: `http://127.0.0.1:3001`.

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:4100 npm run dev
```

**Path constraint:** the checkout directory’s full path must not contain `#` (Next.js / RSC). The `predev` / `prebuild` script exits with a short error if `#` is detected.

## Architecture docs

- [`docs/ROUTE_LIST.md`](../docs/ROUTE_LIST.md) — routes and CRUD map  
- [`docs/SPA_DIAGRAM.md`](../docs/SPA_DIAGRAM.md) — SPA overview (Mermaid)  
- [`docs/ROUTE_DIAGRAMS.md`](../docs/ROUTE_DIAGRAMS.md) — per-route flows (Mermaid)  

## Main features

- **Machines** — `/machines`, `/machines/new`, `/machines/[id]`, edit, per-machine schedule  
- **Bookings** — `/bookings`, `/bookings/new`, `/bookings/[id]`, edit, combined schedule view, manage/cancel flow  
- **Verification** — booking uses email or phone; cancellation requires matching contact and a demo six-digit code stored via `PUT /api/bookings/:id` (`verificationCode`), then status `cancelled` (no external SMS/email gateway)
