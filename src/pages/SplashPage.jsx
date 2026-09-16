import { BrandFooter } from "../components/layout/BrandFooter";
import { ROUTES } from "../config/routes";

export function SplashPage() {
  return (
    <div className="brand-page splash">
      <img className="brand-art" src="/img.cv.png" alt="" />
      <header className="brand-lockup">
        <img src="/cv_mark.png" alt="" />
        <span className="brand-word">river valley<br />skyline</span>
      </header>
      <main className="splash-copy">
        <p className="brand-eyebrow">River Valley Skyline</p>
        <h1>AI-powered Security &<br />Surveillance Monitoring.</h1>
        <div><a className="brand-button" href={ROUTES.login}>Let's Start</a></div>
      </main>
      <BrandFooter />
    </div>
  );
}
