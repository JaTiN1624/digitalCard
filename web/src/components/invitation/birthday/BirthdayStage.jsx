import TemplateShell from "../TemplateShell.jsx";
import OpeningCover from "../motion/OpeningCover.jsx";
import Unveil from "../motion/Unveil.jsx";
import { useOpened } from "../motion/useOpened.js";
import { useParty } from "./useParty.js";
import "./birthday.css";

// The frame every birthday, anniversary and baby shower design sits in: theme class, confetti colours, background
// decoration, the design's own opening cover, then the design's own page.
// It carries no layout of its own: `children(party)` draws everything after the cover.
//
// cover: { variant, object, duration, heading, prompt, emblem, decoration }
// wording: occasion prefix for wording overrides ("bday", "anniv", "baby")
export default function BirthdayStage({ invitation, t: baseT, preview, name, confetti, decoration = null, cover, wording = "bday", children }) {
  const party = useParty(invitation, baseT, wording);
  const [opened, open] = useOpened(invitation, preview);
  const { t } = party;

  return (
    <TemplateShell name={name} language={invitation.language} celebration={confetti} decoration={decoration}>
      {!opened ? (
        <OpeningCover
          invitation={invitation}
          t={t}
          onOpened={open}
          ticketKind="party"
          {...cover}
          prompt={cover.prompt ? t(cover.prompt) : undefined}
        />
      ) : (
        <Unveil className={`${name}-page`}>{children(party)}</Unveil>
      )}
    </TemplateShell>
  );
}
