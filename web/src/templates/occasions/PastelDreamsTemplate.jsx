import { motion } from "motion/react";
import BirthdayStage from "../../components/invitation/birthday/BirthdayStage.jsx";
import { DirectionsButtons, MapEmbed } from "../../components/invitation/birthday/PartyBits.jsx";
import { useGoogleFont } from "../../components/invitation/birthday/useGoogleFont.js";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { ScrollReveal, Stagger, StaggerItem, CinematicImage } from "../../components/invitation/motion/ScrollReveal.jsx";
import Countdown from "../../components/invitation/Countdown.jsx";
import GallerySection from "../../components/invitation/sections/GallerySection.jsx";
import { CalendarButtons } from "../../components/invitation/sections/SaveTheDate.jsx";
import { RsvpCard, ShareButtons } from "../../components/invitation/sections/ClosingSections.jsx";
import { CelebrateButton, ContactButtons } from "../../components/invitation/sections/BirthdaySections.jsx";
import { CloudArt, Star } from "../../components/invitation/art/BirthdayArt.jsx";
import { Moon } from "../../components/invitation/art/SceneArt.jsx";
import "./pastel-dreams.css";

// Pastel Dreams — baby showers. A cot mobile (moon, stars, clouds) sways on the cover and
// floats away when tapped. The page is soft watercolour pastels with rounded serif type:
// "Oh, baby!", the mother-to-be's name under a row of hanging stars, a scalloped note, the
// date/time/place as three soft bubbles, and wishes for the little one.
const FONT = "Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400";
const HANGERS = [
  { el: "moon", x: 50, len: 70 },
  { el: "star", x: 22, len: 46 },
  { el: "cloud", x: 78, len: 54 },
  { el: "star", x: 36, len: 96 },
  { el: "star", x: 64, len: 88 },
];

function Mobile({ opening }) {
  return (
    <motion.div className="pd-mobile" animate={opening ? { y: -520, rotate: 6 } : { rotate: [-3, 3, -3] }} transition={opening ? { duration: 1.5, ease: [0.65, 0, 0.35, 1] } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <span className="pd-mobile-bar" />
      {HANGERS.map((h, i) => (
        <span key={i} className={`pd-hanger pd-${h.el}`} style={{ left: `${h.x}%`, "--len": `${h.len}px`, "--d": `${i * 0.4}s` }}>
          <span className="pd-string" />
          {h.el === "moon" ? <Moon /> : h.el === "cloud" ? <CloudArt /> : <Star />}
        </span>
      ))}
    </motion.div>
  );
}

export default function PastelDreamsTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="pd"
      wording="baby"
      confetti={["#f6c1cc", "#bfe3d6", "#cdbdf2", "#ffe3a8", "#ffffff"]}
      decoration={<Particles kinds={["bokeh", "star"]} count={9} seed={19} />}
      cover={{ variant: "mobile", object: Mobile, duration: 1.5, prompt: "baby.prompt" }}
    >
      {(party) => <PastelPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function PastelPage({ invitation, preview, party }) {
  const { t, date, language } = party;
  const mother = invitation.config.celebrant;

  return (
    <>
      <header className="pd-hero">
        <div className="pd-stars" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="pd-hang" style={{ "--len": `${[40, 80, 56, 90, 46][i]}px`, "--d": `${i * 0.5}s` }}>
              <Star />
            </span>
          ))}
        </div>
        <motion.p className="pd-oh" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 12 }}>
          {t("baby.oh")}
        </motion.p>
        <motion.p className="pd-for" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}>
          {t("occasion.title.BABY_SHOWER")}
        </motion.p>
        {mother && (
          <motion.h1 className="pd-name" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }}>
            {mother}
          </motion.h1>
        )}
        <motion.p className="pd-way" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
          {t("baby.onTheWay")}
        </motion.p>
        <CloudArt className="pd-cloud c1" />
        <CloudArt className="pd-cloud c2" />
      </header>

      {party.photo && <CinematicImage className="pd-photo" src={party.photo} alt={mother || party.name} parallax={16} reveal="zoom" />}

      {party.message && (
        <section className="pd-sec">
          <ScrollReveal className="pd-note" preset="zoom">
            <p className="pd-message">{party.message}</p>
            {party.host && <p className="pd-host">{t("bday.hostedBy", party.vars)}</p>}
          </ScrollReveal>
        </section>
      )}

      {date && (
        <section className="pd-sec">
          <h2 className="pd-title">{t("baby.details")}</h2>
          <Stagger className="pd-bubbles" step={0.15}>
            <StaggerItem preset="zoom" className="pd-bubble b1">
              <span className="pd-bubble-big">{date.day}</span>
              <span>
                {date.month} {date.year}
              </span>
            </StaggerItem>
            <StaggerItem preset="zoom" className="pd-bubble b2">
              <span>{date.weekday}</span>
              <span className="pd-bubble-mid">{date.time}</span>
            </StaggerItem>
            {party.venue && (
              <StaggerItem preset="zoom" className="pd-bubble b3">
                <span className="pd-bubble-venue">{party.venue}</span>
              </StaggerItem>
            )}
          </Stagger>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="pd-sec">
          <h2 className="pd-title">{t("baby.plan")}</h2>
          <Stagger as="ol" className="pd-plan" step={0.12}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="rise" className="pd-plan-row">
                <span className="pd-plan-time">{e.time}</span>
                <span className="pd-plan-name">{e.name}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="pd-sec">
          <ScrollReveal className="pd-venue-card" preset="rise">
            <p className="pd-venue">{party.venue}</p>
            {party.address && <p className="pd-address">{party.address}</p>}
            {party.dressCode && party.show("dressCode") && (
              <p className="pd-address">
                {t("bday.dressCode.title")}: {party.dressCode}
              </p>
            )}
            <MapEmbed party={party} t={t} className="party-map pd-map" />
            <DirectionsButtons party={party} t={t} />
          </ScrollReveal>
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="pd-sec" id="rsvp">
          <h2 className="pd-title">{t("baby.wish")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="pd-rsvp" preset="zoom" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="pd-sec">
          <CelebrateButton t={t} label={t("baby.shower")} className="pd-shower" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="pd-sec">
          <p className="pd-host">{t("bday.contact.host")}</p>
          {party.host && <p className="pd-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="pd-foot">
        <Moon className="pd-foot-moon" />
        <p className="pd-thanks">{t("baby.thanks.text")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
