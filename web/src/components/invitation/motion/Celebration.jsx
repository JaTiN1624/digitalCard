import { useCallback, useEffect, useRef } from "react";
import { CelebrationContext } from "./celebrationContext.js";

// Confetti / party-popper bursts on one shared canvas. The animation loop only runs while
// particles are alive, so nothing is spent between celebrations. Reduced-motion visitors get none.
//
//   const celebrate = useCelebrate();   (from ./celebrationContext.js)
//   celebrate("open");                 // two poppers from the lower corners
//   celebrate("burst", buttonElement); // a burst from an element (e.g. the RSVP button)
//   celebrate("shower");               // gentle shower from the top (date reveal)

const MAX_PARTICLES = 220;
const SHAPES = ["rect", "rect", "circle", "petal", "strip"];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function makeParticle(x, y, angle, speed, colors, shapes) {
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 5 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.3,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.05 + Math.random() * 0.08,
    life: 0,
    maxLife: 110 + Math.random() * 70,
  };
}

function drawParticle(ctx, p) {
  const fade = Math.min(1, (p.maxLife - p.life) / 40);
  ctx.save();
  ctx.globalAlpha = fade;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.scale(1, Math.cos(p.wobble)); // paper-like flutter
  ctx.fillStyle = p.color;
  const s = p.size;
  switch (p.shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(0, 0, s / 2.4, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "petal":
      ctx.beginPath();
      ctx.ellipse(0, 0, s / 1.6, s / 3.2, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "strip":
      ctx.fillRect(-s, -s / 6, s * 2, s / 3);
      break;
    default:
      ctx.fillRect(-s / 2, -s / 3, s, s / 1.5);
  }
  ctx.restore();
}

export function CelebrationProvider({ colors = ["#d4af37", "#f5d98b", "#b0263f", "#ffffff"], children }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const frame = useRef(0);
  const colorsRef = useRef(colors);

  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // One animation step; schedules itself through loopRef while particles remain
  const loopRef = useRef(null);
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = canvas.dpr ?? 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current.filter((p) => p.life < p.maxLife && p.y < window.innerHeight + 40);
    for (const p of particles.current) {
      p.life += 1;
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 + 0.16; // drag + gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.wobble += p.wobbleSpeed;
      drawParticle(ctx, p);
    }

    if (particles.current.length) {
      frame.current = requestAnimationFrame(() => loopRef.current());
    } else {
      frame.current = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  const celebrate = useCallback(
    (preset = "burst", origin = null) => {
      const canvas = canvasRef.current;
      if (!canvas || prefersReducedMotion()) return;

      // Size the canvas to the viewport (capped DPR keeps it cheap on high-density phones)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      canvas.dpr = dpr;

      const c = colorsRef.current;
      const add = (x, y, n, angle, spread, speed) => {
        for (let i = 0; i < n && particles.current.length < MAX_PARTICLES; i++) {
          const a = angle + (Math.random() - 0.5) * spread;
          particles.current.push(makeParticle(x, y, a, speed * (0.55 + Math.random() * 0.6), c, SHAPES));
        }
      };

      const small = w < 600;
      if (preset === "open") {
        add(0, h * 0.92, small ? 55 : 80, -Math.PI / 3, 0.7, small ? 15 : 19);
        add(w, h * 0.92, small ? 55 : 80, (-2 * Math.PI) / 3, 0.7, small ? 15 : 19);
      } else if (preset === "shower") {
        for (let i = 0; i < (small ? 60 : 90); i++) {
          add(Math.random() * w, -10, 1, Math.PI / 2, 0.6, 2 + Math.random() * 3);
        }
      } else {
        const rect = origin?.getBoundingClientRect?.();
        const x = rect ? rect.left + rect.width / 2 : w / 2;
        const y = rect ? rect.top + rect.height / 2 : h / 2;
        add(x, y, small ? 70 : 100, -Math.PI / 2, Math.PI * 1.1, small ? 13 : 16);
      }

      if (!frame.current) frame.current = requestAnimationFrame(loop);
    },
    [loop],
  );

  return (
    <CelebrationContext.Provider value={celebrate}>
      {children}
      <canvas ref={canvasRef} className="celebration-canvas" aria-hidden="true" />
    </CelebrationContext.Provider>
  );
}
