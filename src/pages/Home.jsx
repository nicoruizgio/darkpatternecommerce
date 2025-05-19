import { Link } from "react-router-dom";
import { ShoppingBag, Tag } from "lucide-react";

export default function Home({ products, status, error }) {
  const discountedProducts = products.filter(
    (product) => product.discount > 20
  );

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
        <div className="mt-12">
          {/* Hot deals container */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center">
            <Tag className="mr-2" size={28} />
            Hot Deals
          </h2>
          {/* Discounted Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              // Product card
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Product image and discount badge */}
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF
                  </div>
                </div>
                {/* Product details */}
                <div className="p-4">
                  {/* Product title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600">
                    {product.title}
                  </h3>
                  {/* Product price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      $
                      {(product.price * (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                    <span className="text-sm text-red-600 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
          >
            <ShoppingBag className="mr-2" size={20} />
            Start Shopping
          </Link>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
