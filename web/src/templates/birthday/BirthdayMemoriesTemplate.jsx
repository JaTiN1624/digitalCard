import { motion } from "motion/react";
import BirthdayStage from "../../components/invitation/birthday/BirthdayStage.jsx";
import { DirectionsButtons, MapEmbed } from "../../components/invitation/birthday/PartyBits.jsx";
import { useGoogleFont } from "../../components/invitation/birthday/useGoogleFont.js";
import { ScrollReveal, Stagger, StaggerItem } from "../../components/invitation/motion/ScrollReveal.jsx";
import Countdown from "../../components/invitation/Countdown.jsx";
import { CalendarButtons } from "../../components/invitation/sections/SaveTheDate.jsx";
import { RsvpCard, ShareButtons } from "../../components/invitation/sections/ClosingSections.jsx";
import { ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { Star } from "../../components/invitation/art/BirthdayArt.jsx";
import { initialOf } from "../../utils/format.js";
import "./birthday-memories.css";

// Birthday Memories — milestone and family birthdays, photo first. A leather photo album opens
// on the cover. Inside is a scrapbook: taped polaroids, a handwritten name with a drawn
// underline, a note on lined paper, a memory timeline (config.timeline), scattered photo
// moments (config.gallery) and the party as a handwritten checklist.
const FONT = ["Caveat:wght@500;700", "Lora:ital@0;1"];

function Album({ opening, display, t }) {
  return (
    <div className="mem-album">
      <div className="mem-album-page">
        <span className="mem-album-polaroid" />
        <span className="mem-album-polaroid p2" />
      </div>
      <motion.div className="mem-album-cover" animate={{ rotateY: opening ? -165 : 0 }} transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}>
        <span className="mem-album-stitch" />
        <span className="mem-album-label">{t("mem.album")}</span>
        <span className="mem-album-name">{display}</span>
      </motion.div>
    </div>
  );
}

// A photo in a polaroid frame; without a photo, a soft placeholder with the initial
function Polaroid({ src, caption, name, tilt = 0, className = "" }) {
  return (
    <figure className={`mem-polaroid ${className}`} style={{ "--tilt": `${tilt}deg` }}>
      <span className="mem-tape" aria-hidden="true" />
      {src ? <img src={src} alt={caption ?? ""} loading="lazy" decoding="async" /> : <span className="mem-placeholder">{initialOf(name)}</span>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default function BirthdayMemoriesTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="mem"
      confetti={["#e8a87c", "#c38d9e", "#85b8a8", "#f6e7c1", "#ffffff"]}
      cover={{ variant: "album", object: Album, duration: 1.5, heading: false, prompt: "mem.prompt" }}
    >
      {(party) => <MemoriesPage {...props} party={party} />}
    </BirthdayStage>
  );
}

function MemoriesPage({ invitation, preview, party }) {
  const { t, vars, stage, date, language } = party;
  const heroPhotos = [party.photo, ...party.gallery.map((g) => g.url)].filter(Boolean).slice(0, 3);
  while (heroPhotos.length < 3) heroPhotos.push(null);

  return (
    <>
      <header className="mem-hero">
        <div className="mem-pile">
          {heroPhotos.map((src, i) => (
            <motion.div
              key={i}
              className={`mem-pile-item i${i}`}
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: [-8, 6, -3][i] }}
              transition={{ delay: 0.2 + i * 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Polaroid src={src} name={party.name} />
            </motion.div>
          ))}
          <Star className="mem-sticker s1" />
          <Star className="mem-sticker s2" />
        </div>
        <motion.p className="mem-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          {t(`bday.kicker.${stage}`, vars)}
        </motion.p>
        <motion.h1 className="mem-name" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
          {party.name}
        </motion.h1>
        <svg className="mem-underline" viewBox="0 0 300 20" aria-hidden="true">
          <motion.path
            d="M5 14c60-10 130-12 200-6 30 3 60 4 90-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          />
        </svg>
        <motion.p className="mem-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          {t(`bday.tagline.${stage}`, vars)}
        </motion.p>
      </header>

      {party.message && (
        <section className="mem-sec">
          <ScrollReveal className="mem-note" preset="rise">
            <span className="mem-tape" aria-hidden="true" />
            <p className="mem-note-text">{party.message}</p>
            {party.host && <p className="mem-note-sign">— {party.host}</p>}
          </ScrollReveal>
        </section>
      )}

      {party.timeline.length > 0 && party.show("story") && (
        <section className="mem-sec">
          <h2 className="mem-title">{t("mem.journey")}</h2>
          <Stagger as="ol" className="mem-timeline" step={0.2}>
            {party.timeline.map((m, i) => (
              <StaggerItem as="li" key={`${m.title}-${i}`} preset={i % 2 ? "right" : "left"} className="mem-memory">
                <Polaroid src={m.image} caption={m.date} name={m.title} tilt={i % 2 ? 3 : -3} />
                <div className="mem-memory-text">
                  <h3>{m.title}</h3>
                  {m.text && <p>{m.text}</p>}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {party.gallery.length > 0 && party.show("gallery") && (
        <section className="mem-sec">
          <h2 className="mem-title">{t("mem.moments")}</h2>
          <Stagger className="mem-moments" step={0.1}>
            {party.gallery.map((g, i) => (
              <StaggerItem key={g.url} preset="zoom">
                <Polaroid src={g.url} caption={g.caption} name={party.name} tilt={[-4, 3, -2, 5, -3][i % 5]} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <section className="mem-sec mem-party">
        <h2 className="mem-title">{t("mem.new")}</h2>
        {date && (
          <ScrollReveal className="mem-datecard" preset="zoom">
            <span className="mem-date-day">{date.weekday}</span>
            <span className="mem-date-big">
              {date.day} {date.month}
            </span>
            <span>
              {date.year} · {date.time}
              {date.endTime && ` – ${date.endTime}`}
            </span>
          </ScrollReveal>
        )}
        {date && party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
        {date && <CalendarButtons invitation={invitation} t={t} />}

        {party.events.length > 0 && party.show("events") && (
          <Stagger as="ul" className="mem-checklist" step={0.12}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="left">
                <span className="mem-box" aria-hidden="true" />
                <span className="mem-check-name">{e.name}</span>
                <span className="mem-check-time">{e.time}</span>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      {party.show("cake") && (
        <section className="mem-sec">
          <h2 className="mem-title">{t("bday.cake.eyebrow")}</h2>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="mem-sec">
          <h2 className="mem-title">{t("venue.title")}</h2>
          <ScrollReveal className="mem-mapcard" preset="rise">
            <span className="mem-tape" aria-hidden="true" />
            <MapEmbed party={party} t={t} className="party-map mem-map" />
            <p className="mem-venue">{party.venue}</p>
            {party.address && <p className="mem-address">{party.address}</p>}
            {party.dressCode && party.show("dressCode") && (
              <p className="mem-address">
                {t("bday.dressCode.title")}: {party.dressCode}
              </p>
            )}
          </ScrollReveal>
          <DirectionsButtons party={party} t={t} />
        </section>
      )}

      {party.show("rsvp") && (
        <section className="mem-sec" id="rsvp">
          <RsvpCard invitation={invitation} t={t} preview={preview} className="mem-rsvp" preset="rise" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="mem-sec">
          <p className="mem-address">{t("bday.contact.host")}</p>
          {party.host && <p className="mem-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="mem-foot">
        <p className="mem-thanks">{t("bday.thanks.text")}</p>
        <p className="mem-love">{t("bday.thanks.eyebrow")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
