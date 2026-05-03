import express from "express";
import cors from "cors";
import machineRoutes from "./routes/machines.js";
import bookingRoutes from "./routes/bookings.js";
import { seedIfEmpty } from "./seed.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    service: "Laundry Room Helper API",
    framework: "Express.js",
    entities: ["Machine", "Booking"],
    endpoints: {
      health: "GET /health",
      machines: {
        list: "GET /api/machines",
        get: "GET /api/machines/:machineId",
        create: "POST /api/machines",
        update: "PUT /api/machines/:machineId",
        remove: "DELETE /api/machines/:machineId",
      },
      bookings: {
        list: "GET /api/bookings",
        listByMachine: "GET /api/bookings?machineId=:machineId",
        get: "GET /api/bookings/:bookingId",
        create: "POST /api/bookings",
        update: "PUT /api/bookings/:bookingId",
        remove: "DELETE /api/bookings/:bookingId",
      },
    },
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/machines", machineRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

seedIfEmpty();

app.listen(PORT, () => {
  console.log(`Laundry Room Helper API listening on http://127.0.0.1:${PORT}`);
});
