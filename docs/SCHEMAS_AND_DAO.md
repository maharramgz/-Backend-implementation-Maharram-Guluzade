# Schemas and DAO methods

The application has **exactly two data entities** linked by a relationship:

- `Machine` (1) — has — (0..*) `Booking`
- Each `Booking` references one `Machine` through the foreign key `machineId`.

---

## Machine — schema

```javascript
const machineSchema = {
  machineId: "",        // string, primary key (auto-generated if omitted)
  machineName: "",      // string, required, e.g. "Washer 1"
  machineType: "",      // string, e.g. "Washing Machine" | "Dryer"
  status: "available",  // string: available | occupied | out-of-order
  locationNote: "",     // string, e.g. "Ground floor, left side"
  capacityKg: "",       // string, e.g. "7 kg"
};
```

### Machine — DAO methods

| Name | Description |
|------|-------------|
| `create(machine) -> machine` | Inserts a machine and returns the stored object. |
| `get(filter) -> machine \| machine[] \| null` | `filter = {}` returns all; `{ machineId }` returns one or `null`. |
| `update(machineId, patch) -> machine \| null` | Partial update; returns the updated object or `null` if not found. |
| `remove(machineId) -> boolean` | Deletes the machine; cascades and removes its bookings. |

---

## Booking — schema

```javascript
const bookingSchema = {
  bookingId: "",            // string, primary key (UUID, auto-generated if omitted)
  machineId: "",            // string, required, foreign key -> machineSchema.machineId
  customerName: "",         // string, required
  contactType: "email",     // "email" | "phone"
  contactValue: "",         // string, email address or phone number
  startTime: "",            // string, ISO datetime, required
  endTime: "",              // string, ISO datetime, required
  bookingStatus: "active",  // string: active | cancelled
  verificationCode: null,   // string | null, used for cancellation verification
  createdAt: "",            // string, ISO timestamp (auto-generated if omitted)
};
```

### Booking — DAO methods

| Name | Description |
|------|-------------|
| `create(booking) -> booking` | Inserts a booking; the referenced `machineId` must exist. |
| `get(filter) -> booking \| booking[] \| null` | `filter = {}` all; `{ bookingId }` one; `{ machineId }` all bookings of one machine. |
| `update(bookingId, patch) -> booking \| null` | Partial update; returns the updated object or `null`. |
| `remove(bookingId) -> boolean` | Deletes the booking. |
