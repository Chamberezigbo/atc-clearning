const API_URL = import.meta.env.VITE_API_URL

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Request failed')
  }
  return response.json()
}

// Public
export async function createLead({ name, email, phone, message }) {
  const response = await fetch(`${API_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, message }),
  })
  return handleResponse(response)
}

// Admin
export async function fetchAllLeads(token) {
  const response = await fetch(`${API_URL}/api/admin/leads`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse(response)
}

export async function emailLead(token, id, { subject, message }) {
  const response = await fetch(`${API_URL}/api/admin/leads/${id}/email`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, message }),
  })
  return handleResponse(response)
}
