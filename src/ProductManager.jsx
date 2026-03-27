import React, { useEffect, useState } from "react";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    productType: "",
  });
  const [editing, setEditing] = useState(false);

  const API_URL = "http://localhost:8080/api/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "productId" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: Number(form.productId),
          productType: form.productType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (product) => {
    setForm({
      productId: product.productId,
      productType: product.productType,
    });
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/${form.productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: Number(form.productId),
          productType: form.productType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setForm({
      productId: "",
      productType: "",
    });
    setEditing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product CRUD</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={form.productId}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          name="productType"
          placeholder="Product Type"
          value={form.productType}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        {!editing ? (
          <button onClick={handleCreate}>Create</button>
        ) : (
          <>
            <button onClick={handleUpdate} style={{ marginRight: "10px" }}>
              Update
            </button>
            <button onClick={resetForm}>Cancel</button>
          </>
        )}
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productType}</td>
              <td>
                <button onClick={() => handleEditClick(product)} style={{ marginRight: "10px" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(product.productId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
