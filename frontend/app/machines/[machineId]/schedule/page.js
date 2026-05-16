"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ScheduleList from "../../../components/ScheduleList";
import { api } from "../../../lib/api";

export default function MachineSchedulePage() {
  const params = useParams();
  const machineId = decodeURIComponent(params.machineId);
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

  const exists = machines.some((x) => x.machineId === machineId);

  if (machines.length === 0 && !error) {
    return <p className="section-description">Loading…</p>;
  }

  return (
    <section>
      <div className="page-header">
        <p className="section-label">Bookings — Read (by machine)</p>
        <h1>Machine schedule</h1>
        <div className="page-actions">
          <Link href="/machines" className="ghost-btn link-btn">
            Machines
          </Link>
          <Link
            href={`/machines/${encodeURIComponent(machineId)}`}
            className="nav-btn link-btn"
          >
            Machine detail
          </Link>
        </div>
      </div>

      {error ? <p className="feedback error">{error}</p> : null}
      {!exists && machines.length > 0 ? (
        <p className="feedback error">Machine not found.</p>
      ) : (
        <ScheduleList
          machines={machines}
          bookings={bookings}
          selectedMachineId={machineId}
          onSelectMachine={() => {}}
          hideMachineSelector
          linkBookings
        />
      )}
    </section>
  );
}
