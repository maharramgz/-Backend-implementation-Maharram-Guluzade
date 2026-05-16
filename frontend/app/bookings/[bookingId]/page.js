"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookingCancelPanel from "../../../components/BookingCancelPanel";
import { api, helpers } from "../../../lib/api";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = decodeURIComponent(params.bookingId);
  const [booking, setBooking] = useState(null);
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    setError("");
    try {
      const [b, m] = await Promise.all([
        api.getBooking(bookingId),
        api.listMachines(),
      ]);
      setBooking(b);
      setMachines(m);
    } catch (e) {
      setBooking(null);
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load when booking id from URL changes
  }, [bookingId]);

  async function handleDelete() {
    if (!window.confirm("Permanently delete this booking?")) return;
    setBusy(true);
    try {
      await api.deleteBooking(bookingId);
      router.push("/bookings");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (error && !booking) {
    return (
      <section>
        <p className="feedback error">{error}</p>
        <Link href="/bookings" className="ghost-btn link-btn">
          All bookings
        </Link>
      </section>
    );
  }

  if (!booking) {
    return <p className="section-description">Loading…</p>;
  }

  const machine = machines.find((m) => m.machineId === booking.machineId);

  return (
    <section>
      <div className="page-header">
        <p className="section-label">Bookings — Read (one)</p>
        <h1>{booking.customerName}</h1>
        <p className="section-description">
          Machine:{" "}
          {machine ? (
            <Link href={`/machines/${encodeURIComponent(booking.machineId)}`}>
              {machine.machineName}
            </Link>
          ) : (
            booking.machineId
          )}
        </p>
        <div className="page-actions">
          <Link href="/bookings" className="ghost-btn link-btn">
            All bookings
          </Link>
          <Link
            href={`/bookings/${encodeURIComponent(bookingId)}/edit`}
            className="secondary-btn link-btn"
          >
            Edit booking
          </Link>
          <button type="button" className="danger-btn" disabled={busy} onClick={handleDelete}>
            Delete booking
          </button>
        </div>
      </div>

      <div className="panel-grid">
        <article className="panel">
          <h3>Reservation</h3>
          <div className="booking-row-meta" style={{ marginTop: 12 }}>
            <span className="booking-pill">{helpers.formatDateTime(booking.startTime)}</span>
            <span className="booking-pill">{helpers.formatDateTime(booking.endTime)}</span>
            <span className={`booking-pill status-${booking.bookingStatus}`}>
              {helpers.statusLabel(booking.bookingStatus)}
            </span>
          </div>
          <p style={{ marginTop: 16, color: "var(--muted)" }}>
            <strong>Booking ID:</strong> {booking.bookingId}
          </p>
          <p style={{ color: "var(--muted)" }}>
            <strong>Contact:</strong> {booking.contactType} —{" "}
            {helpers.maskContact(booking.contactType, booking.contactValue)}
          </p>
        </article>

        <article className="panel">
          <h3>Actions</h3>
          <BookingCancelPanel booking={booking} onChanged={load} />
        </article>
      </div>
    </section>
  );
}
