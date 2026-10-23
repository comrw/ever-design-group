"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { INTRO_SECONDS } from "@/lib/intro";
import {
  BEAM_Y,
  COLUMN_BASE,
  COLUMNS,
  FRAMES,
  WORLD,
  architect,
  builder,
  foundation,
  guides,
  pencilRoute,
  plan,
  planX,
  roof,
  type Point,
  type Rect,
} from "./art";

if (typeof window !== "undefined") {
  gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);
}

/** On-screen line weight and accent size, kept constant while the camera moves. */
const STROKE_PX = 1.25;
const ACCENT_PX = 3.4;

/** Two-bone arm from shoulder S to hand T, elbow hanging below. */
function armPath(S: Point, T: Point, upper: number, fore: number): string {
  let dx = T.x - S.x;
  let dy = T.y - S.y;
  let d = Math.hypot(dx, dy);
  const reach = upper + fore - 0.01;
  if (d > reach) {
    dx = (dx / d) * reach;
    dy = (dy / d) * reach;
    d = reach;
  }
  const hand = { x: S.x + dx, y: S.y + dy };
  const a = Math.atan2(dy, dx);
  const b = Math.acos(Math.min(1, Math.max(-1, (upper * upper + d * d - fore * fore) / (2 * upper * d || 1))));
  const e1 = { x: S.x + upper * Math.cos(a + b), y: S.y + upper * Math.sin(a + b) };
  const e2 = { x: S.x + upper * Math.cos(a - b), y: S.y + upper * Math.sin(a - b) };
  const e = e1.y > e2.y ? e1 : e2;
  const f = (n: number) => n.toFixed(2);
  return `M${f(S.x)} ${f(S.y)} L${f(e.x)} ${f(e.y)} L${f(hand.x)} ${f(hand.y)}`;
}

/**
 * Drives the introduction drawn by IntroLoader: a GSAP timeline of
 * INTRO_SECONDS, a viewBox "camera", and the reveal. Renders nothing.
 */
