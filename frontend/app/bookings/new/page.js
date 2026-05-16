import { Suspense } from "react";
import NewBookingClient from "./NewBookingClient";

export default function NewBookingPage() {
  return (
    <Suspense fallback={<p className="section-description">Loading…</p>}>
      <NewBookingClient />
    </Suspense>
  );
}
