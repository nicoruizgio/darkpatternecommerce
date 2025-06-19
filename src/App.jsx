import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CountdownProvider } from "./context/CountdownContext";
import { getUserInfo } from "./utils/getUserInfo";
import { fetchProducts } from "./utils/fetchProducts";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import accessoriesMap from "./utils/accessoriesMap";
import Cookies from "./components/dark-patterns/Cookies";
import Chatbot from "./components/Chatbot";

// dark patterns
export const defaultDarkPatterns = {
  forcedRegistration: true,
  nagging: true,
  sneak: true,
  dripPricing: true,
  highDemand: true,
  countdownTimer: true,
  cookies: true,
  testimonials: true,
};

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [darkPatterns, setDarkPatterns] = useState(defaultDarkPatterns);
  const [preselectedAccessories, setPreselectedAccessories] = useState({});

  // get user info from url when app mounts
  useEffect(() => {
    getUserInfo();
  }, []);

  //  function to update dark patterns
  const updateDarkPattern = (patternName, value) => {
    setDarkPatterns((prev) => ({
      ...prev,
      [patternName]: value,
    }));
  };

  // initialize preselections when products are loaded
  useEffect(() => {
    if (status === "succeeded") {
      const initialPreselections = {};
      products.forEach((product) => {
        initialPreselections[product.id] = true;
      });
      setPreselectedAccessories(initialPreselections);
    }
  }, [status, products]);

  const updatePreselection = (productId, isPreselected) => {
    setPreselectedAccessories((prev) => ({
      ...prev,
      [productId]: isPreselected,
    }));
  };

  // fetch products
  useEffect(() => {
    if (status === "idle") {
      setStatus("loading");
      fetchProducts()
        .then((filteredProducts) => {
          setProducts(filteredProducts);
          setStatus("succeeded");
        })
        .catch((err) => {
          setError(err.message || "Failed to fetch products");
          setStatus("failed");
        });
    }
  }, [status]);

  // cart functions
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
    addToCart(product);

    if ((preselectedAccessories[product.id] ?? true) && darkPatterns.sneak) {
      const accessory = accessoriesMap[product.category];

      // add accessory to cart
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
    <CountdownProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          cartItems={cartItems}
          darkPatterns={darkPatterns}
          updateDarkPattern={updateDarkPattern}
        />
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
        <Cookies isEnabled={darkPatterns.cookies} />
        <Chatbot />
      </div>
    </CountdownProvider>
  );
}

export default App;
