import { useMemo } from "react";
import TemplateShell from "../../components/invitation/TemplateShell.jsx";
import InvitationSections from "../../components/invitation/InvitationSections.jsx";
import OpeningCover from "../../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../../components/invitation/motion/Unveil.jsx";
import BirthdayHero from "../../components/invitation/birthday/BirthdayHero.jsx";
import { useOpened } from "../../components/invitation/motion/useOpened.js";
import { withOverrides } from "../../i18n/index.js";
import "../../components/invitation/birthday/birthday.css";

// Shared birthday layout. Each theme passes its own look through `theme`:
//   name       CSS theme class (tpl-<name>)          cover      opening variant
//   emblem     art on the cover / reception emblems  confetti   colours for poppers
//   particles  background decoration                 heroArt    illustration above the name
//   ageVariant "count" | "level"                     photoFrame shape of the hero photo
//   crown      art that lands above the name         order      section order
//   options    extra InvitationSections options
//   afterHero  optional extra block under the hero
const DEFAULT_ORDER = [
  "message",
  "cake",
  "date",
  "events",
  "gallery",
  "venue",
  "dressCode",
  "rsvp",
  "contact",
  "celebrate",
  "share",
  "thanks",
];

export default function BirthdayTemplate({ invitation, t: baseT, preview, theme }) {
  // Birthday wording wins over shared wedding wording ("Party schedule", "Birthday wishes" …)
  const t = useMemo(() => withOverrides(baseT, "bday"), [baseT]);
  const [opened, open] = useOpened(invitation, preview);

  return (
    <TemplateShell name={theme.name} language={invitation.language} celebration={theme.confetti} decoration={theme.particles}>
      {!opened ? (
        <OpeningCover
          variant={theme.cover}
          invitation={invitation}
          t={t}
          onOpened={open}
          emblem={theme.emblem}
          ticketKind="party"
          decoration={theme.coverDecoration}
        />
      ) : (
        <Unveil>
          <BirthdayHero
            invitation={invitation}
            t={t}
            art={theme.heroArt}
            crown={theme.crown}
            ageVariant={theme.ageVariant}
            nameOptions={theme.nameOptions}
            photoFrame={theme.photoFrame}
          />
          {theme.afterHero}
          <InvitationSections
            invitation={invitation}
            t={t}
            preview={preview}
            order={theme.order ?? DEFAULT_ORDER}
            options={{ fallbackIcon: "balloon", emblem: theme.emblem, ...theme.options }}
          />
        </Unveil>
      )}
    </TemplateShell>
  );
}
