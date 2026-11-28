import { motion } from "motion/react";
import BirthdayStage from "../../components/invitation/birthday/BirthdayStage.jsx";
import { DirectionsButtons, MapEmbed } from "../../components/invitation/birthday/PartyBits.jsx";
import { useGoogleFont } from "../../components/invitation/birthday/useGoogleFont.js";
import { ScrollReveal, Stagger, StaggerItem, CinematicImage } from "../../components/invitation/motion/ScrollReveal.jsx";
import Countdown from "../../components/invitation/Countdown.jsx";
import GallerySection from "../../components/invitation/sections/GallerySection.jsx";
import { CalendarButtons } from "../../components/invitation/sections/SaveTheDate.jsx";
import { RsvpCard, ShareButtons } from "../../components/invitation/sections/ClosingSections.jsx";
import { ContactButtons } from "../../components/invitation/sections/BirthdaySections.jsx";
import "./modern-editorial.css";

// Modern Editorial — a magazine. The cover is pure typography ("You are invited" set word by
// word, then split apart). The page is a magazine cover: masthead, issue number = the age, a
// giant name, cover lines; then a numbered details spread, an editor's letter with a pull
// quote, an agenda table and a quiet colophon. No balloons, no confetti rain — just type.
const FONT = "Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400";
const EASE = [0.22, 1, 0.36, 1];

function TypeCover({ opening, t }) {
  const words = t("ed.invited").split(" ");
  return (
    <div className="ed-type">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="ed-type-word"
          initial={{ y: "110%" }}
          animate={opening ? { x: i % 2 ? "120vw" : "-120vw" } : { y: "0%" }}
          transition={opening ? { duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: i * 0.08 } : { delay: 0.3 + i * 0.25, duration: 0.9, ease: EASE }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export default function ModernEditorialTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="ed"
      confetti={["#111111", "#c8b89a", "#ffffff"]}
      cover={{ variant: "type", object: TypeCover, duration: 1.2, prompt: "ed.prompt" }}
    >
      {(party) => <EditorialPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function EditorialPage({ invitation, preview, party }) {
  const { t, vars, stage, age, date, language } = party;
  const details = [
    date && { label: t("ed.when"), value: `${date.weekday}, ${date.day} ${date.month}`, sub: `${date.time}${date.endTime ? ` – ${date.endTime}` : ""}` },
    party.venue && party.show("venue") && { label: t("ed.where"), value: party.venue, sub: party.address },
    party.dressCode && party.show("dressCode") && { label: t("ed.wear"), value: party.dressCode },
  ].filter(Boolean);

  return (
    <>
      <header className="ed-cover">
        <motion.div className="ed-masthead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <span>{t("ed.feature")}</span>
          <span>{age && party.show("age") ? t("ed.issue", vars) : t("ed.special")}</span>
        </motion.div>
        <motion.h1 className="ed-name" initial={{ clipPath: "inset(0% 0% 100% 0%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ delay: 0.3, duration: 1.2, ease: EASE }}>
          {party.name}
        </motion.h1>
        <div className="ed-cover-grid">
          <motion.div className="ed-coverlines" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1, ease: EASE }}>
            <p className="ed-kicker">{t(`bday.kicker.${stage}`, vars)}</p>
            <p className="ed-tagline">{t(`bday.tagline.${stage}`, vars)}</p>
            {date && (
              <p className="ed-cl">
                <b>{date.day}</b> {date.month} {date.year}
              </p>
            )}
            {party.venue && <p className="ed-cl">{party.venue}</p>}
          </motion.div>
          {party.photo ? (
            <CinematicImage className="ed-cover-photo" src={party.photo} alt={party.name} parallax={24} priority />
          ) : (
            age &&
            party.show("age") && (
              <motion.span className="ed-big-age" aria-hidden="true" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2, ease: EASE }}>
                {age}
              </motion.span>
            )
          )}
        </div>
      </header>

      {details.length > 0 && (
        <section className="ed-sec">
          <h2 className="ed-section-label">{t("ed.details")}</h2>
          <Stagger as="ol" className="ed-details" step={0.12}>
            {details.map((d, i) => (
              <StaggerItem as="li" key={d.label} preset="rise" className="ed-detail">
                <span className="ed-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ed-detail-label">{d.label}</span>
                <span className="ed-detail-value">{d.value}</span>
                {d.sub && <span className="ed-detail-sub">{d.sub}</span>}
              </StaggerItem>
            ))}
          </Stagger>
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.message && (
        <section className="ed-sec ed-letter">
          <h2 className="ed-section-label">{t("ed.letter")}</h2>
          <ScrollReveal className="ed-pull" preset="mask" amount={0.1}>
            {party.message}
          </ScrollReveal>
          {party.host && <p className="ed-byline">— {party.host}</p>}
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="ed-sec">
          <h2 className="ed-section-label">{t("ed.agenda")}</h2>
          <Stagger as="ol" className="ed-agenda" step={0.1}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="left" className="ed-row">
                <span className="ed-row-time">{e.time}</span>
                <span className="ed-row-name">{e.name}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {date && party.show("countdown") && (
        <section className="ed-sec ed-count">
          <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="ed-sec ed-map-sec">
          <MapEmbed party={party} t={t} className="party-map ed-map" />
          <DirectionsButtons party={party} t={t} />
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="ed-sec ed-reply" id="rsvp">
          <h2 className="ed-section-label">{t("ed.reply")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="ed-rsvp" preset="rise" />
        </section>
      )}

      <footer className="ed-colophon">
        <p className="ed-colophon-name">{party.name}</p>
        <p className="ed-thanks">{t("bday.thanks.text")}</p>
        {party.hasPhone && party.show("contact") && <ContactButtons invitation={invitation} t={t} />}
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
