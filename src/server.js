import express from "express";
import cors from "cors";
import db from "./db.js";
import machineRoutes from "./routes/machines.js";
import bookingRoutes from "./routes/bookings.js";
import * as machineDao from "./dao/machineDao.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/machines", machineRoutes);
app.use("/api/bookings", bookingRoutes);

function seedIfEmpty() {
  const rows = db.prepare(`SELECT COUNT(*) as c FROM machines`).get();
  if (rows.c > 0) return;
  const defaults = [
    {
      machineId: "M-101",
      machineName: "Washer 1",
      machineType: "Washing Machine",
      status: "available",
      locationNote: "Ground floor, left side",
      capacityKg: "7 kg",
    },
    {
      machineId: "M-102",
      machineName: "Washer 2",
      machineType: "Washing Machine",
      status: "available",
      locationNote: "Ground floor, center",
      capacityKg: "8 kg",
    },
    {
      machineId: "M-201",
      machineName: "Dryer 1",
      machineType: "Dryer",
      status: "available",
      locationNote: "Ground floor, right side",
      capacityKg: "9 kg",
    },
    {
      machineId: "M-202",
      machineName: "Dryer 2",
      machineType: "Dryer",
      status: "out-of-order",
      locationNote: "Ground floor, back corner",
      capacityKg: "9 kg",
    },
  ];
  for (const m of defaults) {
    machineDao.create(m);
  }
}

seedIfEmpty();

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Laundry Room Helper API listening on http://127.0.0.1:${PORT}`);
});
