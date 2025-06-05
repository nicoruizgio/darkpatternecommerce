import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function PurchaseSuccessful({ isOpen, onClose, onComplete }) {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    // Start the countdown when modal is open
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // After 3 seconds, clear cart and redirect
    const redirectTimer = setTimeout(() => {
      onComplete();
      onClose();
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [isOpen, navigate, onClose, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-xl">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
        <p className="text-gray-600 mb-6">Thank you for your order.</p>
        <p className="text-sm text-gray-500">Redirecting in {countdown} seconds...</p>
      </div>
    </div>
  );
}