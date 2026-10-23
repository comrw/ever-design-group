"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import EverAction from "./EverAction";
import styles from "./SiteHeader.module.css";
import logo from "../../public/brand/ever-logo.png";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Developments", href: "/developments" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/about" },
];
const MORE = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Places", href: "/areas" },
  { label: "How we work", href: "/process" },
  { label: "Films & visits", href: "/films" },
];

export default function SiteHeader({
  interior = false,
}: {
  interior?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${interior ? styles.interior : ""}`}>
      <Link
        className={styles.logo}
        href="/"
        aria-label="Ever Design Group home"
      >
        <Image
          src={logo}
          alt="Ever Design Group"
          fill
          sizes="140px"
          priority
          className={styles.logoImage}
        />
      </Link>

      <nav className={styles.pill} aria-label="Primary">
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <EverAction href="/contact" className={styles.action} />

      <button
        ref={toggleRef}
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close  ×" : "Menu  +"}
      </button>

      <div ref={panelRef} id={menuId} className={styles.menu} hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {[
              ...NAV,
              ...MORE,
              { label: "Start a project", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
