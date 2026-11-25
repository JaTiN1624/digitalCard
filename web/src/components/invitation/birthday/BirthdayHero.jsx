import { motion } from "motion/react";
import NameReveal from "../motion/NameReveal.jsx";
import { CinematicImage } from "../motion/ScrollReveal.jsx";
import AgeReveal from "./AgeReveal.jsx";
import { ordinal } from "../../../i18n/index.js";
import { birthdayAge, birthdayStage, isHidden, safeMediaUrl } from "../../../utils/invitation.js";

const EASE = [0.22, 1, 0.36, 1];

// Birthday introduction: theme art, kicker, the name, an age-aware headline, the animated age,
// an optional photo and the host. Wording comes from bday.* keys and adapts to the age
// (first birthday, kids, teen, 18/21/25 milestone, 30/40 cheers, golden 50+ …).
export default function BirthdayHero({ invitation, t, art = null, crown = null, ageVariant = "count", nameOptions = {}, photoFrame = "rounded" }) {
  const { config, language, title } = invitation;
  const age = birthdayAge(invitation);
  const stage = birthdayStage(age);
  const vars = { age: age ?? "", ord: age ? ordinal(age, language) : "" };
  const photo = safeMediaUrl(config.coverImage);
  const name = config.celebrant || title;

  return (
    <header className="bday-hero">
      {art && (
        <motion.div
          className="bday-art"
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
        >
          {art}
        </motion.div>
      )}

      <motion.p
        className="bday-kicker"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
      >
        {t(`bday.kicker.${stage}`, vars)}
      </motion.p>

      {crown && (
        <motion.div
          className="bday-crown"
          initial={{ opacity: 0, y: -40, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 140, damping: 11 }}
        >
          {crown}
        </motion.div>
      )}

      <NameReveal className="bday-name" fallback={name} delay={0.5} {...nameOptions} />

      <motion.p
        className="bday-line"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.7, ease: "backOut" }}
      >
        {t(`bday.line.${stage}`, vars)}
      </motion.p>

      {age && !isHidden(invitation, "age") && <AgeReveal age={age} language={language} t={t} variant={ageVariant} />}

      <motion.p
        className="bday-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        {t(`bday.tagline.${stage}`, vars)}
      </motion.p>

      {photo && (
        <CinematicImage className={`bday-photo frame-${photoFrame}`} src={photo} alt={name} parallax={24} priority />
      )}

      {config.host && <p className="bday-host">{t("bday.hostedBy", { host: config.host })}</p>}
    </header>
  );
}
