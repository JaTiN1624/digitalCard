import { useState } from "react";
import { submitRsvp } from "../../services/invitation.service.js";

const OPTIONS = [
  { value: "ATTENDING", label: "Joyfully attending" },
  { value: "MAYBE", label: "Not sure yet" },
  { value: "NOT_ATTENDING", label: "Regretfully declining" },
];

const THANK_YOU = {
  ATTENDING: "We can't wait to celebrate with you!",
  MAYBE: "Thank you for letting us know. We hope you can make it!",
  NOT_ATTENDING: "We'll miss you. Thank you for letting us know.",
};

const EMPTY = { name: "", phone: "", attendance: "ATTENDING", guestCount: 1, message: "" };

export default function RsvpForm({ slug }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const declining = form.attendance === "NOT_ATTENDING";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    try {
      await submitRsvp(slug, {
        name: form.name.trim(),
        phone: form.phone.replace(/[\s-]/g, ""),
        attendance: form.attendance,
        guestCount: declining ? 0 : Number(form.guestCount),
        message: form.message.trim() || undefined,
      });
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(err.message);
      setFieldErrors(err.details ?? {});
    }
  }

  if (status === "success") {
    return (
      <div className="rsvp-success" role="status">
        <h3>Thank you, {form.name.trim()}!</h3>
        <p>{THANK_YOU[form.attendance]}</p>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
      <h3>Will you join us?</h3>

      <label>
        Your name
        <input value={form.name} onChange={update("name")} required maxLength={200} autoComplete="name" />
        {fieldErrors.name && <span className="field-error">{fieldErrors.name[0]}</span>}
      </label>

      <label>
        Phone number
        <input
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          required
          placeholder="9876543210"
          autoComplete="tel"
          inputMode="tel"
        />
        {fieldErrors.phone && <span className="field-error">{fieldErrors.phone[0]}</span>}
      </label>

      <fieldset>
        <legend>Your response</legend>
        {OPTIONS.map((o) => (
          <label key={o.value} className="radio">
            <input
              type="radio"
              name="attendance"
              value={o.value}
              checked={form.attendance === o.value}
              onChange={update("attendance")}
            />
            {o.label}
          </label>
        ))}
      </fieldset>

      {!declining && (
        <label>
          Number of guests (including you)
          <input type="number" min={1} max={20} value={form.guestCount} onChange={update("guestCount")} />
          {fieldErrors.guestCount && <span className="field-error">{fieldErrors.guestCount[0]}</span>}
        </label>
      )}

      <label>
        Message for the couple (optional)
        <textarea value={form.message} onChange={update("message")} rows={3} maxLength={1000} />
      </label>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}
