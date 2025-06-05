import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home, Package } from 'lucide-react';
import ForcedRegistration from "./dark-patterns/ForcedRegistration";

export default function Navbar({ cartItems, darkPatterns, updateDarkPattern }) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const navigate = useNavigate();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleProductsClick = (e) => {
    if (darkPatterns && darkPatterns.forcedRegistration) {
      e.preventDefault();
      setShowRegistrationModal(true);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-2 ${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`
                }
              >
                <Home size={20} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `flex items-center space-x-2 ${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`
                }
                onClick={handleProductsClick}
              >
                <Package size={20} />
                <span>Products</span>
              </NavLink>
            </div>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center space-x-2 ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`
              }
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <ForcedRegistration
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        updateDarkPattern={updateDarkPattern}
      />
    </>
  );
}