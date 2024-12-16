import { useLocation, Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Link to="/" className="text-blue-500 hover:text-blue-600">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Order Confirmed!
        </h2>
        <p className="text-green-700">
          Thank you for your order, {orderDetails.name}!
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Details</h3>
          <div className="bg-white rounded-lg shadow p-4">
            <p><strong>Name:</strong> {orderDetails.name}</p>
            <p><strong>Email:</strong> {orderDetails.email}</p>
            <p><strong>Address:</strong> {orderDetails.address}</p>
            <p><strong>City:</strong> {orderDetails.city}</p>
            <p><strong>ZIP Code:</strong> {orderDetails.zipCode}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Items Ordered</h3>
          <div className="space-y-4">
            {orderDetails.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center border rounded p-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div className="flex-grow">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-gray-600">
                    Quantity: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-xl font-bold text-right">
            Total: ${orderDetails.total.toFixed(2)}
          </p>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
