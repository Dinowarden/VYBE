import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const root = "/workspace";
const outDir = `${root}/artifacts`;
mkdirSync(outDir, { recursive: true });

function dataUri(path, mime) {
  const buf = readFileSync(path);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

const rings = dataUri(`${root}/public/pitch/rings.jpg`, "image/jpeg");
const worlds = dataUri(`${root}/public/pitch/worlds.jpg`, "image/jpeg");
const graph = dataUri(`${root}/public/pitch/graph.jpg`, "image/jpeg");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>VYBE — Pitch Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Syne:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #0c0b10;
      --surface: #16151c;
      --elevated: #1e1d26;
      --fg: #f4f1ec;
      --muted: #9a96a3;
      --subtle: #6f6b78;
      --brand: #ff5a3d;
      --border: #2a2833;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: Figtree, ui-sans-serif, system-ui, sans-serif; }
    h1, h2, h3 { font-family: Syne, ui-sans-serif, system-ui, sans-serif; letter-spacing: -0.03em; font-weight: 600; }
    @page { size: 1920px 1080px; margin: 0; }
    .slide {
      position: relative;
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      background: var(--bg);
      padding: 88px 110px 100px;
      page-break-after: always;
      break-after: page;
    }
    .slide::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at top, rgba(255,90,61,0.08), transparent 55%);
      pointer-events: none;
    }
    .chrome {
      position: absolute;
      left: 110px; right: 110px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
      font-size: 13px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .chrome.top { top: 44px; }
    .chrome.bottom { bottom: 40px; color: var(--subtle); letter-spacing: 0.16em; font-variant-numeric: tabular-nums; }
    .brand { display: flex; align-items: center; gap: 12px; color: var(--fg); font-family: Syne, sans-serif; font-weight: 600; letter-spacing: 0.18em; }
    .kicker { color: var(--muted); }
    .inner { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: center; }
    .grid-2 { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 72px; align-items: center; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
    .grid-rooms { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
    .eyebrow { color: var(--brand); font-size: 15px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 22px; }
    .display { font-size: 92px; line-height: 0.92; }
    .display-lg { font-size: 118px; line-height: 0.9; }
    .display-md { font-size: 68px; line-height: 0.95; }
    .lede { margin-top: 28px; font-size: 24px; line-height: 1.45; color: var(--muted); max-width: 640px; }
    .photo { width: 100%; height: 620px; object-fit: cover; border-radius: 28px; outline: 1px solid rgba(255,255,255,0.08); outline-offset: -1px; }
    .card { background: var(--surface); border-radius: 28px; padding: 32px; box-shadow: 0 0 0 1px rgba(255,255,255,0.08); }
    .card h3 { font-size: 28px; margin-bottom: 12px; }
    .card p { color: var(--muted); font-size: 18px; line-height: 1.5; }
    .list { list-style: none; display: flex; flex-direction: column; gap: 16px; font-size: 22px; color: var(--muted); }
    .list li { display: flex; gap: 14px; }
    .dot { width: 8px; height: 8px; border-radius: 99px; background: var(--brand); margin-top: 12px; flex-shrink: 0; }
    .center { text-align: center; align-items: center; }
    .stat { font-size: 42px; color: var(--brand); font-family: Syne, sans-serif; }
    .phase n, .phase .n { color: var(--brand); font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; }
    .mark { width: 36px; height: 36px; }
    .mark.lg { width: 72px; height: 72px; margin: 0 auto 28px; }
  </style>
</head>
<body>
${slideChrome(1, "Confidential  ·  2026", `
  <div class="grid-2">
    <div>
      <p class="eyebrow">The social OS</p>
      <h1 class="display-lg">Your people.<br>Your pulse.</h1>
      <p class="lede">VYBE is one identity across two rooms: Circle for the people you chose, Pulse for the world in motion.</p>
    </div>
    <img class="photo" src="${rings}" alt="" />
  </div>
`)}
${slideChrome(2, "01  /  Context", `
  <div class="grid-2">
    <div>
      <h2 class="display-md">Friends live in one app. Discovery lives in another.</h2>
      <p class="lede">Instagram kept the people you know. TikTok took the camera. Every creator, and every teenager, now runs two lives — and two brands — to do both.</p>
    </div>
    <img class="photo" src="${worlds}" alt="" />
  </div>
`)}
${slideChrome(3, "02  /  Problem", `
  <h2 class="display-md" style="max-width:1500px">We trained a generation to split themselves.</h2>
  <div class="grid-3" style="margin-top:56px">
    ${card("The close graph stalled", "Follow graphs optimized for ads, not friends. Chronological intimacy is an afterthought on platforms built for reach.")}
    ${card("The open graph is a stranger", "Short video found a new camera language — and left your actual Circle behind. Discovery without belonging.")}
    ${card("Identity is the tax", "People maintain two handles, two aesthetics, two audiences. The software made them do it.")}
  </div>
`)}
${slideChrome(4, "03  /  Insight", `
  <p class="eyebrow">The bet</p>
  <h2 class="display" style="max-width:1400px">Closeness and discovery are different verbs.</h2>
  <p class="lede" style="max-width:820px">One ranking function cannot serve a best friend and a billion strangers. The fix is not a better algorithm. It is two rooms, one name.</p>
`)}
${slideChrome(5, "04  /  Product", `
  <h2 class="display-md">One identity. Two rooms.</h2>
  <div class="grid-rooms" style="margin-top:56px">
    <div class="card">
      <p class="eyebrow">Circle</p>
      <h3 style="font-size:42px">From people you chose.</h3>
      <p style="margin-top:22px">Follow graph, chronological<br>Text, image, video<br>Quiet on purpose</p>
    </div>
    <div class="card">
      <p class="eyebrow">Pulse</p>
      <h3 style="font-size:42px">From the world, in motion.</h3>
      <p style="margin-top:22px">Public short video<br>Ranked by taste, not followers<br>The same creator, a second room</p>
    </div>
  </div>
`)}
${slideChrome(6, "05  /  Circle", `
  <div class="grid-2">
    <div>
      <p class="eyebrow">Circle</p>
      <h2 class="display-md">The feed that used to exist.</h2>
      <p class="lede">People you follow, in the order they posted. Captions that can be a paragraph. Images that do not autoplay. A home, not a slot machine.</p>
    </div>
    <ul class="list">
      ${line("Follow, unfollow, block — a real social graph")}
      ${line("Posts: text, image, or video")}
      ${line("Like, comment, share, save")}
      ${line("Hashtags without turning friends into SEO")}
    </ul>
  </div>
`)}
${slideChrome(7, "06  /  Pulse", `
  <div class="grid-2">
    <div>
      <p class="eyebrow">Pulse</p>
      <h2 class="display-md">A public square that does not invade the house.</h2>
      <p class="lede">Full-screen vertical video. Swipe. Sound. Reach that is not gated by how many friends you collected in high school.</p>
    </div>
    <ul class="list">
      ${line("Same username, separate ranking")}
      ${line("For You, following, and tags")}
      ${line("Create once — publish to Circle, Pulse, or both")}
      ${line("Friends never compete with strangers in the same scroll")}
    </ul>
  </div>
`)}
${slideChrome(8, "07  /  System", `
  <div class="grid-2">
    <div>
      <h2 class="display-md">A dual graph, not a feature flag.</h2>
      <ol class="list" style="margin-top:36px">
        <li><span class="dot"></span><span><strong style="color:var(--fg)">01 Identity</strong> — one user, one username, hashed credentials, sessions.</span></li>
        <li><span class="dot"></span><span><strong style="color:var(--fg)">02 Graph</strong> — follow edges that power Circle, never Pulse ranking.</span></li>
        <li><span class="dot"></span><span><strong style="color:var(--fg)">03 Content</strong> — posts and media with a room, not a generic blob.</span></li>
        <li><span class="dot"></span><span><strong style="color:var(--fg)">04 Signals</strong> — likes, comments, saves, shares, notifications.</span></li>
        <li><span class="dot"></span><span><strong style="color:var(--fg)">05 Safety</strong> — report, review, suspend. Trust is the product.</span></li>
      </ol>
    </div>
    <img class="photo" src="${graph}" alt="" />
  </div>
`)}
${slideChrome(9, "08  /  Why VYBE", `
  <h2 class="display-md" style="max-width:1500px">Not another For You page. A social OS with two rooms.</h2>
  <div class="grid-3" style="margin-top:56px">
    ${card("One name", "Creators stop running twin brands. Friends always know where to find you.")}
    ${card("Two rankings", "Circle stays chronological. Pulse can be ambitious. Neither poisons the other.")}
    ${card("Taste, not scale", "A small Circle is a feature. Pulse is where a clip can still leave the room.")}
  </div>
`)}
${slideChrome(10, "09  /  Market", `
  <h2 class="display-md">The camera already split. The software has not.</h2>
  <div class="grid-3" style="margin-top:56px">
    ${cardStat("2 lives", "Every young user already keeps a friends app and a discovery app.")}
    ${cardStat("1 camera", "Short video is the default way a generation records the world.")}
    ${cardStat("0 homes", "No major product is natively both — so people duct-tape identity.")}
  </div>
  <p class="lede" style="max-width:900px;font-size:20px">Social remains the largest consumer-internet surface. The opening is not “beat TikTok at TikTok.” It is to own the seam between belonging and broadcast.</p>
`)}
${slideChrome(11, "10  /  Model", `
  <div class="grid-2">
    <div>
      <h2 class="display-md">Monetize the square. Protect the house.</h2>
      <p class="lede">Pulse is public, so it can carry ads, branded missions, and later, creator commerce. Circle is a home. We do not rank friends for a brand manager.</p>
    </div>
    <ul class="list">
      ${line("Pulse advertising — native, skippable, never in Circle")}
      ${line("Creator tools on Pulse reach, once the graph is real")}
      ${line("Never sell the follow graph. Trust is the lock-in.")}
    </ul>
  </div>
`)}
${slideChrome(12, "11  /  Build", `
  <h2 class="display-md">Thirteen phases. Shipping in public.</h2>
  <div class="grid-3" style="margin-top:48px">
    ${phase("01–02", "Foundation + identity", "Design system, auth, unique usernames, sessions.")}
    ${phase("03–05", "Graph + rooms", "Profiles, follow, Circle feed, Pulse player.")}
    ${phase("06–08", "Publish + engage", "Text, image, video. Likes, comments, share, save.")}
    ${phase("09–10", "Find + notify", "Hashtags, search, a real notifications inbox.")}
    ${phase("11–12", "Trust", "Reporting, moderation, admin. The product is only as good as this.")}
    ${phase("13", "Harden", "Performance, polish, the seams that make it feel inevitable.")}
  </div>
`)}
${slideChrome(13, "12  /  Close", `
  <div class="inner center">
    ${mark("lg")}
    <h2 class="display-lg">Join the Circle.<br><span style="color:var(--brand)">Ride the Pulse.</span></h2>
    <p class="lede" style="margin-left:auto;margin-right:auto">VYBE — one identity, two rooms. Built for people who refuse to split themselves to be seen.</p>
  </div>
`)}
</body>
</html>`;

function mark(size = "") {
  const cls = size === "lg" ? "mark lg" : "mark";
  return `<svg viewBox="0 0 32 32" class="${cls}" aria-hidden="true">
    <rect width="32" height="32" rx="9" fill="#1e1d26"/>
    <path d="M6.5 22.5c5.5-13 13.5-13 19 0" fill="none" stroke="#FF5A3D" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="16" cy="10.5" r="2.3" fill="#F4F1EC"/>
  </svg>`;
}

function slideChrome(n, kicker, body) {
  const num = String(n).padStart(2, "0");
  return `<section class="slide">
    <div class="chrome top">
      <div class="brand">${mark()} VYBE</div>
      <div class="kicker">${kicker}</div>
    </div>
    <div class="inner">${body}</div>
    <div class="chrome bottom"><span>${num}  /  13</span><span>VYBE  ·  Confidential</span></div>
  </section>`;
}

function card(title, body) {
  return `<div class="card"><h3>${title}</h3><p>${body}</p></div>`;
}
function cardStat(n, body) {
  return `<div class="card"><p class="stat">${n}</p><p style="margin-top:14px">${body}</p></div>`;
}
function phase(n, t, d) {
  return `<div class="card"><p class="eyebrow">${n}</p><h3>${t}</h3><p>${d}</p></div>`;
}
function line(text) {
  return `<li><span class="dot"></span><span>${text}</span></li>`;
}

const htmlPath = `${outDir}/VYBE-Pitch-Deck.html`;
writeFileSync(htmlPath, html);
console.log("Wrote", htmlPath, Buffer.byteLength(html), "bytes");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.evaluate(async () => document.fonts?.ready);
const pdfPath = `${outDir}/VYBE-Pitch-Deck.pdf`;
await page.pdf({
  path: pdfPath,
  printBackground: true,
  preferCSSPageSize: true,
  width: "1920px",
  height: "1080px",
});
await browser.close();
console.log("Wrote", pdfPath);
