"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookingForm from "../../components/BookingForm";
import { api } from "../../lib/api";

export default function NewBookingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const machineIdFromUrl = searchParams.get("machineId") || undefined;
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
        <p className="section-label">Bookings — Create</p>
        <h1>New booking</h1>
        <div className="page-actions">
          <Link href="/bookings" className="ghost-btn link-btn">
            All bookings
          </Link>
        </div>
      </div>

      {error ? <p className="feedback error">{error}</p> : null}

      <BookingForm
        machines={machines}
        bookings={bookings}
        defaultMachineId={machineIdFromUrl}
        onCreated={async (created) => {
          await load();
          router.push(`/bookings/${encodeURIComponent(created.bookingId)}`);
        }}
      />
    </section>
  );
}
