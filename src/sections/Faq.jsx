import styles from './Faq.module.css'

const faqs = [
  { q: 'What areas do you serve?', a: "We currently serve the greater metro area — message us on WhatsApp to confirm we cover your location." },
  { q: 'Do I need to be home during the clean?', a: 'No — many clients provide access instructions and go about their day. Whatever works for you.' },
  { q: 'What products do you use?', a: 'Eco-friendly, non-toxic products by default. Let us know if you have specific preferences or allergies.' },
  { q: 'How do I book?', a: "Tap \"Chat on WhatsApp\" anywhere on this page and we'll sort out the details with you directly." },
]

function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <p className={styles.eyebrow}>FAQ</p>
        <h2 className={styles.heading}>Common questions</h2>

        <div className={styles.list}>
          {faqs.map((item) => (
            /* <details>/<summary> gives us an accordion natively — no JS state needed */
            <details key={item.q} className={styles.item}>
              <summary className={styles.question}>{item.q}</summary>
              <p className={styles.answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
