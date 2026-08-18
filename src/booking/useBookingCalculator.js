import { useMemo, useState } from "react";

// Generic quantity-per-service accumulator, shared by all three booking
// cards. A service is "in the cart" whenever its quantity is > 0 --
// there's no separate checked/unchecked flag, a FLAT service's checkbox
// just sets its quantity to 0 or 1.
export function useBookingCalculator(services) {
  const [quantities, setQuantities] = useState({});

  function setQuantity(serviceId, qty) {
    const clamped = Math.max(0, qty);
    setQuantities((prev) => ({ ...prev, [serviceId]: clamped }));
  }

  function increment(serviceId) {
    setQuantities((prev) => ({ ...prev, [serviceId]: (prev[serviceId] || 0) + 1 }));
  }

  function decrement(serviceId) {
    setQuantities((prev) => ({
      ...prev,
      [serviceId]: Math.max(0, (prev[serviceId] || 0) - 1),
    }));
  }

  function toggleFlat(serviceId) {
    setQuantities((prev) => ({
      ...prev,
      [serviceId]: prev[serviceId] ? 0 : 1,
    }));
  }

  function reset() {
    setQuantities({});
  }

  const serviceById = useMemo(() => new Map(services.map((s) => [s.id, s])), [services]);

  const lineItems = useMemo(
    () =>
      Object.entries(quantities)
        .filter(([, qty]) => qty > 0)
        .map(([serviceId, quantity]) => ({ serviceId, quantity, service: serviceById.get(serviceId) }))
        .filter((item) => item.service), // drop any stale ids not in the current service list
    [quantities, serviceById],
  );

  const total = useMemo(
    () => lineItems.reduce((sum, item) => sum + item.quantity * Number(item.service.unitPrice), 0),
    [lineItems],
  );

  return { quantities, setQuantity, increment, decrement, toggleFlat, reset, lineItems, total };
}
