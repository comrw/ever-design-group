/**
 * First-visit introduction: boot script and shared contract.
 *
 * Inlined in <head> so it runs before first paint, without React or the JS
 * bundle. It decides whether to play the introduction (once per tab session,
 * never with reduced motion, never without JavaScript) and owns its state:
 *
 *   html[data-intro]       "home" | "page"   which reveal to use
 *   html[data-intro-state] "play" → "exit" → "done"
 *
 * The drawing is animated by components/intro/IntroScene.tsx (GSAP), which
 * calls `started()` when it begins and `exit()` when it ends. This script
 * also handles "Skip intro" (button, Escape) so it works before hydration,
 * and uncovers the page on its own if the scene never starts or overruns.
 * A CSS animation in app/intro.css is a last, script-independent fail-safe.
 */

/** sessionStorage key; present = the introduction already played in this tab. */
export const INTRO_SESSION_KEY = "ever-intro";

/** Length of the drawing before the reveal, in seconds (IntroScene timeline). */
export const INTRO_SECONDS = 6;
/** The reveal: section opens (matches app/intro.css transitions). */
export const EXIT_MS = 900;
/** If the scene has not started by then (slow or failed bundle), show the site. */
const START_TIMEOUT_MS = 2500;
/** Once started, the latest the reveal may begin. */
const RUN_TIMEOUT_MS = INTRO_SECONDS * 1000 + 1500;

export type IntroControl = {
  /** Called by the scene when its timeline starts; false if the intro is no longer playing. */
  started: () => boolean;
  /** Begin the reveal (from the scene's last frame, Skip, Escape or a fail-safe). */
  exit: () => void;
};

declare global {
  interface Window {
    __everIntro?: IntroControl;
  }
}

export const introBootScript = `(function () {
  var d = document.documentElement;
  try {
    if (sessionStorage.getItem("${INTRO_SESSION_KEY}")) return;
    sessionStorage.setItem("${INTRO_SESSION_KEY}", "1");
  } catch (e) {
    return;
  }
  if (!window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  d.setAttribute("data-intro", location.pathname === "/" && !location.hash ? "home" : "page");
  d.setAttribute("data-intro-state", "play");

  var state = "play";
  var timer;
  function set(next) {
    if (state === "done") return;
    state = next;
    d.setAttribute("data-intro-state", next);
  }
  function releaseFocus() {
    var a = document.activeElement;
    if (a && a.hasAttribute && a.hasAttribute("data-intro-skip")) a.blur();
  }
  function finish() {
    clearTimeout(timer);
    releaseFocus();
    set("done");
    document.removeEventListener("keydown", onKey, true);
    document.removeEventListener("click", onClick, true);
  }
  function exit() {
    if (state !== "play") return;
    clearTimeout(timer);
    releaseFocus();
    set("exit");
    timer = setTimeout(finish, ${EXIT_MS});
  }
  function onKey(e) {
    if (state !== "play") return;
    if (e.key === "Escape") {
      e.preventDefault();
      exit();
    } else if (e.key === "Tab") {
      // Only the skip control is reachable while the page is covered.
      e.preventDefault();
      var skip = document.querySelector("[data-intro-skip]");
      if (skip) skip.focus();
    }
  }
  function onClick(e) {
    var t = e.target;
    if (t && t.closest && t.closest("[data-intro-skip]")) {
      e.preventDefault();
      exit();
    }
  }
  document.addEventListener("keydown", onKey, true);
  document.addEventListener("click", onClick, true);
  addEventListener("pageshow", function (e) {
    if (e.persisted) finish();
  });

  timer = setTimeout(exit, ${START_TIMEOUT_MS});
  window.__everIntro = {
    started: function () {
      if (state !== "play") return false;
      clearTimeout(timer);
      timer = setTimeout(exit, ${RUN_TIMEOUT_MS});
      return true;
    },
    exit: exit,
  };
})();`;
