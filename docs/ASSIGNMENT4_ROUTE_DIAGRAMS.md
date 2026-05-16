# Homework 4 — Per-route diagrams (blueprint for uuBml Draw)

For each route, create **one diagram** in uuBml Draw: **Page → main components → `api.*` calls → REST**.

---

## `/` — Home

```mermaid
flowchart LR
  P[app/page.js] --> L[Link cards]
  L -.->|navigate| M[/machines]
  L -.->|navigate| B[/bookings]
```

Static content only (no `fetch` on this page).

---

## `/machines` — Machine list

```mermaid
flowchart LR
  P[app/machines/page.js] --> C[MachineCard]
  P --> API[listMachines + listBookings]
  API --> R1[GET /api/machines]
  API --> R2[GET /api/bookings]
```

---

## `/machines/new` — Create machine

```mermaid
flowchart LR
  P[app/machines/new/page.js] --> F[MachineForm]
  F --> API[createMachine]
  API --> R[POST /api/machines]
```

---

## `/machines/[machineId]` — Machine detail + delete

```mermaid
flowchart LR
  P[app/machines/machineId/page.js] --> API1[getMachine]
  P --> API2[listBookings?machineId]
  P --> API3[deleteMachine]
  API1 --> G[GET /api/machines/:id]
  API2 --> L[GET /api/bookings?machineId=]
  API3 --> D[DELETE /api/machines/:id]
```

---

## `/machines/[machineId]/edit` — Update machine

```mermaid
flowchart LR
  P[.../edit/page.js] --> F[MachineForm]
  F --> G[getMachine]
  F --> U[updateMachine]
  G --> R1[GET /api/machines/:id]
  U --> R2[PUT /api/machines/:id]
```

---

## `/machines/[machineId]/schedule` — Read schedule for one machine

```mermaid
flowchart LR
  P[.../schedule/page.js] --> S[ScheduleList]
  S --> API[listMachines + listBookings]
  API --> R1[GET /api/machines]
  API --> R2[GET /api/bookings]
```

---

## `/bookings` — Booking list

```mermaid
flowchart LR
  P[app/bookings/page.js] --> T[HTML table + Link]
  P --> API[listBookings + listMachines]
  API --> R1[GET /api/bookings]
  API --> R2[GET /api/machines]
```

---

## `/bookings/new` — Create booking

```mermaid
flowchart LR
  P[NewBookingClient] --> F[BookingForm]
  F --> L1[listMachines + listBookings]
  F --> C[createBooking]
  L1 --> G1[GET /api/machines]
  L1 --> G2[GET /api/bookings]
  C --> P2[POST /api/bookings]
```

---

## `/bookings/[bookingId]` — Booking detail + delete + cancel panel

```mermaid
flowchart LR
  P[app/bookings/bookingId/page.js] --> X[BookingCancelPanel]
  P --> API1[getBooking + listMachines]
  P --> API2[deleteBooking]
  X --> U[updateBooking]
  API1 --> G[GET /api/bookings/:id]
  API1 --> M[GET /api/machines]
  API2 --> D[DELETE /api/bookings/:id]
  U --> PU[PUT /api/bookings/:id]
```

---

## `/bookings/[bookingId]/edit` — Update booking

```mermaid
flowchart LR
  P[.../edit/page.js] --> F[BookingEditForm]
  F --> L[getBooking + listMachines + listBookings]
  F --> U[updateBooking]
  L --> G1[GET /api/bookings/:id]
  L --> G2[GET /api/machines]
  L --> G3[GET /api/bookings]
  U --> PU[PUT /api/bookings/:id]
```

---

## `/bookings/schedule` — Schedule selector

```mermaid
flowchart LR
  P[app/bookings/schedule/page.js] --> S[ScheduleList]
  S --> API[listMachines + listBookings]
```

---

## `/bookings/manage` — Cancel with verification

```mermaid
flowchart LR
  P[app/bookings/manage/page.js] --> M[ManageBookings]
  M --> B[BookingCancelPanel]
  M --> API[listMachines + listBookings]
  B --> U[updateBooking]
  U --> PU[PUT /api/bookings/:id]
```

---

These Mermaid blocks are intentionally small so you can redraw them quickly in uuBml Draw while keeping the same structure.
