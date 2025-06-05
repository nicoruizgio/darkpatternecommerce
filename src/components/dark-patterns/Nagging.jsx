import React, { useState } from "react";
import { X, Check } from "lucide-react";

const Nagging = ({ isOpen, onClose, updateDarkPattern }) => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribeSuccess(true);

      updateDarkPattern("nagging", false);

      setTimeout(() => {
        onClose();

        setSubscribeSuccess(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded-full"
        >
          <X size={10} />
        </button>

        {!isSubscribing && !subscribeSuccess && (
          <>
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Become a Member now!
              </h2>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4 text-center">
                Subscribe to our premium membership for exclusive deals and get
                the fastest delivery on all your orders.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleSubscribe}
                aria-label="Subscribe Now"
                className="px-16 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 w-full"
              >
                Subscribe Now
              </button>
            </div>
          </>
        )}

        {isSubscribing && (
          <div className="py-10 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-medium">Subscribing...</p>
          </div>
        )}

        {subscribeSuccess && (
          <div className="py-10 flex flex-col items-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Subscription Successful!
            </h3>
            <p className="text-gray-600">Thank you for subscribing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nagging;
