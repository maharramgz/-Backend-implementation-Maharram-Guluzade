"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ManageBookings from "../../components/ManageBookings";
import { api } from "../../lib/api";

export default function BookingsManagePage() {
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
        <p className="section-label">User story — Secure cancel</p>
        <h1>Manage bookings</h1>
        <p className="section-description">
          Cancel an active booking using the same email or phone as when the
          booking was created, plus a verification code (demo flow).
        </p>
        <div className="page-actions">
          <Link href="/bookings" className="ghost-btn link-btn">
            All bookings
          </Link>
        </div>
      </div>

      {error ? <p className="feedback error">{error}</p> : null}

      <ManageBookings
        machines={machines}
        bookings={bookings}
        selectedMachineId={selectedMachineId}
        onSelectMachine={setSelectedMachineId}
        onChanged={load}
      />
    </section>
  );
}
