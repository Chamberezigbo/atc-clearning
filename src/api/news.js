import { API_URL } from "../utils/apiUrl";

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Request failed");
  }
  return response.status === 204 ? null : response.json();
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

// Public
export async function fetchPublishedNews() {
  const response = await fetch(`${API_URL}/api/news`);
  return handleResponse(response);
}

// Admin
export async function fetchAllNews(token) {
  const response = await fetch(`${API_URL}/api/admin/news`, {
    headers: authHeaders(token),
  });
  return handleResponse(response);
}

export async function createNewsPost(token, { title, body, imageUrl }) {
  const response = await fetch(`${API_URL}/api/admin/news`, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, imageUrl }),
  });
  return handleResponse(response);
}

export async function updateNewsPost(token, id, { title, body, imageUrl }) {
  const response = await fetch(`${API_URL}/api/admin/news/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, imageUrl }),
  });
  return handleResponse(response);
}

export async function deleteNewsPost(token, id) {
  const response = await fetch(`${API_URL}/api/admin/news/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handleResponse(response);
}

export async function toggleNewsPublish(token, id) {
  const response = await fetch(`${API_URL}/api/admin/news/${id}/publish`, {
    method: "PATCH",
    headers: authHeaders(token),
  });
  return handleResponse(response);
}
