"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookingEditForm from "../../../components/BookingEditForm";
import { api } from "../../../lib/api";

export default function EditBookingPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = decodeURIComponent(params.bookingId);
  const [booking, setBooking] = useState(null);
  const [machines, setMachines] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  async function loadAll() {
    try {
      const [b, m, all] = await Promise.all([
        api.getBooking(bookingId),
        api.listMachines(),
        api.listBookings(),
      ]);
      setBooking(b);
      setMachines(m);
      setBookings(all);
      setError("");
    } catch (e) {
      setBooking(null);
      setError(e.message);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  if (error && !booking) {
    return (
      <section>
        <p className="feedback error">{error}</p>
        <Link href="/bookings">Back</Link>
      </section>
    );
  }

  if (!booking) {
    return <p className="section-description">Loading…</p>;
  }

  return (
    <section>
      <div className="page-header">
        <p className="section-label">Bookings — Update</p>
        <h1>Edit booking</h1>
        <div className="page-actions">
          <Link
            href={`/bookings/${encodeURIComponent(bookingId)}`}
            className="ghost-btn link-btn"
          >
            Cancel
          </Link>
        </div>
      </div>

      <BookingEditForm
        key={booking.bookingId}
        booking={booking}
        machines={machines}
        bookings={bookings}
        onSaved={async (patch) => {
          await api.updateBooking(bookingId, patch);
          router.push(`/bookings/${encodeURIComponent(bookingId)}`);
        }}
      />
    </section>
  );
}
