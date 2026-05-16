"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MachineCard from "../../components/MachineCard";
import { api } from "../../lib/api";

export default function MachinesListPage() {
  const [machines, setMachines] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const [m, b] = await Promise.all([api.listMachines(), api.listBookings()]);
      setMachines(m);
      setBookings(b);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section>
      <div className="page-header">
        <p className="section-label">Machines — Read (list)</p>
        <h1>Laundry machines</h1>
        <p className="section-description">
          Each card shows live availability based on active bookings.
        </p>
        <div className="page-actions">
          <Link href="/machines/new" className="secondary-btn link-btn">
            Create machine
          </Link>
        </div>
      </div>

      {error ? <p className="feedback error">{error}</p> : null}

      <div className="machine-grid">
        {machines.map((machine) => (
          <MachineCard
            key={machine.machineId}
            machine={machine}
            bookings={bookings}
            detailHref={`/machines/${encodeURIComponent(machine.machineId)}`}
            bookHref={`/bookings/new?machineId=${encodeURIComponent(machine.machineId)}`}
            scheduleHref={`/machines/${encodeURIComponent(machine.machineId)}/schedule`}
          />
        ))}
      </div>
    </section>
  );
}
