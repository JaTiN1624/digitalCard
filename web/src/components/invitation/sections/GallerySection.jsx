import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Stagger, StaggerItem } from "../motion/ScrollReveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { safeMediaUrl } from "../../../utils/invitation.js";

// Photo gallery with lazy-loaded tiles and a lightbox. The tapped photo morphs into the
// lightbox (shared layout animation); swipe or use arrow keys to move, Esc or tap outside to close.

function Lightbox({ photos, index, setIndex, t }) {
  const closeRef = useRef(null);
  const photo = photos[index];
  const go = useCallback((step) => setIndex((i) => (i + step + photos.length) % photos.length), [photos.length, setIndex]);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [go, setIndex]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t("gallery.title")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIndex(null)}
    >
      <motion.img
        key={photo.url}
        layoutId={`photo-${photo.url}`}
        src={photo.url}
        alt={photo.caption ?? ""}
        className="lightbox-image"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.6}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(1);
          else if (info.offset.x > 60) go(-1);
        }}
        onClick={(e) => e.stopPropagation()}
      />
      {photo.caption && <p className="lightbox-caption">{photo.caption}</p>}
      <p className="lightbox-count">
        {index + 1} / {photos.length}
      </p>
      {photos.length > 1 && (
        <>
          <button type="button" className="lightbox-nav prev" aria-label={t("gallery.previous")} onClick={(e) => (e.stopPropagation(), go(-1))}>
            ‹
          </button>
          <button type="button" className="lightbox-nav next" aria-label={t("gallery.next")} onClick={(e) => (e.stopPropagation(), go(1))}>
            ›
          </button>
        </>
      )}
      <button ref={closeRef} type="button" className="lightbox-close" aria-label={t("gallery.close")} onClick={() => setIndex(null)}>
        ×
      </button>
    </motion.div>
  );
}

export default function GallerySection({ invitation, t, ornament }) {
  const [index, setIndex] = useState(null);
  const photos = (invitation.config.gallery ?? [])
    .map((p) => ({ ...p, url: safeMediaUrl(p.url) }))
    .filter((p) => p.url);
  if (!photos.length) return null;

  return (
    <section className="sec sec-gallery">
      <SectionHeading eyebrow={t("gallery.eyebrow")} title={t("gallery.title")} ornament={ornament} />
      <Stagger as="ul" className="gallery-grid" step={0.08}>
        {photos.map((photo, i) => (
          <StaggerItem as="li" key={photo.url} preset="zoom" className={`gallery-tile ${i % 5 === 0 ? "is-tall" : ""}`}>
            <button type="button" onClick={() => setIndex(i)} aria-label={photo.caption || t("gallery.open", { n: i + 1 })}>
              {index !== i && (
                <motion.img layoutId={`photo-${photo.url}`} src={photo.url} alt="" loading="lazy" decoding="async" />
              )}
            </button>
          </StaggerItem>
        ))}
      </Stagger>
      <AnimatePresence>
        {index !== null && <Lightbox photos={photos} index={index} setIndex={setIndex} t={t} />}
      </AnimatePresence>
    </section>
  );
}
