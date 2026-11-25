import { useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useCelebrate } from "./celebrationContext.js";

// A rolled golden scroll. Guests drag the right handle outwards (or tap it) and both rods slide
// apart, unrolling the paper and revealing the Save-the-Date. Releasing past ~35% finishes the
// unroll; less springs back. Vertical page scrolling keeps working while dragging.

const ROD = 16;

export default function RibbonReveal({ t, children, className = "" }) {
  const wrapRef = useRef(null);
  const [max, setMax] = useState(140);
  const [opened, setOpened] = useState(false);
  const reduced = useReducedMotion();
  const celebrate = useCelebrate();

  const x = useMotionValue(0);
  const leftX = useTransform(x, (v) => -v);
  const scaleX = useTransform(x, [0, max], [0.04, 1]);
  const contentOpacity = useTransform(x, [max * 0.7, max], [0, 1]);
  const hintOpacity = useTransform(x, [0, max * 0.25], [1, 0]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const next = Math.max(60, el.offsetWidth / 2 - ROD);
      setMax(next);
      if (opened) x.set(next);
    };
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [opened, x]);

  const open = () => {
    if (opened) return;
    setOpened(true);
    animate(x, max, { duration: reduced ? 0 : 1.1, ease: [0.65, 0, 0.35, 1] }).then(() => {
      celebrate("shower");
    });
  };

  const onDragEnd = () => {
    if (x.get() > max * 0.35) open();
    else animate(x, 0, { type: "spring", stiffness: 300, damping: 26 });
  };

  return (
    <div ref={wrapRef} className={`ribbon ${opened ? "is-open" : ""} ${className}`.trim()}>
      <motion.div className="ribbon-paper" style={{ scaleX }} aria-hidden="true" />

      <motion.div className="ribbon-content" style={{ opacity: contentOpacity }}>
        {children}
      </motion.div>

      <motion.span className="ribbon-rod" style={{ x: leftX }} aria-hidden="true" />
      <motion.button
        type="button"
        className="ribbon-rod ribbon-handle"
        style={{ x }}
        drag={opened ? false : "x"}
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0.04}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        onClick={open}
        aria-label={t("ribbon.open")}
        aria-expanded={opened}
      />

      {!opened && (
        <motion.p className="ribbon-hint" style={{ opacity: hintOpacity }} aria-hidden="true">
          <span className="ribbon-hint-arrow">⟷</span>
          {t("ribbon.hint")}
        </motion.p>
      )}
    </div>
  );
}
