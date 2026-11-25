import { useEffect, useState } from "react";
import { useInView } from "motion/react";

// True once the element has entered the screen — or has already been scrolled past.
// IntersectionObserver alone can miss an element that jumps across the viewport between two
// frames (a fast fling, or photos above it finishing loading), which would leave content hidden
// forever. The scroll check is a cheap fallback that removes itself once revealed.
export function useReveal(ref, amount = 0.2) {
  const inView = useInView(ref, { once: true, amount });
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (inView || passed) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.95) setPassed(true);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [inView, passed, ref]);

  return inView || passed;
}
