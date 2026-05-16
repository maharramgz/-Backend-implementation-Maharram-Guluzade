"use client";

import Link from "next/link";
import { helpers } from "../lib/api";

export default function MachineCard({
  machine,
  bookings,
  detailHref,
  bookHref,
  scheduleHref,
}) {
  const status = helpers.computeMachineStatus(machine, bookings);

  return (
    <article className="machine-card">
      <div className="machine-card-top">
        <div>
          <p className="machine-type">{machine.machineType}</p>
          {detailHref ? (
            <h3 className="machine-name">
              <Link href={detailHref}>{machine.machineName}</Link>
            </h3>
          ) : (
            <h3 className="machine-name">{machine.machineName}</h3>
          )}
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
        {bookHref ? (
          <Link href={bookHref} className="secondary-btn link-btn">
            Book now
          </Link>
        ) : null}
        {scheduleHref ? (
          <Link href={scheduleHref} className="ghost-btn link-btn">
            View schedule
          </Link>
        ) : null}
      </div>
    </article>
  );
}
