import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInvitation } from "../hooks/useInvitation.js";
import { getT } from "../i18n/index.js";
import { getTemplate } from "../templates/index.js";
import NotFoundPage from "./NotFoundPage.jsx";
import MusicButton from "../components/invitation/MusicButton.jsx";
import { usePageMeta } from "../hooks/usePageMeta.js";

// Shown while the invitation loads. If it takes more than a few seconds (the free server is
// waking up), reassure the guest instead of leaving them staring at a spinner.
function InvitationLoading() {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setSlow(true), 4000);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <main className="page center" aria-busy="true">
      <p className="muted" role="status">
        {slow ? "Opening your invitation — this can take up to a minute on the first visit…" : "Loading invitation…"}
      </p>
    </main>
  );
}

export default function InvitationPage() {
  const { slug } = useParams();
  const { loading, invitation, error } = useInvitation(slug);
  // Personal invitations are private: keep them out of search results
  usePageMeta({ title: invitation?.title ?? "Invitation", robots: "noindex, nofollow" });

  if (loading) return <InvitationLoading />;

  if (error?.status === 404) {
    return <NotFoundPage message="This invitation doesn't exist or isn't published yet." />;
  }

  if (error) {
    return (
      <main className="page center">
        <p className="form-error" role="alert">
          {error.message}
        </p>
        <button type="button" className="retry-btn" onClick={() => window.location.reload()}>
          Try again
        </button>
      </main>
    );
  }

  const Template = getTemplate(invitation.templateKey).component;
  return (
    <main>
      <Suspense fallback={<p className="page center muted">Loading invitation…</p>}>
        <Template invitation={invitation} t={getT(invitation.language)} />
      </Suspense>
      <MusicButton src={invitation.config?.music} />
    </main>
  );
}
