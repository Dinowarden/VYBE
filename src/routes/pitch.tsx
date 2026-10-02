import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pitch")({
  component: PitchDeck,
  head: () => ({
    meta: [{ title: "VYBE — Pitch Deck" }],
  }),
});

const slides = [
  { id: "title", kicker: "Confidential  ·  2026" },
  { id: "split", kicker: "01  /  Context" },
  { id: "problem", kicker: "02  /  Problem" },
  { id: "insight", kicker: "03  /  Insight" },
  { id: "solution", kicker: "04  /  Product" },
  { id: "circle", kicker: "05  /  Circle" },
  { id: "pulse", kicker: "06  /  Pulse" },
  { id: "system", kicker: "07  /  System" },
  { id: "why", kicker: "08  /  Why VYBE" },
  { id: "market", kicker: "09  /  Market" },
  { id: "model", kicker: "10  /  Model" },
  { id: "roadmap", kicker: "11  /  Build" },
  { id: "close", kicker: "12  /  Close" },
] as const;

function PitchDeck() {
  const [index, setIndex] = useState(0);
  const last = slides.length - 1;

  const go = useCallback(
    (next: number) => setIndex(Math.min(last, Math.max(0, next))),
    [last],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        go(index + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(last);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, last]);

  const slide = slides[index];

  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,90,61,0.08),transparent_55%)]" />
      <header className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-2.5">
          <VybeMark />
          <span className="font-display text-sm font-semibold tracking-[0.18em]">VYBE</span>
        </div>
        <p className="hidden text-[11px] tracking-[0.22em] text-muted uppercase sm:block">{slide.kicker}</p>
      </header>

      <section className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-center px-6 pt-16 pb-24 md:px-10">
        <SlideBody id={slide.id} />
      </section>

      <footer className="absolute right-0 bottom-0 left-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <p className="text-[11px] tabular-nums tracking-[0.18em] text-subtle">
          {String(index + 1).padStart(2, "0")}  /  {String(slides.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-1.5">
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-brand" : "w-1.5 bg-border hover:bg-muted",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <NavButton label="Previous" onClick={() => go(index - 1)} disabled={index === 0}>
            <ChevronLeft className="size-4" />
          </NavButton>
          <NavButton label="Next" onClick={() => go(index + 1)} disabled={index === last}>
            <ChevronRight className="size-4" />
          </NavButton>
        </div>
      </footer>
    </main>
  );
}

