/// <reference types="vite/client" />

/**
 * API Client for KWT Melati Sorgum Back-End
 * Handles all HTTP requests to the Express server
 */

const API_BASE = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

// Products
export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return handleResponse<any[]>(res);
}

export async function fetchProductById(id: number) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  return handleResponse<any>(res);
}

// News
export async function fetchNews() {
  const res = await fetch(`${API_BASE}/news`);
  return handleResponse<any[]>(res);
}

export async function fetchNewsById(id: number) {
  const res = await fetch(`${API_BASE}/news/${id}`);
  return handleResponse<any>(res);
}

// Gallery
export async function fetchGallery() {
  const res = await fetch(`${API_BASE}/gallery`);
  return handleResponse<any[]>(res);
}

// Stats
export async function fetchStats() {
  const res = await fetch(`${API_BASE}/stats`);
  return handleResponse<any[]>(res);
}

// Contact
export async function submitContact(data: { name: string; phone: string; message: string }) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Gagal mengirim pesan' }));
    throw new Error(error.message);
  }
  return res.json();
}

// Health Check
export async function checkApiHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

// --- Headless CMS Integration ---

const CMS_API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://uni-verse-headless-cms.onrender.com/api/v1';
const CMS_API_KEY = import.meta.env.VITE_CMS_API_KEY || 'uni_d128126206278d0d68e709bba04e854eb3462aec446ed16c';

async function fetchFromCMS<T>(endpoint: string): Promise<T> {
  if (!CMS_API_BASE || !CMS_API_KEY) {
    throw new Error('CMS Environment variables are not set');
  }

  const res = await fetch(`${CMS_API_BASE}${endpoint}`, {
    method: 'GET',
    headers: {
      'x-api-key': CMS_API_KEY,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'CMS Network error' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  const json = await res.json();
  return json;
}

export async function getSettings() {
  return fetchFromCMS<any>('/public/settings');
}

export async function getNavigation() {
  return fetchFromCMS<any[]>('/public/navigation');
}

export async function getPosts() {
  return fetchFromCMS<any[]>('/public/posts');
}

export async function getPostDetail(slug: string) {
  return fetchFromCMS<any>(`/public/posts/${slug}`);
}

export async function getPages() {
  return fetchFromCMS<any[]>('/public/pages');
}

export async function getPageDetail(slug: string) {
  return fetchFromCMS<any>(`/public/pages/${slug}`);
}

