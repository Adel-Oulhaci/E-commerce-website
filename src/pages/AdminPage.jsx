import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then(setProducts);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({
          title: '',
          price: '',
          description: '',
          image: '',
          category: '',
        });
      });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    fetch(`https://fakestoreapi.com/products/${editingProduct.id}`, {
      method: 'PUT',
      body: JSON.stringify(editingProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id ? editingProduct : p
          )
        );
        setEditingProduct(null);
      });
  };

  const handleDeleteProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>

      {/* Add New Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Product List</h3>
        <div className="space-y-4">
          {products.map((product) =>
            editingProduct?.id === product.id ? (
              <form
                key={product.id}
                onSubmit={handleUpdateProduct}
                className="border p-4 rounded-lg space-y-4"
              >
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      title: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div
                key={product.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">{product.title}</h4>
                  <p className="text-gray-600">${product.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}