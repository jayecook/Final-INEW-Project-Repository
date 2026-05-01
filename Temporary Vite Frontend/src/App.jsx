import { useState, useEffect, useMemo } from 'react'
import './App.css'

const API = "http://localhost:8081/products";
const TYPES = ["Material", "Safety", "Equipment"];

const initialForm = { 
    name: "", 
    type: "Material", 
    description: "", 
    price: "", 
    count: "", 
    threshold: ""
};

// Took the FilterBar out as a component

function FilterBar({ filters, setFilters, TYPES, showToast }) {
  const update = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateNumeric = (key, value) => {
    if (value !== "" && Number(value) < 0) {
      showToast("No negative values allowed", "error");
      return;
    }
    update(key, value);
  };

  const isActive =
    filters.id !== "" ||
    filters.name !== "" ||
    filters.count !== "" ||
    filters.threshold !== "" ||
    filters.type !== "all";

  const handleClear = () => {
    setFilters(prev => ({
      ...prev,
      id: "",
      name: "",
      count: "",
      threshold: "",
      type: "all",
    }));
  };

  return (
    <div className="search-filter-bar">
      <input
        type="text"
        placeholder="Search by ID"
        value={filters.id}
        onChange={(e) => update("id", e.target.value)}
      />

      <input
        type="text"
        placeholder="Search by Name"
        value={filters.name}
        onChange={(e) => update("name", e.target.value)}
      />

      <input
        type="number"
        placeholder="Search by Count"
        value={filters.count}
        onChange={(e) => updateNumeric("count", e.target.value)}
      />

      <input
        type="number"
        placeholder="Search by Threshold"
        value={filters.threshold}
        onChange={(e) => updateNumeric("threshold", e.target.value)}
      />

      <select
        value={filters.type}
        onChange={(e) => update("type", e.target.value)}
      >
        <option value="all">All Types</option>
        {TYPES.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => update("sortBy", e.target.value)}
      >
        <option value="id">Sort by ID</option>
        <option value="name">Sort by Name</option>
        <option value="count">Sort by Count</option>
        <option value="threshold">Sort by Threshold</option>
      </select>

      {isActive && (
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear Filters
        </button>
      )}
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [filters, setFilters] = useState({
    id: "",
    name: "",
    count: "",
    threshold: "",
    type: "all",
    sortBy: "id"
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const normalizedProducts = data.map((product) => ({
        ...product,
        product_type:  product.product_type ?? "",
        product_count: Number(product.product_count ?? 0),
        threshold:     Number(product.threshold ?? 0),
      }));

      setProducts(normalizedProducts);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!form.name.trim())        return showToast("Name is required", "error");
    if (!form.type.trim())        return showToast("Type is required", "error");
    if (!form.description.trim()) return showToast("Description is required", "error");
    if (!form.price.toString().trim()) return showToast("Price is required", "error");
    if (form.count === "")        return showToast("Count is required", "error");
    if (form.threshold === "")    return showToast("Threshold is required", "error");
    if (parseFloat(form.price) < 0)   return showToast("No negative values allowed", "error");
    if (parseInt(form.count) < 0)     return showToast("No negative values allowed", "error");
    if (parseInt(form.threshold) < 0) return showToast("No negative values allowed", "error");

    const payload = {
        product_name:        form.name,
        product_type:        form.type,
        product_description: form.description,
        product_price:       Math.round(parseFloat(form.price) * 100) / 100,
        product_count:       parseInt(form.count),
        threshold:           parseInt(form.threshold)
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
        .then(() => {
          fetchProducts();
          setForm(initialForm);
          showToast("Product added!");
        })
        .catch(() => showToast("Add failed", "error"));
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.product_id);
    setForm({
        name:        product.product_name        || "",
        type:        product.product_type        || "Material",
        description: product.product_description || "",
        price:       product.product_price       ?? "",
        count:       product.product_count       ?? "",
        threshold:   product.threshold           ?? ""
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

  const handleFormNumeric = (key, value) => {
    if (value !== "" && Number(value) < 0) {
      showToast("No negative values allowed", "error");
      return;
    }
    setForm({ ...form, [key]: value });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const name = product.product_name?.toLowerCase() || "";
        const id = String(product.product_id ?? "");
        const count = String(product.product_count ?? "");
        const threshold = String(product.threshold ?? "");
        const type = product.product_type || "";

        return (
          (filters.id === "" || id.includes(filters.id)) &&
          (filters.name === "" || name.includes(filters.name.toLowerCase())) &&
          (filters.count === "" || count.includes(filters.count)) &&
          (filters.threshold === "" || threshold.includes(filters.threshold)) &&
          (filters.type === "all" || type === filters.type)
        );
      })
      .sort((a, b) => {
        if (filters.sortBy === "id") return (a.product_id ?? 0) - (b.product_id ?? 0);
        if (filters.sortBy === "name") return (a.product_name || "").localeCompare(b.product_name || "");
        if (filters.sortBy === "count") return (a.product_count ?? 0) - (b.product_count ?? 0);
        if (filters.sortBy === "threshold") return (a.threshold ?? 0) - (b.threshold ?? 0);
        return 0;
      });
  }, [products, filters]);

  return (
    <>
      <div className="app">
        {/* Header */}
        <div className="header">
          <div className="header-tag">inventory system</div>
          <h1>Products</h1>
          <div className="header-sub">Manage your product catalog</div>
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
              <label>Type</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
              >
                {TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form.price}
                onChange={e => handleFormNumeric("price", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Count</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={form.count}
                onChange={e => handleFormNumeric("count", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Threshold</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={form.threshold}
                onChange={e => handleFormNumeric("threshold", e.target.value)}
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

        {/* Literally the only line needed for the FilterBar component within App.jsx App body (now with showToast as well) */}
        <FilterBar filters={filters} setFilters={setFilters} TYPES={TYPES} showToast={showToast} />

        {/* List */}
        <div className="list-header">
          <h2>Catalog</h2>
          <span className="count-badge">
            {filteredProducts.length} of {products.length} items
          </span>
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
        ) : filteredProducts.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <p>No products match your filters. Try adjusting search or type filter.</p>
          </div>
        ) : (
          <div className="product-list">
            {filteredProducts.map((product, i) => (
              <div
                key={product.product_id}
                className={`product-card ${editingId === product.product_id ? 'editing-active' : ''}`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="product-id">#{product.product_id}</div>
                <div className="product-info">
                  <div className="product-name">{product.product_name}</div>
                  <div className="product-desc">{product.product_description}</div>
                </div>
                <div className="product-meta">
                  <strong>Type:</strong> {product.product_type} ·
                  <strong> Count:</strong> {product.product_count} ·
                  <strong> Threshold:</strong> {product.threshold}
                </div>
                <div className="product-price">
                  ${product.product_price.toFixed(2)}
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
            <p>"{deleteConfirm.product_name}" will be permanently removed from your catalog.</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.product_id)}>Delete</button>
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