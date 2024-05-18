"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <Link className={`link ${pathname === "/" ? "active" : ""}`} href="/">
        Heatmap
      </Link>

      <Link
        className={`link ${pathname === "/activities" ? "active" : ""}`}
        href="/activities"
      >
        Activities
      </Link>
      <Link
        className={`link ${pathname === "/saved-routes" ? "active" : ""}`}
        href="/saved-routes"
      >
        Saved Routes
      </Link>
    </nav>
  );
}
