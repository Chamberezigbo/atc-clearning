import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logoLink}>
          <img
            src="/logo/atclean-logo.svg"
            alt="ATClean"
            className={styles.logo}
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
