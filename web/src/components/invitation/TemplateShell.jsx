import { MotionConfig } from "motion/react";
import { htmlLang } from "../../i18n/index.js";
import { CelebrationProvider } from "./motion/Celebration.jsx";

// Outer wrapper every template uses: theme class, correct `lang` for screen readers and fonts,
// the confetti canvas (tinted with the theme's colours), and reduced-motion handling.
// MotionConfig "user" turns off Motion's movement for visitors who ask for reduced motion;
// CSS particles are hidden for them too.
export default function TemplateShell({ name, language, children, decoration = null, celebration }) {
  return (
    <MotionConfig reducedMotion="user">
      <CelebrationProvider colors={celebration}>
        <div className={`tpl tpl-${name}`} lang={htmlLang(language)}>
          {decoration}
          <div className="tpl-inner">{children}</div>
        </div>
      </CelebrationProvider>
    </MotionConfig>
  );
}
