import { Link } from "react-router-dom";

export default function NotFoundPage({ message = "We couldn't find the page you're looking for." }) {
  return (
    <main className="page center">
      <h1>Page not found</h1>
      <p className="muted">{message}</p>
      <Link to="/">Go to home</Link>
    </main>
  );
}
