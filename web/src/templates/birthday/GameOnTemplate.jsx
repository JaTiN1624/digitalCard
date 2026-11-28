import { motion } from "motion/react";
import BirthdayStage from "../../components/invitation/birthday/BirthdayStage.jsx";
import AgeReveal from "../../components/invitation/birthday/AgeReveal.jsx";
import { DirectionsButtons, MapEmbed } from "../../components/invitation/birthday/PartyBits.jsx";
import { useGoogleFont } from "../../components/invitation/birthday/useGoogleFont.js";
import Particles from "../../components/invitation/motion/Particles.jsx";
import { ScrollReveal, Stagger, StaggerItem } from "../../components/invitation/motion/ScrollReveal.jsx";
import Countdown from "../../components/invitation/Countdown.jsx";
import GallerySection from "../../components/invitation/sections/GallerySection.jsx";
import { CalendarButtons } from "../../components/invitation/sections/SaveTheDate.jsx";
import { RsvpCard, ShareButtons } from "../../components/invitation/sections/ClosingSections.jsx";
import { CelebrateButton, ContactButtons, InteractiveCake } from "../../components/invitation/sections/BirthdaySections.jsx";
import { Gamepad, PixelHeart } from "../../components/invitation/art/BirthdayArt.jsx";
import { PixelCoin, PixelStar } from "../../components/invitation/art/SceneArt.jsx";
import "./game-on.css";

// Game On — an arcade game. "Press start" on the cabinet, then a HUD: player card with the
// age as a level and XP bar, an RPG dialogue box for the message, a level-select grid for the
// schedule, the cake as the final boss, the venue as the world map and "GG" credits to close.
const FONT = "VT323";

export default function GameOnTemplate(props) {
  useGoogleFont(FONT);
  return (
    <BirthdayStage
      {...props}
      name="game"
      confetti={["#39ff14", "#ff2bd6", "#00e5ff", "#ffe600"]}
      decoration={<Particles kinds={["pixel", "pixel", "star"]} count={14} seed={41} />}
      cover={{ variant: "arcade", emblem: <Gamepad /> }}
    >
      {(party) => <GamePage {...props} party={party} />}
    </BirthdayStage>
  );
}

const Heart = ({ full }) => <PixelHeart className={full ? "game-heart" : "game-heart is-empty"} />;

function GamePage({ invitation, preview, party }) {
  const { t, vars, stage, age, date, language } = party;

  return (
    <>
      <header className="game-hud-hero">
        <div className="game-hud" aria-hidden="true">
          <span>1UP</span>
          <span className="game-hearts">
            <Heart full />
            <Heart full />
            <Heart full />
          </span>
          <span>
            <PixelCoin className="game-coin-icon" /> ×{age ?? 99}
          </span>
        </div>

        <div className="game-screen">
          <motion.p className="game-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {t(`bday.kicker.${stage}`, vars)}
          </motion.p>
          <motion.h1
            className="game-name"
            initial={{ opacity: 0, scale: 2.4, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 0.5, ease: "backOut" }}
          >
            {party.name}
          </motion.h1>
          {age && party.show("age") ? (
            <AgeReveal age={age} language={language} t={t} variant="level" />
          ) : (
            <p className="game-line">{t(`bday.line.${stage}`, vars)}</p>
          )}
          <div className="game-coins" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <PixelCoin key={i} className={`game-coin c${i}`} />
            ))}
          </div>
          <div className="game-ground" aria-hidden="true" />
        </div>
        <p className="game-blink" aria-hidden="true">
          ▼ {t(`bday.tagline.${stage}`, vars)} ▼
        </p>
      </header>

      {party.message && (
        <section className="game-sec">
          <ScrollReveal className="game-dialog" preset="zoom">
            <span className="game-dialog-tag">{party.host || party.name}</span>
            <p className="game-dialog-text">{party.message}</p>
            <span className="game-dialog-next" aria-hidden="true">
              ▶
            </span>
          </ScrollReveal>
        </section>
      )}

      {date && (
        <section className="game-sec">
          <h2 className="game-title">{t("game.startsIn")}</h2>
          {party.show("countdown") && <Countdown target={invitation.eventDate} language={language} t={t} showTitle={false} />}
          <p className="game-date">
            {date.weekday} · {date.day} {date.month} · {date.time}
            {date.endTime && ` – ${date.endTime}`}
          </p>
          <CalendarButtons invitation={invitation} t={t} />
        </section>
      )}

      {party.events.length > 0 && party.show("events") && (
        <section className="game-sec">
          <h2 className="game-title">{t("game.levelSelect")}</h2>
          <Stagger as="ol" className="game-levels" step={0.1}>
            {party.events.map((e) => (
              <StaggerItem as="li" key={e.key} preset="zoom" className="game-level">
                <span className="game-level-num">{t("game.stage", { n: e.index + 1 })}</span>
                <PixelStar className="game-level-star" />
                <span className="game-level-name">{e.name}</span>
                <span className="game-level-time">{e.time}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {party.show("cake") && (
        <section className="game-sec game-boss">
          <h2 className="game-title">{t("game.boss")}</h2>
          <div className="game-bossbar" aria-hidden="true">
            <span />
          </div>
          <InteractiveCake invitation={invitation} t={t} />
        </section>
      )}

      {party.venue && party.show("venue") && (
        <section className="game-sec">
          <h2 className="game-title">{t("game.world")}</h2>
          <ScrollReveal className="game-panel" preset="rise">
            <p className="game-venue">{party.venue}</p>
            {party.address && <p className="game-address">{party.address}</p>}
            {party.dressCode && party.show("dressCode") && (
              <p className="game-dress">
                <span>{t("bday.dressCode.title")}:</span> {party.dressCode}
              </p>
            )}
            <MapEmbed party={party} t={t} className="party-map game-map" />
            <DirectionsButtons party={party} t={t} />
          </ScrollReveal>
        </section>
      )}

      {party.show("gallery") && <GallerySection invitation={invitation} t={t} />}

      {party.show("rsvp") && (
        <section className="game-sec" id="rsvp">
          <h2 className="game-title">{t("game.join")}</h2>
          <RsvpCard invitation={invitation} t={t} preview={preview} className="game-panel game-rsvp" preset="zoom" />
        </section>
      )}

      {party.show("celebrate") && (
        <section className="game-sec">
          <CelebrateButton t={t} label={t("game.power")} className="game-power" />
        </section>
      )}

      {party.hasPhone && party.show("contact") && (
        <section className="game-sec">
          <p className="game-label">{t(party.kids ? "bday.contact.parents" : "bday.contact.host")}</p>
          {party.host && <p className="game-venue">{party.host}</p>}
          <ContactButtons invitation={invitation} t={t} />
        </section>
      )}

      <footer className="game-credits">
        <ScrollReveal as="p" className="game-gg" preset="zoom">
          {t("game.gg")}
        </ScrollReveal>
        <p className="game-thanks">{t("bday.thanks.text")}</p>
        {party.show("share") && <ShareButtons invitation={invitation} t={t} />}
      </footer>
    </>
  );
}
