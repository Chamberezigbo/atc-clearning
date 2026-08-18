import { useState } from "react";
import { useForm } from "react-hook-form";
import { createBooking } from "../api/bookings";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { formatNaira } from "../utils/currency";
import styles from "../components/WhatsAppLeadModal.module.css";

function buildBookingMessage(booking) {
  const lines = [`Hi ATClean! I'd like to book:`, ""];

  const heading = booking.category === "CAR_CARE" ? "Car Care" : "Home Care";
  lines.push(heading);
  for (const item of booking.lineItems) {
    lines.push(`- ${item.description} x${item.quantity} — ${formatNaira(item.unitPrice * item.quantity)}`);
  }

  lines.push("");
  lines.push(`TOTAL: ${formatNaira(booking.totalAmount)}`);
  lines.push(`Location: ${booking.location}`);
  lines.push(`Name: ${booking.name}`);

  return lines.join("\n");
}

function BookingContactModal({ category, location, lineItems, onClose }) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    setServerError("");
    try {
      // Store first — only build the WhatsApp message and redirect once
      // the booking is actually saved, and use the SERVER's response
      // (its authoritative prices/total) rather than local state, so the
      // message can never drift from what was actually recorded.
      const booking = await createBooking({
        name: data.name,
        email: data.email,
        phone: data.phone,
        location,
        category,
        lineItems: lineItems.map((item) => ({
          serviceId: item.serviceId,
          quantity: item.quantity,
        })),
      });

      window.open(buildWhatsAppUrl(buildBookingMessage(booking)), "_blank", "noopener,noreferrer");
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

        <h2 className={styles.heading}>Almost there</h2>
        <p className={styles.subheading}>
          Leave your details and we'll open WhatsApp with your booking summary.
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

export default BookingContactModal;
