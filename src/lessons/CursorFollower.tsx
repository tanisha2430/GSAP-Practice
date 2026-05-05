import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 5 — CURSOR FOLLOWER
// ═══════════════════════════════════════════════════════════════════════════
//
// How it works:
//   - A div (the custom cursor) is positioned fixed and follows the mouse
//   - gsap.quickTo creates a cached setter for x/y — much faster than
//     calling gsap.to() on every mousemove (no new tween object each frame)
//   - The cursor lags slightly behind the real cursor (duration: 0.5) giving
//     it a smooth, fluid feel instead of snapping instantly
//
// On image hover:
//   - gsap.to scales the cursor up, fades in the "VIEW" text
//   - On mouse leave, reverses back to small
//
// Why cursor-none on the wrapper?
//   Hides the default browser cursor so only our custom one shows.
//
// Why xPercent/yPercent: -50?
//   gsap.quickTo sets the CSS transform (translateX/Y). By default the div's
//   top-left corner lands at the cursor position. xPercent/yPercent: -50
//   offsets it by half its own size so it's always centered on the cursor.

export default function CursorFollower() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;

    // center the cursor div on the pointer
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // quickTo: pre-baked fast setter — call like a function on every mousemove
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const onImageEnter = () => {
    gsap.to(cursorRef.current, {
      scale: 5,           // grow the cursor
      backgroundColor: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(255,255,255,0.4)',
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(textRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      delay: 0.1,
      ease: 'power2.out',
    });
  };

  const onImageLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      backgroundColor: 'rgba(255,255,255,1)',
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(textRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.2,
      ease: 'power2.in',
    });
  };

  return (
    // cursor-none hides the default browser cursor across the whole page
    <div className="cursor-none min-h-screen bg-neutral-950 flex items-center justify-center">

      {/* ── Custom cursor ───────────────────────────────────────────────── */}
      {/* fixed: stays on screen independent of scroll                      */}
      {/* pointer-events-none: lets clicks pass through to elements below   */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none
                   h-5 w-5 rounded-full bg-white
                   flex items-center justify-center"
      >
        <span
          ref={textRef}
          className="text-white font-semibold uppercase tracking-widest select-none"
          style={{ fontSize: '3px', opacity: 0, scale: '0' }} // tiny so it's invisible at scale:1
        >
          View
        </span>
      </div>

      {/* ── Page content ────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-semibold text-white">Lesson 5 — Cursor Follower</h2>
        <p className="text-gray-500 text-sm">Hover over the image</p>

        <div
          onMouseEnter={onImageEnter}
          onMouseLeave={onImageLeave}
          className="relative overflow-hidden rounded-2xl w-96 h-64"
        >
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="landscape"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
