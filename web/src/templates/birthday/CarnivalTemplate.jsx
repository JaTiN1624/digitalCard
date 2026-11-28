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
import { CelebrateButton, ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { Tent } from "../../components/invitation/art/SceneArt.jsx";
import "./carnival.css";

// Carnival Celebration — kids' parties. A dark marquee sign whose bulbs switch on one by one
// when tapped. Then a striped big-top canopy and bunting, the name on a lit marquee board,
// a ringmaster's announcement badge, show times as tear-off tickets and the venue at the
// ticket booth.
const FONT = "Bungee";
const BULBS = 22;

// Bulb positions around the edge of the sign: more along the long top and bottom edges
function bulbSpots(count) {
  const side = Math.round(count * 0.3);
  const end = Math.floor((count - side * 2) / 2);
  const spots = [];
  for (let i = 0; i < side; i += 1) spots.push([(i / (side - 1)) * 100, 0]);
  for (let i = 1; i <= end; i += 1) spots.push([100, (i / (end + 1)) * 100]);
  for (let i = side - 1; i >= 0; i -= 1) spots.push([(i / (side - 1)) * 100, 100]);
  for (let i = end; i >= 1; i -= 1) spots.push([0, (i / (end + 1)) * 100]);
  return spots;
}

const Bulbs = ({ count = BULBS }) => (
  <span className="carn-bulbs" aria-hidden="true">
    {bulbSpots(count).map(([x, y], i) => (
      <i key={i} style={{ "--i": i, left: `${x}%`, top: `${y}%` }} />
    ))}
  </span>
);

function Marquee({ opening, display, t }) {
  return (
    <div className={`carn-marquee ${opening ? "is-lit" : ""}`}>
      <Bulbs />
      <p className="carn-marquee-roll">{t("carnival.roll")}</p>
      <p className="carn-marquee-name">{display}</p>
      <motion.span className="carn-marquee-star" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
        ★
      </motion.span>
    </div>
  );
}

const Bunting = () => (
  <div className="carn-bunting" aria-hidden="true">
    {Array.from({ length: 14 }, (_, i) => (
      <span key={i} />
    ))}
  </div>
);

export default function CarnivalTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="carn"
      confetti={["#e63946", "#ffd23f", "#2a9df4", "#ffffff", "#2ec4b6"]}
      decoration={<Particles kinds={["balloon", "confetti", "confetti"]} count={12} seed={64} />}
      cover={{ variant: "marquee", object: Marquee, duration: 1.6, heading: false, prompt: "carnival.prompt" }}
    >
      {(party) => <CarnivalPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function CarnivalPage({ invitation, preview, party }) {
  const { t, vars, stage, date, language } = party;

  return (
    <>
      <header className="carn-hero">
        <div className="carn-canopy" aria-hidden="true" />
        <Bunting />
        <motion.div className="carn-board" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 140, damping: 12 }}>
          <Bulbs count={18} />
          <p className="carn-presents">{t("carnival.presents")}</p>
          <h1 className="carn-name">{party.name}</h1>
          <p className="carn-line">{t(`bday.line.${stage}`, vars)}</p>
        </motion.div>
        <motion.div className="carn-tent" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 1, ease: "backOut" }}>
          <Tent />
        </motion.div>
      </header>

      {(party.message || party.photo) && (
        <section className="carn-sec">
          {party.photo && <CinematicImage className="carn-photo" src={party.photo} alt={party.name} parallax={14} reveal="zoom" />}
          {party.message && (
            <ScrollReveal className="carn-badge" preset="zoom">
              <p>{party.message}</p>
            </ScrollReveal>
          )}
          {party.host && <p className="carn-host">{t("bday.hostedBy", vars)}</p>}
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="carn-sec">
          <h2 className="carn-title">{t("carnival.showtimes")}</h2>
          <Stagger as="ol" className="carn-tickets" step={0.14}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="left" className="carn-ticket">
                <span className="carn-ticket-stub">{t("carnival.admit")}</span>
                <span className="carn-ticket-body">
                  <span className="carn-ticket-time">{e.time}</span>
                  <span className="carn-ticket-name">{e.name}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {date && (
        <section className="carn-sec">
          <ScrollReveal className="carn-bigticket" preset="unfold">
            <span className="carn-bt-day">{date.weekday}</span>
            <span className="carn-bt-date">
              {date.day} {date.month}
            </span>
            <span className="carn-bt-time">
              {date.time}
              {date.endTime && ` – ${date.endTime}`}
            </span>
            <span className="carn-barcode" aria-hidden="true" />
          </ScrollReveal>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.show("cake") && (
        <section className="carn-sec">
          <h2 className="carn-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="carn-sec">
          <h2 className="carn-title">{t("carnival.booth")}</h2>
          <ScrollReveal className="carn-booth" preset="rise">
            <span className="carn-awning" aria-hidden="true" />
            <p className="carn-venue">{party.venue}</p>
            {party.address && <p className="carn-address">{party.address}</p>}
            {party.dressCode && party.show("dressCode") && (
              <p className="carn-address">
                <b>{t("bday.dressCode.title")}:</b> {party.dressCode}
              </p>
            )}
            <MapEmbed party={party} t={t} className="party-map carn-map" />
            <DirectionsButtons party={party} t={t} />
          </ScrollReveal>
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="carn-sec" id="rsvp">
          <h2 className="carn-title">{t("carnival.ticket")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="carn-rsvp" preset="zoom" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="carn-sec">
          <CelebrateButton t={t} label={t("carnival.cheer")} className="carn-tada" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="carn-sec">
          <p className="carn-host">{t(party.kids ? "bday.contact.parents" : "bday.contact.host")}</p>
          {party.host && <p className="carn-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="carn-foot">
        <Bunting />
        <p className="carn-thanks">{t("bday.thanks.text")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
