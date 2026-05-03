import db from "./db.js";
import * as machineDao from "./dao/machineDao.js";

const DEFAULT_MACHINES = [
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

export function seedIfEmpty() {
  const { count } = db.prepare(`SELECT COUNT(*) AS count FROM machines`).get();
  if (count > 0) return;

  for (const machine of DEFAULT_MACHINES) {
    machineDao.create(machine);
  }
}
