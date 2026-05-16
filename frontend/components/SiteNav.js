"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/machines", label: "Machines" },
  { href: "/bookings", label: "Bookings" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Main">
      <Link href="/" className="site-nav-brand">
        Laundry Room Helper
      </Link>
      <div className="site-nav-links">
        {links.map(({ href, label }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`site-nav-link ${active ? "active" : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
