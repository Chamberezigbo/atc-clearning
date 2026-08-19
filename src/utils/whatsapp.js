export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "2340000000000";

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// For admin-side "message this lead" links — opens a chat TO an arbitrary
// number, not the business's own WHATSAPP_NUMBER above.
export function buildWhatsAppUrlTo(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
