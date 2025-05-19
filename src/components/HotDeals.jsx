import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'lucide-react'

const HotDeals = ({discountedProducts}) => {
  return (
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
}

export default HotDeals