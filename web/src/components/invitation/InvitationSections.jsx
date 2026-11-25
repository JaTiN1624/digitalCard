import SaveTheDate from "./sections/SaveTheDate.jsx";
import EventsSection from "./sections/EventsSection.jsx";
import StorySection from "./sections/StorySection.jsx";
import GallerySection from "./sections/GallerySection.jsx";
import { MessageSection, ReceptionSection, TravelSection, VenueSection } from "./sections/DetailSections.jsx";
import { RsvpSection, ShareSection, ThankYouSection } from "./sections/ClosingSections.jsx";
import { CakeSection, CelebrateSection, DressCodeSection, HostContactSection } from "./sections/BirthdaySections.jsx";
import { isHidden } from "../../utils/invitation.js";

// Everything below the hero, shared by all templates. Each template picks the order and a few
// options; every section hides itself when its data is missing or when the customer switched
// it off in config.hiddenSections.
//
// options: { ribbon, dateCelebrate, eventsLayout, eventsPreset, fallbackIcon, ornament, emblem, showMap }
// Birthday-only sections: cake, celebrate, dressCode, contact
// `divider` (older prop) is used as the heading ornament.

const DEFAULT_ORDER = ["message", "date", "events", "story", "gallery", "reception", "venue", "rsvp", "share", "thanks"];

const SECTIONS = {
  message: (p) => <MessageSection {...p} />,
  date: (p) => <SaveTheDate {...p} ribbon={p.options.ribbon} celebrateOnView={p.options.dateCelebrate} />,
  events: (p) => <EventsSection {...p} layout={p.options.eventsLayout} preset={p.options.eventsPreset} fallbackIcon={p.options.fallbackIcon} />,
  story: (p) => <StorySection {...p} />,
  gallery: (p) => <GallerySection {...p} />,
  reception: (p) => <ReceptionSection {...p} emblem={p.options.emblem} />,
  venue: (p) => <VenueSection {...p} showMap={p.options.showMap ?? true} />,
  travel: (p) => <TravelSection {...p} />,
  rsvp: (p) => <RsvpSection {...p} />,
  share: (p) => <ShareSection {...p} />,
  thanks: (p) => <ThankYouSection {...p} emblem={p.options.emblem} />,
  cake: (p) => <CakeSection {...p} />,
  celebrate: (p) => <CelebrateSection {...p} />,
  dressCode: (p) => <DressCodeSection {...p} />,
  contact: (p) => <HostContactSection {...p} />,
};

export default function InvitationSections({ invitation, t, preview, divider = null, order = DEFAULT_ORDER, options = {} }) {
  const props = { invitation, t, preview, ornament: options.ornament ?? divider ?? undefined, options };
  return (
    <div className="sections">
      {order
        .filter((key) => SECTIONS[key] && !isHidden(invitation, key))
        .map((key) => (
          <SectionSlot key={key} render={SECTIONS[key]} props={props} />
        ))}
    </div>
  );
}

const SectionSlot = ({ render, props }) => render(props);
