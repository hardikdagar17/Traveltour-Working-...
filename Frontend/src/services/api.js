const API_BASE = `${import.meta.env.VITE_API_URL || ''}/api`;

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/stats`);
  return res.json();
}

export async function fetchDestinations() {
  const res = await fetch(`${API_BASE}/destinations`);
  return res.json();
}

export async function fetchPackages(region = 'all', search = '') {
  const params = new URLSearchParams();
  if (region && region !== 'all') params.append('region', region);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/packages?${params.toString()}`);
  return res.json();
}

export async function fetchPackageById(id) {
  const res = await fetch(`${API_BASE}/packages/${id}`);
  return res.json();
}

export async function fetchGuides() {
  const res = await fetch(`${API_BASE}/guides`);
  return res.json();
}

export async function calculateCost(payload) {
  const res = await fetch(`${API_BASE}/calculate-cost`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function submitBooking(payload) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function submitInquiry(payload) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`${API_BASE}/reviews`);
  return res.json();
}

export async function postReview(payload) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
