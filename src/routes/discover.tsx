import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PulseSlide } from "@/components/pulse/pulse-slide";
import { pulseFeed } from "@/lib/demo-data";
import { useFollowing } from "@/lib/use-following";

export const Route = createFileRoute("/discover")({ component: Discover });

function Discover() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const { follows } = useFollowing();

  const posts = useMemo(
    () => pulseFeed.map((post) => ({ ...post, followingAuthor: follows(post.author.username) })),
    [follows],
  );

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
  }, []);

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
