import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="page center">
      <h1>Digital Invitations</h1>
      <p className="muted">Beautiful digital wedding and birthday invitations with online RSVP — in English, हिन्दी and मराठी.</p>
      <p>
        <Link to="/templates?collection=wedding">Wedding templates</Link> · <Link to="/templates?collection=birthday">Birthday templates</Link>
      </p>
    </main>
  );
}
