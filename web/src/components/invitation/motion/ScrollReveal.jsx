import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useReveal } from "./useReveal.js";


// Scroll-triggered entrances. Each theme picks a preset so sections don't all "fade up" alike.
// Content is never locked: animations run once, after the element is already on screen.

const EASE = [0.22, 1, 0.36, 1];

const PRESETS = {
  rise: { hidden: { opacity: 0, y: 36 }, shown: { opacity: 1, y: 0 } },
  // clip-path values must use identical units on both ends or Motion can't interpolate them
  mask: { hidden: { clipPath: "inset(0% 0% 100% 0%)", y: 24 }, shown: { clipPath: "inset(0% 0% 0% 0%)", y: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.92 }, shown: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(10px)" }, shown: { opacity: 1, filter: "blur(0px)" } },
  left: { hidden: { opacity: 0, x: -40 }, shown: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, shown: { opacity: 1, x: 0 } },
  unfold: { hidden: { opacity: 0, rotateX: -35, y: 30 }, shown: { opacity: 1, rotateX: 0, y: 0 } },
};

export function ScrollReveal({ as = "div", preset = "rise", delay = 0, duration = 0.9, amount = 0.2, className, children, ref, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  const v = PRESETS[preset] ?? PRESETS.rise;
  // Use the caller's ref (an object ref) when given, so they can measure the same element
  const local = useRef(null);
  const target = ref ?? local;
  const shown = useReveal(target, amount);
  const variants = { hidden: v.hidden, shown: { ...v.shown, transition: { duration, delay, ease: EASE } } };
  const trigger = { ref: target, initial: "hidden", animate: shown ? "shown" : "hidden" };

  // A fully clipped element has no visible area, so the browser never reports it as in view.
  // For the mask preset, watch the unclipped wrapper and animate an inner layer instead.
  if (preset === "mask") {
    return (
      <Tag className={className} {...trigger} {...rest}>
        <motion.div variants={variants}>{children}</motion.div>
      </Tag>
    );
  }

  return (
    <Tag className={className} {...trigger} variants={variants} {...rest}>
      {children}
    </Tag>
  );
}

// Parent that staggers its <StaggerItem> children as it scrolls into view
export function Stagger({ as = "div", step = 0.12, delay = 0, amount = 0.15, className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  const ref = useRef(null);
  const shown = useReveal(ref, amount);
  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      variants={{ shown: { transition: { staggerChildren: step, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", preset = "rise", className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  const v = PRESETS[preset] ?? PRESETS.rise;
  return (
    <Tag
      className={className}
      variants={{ hidden: v.hidden, shown: { ...v.shown, transition: { duration: 0.8, ease: EASE } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Photo that wipes open when it enters the screen and drifts with a subtle parallax.
// Width/height (or CSS aspect-ratio on the frame) reserve space so nothing jumps on load.
export function CinematicImage({ src, alt = "", className = "", parallax = 40, reveal = "wipe", priority = false, width, height }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const shown = useReveal(ref, 0.25);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-parallax, parallax]);

  const frame =
    reveal === "zoom"
      ? { hidden: { opacity: 0, scale: 1.08 }, shown: { opacity: 1, scale: 1 } }
      : { hidden: { clipPath: "inset(12% 12% 12% 12%)", opacity: 0.4 }, shown: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } };

  return (
    <motion.div
      ref={ref}
      className={`cine-image ${className}`.trim()}
      initial="hidden"
      animate={shown ? "shown" : "hidden"}
      variants={{ hidden: frame.hidden, shown: { ...frame.shown, transition: { duration: 1.4, ease: EASE } } }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ y, scale: parallax ? 1.12 : 1 }}
      />
    </motion.div>
  );
}
