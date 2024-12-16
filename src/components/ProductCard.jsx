import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain p-4"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}