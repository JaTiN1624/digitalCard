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
import { formatNumber } from "../../utils/format.js";
import "./timeless-love.css";

// Timeless Love — wedding anniversaries. A brass clock face on the cover whose hands sweep
// backwards through the years before it opens. The page is quiet and personal: the couple's
// names over the years in large roman numerals, "together since", a family note, the couple's
// journey (config.timeline) on a thread of years, an evening programme and blessings.
const FONT = "Playfair+Display:ital,wght@0,400;0,600;1,400";
const ROMAN = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];
const roman = (n) => ROMAN.reduce((out, [v, s]) => {
  while (n >= v) {
    out += s;
    n -= v;
  }
  return out;
}, "");

function Clock({ opening }) {
  return (
    <div className="tl-clock">
      <div className="tl-clock-face">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="tl-tick" style={{ "--r": `${i * 30}deg` }} />
        ))}
        <motion.span className="tl-hand hour" animate={{ rotate: opening ? -720 : 300 }} transition={{ duration: opening ? 1.5 : 0, ease: [0.65, 0, 0.35, 1] }} />
        <motion.span className="tl-hand minute" animate={{ rotate: opening ? -2160 : 60 }} transition={{ duration: opening ? 1.5 : 0, ease: [0.65, 0, 0.35, 1] }} />
        <span className="tl-pin" />
      </div>
      <motion.div className="tl-clock-glow" animate={opening ? { scale: 8, opacity: [0, 1, 0] } : { scale: 1, opacity: 0 }} transition={{ delay: 1.1, duration: 0.8 }} />
    </div>
  );
}

export default function TimelessLoveTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="tl"
      wording="anniv"
      confetti={["#c9a35b", "#efe2c4", "#7d1f2e", "#ffffff"]}
      decoration={<Particles kinds={["petal", "sparkle"]} count={9} seed={14} />}
      cover={{ variant: "clock", object: Clock, duration: 1.9, prompt: "anniv.prompt" }}
    >
      {(party) => <TimelessPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function TimelessPage({ invitation, preview, party }) {
  const { t, date, language, couple, years } = party;

  return (
    <>
      <header className="tl-hero">
        {years && (
          <motion.span className="tl-numeral" aria-hidden="true" initial={{ opacity: 0, letterSpacing: "0.4em" }} animate={{ opacity: 1, letterSpacing: "0.05em" }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}>
            {roman(years)}
          </motion.span>
        )}
        <motion.p className="tl-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          {t("occasion.title.ANNIVERSARY")}
        </motion.p>
        <motion.h1 className="tl-names" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          {couple ? (
            <>
              <span>{couple.groom}</span>
              <span className="tl-amp">&amp;</span>
              <span>{couple.bride}</span>
            </>
          ) : (
            party.name
          )}
        </motion.h1>
        <motion.p className="tl-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
          {years ? t("anniv.celebrating", { years: formatNumber(years, language) }) : t("anniv.celebratingPlain")}
        </motion.p>
        {party.sinceYear && (
          <motion.p className="tl-since" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
            {t("anniv.since", { year: party.sinceYear })}
          </motion.p>
        )}
      </header>

      {party.photo && <CinematicImage className="tl-photo" src={party.photo} alt={couple ? `${couple.groom} & ${couple.bride}` : party.name} parallax={26} />}

      {party.message && (
        <section className="tl-sec">
          <p className="tl-label">{t("anniv.story")}</p>
          <ScrollReveal as="blockquote" className="tl-message" preset="blur" duration={1.4}>
            {party.message}
          </ScrollReveal>
          {party.host && <p className="tl-host">— {party.host}</p>}
        </section>
      )}

      {party.timeline.length > 0 && party.show("story") && (
        <section className="tl-sec">
          <h2 className="tl-title">{t("anniv.journey")}</h2>
          <Stagger as="ol" className="tl-thread" step={0.18}>
            {party.timeline.map((m, i) => (
              <StaggerItem as="li" key={`${m.title}-${i}`} preset="rise" className="tl-moment">
                <span className="tl-moment-year">{m.date}</span>
                {m.image && <img className="tl-moment-img" src={m.image} alt="" loading="lazy" decoding="async" />}
                <h3>{m.title}</h3>
                {m.text && <p>{m.text}</p>}
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {date && (
        <section className="tl-sec tl-when">
          <ScrollReveal className="tl-date" preset="zoom">
            <span>{date.weekday}</span>
            <strong>{date.day}</strong>
            <span>
              {date.month} {date.year}
            </span>
            <span className="tl-date-time">
              {date.time}
              {date.endTime && ` – ${date.endTime}`}
            </span>
          </ScrollReveal>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="tl-sec">
          <h2 className="tl-title">{t("anniv.day")}</h2>
          <Stagger as="ol" className="tl-programme" step={0.12}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="blur" className="tl-row">
                <span className="tl-row-time">{e.time}</span>
                <span className="tl-row-name">{e.name}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="tl-sec">
          <h2 className="tl-title">{t("venue.title")}</h2>
          <p className="tl-venue">{party.venue}</p>
          {party.address && <p className="tl-address">{party.address}</p>}
          {party.dressCode && party.show("dressCode") && (
            <p className="tl-address">
              {t("bday.dressCode.title")} · {party.dressCode}
            </p>
          )}
          <MapEmbed party={party} t={t} className="party-map tl-map" />
          <DirectionsButtons party={party} t={t} />
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="tl-sec" id="rsvp">
          <h2 className="tl-title">{t("anniv.blessings")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="tl-rsvp" preset="blur" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="tl-sec">
          <CelebrateButton t={t} label={t("anniv.cheers")} className="tl-cheers" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="tl-sec">
          <p className="tl-label">{t("bday.contact.host")}</p>
          {party.host && <p className="tl-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="tl-foot">
        <span className="tl-heart" aria-hidden="true">
          ♡
        </span>
        <p className="tl-thanks">{t("anniv.thanks.text")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
