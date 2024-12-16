import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="w-full mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
      <div className="grid grid-cols-1 gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center border rounded-lg p-4 gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <label className="mr-2">Quantity:</label>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="border rounded p-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-xl font-bold">
          Total: ${getCartTotal().toFixed(2)}
        </p>
        <Link
          to="/checkout"
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
