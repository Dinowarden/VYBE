import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PulseSlide } from "@/components/pulse/pulse-slide";
import { pulseFeed } from "@/lib/demo-data";
import { listPulseFeed } from "@/lib/server/posts";
import type { FeedPost } from "@/lib/types";
import { useFollowing } from "@/lib/use-following";

export const Route = createFileRoute("/discover")({ component: Discover });

function Discover() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [live, setLive] = useState<FeedPost[]>([]);
  const { follows } = useFollowing();

  useEffect(() => {
    let cancelled = false;
    void listPulseFeed({ data: {} })
      .then((rows) => {
        if (!cancelled) setLive(rows);
      })
      .catch(() => {
        if (!cancelled) setLive([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const posts = useMemo(() => {
    const seen = new Set(live.map((post) => post.id));
    const demo = pulseFeed
      .filter((post) => !seen.has(post.id))
      .map((post) => ({ ...post, followingAuthor: follows(post.author.username) }));
    const fresh = live.map((post) => ({
      ...post,
      followingAuthor: follows(post.author.username) || post.followingAuthor,
    }));
    return [...fresh, ...demo];
  }, [live, follows]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const slides = [...root.querySelectorAll<HTMLElement>("[data-pulse-slide]")];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActive(index);
      },
      { root, threshold: 0.65 },
    );
    slides.forEach((slide) => io.observe(slide));
    return () => io.disconnect();
  }, [posts.length]);

  return (
    <main className="relative h-[100dvh] bg-bg">
      <div ref={scrollerRef} className="no-scrollbar h-full snap-y snap-mandatory overflow-y-auto">
        {posts.map((post, index) => (
          <div key={post.id} data-pulse-slide data-index={index} className="h-[100dvh] snap-start">
            <PulseSlide post={post} active={active === index} muted={muted} onMutedChange={setMuted} />
          </div>
        ))}
      </div>
    </main>
  );
}
