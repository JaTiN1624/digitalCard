import { useParams } from "react-router-dom";
import { useInvitation } from "../hooks/useInvitation.js";
import { formatEventDate, LOCALES } from "../utils/format.js";
import RsvpForm from "../features/rsvp/RsvpForm.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function InvitationPage() {
  const { slug } = useParams();
  const { loading, invitation, error } = useInvitation(slug);

  if (loading) {
    return (
      <main className="page center">
        <p className="muted">Loading invitation…</p>
      </main>
    );
  }

  if (error?.status === 404) return <NotFoundPage message="This invitation doesn't exist or isn't published yet." />;

  if (error) {
    return (
      <main className="page center">
        <p className="form-error">{error.message}</p>
      </main>
    );
  }

  const { title, language, eventDate, config } = invitation;
  const couple = config.groom && config.bride ? `${config.groom} & ${config.bride}` : title;
  const lang = LOCALES[language]?.slice(0, 2) ?? "en";

  return (
    <main className="page" lang={lang}>
      <article className="invitation">
        <p className="eyebrow">Together with their families</p>
        <h1>{couple}</h1>
        <p className="eyebrow">invite you to celebrate their wedding</p>

        {eventDate && <p className="event-date">{formatEventDate(eventDate, language)}</p>}
        {config.venue && <p className="venue">{config.venue}</p>}
        {config.message && <p className="message">{config.message}</p>}
      </article>

      <section className="rsvp">
        <RsvpForm slug={slug} />
      </section>
    </main>
  );
}
