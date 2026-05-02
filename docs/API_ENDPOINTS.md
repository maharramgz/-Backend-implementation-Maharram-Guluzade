# REST API — Laundry Room Helper

Base URL: `http://localhost:3000` (or your deployed host).

No authentication (public API).

---

## Machines — CRUD

| HTTP | URL | Description |
|------|-----|-------------|
| GET | `/api/machines` | List all machines |
| GET | `/api/machines/:machineId` | Get one machine |
| POST | `/api/machines` | Create machine (body: machineName, machineType; optional machineId, status, locationNote, capacityKg) |
| PUT | `/api/machines/:machineId` | Update machine (partial body) |
| DELETE | `/api/machines/:machineId` | Delete machine |

### Example — create machine

```http
POST /api/machines
Content-Type: application/json

{
  "machineName": "Washer 3",
  "machineType": "Washing Machine",
  "status": "available",
  "locationNote": "Basement",
  "capacityKg": "8 kg"
}
```

---

## Bookings — CRUD

| HTTP | URL | Description |
|------|-----|-------------|
| GET | `/api/bookings` | List all bookings |
| GET | `/api/bookings?machineId=M-101` | List bookings for one machine |
| GET | `/api/bookings/:bookingId` | Get one booking |
| POST | `/api/bookings` | Create booking (machineId must exist) |
| PUT | `/api/bookings/:bookingId` | Update booking (partial body) |
| DELETE | `/api/bookings/:bookingId` | Delete booking |

### Example — create booking

```http
POST /api/bookings
Content-Type: application/json

{
  "machineId": "M-101",
  "customerName": "Anna",
  "contactType": "email",
  "contactValue": "anna@example.com",
  "startTime": "2026-05-02T14:00",
  "endTime": "2026-05-02T15:30"
}
```

---

## Health

| GET | `/health` | `{ "ok": true }` |
