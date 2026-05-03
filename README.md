# Laundry Room Helper — Backend

REST API for the **Laundry Room Helper** application.

- Framework: **Node.js + Express.js**
- Storage: **SQLite** via `better-sqlite3` (file `data/app.db`)
- Entities: **Machine** and **Booking** (linked by `machineId`)
- Public API — no registration, no login

---

## Project structure

```
backend-repo/
├── src/
│   ├── server.js          Express app entry point
│   ├── db.js              SQLite connection and schema
│   ├── seed.js            Default machines on first run
│   ├── dao/
│   │   ├── machineDao.js  CRUD methods for Machine
│   │   └── bookingDao.js  CRUD methods for Booking
│   └── routes/
│       ├── machines.js    REST endpoints for /api/machines
│       └── bookings.js    REST endpoints for /api/bookings
└── docs/
    ├── SCHEMAS_AND_DAO.md Schema definitions and DAO methods
    └── API_ENDPOINTS.md   REST endpoint reference
```

---

## Requirements

- Node.js **18+**

## Install and run

```bash
npm install
npm start
```

The API listens on `http://127.0.0.1:3000` by default.  
Use `PORT=4000 npm start` to change the port.

## Quick check

```bash
curl http://127.0.0.1:3000/health
curl http://127.0.0.1:3000/api/machines
```

---

## Documentation

- [`docs/SCHEMAS_AND_DAO.md`](docs/SCHEMAS_AND_DAO.md) — schemas and DAO method list
- [`docs/API_ENDPOINTS.md`](docs/API_ENDPOINTS.md) — every REST endpoint with examples
