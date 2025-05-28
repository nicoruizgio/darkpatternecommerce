import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import accessoriesMap from "./utils/accessoriesMap";

// Dark patterns
export const defaultDarkPatterns = {
  forcedRegistration: true,
  nagging: true,
  sneak: true,
  dripPricing: true,
  highDemand: true,
};

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [darkPatterns, setDarkPatterns] = useState(defaultDarkPatterns);
  const [preselectedAccessories, setPreselectedAccessories] = useState({});

  // New function to update dark patterns
  const updateDarkPattern = (patternName, value) => {
    setDarkPatterns((prev) => ({
      ...prev,
      [patternName]: value,
    }));
  };

  // Initialize preselections when products are loaded
  useEffect(() => {
    if (status === "succeeded") {
      const initialPreselections = {};
      products.forEach((product) => {
        initialPreselections[product.id] = true;
      });
      setPreselectedAccessories(initialPreselections);
    }
  }, [status, products]);

  // Add this function to update preselection for a specific product
  const updatePreselection = (productId, isPreselected) => {
    setPreselectedAccessories((prev) => ({
      ...prev,
      [productId]: isPreselected,
    }));
  };

  // Fetch products
  useEffect(() => {
    if (status === "idle") {
      fetchProducts();
    }
  }, [status]);

  // List of products with missing images
  const invalidProductsIds = [8, 14, 17, 27];

  const fetchProducts = async () => {
    setStatus("loading");
    try {
      const response = await axios.get(
        "https://fakestoreapi.in/api/products?limit=150"
      );
      let filteredProducts = response.data.products.filter(
        (product) => !invalidProductsIds.includes(product.id)
      );

      // Define products that should have no discount
      const productsWithoutDiscount = [10];

      // Define products with specific discount values
      const productDiscounts = {
        12: 50,
      };

      // Define high demand values for specific products
      const highDemandValues = {
        1: 8,
        2: 9,
        5: 7,
        7: 6,
        9: 9,
        12: 8,
        15: 7
      };

      // Define countdown timer for specific products
      const countdownTimerProducts = [15,54]

      // Define custom testimonials for specific products
      const productTestimonials = {
        1: {
          name: "John Smith",
          testimonial: "This product completely changed my life!"
        },
        3: {
          name: "Sarah Johnson",
          testimonial: "Best purchase I've made all year."
        },
        5: {
          name: "Michael Brown",
          testimonial: "Excellent quality and fast shipping!"
        },
        7: {
          name: "Emily Davis",
          testimonial: "I've recommended this to all my friends."
        }
      };

      // Modify products based on ID
      filteredProducts = filteredProducts.map(product => {
        const modifiedProduct = { ...product };

        // Apply discount logic
        if (productsWithoutDiscount.includes(product.id)) {
          delete modifiedProduct.discount;
        } else if (product.id in productDiscounts) {
          modifiedProduct.discount = productDiscounts[product.id];
        }

        // Apply high demand value
        if (product.id in highDemandValues) {
          modifiedProduct.highDemand = highDemandValues[product.id];
        }

        // Apply countdown timer
        if (product.id in countdownTimerProducts) {
          modifiedProduct.countdownTimer = true;
        }

        // Apply testimonials
        if (product.id in productTestimonials) {
          modifiedProduct.testimonials = productTestimonials[product.id];
        } else {
          modifiedProduct.testimonials = {
            name: `Happy Customer ${product.id}`,
            testimonial: `This ${product.title} exceeded my expectations!`
          };
        }

        return modifiedProduct;
      });

      setProducts(filteredProducts);
      setStatus("succeeded");
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      setStatus("failed");
    }
  };

  // Cart functions
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const addToCartWithAccessories = (product) => {
    // Add the main product
    addToCart(product);

    // Check preselection state for this specific product
    if ((preselectedAccessories[product.id] ?? true) && darkPatterns.sneak) {
      // Get the appropriate accessory based on product category
      const accessory = accessoriesMap[product.category];

      // Add accessory to cart
      const accessoryProduct = {
        ...accessory,
        quantity: 1,
        category: "accessories",
      };

      addToCart(accessoryProduct);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartItems={cartItems} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                status={status}
                error={error}
                darkPatterns={darkPatterns}
                updateDarkPattern={updateDarkPattern}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                status={status}
                error={error}
                addToCart={addToCartWithAccessories}
                darkPatterns={darkPatterns}
                updateDarkPattern={updateDarkPattern}
                preselectedAccessories={preselectedAccessories}
                updatePreselection={updatePreselection}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetail
                products={products}
                status={status}
                addToCart={addToCartWithAccessories}
                darkPatterns={darkPatterns}
                updateDarkPattern={updateDarkPattern}
                preselectedAccessories={preselectedAccessories}
                updatePreselection={updatePreselection}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                darkPatterns={darkPatterns}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
