import { useState } from "react";

export default function LeadForm({ plain = false, showInterest = false, autoFocus = false, onDone }) {
  const [values, setValues] = useState({ name: "", phone: "", interest: "A plot", message: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[0-9+\-\s]{10,15}$/.test(values.phone.trim())) next.phone = "Enter a phone number with 10 digits.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setValues({ name: "", phone: "", interest: "A plot", message: "" });
    onDone?.(values);
  }

  const nameField = (
    <div className="field">
      <label htmlFor="lead-name">Your name</label>
      <input id="lead-name" autoComplete="name" autoFocus={autoFocus} value={values.name} onChange={set("name")} aria-invalid={!!errors.name} />
      <span className="err">{errors.name}</span>
    </div>
  );
  const phoneField = (
    <div className="field">
      <label htmlFor="lead-phone">Phone number</label>
      <input id="lead-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} />
      <span className="err">{errors.phone}</span>
    </div>
  );

  return (
    <form className="form" noValidate onSubmit={submit} style={plain ? { border: 0, padding: "1rem 0 0" } : undefined}>
      {showInterest ? <div className="row">{nameField}{phoneField}</div> : <>{nameField}{phoneField}</>}
      {showInterest && (
        <div className="field">
          <label htmlFor="lead-interest">I'm looking for</label>
          <select id="lead-interest" value={values.interest} onChange={set("interest")}>
            <option>A plot</option><option>A house</option><option>Not sure yet</option>
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor="lead-msg">Message (optional)</label>
        <textarea id="lead-msg" rows={showInterest ? 3 : 2} value={values.message} onChange={set("message")} />
      </div>
      <button className="btn btn--solid" type="submit">Request a callback</button>
    </form>
  );
}
