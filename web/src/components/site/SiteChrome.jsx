import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BUSINESS } from "../../config/business.js";
import { enquiryLink } from "../../utils/site.js";

// Header, mobile menu and footer of the public studio site (never shown on invitations)

export function WhatsAppIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.1-.1Z"
      />
    </svg>
  );
}

const NAV = [
  ["/templates", "Designs"],
  ["/wedding-invitations", "Wedding"],
  ["/birthday-invitations", "Birthday"],
  ["/pricing", "Pricing"],
  ["/guides", "Guides"],
];

const MENU = [
  ["/templates", "All designs", ""],
  ["/wedding-invitations", "Wedding", ""],
  ["/birthday-invitations", "Birthday", ""],
  ["/engagement-invitations", "Engagement", ""],
  ["/anniversary-invitations", "Anniversary", ""],
  ["/baby-shower-invitations", "Baby shower", ""],
  ["/pricing", "Pricing", "Packages & delivery"],
  ["/guides", "Guides", "Wording & RSVP help"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const close = () => setOpen(false);

  // lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="s-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="wrap s-header-in">
        <Link to="/" className="brand" aria-label={`${BUSINESS.name} — home`}>
          <span className="brand-mark" aria-hidden="true">
            ✦
          </span>
          {BUSINESS.name}
        </Link>
        <nav className="s-nav" aria-label="Main">
          {NAV.map(([to, label]) => (
            <Link key={to} to={to} aria-current={pathname === to ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <a className="btn-s wa small s-header-cta" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> Enquire
        </a>
        <button type="button" className="menu-btn" aria-expanded={open} aria-controls="m-sheet" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"} <span className="menu-btn-lines" aria-hidden="true" />
        </button>
      </div>
      {open && (
        <nav id="m-sheet" className="m-sheet" aria-label="Menu">
          {MENU.map(([to, label, note]) => (
            <Link key={to} to={to} className="m-link" onClick={close} aria-current={pathname === to ? "page" : undefined}>
              {label} {note && <span>{note}</span>}
            </Link>
          ))}
          <a className="btn-s wa" href={enquiryLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Chat with us on WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="s-footer">
      <div className="wrap">
        <div className="s-footer-grid">
          <div>
            <Link to="/" className="brand">
              <span className="brand-mark" aria-hidden="true">
                ✦
              </span>
              {BUSINESS.name}
            </Link>
            <p className="s-footer-note">Digital invitation websites, designed and personalised by our studio and delivered as one link. {BUSINESS.region}.</p>
          </div>
          <div>
            <h2>Occasions</h2>
            <ul>
              <li><Link to="/wedding-invitations">Wedding</Link></li>
              <li><Link to="/birthday-invitations">Birthday</Link></li>
              <li><Link to="/engagement-invitations">Engagement</Link></li>
              <li><Link to="/anniversary-invitations">Anniversary</Link></li>
              <li><Link to="/baby-shower-invitations">Baby shower</Link></li>
            </ul>
          </div>
          <div>
            <h2>Studio</h2>
            <ul>
              <li><Link to="/templates">All designs</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/guides">Guides</Link></li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={enquiryLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              {BUSINESS.instagram && (
                <li>
                  <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <p className="s-copy">
          © {new Date().getFullYear()} {BUSINESS.name}. Sample names in previews are demo content.
        </p>
      </div>
    </footer>
  );
}

// Breadcrumb trail; pair with breadcrumbLd() for search engines
export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs wrap" aria-label="Breadcrumb">
      <ol>
        {items.map(([label, to], i) => (
          <li key={to}>{i < items.length - 1 ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}
