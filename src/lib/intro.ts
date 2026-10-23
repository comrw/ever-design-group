/**
 * First-visit introduction: boot script.
 *
 * Inlined in <head> so it runs before first paint and needs neither React nor
 * the JS bundle. It decides whether to play the introduction (once per tab
 * session, never with reduced motion, never without JavaScript), then marks
 * <html> with:
 *
 *   data-intro="home" | "page"       which composition to draw (CSS reads it)
 *   data-intro-state="play" | "exit" | "done"
 *
 * The drawing itself is CSS keyframes (see app/intro.css), so it starts at
 * first paint even on a slow connection. This script only waits until the
 * sequence has finished AND the critical first-view image and fonts are ready
 * (capped, so slow or failed assets never hold the page), then opens the
 * section. A timer and a CSS animation each independently uncover the page if
 * anything goes wrong.
 */

/** sessionStorage key; present = the introduction already played in this tab. */
export const INTRO_SESSION_KEY = "ever-intro";

/** Longest the introduction waits for the first-view image and fonts. */
const ASSET_CAP_MS = 3600;
/** Matches the exit transition in app/intro.css (cut 0.15s + open 0.75s). */
const EXIT_MS = 950;
/** Hard fail-safe: the page is uncovered after this no matter what. */
const FAILSAFE_MS = 6000;

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

  var t0 = performance.now();
  var state = "play";
  function set(next) {
    if (state === "done") return;
    state = next;
    d.setAttribute("data-intro-state", next);
  }
  function blockTab(e) {
    if (e.key === "Tab") e.preventDefault();
  }
  function finish() {
    set("done");
    document.removeEventListener("keydown", blockTab, true);
  }
  document.addEventListener("keydown", blockTab, true);
  var failsafe = setTimeout(finish, ${FAILSAFE_MS});
  addEventListener("pageshow", function (e) {
    if (e.persisted) finish();
  });

  function exit() {
    if (state !== "play") return;
    set("exit");
    setTimeout(function () {
      clearTimeout(failsafe);
      finish();
    }, ${EXIT_MS});
  }
  function wait(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }
  function settled(p) {
    return p.then(function () {}, function () {});
  }

  function whenReady() {
    var loader = document.querySelector(".il");
    var sequence = loader && loader.getAnimations
      ? Promise.all(loader.getAnimations({ subtree: true })
          .filter(function (a) { return !/failsafe/.test(a.animationName || ""); })
          .map(function (a) { return settled(a.finished); }))
      : wait(1450);

    // Only the first-view image(s) Next marks as priority, and the fonts.
    var critical = [].slice.call(document.querySelectorAll('img[fetchpriority="high"]'))
      .filter(function (img) { return img.getBoundingClientRect().top < innerHeight; })
      .map(function (img) {
        if (img.complete) return 0;
        return new Promise(function (r) {
          img.addEventListener("load", r, { once: true });
          img.addEventListener("error", r, { once: true });
        });
      });
    if (document.fonts) critical.push(settled(document.fonts.ready));
    var cap = wait(Math.max(0, ${ASSET_CAP_MS} - (performance.now() - t0)));

    Promise.all([sequence, Promise.race([Promise.all(critical), cap])]).then(exit, exit);
  }

  function start() {
    try {
      whenReady();
    } catch (e) {
      exit();
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();`;
