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
import { ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { Bloom, Sprig } from "../../components/invitation/art/SceneArt.jsx";
import "./enchanted-garden.css";

// Enchanted Garden — elegant family celebrations. A closed bud on the cover blooms open when
// tapped. The page is framed by a watercolour floral arch; the schedule is a set of pressed-
// flower cards, the date sits inside a leafy wreath and soft colour washes sit behind the text.
const FONT = "Italiana";
const WREATH = Array.from({ length: 10 }, (_, i) => i * 36);

function Bud({ opening }) {
  return (
    <div className="garden-bud">
      <motion.div
        className="garden-bud-flower"
        initial={{ scale: 0.55, rotate: -30 }}
        animate={opening ? { scale: 6, rotate: 40, opacity: [1, 1, 0] } : { scale: [0.55, 0.6, 0.55], rotate: -30 }}
        transition={opening ? { duration: 1.6, ease: [0.65, 0, 0.35, 1] } : { duration: 3, repeat: Infinity }}
      >
        <Bloom petals={10} />
      </motion.div>
      <Sprig className="garden-bud-stem" />
    </div>
  );
}

const ArchBloom = ({ className, delay, petals = 8 }) => (
  <motion.div className={`garden-ab ${className}`} initial={{ scale: 0, rotate: -60 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
    <Bloom petals={petals} />
  </motion.div>
);

export default function EnchantedGardenTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="garden"
      confetti={["#f3b6c3", "#e98aa0", "#9cc19a", "#f7d27c", "#ffffff"]}
      decoration={<Particles kinds={["petal", "butterfly", "petal"]} count={12} seed={33} />}
      cover={{ variant: "bloom", object: Bud, duration: 1.6, prompt: "garden.prompt" }}
    >
      {(party) => <GardenPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function GardenPage({ invitation, preview, party }) {
  const { t, vars, stage, date, language } = party;

  return (
    <>
      <header className="garden-hero">
        <div className="garden-arch">
          <ArchBloom className="ab-1" delay={0.2} />
          <ArchBloom className="ab-2" delay={0.5} petals={6} />
          <ArchBloom className="ab-3" delay={0.4} petals={10} />
          <ArchBloom className="ab-4" delay={0.7} />
          <ArchBloom className="ab-5" delay={0.9} petals={6} />
          <Sprig className="garden-sprig gs-1" />
          <Sprig className="garden-sprig gs-2" />
          <div className="garden-arch-inner">
            <motion.p className="garden-join" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.2 }}>
              {t("garden.join")}
            </motion.p>
            <NameReveal className="garden-name" fallback={party.name} delay={1.3} />
            <motion.p className="garden-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
              {t(`bday.tagline.${stage}`, vars)}
            </motion.p>
            {date && (
              <motion.p className="garden-date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3, duration: 1 }}>
                {date.weekday}, {date.day} {date.month} {date.year}
              </motion.p>
            )}
          </div>
        </div>
      </header>

      {party.photo && <CinematicImage className="garden-photo" src={party.photo} alt={party.name} parallax={16} reveal="zoom" />}

      {party.message && (
        <section className="garden-sec">
          <ScrollReveal className="garden-wash" preset="blur" duration={1.4}>
            <Sprig className="garden-wash-sprig left" />
            <p className="garden-message">{party.message}</p>
            <Sprig className="garden-wash-sprig right" />
            {party.host && <p className="garden-host">{t("bday.hostedBy", vars)}</p>}
          </ScrollReveal>
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="garden-sec">
          <h2 className="garden-title">{t("garden.afternoon")}</h2>
          <Stagger as="ol" className="garden-pressed" step={0.15}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="zoom" className="garden-card">
                <Bloom className="garden-card-bloom" petals={5 + (e.index % 4)} />
                <span className="garden-card-time">{e.time}</span>
                <span className="garden-card-name">{e.name}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {date && (
        <section className="garden-sec">
          <ScrollReveal className="garden-wreath" preset="zoom">
            {WREATH.map((deg) => (
              <Sprig key={deg} className="garden-wreath-leaf" style={{ "--r": `${deg}deg` }} />
            ))}
            <span className="garden-wreath-day">{date.day}</span>
            <span className="garden-wreath-month">{date.month}</span>
            <span className="garden-wreath-time">
              {date.time}
              {date.endTime && ` – ${date.endTime}`}
            </span>
          </ScrollReveal>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.show("cake") && (
        <section className="garden-sec">
          <h2 className="garden-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="garden-sec">
          <h2 className="garden-title">{t("venue.title")}</h2>
          <ScrollReveal className="garden-venue-card" preset="rise">
            <p className="garden-venue">{party.venue}</p>
            {party.address && <p className="garden-address">{party.address}</p>}
            {party.dressCode && party.show("dressCode") && (
              <p className="garden-dress">
                <em>{t("bday.dressCode.title")}</em> — {party.dressCode}
              </p>
            )}
            <MapEmbed party={party} t={t} className="party-map garden-map" />
            <DirectionsButtons party={party} t={t} />
          </ScrollReveal>
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="garden-sec" id="rsvp">
          <h2 className="garden-title">{t("garden.reply")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="garden-rsvp" preset="blur" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="garden-sec">
          <p className="garden-host">{t(party.kids ? "bday.contact.parents" : "bday.contact.host")}</p>
          {party.host && <p className="garden-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="garden-foot">
        <div className="garden-foot-blooms" aria-hidden="true">
          <Bloom petals={6} />
          <Bloom petals={10} />
          <Bloom petals={8} />
        </div>
        <ScrollReveal as="p" className="garden-thanks" preset="blur">
          {t("bday.thanks.text")}
        </ScrollReveal>
        <p className="garden-sign">{party.name}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
