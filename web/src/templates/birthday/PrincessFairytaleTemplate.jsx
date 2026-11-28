import { motion } from "motion/react";
import BirthdayStage from "../../components/invitation/birthday/BirthdayStage.jsx";
import { DirectionsButtons, MapEmbed, Parallax } from "../../components/invitation/birthday/PartyBits.jsx";
import { useGoogleFont } from "../../components/invitation/birthday/useGoogleFont.js";
import Particles from "../../components/invitation/motion/Particles.jsx";
import NameReveal from "../../components/invitation/motion/NameReveal.jsx";
import { ScrollReveal, Stagger, StaggerItem, CinematicImage } from "../../components/invitation/motion/ScrollReveal.jsx";
import Countdown from "../../components/invitation/Countdown.jsx";
import GallerySection from "../../components/invitation/sections/GallerySection.jsx";
import { CalendarButtons } from "../../components/invitation/sections/SaveTheDate.jsx";
import { RsvpCard, ShareButtons } from "../../components/invitation/sections/ClosingSections.jsx";
import { ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { Crown } from "../../components/invitation/art/Motifs.jsx";
import { Butterfly, Castle } from "../../components/invitation/art/BirthdayArt.jsx";
import { GateHalf } from "../../components/invitation/art/SceneArt.jsx";
import { formatNumber } from "../../utils/format.js";
import "./princess-fairytale.css";

// Princess Fairytale — a storybook. Castle gates swing open onto a twilight kingdom; the
// invitation then reads as a fairytale: "Once upon a time…", a parchment message, the party
// told in chapters, an oval mirror counting down, and "happily ever after" to close.
const FONT = "Cinzel+Decorative:wght@400;700";
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function Gates({ opening }) {
  const swing = { duration: 1.5, ease: [0.65, 0, 0.35, 1] };
  return (
    <div className="fairy-gates">
      <Castle className="fairy-gates-castle" />
      <div className="fairy-gates-glow" />
      <motion.div className="fairy-gate left" animate={{ rotateY: opening ? -105 : 0 }} transition={swing}>
        <GateHalf />
      </motion.div>
      <motion.div className="fairy-gate right" animate={{ rotateY: opening ? 105 : 0 }} transition={swing}>
        <GateHalf />
      </motion.div>
      <Crown className="fairy-gates-crown" />
    </div>
  );
}

export default function PrincessFairytaleTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="fairy"
      confetti={["#f7a8c8", "#c9a6f2", "#ffe08a", "#ffffff"]}
      decoration={<Particles kinds={["sparkle", "butterfly", "sparkle"]} count={14} seed={7} />}
      cover={{ variant: "gates", object: Gates, duration: 1.7, prompt: "fairy.prompt" }}
    >
      {(party) => <FairyPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function FairyPage({ invitation, preview, party }) {
  const { t, vars, stage, language, date } = party;
  const chapter = (i) => t("fairy.chapter", { n: language === "EN" ? ROMAN[i] ?? i + 1 : formatNumber(i + 1, language) });

  return (
    <>
      <header className="fairy-hero">
        <Parallax speed={50} className="fairy-hills" />
        <motion.p className="fairy-once" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1.4 }}>
          {t("fairy.once")}
        </motion.p>
        <motion.p className="fairy-story" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}>
          {t("fairy.story")}
        </motion.p>
        <motion.div
          className="fairy-crown"
          initial={{ opacity: 0, y: -60, rotate: -20 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 120, damping: 10 }}
        >
          <Crown />
        </motion.div>
        <NameReveal className="fairy-name" fallback={party.name} delay={1.4} />
        <motion.p className="fairy-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}>
          {t(`bday.line.${stage}`, vars)}
        </motion.p>
        <motion.div className="fairy-castle" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.4 }}>
          <Castle />
          <Butterfly className="fairy-bf b1" />
          <Butterfly className="fairy-bf b2" />
        </motion.div>
      </header>

      {party.photo && <CinematicImage className="fairy-portrait" src={party.photo} alt={party.name} parallax={18} reveal="zoom" />}

      {party.message && (
        <section className="fairy-sec">
          <ScrollReveal className="fairy-scroll" preset="unfold" duration={1.2}>
            <p className="fairy-message">{party.message}</p>
            {party.host && <p className="fairy-host">{t("bday.hostedBy", vars)}</p>}
          </ScrollReveal>
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="fairy-sec">
          <h2 className="fairy-title">{t("fairy.chapters")}</h2>
          <Stagger as="ol" className="fairy-chapters" step={0.2}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="unfold" className="fairy-page">
                <span className="fairy-chapter">{chapter(e.index)}</span>
                <span className="fairy-page-name">{e.name}</span>
                <span className="fairy-page-time">{e.time}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {date && (
        <section className="fairy-sec fairy-when">
          <ScrollReveal className="fairy-mirror" preset="zoom">
            <span className="fairy-weekday">{date.weekday}</span>
            <span className="fairy-day">{date.day}</span>
            <span className="fairy-month">
              {date.month} {date.year}
            </span>
            <span className="fairy-time">{date.time}</span>
          </ScrollReveal>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.show("cake") && (
        <section className="fairy-sec">
          <h2 className="fairy-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.dressCode && party.show("dressCode") && (
        <section className="fairy-sec">
          <ScrollReveal className="fairy-note" preset="rise">
            <p className="fairy-label">{t("bday.dressCode.title")}</p>
            <p>{party.dressCode}</p>
          </ScrollReveal>
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="fairy-sec">
          <h2 className="fairy-title">{t("fairy.kingdom")}</h2>
          <ScrollReveal className="fairy-arch" preset="rise">
            <p className="fairy-venue">{party.venue}</p>
            {party.address && <p className="fairy-address">{party.address}</p>}
            <MapEmbed party={party} t={t} className="party-map fairy-map" />
          </ScrollReveal>
          <DirectionsButtons party={party} t={t} />
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="fairy-sec" id="rsvp">
          <h2 className="fairy-title">{t("fairy.court")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="fairy-rsvp" preset="unfold" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="fairy-sec fairy-contact">
          <p className="fairy-label">{t(party.kids ? "bday.contact.parents" : "bday.contact.host")}</p>
          {party.host && <p className="fairy-host">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="fairy-end">
        <ScrollReveal as="p" className="fairy-ever" preset="blur" duration={1.6}>
          {t("fairy.ever")}
        </ScrollReveal>
        <p className="fairy-end-mark">✦</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