export default function IntroScene() {
  useEffect(() => {
    const html = document.documentElement;
    const control = window.__everIntro;
    const layer = document.querySelector<HTMLElement>(".il");
    const svg = layer?.querySelector<SVGSVGElement>(".il-scene");
    if (!control || !layer || !svg || html.dataset.introState !== "play") return;

    const home = html.dataset.intro === "home";
    const $ = <T extends Element = SVGElement>(sel: string) => svg.querySelector<T>(sel)!;
    const $$ = <T extends Element = SVGElement>(sel: string) => Array.from(svg.querySelectorAll<T>(sel));

    /* ---------- Camera ---------- */
    const cam = { x: 0, y: 0, w: WORLD.width, h: WORLD.height };
    const accent = $<SVGCircleElement>("[data-accent]");
    const viewport = () => ({ w: svg.clientWidth || window.innerWidth, h: svg.clientHeight || window.innerHeight });
    const apply = () => {
      svg.setAttribute("viewBox", `${cam.x} ${cam.y} ${cam.w} ${cam.h}`);
      const scale = viewport().w / cam.w;
      svg.style.setProperty("--sw", String(STROKE_PX / scale));
      accent.setAttribute("r", String(ACCENT_PX / scale));
    };
    /** A viewBox with the viewport's aspect ratio that frames `r`; `lift` raises the subject. */
    const fit = (r: Rect, pad = 0.14, lift = 0) => {
      const v = viewport();
      let w = r.w * (1 + 2 * pad);
      let h = r.h * (1 + 2 * pad);
      if (w / h > v.w / v.h) h = (w * v.h) / v.w;
      else w = (h * v.w) / v.h;
      return { x: r.x + r.w / 2 - w / 2, y: r.y + r.h / 2 - h / 2 + h * lift, w, h };
    };
    /** The frame in which the drawing sits exactly on the hero photograph. */
    const heroFrame = () => {
      const stage = document.querySelector("#top [class*='stage']");
      if (!stage) return null;
      const r = stage.getBoundingClientRect();
      const s = r.width / WORLD.width;
      const v = viewport();
      return { x: -r.left / s, y: -r.top / s, w: v.w / s, h: v.h / s };
    };
    const toScreenY = (y: number) => (y - cam.y) * (viewport().w / cam.w);
    // Narrow screens give the whole width to the building.
    const placeFrame = () => fit(FRAMES.place, viewport().w < 640 ? 0.015 : 0.06, 0.08);

    /* ---------- Figures ---------- */
    const tip = { x: plan.x, y: plan.y };
    const drawArm = $<SVGPathElement>('[data-arm="architect"]');
    const pencil = $<SVGLineElement>("[data-pencil]");
    const poseArchitect = () => {
      const hand = { x: tip.x + architect.pencilOffset.x, y: tip.y + architect.pencilOffset.y };
      drawArm.setAttribute("d", armPath(architect.shoulder, hand, architect.upperArm, architect.forearm));
      gsap.set(pencil, { attr: { x1: hand.x, y1: hand.y, x2: tip.x, y2: tip.y } });
    };
    const followTip = () => {
      poseArchitect();
      gsap.set(accent, { x: tip.x, y: tip.y });
    };

    const lift = { lean: builder.startLean };
    const raised = $<SVGLineElement>("[data-raised]");
    const body = $<SVGGElement>("[data-builder-body]");
    const builderArms = [$<SVGPathElement>('[data-arm="builder-1"]'), $<SVGPathElement>('[data-arm="builder-2"]')];
    const poseBuilder = () => {
      const t = (lift.lean * Math.PI) / 180;
      const along = (len: number) => ({ x: builder.pivot.x + len * Math.sin(t), y: builder.pivot.y - len * Math.cos(t) });
      const top = along(builder.columnLength);
      gsap.set(raised, { attr: { x2: top.x, y2: top.y } });
      // The builder steps in as the column comes upright, keeping a grip on it.
      const grip = along(builder.grips[0]);
      const dx = Math.min(0, grip.x + 22 - builder.shoulder.x);
      gsap.set(body, { x: dx });
      const shoulder = { x: builder.shoulder.x + dx, y: builder.shoulder.y };
      builder.grips.forEach((g, i) => {
        builderArms[i].setAttribute("d", armPath(shoulder, along(g), builder.upperArm, builder.forearm));
      });
    };

    /* ---------- Reveal ---------- */
    const words = Array.from(layer.querySelectorAll<HTMLElement>("[data-word]"));
    const underline = layer.querySelector<HTMLElement>("[data-underline]")!;
    const pdb = layer.querySelector<HTMLElement>(".il-pdb")!;
    const underlineTo = (i: number) => ({
      left: words[i].offsetLeft,
      width: words[i].offsetWidth - words[i].offsetWidth * 0.08,
    });

    let timeline: gsap.core.Timeline | null = null;
    let exitTween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      // Hidden starting state (the static markup is the completed drawing).
      gsap.set($$("[data-draw], [data-plan], [data-beam], [data-roof], [data-detail], [data-contour]"), { drawSVG: 0 });
      gsap.set($$("[data-column], [data-cross], [data-plumb], [data-accent], [data-arm], [data-pencil]"), { opacity: 0 });
      gsap.set(raised, { drawSVG: 0 });
      gsap.set($("[data-tree] .il-canopy"), { fillOpacity: 0 });
      gsap.set(accent, { attr: { cx: 0, cy: 0 }, x: tip.x, y: tip.y });
      gsap.set(words, { opacity: 0, y: 6 });
      gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
      followTip();
      poseBuilder();
      Object.assign(cam, fit(FRAMES.architect, 0.12));
      apply();
      svg.dataset.ready = "true";

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      timeline = tl;
      const draw = (targets: gsap.TweenTarget, at: number, duration: number, extra: gsap.TweenVars = {}) =>
        tl.to(targets, { drawSVG: "100%", duration, ease: "power1.inOut", ...extra }, at);
      const camera = (frame: () => Rect, at: number, duration: number) =>
        tl.to(cam, { ...{ x: () => frame().x, y: () => frame().y, w: () => frame().w, h: () => frame().h }, duration, onUpdate: apply }, at);

      /* 0.0–2.0  The architect: a continuous line sketches figure and board; the pencil draws the plan. */
      const figure = $$("[data-act='architect'] [data-draw]");
      draw(figure, 0.05, 0.16, { stagger: 0.075, ease: "none" });
      tl.to([drawArm, pencil], { opacity: 1, duration: 0.2 }, 0.72);
      tl.to(accent, { opacity: 1, duration: 0.15 }, 0.8);
      draw($("[data-plan]"), 0.82, 0.5, { ease: "none" });
      tl.to(tip, { motionPath: { path: pencilRoute }, duration: 0.5, ease: "none", onUpdate: followTip }, 0.82);
      // Column ticks along the plan's edge, in one movement of the pencil.
      tl.to(tip, { x: planX(COLUMNS[COLUMNS.length - 1]), duration: 0.2, ease: "none", onUpdate: followTip }, 1.32);
      COLUMNS.forEach((x, i) => tl.to(`[data-column="${x}"]`, { opacity: 1, duration: 0.04 }, 1.32 + (0.2 * i) / COLUMNS.length));

      // The drawing on the board expands into the foundation.
      tl.add(() => {
        const rect = $<SVGRectElement>("[data-plan]");
        rect.style.strokeDasharray = "";
        rect.style.strokeDashoffset = "";
      }, 1.53);
      tl.to("[data-plan]", { attr: { x: foundation.x, y: foundation.y, width: foundation.w, height: foundation.h }, duration: 0.62 }, 1.54);
      COLUMNS.forEach((x) =>
        tl.to(`[data-column="${x}"]`, { attr: { x1: x, x2: x, y1: COLUMN_BASE, y2: COLUMN_BASE + 6 }, duration: 0.62 }, 1.54),
      );
      tl.to(accent, { x: foundation.x + foundation.w, y: foundation.y, duration: 0.62 }, 1.54);
      tl.to("[data-act='architect']", { opacity: 0, duration: 0.4, ease: "power1.out" }, 1.56);
      camera(() => fit(FRAMES.foundation, 0.06), 1.48, 0.66);

      /* 2.0–4.0  The builder sets the first column upright; the structure rises. */
      camera(() => fit(FRAMES.builder, 0.1), 2.1, 0.5);
      draw($$("[data-act='builder'] [data-draw]"), 2.08, 0.14, { stagger: 0.05, ease: "none" });
      draw(raised, 2.34, 0.22, { ease: "power1.out" });
      tl.to(builderArms, { opacity: 1, duration: 0.15 }, 2.42);
      tl.to(accent, { x: builder.pivot.x, y: builder.pivot.y, duration: 0.2 }, 2.48);
      tl.to("[data-cross]", { opacity: 1, duration: 0.2 }, 2.5);
      tl.to("[data-plumb]", { opacity: 1, attr: { y2: 432 }, duration: 0.32, stagger: { each: 0.02, from: "end" }, ease: "power2.out" }, 2.56);
      // Dashed marks are run out by their end point (DrawSVG would replace the dash pattern).
      tl.to("[data-level]", { attr: { x2: guides.level.to }, duration: 0.34, ease: "power1.inOut" }, 2.7);
      // A heave, then a steady push to vertical, then the column settles.
      tl.to(lift, { lean: builder.startLean + 5, duration: 0.14, ease: "power1.out", onUpdate: poseBuilder }, 2.6);
      tl.to(lift, { lean: -1.5, duration: 0.38, ease: "power3.inOut", onUpdate: poseBuilder }, 2.74);
      tl.to(lift, { lean: 0, duration: 0.12, ease: "power1.out", onUpdate: poseBuilder }, 3.12);

      // Columns rise, right to left; the accent climbs the first.
      tl.set(`[data-column="${builder.pivot.x}"]`, { attr: { y2: BEAM_Y } }, 3.22);
      tl.set(raised, { opacity: 0 }, 3.22);
      tl.to(accent, { y: BEAM_Y, duration: 0.2, ease: "power1.inOut" }, 3.08);
      COLUMNS.slice(0, -1)
        .reverse()
        .forEach((x, i) => tl.to(`[data-column="${x}"]`, { attr: { y2: BEAM_Y }, duration: 0.34, ease: "power2.out" }, 3.06 + i * 0.035));
      camera(placeFrame, 3.1, 0.85);

      // Beams connect, then the roof takes shape; the accent rides the line being drawn.
      draw("[data-beam]", 3.3, 0.3, { ease: "power1.inOut" });
      tl.to(accent, { x: 150, duration: 0.3, ease: "power1.inOut" }, 3.3);
      draw("[data-roof]", 3.6, 0.42, { ease: "none" });
      tl.to(accent, { motionPath: { path: roof }, duration: 0.42, ease: "none" }, 3.6);
      draw("[data-detail]", 3.86, 0.24, { stagger: 0.06 });

      /* 4.0–5.5  The completed place: temporary marks clear, ground and tree are drawn. */
      tl.to(["[data-act='builder']"], { opacity: 0, duration: 0.35, ease: "power1.out" }, 3.92);
      tl.to(".il-guides", { opacity: 0, duration: 0.3 }, 4.02);
      draw("[data-contour]", 4.12, 0.6, { ease: "power2.inOut" });
      draw("[data-tree] [data-draw]", 4.36, 0.3, { stagger: 0.14 });
      tl.to("[data-tree] .il-canopy", { fillOpacity: 1, duration: 0.25 }, 4.78);

      /* 5.5–6.0  Plan. Design. Build., with the accent passing through. */
      tl.add(() => {
        const groundY = toScreenY(WORLD.ground);
        pdb.style.top = `${Math.min(groundY + 34, viewport().h - 96)}px`;
      }, 5.3);
      tl.to(accent, { opacity: 0, duration: 0.2 }, 5.42);
      tl.to(words, { opacity: 1, y: 0, duration: 0.26, stagger: 0.12, ease: "power2.out" }, 5.5);
      tl.set(underline, underlineTo(0), 5.5);
      tl.to(underline, { scaleX: 1, duration: 0.14, ease: "power2.out" }, 5.52);
      tl.to(underline, { ...underlineTo(1), duration: 0.14, ease: "power2.inOut" }, 5.66);
      tl.to(underline, { ...underlineTo(2), duration: 0.14, ease: "power2.inOut" }, 5.8);
      tl.call(() => control.exit(), [], INTRO_SECONDS);
    }, layer);

    if (!control.started()) {
      ctx.revert();
      return;
    }

    // The reveal, however it was reached (end of drawing, Skip, Escape or a fail-safe).
    const onState = () => {
      if (html.dataset.introState !== "exit" || exitTween) return;
      const finished = (timeline?.progress() ?? 0) >= 1;
      timeline?.pause();
      layer.style.setProperty("--cut", `${Math.min(85, Math.max(15, (toScreenY(WORLD.ground) / viewport().h) * 100))}%`);
      const target = home && finished ? heroFrame() : null;
      if (target) {
        // The drawing settles onto the real pavilion as the section opens.
        exitTween = gsap.to(cam, { ...target, duration: 0.85, ease: "power3.inOut", onUpdate: apply });
      } else {
        exitTween = gsap.to({}, { duration: 0 });
      }
    };
    const observer = new MutationObserver(onState);
    observer.observe(html, { attributes: true, attributeFilter: ["data-intro-state"] });

    return () => {
      observer.disconnect();
      exitTween?.kill();
      ctx.revert();
      delete svg.dataset.ready;
    };
  }, []);

  return null;
}
