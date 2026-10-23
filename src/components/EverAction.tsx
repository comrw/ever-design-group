import type { ComponentPropsWithoutRef } from "react";
import styles from "./EverAction.module.css";

/** Figma component "Ever / Action" (default + hover states). */

type CommonProps = { label?: string; className?: string };

type LinkProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">;
type ButtonProps = CommonProps & { href?: undefined } & ComponentPropsWithoutRef<"button">;

export default function EverAction(props: LinkProps | ButtonProps) {
  const { label = "Start a project", className, ...rest } = props;
  const classes = [styles.action, className].filter(Boolean).join(" ");
  const content = (
    <>
      <span className={styles.label}>{label}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {content}
    </button>
  );
}
