import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import { useState } from "react";

export default function ForcedRegistration({
  isOpen,
  onClose,
  updateDarkPattern,
}) {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSkip = () => {
    navigate("/products");
    onClose();
  };

  const handleLogin = () => {
    setIsLoggingIn(true);

    // Simulate login process with a 2 second delay
    setTimeout(() => {
      setIsLoggingIn(false);
      setLoginSuccess(true);

      // Set forced registration to false
      updateDarkPattern("forcedRegistration", false);

      // Redirect after showing success message for a moment
      setTimeout(() => {
        navigate("/products");
        onClose();
        // Reset states for next time modal opens
        setLoginSuccess(false);
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        {!isLoggingIn && !loginSuccess && (
          <>
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Log in to start shopping
              </h2>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4 text-center">
                And enjoy exclusive deals, personalized recommendations, and a
                seamless shopping experience.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleLogin}
                className="px-16 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 w-full sm:w-auto"
              >
                Log In / Sign Up
              </button>
              <button
                onClick={handleSkip}
                className="w-32 text-gray-500 font-small rounded-lg hover:text-gray-700 text-xs"
              >
                skip for now
              </button>
            </div>
          </>
        )}

        {isLoggingIn && (
          <div className="py-10 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-medium">Logging in...</p>
          </div>
        )}

        {loginSuccess && (
          <div className="py-10 flex flex-col items-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Login Successful!
            </h3>
            <p className="text-gray-600">Redirecting you to products...</p>
          </div>
        )}
      </div>
    </div>
  );
}
