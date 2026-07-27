import { Link } from 'react-router-dom'
import styles from './Testimonials.module.css'

// Placeholder data — replaced with a live fetch of approved testimonials in Phase 6.
const placeholderTestimonials = [
  { id: 1, name: 'Amaka O.', message: 'They treat my home like it\'s their own. Always calm, always thorough.' },
  { id: 2, name: 'David K.', message: 'Booking on WhatsApp is so easy, and the team is incredibly professional.' },
]

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <p className={styles.eyebrow}>Testimonials</p>
        <h2 className={styles.heading}>What our clients say</h2>

        <div className={styles.grid}>
          {placeholderTestimonials.map((t) => (
            <blockquote key={t.id} className={styles.card}>
              <p className={styles.message}>&ldquo;{t.message}&rdquo;</p>
              <footer className={styles.name}>— {t.name}</footer>
            </blockquote>
          ))}
        </div>

        <div className={styles.linkWrap}>
          <Link to="/testimonials" className={styles.link}>
            Read more / share your experience →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
