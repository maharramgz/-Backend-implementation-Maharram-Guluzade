import { randomUUID } from "crypto";
import db from "../db.js";

function rowToMachine(row) {
  if (!row) return null;
  return {
    machineId: row.machine_id,
    machineName: row.machine_name,
    machineType: row.machine_type,
    status: row.status,
    locationNote: row.location_note,
    capacityKg: row.capacity_kg,
  };
}

export function create(machine) {
  const machineId = machine.machineId || `M-${randomUUID().slice(0, 8)}`;
  db.prepare(
    `INSERT INTO machines (machine_id, machine_name, machine_type, status, location_note, capacity_kg)
     VALUES (@machine_id, @machine_name, @machine_type, @status, @location_note, @capacity_kg)`
  ).run({
    machine_id: machineId,
    machine_name: machine.machineName,
    machine_type: machine.machineType,
    status: machine.status ?? "available",
    location_note: machine.locationNote ?? "",
    capacity_kg: machine.capacityKg ?? "",
  });

  return get({ machineId });
}

export function get(filter = {}) {
  if (filter.machineId) {
    const row = db
      .prepare(`SELECT * FROM machines WHERE machine_id = ?`)
      .get(filter.machineId);
    return rowToMachine(row);
  }

  return db
    .prepare(`SELECT * FROM machines ORDER BY machine_name`)
    .all()
    .map(rowToMachine);
}

export function update(machineId, patch) {
  const existing = get({ machineId });
  if (!existing) return null;

  const merged = {
    machineName: patch.machineName ?? existing.machineName,
    machineType: patch.machineType ?? existing.machineType,
    status: patch.status ?? existing.status,
    locationNote: patch.locationNote ?? existing.locationNote,
    capacityKg: patch.capacityKg ?? existing.capacityKg,
  };

  db.prepare(
    `UPDATE machines SET
       machine_name = @machine_name,
       machine_type = @machine_type,
       status = @status,
       location_note = @location_note,
       capacity_kg = @capacity_kg
     WHERE machine_id = @machine_id`
  ).run({
    machine_id: machineId,
    machine_name: merged.machineName,
    machine_type: merged.machineType,
    status: merged.status,
    location_note: merged.locationNote,
    capacity_kg: merged.capacityKg,
  });

  return get({ machineId });
}

export function remove(machineId) {
  if (!get({ machineId })) return false;
  const result = db.prepare(`DELETE FROM machines WHERE machine_id = ?`).run(machineId);
  return result.changes > 0;
}
