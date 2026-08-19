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
export async function fetchActiveHeroSlides() {
  const response = await fetch(`${API_URL}/api/hero-slides`)
  return handleResponse(response)
}

// Admin
export async function fetchAllHeroSlides(token) {
  const response = await fetch(`${API_URL}/api/admin/hero-slides`, {
    headers: authHeaders(token),
  })
  return handleResponse(response)
}

export async function createHeroSlide(token, { tip, imageUrl, order }) {
  const response = await fetch(`${API_URL}/api/admin/hero-slides`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ tip, imageUrl, order }),
  })
  return handleResponse(response)
}

export async function updateHeroSlide(token, id, { tip, imageUrl, order }) {
  const response = await fetch(`${API_URL}/api/admin/hero-slides/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ tip, imageUrl, order }),
  })
  return handleResponse(response)
}

export async function deleteHeroSlide(token, id) {
  const response = await fetch(`${API_URL}/api/admin/hero-slides/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
  return handleResponse(response)
}

export async function toggleHeroSlideActive(token, id) {
  const response = await fetch(`${API_URL}/api/admin/hero-slides/${id}/toggle-active`, {
    method: 'PATCH',
    headers: authHeaders(token),
  })
  return handleResponse(response)
}
