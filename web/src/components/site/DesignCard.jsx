import { Link } from "react-router-dom";
import { WhatsAppIcon } from "./SiteChrome.jsx";
import { groupLabel } from "../../templates/index.js";
import { formatPrice, templatePrice } from "../../config/pricing.js";
import { customizeMessage, whatsappLink } from "../../config/business.js";
import { previewImage, previewUrl } from "../../utils/site.js";

// Collection card: a real screenshot of the opened invitation, occasion and starting price,
// name, one line about the design, then Preview and Customize.
export default function DesignCard({ template, eager = false }) {
  const price = templatePrice(template);
  const premium = !["essential", "start"].includes(template.tier);
  const priceText = price && formatPrice(price.amount);
  return (
    <article className="dcard">
      <Link to={previewUrl(template.key)} className="dcard-img">
        <img src={previewImage(template.key)} alt={`${template.name} invitation — open live preview`} width="585" height="1266" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />
        {premium && (
          <span className="tag" aria-hidden="true">
            Premium
          </span>
        )}
        <span className="dcard-view" aria-hidden="true">
          Open live preview
        </span>
      </Link>
      <div className="dcard-body">
        <p className="dcard-meta">
          <span>{groupLabel(template.group)}</span>
          {priceText && <span className="dcard-price">from {priceText}</span>}
        </p>
        <h3 className="dcard-name">
          <Link to={previewUrl(template.key)}>{template.name}</Link>
        </h3>
        <p className="dcard-desc">{template.description}</p>
        <div className="dcard-actions">
          <Link to={previewUrl(template.key)} className="a-preview">
            <span>Live preview</span>
          </Link>
          <a className="a-wa" href={whatsappLink(customizeMessage({ design: template.name, occasion: groupLabel(template.group), priceText }))} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={16} /> Customize
          </a>
        </div>
      </div>
    </article>
  );
}
