"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MachineForm from "../../../components/MachineForm";
import { api } from "../../../lib/api";

export default function EditMachinePage() {
  const params = useParams();
  const router = useRouter();
  const machineId = decodeURIComponent(params.machineId);
  const [machine, setMachine] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const m = await api.getMachine(machineId);
        if (!cancelled) setMachine(m);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [machineId]);

  async function handleSubmit(payload) {
    setError("");
    try {
      await api.updateMachine(machineId, payload);
      router.push(`/machines/${encodeURIComponent(machineId)}`);
    } catch (e) {
      setError(e.message);
    }
  }

  if (error && !machine) {
    return (
      <section>
        <p className="feedback error">{error}</p>
        <Link href="/machines">Back</Link>
      </section>
    );
  }

  if (!machine) {
    return <p className="section-description">Loading…</p>;
  }

  return (
    <section>
      <div className="page-header">
        <p className="section-label">Machines — Update</p>
        <h1>Edit {machine.machineName}</h1>
        <div className="page-actions">
          <Link
            href={`/machines/${encodeURIComponent(machineId)}`}
            className="ghost-btn link-btn"
          >
            Cancel
          </Link>
        </div>
      </div>
      {error ? <p className="feedback error">{error}</p> : null}
      <MachineForm key={machine.machineId} mode="edit" initial={machine} onSubmit={handleSubmit} />
    </section>
  );
}
