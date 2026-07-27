import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logoLink}>
          <img src="/logo/atc-logo.svg" alt="All Time Cleaning" className={styles.logo} />
        </Link>

        <nav className={styles.nav}>
          <a href="/#services">Services</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#news">News</a>
          <Link to="/testimonials">Testimonials</Link>
          <a href="/#faq">FAQ</a>
        </nav>

        <a href="/#contact" className={styles.ctaButton}>
          Chat on WhatsApp
        </a>
      </div>
    </header>
  )
}

export default Header
