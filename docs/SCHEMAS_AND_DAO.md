# Schema diagram (for uuBmlDraw)

Draw two entities:

- **Machine** (1) — has — (0..*) **Booking**
- **Booking** has foreign key `machineId` → **Machine.machineId**

Relation: one machine can have many bookings; each booking belongs to exactly one machine.

---

# Machine — schema (JS object for homework template)

```javascript
const machineSchema = {
  machineId: "", // string, primary key, optional on create (generated if omitted)
  machineName: "", // string, required
  machineType: "", // string, e.g. "Washing Machine", "Dryer"
  status: "available", // string: available | occupied | out-of-order (app-specific)
  locationNote: "", // string
  capacityKg: "", // string, e.g. "7 kg"
};
```

## Machine — DAO methods

| Name | Description |
|------|-------------|
| `create(machine) → machine` | Inserts a machine; returns the stored row. |
| `get(filter) → machine \| machine[] \| null` | `filter = {}` lists all; `{ machineId }` returns one or null. |
| `update(machineId, patch) → machine \| null` | Partial update; returns updated row or null. |
| `remove(machineId) → boolean` | Deletes machine (cascades bookings in SQLite). |

---

# Booking — schema (JS object for homework template)

```javascript
const bookingSchema = {
  bookingId: "", // string, primary key, optional on create (UUID)
  machineId: "", // string, required, FK → machineSchema.machineId
  customerName: "", // string, required
  contactType: "email", // "email" | "phone"
  contactValue: "", // string, email or phone for verification
  startTime: "", // ISO-like string (datetime-local compatible)
  endTime: "", // ISO-like string
  bookingStatus: "active", // string: active | cancelled
  verificationCode: null, // string | null, for cancel flow
  createdAt: "", // ISO timestamp
};
```

## Booking — DAO methods

| Name | Description |
|------|-------------|
| `create(booking) → booking` | Inserts booking; machine must exist (FK). |
| `get(filter) → booking \| booking[] \| null` | `filter = {}` all; `{ bookingId }` one; `{ machineId }` list for machine. |
| `update(bookingId, patch) → booking \| null` | Partial update. |
| `remove(bookingId) → boolean` | Deletes booking. |
