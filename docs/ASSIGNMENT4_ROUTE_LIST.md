# Homework 4 — Route list (Laundry Room Helper)

Repository: same GitHub project as backend homework (Express API + this Next.js app).

Technology: **React** via **Next.js 15** (App Router). Each URL below is a client-rendered page that calls the REST API (`NEXT_PUBLIC_API_URL`, default `http://127.0.0.1:3000`).

## Entity relationship (reminder)

- **Machine** (1) — parent entity  
- **Booking** (0..*) — child entity; each booking references `machineId`  
- Public app: **no login**, **no roles**

---

## Routes (URL → purpose → REST used)

| # | Route | Screen purpose | Primary REST operations |
|---|-------|----------------|-------------------------|
| 1 | `/` | Home / entry hub; links to both entities | — |
| 2 | `/machines` | **Read** all machines (+ live “occupied” from bookings) | `GET /api/machines`, `GET /api/bookings` |
| 3 | `/machines/new` | **Create** machine | `POST /api/machines` |
| 4 | `/machines/[machineId]` | **Read** one machine; **Delete** machine | `GET /api/machines/:id`, `GET /api/bookings?machineId=`, `DELETE /api/machines/:id` |
| 5 | `/machines/[machineId]/edit` | **Update** machine | `GET /api/machines/:id`, `PUT /api/machines/:id` |
| 6 | `/machines/[machineId]/schedule` | **Read** bookings for one machine (schedule) | `GET /api/machines`, `GET /api/bookings` (filter client-side) |
| 7 | `/bookings` | **Read** all bookings (table) | `GET /api/bookings`, `GET /api/machines` |
| 8 | `/bookings/new` | **Create** booking | `GET /api/machines`, `GET /api/bookings`, `POST /api/bookings` |
| 9 | `/bookings/[bookingId]` | **Read** one booking; **Delete** booking; cancel flow (**Update** status) | `GET /api/bookings/:id`, `GET /api/machines`, `PUT /api/bookings/:id`, `DELETE /api/bookings/:id` |
| 10 | `/bookings/[bookingId]/edit` | **Update** booking fields | `GET /api/bookings/:id`, `GET /api/machines`, `GET /api/bookings`, `PUT /api/bookings/:id` |
| 11 | `/bookings/schedule` | User story: schedule by machine (selector) | `GET /api/machines`, `GET /api/bookings` |
| 12 | `/bookings/manage` | User story: cancel with verification code | `GET /api/machines`, `GET /api/bookings`, `PUT /api/bookings/:id` |

**Query string**

- `/bookings/new?machineId=M-101` — pre-selects machine when opening **Create booking** from a machine card.

---

## CRUD coverage matrix

| Operation | Machine | Booking |
|-----------|---------|---------|
| Create | `/machines/new` | `/bookings/new` |
| Read (list) | `/machines` | `/bookings` |
| Read (one) | `/machines/[machineId]` | `/bookings/[bookingId]` |
| Update | `/machines/[machineId]/edit` | `/bookings/[bookingId]/edit` (+ cancel uses `PUT` on detail/manage) |
| Delete | `/machines/[machineId]` | `/bookings/[bookingId]` |

---

## How to submit diagrams (uuBml Draw)

1. Open **uuBml Draw** in the course environment.  
2. For the **SPA diagram**, recreate the graph in `ASSIGNMENT4_SPA_DIAGRAM.md` (Mermaid is a blueprint — same nodes and edges).  
3. For **each route**, use `ASSIGNMENT4_ROUTE_DIAGRAMS.md`: one small diagram per route (page → components → API calls).  
4. Export or attach according to your instructor’s instructions.

If your local folder path contains `#`, clone the repo to a path **without** `#` before running `npm run dev` in `frontend/` (see root `README.md`).
