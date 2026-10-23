import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import { contact, sourceImage } from "@/content/ever";
export function PageHero({
  title,
  intro,
  image,
}: {
  title: string;
  intro: string;
  image: string;
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
        <h1 data-reveal>{title}</h1>
        <p className="pageIntro" data-reveal>
          {intro}
        </p>
      </div>
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
  title,
  children,
  dark = false,
}: {
  title?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`editorialSection ${dark ? "darkSection" : ""}`}>
      <div className="sectionHeading" data-reveal>
        {title && <h2>{title}</h2>}
      </div>
      {children}
    </section>
  );
}
export function Picture({
  image,
  alt,
  wide = false,
}: {
  image: string;
  alt: string;
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
          <p>{contact.address}</p>
          <p>{contact.hours}</p>
        </div>
        <div>
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
