import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className="mx-2 border rounded p-1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${getTotal().toFixed(2)}
          </div>
          <Link
            to="/checkout"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}