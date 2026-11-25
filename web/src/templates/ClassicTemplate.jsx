import TemplateShell from "../components/invitation/TemplateShell.jsx";
import Hero from "../components/invitation/Hero.jsx";
import InvitationSections from "../components/invitation/InvitationSections.jsx";
import OpeningCover from "../components/invitation/motion/OpeningCover.jsx";
import Unveil from "../components/invitation/motion/Unveil.jsx";
import { useOpened } from "../components/invitation/motion/useOpened.js";
import { Rosette } from "../components/invitation/art/Motifs.jsx";

const CONFETTI = ["#9c2f3f", "#c29a53", "#f1e3d6", "#ffffff"];

// Classic: clean ivory card with maroon accents and a gold top border, opened from an envelope.
export default function ClassicTemplate({ invitation, t, preview }) {
  const [opened, open] = useOpened(invitation, preview);

  return (
    <TemplateShell name="classic" language={invitation.language} celebration={CONFETTI}>
      {!opened ? (
        <OpeningCover variant="envelope" invitation={invitation} t={t} onOpened={open} emblem={<Rosette />} />
      ) : (
        <Unveil>
          <div className="stage">
            <article className="card">
              <Hero invitation={invitation} t={t} />
            </article>
          </div>
          <InvitationSections invitation={invitation} t={t} preview={preview} />
        </Unveil>
      )}
    </TemplateShell>
  );
}
