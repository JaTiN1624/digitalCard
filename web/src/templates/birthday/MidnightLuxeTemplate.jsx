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
import { CelebrateButton, ContactButtons } from "../../components/invitation/sections/BirthdaySections.jsx";
import { initialOf } from "../../utils/format.js";
import "./midnight-luxe.css";

// Midnight Luxe — adult birthdays. Black and champagne gold, editorial serif type.
// The cover is a dark stage where a spotlight searches for the name, then floods the screen.
// The page reads like a printed evening programme: a menu-style running order with dotted
// leaders, side-by-side attire and address cards, a gold-ruled countdown and a toast.
const FONT = "Playfair+Display:ital,wght@0,400;0,600;1,400";

function Spotlight({ opening, display, date, t }) {
  return (
    <div className="luxe-stage">
      <p className="luxe-stage-kicker">{t("luxe.private")}</p>
      <p className="luxe-stage-name">{display}</p>
      {date && <p className="luxe-stage-date">{date}</p>}
      <motion.span
        className="luxe-beam"
        aria-hidden="true"
        animate={opening ? { scale: 9, opacity: 1 } : { scale: 1 }}
        transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
      />
    </div>
  );
}

export default function MidnightLuxeTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="luxe"
      confetti={["#d9b56a", "#f3dfa8", "#ffffff", "#8c6d32"]}
      decoration={<Particles kinds={["gold", "sparkle"]} count={16} seed={23} />}
      cover={{ variant: "spotlight", object: Spotlight, duration: 1.5, heading: false, prompt: "luxe.prompt" }}
    >
      {(party) => <LuxePage {...props} party={party} />}
    </BirthdayStage>
  );
}

function LuxePage({ invitation, preview, party }) {
  const { t, vars, stage, age, date } = party;

  return (
    <>
      <header className="luxe-hero">
        {age && party.show("age") && (
          <motion.span
            className="luxe-age"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            {age}
          </motion.span>
        )}
        <motion.p className="luxe-honour" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}>
          {t("luxe.honour")}
        </motion.p>
        <NameReveal className="luxe-name" fallback={party.name} delay={0.7} shimmer />
        <motion.span className="luxe-rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
        <motion.p className="luxe-occasion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}>
          {t(`bday.tagline.${stage}`, vars)}
        </motion.p>
        {date && (
          <motion.p className="luxe-dateline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 1 }}>
            <span>{date.weekday}</span>
            <span>
              {date.day} {date.month} {date.year}
            </span>
            <span>{date.time}</span>
          </motion.p>
        )}
      </header>

      {party.photo && <CinematicImage className="luxe-photo" src={party.photo} alt={party.name} parallax={30} />}

      {party.message && (
        <section className="luxe-sec luxe-quote">
          <ScrollReveal as="blockquote" className="luxe-message" preset="blur" duration={1.4}>
            {party.message}
          </ScrollReveal>
          {party.host && <p className="luxe-host">— {party.host}</p>}
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="luxe-sec">
          <div className="luxe-programme">
            <h2 className="luxe-title">{t("luxe.evening")}</h2>
            <Stagger as="ol" className="luxe-menu" step={0.15}>
              {party.events.map((e) => (
                <StaggerItem as="li" key={e.key} preset="blur" className="luxe-menu-row">
                  <span className="luxe-menu-name">{e.name}</span>
                  <span className="luxe-leader" aria-hidden="true" />
                  <span className="luxe-menu-time">{e.time}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {date && (
        <section className="luxe-sec luxe-when">
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={party.language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {(party.dressCode || party.venue) && (
        <section className="luxe-sec luxe-pair">
          {party.dressCode && party.show("dressCode") && (
            <ScrollReveal className="luxe-card" preset="left">
              <p className="luxe-label">{t("luxe.attire")}</p>
              <p className="luxe-card-text">{party.dressCode}</p>
            </ScrollReveal>
          )}
          {party.venue && party.show("venue") && (
            <ScrollReveal className="luxe-card" preset="right">
              <p className="luxe-label">{t("luxe.address")}</p>
              <p className="luxe-card-text">{party.venue}</p>
              {party.address && <p className="luxe-card-sub">{party.address}</p>}
            </ScrollReveal>
          )}
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="luxe-sec luxe-map-sec">
          <MapEmbed party={party} t={t} className="party-map luxe-map" />
          <DirectionsButtons party={party} t={t} />
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="luxe-sec luxe-rsvp" id="rsvp">
          <h2 className="luxe-title">{t("luxe.respond")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="luxe-rsvp-card" preset="blur" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="luxe-sec luxe-toast">
          <CelebrateButton t={t} label={t("luxe.toast")} className="luxe-toast-btn" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="luxe-sec luxe-contact">
          <p className="luxe-label">{t("bday.contact.host")}</p>
          {party.host && <p className="luxe-card-text">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="luxe-foot">
        <span className="luxe-monogram">{initialOf(party.name)}</span>
        <ScrollReveal as="p" className="luxe-thanks" preset="blur">
          {t("bday.thanks.text")}
        </ScrollReveal>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
