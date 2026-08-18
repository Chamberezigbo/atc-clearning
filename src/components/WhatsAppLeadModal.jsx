import { useState } from "react";
import { useForm } from "react-hook-form";
import { createLead } from "../api/leads";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import styles from "./WhatsAppLeadModal.module.css";

function WhatsAppLeadModal({ onClose }) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    setServerError("");
    try {
      await createLead(data);
      // Redirect only happens after the lead is successfully stored.
      window.open(
        buildWhatsAppUrl(`Hi ATClean, I'd like to book a clean! - ${data.name}`),
        "_blank",
        "noopener,noreferrer",
      );
      onClose();
    } catch (err) {
      setServerError(err.message);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h2 className={styles.heading}>Let's get you booked</h2>
        <p className={styles.subheading}>
          Leave your details and we'll open WhatsApp to finish up.
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="Full name"
            className={styles.input}
            {...register("name", { required: true })}
          />
          {errors.name && <p className={styles.fieldError}>Name is required</p>}

          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            {...register("email", { required: true })}
          />
          {errors.email && <p className={styles.fieldError}>Email is required</p>}

          <input
            type="tel"
            placeholder="Phone number"
            className={styles.input}
            {...register("phone", { required: true })}
          />
          {errors.phone && <p className={styles.fieldError}>Phone number is required</p>}

          {serverError && <p className={styles.fieldError}>{serverError}</p>}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            Continue to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

export default WhatsAppLeadModal;
