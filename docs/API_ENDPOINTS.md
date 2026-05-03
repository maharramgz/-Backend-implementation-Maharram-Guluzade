# REST API — endpoint reference

Base URL: `http://127.0.0.1:3000`

The API is **public** (no authentication, no login).
All requests and responses use `application/json`.

---

## Health

| Method | URL | Description |
|--------|-----|-------------|
| `GET`  | `/health` | Service status. Returns `{ "ok": true }`. |

---

## Machines — CRUD

| Method | URL | Description |
|--------|-----|-------------|
| `GET`    | `/api/machines` | List all machines. |
| `GET`    | `/api/machines/:machineId` | Get one machine by id. |
| `POST`   | `/api/machines` | Create a new machine. |
| `PUT`    | `/api/machines/:machineId` | Update an existing machine (partial body). |
| `DELETE` | `/api/machines/:machineId` | Delete a machine and its bookings. |

### POST `/api/machines` — request body

```json
{
  "machineId": "M-303",
  "machineName": "Washer 3",
  "machineType": "Washing Machine",
  "status": "available",
  "locationNote": "Basement, left side",
  "capacityKg": "8 kg"
}
```

`machineName` and `machineType` are required. `machineId` is generated if not provided.

### Response (`201 Created`)

```json
{
  "machineId": "M-303",
  "machineName": "Washer 3",
  "machineType": "Washing Machine",
  "status": "available",
  "locationNote": "Basement, left side",
  "capacityKg": "8 kg"
}
```

### Errors

| Code | When |
|------|------|
| `400` | Missing required fields. |
| `404` | Machine not found. |
| `409` | Machine id already exists. |

---

## Bookings — CRUD

| Method | URL | Description |
|--------|-----|-------------|
| `GET`    | `/api/bookings` | List all bookings. |
| `GET`    | `/api/bookings?machineId=M-101` | List bookings for one machine. |
| `GET`    | `/api/bookings/:bookingId` | Get one booking by id. |
| `POST`   | `/api/bookings` | Create a new booking. |
| `PUT`    | `/api/bookings/:bookingId` | Update an existing booking (partial body). |
| `DELETE` | `/api/bookings/:bookingId` | Delete a booking. |

### POST `/api/bookings` — request body

```json
{
  "machineId": "M-101",
  "customerName": "Anna",
  "contactType": "email",
  "contactValue": "anna@example.com",
  "startTime": "2026-05-03T17:00",
  "endTime": "2026-05-03T18:30"
}
```

`machineId`, `customerName`, `contactType`, `contactValue`, `startTime`, `endTime` are required.  
`contactType` must be `"email"` or `"phone"`.  
`bookingId`, `bookingStatus`, `verificationCode`, `createdAt` are optional and have defaults.

### Response (`201 Created`)

```json
{
  "bookingId": "0c4b9c6e-8e35-4b8a-9b0d-8e8a1d6e1b0f",
  "machineId": "M-101",
  "customerName": "Anna",
  "contactType": "email",
  "contactValue": "anna@example.com",
  "startTime": "2026-05-03T17:00",
  "endTime": "2026-05-03T18:30",
  "bookingStatus": "active",
  "verificationCode": null,
  "createdAt": "2026-05-03T14:31:22.184Z"
}
```

### Errors

| Code | When |
|------|------|
| `400` | Missing field, invalid `contactType`, or `machineId` does not exist. |
| `404` | Booking not found. |
