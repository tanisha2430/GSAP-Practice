import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 7 — TEXT ANIMATIONS (letter split + stagger)
// ═══════════════════════════════════════════════════════════════════════════
//
// The trick: split a string into individual characters, wrap each in a <span>,
// then GSAP animates all spans with stagger — each letter starts slightly after
// the previous one, creating a wave / cascading effect.
//
// In vanilla JS (like the screenshot) you manipulate innerHTML directly.
// In React, you split in JSX and render spans — same result, React way.
//
// overflow-hidden on the parent:
//   When letters animate from y:100 (below), they'd be visible outside the
//   text container. overflow-hidden clips them so they "appear" from inside.
//   This gives the classic "reveal" effect seen on landing pages.

// helper — splits a string into <span> per character
// spaces become &nbsp; so they don't collapse
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={className}
          style={{ display: "inline-block" }} // inline-block needed for y/rotation to work
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function TextAnimations() {
  useGSAP(() => {

    // ── Example A: letters rise from below (classic reveal) ──────────────
    // overflow-hidden on .text-a clips the letters until they enter the line
    gsap.from(".text-a span", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.04,   // 40ms between each letter
    });

    // ── Example B: letters drop from above with rotation ─────────────────
    gsap.from(".text-b span", {
      y: -80,
      opacity: 0,
      rotation: -20,
      duration: 0.6,
      ease: "back.out(2)",
      stagger: 0.05,
      delay: 0.8,      // starts after Example A finishes roughly
    });

    // ── Example C: wave — letters scale + fade with elastic bounce ────────
    gsap.from(".text-c span", {
      scale: 0,
      opacity: 0,
      rotation: 15,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      stagger: {
        each: 0.06,
        from: "center",  // stagger starts from the CENTER letter outward
      },
      delay: 1.6,
    });

  });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 gap-16 px-8">
      <h2 className="text-2xl font-semibold text-gray-500">Lesson 7 — Text Animations</h2>

      {/* Example A — rise from below */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-600 text-xs uppercase tracking-widest">rise from below · power3.out</p>
        {/* overflow-hidden clips letters animating in from below */}
        <div className="text-a overflow-hidden">
          <h1 className="text-7xl font-black text-white tracking-tight">
            <SplitText text="HELLO WORLD" />
          </h1>
        </div>
      </div>

      {/* Example B — drop from above with rotation */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-600 text-xs uppercase tracking-widest">drop from above · back.out</p>
        <div className="text-b overflow-hidden">
          <h1 className="text-7xl font-black text-orange-400 tracking-tight">
            <SplitText text="CREATIVE" />
          </h1>
        </div>
      </div>

      {/* Example C — scale from center outward */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-600 text-xs uppercase tracking-widest">center outward · elastic.out</p>
        <div className="text-c">
          <h1 className="text-7xl font-black text-blue-400 tracking-tight">
            <SplitText text="GSAP MAGIC" />
          </h1>
        </div>
      </div>

    </section>
  );
}
