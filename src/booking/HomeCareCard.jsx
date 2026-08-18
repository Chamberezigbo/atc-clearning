import { useState } from "react";
import { useBookingCalculator } from "./useBookingCalculator";
import BookingSummary from "./BookingSummary";
import BookingContactModal from "./BookingContactModal";
import { formatNaira } from "../utils/currency";
import styles from "./BookingCard.module.css";

function HomeCareCard({ services }) {
  const perUnitServices = services.filter((s) => s.pricingType === "PER_UNIT");
  const flatServices = services.filter((s) => s.pricingType === "FLAT");

  const { quantities, increment, decrement, toggleFlat, lineItems, total, reset } =
    useBookingCalculator(services);
  const [location, setLocation] = useState("");
  const [step, setStep] = useState("form"); // "form" | "summary" | "contact"

  const canBook = lineItems.length > 0 && location.trim().length > 0;

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
      <h3 className={styles.cardTitle}>Home Care</h3>

      {perUnitServices.length > 0 && (
        <div className={styles.grid}>
          {perUnitServices.map((service) => (
            <div key={service.id} className={styles.stepperTile}>
              <p className={styles.stepperLabel}>{service.name}</p>
              <div className={styles.stepperControls}>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={() => decrement(service.id)}
                  disabled={!quantities[service.id]}
                  aria-label={`Decrease ${service.name}`}
                >
                  −
                </button>
                <span className={styles.stepperValue}>{quantities[service.id] || 0}</span>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={() => increment(service.id)}
                  aria-label={`Increase ${service.name}`}
                >
                  +
                </button>
              </div>
              <p className={styles.stepperPrice}>
                {formatNaira(service.unitPrice)} /{service.unitLabel}
              </p>
            </div>
          ))}
        </div>
      )}

      {flatServices.length > 0 && (
        <div className={styles.checkboxList}>
          {flatServices.map((service) => (
            <label key={service.id} className={styles.checkboxRow}>
              <span className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={!!quantities[service.id]}
                  onChange={() => toggleFlat(service.id)}
                />
                {service.name}
              </span>
              <span className={styles.checkboxPrice}>{formatNaira(service.unitPrice)}</span>
            </label>
          ))}
        </div>
      )}

      <input
        type="text"
        placeholder="Location"
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

export default HomeCareCard;
