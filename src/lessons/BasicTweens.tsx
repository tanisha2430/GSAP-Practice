import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 0 — BASIC TWEENS: gsap.to() and gsap.from()
// ═══════════════════════════════════════════════════════════════════════════
//
//  gsap.to(target, vars)
//    → animates FROM the element's current state TO the values you provide
//    → most common tween; you define the end state
//
//  gsap.from(target, vars)
//    → animates FROM the values you provide TO the element's current state
//    → useful for entrance animations (element appears to come from somewhere)
//
//  gsap.fromTo(target, fromVars, toVars)
//    → explicitly defines both start and end states
//    → use when you need full control over both sides
//
// Common vars:
//   x / y         → translate horizontally / vertically (px)
//   xPercent      → translate as % of element's own width
//   rotation      → rotate in degrees
//   scale         → scale uniformly (1 = normal)
//   scaleX/scaleY → scale on one axis
//   opacity       → 0 (invisible) to 1 (visible)
//   duration      → animation length in seconds (default: 0.5)
//   delay         → wait N seconds before starting
//   ease          → easing curve e.g. "power2.out", "bounce.out", "elastic.out(1, 0.3)"
//                   default: "power1.out"
//                   visualizer → https://gsap.com/docs/v3/Eases

export default function BasicTweens() {
  useGSAP(() => {

    // gsap.to → box moves TO x:300 from where it currently sits
    gsap.to(".box-to", {
      x: 300,
      rotation: 360,
      duration: 2,
      ease: "power2.out",
    });

    // gsap.from → box starts FROM x:-300, opacity:0 and animates TO its natural position
    gsap.from(".box-from", {
      x: -300,
      opacity: 0,
      duration: 2,
      delay: 0.5,       // starts 0.5s after the .to above
      ease: "bounce.out",
    });

    // gsap.fromTo → full control: starts from scale:0 and goes to scale:1.5 then back
    gsap.fromTo(
      ".box-fromto",
      { scale: 0, opacity: 0 },           // from
      { scale: 1.5, opacity: 1, duration: 2, delay: 1, ease: "elastic.out(1, 0.4)" } // to
    );

  });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-12">
      <h2 className="text-3xl font-semibold text-gray-700">Lesson 0 — Basic Tweens</h2>

      <div className="flex flex-col gap-8 w-full max-w-2xl px-8">

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 w-24 shrink-0">gsap.to</span>
          <div className="box-to h-20 w-20 bg-blue-500 rounded-xl"></div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 w-24 shrink-0">gsap.from</span>
          <div className="box-from h-20 w-20 bg-green-500 rounded-xl"></div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 w-24 shrink-0">gsap.fromTo</span>
          <div className="box-fromto h-20 w-20 bg-purple-500 rounded-xl"></div>
        </div>

      </div>
    </section>
  );
}
