import { useState } from "react";
import BookingSummary from "./BookingSummary";
import BookingContactModal from "./BookingContactModal";
import { formatNaira } from "../utils/currency";
import styles from "./BookingCard.module.css";

function CarCareCard({ services }) {
  const [selectedTierId, setSelectedTierId] = useState(services[0]?.id || null);
  const [carCount, setCarCount] = useState(0);
  const [location, setLocation] = useState("");
  const [step, setStep] = useState("form");

  if (services.length === 0) return null; // admin hasn't added Car Care services yet

  const selectedTier = services.find((s) => s.id === selectedTierId) || services[0];
  const canBook = carCount > 0 && location.trim().length > 0;

  const lineItems =
    carCount > 0
      ? [{ serviceId: selectedTier.id, quantity: carCount, service: selectedTier }]
      : [];
  const total = carCount * Number(selectedTier.unitPrice);

  function handleBook() {
    if (canBook) setStep("summary");
  }

  function handleDone() {
    setCarCount(0);
    setLocation("");
    setStep("form");
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Car Care</h3>

      <div className={styles.checkboxList}>
        {services.map((service) => (
          <label key={service.id} className={styles.checkboxRow}>
            <span className={styles.checkboxLabel}>
              <input
                type="radio"
                name="car-care-tier"
                checked={selectedTier.id === service.id}
                onChange={() => setSelectedTierId(service.id)}
              />
              {service.tierLabel}
            </span>
            <span className={styles.checkboxPrice}>
              {formatNaira(service.unitPrice)} /{service.unitLabel}
            </span>
          </label>
        ))}
      </div>

      <div className={styles.grid}>
        <div className={styles.stepperTile}>
          <p className={styles.stepperLabel}>Cars</p>
          <div className={styles.stepperControls}>
            <button
              type="button"
              className={styles.stepperButton}
              onClick={() => setCarCount((c) => Math.max(0, c - 1))}
              disabled={!carCount}
              aria-label="Decrease cars"
            >
              −
            </button>
            <span className={styles.stepperValue}>{carCount}</span>
            <button
              type="button"
              className={styles.stepperButton}
              onClick={() => setCarCount((c) => c + 1)}
              aria-label="Increase cars"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <input
        type="text"
        placeholder="Location"
        className={styles.locationInput}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <p className={styles.emptyNote} style={{ marginTop: "-0.75rem", marginBottom: "1rem" }}>
        Limited to AdaGeorge, Mgbuoba Axis.
      </p>

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
          category="CAR_CARE"
          location={location}
          lineItems={lineItems}
          onClose={handleDone}
        />
      )}
    </div>
  );
}

export default CarCareCard;
