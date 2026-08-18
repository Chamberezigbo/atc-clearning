import { useEffect, useState } from "react";
import { fetchActiveServices } from "../api/services";
import HomeCareCard from "../booking/HomeCareCard";
import OnlyWindowsCard from "../booking/OnlyWindowsCard";
import CarCareCard from "../booking/CarCareCard";
import styles from "./BookingPage.module.css";

function BookingPage() {
  const [services, setServices] = useState(null); // null = still loading
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchActiveServices()
      .then(setServices)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="container section">
        <p className={styles.fallback}>
          Booking is temporarily unavailable — message us on WhatsApp instead and
          we'll sort you out directly.
        </p>
      </div>
    );
  }

  if (!services) {
    return null; // avoid a flash of empty content while loading
  }

  const homeCareServices = services.filter((s) => s.category === "HOME_CARE");
  const carCareServices = services.filter((s) => s.category === "CAR_CARE");

  if (homeCareServices.length === 0 && carCareServices.length === 0) {
    return (
      <div className="container section">
        <p className={styles.fallback}>
          Booking isn't set up yet — message us on WhatsApp and we'll help you
          directly.
        </p>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 className={styles.heading}>Book a Clean</h1>
      <p className={styles.subheading}>
        Pick what you need, see your total instantly, and we'll confirm the rest
        on WhatsApp.
      </p>

      <div className={styles.grid}>
        {homeCareServices.length > 0 && <HomeCareCard services={homeCareServices} />}
        {homeCareServices.length > 0 && <OnlyWindowsCard services={homeCareServices} />}
        {carCareServices.length > 0 && <CarCareCard services={carCareServices} />}
      </div>
    </div>
  );
}

export default BookingPage;
