import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Tag } from "lucide-react";

import HotDeals from "../components/HotDeals";
import ForcedRegistration from "../components/dark-patterns/ForcedRegistration";

export default function Home({ products, status, error, darkPatterns, updateDarkPattern }) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const navigate = useNavigate();
  const discountedProducts = products.filter(
    (product) => product.discount > 20
  );

  const handleStartShopping = (e) => {
    if (darkPatterns.forcedRegistration) {
      e.preventDefault();
      setShowRegistrationModal(true);
    }
  };

  const isLoading = (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const isError = <div className="text-center text-red-600 mt-8">{error}</div>;

  const renderContent = () => {
    if (status === "loading") {
      return isLoading;
    }

    if (status === "failed") {
      return isError;
    }

    return (
      discountedProducts.length > 0 && (
        <HotDeals discountedProducts={discountedProducts} />
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Our Store
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our amazing collection of products at unbeatable prices.
            Quality meets affordability in every item we offer.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleStartShopping}
          >
            <ShoppingBag className="mr-2" size={20} />
            Start Shopping
          </Link>
        </div>

        {renderContent()}
      </div>

      <ForcedRegistration
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        updateDarkPattern={updateDarkPattern}
      />
    </div>
  );
}
