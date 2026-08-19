import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { emailLead } from "../api/leads";
import styles from "../components/WhatsAppLeadModal.module.css";

function EmailLeadModal({ lead, onClose }) {
  const { token } = useAuth();
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      subject: "Following up on your ATClean inquiry",
      message: `Hi ${lead.name},\n\nJust checking in about your cleaning request. Let us know a good time and we'll get it sorted!\n\n- ATClean`,
    },
  });

  async function onSubmit(data) {
    setServerError("");
    try {
      await emailLead(token, lead.id, data);
      setSent(true);
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

        <h2 className={styles.heading}>Email {lead.name}</h2>
        <p className={styles.subheading}>Sending to {lead.email}</p>

        {sent ? (
          <p className={styles.subheading}>Sent!</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <input
              type="text"
              placeholder="Subject"
              className={styles.input}
              {...register("subject", { required: true })}
            />
            {errors.subject && <p className={styles.fieldError}>Subject is required</p>}

            <textarea
              placeholder="Message"
              className={styles.input}
              rows={6}
              {...register("message", { required: true })}
            />
            {errors.message && <p className={styles.fieldError}>Message is required</p>}

            {serverError && <p className={styles.fieldError}>{serverError}</p>}

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              Send Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EmailLeadModal;
