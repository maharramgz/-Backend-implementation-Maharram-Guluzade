# Laundry Room Helper — Backend

Node.js + Express REST API for **Machine** and **Booking** (shared laundry room booking).  
SQLite persistence (`data/app.db`). No login.

## Requirements

- Node.js 18+

## Install & run

```bash
cd backend
npm install
npm start
```

API: `http://127.0.0.1:3000`

- `GET /health`
- `GET /api/machines`
- `GET /api/bookings`

See `docs/API_ENDPOINTS.md` and `docs/SCHEMAS_AND_DAO.md` for homework submission.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial backend: Express CRUD for Machine and Booking"
git branch -M main
git remote add origin git@github.com:maharramgz/-Backend-implementation-Maharram-Guluzade.git
git push -u origin main
```

If the remote already has commits, use `git pull origin main --allow-unrelated-histories` before pushing.
