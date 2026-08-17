import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <img
          src="/logo/atclean-logo.svg"
          alt="ATClean"
          className={styles.logo}
        />

        <nav className={styles.links}>
          <a href="/#services">Services</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#faq">FAQ</a>
          <a href="/#contact">Contact</a>
        </nav>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} ATClean. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
