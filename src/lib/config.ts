/**
 * Runtime configuration. All values are read at build time from
 * NEXT_PUBLIC_* environment variables (see README and .env.example).
 * An empty value means "not configured" and the UI says so honestly.
 */

function read(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const filmConfig = {
  /** URL of the film (MP4/WebM). No value: poster only, no play control. */
  src: read(process.env.NEXT_PUBLIC_FILM_SRC),
  /** Optional MIME type for the film source, e.g. "video/mp4". */
  type: read(process.env.NEXT_PUBLIC_FILM_TYPE),
  /** Optional WebVTT captions file. */
  captionsSrc: read(process.env.NEXT_PUBLIC_FILM_CAPTIONS_SRC),
  captionsLang: read(process.env.NEXT_PUBLIC_FILM_CAPTIONS_LANG) ?? "en",
};

export const enquiryConfig = {
  /**
   * Endpoint that accepts a JSON POST of the enquiry, e.g. a Formspree or
   * Basin form URL, or your own API. No value: the form validates but
   * explains that nothing can be sent yet.
   */
  endpoint: read(process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT),
};
