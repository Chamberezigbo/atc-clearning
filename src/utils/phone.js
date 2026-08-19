// Customers type their phone number however they like — normalize to the
// international format wa.me links require (no leading 0, no "+").
// Heuristic tuned for this business's market (Nigeria): an 11-digit
// number starting with 0 gets its 0 swapped for the 234 country code;
// anything else is assumed to already include a country code.
export function toWhatsAppNumber(phone) {
  const digits = phone.replace(/\D/g, "")
  if (digits.startsWith("0") && digits.length === 11) {
    return `234${digits.slice(1)}`
  }
  return digits
}
