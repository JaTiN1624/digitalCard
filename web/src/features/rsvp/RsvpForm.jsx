import { useState } from "react";
import { submitRsvp } from "../../services/invitation.service.js";

const OPTIONS = [
  { value: "ATTENDING", label: "rsvp.attending" },
  { value: "MAYBE", label: "rsvp.maybe" },
  { value: "NOT_ATTENDING", label: "rsvp.declining" },
];

const THANK_YOU = {
  ATTENDING: "rsvp.thanksAttending",
  MAYBE: "rsvp.thanksMaybe",
  NOT_ATTENDING: "rsvp.thanksDeclining",
};

const PHONE_RE = /^\+?[0-9]{10,15}$/;
const EMPTY = { name: "", phone: "", attendance: "ATTENDING", guestCount: 1, message: "" };

const cleanPhone = (phone) => phone.replace(/[\s-]/g, "");

function validate(form, declining) {
  const errors = {};
  if (!form.name.trim()) errors.name = "rsvp.nameRequired";
  if (!PHONE_RE.test(cleanPhone(form.phone))) errors.phone = "rsvp.invalidPhone";
  const guests = Number(form.guestCount);
  if (!declining && (!Number.isInteger(guests) || guests < 1 || guests > 20)) {
    errors.guestCount = "rsvp.invalidGuests";
  }
  return errors;
}

// Map an API error to a translated message key
function errorKey(err) {
  if (err.status === 409) return "rsvp.duplicate";
  if (err.status === 0) return "rsvp.offline";
  if (err.details?.phone) return "rsvp.invalidPhone";
  return "rsvp.error";
}

export default function RsvpForm({ slug, t, preview = false, onSuccess }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [error, setError] = useState(null); // translation key
  const [fieldErrors, setFieldErrors] = useState({}); // field -> translation key

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const declining = form.attendance === "NOT_ATTENDING";

  async function handleSubmit(e) {
    e.preventDefault();
    if (preview) return;

    const errors = validate(form, declining);
    setFieldErrors(errors);
    setError(null);
    if (Object.keys(errors).length) return;

    setStatus("submitting");
    try {
      await submitRsvp(slug, {
        name: form.name.trim(),
        phone: cleanPhone(form.phone),
        attendance: form.attendance,
        guestCount: declining ? 0 : Number(form.guestCount),
        message: form.message.trim() || undefined,
      });
      setStatus("success");
      onSuccess?.(form.attendance);
    } catch (err) {
      setStatus("idle");
      setError(errorKey(err));
    }
  }

  if (status === "success") {
    return (
      <div className="rsvp-success" role="status">
        <h3>{t("rsvp.thanks", { name: form.name.trim() })}</h3>
        <p>{t(THANK_YOU[form.attendance])}</p>
      </div>
    );
  }

  const fieldError = (field) =>
    fieldErrors[field] && (
      <span className="field-error" id={`rsvp-${field}-error`}>
        {t(fieldErrors[field])}
      </span>
    );
  const describedBy = (field) => (fieldErrors[field] ? `rsvp-${field}-error` : undefined);

  return (
    <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
      <h3>{t("rsvp.title")}</h3>

      <label>
        {t("rsvp.name")}
        <input
          value={form.name}
          onChange={update("name")}
          maxLength={200}
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={describedBy("name")}
        />
        {fieldError("name")}
      </label>

      <label>
        {t("rsvp.phone")}
        <input
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          placeholder="9876543210"
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={describedBy("phone")}
        />
        {fieldError("phone")}
      </label>

      <fieldset>
        <legend>{t("rsvp.response")}</legend>
        {OPTIONS.map((o) => (
          <label key={o.value} className="radio">
            <input
              type="radio"
              name="attendance"
              value={o.value}
              checked={form.attendance === o.value}
              onChange={update("attendance")}
            />
            {t(o.label)}
          </label>
        ))}
      </fieldset>

      {!declining && (
        <label>
          {t("rsvp.guestCount")}
          <input
            type="number"
            min={1}
            max={20}
            value={form.guestCount}
            onChange={update("guestCount")}
            aria-invalid={Boolean(fieldErrors.guestCount)}
            aria-describedby={describedBy("guestCount")}
          />
          {fieldError("guestCount")}
        </label>
      )}

      <label>
        {t("rsvp.message")}
        <textarea value={form.message} onChange={update("message")} rows={3} maxLength={1000} />
      </label>

      {error && (
        <p className="form-error" role="alert">
          {t(error)}
        </p>
      )}
      {preview && <p className="preview-note">{t("rsvp.previewNote")}</p>}

      <button type="submit" disabled={preview || status === "submitting"}>
        {status === "submitting" ? t("rsvp.sending") : t("rsvp.submit")}
      </button>
    </form>
  );
}
