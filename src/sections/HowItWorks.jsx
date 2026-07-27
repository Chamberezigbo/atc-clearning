import styles from './HowItWorks.module.css'

const steps = [
  { number: '01', title: 'Book', description: 'Message us on WhatsApp with your details and preferred time.' },
  { number: '02', title: 'We Clean', description: 'Our trained team arrives on time and takes care of everything.' },
  { number: '03', title: 'You Relax', description: 'Come home to a fresh, spotless space — and breathe easy.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <p className={styles.eyebrow}>How It Works</p>
        <h2 className={styles.heading}>Three simple steps to a calmer home</h2>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
