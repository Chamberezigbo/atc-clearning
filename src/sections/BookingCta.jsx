import { Link } from "react-router-dom";
import styles from "./BookingCta.module.css";

function BookingCta() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <p className={styles.eyebrow}>Book Online</p>
        <h2 className={styles.heading}>Price out your clean in seconds</h2>
        <p className={styles.body}>
          Pick your rooms, add-ons, or a car wash, see your total instantly, and
          confirm the details on WhatsApp — no payment needed on the site.
        </p>
        <Link to="/booking" className={styles.button}>
          Start Your Booking
        </Link>
      </div>
    </section>
  );
}

export default BookingCta;
