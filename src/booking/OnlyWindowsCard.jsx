import { useState } from "react";
import { useBookingCalculator } from "./useBookingCalculator";
import BookingSummary from "./BookingSummary";
import BookingContactModal from "./BookingContactModal";
import { formatNaira } from "../utils/currency";
import styles from "./BookingCard.module.css";

function OnlyWindowsCard({ services }) {
  const windowsService = services.find((s) => s.slug === "windows");

  const { quantities, increment, decrement, lineItems, total, reset } = useBookingCalculator(
    windowsService ? [windowsService] : [],
  );
  const [location, setLocation] = useState("");
  const [step, setStep] = useState("form");

  if (!windowsService) return null; // admin hasn't added a "windows" service yet

  const qty = quantities[windowsService.id] || 0;
  const canBook = qty > 0 && location.trim().length > 0;

  function handleBook() {
    if (canBook) setStep("summary");
  }

  function handleDone() {
    reset();
    setLocation("");
    setStep("form");
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Only Windows</h3>

      <div className={styles.grid}>
        <div className={styles.stepperTile}>
          <p className={styles.stepperLabel}>Windows</p>
          <div className={styles.stepperControls}>
            <button
              type="button"
              className={styles.stepperButton}
              onClick={() => decrement(windowsService.id)}
              disabled={!qty}
              aria-label="Decrease windows"
            >
              −
            </button>
            <span className={styles.stepperValue}>{qty}</span>
            <button
              type="button"
              className={styles.stepperButton}
              onClick={() => increment(windowsService.id)}
              aria-label="Increase windows"
            >
              +
            </button>
          </div>
          <p className={styles.stepperPrice}>
            {formatNaira(windowsService.unitPrice)} /{windowsService.unitLabel}
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Home address"
        className={styles.locationInput}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button className={styles.bookButton} onClick={handleBook} disabled={!canBook}>
        Book
      </button>

      {step === "summary" && (
        <BookingSummary
          lineItems={lineItems}
          total={total}
          location={location}
          onClose={() => setStep("form")}
          onContinue={() => setStep("contact")}
        />
      )}

      {step === "contact" && (
        <BookingContactModal
          category="HOME_CARE"
          location={location}
          lineItems={lineItems}
          onClose={handleDone}
        />
      )}
    </div>
  );
}

export default OnlyWindowsCard;
