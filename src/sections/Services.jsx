import styles from './Services.module.css'

const services = [
  {
    title: 'Home Cleaning',
    description: 'Regular or one-time cleaning for every room, tailored to your routine.',
  },
  {
    title: 'Deep Cleaning',
    description: 'A thorough top-to-bottom clean for spaces that need extra attention.',
  },
  {
    title: 'Office Cleaning',
    description: 'Keep your workplace fresh and welcoming for staff and clients alike.',
  },
  {
    title: 'Move In / Move Out',
    description: 'Start or leave a space spotless, without lifting a finger.',
  },
]

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <p className={styles.eyebrow}>What We Offer</p>
        <h2 className={styles.heading}>Services built around your peace of mind</h2>

        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardBody}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
