import React from "react";
import { ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Product = ({ addToCart, product }) => {
  return (
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
              {product.discount ? (
                <span className="text-xl font-bold text-red-500">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}

              {product.discount && (
                <span className="text-sm text-grey-900 line-through">
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
  );
};

export default Product;
