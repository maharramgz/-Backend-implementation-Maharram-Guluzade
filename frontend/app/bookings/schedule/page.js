"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ScheduleList from "../../components/ScheduleList";
import { api } from "../../lib/api";

export default function BookingsSchedulePage() {
  const [machines, setMachines] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedMachineId, setSelectedMachineId] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      const [m, b] = await Promise.all([api.listMachines(), api.listBookings()]);
      setMachines(m);
      setBookings(b);
      setSelectedMachineId((prev) => {
        if (prev && m.some((x) => x.machineId === prev)) return prev;
        return m[0]?.machineId || "";
      });
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
        <p className="section-label">User story — Schedule</p>
        <h1>Booking schedule</h1>
        <p className="section-description">
          Read bookings filtered by machine (<code>GET /api/bookings?machineId=</code>
          ).
        </p>
        <div className="page-actions">
          <Link href="/bookings" className="ghost-btn link-btn">
            All bookings
          </Link>
        </div>
      </div>

      {error ? <p className="feedback error">{error}</p> : null}

      <ScheduleList
        machines={machines}
        bookings={bookings}
        selectedMachineId={selectedMachineId}
        onSelectMachine={setSelectedMachineId}
        linkBookings
      />
    </section>
  );
}
