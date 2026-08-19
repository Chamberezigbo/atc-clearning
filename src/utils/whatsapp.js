export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "2340000000000";

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// For admin-side "message this lead" links — opens a chat TO an arbitrary
// number, not the business's own WHATSAPP_NUMBER above.
export function buildWhatsAppUrlTo(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// For sharing something (e.g. an invoice) when there's no number on file
// to target — api.whatsapp.com/send without a "phone" param opens WhatsApp
// with the message pre-filled and lets the admin pick who to send it to
// from their own contacts, instead of wa.me which requires a target number.
export function buildWhatsAppShareUrl(message) {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}
