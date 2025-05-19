import { useState, useEffect } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products({ products, status, error, addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

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
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/products/${product.id}`} className="block">
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4 pb-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900">
                      $
                      {product.discount
                        ? (
                            product.price *
                            (1 - product.discount / 100)
                          ).toFixed(2)
                        : product.price.toFixed(2)}
                    </span>
                    {product.discount && (
                      <span className="text-sm text-red-600 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
            <div className="p-4 pt-2">
              <button
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h2>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display products */}
      {renderedContent()}
    </div>
  );
}
