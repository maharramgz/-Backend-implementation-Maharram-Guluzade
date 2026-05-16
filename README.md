# Laundry Room Helper

Full implementation for the Laundry Room Helper application.

- **Backend** — Node.js + Express.js REST API with SQLite storage
- **Frontend** — Next.js (App Router) UI that consumes the REST API

The application has two data entities, `Machine` and `Booking`, linked
by a one-to-many relationship. There is no registration or login.

---

## Project structure

```
.
├── src/                    Express backend (API entry point)
│   ├── server.js
│   ├── db.js
│   ├── seed.js
│   ├── dao/
│   │   ├── machineDao.js
│   │   └── bookingDao.js
│   └── routes/
│       ├── machines.js
│       └── bookings.js
├── frontend/               Next.js frontend that calls the backend
│   ├── app/
│   ├── components/
│   └── lib/api.js
├── docs/                   Homework documentation
│   ├── SCHEMAS_AND_DAO.md
│   ├── API_ENDPOINTS.md
│   ├── ASSIGNMENT4_ROUTE_LIST.md
│   ├── ASSIGNMENT4_SPA_DIAGRAM.md
│   └── ASSIGNMENT4_ROUTE_DIAGRAMS.md
├── package.json            Backend dependencies
└── README.md
```

---

## Run the backend

From the repository root:

```bash
npm install
npm start
```

Backend listens on `http://127.0.0.1:3000`.

Use a different port with `PORT=4100 npm start`.

## Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend opens at `http://127.0.0.1:3001`.

If the backend listens on a non-default port, point the frontend at it:

```bash
cd frontend
NEXT_PUBLIC_API_URL=http://127.0.0.1:4100 npm run dev
```

> **Note about local paths.** Next.js 15 cannot resolve modules when the
> absolute project path contains a `#` character. If your working folder
> contains `#`, clone the repository into a clean path
> (for example `~/projects/laundry-room-helper`) before running the
> frontend. The backend is unaffected.

---

## Documentation

- [`docs/SCHEMAS_AND_DAO.md`](docs/SCHEMAS_AND_DAO.md) — schemas and DAO method list  
- [`docs/API_ENDPOINTS.md`](docs/API_ENDPOINTS.md) — every REST endpoint with examples  
- [`docs/ASSIGNMENT4_ROUTE_LIST.md`](docs/ASSIGNMENT4_ROUTE_LIST.md) — Homework 4 route list and CRUD matrix  
- [`docs/ASSIGNMENT4_SPA_DIAGRAM.md`](docs/ASSIGNMENT4_SPA_DIAGRAM.md) — SPA diagram blueprint (uuBml Draw)  
- [`docs/ASSIGNMENT4_ROUTE_DIAGRAMS.md`](docs/ASSIGNMENT4_ROUTE_DIAGRAMS.md) — per-route diagram blueprints  
- [`frontend/README.md`](frontend/README.md) — frontend usage notes  

### Homework 4 (React frontend)

The UI is **React** via **Next.js App Router** with **URL routes** for full **CRUD** on **Machine** and **Booking**. For the assignment, copy the Mermaid figures from the three `ASSIGNMENT4_*.md` files into **uuBml Draw** (SPA overview + one sheet per route), then link your GitHub repository at the top of the submission as required.
