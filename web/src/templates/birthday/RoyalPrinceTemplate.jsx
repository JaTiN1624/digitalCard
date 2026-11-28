import { motion } from "motion/react";
import BirthdayStage from "../../components/invitation/birthday/BirthdayStage.jsx";
import { DirectionsButtons, MapEmbed } from "../../components/invitation/birthday/PartyBits.jsx";
import { useGoogleFont } from "../../components/invitation/birthday/useGoogleFont.js";
import Particles from "../../components/invitation/motion/Particles.jsx";
import NameReveal from "../../components/invitation/motion/NameReveal.jsx";
import { ScrollReveal, Stagger, StaggerItem, CinematicImage } from "../../components/invitation/motion/ScrollReveal.jsx";
import Countdown from "../../components/invitation/Countdown.jsx";
import GallerySection from "../../components/invitation/sections/GallerySection.jsx";
import { CalendarButtons } from "../../components/invitation/sections/SaveTheDate.jsx";
import { RsvpCard, ShareButtons } from "../../components/invitation/sections/ClosingSections.jsx";
import { CelebrateButton, ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { Corner } from "../../components/invitation/art/Motifs.jsx";
import { Crest, WaxSeal } from "../../components/invitation/art/SceneArt.jsx";
import { initialOf } from "../../utils/format.js";
import "./royal-prince.css";

// Royal Prince — first birthdays and boys' milestones. A folded royal letter closed with a wax
// seal: tap and the seal cracks in two. Royal blue velvet, gold heraldry: a crest bearing the
// initial, hanging banners, a framed proclamation, the schedule on a row of shields and the
// date on a notched ribbon.
const FONT = "EB+Garamond:ital@0;1";

function SealedLetter({ opening, display, date, t }) {
  const initial = initialOf(display);
  const crack = { duration: 0.8, ease: [0.65, 0, 0.35, 1] };
  return (
    <div className="prince-letter">
      <motion.div className="prince-paper" animate={opening ? { scaleY: 1.08, y: -10 } : {}} transition={{ delay: 0.5, duration: 0.8 }}>
        <p className="prince-letter-kicker">{t("prince.decree")}</p>
        <p className="prince-letter-name">{display}</p>
        {date && <p className="prince-letter-date">{date}</p>}
      </motion.div>
      <motion.div className="prince-seal half-l" animate={opening ? { x: -90, y: 60, rotate: -50, opacity: 0 } : {}} transition={crack}>
        <WaxSeal initial={initial} />
      </motion.div>
      <motion.div className="prince-seal half-r" animate={opening ? { x: 90, y: 70, rotate: 45, opacity: 0 } : {}} transition={crack}>
        <WaxSeal initial={initial} />
      </motion.div>
    </div>
  );
}

export default function RoyalPrinceTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="prince"
      confetti={["#d8b25a", "#f3dfa8", "#1d3a8a", "#ffffff"]}
      decoration={<Particles kinds={["gold", "sparkle"]} count={12} seed={88} />}
      cover={{ variant: "seal", object: SealedLetter, duration: 1.4, heading: false, prompt: "prince.prompt" }}
    >
      {(party) => <PrincePage {...props} party={party} />}
    </BirthdayStage>
  );
}

function PrincePage({ invitation, preview, party }) {
  const { t, vars, stage, date, language } = party;

  return (
    <>
      <header className="prince-hero">
        <span className="prince-banner left" aria-hidden="true" />
        <span className="prince-banner right" aria-hidden="true" />
        <motion.p className="prince-decree" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
          {t("prince.decree")}
        </motion.p>
        <motion.div className="prince-crest" initial={{ opacity: 0, scale: 0.6, y: -30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <Crest initial={initialOf(party.name)} />
        </motion.div>
        <NameReveal className="prince-name" fallback={party.name} delay={1} shimmer />
        <motion.span className="prince-rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.6, duration: 1 }} />
        <motion.p className="prince-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
          {t(`bday.line.${stage}`, vars)}
        </motion.p>
        <motion.p className="prince-court" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          {t("prince.court")}
        </motion.p>
      </header>

      {party.photo && <CinematicImage className="prince-portrait" src={party.photo} alt={party.name} parallax={18} />}

      {party.message && (
        <section className="prince-sec">
          <ScrollReveal className="prince-proclamation" preset="unfold">
            {["tl", "tr", "bl", "br"].map((c) => (
              <Corner key={c} className={`prince-corner ${c}`} />
            ))}
            <p className="prince-label">{t("prince.proclamation")}</p>
            <p className="prince-message">{party.message}</p>
            {party.host && <p className="prince-host">{t("bday.hostedBy", vars)}</p>}
          </ScrollReveal>
        </section>
      )}

      {date && (
        <section className="prince-sec">
          <ScrollReveal className="prince-ribbon" preset="zoom">
            <span>{date.weekday}</span>
            <strong>
              {date.day} {date.month} {date.year}
            </strong>
            <span>
              {date.time}
              {date.endTime && ` – ${date.endTime}`}
            </span>
          </ScrollReveal>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="prince-sec">
          <h2 className="prince-title">{t("bday.events.title")}</h2>
          <Stagger as="ol" className="prince-shields" step={0.15}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="rise" className="prince-shield">
                <span className="prince-shield-face">
                  <span className="prince-shield-time">{e.time}</span>
                </span>
                <span className="prince-shield-name">{e.name}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {party.show("cake") && (
        <section className="prince-sec">
          <h2 className="prince-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="prince-sec">
          <h2 className="prince-title">{t("prince.palace")}</h2>
          <ScrollReveal className="prince-panel" preset="rise">
            <p className="prince-venue">{party.venue}</p>
            {party.address && <p className="prince-address">{party.address}</p>}
            {party.dressCode && party.show("dressCode") && (
              <p className="prince-address">
                {t("bday.dressCode.title")} · {party.dressCode}
              </p>
            )}
            <MapEmbed party={party} t={t} className="party-map prince-map" />
            <DirectionsButtons party={party} t={t} />
          </ScrollReveal>
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="prince-sec" id="rsvp">
          <h2 className="prince-title">{t("prince.reply")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="prince-panel prince-rsvp" preset="unfold" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="prince-sec">
          <CelebrateButton t={t} label={t("prince.hail")} className="prince-hail" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="prince-sec">
          <p className="prince-label">{t(party.kids ? "bday.contact.parents" : "bday.contact.host")}</p>
          {party.host && <p className="prince-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="prince-foot">
        <Crest className="prince-foot-crest" />
        <p className="prince-thanks">{t("bday.thanks.text")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
