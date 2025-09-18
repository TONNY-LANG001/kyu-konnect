const API_URL = "http://localhost:5000/api";

export async function fetchHostels() {
  const res = await fetch(`${API_URL}/hostels`);
  return res.json();
}

export async function fetchMarketplace() {
  const res = await fetch(`${API_URL}/marketplace`);
  return res.json();
}

export async function fetchNotices() {
  const res = await fetch(`${API_URL}/notices`);
  return res.json();
}

export async function fetchBusinesses() {
  const res = await fetch(`${API_URL}/businesses`);
  return res.json();
}

export async function fetchEvents() {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
}
