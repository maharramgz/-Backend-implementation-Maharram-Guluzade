"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MachineForm from "../../components/MachineForm";
import { api } from "../../lib/api";

export default function NewMachinePage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(payload) {
    setError("");
    try {
      const created = await api.createMachine(payload);
      router.push(`/machines/${encodeURIComponent(created.machineId)}`);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <section>
      <div className="page-header">
        <p className="section-label">Machines — Create</p>
        <h1>Add a machine</h1>
        <p className="section-description">
          Creates a new <code>Machine</code> row via <code>POST /api/machines</code>.
        </p>
        <div className="page-actions">
          <Link href="/machines" className="ghost-btn link-btn">
            Back to list
          </Link>
        </div>
      </div>
      {error ? <p className="feedback error">{error}</p> : null}
      <MachineForm mode="create" onSubmit={handleSubmit} />
    </section>
  );
}
