import { motion } from "motion/react";
import BirthdayStage from "../../components/invitation/birthday/BirthdayStage.jsx";
import { DirectionsButtons, MapEmbed, Parallax } from "../../components/invitation/birthday/PartyBits.jsx";
import { useGoogleFont } from "../../components/invitation/birthday/useGoogleFont.js";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { ScrollReveal, Stagger, StaggerItem, CinematicImage } from "../../components/invitation/motion/ScrollReveal.jsx";
import Countdown from "../../components/invitation/Countdown.jsx";
import GallerySection from "../../components/invitation/sections/GallerySection.jsx";
import { CalendarButtons } from "../../components/invitation/sections/SaveTheDate.jsx";
import { RsvpCard, ShareButtons } from "../../components/invitation/sections/ClosingSections.jsx";
import { CelebrateButton, ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { Elephant, Frond, Giraffe, Lion, Monstera, Paw } from "../../components/invitation/art/SceneArt.jsx";
import { formatNumber } from "../../utils/format.js";
import "./jungle-safari.css";

// Jungle Safari — children's birthdays. Big leaves part on the cover and a lion peeks out;
// the hero is a layered jungle (back fronds, animals walking in, front leaves) with the name
// on a hanging wooden sign. The schedule is a sideways safari trail of signposts the guest
// swipes through, the date sits on a camp board and the venue is "base camp".
const FONT = "Lilita+One";

function LeafCurtain({ opening }) {
  const part = (dir) => ({ x: opening ? `${dir * 130}%` : "0%", rotate: opening ? dir * 25 : 0 });
  const ease = { duration: 1.2, ease: [0.65, 0, 0.35, 1] };
  return (
    <div className="safari-curtain">
      <motion.div className="safari-peek" animate={opening ? { y: -30, scale: 1.15 } : { y: [6, 0, 6] }} transition={opening ? ease : { duration: 3, repeat: Infinity }}>
        <Lion />
      </motion.div>
      <motion.div className="safari-leaf l1" animate={part(-1)} transition={ease}>
        <Monstera />
      </motion.div>
      <motion.div className="safari-leaf l2" animate={part(1)} transition={ease}>
        <Monstera />
      </motion.div>
      <motion.div className="safari-leaf l3" animate={part(-1)} transition={{ ...ease, delay: 0.1 }}>
        <Frond />
      </motion.div>
      <motion.div className="safari-leaf l4" animate={part(1)} transition={{ ...ease, delay: 0.1 }}>
        <Frond />
      </motion.div>
    </div>
  );
}

export default function JungleSafariTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="safari"
      confetti={["#f2b84b", "#2f8f5b", "#c8661f", "#8fd3a8", "#fff3c4"]}
      decoration={<Particles kinds={["leaf", "butterfly"]} count={10} seed={52} />}
      cover={{ variant: "safari", object: LeafCurtain, duration: 1.4, prompt: "safari.prompt" }}
    >
      {(party) => <SafariPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function SafariPage({ invitation, preview, party }) {
  const { t, vars, stage, age, date, language } = party;

  return (
    <>
      <header className="safari-hero">
        <Parallax speed={30} className="safari-back">
          <Frond className="sb sb-1" />
          <Frond className="sb sb-2" />
          <Frond className="sb sb-3" />
        </Parallax>

        <p className="safari-kicker">{t("safari.welcome")}</p>
        <motion.div className="safari-sign" initial={{ y: -200, rotate: -8 }} animate={{ y: 0, rotate: [-8, 4, -2, 0] }} transition={{ delay: 0.3, duration: 1.6, ease: "easeOut" }}>
          <span className="safari-rope" aria-hidden="true" />
          <h1 className="safari-name">{party.name}</h1>
          <p className="safari-line">{t(`bday.line.${stage}`, vars)}</p>
        </motion.div>

        {age && party.show("age") && (
          <motion.span className="safari-medal" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1.6, type: "spring", stiffness: 160, damping: 12 }}>
            {formatNumber(age, language)}
          </motion.span>
        )}

        <div className="safari-animals" aria-hidden="true">
          <motion.div className="safari-giraffe" initial={{ x: "-120%" }} animate={{ x: 0 }} transition={{ delay: 0.8, duration: 1.6, ease: "easeOut" }}>
            <Giraffe />
          </motion.div>
          <motion.div className="safari-elephant" initial={{ x: "130%" }} animate={{ x: 0 }} transition={{ delay: 1.1, duration: 1.8, ease: "easeOut" }}>
            <Elephant />
          </motion.div>
        </div>
        <Parallax speed={-40} className="safari-front">
          <Monstera className="sf sf-1" />
          <Monstera className="sf sf-2" />
        </Parallax>
      </header>

      {(party.message || party.photo) && (
        <section className="safari-sec">
          <ScrollReveal className="safari-note" preset="rise">
            {party.photo && <CinematicImage className="safari-photo" src={party.photo} alt={party.name} parallax={12} reveal="zoom" />}
            <span className="safari-stamp" aria-hidden="true">
              <Paw />
            </span>
            {party.message && <p className="safari-message">{party.message}</p>}
            {party.host && <p className="safari-host">{t("bday.hostedBy", vars)}</p>}
          </ScrollReveal>
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="safari-sec safari-trail-sec">
          <h2 className="safari-title">{t("safari.trail")}</h2>
          <Stagger as="ol" className="safari-trail" step={0.15}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="rise" className="safari-post">
                <span className="safari-post-stop">{t("safari.stop", { n: formatNumber(e.index + 1, language) })}</span>
                <span className="safari-post-name">{e.name}</span>
                <span className="safari-post-time">{e.time}</span>
                <Paw className="safari-post-paw" />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {date && (
        <section className="safari-sec">
          <ScrollReveal className="safari-board" preset="zoom">
            <span className="safari-board-day">{date.weekday}</span>
            <span className="safari-board-date">
              {date.day} {date.month}
            </span>
            <span className="safari-board-time">
              {date.time}
              {date.endTime && ` – ${date.endTime}`}
            </span>
          </ScrollReveal>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.show("cake") && (
        <section className="safari-sec">
          <h2 className="safari-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="safari-sec">
          <h2 className="safari-title">{t("safari.camp")}</h2>
          <ScrollReveal className="safari-camp" preset="rise">
            <p className="safari-venue">{party.venue}</p>
            {party.address && <p className="safari-address">{party.address}</p>}
            {party.dressCode && party.show("dressCode") && (
              <p className="safari-dress">
                <b>{t("bday.dressCode.title")}:</b> {party.dressCode}
              </p>
            )}
            <MapEmbed party={party} t={t} className="party-map safari-map" />
            <DirectionsButtons party={party} t={t} />
          </ScrollReveal>
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="safari-sec" id="rsvp">
          <h2 className="safari-title">{t("safari.join")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="safari-rsvp" preset="rise" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="safari-sec">
          <CelebrateButton t={t} label={t("safari.roar")} className="safari-roar" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="safari-sec">
          <p className="safari-label">{t(party.kids ? "bday.contact.parents" : "bday.contact.host")}</p>
          {party.host && <p className="safari-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="safari-foot">
        <p className="safari-thanks">{t("bday.thanks.text")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
        <div className="safari-silhouettes" aria-hidden="true">
          <Giraffe />
          <Lion />
          <Elephant />
        </div>
      </footer>
    </>
  );
}
