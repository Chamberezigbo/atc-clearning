import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchApprovedTestimonials } from '../api/testimonials'
import styles from './Testimonials.module.css'

function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApprovedTestimonials()
      .then((data) => setTestimonials(data.slice(0, 4))) // just a teaser on the homepage
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading || testimonials.length === 0) {
    return null // nothing approved yet — hide rather than show an empty section
  }

  return (
    <section className="section">
      <div className="container">
        <p className={styles.eyebrow}>Testimonials</p>
        <h2 className={styles.heading}>What our clients say</h2>

        <div className={styles.grid}>
          {testimonials.map((t) => (
            <blockquote key={t.id} className={styles.card}>
              <p className={styles.message}>&ldquo;{t.message}&rdquo;</p>
              <footer className={styles.name}>— {t.authorName}</footer>
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
