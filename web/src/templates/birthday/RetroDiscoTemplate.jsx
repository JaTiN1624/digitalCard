import { motion } from "motion/react";
import BirthdayStage from "../../components/invitation/birthday/BirthdayStage.jsx";
import { DirectionsButtons, MapEmbed } from "../../components/invitation/birthday/PartyBits.jsx";
import { useGoogleFont } from "../../components/invitation/birthday/useGoogleFont.js";
import { ScrollReveal, Stagger, StaggerItem, CinematicImage } from "../../components/invitation/motion/ScrollReveal.jsx";
import Countdown from "../../components/invitation/Countdown.jsx";
import GallerySection from "../../components/invitation/sections/GallerySection.jsx";
import { CalendarButtons } from "../../components/invitation/sections/SaveTheDate.jsx";
import { RsvpCard, ShareButtons } from "../../components/invitation/sections/ClosingSections.jsx";
import { CelebrateButton, ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { DiscoBall, Vinyl } from "../../components/invitation/art/SceneArt.jsx";
import { formatNumber } from "../../utils/format.js";
import "./retro-disco.css";

// Retro Disco — teens and adults. A disco ball drops into sweeping light beams on the cover.
// The hero is an 80s synthwave horizon: striped sun, a moving neon grid floor, chrome lettering.
// The schedule is a record sleeve tracklist next to a spinning vinyl, the date is a flickering
// neon sign and the venue sits above a light-up dance floor.
const FONT = ["Monoton", "Righteous"];

function DiscoDrop({ opening, display }) {
  return (
    <div className={`disco-cover ${opening ? "is-on" : ""}`}>
      <div className="disco-beams" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>
      <motion.div className="disco-drop" initial={{ y: -260 }} animate={{ y: 0, rotate: opening ? 360 : 0 }} transition={{ y: { type: "spring", stiffness: 60, damping: 9, delay: 0.3 }, rotate: { duration: 1.4 } }}>
        <DiscoBall />
      </motion.div>
      <p className="disco-cover-name">{display}</p>
    </div>
  );
}

export default function RetroDiscoTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="disco"
      confetti={["#ff4fa3", "#00e5ff", "#ffd23f", "#b84dff", "#ffffff"]}
      cover={{ variant: "disco", object: DiscoDrop, duration: 1.5, heading: false, prompt: "disco.prompt" }}
    >
      {(party) => <DiscoPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function DiscoPage({ invitation, preview, party }) {
  const { t, vars, stage, age, date, language } = party;

  return (
    <>
      <header className="disco-hero">
        <div className="disco-ball-hang" aria-hidden="true">
          <DiscoBall />
        </div>
        <motion.p className="disco-kicker" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.3, 1] }} transition={{ delay: 0.3, duration: 1 }}>
          {t("disco.tonight")}
        </motion.p>
        <motion.h1 className="disco-name" initial={{ opacity: 0, y: 30, skewX: -12 }} animate={{ opacity: 1, y: 0, skewX: -8 }} transition={{ delay: 0.5, duration: 0.9, ease: "backOut" }}>
          {party.name}
        </motion.h1>
        <motion.p className="disco-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          {age && party.show("age") ? t(`bday.line.${stage}`, vars) : t(`bday.tagline.${stage}`, vars)}
        </motion.p>
        <div className="disco-sun" aria-hidden="true" />
        <div className="disco-grid" aria-hidden="true" />
      </header>

      {party.message && (
        <section className="disco-sec">
          <ScrollReveal className="disco-quote" preset="zoom">
            <p>{party.message}</p>
            {party.host && <p className="disco-host">— {party.host}</p>}
          </ScrollReveal>
        </section>
      )}

      {party.photo && <CinematicImage className="disco-photo" src={party.photo} alt={party.name} parallax={20} />}

      {date && (
        <section className="disco-sec">
          <ScrollReveal className="disco-sign" preset="blur">
            <span className="disco-sign-day">{date.weekday}</span>
            <span className="disco-sign-date">
              {date.day} {date.monthShort}
            </span>
            <span className="disco-sign-time">
              {date.time}
              {date.endTime && ` – ${date.endTime}`}
            </span>
          </ScrollReveal>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="disco-sec">
          <div className="disco-sleeve">
            <Vinyl className="disco-vinyl" />
            <div className="disco-sleeve-card">
              <p className="disco-side">{t("disco.side")}</p>
              <h2 className="disco-title">{t("disco.tracklist")}</h2>
              <Stagger as="ol" className="disco-tracks" step={0.12}>
                {party.events.map((e) => (
                  <StaggerItem as="li" key={e.key} preset="right" className="disco-track">
                    <span className="disco-track-no">{formatNumber(e.index + 1, language).padStart(2, formatNumber(0, language))}</span>
                    <span className="disco-track-name">{e.name}</span>
                    <span className="disco-track-time">{e.time}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>
      )}

      {party.show("cake") && (
        <section className="disco-sec">
          <h2 className="disco-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="disco-sec">
          <h2 className="disco-title">{t("disco.floor")}</h2>
          <p className="disco-venue">{party.venue}</p>
          {party.address && <p className="disco-address">{party.address}</p>}
          {party.dressCode && party.show("dressCode") && (
            <p className="disco-dress">
              {t("bday.dressCode.title")}: {party.dressCode}
            </p>
          )}
          <div className="disco-floor" aria-hidden="true">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} style={{ "--i": (i * 7) % 11 }} />
            ))}
          </div>
          <MapEmbed party={party} t={t} className="party-map disco-map" />
          <DirectionsButtons party={party} t={t} />
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="disco-sec" id="rsvp">
          <h2 className="disco-title">{t("disco.list")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="disco-panel" preset="zoom" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="disco-sec">
          <CelebrateButton t={t} label={t("disco.dance")} className="disco-dance" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="disco-sec">
          <p className="disco-side">{t("bday.contact.host")}</p>
          {party.host && <p className="disco-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="disco-foot">
        <p className="disco-thanks">{t("bday.thanks.text")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
