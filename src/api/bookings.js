import { API_URL } from "../utils/apiUrl";

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Request failed')
  }
  return response.json()
}

// Public
export async function createBooking(data) {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

// Admin
export async function fetchAllBookings(token) {
  const response = await fetch(`${API_URL}/api/admin/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse(response)
}

export async function updateBookingStatus(token, id, status) {
  const response = await fetch(`${API_URL}/api/admin/bookings/${id}/status`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  return handleResponse(response)
}
