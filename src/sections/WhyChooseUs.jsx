import styles from './WhyChooseUs.module.css'

const reasons = [
  { title: 'Vetted & Trained Staff', description: 'Every cleaner is background-checked and trained to our standards.' },
  { title: 'Eco-Friendly Products', description: 'Safe for your family, pets, and the planet — no harsh chemicals.' },
  { title: 'Satisfaction Guaranteed', description: "Not happy with a clean? We'll make it right, no questions asked." },
  { title: 'Fully Insured', description: 'Full coverage on every job, for total peace of mind.' },
]

function WhyChooseUs() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <p className={styles.eyebrow}>Why Choose Us</p>
        <h2 className={styles.heading}>Cleaning you can trust, calm you can feel</h2>

        <div className={styles.grid}>
          {reasons.map((reason) => (
            <div key={reason.title} className={styles.item}>
              <h3 className={styles.itemTitle}>{reason.title}</h3>
              <p className={styles.itemBody}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
