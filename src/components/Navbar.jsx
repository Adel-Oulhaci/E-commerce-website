import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              E-Shop
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/admin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                Admin
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/cart"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="ml-1 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}