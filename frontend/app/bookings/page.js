"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, helpers } from "../../lib/api";

export default function BookingsListPage() {
  const [bookings, setBookings] = useState([]);
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const [b, m] = await Promise.all([api.listBookings(), api.listMachines()]);
      setBookings(b);
      setMachines(m);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function machineName(id) {
    return machines.find((x) => x.machineId === id)?.machineName || id;
  }

  return (
    <section>
      <div className="page-header">
        <p className="section-label">Bookings — Read (list)</p>
        <h1>All bookings</h1>
        <p className="section-description">
          Each row links to the booking detail route for full CRUD actions.
        </p>
        <div className="page-actions">
          <Link href="/bookings/new" className="secondary-btn link-btn">
            Create booking
          </Link>
          <Link href="/bookings/schedule" className="nav-btn link-btn">
            Schedule view
          </Link>
          <Link href="/bookings/manage" className="nav-btn link-btn">
            Cancel with code
          </Link>
        </div>
      </div>

      {error ? <p className="feedback error">{error}</p> : null}

      {bookings.length === 0 ? (
        <div className="empty-state">No bookings yet.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Machine</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>
                    <Link href={`/bookings/${encodeURIComponent(b.bookingId)}`}>
                      {b.customerName}
                    </Link>
                  </td>
                  <td>
                    <Link href={`/machines/${encodeURIComponent(b.machineId)}`}>
                      {machineName(b.machineId)}
                    </Link>
                  </td>
                  <td>{helpers.formatDateTime(b.startTime)}</td>
                  <td>{helpers.formatDateTime(b.endTime)}</td>
                  <td>{helpers.statusLabel(b.bookingStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
