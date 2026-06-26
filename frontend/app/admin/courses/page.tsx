"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAllCourses, createCourse, deleteCourse, type AdminCourse } from "@/lib/adminApi";
import { downloadExcel } from "@/lib/excel";

export default function AdminCoursesPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const [form, setForm] = useState({ title: "", description: "", price: "", category: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router]);

  async function loadCourses() {
    setLoading(true);
    setError("");
    try {
      setCourses(await fetchAllCourses());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ready) loadCourses();
  }, [ready]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price || "0");
      formData.append("category", form.category);
      formData.append("isPublished", "true");
      if (imageFile) formData.append("image", imageFile);

      await createCourse(formData);
      setForm({ title: "", description: "", price: "", category: "" });
      setImageFile(null);
      await loadCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save course.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      await deleteCourse(id);
      await loadCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course.");
    } finally {
      setDeletingId("");
    }
  }

  function handleExportExcel() {
    const headers = ["Title", "Description", "Price", "Category", "Published", "Created At"];
    const rows = courses.map((c) => [c.title, c.description, c.price, c.category, c.isPublished ? "Yes" : "No", new Date(c.createdAt).toLocaleString()]);
    downloadExcel("courses.xlsx", headers, rows);
  }

  if (!ready) return null;

  return (
    <main className="container section">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "24px" }}>
        <h1 style={{ margin: 0 }}>Manage Courses</h1>
        <button className="btn" onClick={handleExportExcel} disabled={courses.length === 0}>
          <i className="fa-solid fa-file-excel" style={{ marginRight: "8px" }}></i>
          Export Excel
        </button>
      </div>

      {error && <div className="error-box" style={{ marginBottom: "16px" }}>{error}</div>}

      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: "32px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Add Course</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <input id="category" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div className="form-field">
            <label htmlFor="price">Price (INR)</label>
            <input id="price" type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="form-field">
            <label htmlFor="image">Image</label>
            <input id="image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          </div>
          <div className="form-field" style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="description">Description</label>
            <textarea id="description" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>
        <button type="submit" className="btn" disabled={saving} style={{ marginTop: "16px" }}>
          {saving ? "Saving..." : "Save Course"}
        </button>
      </form>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : courses.length === 0 ? (
        <p className="muted">No courses yet.</p>
      ) : (
        <div className="card" style={{ padding: 0, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--academy-bg-alt)", textAlign: "left" }}>
                <th style={{ padding: "14px 16px" }}>Title</th>
                <th style={{ padding: "14px 16px" }}>Category</th>
                <th style={{ padding: "14px 16px" }}>Price</th>
                <th style={{ padding: "14px 16px" }}>Published</th>
                <th style={{ padding: "14px 16px" }}></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id} style={{ borderTop: "1px solid var(--academy-bg-alt)" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 700 }}>{c.title}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className="tag">{c.category}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>{c.price > 0 ? `₹${c.price}` : "Free"}</td>
                  <td style={{ padding: "14px 16px" }}>{c.isPublished ? "Yes" : "No"}</td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <button
                      onClick={() => handleDelete(c._id)}
                      disabled={deletingId === c._id}
                      style={{ background: "none", border: "none", color: "crimson", cursor: "pointer", fontWeight: 700 }}
                    >
                      {deletingId === c._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

