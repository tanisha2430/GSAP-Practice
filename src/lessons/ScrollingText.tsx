import { useEffect, useRef } from "react";
import gsap from "gsap";

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 8 — SCROLL-DRIVEN MARQUEE (infinite scrolling text)
// ═══════════════════════════════════════════════════════════════════════════
//
// How it works:
//   1. The text strip is duplicated — first half and second half look identical
//   2. We move the strip left/right using a tracked x position
//   3. When x reaches -halfWidth, we snap back to 0 — seamless because
//      both positions look identical (infinite loop trick)
//   4. Scroll wheel adds velocity → damping factor makes it slow down naturally
//
// gsap.ticker:
//   Runs a callback every animation frame (like requestAnimationFrame but
//   synced to GSAP's engine). Perfect for physics-style updates where you
//   need to update a value every frame based on previous state.
//   gsap.ticker.add(fn)    → run fn every frame
//   gsap.ticker.remove(fn) → stop running
//
// Infinite loop trick:
//   Strip = [COPY A][COPY B]    (COPY A === COPY B visually)
//   halfWidth = width of COPY A
//   x starts at 0, moves toward -halfWidth
//   When x <= -halfWidth → snap x back to 0 (no visual jump since they match)
//
// Arrow direction:
//   rotateY: 180 flips → horizontally → it becomes ←
//   This way we only need one arrow character in the DOM

const LABEL = "CREATIVE STUDIO";
const COPIES = 6; // how many label+arrow pairs per half

export default function ScrollingText() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current!;

    let xPos = 0;
    let velocity = 0;
    let lastDir = 0; // -1 = moving left, 1 = moving right

    // halfWidth = width of one full "copy" of the content
    // We set it after mount so the DOM has rendered and scrollWidth is real
    const halfWidth = strip.scrollWidth / 2;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // deltaY > 0 → scrolling down → strip moves LEFT (negative x)
      velocity += e.deltaY * 0.4;

      const dir = e.deltaY > 0 ? -1 : 1;
      if (dir !== lastDir) {
        lastDir = dir;
        // rotateY 180 flips → into ← and vice versa
        gsap.to(".scroll-arrow", {
          rotateY: dir === -1 ? 0 : 180,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const tick = () => {
      velocity *= 0.9; // damping — friction that slows it down naturally

      if (Math.abs(velocity) < 0.05) return; // skip tiny updates

      xPos += velocity;

      // infinite loop: when we've moved one full copy width, snap back
      if (xPos <= -halfWidth) xPos += halfWidth;
      if (xPos >= 0) xPos -= halfWidth;

      gsap.set(strip, { x: xPos });
    };

    gsap.ticker.add(tick);
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  // one "half" of the strip — duplicated below for the infinite loop
  const Half = () => (
    <>
      {Array.from({ length: COPIES }).map((_, i) => (
        <span key={i} className="inline-flex items-center gap-10 pr-10">
          <span className="text-[9vw] font-black uppercase tracking-tight text-white whitespace-nowrap">
            {LABEL}
          </span>
          <span
            className="scroll-arrow inline-block text-[6vw] text-orange-400"
            style={{ transformOrigin: "center center" }}
          >
            →
          </span>
        </span>
      ))}
    </>
  );

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 overflow-hidden gap-6">
      <p className="text-gray-600 text-sm uppercase tracking-widest z-10">
        scroll up or down
      </p>

      {/* The strip — two identical halves side by side for the infinite loop */}
      <div
        ref={stripRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        <Half />
        <Half />
      </div>
    </section>
  );
}
