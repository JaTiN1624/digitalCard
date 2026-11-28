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
import { FunctionIcon } from "../../components/invitation/art/Motifs.jsx";
import { Balloon, Bow, CloudArt, Star, Teddy } from "../../components/invitation/art/BirthdayArt.jsx";
import { Moon } from "../../components/invitation/art/SceneArt.jsx";
import "./little-dreamer.css";

// Little Dreamer — first birthdays and toddlers. A soft pastel sky the guest scrolls down
// through: clouds drift at three depths, a teddy sits on a puffy age number, the schedule floats
// along a balloon string and the page ends under a sleepy moon.
const FONT = "Fredoka:wght@400;500;600";

export default function LittleDreamerTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="dream"
      confetti={["#ffb3c7", "#a8d8ff", "#ffe29a", "#c7f0d8", "#ffffff"]}
      decoration={<Particles kinds={["bokeh", "star", "bokeh"]} count={10} seed={11} />}
      cover={{ variant: "giftbox", emblem: <Bow />, prompt: "dream.prompt" }}
    >
      {(party) => <DreamPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function DreamPage({ invitation, preview, party }) {
  const { t, vars, stage, age } = party;

  return (
    <>
      <header className="dream-sky">
        <Parallax speed={90} className="dream-layer dream-far">
          <CloudArt className="dc dc-1" />
          <CloudArt className="dc dc-2" />
        </Parallax>
        <Parallax speed={45} className="dream-layer dream-mid">
          <CloudArt className="dc dc-3" />
          <Star className="dream-star s1" />
          <Star className="dream-star s2" />
        </Parallax>

        <motion.p className="dream-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          {t(`bday.kicker.${stage}`, vars)}
        </motion.p>

        <div className="dream-hero">
          {age && party.show("age") && (
            <motion.span
              className="dream-age"
              aria-hidden="true"
              initial={{ scale: 0.4, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 12 }}
            >
              {age}
            </motion.span>
          )}
          <motion.div className="dream-teddy" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9, duration: 1, ease: "backOut" }}>
            <Teddy />
          </motion.div>
          <div className="dream-balloons" aria-hidden="true">
            <Balloon className="db db-1" />
            <Balloon className="db db-2" color="var(--balloon-2)" />
            <Balloon className="db db-3" color="var(--balloon-3)" />
          </div>
          <CloudArt className="dream-seat" />
        </div>

        <div className="dream-banner">
          <NameReveal className="dream-name" fallback={party.name} delay={1.2} />
        </div>
        <motion.p className="dream-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          {t(`bday.line.${stage}`, vars)} · {t(`bday.tagline.${stage}`, vars)}
        </motion.p>
        {party.host && <p className="dream-host">{t("bday.hostedBy", vars)}</p>}
      </header>

      {(party.message || party.photo) && (
        <section className="dream-sec dream-note">
          {party.photo && <CinematicImage className="dream-photo" src={party.photo} alt={party.name} parallax={16} reveal="zoom" />}
          {party.message && (
            <ScrollReveal className="dream-letter" preset="zoom">
              <p className="dream-eyebrow">{t("dream.note")}</p>
              <p className="dream-message">{party.message}</p>
            </ScrollReveal>
          )}
        </section>
      )}

      {party.date && (
        <section className="dream-sec dream-when">
          <ScrollReveal className="dream-date" preset="rise">
            <span className="dream-weekday">{party.date.weekday}</span>
            <span className="dream-daynum">{party.date.day}</span>
            <span className="dream-month">
              {party.date.month} {party.date.year}
            </span>
            <span className="dream-time">
              {party.date.time}
              {party.date.endTime && ` – ${party.date.endTime}`}
            </span>
          </ScrollReveal>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={party.language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="dream-sec dream-plan">
          <h2 className="dream-title">{t("dream.day")}</h2>
          <Stagger as="ol" className="dream-string" step={0.18}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset={e.index % 2 ? "right" : "left"} className="dream-bubble">
                <FunctionIcon kind={e.kind === "celebration" ? "balloon" : e.kind} className="dream-icon" />
                <span className="dream-bubble-time">{e.time}</span>
                <span className="dream-bubble-name">{e.name}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {party.show("cake") && (
        <section className="dream-sec dream-cake">
          <h2 className="dream-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="dream-sec dream-venue">
          <ScrollReveal className="dream-card" preset="rise">
            <p className="dream-eyebrow">{t("dream.where")}</p>
            <h3 className="dream-venue-name">{party.venue}</h3>
            {party.address && <p className="dream-address">{party.address}</p>}
            <MapEmbed party={party} t={t} className="party-map dream-map" />
            <DirectionsButtons party={party} t={t} />
          </ScrollReveal>
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="dream-sec dream-rsvp" id="rsvp">
          <h2 className="dream-title">{t("dream.wish")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="dream-card dream-rsvp-card" preset="zoom" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="dream-sec dream-contact">
          <p className="dream-eyebrow">{t(party.kids ? "bday.contact.parents" : "bday.contact.host")}</p>
          {party.host && <p className="dream-contact-host">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="dream-night">
        <Moon className="dream-moon" />
        <Star className="dream-star n1" />
        <Star className="dream-star n2" />
        <Star className="dream-star n3" />
        <ScrollReveal as="p" className="dream-thanks" preset="blur">
          {t("bday.thanks.text")}
        </ScrollReveal>
        <p className="dream-sign">{party.name}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
