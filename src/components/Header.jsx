import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const ADMIN_TAP_COUNT = 3;
const ADMIN_TAP_WINDOW_MS = 800;
const FLIP_MS = 280;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const navigate = useNavigate();
  const tapCountRef = useRef(0);
  const tapResetTimerRef = useRef(null);

  function handleLogoClick(e) {
    tapCountRef.current += 1;

    if (tapCountRef.current >= ADMIN_TAP_COUNT) {
      e.preventDefault(); // skip the normal "go home" navigation this time
      clearTimeout(tapResetTimerRef.current);
      tapCountRef.current = 0;

      if (prefersReducedMotion()) {
        navigate("/admin/login");
      } else {
        setIsFlipping(true);
        setTimeout(() => navigate("/admin/login"), FLIP_MS);
      }
      return;
    }

    // Reset the count if the next tap doesn't come quickly enough — this
    // is what makes it a "triple-tap" instead of "any 3 clicks ever."
    clearTimeout(tapResetTimerRef.current);
    tapResetTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, ADMIN_TAP_WINDOW_MS);
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logoLink} onClick={handleLogoClick}>
          <img
            src="/logo/atclean-logo.svg"
            alt="ATClean"
            className={`${styles.logo} ${isFlipping ? styles.logoFlipOut : ""}`}
          />
        </Link>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <a href="/#services" onClick={() => setIsMenuOpen(false)}>
            Services
          </a>
          <a href="/#how-it-works" onClick={() => setIsMenuOpen(false)}>
            How It Works
          </a>
          <a href="/#news" onClick={() => setIsMenuOpen(false)}>
            News
          </a>
          <Link to="/testimonials" onClick={() => setIsMenuOpen(false)}>
            Testimonials
          </Link>
          <a href="/#faq" onClick={() => setIsMenuOpen(false)}>
            FAQ
          </a>
          <a
            href="/#contact"
            className={styles.ctaButtonMobile}
            onClick={() => setIsMenuOpen(false)}
          >
            Chat on WhatsApp
          </a>
        </nav>

        <a href="/#contact" className={styles.ctaButtonDesktop}>
          Chat on WhatsApp
        </a>
      </div>
    </header>
  );
}

export default Header;
