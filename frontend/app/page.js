import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Shared laundry booking</p>
          <h1>Laundry Room Helper</h1>
          <p className="hero-text">
            Public React frontend for CRUD on two entities:{" "}
            <strong>Machine</strong> (one) and <strong>Booking</strong> (many).
            No login required.
          </p>
        </div>
      </header>

      <section aria-labelledby="crud-heading">
        <h2 id="crud-heading" className="visually-hidden">
          Application areas
        </h2>
        <div className="home-crud-grid">
          <Link href="/machines" className="home-crud-card">
            <p className="section-label">Entity 1</p>
            <h3>Machines</h3>
            <p className="section-description">
              List, create, view, update, and delete laundry machines.
            </p>
          </Link>
          <Link href="/bookings" className="home-crud-card">
            <p className="section-label">Entity 2</p>
            <h3>Bookings</h3>
            <p className="section-description">
              List, create, view, update, and delete reservations linked to a
              machine.
            </p>
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div className="section-heading">
          <div>
            <p className="section-label">Quick links</p>
            <h2>User stories</h2>
          </div>
        </div>
        <div className="page-actions">
          <Link href="/machines" className="nav-btn active link-btn">
            View machines
          </Link>
          <Link href="/bookings/new" className="nav-btn link-btn">
            New booking
          </Link>
          <Link href="/bookings/schedule" className="nav-btn link-btn">
            Schedule by machine
          </Link>
          <Link href="/bookings/manage" className="nav-btn link-btn">
            Manage cancellations
          </Link>
        </div>
      </section>
    </>
  );
}
