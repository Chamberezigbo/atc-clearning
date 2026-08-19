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
export async function fetchActiveServices() {
  const response = await fetch(`${API_URL}/api/services`)
  return handleResponse(response)
}

// Admin
export async function fetchAllServices(token) {
  const response = await fetch(`${API_URL}/api/admin/services`, {
    headers: authHeaders(token),
  })
  return handleResponse(response)
}

export async function createService(token, data) {
  const response = await fetch(`${API_URL}/api/admin/services`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function updateService(token, id, data) {
  const response = await fetch(`${API_URL}/api/admin/services/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function deleteService(token, id) {
  const response = await fetch(`${API_URL}/api/admin/services/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
  return handleResponse(response)
}

export async function toggleServiceActive(token, id) {
  const response = await fetch(`${API_URL}/api/admin/services/${id}/toggle-active`, {
    method: 'PATCH',
    headers: authHeaders(token),
  })
  return handleResponse(response)
}
