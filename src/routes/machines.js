import { Router } from "express";
import * as machineDao from "../dao/machineDao.js";

const router = Router();

router.get("/", (_req, res) => {
  const list = machineDao.get({});
  res.json(list);
});

router.get("/:machineId", (req, res) => {
  const machine = machineDao.get({ machineId: req.params.machineId });
  if (!machine) {
    return res.status(404).json({ error: "Machine not found" });
  }
  res.json(machine);
});

router.post("/", (req, res) => {
  const { machineName, machineType, status, locationNote, capacityKg, machineId } = req.body || {};
  if (!machineName || !machineType) {
    return res.status(400).json({ error: "machineName and machineType are required" });
  }
  try {
    const created = machineDao.create({
      machineId,
      machineName,
      machineType,
      status,
      locationNote,
      capacityKg,
    });
    res.status(201).json(created);
  } catch (e) {
    if (e?.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
      return res.status(409).json({ error: "Machine id already exists" });
    }
    throw e;
  }
});

router.put("/:machineId", (req, res) => {
  const updated = machineDao.update(req.params.machineId, req.body || {});
  if (!updated) {
    return res.status(404).json({ error: "Machine not found" });
  }
  res.json(updated);
});

router.delete("/:machineId", (req, res) => {
  const ok = machineDao.remove(req.params.machineId);
  if (!ok) {
    return res.status(404).json({ error: "Machine not found" });
  }
  res.status(204).send();
});

export default router;
