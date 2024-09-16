document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".search-bar button");
  const productSuggestions = document.querySelector(".product-suggestions");

  // Scroll to Top Button Functionality
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  // List of products (you can expand this list or fetch it dynamically)
  const products = [
    "OXPEL PURE (UV + UF)",
    "OXPEL MAX (RO + UV)",
    "OXPEL ECO (UF)",
    "OXPEL COMPACT (RO)",
  ];

  searchButton.addEventListener("click", () => {
    if (searchInput.classList.contains("visible")) {
      searchInput.classList.remove("visible");
    } else {
      searchInput.classList.add("visible");
      searchInput.focus();
    }
  });

  // Search functionality with product suggestion display
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    productSuggestions.innerHTML = ""; // Clear previous suggestions
    if (query) {
      const filteredProducts = products.filter((product) =>
        product.toLowerCase().includes(query)
      );

      // Show suggestions if there are matches
      if (filteredProducts.length > 0) {
        productSuggestions.classList.add("visible");
        filteredProducts.forEach((product) => {
          const suggestionItem = document.createElement("div");
          suggestionItem.textContent = product;
          suggestionItem.addEventListener("click", () => {
            searchInput.value = product; // Set input value when clicked
            productSuggestions.classList.remove("visible"); // Hide suggestions
          });
          productSuggestions.appendChild(suggestionItem);
        });
      } else {
        productSuggestions.classList.remove("visible");
      }
    } else {
      productSuggestions.classList.remove("visible");
    }
  });
});
