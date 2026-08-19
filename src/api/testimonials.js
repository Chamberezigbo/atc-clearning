import { API_URL } from "../utils/apiUrl";

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Request failed')
  }
  return response.status === 204 ? null : response.json()
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` }
}

// Public
export async function fetchApprovedTestimonials() {
  const response = await fetch(`${API_URL}/api/testimonials`)
  return handleResponse(response)
}

export async function submitTestimonial({ authorName, message, authorPhotoUrl }) {
  const response = await fetch(`${API_URL}/api/testimonials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ authorName, message, authorPhotoUrl }),
  })
  return handleResponse(response)
}

// Admin
export async function fetchAllTestimonials(token) {
  const response = await fetch(`${API_URL}/api/admin/testimonials`, {
    headers: authHeaders(token),
  })
  return handleResponse(response)
}

export async function approveTestimonial(token, id) {
  const response = await fetch(`${API_URL}/api/admin/testimonials/${id}/approve`, {
    method: 'PATCH',
    headers: authHeaders(token),
  })
  return handleResponse(response)
}

export async function rejectTestimonial(token, id) {
  const response = await fetch(`${API_URL}/api/admin/testimonials/${id}/reject`, {
    method: 'PATCH',
    headers: authHeaders(token),
  })
  return handleResponse(response)
}

export async function deleteTestimonial(token, id) {
  const response = await fetch(`${API_URL}/api/admin/testimonials/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
  return handleResponse(response)
}
