import { formatNaira } from "../utils/currency";
import styles from "./BookingSummary.module.css";

function BookingSummary({ lineItems, total, location, onClose, onContinue }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h2 className={styles.heading}>Your Booking</h2>

        <div className={styles.list}>
          {lineItems.map((item) => (
            <div key={item.serviceId} className={styles.item}>
              <span className={styles.itemLabel}>
                {item.service.name}
                {item.service.tierLabel ? ` — ${item.service.tierLabel}` : ""} × {item.quantity}
              </span>
              <span className={styles.itemPrice}>
                {formatNaira(item.quantity * Number(item.service.unitPrice))}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.totalRow}>
          <span>Total</span>
          <span>{formatNaira(total)}</span>
        </div>

        <p className={styles.locationRow}>Location: {location}</p>

        <button className={styles.continueButton} onClick={onContinue}>
          Continue on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
