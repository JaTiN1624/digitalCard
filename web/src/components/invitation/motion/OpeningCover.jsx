import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useCelebrate } from "./celebrationContext.js";
import { Rings, Rosette, Toran, Corner, Plane } from "../art/Motifs.jsx";
import { coupleNames, displayName, occasionOf } from "../../../utils/invitation.js";
import { initialOf, formatShortDate } from "../../../utils/format.js";

// Full-screen opening cover with a physical object guests tap to open.
// variant: envelope | book | doors | cinema | ringbox | ticket | giftbox | arcade | comic
// Works for couples (wedding) and single names (birthday) through displayName().
// One tap only: further taps are ignored while it opens. Confetti fires as it opens, then
// onOpened() hands over to the invitation. Reduced motion opens instantly.

const EASE = [0.65, 0, 0.35, 1];
const DURATION = { envelope: 1.9, book: 1.6, doors: 1.7, cinema: 1.5, ringbox: 2.0, ticket: 1.6, giftbox: 1.8, arcade: 1.4, comic: 1.3 };

function Envelope({ opening, initials, label, date, emblem }) {
  return (
    <div className="env">
      <div className="env-back" />
      <motion.div
        className="env-card"
        animate={opening ? { y: "-58%" } : { y: "0%" }}
        transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
      >
        <span className="cover-small">{label}</span>
        <span className="cover-initials">{initials}</span>
        {date && <span className="cover-small">{date}</span>}
      </motion.div>
      <div className="env-pocket" />
      <motion.div
        className="env-flap"
        animate={{ rotateX: opening ? 180 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <motion.div
        className="env-seal"
        animate={opening ? { scale: 0.3, opacity: 0, rotate: 40 } : { scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.4 }}
      >
        {emblem ?? <Rosette />}
      </motion.div>
    </div>
  );
}

function Book({ opening, initials, label, date, emblem, names, display }) {
  return (
    <motion.div className="book" animate={{ x: opening ? "18%" : "0%" }} transition={{ duration: 1.2, ease: EASE }}>
      <div className="book-page">
        <span className="cover-small">{label}</span>
        <span className="book-names">
          {names.groom && names.bride ? (
            <>
              {names.groom}
              <em> &amp; </em>
              {names.bride}
            </>
          ) : (
            display || initials
          )}
        </span>
        {date && <span className="cover-small">{date}</span>}
      </div>
      <motion.div
        className="book-cover"
        animate={{ rotateY: opening ? -168 : 0 }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <div className="book-front">
          {["tl", "tr", "bl", "br"].map((c) => (
            <Corner key={c} className={`book-corner ${c}`} />
          ))}
          <span className="book-emblem">{emblem}</span>
          <span className="cover-initials">{initials}</span>
          {date && <span className="cover-small">{date}</span>}
        </div>
        <div className="book-inside" />
      </motion.div>
    </motion.div>
  );
}

function Doors({ opening, initials, label, date, emblem }) {
  return (
    <div className="doors">
      <div className="doors-inner">
        <span className="doors-emblem">{emblem}</span>
        <span className="cover-small">{label}</span>
        <span className="cover-initials">{initials}</span>
        {date && <span className="cover-small">{date}</span>}
      </div>
      {["left", "right"].map((side) => (
        <motion.div
          key={side}
          className={`door door-${side}`}
          animate={{ rotateY: opening ? (side === "left" ? -108 : 108) : 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
        >
          <span className="door-panel" />
          <span className="door-panel" />
          <span className="door-knocker" />
        </motion.div>
      ))}
      <Toran className="doors-toran" />
    </div>
  );
}

function Cinema({ opening, label, date, display }) {
  return (
    <div className="cinema">
      <motion.div
        className="cinema-frame"
        animate={opening ? { scale: 1.35, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      >
        <span className="cinema-leader" aria-hidden="true" />
        <span className="cover-small">{label}</span>
        <span className="cinema-names">{display}</span>
        {date && <span className="cover-small">{date}</span>}
      </motion.div>
      <motion.span className="cinema-bar top" animate={{ y: opening ? "-100%" : "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.4 }} />
      <motion.span className="cinema-bar bottom" animate={{ y: opening ? "100%" : "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.4 }} />
    </div>
  );
}

function RingBox({ opening, initials }) {
  return (
    <div className="ringbox">
      <div className="rb-base">
        <div className="rb-cushion" />
        <motion.div
          className="rb-ring"
          animate={opening ? { y: -46, scale: 1.25, opacity: 1 } : { y: 0, scale: 0.9, opacity: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "backOut" }}
        >
          <span className="rb-glow" />
          <Rings />
        </motion.div>
      </div>
      <motion.div
        className="rb-lid"
        animate={{ rotateX: opening ? 115 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="cover-initials">{initials}</span>
      </motion.div>
    </div>
  );
}

function Ticket({ opening, initials, label, date, display, invitation, t, ticketKind = "travel" }) {
  const party = ticketKind === "party";
  return (
    <div className="ticket">
      <motion.div
        className="ticket-main"
        animate={opening ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
      >
        <div className="ticket-head">
          <span>{t(party ? "cover.party.pass" : "cover.boardingPass")}</span>
          <Plane className="ticket-plane" />
        </div>
        <div className="ticket-row">
          <div>
            <span className="cover-small">{t(party ? "cover.party.guest" : "cover.passengers")}</span>
            <strong>{display || initials}</strong>
          </div>
        </div>
        <div className="ticket-row">
          <div>
            <span className="cover-small">{t(party ? "cover.party.venue" : "cover.destination")}</span>
            <strong>{invitation.config.venue ?? label}</strong>
          </div>
          {date && (
            <div>
              <span className="cover-small">{t("cover.date")}</span>
              <strong>{date}</strong>
            </div>
          )}
        </div>
      </motion.div>
      <motion.div
        className="ticket-stub"
        animate={opening ? { rotate: 16, x: 24, y: 70, opacity: 0 } : { rotate: 0, x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className="cover-initials">{initials}</span>
        <Plane className="ticket-stub-plane" />
      </motion.div>
    </div>
  );
}

// Gift box: the lid pops off and the invitation card rises out
function GiftBox({ opening, initials, label, date, emblem }) {
  return (
    <div className="giftbox">
      <motion.div
        className="gb-card"
        animate={opening ? { y: "-78%" } : { y: "0%" }}
        transition={{ delay: 0.55, duration: 0.9, ease: "backOut" }}
      >
        <span className="cover-small">{label}</span>
        <span className="cover-initials">{initials}</span>
        {date && <span className="cover-small">{date}</span>}
      </motion.div>
      <div className="gb-box">
        <span className="gb-ribbon" />
      </div>
      <motion.div
        className="gb-lid"
        animate={opening ? { y: -150, x: -50, rotate: -28, opacity: 0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span className="gb-ribbon" />
        <span className="gb-bow">{emblem}</span>
      </motion.div>
    </div>
  );
}

// Arcade cabinet: "press start", then the screen switches off like an old CRT
function Arcade({ opening, display, initials, t }) {
  return (
    <div className="arcade">
      <div className="arcade-screen">
        <motion.div
          className="arcade-content"
          animate={opening ? { scaleY: 0.02, scaleX: 1.1, opacity: 0 } : { scaleY: 1, scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.35, ease: "easeIn" }}
        >
          <span className="arcade-player">{t("cover.arcade.player")}</span>
          <span className="arcade-name">{display || initials}</span>
          <span className="arcade-start">{t("cover.arcade.start")}</span>
        </motion.div>
        <motion.span
          className="arcade-flash"
          initial={{ opacity: 0 }}
          animate={opening ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
      </div>
      <div className="arcade-controls" aria-hidden="true">
        <span className="arcade-stick" />
        <span className="arcade-btn" />
        <span className="arcade-btn alt" />
      </div>
    </div>
  );
}

// Comic panel: a "POW!" bursts and the panel splits along the diagonal
function Comic({ opening, display, initials, date, t }) {
  const content = (
    <>
      <span className="comic-name">{display || initials}</span>
      {date && <span className="cover-small">{date}</span>}
    </>
  );
  return (
    <div className="comic">
      <motion.div
        className="comic-half one"
        animate={opening ? { x: "-60%", y: "-25%", rotate: -10, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
      >
        {content}
      </motion.div>
      <motion.div
        className="comic-half two"
        aria-hidden="true"
        animate={opening ? { x: "60%", y: "25%", rotate: 10, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
      >
        {content}
      </motion.div>
      <motion.span
        className="comic-pow"
        initial={{ scale: 0 }}
        animate={opening ? { scale: [0, 1.35, 1], rotate: [-25, 8, -4] } : { scale: 0 }}
        transition={{ duration: 0.45 }}
      >
        {t("cover.comic.pow")}
      </motion.span>
    </div>
  );
}

const VARIANTS = {
  envelope: Envelope,
  book: Book,
  doors: Doors,
  cinema: Cinema,
  ringbox: RingBox,
  ticket: Ticket,
  giftbox: GiftBox,
  arcade: Arcade,
  comic: Comic,
};

// Templates with their own opening pass `object` (a component that receives the same props as
// the built-in variants plus `opening`), its `duration` in seconds and whether to show the
// shared heading. `variant` is then only used as the CSS class (cover-<variant>).
export default function OpeningCover({
  variant = "envelope",
  invitation,
  t,
  onOpened,
  emblem = null,
  decoration = null,
  ticketKind,
  object = null,
  duration,
  heading,
  prompt,
}) {
  const [opening, setOpening] = useState(false);
  const started = useRef(false);
  const reduced = useReducedMotion();
  const celebrate = useCelebrate();

  const names = coupleNames(invitation);
  const occasion = occasionOf(invitation);
  const label = t(`occasion.title.${occasion}`);
  const couple = Boolean(names.groom && names.bride);
  const display = displayName(invitation);
  const initials = couple ? `${initialOf(names.groom)} & ${initialOf(names.bride)}` : initialOf(display);
  const date = invitation.eventDate ? formatShortDate(invitation.eventDate, invitation.language) : null;
  const Object3D = object ?? VARIANTS[variant] ?? Envelope;
  const seconds = duration ?? DURATION[variant] ?? 1.6;
  const showNames = heading ?? !["cinema", "ticket", "arcade", "comic"].includes(variant);

  const open = () => {
    if (started.current) return; // ignore double taps
    started.current = true;
    setOpening(true);
    const total = reduced ? 0 : seconds * 1000;
    window.setTimeout(() => celebrate("open"), total * 0.55);
    window.setTimeout(onOpened, total);
  };

  return (
    <motion.section
      className={`cover cover-${variant} ${opening ? "is-opening" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      {decoration}

      <motion.div
        className="cover-heading"
        initial={{ opacity: 0, y: -16 }}
        animate={opening ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: opening ? 0 : 0.3 }}
      >
        {variant !== "cinema" && heading !== false && <p className="cover-eyebrow">{label}</p>}
        {showNames &&
          (couple ? (
            <p className="cover-names">
              {names.groom} <span>&amp;</span> {names.bride}
            </p>
          ) : (
            display && <p className="cover-names">{display}</p>
          ))}
      </motion.div>

      <div
        role="button"
        tabIndex={0}
        className="cover-object"
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
        aria-label={t("cover.openLabel")}
        aria-disabled={opening}
      >
        <Object3D
          opening={opening}
          initials={initials}
          label={label}
          date={date}
          emblem={emblem}
          names={names}
          display={display}
          invitation={invitation}
          ticketKind={ticketKind}
          t={t}
        />
      </div>

      <motion.button
        type="button"
        className="cover-prompt"
        onClick={open}
        tabIndex={-1}
        aria-hidden="true"
        animate={opening ? { opacity: 0 } : { opacity: 1, y: [0, 6, 0] }}
        transition={opening ? { duration: 0.3 } : { y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }, opacity: { delay: 1 } }}
      >
        <span className="cover-tap" />
        {prompt ?? t("cover.tap")}
      </motion.button>
    </motion.section>
  );
}
