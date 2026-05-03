"use client";

import { helpers } from "../lib/api";

export default function MachineCard({ machine, bookings, onBook, onSchedule }) {
  const status = helpers.computeMachineStatus(machine, bookings);

  return (
    <article className="machine-card">
      <div className="machine-card-top">
        <div>
          <p className="machine-type">{machine.machineType}</p>
          <h3 className="machine-name">{machine.machineName}</h3>
        </div>
        <span className={`status-badge status-${status}`}>
          {helpers.statusLabel(status)}
        </span>
      </div>

      <dl className="machine-meta">
        <div>
          <dt>Capacity</dt>
          <dd>{machine.capacityKg}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{machine.locationNote}</dd>
        </div>
      </dl>

      <div className="machine-card-actions">
        <button type="button" className="secondary-btn" onClick={onBook}>
          Book now
        </button>
        <button type="button" className="ghost-btn" onClick={onSchedule}>
          View schedule
        </button>
      </div>
    </article>
  );
}
