import { useRef, useState } from "react";
import { ScrollReveal } from "../motion/ScrollReveal.jsx";
import { useCelebrate } from "../motion/celebrationContext.js";
import NameReveal from "../motion/NameReveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import RsvpForm from "../../../features/rsvp/RsvpForm.jsx";
import { coupleNames, displayName } from "../../../utils/invitation.js";

// The RSVP form in a revealing card; confetti bursts from the card when a guest says yes.
// Templates place it inside their own section design.
export function RsvpCard({ invitation, t, preview, className = "rsvp", preset = "rise" }) {
  const cardRef = useRef(null);
  const celebrate = useCelebrate();
  return (
    <ScrollReveal ref={cardRef} className={className} preset={preset}>
      <RsvpForm
        slug={invitation.slug}
        t={t}
        preview={preview}
        onSuccess={(attendance) => attendance !== "NOT_ATTENDING" && celebrate("burst", cardRef.current)}
      />
    </ScrollReveal>
  );
}

export function RsvpSection({ invitation, t, preview, ornament }) {
  return (
    <section className="sec sec-rsvp" id="rsvp">
      <SectionHeading eyebrow={t("rsvp.eyebrow")} ornament={ornament} />
      <RsvpCard invitation={invitation} t={t} preview={preview} />
    </section>
  );
}

// WhatsApp, the phone's share sheet and copy-link buttons for this invitation
export function ShareButtons({ invitation, t, className = "sec-actions" }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = t("share.text", { names: displayName(invitation) });
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <div className={className}>
          <a
            className="btn btn-whatsapp"
            href={`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("share.whatsapp")}
          </a>
          {canShare && (
            <button type="button" className="btn btn-ghost" onClick={() => navigator.share({ title: invitation.title, text, url }).catch(() => {})}>
              {t("share.more")}
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={copy}>
            {copied ? t("share.copied") : t("share.copy")}
          </button>
      </div>
      <p className="sr-only" role="status">
        {copied ? t("share.copied") : ""}
      </p>
    </>
  );
}

// Share the invitation on WhatsApp (or the phone's share sheet) and copy the link
export function ShareSection({ invitation, t }) {
  return (
    <section className="sec sec-share">
      <ScrollReveal className="share-card" preset="zoom">
        <p className="sec-eyebrow">{t("share.eyebrow")}</p>
        <ShareButtons invitation={invitation} t={t} />
      </ScrollReveal>
    </section>
  );
}

export function ThankYouSection({ invitation, t, emblem }) {
  const names = coupleNames(invitation);
  return (
    <footer className="sec sec-thanks">
      {emblem && <div className="thanks-emblem">{emblem}</div>}
      <ScrollReveal as="p" className="sec-eyebrow" preset="blur">
        {t("thanks.eyebrow")}
      </ScrollReveal>
      <ScrollReveal as="p" className="thanks-text" preset="blur" delay={0.15}>
        {t("thanks.text")}
      </ScrollReveal>
      <NameReveal as="p" className="thanks-names" groom={names.groom} bride={names.bride} fallback={displayName(invitation)} onView />
      {invitation.config.hashtag && <p className="hashtag">#{invitation.config.hashtag}</p>}
    </footer>
  );
}
