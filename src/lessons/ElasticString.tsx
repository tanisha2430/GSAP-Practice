import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 4 — ELASTIC STRING
// ═══════════════════════════════════════════════════════════════════════════
//
// How it works:
//   - An SVG <path> draws a quadratic bezier curve: M start Q controlPoint end
//   - The control point Q follows the mouse cursor inside the container
//   - On mouse leave, GSAP animates the control point back to center with
//     elastic easing — making the line "snap" like a rubber string
//
// SVG Quadratic Bezier:
//   M x1,y1        → move to start point (left-center)
//   Q cx,cy x2,y2  → curve through control point (cx,cy) to end point (right-center)
//   When cx,cy = midpoint of container → perfectly straight line
//   When cx,cy = cursor position       → line bends toward cursor
//
// Why no useGSAP here?
//   useGSAP is for animations on mount. Here GSAP only runs on mouse events,
//   so plain event handlers + gsap.to() is the right approach.
//
// elastic.out(amplitude, period)
//   amplitude → how far it overshoots (1 = normal)
//   period    → how springy/oscillating (lower = more bounces)

// Rule of thumb:
// Animation runs on mount	---- useGSAP
// Animation runs on scroll / event	---- useEffect for setup + manual cleanup
// No mount animation at all	---- plain event handlers

export default function ElasticString() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef      = useRef<SVGPathElement>(null);
  const dotRef       = useRef<SVGCircleElement>(null);
  const ctrl         = useRef({ x: 0, y: 0 }); // tracks control point position
  const tweenRef     = useRef<gsap.core.Tween | null>(null);

  // builds the SVG quadratic bezier path string
  const buildPath = (cx: number, cy: number, w: number, h: number) =>
    `M 0,${h / 2} Q ${cx},${cy} ${w},${h / 2}`;

  // set initial straight line once container dimensions are known
  useEffect(() => {
    const rect = containerRef.current!.getBoundingClientRect();
    ctrl.current = { x: rect.width / 2, y: rect.height / 2 };
    pathRef.current!.setAttribute('d', buildPath(ctrl.current.x, ctrl.current.y, rect.width, rect.height));
    dotRef.current!.setAttribute('cx', String(ctrl.current.x));
    dotRef.current!.setAttribute('cy', String(ctrl.current.y));
    gsap.set(dotRef.current, { opacity: 0 }); // hide dot until hover

    return () => { tweenRef.current?.kill(); }; // cleanup on unmount
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    tweenRef.current?.kill(); // stop elastic snap if it's still running

    const rect = containerRef.current!.getBoundingClientRect();
    ctrl.current.x = e.clientX - rect.left;
    ctrl.current.y = e.clientY - rect.top;

    // directly update — no tween, instant follow
    pathRef.current!.setAttribute('d', buildPath(ctrl.current.x, ctrl.current.y, rect.width, rect.height));
    dotRef.current!.setAttribute('cx', String(ctrl.current.x));
    dotRef.current!.setAttribute('cy', String(ctrl.current.y));
  };

  const handleMouseEnter = () => {
    tweenRef.current?.kill();
    gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
  };

  const handleMouseLeave = () => {
    const rect = containerRef.current!.getBoundingClientRect();
    const { width: w, height: h } = rect;

    gsap.to(dotRef.current, { opacity: 0, duration: 0.3 });

    // animate control point back to center — this makes the line snap elastically
    tweenRef.current = gsap.to(ctrl.current, {
      x: w / 2,
      y: h / 2,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
      onUpdate: () => {
        pathRef.current!.setAttribute('d', buildPath(ctrl.current.x, ctrl.current.y, w, h));
      },
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black gap-6">
      <h2 className="text-3xl font-semibold text-white">Lesson 4 — Elastic String</h2>
      <p className="text-gray-500 text-sm">Move cursor inside · Leave to snap back</p>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-3xl h-64 relative cursor-none border border-white/10 rounded-2xl overflow-hidden"
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* the elastic string */}
          <path
            ref={pathRef}
            d=""
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* dot that sits at the cursor / control point */}
          <circle
            ref={dotRef}
            r="4"
            fill="white"
            filter="url(#glow)"
          />
        </svg>
      </div>
    </section>
  );
}
