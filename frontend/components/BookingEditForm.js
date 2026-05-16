"use client";

import { useEffect, useState } from "react";
import { helpers } from "../lib/api";

export default function BookingEditForm({ booking, machines, bookings, onSaved }) {
  const [machineId, setMachineId] = useState(booking.machineId);
  const [customerName, setCustomerName] = useState(booking.customerName);
  const [contactType, setContactType] = useState(booking.contactType);
  const [contactValue, setContactValue] = useState(booking.contactValue);
  const [startTime, setStartTime] = useState(
    helpers.toDateTimeLocalValue(new Date(booking.startTime))
  );
  const [endTime, setEndTime] = useState(
    helpers.toDateTimeLocalValue(new Date(booking.endTime))
  );
  const [bookingStatus, setBookingStatus] = useState(booking.bookingStatus);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    setMachineId(booking.machineId);
    setCustomerName(booking.customerName);
    setContactType(booking.contactType);
    setContactValue(booking.contactValue);
    setStartTime(helpers.toDateTimeLocalValue(new Date(booking.startTime)));
    setEndTime(helpers.toDateTimeLocalValue(new Date(booking.endTime)));
    setBookingStatus(booking.bookingStatus);
    setFeedback({ message: "", type: "" });
  }, [booking]);

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback({ message: "", type: "" });

    if (!customerName.trim() || !contactValue.trim()) {
      setFeedback({ message: "Please complete all fields.", type: "error" });
      return;
    }

    if (!helpers.isValidContact(contactType, contactValue.trim())) {
      setFeedback({ message: `Please enter a valid ${contactType}.`, type: "error" });
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setFeedback({ message: "End time must be later than start time.", type: "error" });
      return;
    }

    const selectedMachine = machines.find((m) => m.machineId === machineId);
    if (!selectedMachine) {
      setFeedback({ message: "Please select a valid machine.", type: "error" });
      return;
    }

    if (selectedMachine.status === "out-of-order" && bookingStatus === "active") {
      setFeedback({
        message: "Cannot keep booking active on an out-of-order machine.",
        type: "error",
      });
      return;
    }

    const others = bookings.filter((b) => b.bookingId !== booking.bookingId);
    if (
      bookingStatus === "active" &&
      !helpers.isTimeSlotAvailable(others, machineId, startTime, endTime)
    ) {
      setFeedback({
        message: "Another active booking already overlaps this interval.",
        type: "error",
      });
      return;
    }

    try {
      await onSaved({
        machineId,
        customerName: customerName.trim(),
        contactType,
        contactValue: helpers.normalizeContact(contactType, contactValue.trim()),
        startTime,
        endTime,
        bookingStatus,
      });
      setFeedback({ message: "Booking updated.", type: "success" });
    } catch (error) {
      setFeedback({ message: error.message, type: "error" });
    }
  }

  return (
    <form className="booking-form panel" onSubmit={handleSubmit}>
      <label>
        <span>Machine</span>
        <select value={machineId} onChange={(e) => setMachineId(e.target.value)} required>
          {machines.map((m) => (
            <option key={m.machineId} value={m.machineId}>
              {m.machineName} ({m.machineType})
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Customer name</span>
        <input
          type="text"
          maxLength={40}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </label>

      <div className="form-row">
        <label>
          <span>Contact type</span>
          <select value={contactType} onChange={(e) => setContactType(e.target.value)}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </label>
        <label>
          <span>Contact value</span>
          <input
            type="text"
            maxLength={80}
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            required
          />
        </label>
      </div>

      <label>
        <span>Start time</span>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label>
        <span>End time</span>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

      <label>
        <span>Booking status</span>
        <select
          value={bookingStatus}
          onChange={(e) => setBookingStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>

      <button type="submit" className="primary-btn">
        Save booking
      </button>

      <p className={`feedback ${feedback.type || ""}`}>{feedback.message}</p>
    </form>
  );
}
