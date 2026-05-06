import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 6 — GSAP TIMELINE
// ═══════════════════════════════════════════════════════════════════════════
//
// gsap.timeline() lets you chain animations sequentially without manually
// calculating delays. Each animation starts after the previous one ends.
//
// Position parameter (2nd arg of .to/.from/.fromTo):
//   "<"        → start at the SAME time as the previous animation
//   "-=0.5"    → start 0.5s BEFORE the previous animation ends (overlap)
//   "+=0.5"    → start 0.5s AFTER the previous animation ends (gap)
//
// Card entry directions + easing per card:
//   2010 (first) → from LEFT  (x: -500)  — power4.out           fast entry, smooth stop
//   2012         → from BELOW (y:  300)  — back.out(2.5)        overshoots & settles
//   2014         → from ABOVE (y: -300)  — elastic.out(1, 0.4)  springy wobble
//   2016         → from BELOW (y:  300)  — circ.out             circular curve feel
//   2018         → from ABOVE (y: -300)  — expo.out             near-instant decel
//   2020 (last)  → from RIGHT (x:  500)  — bounce.out           literal bounce
//
// Dot + card animate together — pass both as an array to one tl.from()
//   tl.from(['.tl-card-0', '.tl-dot-0'], { ... })

const TEXT =
  "Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum.";

const events = [
  { year: "2010", text: TEXT, pos: "top" },
  { year: "2012", text: TEXT, pos: "bottom" },
  { year: "2014", text: TEXT, pos: "top" },
  { year: "2016", text: TEXT, pos: "bottom" },
  { year: "2018", text: TEXT, pos: "top" },
  { year: "2020", text: TEXT, pos: "bottom" },
];

export default function TimelineLesson() {
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1 ── line draws in from the left
    tl.fromTo(
      ".tl-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        transformOrigin: "left center",
      },
    );

    // 2010 — slides in from LEFT
    tl.from(
      [".tl-card-0", ".tl-dot-0"],
      {
        x: -500,
        rotation: -10,
        opacity: 0,
        duration: 1.6,
        ease: "power4.out",
      },
      "-=0.9",
    );

    // 2012 — rises from BELOW
    tl.from(
      [".tl-card-1", ".tl-dot-1"],
      {
        y: 300,
        rotation: 6,
        opacity: 0,
        duration: 1.6,
        ease: "back.out(2.5)",
      },
      "-=0.9",
    );

    // 2014 — drops from ABOVE
    tl.from(
      [".tl-card-2", ".tl-dot-2"],
      {
        y: -300,
        rotation: -6,
        opacity: 0,
        duration: 1.6,
        ease: "elastic.out(1, 0.4)",
      },
      "-=0.9",
    );

    // 2016 — rises from BELOW
    tl.from(
      [".tl-card-3", ".tl-dot-3"],
      {
        y: 300,
        rotation: 6,
        opacity: 0,
        duration: 1.6,
        ease: "circ.out",
      },
      "-=0.9",
    );

    // 2018 — drops from ABOVE
    tl.from(
      [".tl-card-4", ".tl-dot-4"],
      {
        y: -300,
        rotation: -6,
        opacity: 0,
        duration: 1.6,
        ease: "expo.out",
      },
      "-=0.9",
    );

    // 2020 — slides in from RIGHT
    tl.from(
      [".tl-card-5", ".tl-dot-5"],
      {
        x: 500,
        rotation: 10,
        opacity: 0,
        duration: 1.6,
        ease: "bounce.out",
      },
      "-=0.9",
    );
  });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#b0b0b0] px-8 gap-8">
      <h2 className="text-3xl font-semibold text-white drop-shadow">
        Lesson 6 — GSAP Timeline
      </h2>

      <div className="relative w-full max-w-6xl" style={{ height: "580px" }}>
        {/* Horizontal line */}
        <div
          className="tl-line absolute left-0 right-0 bg-gray-900"
          style={{ top: "50%", height: "2px", transformOrigin: "left center" }}
        />

        <div className="absolute inset-0 flex items-stretch">
          {events.map((ev, i) => (
            <div
              key={ev.year}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Top half */}
              <div className="flex-1 flex items-end justify-center pb-6">
                {ev.pos === "top" && (
                  <div
                    className={`tl-card-${i} relative bg-white rounded-xl shadow-lg p-4 w-44`}
                  >
                    <h3 className="text-xl font-black mb-1">{ev.year}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ev.text}
                    </p>
                    {/* arrow pointing down */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rotate-45" />
                  </div>
                )}
              </div>

              {/* Dot */}
              <div
                className={`tl-dot-${i} absolute z-10 w-5 h-5 rounded-full bg-orange-400 border-2 border-white shadow`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Bottom half */}
              <div className="flex-1 flex items-start justify-center pt-6">
                {ev.pos === "bottom" && (
                  <div
                    className={`tl-card-${i} relative bg-white rounded-xl shadow-lg p-4 w-44`}
                  >
                    {/* arrow pointing up */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
                    <h3 className="text-xl font-black mb-1">{ev.year}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ev.text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
