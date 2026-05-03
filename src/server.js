import express from "express";
import cors from "cors";
import machineRoutes from "./routes/machines.js";
import bookingRoutes from "./routes/bookings.js";
import { seedIfEmpty } from "./seed.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
