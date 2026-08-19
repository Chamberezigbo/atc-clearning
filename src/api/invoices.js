import { API_URL } from "../utils/apiUrl";

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Request failed')
  }
  return response.json()
}

export async function fetchAllInvoices(token) {
  const response = await fetch(`${API_URL}/api/admin/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse(response)
}

export async function createInvoice(token, data) {
  const response = await fetch(`${API_URL}/api/admin/invoices`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

// The PDF endpoint requires an Authorization header, which a plain
// <a href> download link can't send — fetch it as a blob instead and
// trigger the save via a temporary object URL.
export async function downloadInvoicePdf(token, id) {
  const response = await fetch(`${API_URL}/api/admin/invoices/${id}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) {
    throw new Error('Failed to download PDF')
  }
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `invoice-${id.slice(0, 8)}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}

export async function sendInvoiceEmail(token, id) {
  const response = await fetch(`${API_URL}/api/admin/invoices/${id}/send-email`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse(response)
}
