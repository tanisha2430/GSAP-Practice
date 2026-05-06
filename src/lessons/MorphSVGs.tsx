import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// ═══════════════════════════════════════════════════════════════════════════
// LESSON — MORPH SVGs: MorphSVGPlugin
// ═══════════════════════════════════════════════════════════════════════════
//
//  MorphSVGPlugin morphs one SVG path into another by interpolating the
//  path `d` attribute between two shapes.
//
//  gsap.to(pathEl, { morphSVG: targetPath, duration })
//    → targetPath can be:
//        • a path `d` string
//        • a CSS selector pointing to another <path> element
//        • a reference to another SVG element
//
//  Key options inside morphSVG (object form):
//    shape      → the target path/selector
//    type       → "rotational" (default) | "linear"
//    origin     → "50% 50%" — pivot point for rotational matching
//    shapeIndex → manually control which point aligns first
//

gsap.registerPlugin(MorphSVGPlugin);

const shapes = [
  "M50,10 A40,40 0 1,1 49.9,10 Z",                                                                                             // Circle
  "M50,10 L61,35 L88,38 L66,58 L72,85 L50,70 L28,85 L34,58 L12,38 L39,35 Z",                                                  // Star
  "M50,30 C50,15 70,15 70,30 C70,45 50,60 50,60 C50,60 30,45 30,30 C30,15 50,15 50,30 Z",                                     // Heart
  "M50,10 L90,90 L10,90 Z",                                                                                                    // Triangle
  "M15,15 L85,15 L85,85 L15,85 Z",                                                                                            // Square
  "M50,10 L59,35 L86,35 L65,57 L73,82 L50,65 L27,82 L35,57 L14,35 L41,35 Z",                                                  // Pentagon-star (10pt)
  "M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z",                                     // Squircle
  "M50,10 L55,40 L85,40 L62,58 L70,88 L50,70 L30,88 L38,58 L15,40 L45,40 Z",                                                  // Arrow-star
  "M50,5 L50,95 M5,50 L95,50 M18,18 L82,82 M82,18 L18,82",                                                                    // Asterisk (strokes only)
  "M30,10 L70,10 L90,50 L70,90 L30,90 L10,50 Z",                                                                              // Hexagon
];

const shapeLabels = ["Circle", "Star", "Heart", "Triangle", "Square", "10pt Star", "Squircle", "Arrow Star", "Asterisk", "Hexagon"];

export default function MorphSVGs() {
  const pathRef = useRef<SVGPathElement>(null);
  const indexRef = useRef(0);

  useGSAP(() => {
    function morphShape() {
      const nextIndex = (indexRef.current + 1) % shapes.length;
      const nextShape = shapes[nextIndex];

      gsap.to(pathRef.current, {
        duration: 2,
        morphSVG: nextShape,
        ease: "power1.inOut",
        onComplete: () => {
          indexRef.current = nextIndex;
          morphShape();
        },
      });
    }

    morphShape();
  });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-12 bg-gray-950">
      <h2 className="text-3xl font-semibold text-white">Lesson — MorphSVG</h2>

      <p className="text-gray-400 text-sm max-w-md text-center">
        One SVG <code>&lt;path&gt;</code> morphing continuously through 10 shapes using{" "}
        <span className="text-green-400">MorphSVGPlugin</span>.
      </p>

      <div className="flex flex-col items-center gap-6">
        <svg
          viewBox="0 0 100 100"
          className="w-64 h-64 drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]"
        >
          <path
            ref={pathRef}
            id="morph_path"
            d={shapes[0]}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Reference shapes (hidden, used as morph targets if needed) */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 max-w-lg">
          {shapes.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-40">
                <path d={d} fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-gray-500">{shapeLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
