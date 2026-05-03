"use client";

import { useEffect, useMemo, useState } from "react";
import MachineCard from "../components/MachineCard";
import BookingForm from "../components/BookingForm";
import ScheduleList from "../components/ScheduleList";
import ManageBookings from "../components/ManageBookings";
import { api } from "../lib/api";

const SCREENS = [
  { id: "overview", label: "Overview" },
  { id: "booking", label: "New Booking" },
  { id: "schedule", label: "Schedule" },
  { id: "manage", label: "Manage Bookings" },
];

export default function Page() {
  const [machines, setMachines] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedMachineId, setSelectedMachineId] = useState("");
  const [activeScreen, setActiveScreen] = useState("overview");
  const [loadError, setLoadError] = useState("");

  async function refresh() {
    try {
      const [machineList, bookingList] = await Promise.all([
        api.listMachines(),
        api.listBookings(),
      ]);
      setMachines(machineList);
      setBookings(bookingList);
      setLoadError("");
      setSelectedMachineId((current) => {
        if (current && machineList.some((m) => m.machineId === current)) {
          return current;
        }
        return machineList[0]?.machineId || "";
      });
    } catch (error) {
      setLoadError(
        `Could not connect to backend at ${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000"}. Make sure the Express server is running.`
      );
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function selectMachineAndScreen(machineId, screen) {
    setSelectedMachineId(machineId);
    if (screen) setActiveScreen(screen);
  }

  const selectedMachine = useMemo(
    () => machines.find((m) => m.machineId === selectedMachineId) || null,
    [machines, selectedMachineId]
  );

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Shared Laundry Booking</p>
          <h1>Laundry Room Helper</h1>
          <p className="hero-text">
            Check machine availability, reserve a time slot, review schedules,
            and manage bookings in one simple public interface.
          </p>
        </div>
      </header>

      {loadError && <p className="feedback error" style={{ marginTop: 16 }}>{loadError}</p>}

      <nav className="screen-nav" aria-label="Primary">
        {SCREENS.map((screen) => (
          <button
            key={screen.id}
            type="button"
            className={`nav-btn ${activeScreen === screen.id ? "active" : ""}`}
            onClick={() => setActiveScreen(screen.id)}
          >
            {screen.label}
          </button>
        ))}
      </nav>

      <main>
        {activeScreen === "overview" && (
          <section>
            <div className="section-heading">
              <div>
                <p className="section-label">User Story 1</p>
                <h2>View machines in the laundry room</h2>
              </div>
              <p className="section-description">
                Users can quickly see which machines are available, occupied, or
                out of order.
              </p>
            </div>

            <div className="machine-grid">
              {machines.map((machine) => (
                <MachineCard
                  key={machine.machineId}
                  machine={machine}
                  bookings={bookings}
                  onBook={() => selectMachineAndScreen(machine.machineId, "booking")}
                  onSchedule={() => selectMachineAndScreen(machine.machineId, "schedule")}
                />
              ))}
            </div>
          </section>
        )}

        {activeScreen === "booking" && (
          <section>
            <div className="section-heading">
              <div>
                <p className="section-label">User Story 2</p>
                <h2>Create a booking for a machine</h2>
              </div>
              <p className="section-description">
                Choose a machine, enter a time interval, and save an email or
                phone number for later cancellation verification.
              </p>
            </div>

            <BookingForm
              machines={machines}
              bookings={bookings}
              selectedMachine={selectedMachine}
              onSelectMachine={setSelectedMachineId}
              onCreated={refresh}
            />
          </section>
        )}

        {activeScreen === "schedule" && (
          <section>
            <div className="section-heading">
              <div>
                <p className="section-label">User Story 3</p>
                <h2>View bookings for a selected machine</h2>
              </div>
              <p className="section-description">
                Review the machine schedule before planning a new reservation.
              </p>
            </div>

            <ScheduleList
              machines={machines}
              bookings={bookings}
              selectedMachineId={selectedMachineId}
              onSelectMachine={setSelectedMachineId}
            />
          </section>
        )}

        {activeScreen === "manage" && (
          <section>
            <div className="section-heading">
              <div>
                <p className="section-label">User Story 4</p>
                <h2>Cancel an existing booking</h2>
              </div>
              <p className="section-description">
                To prevent unauthorized cancellation, the user must request and
                verify a code sent to the same email or phone used during
                booking.
              </p>
            </div>

            <ManageBookings
              machines={machines}
              bookings={bookings}
              selectedMachineId={selectedMachineId}
              onSelectMachine={setSelectedMachineId}
              onChanged={refresh}
            />
          </section>
        )}
      </main>
    </div>
  );
}
