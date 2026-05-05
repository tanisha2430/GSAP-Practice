import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger as ST } from "gsap/ScrollTrigger";

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 2 — SCROLL TRIGGER
// ═══════════════════════════════════════════════════════════════════════════
// ScrollTrigger ties a GSAP animation to the user's scroll position.
//
// Core options inside scrollTrigger: {}
//   trigger   → the element that "triggers" the animation when it enters view
//   start     → "triggerPosition viewportPosition"
//               e.g. "top center" = when top of trigger hits center of screen
//   end       → same syntax, defines when the animation ends
//   scrub     → true/number — ties animation progress directly to scroll position
//               (instead of playing once). A number adds a smoothing lag in seconds.
//               USE FOR: parallax, pinned sections, progress indicators
//   markers   → true shows visual debug markers (start/end lines) in the browser
//   toggleActions → "onEnter onLeave onEnterBack onLeaveBack"
//               default: "play none none none"
//               options per event: play, pause, resume, reverse, restart, reset, none
//               USE FOR: entrance animations that play once (or reverse) on scroll
//
// scrub vs toggleActions:
//   scrub        → animation is enslaved to scroll position (physically tied)
//   toggleActions → animation plays freely at its own duration, triggered by scroll

gsap.registerPlugin(ST);

export default function ScrollTriggerLesson() {
  useGSAP(() => {
    // --- Example A: animate once when element scrolls into view ---
    // toggleActions plays the animation freely at its own duration/easing.
    // scrub would feel sticky here since stagger + easing look bad tied to scroll.
    gsap.from(".scroll-box-a", {
      x: -300,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".scroll-section-a",
        start: "top 80%",  // when top of section reaches 80% down the viewport
        end: "top 30%",
           // "onEnter  onLeave  onEnterBack  onLeaveBack"
        toggleActions: "play none none reverse",
        markers: true,     // ← remove in production; shows debug lines
      },
    });

    // --- Example B: scrub — animation is tied 1:1 to scroll progress ---
    gsap.to(".scroll-box-b", {
      x: 400,
      rotation: 360,
      backgroundColor: "#ff6b6b",
      scrollTrigger: {
        trigger: ".scroll-section-b",
        start: "top center",
        end: "bottom center",
        scrub: 1,          // 1s smoothing lag; use scrub: true for no lag
        markers: true,
      },
    });
  });

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-blue-500 bg-blue-100 p-4">
          Lesson 2 — ScrollTrigger
        </h1>
        <p className="mt-4 text-gray-500 text-lg">↓ Scroll down to see the animations</p>
      </section>

      {/* Example A: toggleActions */}
      <section className="scroll-section-a min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-gray-700">Example A — toggleActions</h2>
        <p className="text-gray-400 text-sm">"play none none reverse"</p>
        <div className="scroll-box-a h-32 w-32 bg-blue-500 rounded-xl"></div>
        <div className="scroll-box-a h-32 w-32 bg-blue-400 rounded-xl"></div>
        <div className="scroll-box-a h-32 w-32 bg-blue-300 rounded-xl"></div>
      </section>

      {/* Example B: scrub */}
      <section className="scroll-section-b min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-700">Example B — Scrub</h2>
        <p className="text-gray-400 text-sm">Animation progress follows scroll position</p>
        <div className="scroll-box-b h-32 w-32 bg-green-500 rounded-xl"></div>
      </section>
    </>
  );
}
