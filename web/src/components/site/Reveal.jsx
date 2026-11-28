import { useEffect, useRef, useState } from "react";

// One gentle fade-up the first time a block scrolls into view (CSS in site.css: .rv / .in).
// Content is always in the HTML; without JavaScript it is simply shown.
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rv ${shown ? "in" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
