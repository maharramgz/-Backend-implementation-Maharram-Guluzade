"use client";

import BookingCancelPanel from "./BookingCancelPanel";
import { helpers } from "../lib/api";

export default function ManageBookings({
  machines,
  bookings,
  selectedMachineId,
  onSelectMachine,
  onChanged,
}) {
  const activeBookings = bookings
    .filter(
      (booking) =>
        booking.machineId === selectedMachineId &&
        booking.bookingStatus === "active"
    )
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <article className="panel">
      <div className="panel-header">
        <h3>Active bookings</h3>
        <select
          aria-label="Select machine for cancellation"
          value={selectedMachineId}
          onChange={(event) => onSelectMachine(event.target.value)}
        >
          {machines.map((machine) => (
            <option key={machine.machineId} value={machine.machineId}>
              {machine.machineName} ({machine.machineType})
            </option>
          ))}
        </select>
      </div>

      {activeBookings.length === 0 && (
        <div className="booking-list">
          <div className="booking-row-empty">
            There are no active bookings to cancel for this machine.
          </div>
        </div>
      )}

      {activeBookings.length > 0 && (
        <div className="booking-list">
          {activeBookings.map((booking) => (
            <article key={booking.bookingId} className="booking-row">
              <div className="booking-row-main">
                <h4>{booking.customerName}</h4>
                <div className="booking-row-meta">
                  <span className="booking-pill">
                    {helpers.formatDateTime(booking.startTime)}
                  </span>
                  <span className="booking-pill">
                    {helpers.formatDateTime(booking.endTime)}
                  </span>
                  <span className="booking-pill status-active">Active</span>
                  <span className="booking-pill contact-pill">
                    {booking.contactType === "email" ? "Email" : "Phone"}:{" "}
                    {helpers.maskContact(booking.contactType, booking.contactValue)}
                  </span>
                </div>
              </div>

              <div className="booking-row-actions">
                <BookingCancelPanel booking={booking} onChanged={onChanged} />
              </div>
            </article>
          ))}
        </div>
      )}
    </article>
  );
}
