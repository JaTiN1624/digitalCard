import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

// Wraps the invitation once the cover has opened: brings the page to the top and fades the
// content in with a slight settle, so the hand-over from cover to invitation feels continuous.
export default function Unveil({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    ref.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`tpl-content ${className}`.trim()}
      initial={reduced ? false : { opacity: 0, scale: 1.015 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
