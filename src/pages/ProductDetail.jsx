import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import Preselection from "../components/dark-patterns/Preselection";
import HighDemand from "../components/dark-patterns/HighDemand";
import accessoriesMap from "../utils/accessoriesMap";

export default function ProductDetail({
  products,
  status,
  addToCart,
  darkPatterns,
  updateDarkPattern,
  preselectedAccessories,
  updatePreselection,
}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id, products]);

  const getAccessoryForProduct = (product) => {
    return accessoriesMap[product.category] || null;
  };

  if (status === "loading" || !product) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const accessory = getAccessoryForProduct(product);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex flex-col items-center justify-center bg-white p-4 relative">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain"
            />
            {darkPatterns?.highDemand && <HighDemand count={product.highDemand} />}
          </div>
          {/* Product Details */}
          <div className="flex flex-col justify-between">
            {/* Product Title and Price */}
            <div>
              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              {/* Product Price */}
              <div className="flex items-center mb-4">
                {product.discount ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      $
                      {(product.price * (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                    <span className="text-lg text-red-600 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
                      {product.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg mb-6">
                {/* Product Details */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Product Details
                </h3>
                {/* Product Description */}
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Product Category */}
                  <div>
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="ml-2 capitalize">{product.category}</span>
                  </div>
                  {/* Product Brand*/}
                  {product.brand && (
                    <div>
                      <span className="text-gray-600 font-medium">Brand:</span>
                      <span className="ml-2">{product.brand}</span>
                    </div>
                  )}
                  {/* Product Rating */}
                  {product.rating && (
                    <div>
                      <span className="text-gray-600 font-medium">Rating:</span>
                      <span className="ml-2">{product.rating} / 5</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dark Patterns Preselection */}
            {darkPatterns?.sneak && (
              <Preselection
                isPreselected={preselectedAccessories[product.id] ?? true}
                setIsPreselected={(value) =>
                  updatePreselection(product.id, value)
                }
                accessory={accessoriesMap[product.category]}
              />
            )}
            {/* Add to Cart Button */}
            <div className="flex justify-start">
              <button
                onClick={() => addToCart(product)}
                className="w-1/3 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
