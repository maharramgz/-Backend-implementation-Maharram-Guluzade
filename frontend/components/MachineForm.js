"use client";

import { useEffect, useState } from "react";

const empty = {
  machineName: "",
  machineType: "",
  status: "available",
  locationNote: "",
  capacityKg: "",
  customMachineId: "",
};

export default function MachineForm({ initial, mode = "create", onSubmit }) {
  const [fields, setFields] = useState(empty);

  useEffect(() => {
    if (initial) {
      setFields({
        machineName: initial.machineName ?? "",
        machineType: initial.machineType ?? "",
        status: initial.status ?? "available",
        locationNote: initial.locationNote ?? "",
        capacityKg: initial.capacityKg ?? "",
        customMachineId: "",
      });
    } else {
      setFields(empty);
    }
  }, [initial]);

  function update(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      machineName: fields.machineName.trim(),
      machineType: fields.machineType.trim(),
      status: fields.status,
      locationNote: fields.locationNote.trim(),
      capacityKg: fields.capacityKg.trim(),
    };
    if (mode === "create" && fields.customMachineId.trim()) {
      payload.machineId = fields.customMachineId.trim();
    }
    await onSubmit(payload);
  }

  return (
    <form className="booking-form panel" onSubmit={handleSubmit}>
      {mode === "create" && (
        <label>
          <span>Custom machine ID (optional)</span>
          <input
            type="text"
            placeholder="Leave empty to auto-generate"
            value={fields.customMachineId}
            onChange={(e) => update("customMachineId", e.target.value)}
          />
        </label>
      )}

      <label>
        <span>Machine name</span>
        <input
          type="text"
          required
          maxLength={80}
          value={fields.machineName}
          onChange={(e) => update("machineName", e.target.value)}
        />
      </label>

      <label>
        <span>Machine type</span>
        <input
          type="text"
          required
          maxLength={60}
          placeholder="e.g. Washing Machine, Dryer"
          value={fields.machineType}
          onChange={(e) => update("machineType", e.target.value)}
        />
      </label>

      <label>
        <span>Operational status</span>
        <select
          value={fields.status}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="available">Available</option>
          <option value="out-of-order">Out of order</option>
        </select>
      </label>

      <label>
        <span>Location note</span>
        <input
          type="text"
          maxLength={120}
          value={fields.locationNote}
          onChange={(e) => update("locationNote", e.target.value)}
        />
      </label>

      <label>
        <span>Capacity</span>
        <input
          type="text"
          maxLength={40}
          placeholder="e.g. 8 kg"
          value={fields.capacityKg}
          onChange={(e) => update("capacityKg", e.target.value)}
        />
      </label>

      <button type="submit" className="primary-btn">
        {mode === "create" ? "Create machine" : "Save changes"}
      </button>
    </form>
  );
}
