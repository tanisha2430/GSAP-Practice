import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// LESSON 3 — HORIZONTAL SCROLL WITH PIN
// ═══════════════════════════════════════════════════════════════════════════
//
// The trick: the section gets "pinned" (fixed in place) while scroll progress
// drives the text sideways. Once the text has fully scrolled, the pin releases
// and normal vertical scroll continues.
//
// Key concepts:
//   pin: true     → freezes the trigger element in place while the animation runs
//   scrub: N      → ties animation progress to scroll (N = smoothing lag in seconds)
//   ease: "none"  → no easing on scrubbed animations — easing feels wrong when
//                   directly tied to a physical scroll position
//   end: "+= N"   → scroll N extra pixels while pinned (controls how long it stays)
//
// Why calculate the x dynamically?
//   The text is wider than the viewport. We need to scroll it exactly
//   (textWidth - viewportWidth) pixels to the left so it ends flush.
//   Hard-coding a % or px value breaks on different screen sizes.

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    gsap.to(textEl, {
      // move left by exactly (textWidth - viewportWidth) so it ends flush
      x: () => -(textEl.scrollWidth - window.innerWidth) + "px",
      ease: "none",   // no easing — feels unnatural when tied to scroll position
      scrollTrigger: {
        trigger: ".h-scroll-section",
        pin: true,     // pin the section while text scrolls
        scrub: 1,      // 1s lag — smoothly follows scroll
        // scroll distance = overflow amount so the pin releases exactly when text ends
        end: () => "+=" + textEl.scrollWidth,
      },
    });
  });

  return (
    <>
      {/* Page before — normal scroll */}
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-2xl text-gray-400">↓ Scroll down</p>
      </div>

      {/* Pinned horizontal scroll section */}
      <div className="h-scroll-section min-h-screen flex items-center overflow-hidden bg-black">
        <h1
          ref={textRef}
          className="whitespace-nowrap text-[18vw] font-black uppercase leading-none text-white"
          style={{ willChange: "transform" }}
        >
          EXPERIENCE&nbsp;&nbsp;EXPERIENCE&nbsp;&nbsp;EXPERIENCE
        </h1>
      </div>

      {/* Page after — normal scroll resumes */}
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-2xl text-gray-400">↑ Text done — scroll continues</p>
      </div>
    </>
  );
};

export default HorizontalScroll;
