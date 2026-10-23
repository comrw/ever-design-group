/** Production HTTP smoke test. No enquiries or external requests are sent. */
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const port = 3210;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", String(port), "--hostname", "127.0.0.1"],
  { stdio: ["ignore", "pipe", "pipe"] },
);
let logs = "";
server.stdout.on("data", (x) => {
  logs += x;
});
server.stderr.on("data", (x) => {
  logs += x;
});
const paths = [
  "/",
  "/about",
  "/services",
  "/process",
  "/developments",
  "/portfolio",
  "/areas",
  "/films",
  "/contact",
  ...[
    "architecture",
    "construction",
    "land",
    "villa-management",
    "development-partnerships",
  ].map((x) => `/services/${x}`),
  ...[
    "bp-ever-retreat-villa",
    "cottage",
    "virunga-villas",
    "nyungwe-retreat",
    "muhazi-villas",
    "akagera-retreat",
    "kigali-retreat",
  ].map((x) => `/developments/${x}`),
  ...["rubavu", "musanze", "nyungwe", "kigali", "muhazi", "akagera"].map(
    (x) => `/areas/${x}`,
  ),
];
const decode = (x) => x.replaceAll("&amp;", "&");
const report = {
  pages: 0,
  linkedRoutes: 0,
  imageRequests: 0,
  redirects: 0,
  projectContext: false,
  invalidSlug: false,
  video: false,
};
async function pool(items, run) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(6, queue.length) }, async () => {
      while (queue.length) await run(queue.shift());
    }),
  );
}
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try {
      const response = await fetch(origin);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  assert(ready, `Production server did not start: ${logs}`);
  const links = new Set();
  const images = new Set();
  await pool(paths, async (path) => {
    const res = await fetch(origin + path);
    assert.equal(res.status, 200, path);
    const html = await res.text();
    assert.equal(
      (html.match(/<h1[\s>]/g) || []).length,
      1,
      `${path}: exactly one main heading`,
    );
    assert(html.includes("Ever Design"), `${path}: branding`);
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const href = decode(match[1]);
      if (href.startsWith("/"))
        links.add(
          new URL(href, origin).pathname + new URL(href, origin).search,
        );
    }
    for (const match of html.matchAll(/<img\b[^>]*src="([^"]+)"/g))
      if (match[1].startsWith("/")) images.add(decode(match[1]));
    report.pages++;
  });
  await pool(
    [...links].filter((x) => !paths.includes(x)),
    async (path) => {
      const r = await fetch(origin + path);
      assert.equal(r.status, 200, `Linked route ${path}`);
      report.linkedRoutes++;
    },
  );
  await pool([...images], async (path) => {
    const r = await fetch(origin + path);
    assert.equal(r.status, 200, `Image ${path}`);
    assert(
      r.headers.get("content-type")?.startsWith("image/"),
      `Image MIME ${path}`,
    );
    report.imageRequests++;
  });
  for (const [from, to] of [
    ["/studio", "/about"],
    ["/villa-tours", "/films"],
  ]) {
    const r = await fetch(origin + from, { redirect: "manual" });
    assert([307, 308].includes(r.status));
    assert.equal(r.headers.get("location"), to);
    report.redirects++;
  }
  const project = await (
    await fetch(origin + "/contact?project=Virunga%20Villas")
  ).text();
  assert(/name="project"[^>]*value="Virunga Villas"/.test(project));
  report.projectContext = true;
  assert.equal(
    (await fetch(origin + "/developments/not-a-project")).status,
    404,
  );
  report.invalidSlug = true;
  const video = await fetch(origin + "/videos/cottage-hillside.mp4", {
    headers: { Range: "bytes=0-1023" },
  });
  assert.equal(video.status, 206);
  assert.equal((await video.arrayBuffer()).byteLength, 1024);
  assert(video.headers.get("content-type")?.includes("video/mp4"));
  report.video = true;
  await writeFile(
    "docs/http-validation.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  server.kill("SIGTERM");
}
