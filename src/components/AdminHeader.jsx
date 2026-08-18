import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./AdminHeader.module.css";

function AdminHeader() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/admin" className={styles.brand}>
          <img
            src="/logo/atclean-logo.svg"
            alt="ATClean"
            className={styles.logo}
          />
          <span className={styles.badge}>Admin</span>
        </Link>

        {isAuthenticated && (
          <>
            <button
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>

            <nav
              className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
            >
              <NavLink
                to="/admin"
                end
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                News
              </NavLink>
              <NavLink
                to="/admin/hero-slides"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                Hero
              </NavLink>
              <NavLink
                to="/admin/services"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/admin/testimonials"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                Testimonials
              </NavLink>
              <NavLink
                to="/admin/leads"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                Leads
              </NavLink>
              <span className={styles.navLinkSoon}>
                Invoices <span className={styles.soonBadge}>Soon</span>
              </span>

              <button
                className={`${styles.logoutButton} ${styles.logoutButtonMobile}`}
                onClick={logout}
              >
                Log Out
              </button>
            </nav>

            <button
              className={`${styles.logoutButton} ${styles.logoutButtonDesktop}`}
              onClick={logout}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
