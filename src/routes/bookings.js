import { Router } from "express";
import * as bookingDao from "../dao/bookingDao.js";
import * as machineDao from "../dao/machineDao.js";

const router = Router();

router.get("/", (req, res) => {
  const { machineId } = req.query;
  if (machineId) {
    const list = bookingDao.get({ machineId: String(machineId) });
    return res.json(list);
  }
  const list = bookingDao.get({});
  res.json(list);
});

router.get("/:bookingId", (req, res) => {
  const booking = bookingDao.get({ bookingId: req.params.bookingId });
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.json(booking);
});

router.post("/", (req, res) => {
  const body = req.body || {};
  const required = [
    "machineId",
    "customerName",
    "contactType",
    "contactValue",
    "startTime",
    "endTime",
  ];
  for (const key of required) {
    if (body[key] === undefined || body[key] === "") {
      return res.status(400).json({ error: `Field "${key}" is required` });
    }
  }
  const machine = machineDao.get({ machineId: body.machineId });
  if (!machine) {
    return res.status(400).json({ error: "machineId does not reference an existing machine" });
  }
  if (!["email", "phone"].includes(body.contactType)) {
    return res.status(400).json({ error: "contactType must be email or phone" });
  }
  try {
    const created = bookingDao.create({
      machineId: body.machineId,
      customerName: body.customerName,
      contactType: body.contactType,
      contactValue: String(body.contactValue),
      startTime: body.startTime,
      endTime: body.endTime,
      bookingStatus: body.bookingStatus,
      verificationCode: body.verificationCode,
      bookingId: body.bookingId,
      createdAt: body.createdAt,
    });
    res.status(201).json(created);
  } catch (e) {
    if (e?.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
      return res.status(400).json({ error: "Invalid machine reference" });
    }
    throw e;
  }
});

router.put("/:bookingId", (req, res) => {
  const existing = bookingDao.get({ bookingId: req.params.bookingId });
  if (!existing) {
    return res.status(404).json({ error: "Booking not found" });
  }
  const patch = req.body || {};
  if (patch.machineId) {
    const machine = machineDao.get({ machineId: patch.machineId });
    if (!machine) {
      return res.status(400).json({ error: "machineId does not reference an existing machine" });
    }
  }
  if (patch.contactType && !["email", "phone"].includes(patch.contactType)) {
    return res.status(400).json({ error: "contactType must be email or phone" });
  }
  const updated = bookingDao.update(req.params.bookingId, patch);
  res.json(updated);
});

router.delete("/:bookingId", (req, res) => {
  const ok = bookingDao.remove(req.params.bookingId);
  if (!ok) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.status(204).send();
});

export default router;
