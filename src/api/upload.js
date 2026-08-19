import { API_URL } from "../utils/apiUrl";

async function postImage(url, file, token) {
  const formData = new FormData()
  formData.append('image', file)

  const headers = token ? { Authorization: `Bearer ${token}` } : {}

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData, // no Content-Type header — the browser sets the multipart boundary itself
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Upload failed')
  }

  return response.json() // { url }
}

export function uploadNewsImage(token, file) {
  return postImage(`${API_URL}/api/admin/uploads/image`, file, token)
}

export function uploadTestimonialPhoto(file) {
  return postImage(`${API_URL}/api/uploads/testimonial-photo`, file, null)
}
