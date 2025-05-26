import { useState, useEffect } from "react";

import Product from "../components/Product";
import SeachMenu from "../components/SeachMenu";
import Nagging from "../components/dark-patterns/Nagging";

export default function Products({ products, status, error, addToCart, darkPatterns, updateDarkPattern }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showNaggingModal, setShowNaggingModal] = useState(false);

  // Show nagging modal after 3 seconds if enabled in dark patterns
  useEffect(() => {
    if (darkPatterns?.nagging) {
      const timer = setTimeout(() => {
        setShowNaggingModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [darkPatterns?.nagging]);

  // Extract unique categories from products
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderedContent = () => {
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (status === "failed") {
      return <div className="text-center text-red-600 mt-8">{error}</div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart}/>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h2>

      {/* Search and Filter Section */}
      <SeachMenu
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Display products */}
      {renderedContent()}

      <Nagging
        isOpen={showNaggingModal}
        onClose={() => setShowNaggingModal(false)}
        updateDarkPattern={updateDarkPattern}
      />
    </div>
  );
}
