import { useEffect, useRef, useState } from "react";
import { BrandFooter } from "../components/layout/BrandFooter";
import { API_BASE, ROUTES, TOKEN_KEY } from "../config/routes";

export function LoginPage() {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    localStorage.removeItem(TOKEN_KEY);
    document.title = "River Valley Skyline";
    inputs.current[0]?.focus();
  }, []);

  async function submit(nextDigits = digits) {
    const pin = nextDigits.join("");
    if (pin.length !== 4 || busy) return;
    setBusy(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/auth/pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof payload.detail === "string" ? payload.detail : `Sign-in failed (${response.status})`);
      localStorage.setItem(TOKEN_KEY, payload.access_token || pin);
      location.replace(ROUTES.dashboard);
    } catch (err) {
      setBusy(false);
      setError(err.message);
      setDigits(["", "", "", ""]);
      setTimeout(() => inputs.current[0]?.focus(), 0);
    }
  }

  function setDigit(index, raw) {
    const value = raw.replace(/\D/g, "").slice(0, 1);
    const next = digits.map((digit, i) => (i === index ? value : digit));
    setDigits(next);
    if (value && index < 3) inputs.current[index + 1]?.focus();
    submit(next);
  }

  return (
    <div className="brand-page signin">
      <img className="brand-art" src="/cham-1.png" alt="" />
      <header className="brand-lockup">
        <img src="/cv_mark.png" alt="" />
        <span className="brand-word">river valley<br />skyline</span>
      </header>
      <main className="signin-panel">
        <h1 className="signin-title">River Valley Skyline</h1>
        <div className="signin-heading">
          <p className="signin-tenant">SECURITY CONTROL</p>
          <p className="signin-sub">Access Control</p>
          <p className="signin-hint">Administrator sign-in</p>
        </div>
        <form className={`signin-card ${error ? "shake" : ""}`} noValidate onSubmit={(event) => (event.preventDefault(), submit())}>
          <h2>Enter secure PIN</h2>
          <p>Use your 4-digit access code to continue.</p>
          <div className="pin-row">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => (inputs.current[index] = node)}
                className={digit ? "filled" : ""}
                type="password"
                inputMode="numeric"
                maxLength="1"
                autoComplete="off"
                aria-label={`PIN digit ${index + 1}`}
                disabled={busy}
                value={digit}
                onChange={(event) => setDigit(index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
                  if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
                  if (event.key === "ArrowRight" && index < 3) inputs.current[index + 1]?.focus();
                }}
                onPaste={(event) => {
                  event.preventDefault();
                  const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4 - index);
                  if (!pasted) return;
                  const next = [...digits];
                  pasted.split("").forEach((digit, offset) => {
                    next[index + offset] = digit;
                  });
                  setDigits(next);
                  inputs.current[Math.min(index + pasted.length, 3)]?.focus();
                  submit(next);
                }}
              />
            ))}
          </div>
          <p className="pin-error" role="alert">{error}</p>
          <a className="pin-back" href={ROUTES.home}>Back</a>
        </form>
        <p className="signin-legal">Copyright 2026 canaryvision. All rights reserved.</p>
      </main>
      <BrandFooter />
    </div>
  );
}
