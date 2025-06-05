import { useState } from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import PurchaseSuccessful from '../components/PurchaseSuccessful';

export default function Cart({ cartItems, removeFromCart, updateQuantity, darkPatterns }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const tax = darkPatterns.dripPricing ? subtotal * 0.1 : 0;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const clearCart = () => {
    // Remove all items from cart
    cartItems.forEach(item => removeFromCart(item.id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">
                    ${item.discount
                      ? (item.price * (1 - item.discount / 100)).toFixed(2)
                      : item.price.toFixed(2)
                    }
                    {item.discount && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>{item.title.substring(0, 20)}...</span>
                  <span>
                    ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {darkPatterns.dripPricing && (
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Checkout
            </button>
          </div>
        </div>
      )}

      <PurchaseSuccessful
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onComplete={clearCart}
      />
    </div>
  );
}
