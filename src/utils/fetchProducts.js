import axios from "axios";

const invalidProductsIds = [8, 14, 17, 27];
const productsWithoutDiscount = [10];
const productDiscounts = { 12: 50 };
const highDemandValues = { 1: 8, 2: 9, 5: 7, 7: 6, 9: 9, 12: 8, 15: 7 };
const countdownTimerProducts = [15, 54];
const productTestimonials = {
  1: { name: "John Smith", testimonial: "This product completely changed my life!" },
  3: { name: "Sarah Johnson", testimonial: "Best purchase I've made all year." },
  5: { name: "Michael Brown", testimonial: "Excellent quality and fast shipping!" },
  7: { name: "Emily Davis", testimonial: "I've recommended this to all my friends." },
};

export async function fetchProducts() {
  const response = await axios.get("https://fakestoreapi.in/api/products?limit=150");
  let filteredProducts = response.data.products.filter(
    (product) => !invalidProductsIds.includes(product.id)
  );

  filteredProducts = filteredProducts.map((product) => {
    const modifiedProduct = { ...product };

    // apply discount logic
    if (productsWithoutDiscount.includes(product.id)) {
      delete modifiedProduct.discount;
    } else if (product.id in productDiscounts) {
      modifiedProduct.discount = productDiscounts[product.id];
    }

    // apply high demand value
    if (product.id in highDemandValues) {
      modifiedProduct.highDemand = highDemandValues[product.id];
    }

    // apply countdown timer
    if (countdownTimerProducts.includes(product.id)) {
      modifiedProduct.countdownTimer = true;
    }

    // apply testimonials
    if (product.id in productTestimonials) {
      modifiedProduct.testimonials = productTestimonials[product.id];
    }

    return modifiedProduct;
  });

  return filteredProducts;
}