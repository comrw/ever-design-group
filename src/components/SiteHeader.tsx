"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import EverAction from "./EverAction";
import styles from "./SiteHeader.module.css";
import logo from "../../public/brand/ever-logo.png";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Approach", href: "#approach" },
  { label: "Destinations", href: "#destinations" },
  { label: "Studio", href: "#studio" },
];

export default function SiteHeader() {
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
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
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
    <header className={styles.header}>
      <a className={styles.logo} href="#top" aria-label="Ever Design Group, back to top">
        <Image src={logo} alt="Ever Design Group" fill sizes="140px" priority className={styles.logoImage} />
      </a>

      <nav className={styles.pill} aria-label="Primary">
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <EverAction href="#enquiry" className={styles.action} />

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
            {[...NAV, { label: "Start a project", href: "#enquiry" }].map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
