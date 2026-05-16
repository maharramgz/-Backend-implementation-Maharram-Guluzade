"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, helpers } from "../../../lib/api";

export default function MachineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const machineId = decodeURIComponent(params.machineId);
  const [machine, setMachine] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    setError("");
    try {
      const [m, b] = await Promise.all([
        api.getMachine(machineId),
        api.listBookings(machineId),
      ]);
      setMachine(m);
      setBookings(b);
    } catch (e) {
      setMachine(null);
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineId]);

  async function handleDelete() {
    if (!window.confirm("Delete this machine? Related bookings are removed (cascade).")) {
      return;
    }
    setBusy(true);
    try {
      await api.deleteMachine(machineId);
      router.push("/machines");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (error && !machine) {
    return (
      <section>
        <p className="feedback error">{error}</p>
        <Link href="/machines" className="ghost-btn link-btn">
          Back to machines
        </Link>
      </section>
    );
  }

  if (!machine) {
    return <p className="section-description">Loading…</p>;
  }

  const runtimeStatus = helpers.computeMachineStatus(machine, bookings);

  return (
    <section>
      <div className="page-header">
        <p className="section-label">Machines — Read (one)</p>
        <h1>{machine.machineName}</h1>
        <p className="section-description">{machine.machineType}</p>
        <div className="page-actions">
          <Link href="/machines" className="ghost-btn link-btn">
            All machines
          </Link>
          <Link
            href={`/machines/${encodeURIComponent(machine.machineId)}/edit`}
            className="secondary-btn link-btn"
          >
            Edit
          </Link>
          <Link
            href={`/machines/${encodeURIComponent(machine.machineId)}/schedule`}
            className="nav-btn link-btn"
          >
            Schedule
          </Link>
          <Link
            href={`/bookings/new?machineId=${encodeURIComponent(machine.machineId)}`}
            className="nav-btn link-btn"
          >
            New booking
          </Link>
          <button type="button" className="danger-btn" disabled={busy} onClick={handleDelete}>
            Delete machine
          </button>
        </div>
      </div>

      <div className="panel-grid">
        <article className="panel">
          <h3>Details</h3>
          <dl className="machine-meta" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <dt>Machine ID</dt>
              <dd>{machine.machineId}</dd>
            </div>
            <div>
              <dt>Stored status</dt>
              <dd>{helpers.statusLabel(machine.status)}</dd>
            </div>
            <div>
              <dt>Live status</dt>
              <dd>
                <span className={`status-badge status-${runtimeStatus}`}>
                  {helpers.statusLabel(runtimeStatus)}
                </span>
              </dd>
            </div>
            <div>
              <dt>Capacity</dt>
              <dd>{machine.capacityKg}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{machine.locationNote}</dd>
            </div>
          </dl>
        </article>
        <article className="panel">
          <h3>Bookings on this machine</h3>
          <p className="section-description">
            {bookings.length} booking(s). Open the full list from{" "}
            <Link href="/bookings">Bookings</Link>.
          </p>
        </article>
      </div>
    </section>
  );
}
