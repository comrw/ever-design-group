import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import { contact, sourceImage } from "@/content/ever";
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  caption,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  caption?: string;
}) {
  return (
    <section className="pageHero">
      <SiteHeader interior />
      <Image
        src={sourceImage(image)}
        alt=""
        fill
        priority
        sizes="100vw"
        className="pageHeroImage"
      />
      <div className="pageHeroShade" />
      <div className="pageHeroCopy">
        <p className="kicker" data-reveal>
          {eyebrow}
        </p>
        <h1 data-reveal>{title}</h1>
        <p className="pageIntro" data-reveal>
          {intro}
        </p>
      </div>
      <span className="imageCaption">
        {caption ?? "EVER DESIGN GROUP / RWANDA"}
      </span>
      <a
        className="heroScroll"
        href="#page-content"
        aria-label="Explore this page"
      >
        Explore ↓
      </a>
    </section>
  );
}
export function Section({
  label,
  title,
  children,
  dark = false,
}: {
  label?: string;
  title?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`editorialSection ${dark ? "darkSection" : ""}`}>
      <div className="sectionHeading" data-reveal>
        {label && <p className="kicker">{label}</p>}
        {title && <h2>{title}</h2>}
      </div>
      {children}
    </section>
  );
}
export function Picture({
  image,
  alt,
  caption,
  wide = false,
}: {
  image: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure
      className={`editorialPicture ${wide ? "widePicture" : ""}`}
      data-reveal
    >
      <div className="pictureWindow">
        <Image
          src={sourceImage(image)}
          alt={alt}
          fill
          sizes="(min-width: 900px) 80vw, 100vw"
          data-parallax
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="textLink" href={href}>
      {children}
      <span aria-hidden>↗</span>
    </Link>
  );
}
export function ProjectCTA({
  title = "What are you imagining?",
  intro = "A piece of land. An idea. A place waiting to happen.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="projectCTA">
      <p className="kicker" data-reveal>
        A CONVERSATION IS A BEGINNING.
      </p>
      <h2 data-reveal>{title}</h2>
      <div className="ctaBottom">
        <p>{intro}</p>
        <TextLink href="/contact">Start a project</TextLink>
      </div>
    </section>
  );
}
export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerTop">
        <Link
          href="/"
          className="footerWordmark"
          aria-label="Ever Design Group home"
        >
          ever<span>®</span>
        </Link>
        <p>
          Hospitality.
          <br />
          Rooted in place.
        </p>
      </div>
      <div className="footerGrid">
        <div>
          <p className="kicker">FIND US</p>
          <p>{contact.address}</p>
          <p>{contact.hours}</p>
        </div>
        <div>
          <p className="kicker">EXPLORE</p>
          {[
            ["Studio", "/about"],
            ["Services", "/services"],
            ["How we work", "/process"],
            ["Developments", "/developments"],
            ["Portfolio", "/portfolio"],
            ["Places", "/areas"],
            ["Films & visits", "/films"],
          ].map(([n, h]) => (
            <Link key={h} href={h}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <p className="kicker">LET’S TALK</p>
          {contact.email && (
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          )}
          {contact.whatsapp && (
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.phone} ↗
            </a>
          )}
          <Link href="/contact">Start a project →</Link>
        </div>
        {(contact.instagram || contact.linkedin) && (
          <div>
            <p className="kicker">FOLLOW</p>
            {contact.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        )}
      </div>
      <div className="footerBottom">
        <p>© {new Date().getFullYear()} Ever Design Group</p>
        <p>Kigali, Rwanda / Built around a story.</p>
      </div>
    </footer>
  );
}
