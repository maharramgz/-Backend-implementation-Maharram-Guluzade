"use client";

import { useEffect, useState } from "react";
import { api, helpers } from "../lib/api";

export default function BookingForm({ machines, bookings, defaultMachineId, onCreated }) {
  const initialTimes = helpers.defaultTimes();
  const [machineId, setMachineId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactType, setContactType] = useState("email");
  const [contactValue, setContactValue] = useState("");
  const [startTime, setStartTime] = useState(initialTimes.startTime);
  const [endTime, setEndTime] = useState(initialTimes.endTime);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    if (machines.length === 0) return;
    const preferred =
      defaultMachineId &&
      machines.some((m) => m.machineId === defaultMachineId)
        ? defaultMachineId
        : null;
    setMachineId((prev) => {
      if (preferred) return preferred;
      if (prev && machines.some((m) => m.machineId === prev)) return prev;
      return machines[0].machineId;
    });
  }, [machines, defaultMachineId]);

  useEffect(() => {
    setFeedback({ message: "", type: "" });
  }, [machineId]);

  const selectedMachine = machines.find((m) => m.machineId === machineId) || null;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedMachine) {
      setFeedback({ message: "Please pick a machine first.", type: "error" });
      return;
    }

    if (!customerName.trim() || !contactValue.trim()) {
      setFeedback({ message: "Please complete all booking fields.", type: "error" });
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

    if (selectedMachine.status === "out-of-order") {
      setFeedback({
        message: "This machine cannot be booked because it is out of order.",
        type: "error",
      });
      return;
    }

    if (
      !helpers.isTimeSlotAvailable(
        bookings,
        selectedMachine.machineId,
        startTime,
        endTime
      )
    ) {
      setFeedback({
        message: "The selected machine is already booked in that interval.",
        type: "error",
      });
      return;
    }

    try {
      const created = await api.createBooking({
        machineId: selectedMachine.machineId,
        customerName: customerName.trim(),
        contactType,
        contactValue: helpers.normalizeContact(contactType, contactValue.trim()),
        startTime,
        endTime,
      });

      const next = helpers.defaultTimes();
      setCustomerName("");
      setContactValue("");
      setContactType("email");
      setStartTime(next.startTime);
      setEndTime(next.endTime);
      setFeedback({
        message:
          "Booking created successfully. The saved email or phone will be used for secure cancellation.",
        type: "success",
      });

      await onCreated?.(created);
    } catch (error) {
      setFeedback({ message: error.message, type: "error" });
    }
  }

  return (
    <div className="panel-grid">
      <article className="panel">
        <h3>Selected machine</h3>
        {!selectedMachine && (
          <div className="empty-state">No machines available.</div>
        )}
        {selectedMachine && (
          <div className="summary-card">
            <p className="machine-type">{selectedMachine.machineType}</p>
            <h4>{selectedMachine.machineName}</h4>
            <span
              className={`status-badge status-${helpers.computeMachineStatus(
                selectedMachine,
                bookings
              )}`}
            >
              {helpers.statusLabel(
                helpers.computeMachineStatus(selectedMachine, bookings)
              )}
            </span>
            <ul>
              <li>
                <strong>Machine ID:</strong> {selectedMachine.machineId}
              </li>
              <li>
                <strong>Capacity:</strong> {selectedMachine.capacityKg}
              </li>
              <li>
                <strong>Location:</strong> {selectedMachine.locationNote}
              </li>
              <li>
                <strong>Bookings on this machine:</strong>{" "}
                {bookings.filter((b) => b.machineId === selectedMachine.machineId).length}
              </li>
            </ul>
          </div>
        )}
      </article>

      <article className="panel">
        <h3>Create booking</h3>
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            <span>Machine</span>
            <select
              value={machineId}
              onChange={(event) => setMachineId(event.target.value)}
              required
            >
              {machines.map((machine) => (
                <option key={machine.machineId} value={machine.machineId}>
                  {machine.machineName} ({machine.machineType})
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Your name</span>
            <input
              type="text"
              maxLength={40}
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              required
            />
          </label>

          <div className="form-row">
            <label>
              <span>Verification method</span>
              <select
                value={contactType}
                onChange={(event) => setContactType(event.target.value)}
              >
                <option value="email">Email</option>
                <option value="phone">Phone number</option>
              </select>
            </label>

            <label>
              <span>Email or phone</span>
              <input
                type="text"
                maxLength={80}
                placeholder={contactType === "email" ? "name@example.com" : "+46701234567"}
                value={contactValue}
                onChange={(event) => setContactValue(event.target.value)}
                required
              />
            </label>
          </div>

          <label>
            <span>Start time</span>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              required
            />
          </label>

          <label>
            <span>End time</span>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="primary-btn">
            Create booking
          </button>
        </form>

        <p
          className={`feedback ${feedback.type ? feedback.type : ""}`}
          aria-live="polite"
        >
          {feedback.message}
        </p>
      </article>
    </div>
  );
}
