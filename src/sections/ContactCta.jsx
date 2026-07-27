import styles from './ContactCta.module.css'

// TEMPORARY: direct wa.me link. Phase 5 replaces this with a form that
// collects name/email/phone first, then redirects only after a successful submit.
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '2340000000000'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi All Time Cleaning, I'd like to book a clean!"
)}`

function ContactCta() {
  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <h2 className={styles.heading}>Ready for a calmer space?</h2>
        <p className={styles.body}>
          Message us on WhatsApp and we'll take care of the rest.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.button}>
          Chat on WhatsApp
        </a>
      </div>
    </section>
  )
}

export default ContactCta
