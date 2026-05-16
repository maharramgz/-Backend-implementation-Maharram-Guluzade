# Frontend route list

Stack: **React** (Next.js 15 App Router). Pages call the REST API via `NEXT_PUBLIC_API_URL` (default `http://127.0.0.1:3000`).

## Data model

- **Machine** (1) — parent entity  
- **Booking** (0..*) — child entity; `machineId` references a machine  
- No authentication or role separation

## Routes

| Route | Purpose | REST (primary) |
|-------|---------|------------------|
| `/` | Home; navigation to entities | — |
| `/machines` | List machines; live “occupied” from bookings | `GET /api/machines`, `GET /api/bookings` |
| `/machines/new` | Create machine | `POST /api/machines` |
| `/machines/[machineId]` | Machine detail; delete | `GET /api/machines/:id`, `GET /api/bookings?machineId=`, `DELETE /api/machines/:id` |
| `/machines/[machineId]/edit` | Update machine | `GET /api/machines/:id`, `PUT /api/machines/:id` |
| `/machines/[machineId]/schedule` | Schedule for one machine | `GET /api/machines`, `GET /api/bookings` |
| `/bookings` | List bookings | `GET /api/bookings`, `GET /api/machines` |
| `/bookings/new` | Create booking | `GET /api/machines`, `GET /api/bookings`, `POST /api/bookings` |
| `/bookings/[bookingId]` | Booking detail; delete; cancel (status update) | `GET /api/bookings/:id`, `GET /api/machines`, `PUT /api/bookings/:id`, `DELETE /api/bookings/:id` |
| `/bookings/[bookingId]/edit` | Update booking | `GET /api/bookings/:id`, `GET /api/machines`, `GET /api/bookings`, `PUT /api/bookings/:id` |
| `/bookings/schedule` | Schedule with machine selector | `GET /api/machines`, `GET /api/bookings` |
| `/bookings/manage` | Cancel flow with verification code | `GET /api/machines`, `GET /api/bookings`, `PUT /api/bookings/:id` |

**Query string:** `/bookings/new?machineId=M-101` pre-selects a machine.

## CRUD matrix

| Operation | Machine | Booking |
|-----------|---------|---------|
| Create | `/machines/new` | `/bookings/new` |
| Read (list) | `/machines` | `/bookings` |
| Read (one) | `/machines/[machineId]` | `/bookings/[bookingId]` |
| Update | `/machines/[machineId]/edit` | `/bookings/[bookingId]/edit` (cancel: `PUT` on detail or manage) |
| Delete | `/machines/[machineId]` | `/bookings/[bookingId]` |