function SlideBody({ id }: { id: string }) {
  switch (id) {
    case "title":
      return (
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-brand uppercase">The social OS</p>
            <h1 className="font-display mt-5 text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] font-semibold tracking-tight">
              Your people.
              <br />
              Your pulse.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              VYBE is one identity across two rooms: Circle for the people you chose, Pulse for the world in motion.
            </p>
          </div>
          <div className="relative hidden overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)] lg:block">
            <img src="/pitch/rings.jpg" alt="" className="aspect-[16/10] w-full object-cover" />
          </div>
        </div>
      );
    case "split":
      return (
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95] font-semibold tracking-tight">
              Friends live in one app. Discovery lives in another.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Instagram kept the people you know. TikTok took the camera. Every creator, and every teenager, now runs two lives — and two brands — to do both.
            </p>
          </div>
          <img src="/pitch/worlds.jpg" alt="" className="aspect-[16/10] w-full rounded-[1.75rem] object-cover shadow-[var(--shadow-lift)]" />
        </div>
      );
    case "problem":
      return (
        <div>
          <h2 className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tight">
            We trained a generation to split themselves.
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            <Fact
              title="The close graph stalled"
              body="Follow graphs optimized for ads, not friends. Chronological intimacy is an afterthought on platforms built for reach."
            />
            <Fact
              title="The open graph is a stranger"
              body="Short video found a new camera language — and left your actual Circle behind. Discovery without belonging."
            />
            <Fact
              title="Identity is the tax"
              body="People maintain two handles, two aesthetics, two audiences. The software made them do it."
            />
          </ul>
        </div>
      );
    case "insight":
      return (
        <div className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.28em] text-brand uppercase">The bet</p>
          <h2 className="font-display mt-4 text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95] font-semibold tracking-tight">
            Closeness and discovery are different verbs.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            One ranking function cannot serve a best friend and a billion strangers. The fix is not a better algorithm. It is two rooms, one name.
          </p>
        </div>
      );
    case "solution":
      return (
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tight">
            One identity. Two rooms.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Room
              name="Circle"
              line="From people you chose."
              points={["Follow graph, chronological", "Text, image, video", "Quiet on purpose"]}
            />
            <Room
              name="Pulse"
              line="From the world, in motion."
              points={["Public short video", "Ranked by taste, not followers", "The same creator, a second room"]}
            />
          </div>
        </div>
      );
    case "circle":
      return (
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-brand uppercase">Circle</p>
            <h2 className="font-display mt-3 text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[0.95] font-semibold tracking-tight">
              The feed that used to exist.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              People you follow, in the order they posted. Captions that can be a paragraph. Images that do not autoplay. A home, not a slot machine.
            </p>
          </div>
          <ul className="space-y-4 text-sm">
            <Line>Follow, unfollow, block — a real social graph</Line>
            <Line>Posts: text, image, or video</Line>
            <Line>Like, comment, share, save</Line>
            <Line>Hashtags without turning friends into SEO</Line>
          </ul>
        </div>
      );
    case "pulse":
      return (
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-brand uppercase">Pulse</p>
            <h2 className="font-display mt-3 text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[0.95] font-semibold tracking-tight">
              A public square that does not invade the house.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Full-screen vertical video. Swipe. Sound. Reach that is not gated by how many friends you collected in high school.
            </p>
          </div>
          <ul className="space-y-4 text-sm">
            <Line>Same username, separate ranking</Line>
            <Line>For You, following, and tags</Line>
            <Line>Create once — publish to Circle, Pulse, or both</Line>
            <Line>Friends never compete with strangers in the same scroll</Line>
          </ul>
        </div>
      );
    case "system":
      return (
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] font-semibold tracking-tight">
              A dual graph, not a feature flag.
            </h2>
            <ol className="mt-8 space-y-3 text-sm text-muted">
              <li><span className="text-fg">01  Identity</span> — one user, one username, hashed credentials, sessions.</li>
              <li><span className="text-fg">02  Graph</span> — follow edges that power Circle, never Pulse ranking.</li>
              <li><span className="text-fg">03  Content</span> — posts and media with a room, not a generic blob.</li>
              <li><span className="text-fg">04  Signals</span> — likes, comments, saves, shares, notifications.</li>
              <li><span className="text-fg">05  Safety</span> — report, review, suspend. Trust is the product.</li>
            </ol>
          </div>
          <img src="/pitch/graph.jpg" alt="" className="aspect-[16/10] w-full rounded-[1.75rem] object-cover shadow-[var(--shadow-lift)]" />
        </div>
      );
    case "why":
      return (
        <div>
          <h2 className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tight">
            Not another For You page. A social OS with two rooms.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Fact title="One name" body="Creators stop running twin brands. Friends always know where to find you." />
            <Fact title="Two rankings" body="Circle stays chronological. Pulse can be ambitious. Neither poisons the other." />
            <Fact title="Taste, not scale" body="A small Circle is a feature. Pulse is where a clip can still leave the room." />
          </div>
        </div>
      );
    case "market":
      return (
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tight">
            The camera already split. The software has not.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Stat n="2 lives" l="Every young user already keeps a friends app and a discovery app." />
            <Stat n="1 camera" l="Short video is the default way a generation records the world." />
            <Stat n="0 homes" l="No major product is natively both — so people duct-tape identity." />
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            Social remains the largest consumer-internet surface. The opening is not “beat TikTok at TikTok.” It is to own the seam between belonging and broadcast.
          </p>
        </div>
      );
    case "model":
      return (
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] font-semibold tracking-tight">
              Monetize the square. Protect the house.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Pulse is public, so it can carry ads, branded missions, and later, creator commerce. Circle is a home. We do not rank friends for a brand manager.
            </p>
          </div>
          <ul className="space-y-5">
            <Line>Pulse advertising — native, skippable, never in Circle</Line>
            <Line>Creator tools on Pulse reach, once the graph is real</Line>
            <Line>Never sell the follow graph. Trust is the lock-in.</Line>
          </ul>
        </div>
      );
    case "roadmap":
      return (
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] font-semibold tracking-tight">
            Thirteen phases. Shipping in public.
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            <Phase n="01–02" t="Foundation + identity" d="Design system, auth, unique usernames, sessions." />
            <Phase n="03–05" t="Graph + rooms" d="Profiles, follow, Circle feed, Pulse player." />
            <Phase n="06–08" t="Publish + engage" d="Text, image, video. Likes, comments, share, save." />
            <Phase n="09–10" t="Find + notify" d="Hashtags, search, a real notifications inbox." />
            <Phase n="11–12" t="Trust" d="Reporting, moderation, admin. The product is only as good as this." />
            <Phase n="13" t="Harden" d="Performance, polish, the seams that make it feel inevitable." />
          </div>
        </div>
      );
    case "close":
      return (
        <div className="text-center">
          <VybeMark className="mx-auto size-14" />
          <h2 className="font-display mt-8 text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] font-semibold tracking-tight">
            Join the Circle.
            <br />
            <span className="text-brand">Ride the Pulse.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-muted">
            VYBE — one identity, two rooms. Built for people who refuse to split themselves to be seen.
          </p>
        </div>
      );
    default:
      return null;
  }
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-3xl bg-surface p-6 shadow-[var(--shadow-border)]">
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </li>
  );
}

function Room({ name, line, points }: { name: string; line: string; points: string[] }) {
  return (
    <div className="rounded-[1.75rem] bg-surface p-7 shadow-[var(--shadow-border)]">
      <p className="text-xs tracking-[0.22em] text-brand uppercase">{name}</p>
      <h3 className="font-display mt-3 text-3xl font-semibold">{line}</h3>
      <ul className="mt-6 space-y-2 text-sm text-muted">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function Line({ children }: { children: string }) {
  return (
    <li className="flex gap-3 text-muted">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
      <span>{children}</span>
    </li>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-3xl bg-surface p-6 shadow-[var(--shadow-border)]">
      <p className="font-display text-3xl font-semibold text-brand">{n}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{l}</p>
    </div>
  );
}

function Phase({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-3xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="text-[11px] tracking-[0.2em] text-brand uppercase">{n}</p>
      <h3 className="font-display mt-2 text-lg font-semibold">{t}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
    </div>
  );
}

function NavButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-11 place-items-center rounded-full bg-elevated text-fg shadow-[var(--shadow-border)] disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function VybeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-elevated" />
      <path
        d="M6.5 22.5c5.5-13 13.5-13 19 0"
        fill="none"
        className="stroke-brand"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="10.5" r="2.3" className="fill-fg" />
    </svg>
  );
}
