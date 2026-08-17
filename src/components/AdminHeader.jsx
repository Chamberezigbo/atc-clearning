import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./AdminHeader.module.css";

function AdminHeader() {
  const { isAuthenticated, logout } = useAuth();

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
            <nav className={styles.nav}>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                News
              </NavLink>
              <span className={styles.navLinkSoon}>
                Testimonials <span className={styles.soonBadge}>Soon</span>
              </span>
              <span className={styles.navLinkSoon}>
                Leads <span className={styles.soonBadge}>Soon</span>
              </span>
              <span className={styles.navLinkSoon}>
                Invoices <span className={styles.soonBadge}>Soon</span>
              </span>
            </nav>

            <button className={styles.logoutButton} onClick={logout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
