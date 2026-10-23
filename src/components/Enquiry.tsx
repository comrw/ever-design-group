"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { enquiryConfig } from "@/lib/config";
import EverAction from "./EverAction";
import styles from "./Enquiry.module.css";

type FieldName = "name" | "email" | "location" | "project";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "unconfigured" }
  | { kind: "failed" };

const FIELDS: { name: FieldName; label: string; type: string; autoComplete: string; required: boolean }[] = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", required: true },
  { name: "location", label: "Project location", type: "text", autoComplete: "off", required: false },
  { name: "project", label: "What would you like to develop?", type: "text", autoComplete: "off", required: true },
];

const EMPTY: Values = { name: "", email: "", location: "", project: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(values.email.trim())) errors.email = "Please enter a valid email address, like name@example.com.";
  if (!values.project.trim()) errors.project = "Please tell us what you would like to develop.";
  return errors;
}

/** 06 / Start a project — enquiry, with the footer. */
export default function Enquiry() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = { ...values, [event.target.name]: event.target.value };
    setValues(next);
    if (attempted) setErrors(validate(next));
    if (status.kind !== "sending") setStatus({ kind: "idle" });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === "sending") return;

    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = FIELDS.find((field) => found[field.name]);
    if (firstInvalid) {
      setStatus({ kind: "idle" });
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    if (!enquiryConfig.endpoint) {
      setStatus({ kind: "unconfigured" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const response = await fetch(enquiryConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          location: values.location.trim(),
          project: values.project.trim(),
        }),
      });
      if (!response.ok) throw new Error(`Enquiry endpoint responded ${response.status}`);
      setStatus({ kind: "sent" });
      setValues(EMPTY);
      setAttempted(false);
    } catch {
      setStatus({ kind: "failed" });
    }
  };

  return (
    <section id="enquiry" className={styles.section} aria-labelledby="enquiry-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>A DESTINATION BEGINS WITH A CONVERSATION.</p>
        <h2 id="enquiry-title" className={styles.title}>
          What are
          <br />
          you imagining?
        </h2>
        <p className={styles.lede}>Tell us about your land, location or idea.</p>
      </div>

      <form ref={formRef} className={styles.form} noValidate onSubmit={onSubmit} aria-label="Project enquiry">
        {FIELDS.map((field) => {
          const id = `enquiry-${field.name}`;
          const error = errors[field.name];
          return (
            <div key={field.name} className={styles.field}>
              <label htmlFor={id} className={styles.label}>
                {field.label}
                {!field.required ? <span className="sr-only"> (optional)</span> : null}
              </label>
              <input
                id={id}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                inputMode={field.type === "email" ? "email" : undefined}
                maxLength={field.name === "project" ? 600 : 200}
                required={field.required}
                aria-required={field.required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                value={values[field.name]}
                onChange={onChange}
                className={styles.input}
              />
              {error ? (
                <p id={`${id}-error`} className={styles.error}>
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        <EverAction type="submit" className={styles.submit} disabled={status.kind === "sending"} />

        <div className={styles.status} role="status" aria-live="polite">
          {status.kind === "sending" ? <p>Sending your enquiry…</p> : null}
          {status.kind === "sent" ? <p>Thank you. Your enquiry has been sent.</p> : null}
          {status.kind === "unconfigured" ? (
            <p className={styles.notice}>
              Your enquiry has not been sent. Online enquiries are not connected yet, so this form cannot deliver
              messages. Your details are still here and have not been stored.
            </p>
          ) : null}
          {status.kind === "failed" ? (
            <p className={styles.notice}>
              Your enquiry could not be sent. Please check your connection and try again.
            </p>
          ) : null}
        </div>
      </form>

      <footer className={styles.footer}>
        <p className={styles.footerName}>EVER DESIGN GROUP</p>
        <p className={styles.footerPlace}>Kigali, Rwanda</p>
      </footer>
    </section>
  );
}
