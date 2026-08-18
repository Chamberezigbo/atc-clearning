import { useState } from "react";
import WhatsAppLeadModal from "../components/WhatsAppLeadModal";
import styles from "./ContactCta.module.css";

function ContactCta() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <h2 className={styles.heading}>Ready for a calmer space?</h2>
        <p className={styles.body}>
          Message us on WhatsApp and we'll take care of the rest.
        </p>
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Chat on WhatsApp
        </button>
      </div>

      {isModalOpen && (
        <WhatsAppLeadModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}

export default ContactCta;
