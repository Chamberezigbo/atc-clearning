export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "2340000000000";

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
