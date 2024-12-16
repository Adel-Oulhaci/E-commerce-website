import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to a backend
    alert('Order placed successfully!');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Address</label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                required
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>
          <div className="border-t pt-6">
            <div className="text-xl font-bold mb-4">
              Order Total: ${getTotal().toFixed(2)}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}