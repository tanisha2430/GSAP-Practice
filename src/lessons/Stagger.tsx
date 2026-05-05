import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 1 — STAGGER
// ═══════════════════════════════════════════════════════════════════════════
// stagger: N  →  each element in the selection starts its animation N seconds
//               after the previous one, creating a cascading / wave effect.
//
// KEY LESSON: pass a CSS class string (e.g. ".box") as the target so GSAP
// receives ALL matching elements as a NodeList. A single React ref only holds
// ONE element — the last one assigned — so stagger won't work with one ref
// shared across multiple elements.

export default function Stagger() {
  useGSAP(() => {
    gsap.to(".box", {
      x: 500,
      rotation: 360,
      duration: 2,
      backgroundColor: "#ff0000",
      scale: 0,
      repeat: 2,   // repeat the animation 2 more times (total 3 plays)
      yoyo: true,  // on every other repeat, play the animation in reverse
      stagger: 1,  // 1s delay between each element's animation start
    });
  });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h2 className="text-3xl font-semibold text-gray-700">Lesson 1 — Stagger</h2>
      <div className="box h-32 w-32 bg-blue-500 rounded-xl"></div>
      <div className="box h-32 w-32 bg-blue-400 rounded-xl"></div>
      <div className="box h-32 w-32 bg-blue-300 rounded-xl"></div>
    </section>
  );
}
