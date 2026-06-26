const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

function authHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function adminLogin(email: string, password: string, turnstileToken?: string): Promise<string> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, turnstileToken }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.message || "Login failed. Please check your credentials.");
  }
  const data = await res.json();
  return data.token;
}

export interface Registration {
  _id: string;
  name: string;
  email: string;
  phone: string;
  courseName: string;
  message: string;
  status: string;
  createdAt: string;
}

export async function fetchRegistrations(): Promise<Registration[]> {
  const res = await fetch(`${API_URL}/academy/register`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch registrations: ${res.status}`);
  return res.json();
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  message: string;
  sourcePage: string;
  createdAt: string;
}

export async function fetchLeads(): Promise<Lead[]> {
  const res = await fetch(`${API_URL}/contact`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch contact leads: ${res.status}`);
  return res.json();
}

export async function clearAllRegistrations(): Promise<void> {
  const res = await fetch(`${API_URL}/academy/register`, { method: "DELETE", headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to clear registrations: ${res.status}`);
}

export async function clearAllLeads(): Promise<void> {
  const res = await fetch(`${API_URL}/contact`, { method: "DELETE", headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to clear contact leads: ${res.status}`);
}

export interface AdminCourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
}

export async function fetchAllCourses(): Promise<AdminCourse[]> {
  const res = await fetch(`${API_URL}/academy/all`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status}`);
  return res.json();
}

export async function createCourse(formData: FormData): Promise<AdminCourse> {
  const res = await fetch(`${API_URL}/academy`, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || body.error || "Failed to create course.");
  }
  return res.json();
}

export async function deleteCourse(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/academy/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || body.error || "Failed to delete course.");
  }
}
