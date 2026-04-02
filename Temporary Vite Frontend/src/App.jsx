import { useState, useEffect } from 'react'
import './App.css'

const API = "http://localhost:8080/products";

const initialForm = { name: "", description: "", price: "" };

function App() {
  // Hooks declarations:
  const [products, setProducts] = useState([]);

  // The hook below should be used for the inventory microservice at some point
  const [inventory, setInventory] = useState([]);

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = () => {
    setLoading(true);
    fetch(API)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return showToast("Name is required", "error");
    if (!form.price.trim()) return showToast("Price is required", "error");
    if (!form.description.trim()) return showToast("Description is required", "error");

    const payload = {
      name: form.name,
      description: form.description,
      price: form.price === "" ? null : (Math.round((parseFloat(form.price) * 100))) / 100,
    };

    if (editingId !== null) {
      fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(() => {
          fetchProducts();
          setForm(initialForm);
          setEditingId(null);
          showToast("Product updated!");
        })
        .catch(() => showToast("Update failed", "error"));
    } else {
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setForm(initialForm);
          showToast("Product added!");
        })
        .catch(() => showToast("Add failed", "error"));
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setDeleteConfirm(null);
        showToast("Product deleted");
      })
      .catch(() => showToast("Delete failed", "error"));
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <>
    {/* ACTUAL REACT APP DISPLAY STARTS HERE WITHIN THE RETURN */}

      <div className="app">
        {/* Header */}
        <div className="header">
          <div className="header-tag">inventory system</div>
          <h1>Products</h1>
          <div className="header-sub"> Manage your product catalog</div>
        </div>

        {/* Form */}
        <div className="form-card">
          <div className={`form-title ${editingId !== null ? 'editing' : ''}`}>
            <span />
            {editingId !== null ? `editing product #${editingId}` : 'add new product'}
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div className="field full">
              <label>Description</label>
              <textarea
                placeholder="Product description..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editingId !== null ? 'Save Changes' : 'Add Product'}
            </button>
            {editingId !== null && (
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="list-header">
          <h2>Catalog</h2>
          <span className="count-badge">{products.length} items</span>
        </div>

        {loading ? (
          <div className="loading">
            <span className="loading-dot">▪</span>
            <span className="loading-dot">▪</span>
            <span className="loading-dot">▪</span>
          </div>
        ) : products.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📦</div>
            <p>No products yet. Add one above.</p>
          </div>
        ) : (
          <div className="product-list">
            {products.map((product, i) => (
              <div
                key={product.id}
                className={`product-card ${editingId === product.id ? 'editing-active' : ''}`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="product-id">#{product.id}</div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.description || '—'}</div>
                </div>
                <div className={`product-price ${product.price == null ? 'null-price' : ''}`}>
                  {product.price != null ? `$${product.price.toFixed(2)}` : 'N/A'}
                </div>
                <div className="product-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => setDeleteConfirm(product)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Delete product?</h3>
            <p>"{deleteConfirm.name}" will be permanently removed from your catalog.</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
        </div>
      )}
    </>
  );
}

export default App;
