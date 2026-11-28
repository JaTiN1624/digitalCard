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
import { CelebrateButton, ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { Planet, Rocket } from "../../components/invitation/art/BirthdayArt.jsx";
import { Astronaut, Moon } from "../../components/invitation/art/SceneArt.jsx";
import { formatNumber } from "../../utils/format.js";
import "./cosmic-adventure.css";

// Cosmic Adventure — space-loving kids. Tap the launch pad: 3 · 2 · 1 and the rocket lifts off.
// The hero is a little solar system orbiting the name, with an astronaut drifting by. Then an
// incoming transmission (the message), a mission timeline along a rocket trail, the venue seen
// through a porthole, and "join the crew".
const FONT = "Exo+2:wght@400;600";

function LaunchPad({ opening, invitation }) {
  const digits = [3, 2, 1].map((n) => formatNumber(n, invitation.language));
  return (
    <div className="cosmic-pad">
      <div className="cosmic-count" aria-hidden="true">
        {opening &&
          digits.map((d, i) => (
            <motion.span key={d} initial={{ opacity: 0, scale: 2 }} animate={{ opacity: [0, 1, 0], scale: [2, 1, 0.6] }} transition={{ delay: i * 0.4, duration: 0.4 }}>
              {d}
            </motion.span>
          ))}
      </div>
      <motion.div
        className="cosmic-rocket"
        animate={opening ? { y: [0, 4, -4, 0, -900] } : { y: [0, -6, 0] }}
        transition={opening ? { duration: 2.2, times: [0, 0.2, 0.4, 0.55, 1], ease: "easeIn" } : { duration: 2.4, repeat: Infinity }}
      >
        <Rocket />
        <span className={`cosmic-exhaust ${opening ? "is-on" : ""}`} />
      </motion.div>
      <div className="cosmic-tower" />
      <div className="cosmic-ground" />
    </div>
  );
}

export default function CosmicAdventureTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="cosmic"
      confetti={["#7c5cff", "#00d1ff", "#ffd27a", "#ff6b8b", "#ffffff"]}
      decoration={<Particles kinds={["star", "sparkle", "star"]} count={22} seed={9} />}
      cover={{ variant: "launch", object: LaunchPad, duration: 2.2, prompt: "cosmic.prompt" }}
    >
      {(party) => <CosmicPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function CosmicPage({ invitation, preview, party }) {
  const { t, vars, stage, age, date, language } = party;

  return (
    <>
      <header className="cosmic-hero">
        <p className="cosmic-kicker">{t("cosmic.mission")}</p>
        <div className="cosmic-system">
          <div className="cosmic-orbit o1">
            <span className="cosmic-moonlet" />
          </div>
          <div className="cosmic-orbit o2">
            <Planet className="cosmic-planet" />
          </div>
          <div className="cosmic-orbit o3">
            <span className="cosmic-moonlet m2" />
          </div>
          <div className="cosmic-core">
            <NameReveal className="cosmic-name" fallback={party.name} delay={0.4} shimmer />
            {age && party.show("age") && <p className="cosmic-orbit-label">{t("cosmic.orbit", { age: formatNumber(age, language) })}</p>}
          </div>
        </div>
        <motion.p className="cosmic-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          {t(`bday.tagline.${stage}`, vars)}
        </motion.p>
        <Parallax speed={80} className="cosmic-astro-layer">
          <Astronaut className="cosmic-astronaut" />
        </Parallax>
      </header>

      {(party.message || party.photo) && (
        <section className="cosmic-sec">
          <ScrollReveal className="cosmic-transmission" preset="blur">
            <p className="cosmic-tx-head">
              <span className="cosmic-dot" /> {party.host || t("cosmic.mission")}
            </p>
            {party.photo && <CinematicImage className="cosmic-photo" src={party.photo} alt={party.name} parallax={10} />}
            {party.message && <p className="cosmic-tx-body">{party.message}</p>}
          </ScrollReveal>
        </section>
      )}

      {date && (
        <section className="cosmic-sec">
          <h2 className="cosmic-title">{t("cosmic.liftoff")}</h2>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <p className="cosmic-date">
            {date.weekday} · {date.day} {date.month} {date.year} · {date.time}
          </p>
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="cosmic-sec">
          <h2 className="cosmic-title">{t("cosmic.timeline")}</h2>
          <Stagger as="ol" className="cosmic-timeline" step={0.18}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="left" className="cosmic-step">
                <span className="cosmic-step-dot" aria-hidden="true" />
                <span className="cosmic-step-time">{e.time}</span>
                <span className="cosmic-step-name">{e.name}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {party.show("cake") && (
        <section className="cosmic-sec">
          <h2 className="cosmic-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="cosmic-sec">
          <h2 className="cosmic-title">{t("cosmic.pad")}</h2>
          <ScrollReveal preset="zoom">
            <MapEmbed party={party} t={t} className="party-map cosmic-porthole" />
          </ScrollReveal>
          <p className="cosmic-venue">{party.venue}</p>
          {party.address && <p className="cosmic-address">{party.address}</p>}
          {party.dressCode && party.show("dressCode") && (
            <p className="cosmic-address">
              {t("bday.dressCode.title")}: {party.dressCode}
            </p>
          )}
          <DirectionsButtons party={party} t={t} />
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="cosmic-sec" id="rsvp">
          <h2 className="cosmic-title">{t("cosmic.crew")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="cosmic-panel" preset="blur" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="cosmic-sec">
          <CelebrateButton t={t} label={t("cosmic.blast")} className="cosmic-blast" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="cosmic-sec">
          <p className="cosmic-kicker">{t(party.kids ? "bday.contact.parents" : "bday.contact.host")}</p>
          {party.host && <p className="cosmic-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="cosmic-foot">
        <Moon className="cosmic-moon" />
        <p className="cosmic-thanks">{t("bday.thanks.text")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
