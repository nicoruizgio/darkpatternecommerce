import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

// Dark patterns
export const defaultDarkPatterns = {
  forcedRegistration: true,
  nagging: true,
  sneak: true,
};

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [darkPatterns, setDarkPatterns] = useState(defaultDarkPatterns);
  const [isPreselected, setIsPreselected] = useState(true);

  // New function to update dark patterns
  const updateDarkPattern = (patternName, value) => {
    setDarkPatterns((prev) => ({
      ...prev,
      [patternName]: value,
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
      const filteredProducts = response.data.products.filter(
        (product) => !invalidProductsIds.includes(product.id)
      );
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

    // If accessory is preselected, also add the headphone case
    if (isPreselected && darkPatterns.sneak) {
      const accessoryProduct = {
        id: 'headphone-case-1',
        title: 'Headphone Case',
        price: 5,
        image: '/src/assets/headphone-case.jpg',
        category: 'accessories',
        description: 'Protective case for your headphones',
        quantity: 1
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
                isPreselected={isPreselected}
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
                isPreselected={isPreselected}
                setIsPreselected={setIsPreselected}
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
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
