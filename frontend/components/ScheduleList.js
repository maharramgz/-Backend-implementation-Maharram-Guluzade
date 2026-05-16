"use client";

import Link from "next/link";
import { helpers } from "../lib/api";

export default function ScheduleList({
  machines,
  bookings,
  selectedMachineId,
  onSelectMachine,
  hideMachineSelector,
  linkBookings,
}) {
  const machineBookings = bookings
    .filter((booking) => booking.machineId === selectedMachineId)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <article className="panel">
      <div className="panel-header">
        <h3>Booking schedule</h3>
        {!hideMachineSelector ? (
          <select
            aria-label="Select machine for schedule"
            value={selectedMachineId}
            onChange={(event) => onSelectMachine(event.target.value)}
          >
            {machines.map((machine) => (
              <option key={machine.machineId} value={machine.machineId}>
                {machine.machineName} ({machine.machineType})
              </option>
            ))}
          </select>
        ) : (
          <span className="section-description" style={{ margin: 0 }}>
            {machines.find((m) => m.machineId === selectedMachineId)?.machineName ||
              selectedMachineId}
          </span>
        )}
      </div>

      {machineBookings.length === 0 && (
        <div className="booking-list">
          <div className="booking-row-empty">
            No bookings have been created for this machine yet.
          </div>
        </div>
      )}

      {machineBookings.length > 0 && (
        <div className="booking-list">
          {machineBookings.map((booking) => (
            <article key={booking.bookingId} className="booking-row">
              <div className="booking-row-main">
                <h4>
                  {linkBookings ? (
                    <Link href={`/bookings/${booking.bookingId}`}>
                      {booking.customerName}
                    </Link>
                  ) : (
                    booking.customerName
                  )}
                </h4>
                <div className="booking-row-meta">
                  <span className="booking-pill">
                    {helpers.formatDateTime(booking.startTime)}
                  </span>
                  <span className="booking-pill">
                    {helpers.formatDateTime(booking.endTime)}
                  </span>
                  <span className={`booking-pill status-${booking.bookingStatus}`}>
                    {helpers.statusLabel(booking.bookingStatus)}
                  </span>
                  <span className="booking-pill contact-pill">
                    {booking.contactType === "email" ? "Email" : "Phone"}:{" "}
                    {helpers.maskContact(booking.contactType, booking.contactValue)}
                  </span>
                </div>
              </div>
              <div className="booking-row-meta">
                <span>Booking ID: {booking.bookingId.slice(0, 8)}…</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </article>
  );
}
