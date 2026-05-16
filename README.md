# Laundry Room Helper

Full-stack laundry room booking application.

- **Backend** — Node.js, Express.js, SQLite (`better-sqlite3`)
- **Frontend** — React (Next.js 15 App Router) consuming the REST API

Two entities: **Machine** (parent) and **Booking** (child, `machineId` foreign key). No registration or login.

---

## Project structure

```
.
├── src/                    Express API
│   ├── server.js
│   ├── db.js
│   ├── seed.js
│   ├── dao/
│   └── routes/
├── frontend/               Next.js app
│   ├── app/
│   ├── components/
│   └── lib/api.js
├── docs/
│   ├── SCHEMAS_AND_DAO.md
│   ├── API_ENDPOINTS.md
│   ├── ROUTE_LIST.md
│   ├── SPA_DIAGRAM.md
│   └── ROUTE_DIAGRAMS.md
├── package.json
└── README.md
```

---

## Run the backend

```bash
npm install
npm start
```

Default: `http://127.0.0.1:3000`. Override: `PORT=4100 npm start`.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Default: `http://127.0.0.1:3001`. Non-default API URL:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:4100 npm run dev
```

**Next.js:** the absolute project path must not contain a `#` character (React Server Components limitation). Use a checkout directory whose full path has no `#`.

---

## Documentation

- [`docs/SCHEMAS_AND_DAO.md`](docs/SCHEMAS_AND_DAO.md) — entity schemas and DAO
- [`docs/API_ENDPOINTS.md`](docs/API_ENDPOINTS.md) — REST reference
- [`docs/ROUTE_LIST.md`](docs/ROUTE_LIST.md) — frontend URL routes and CRUD map
- [`docs/SPA_DIAGRAM.md`](docs/SPA_DIAGRAM.md) — high-level SPA structure (Mermaid)
- [`docs/ROUTE_DIAGRAMS.md`](docs/ROUTE_DIAGRAMS.md) — per-route data flow (Mermaid)
- [`frontend/README.md`](frontend/README.md) — frontend details
