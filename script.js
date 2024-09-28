document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".search-bar button");
  const productSuggestions = document.querySelector(".product-suggestions");
  const productCards = document.querySelectorAll(".product-card");
  const body = document.querySelector("body");
  const cart = [];
  const cartSection = document.querySelector(".cart-section");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartButton = document.querySelector(".cart-button");
  const totalPriceElement = document.getElementById("total-price");
  const buyNowButton = document.getElementById("buy-now-button");
  const products = [
    "OXPEL PURE (UV + UF)",
    "OXPEL ADVANCE (RO + UV)",
    "OXPEL SMART (RO + UF)",
    "OXPEL ULTRA (RO + UV + UF)",
  ];

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

  scrollToTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  // Search button functionality
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    productCards.forEach((card) => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Toggle search bar visibility
  searchButton.addEventListener("click", () => {
    if (searchInput.classList.contains("visible")) {
      searchInput.classList.remove("visible");
    } else {
      searchInput.classList.add("visible");
      searchInput.focus();
    }
  });

  // Product suggestion functionality
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    productSuggestions.innerHTML = ""; // Clear previous suggestions
    if (query) {
      const filteredProducts = products.filter((product) =>
        product.toLowerCase().includes(query)
      );

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

  // Close all expanded product cards
  function closeExpandedCards() {
    productCards.forEach((card) => {
      card.classList.remove("expanded");
      card.classList.remove("blurred");
    });
    body.classList.remove("expanded");
  }

  // Handle product card click to expand and blur the background
  productCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation();

      const isExpanded = card.classList.contains("expanded");
      closeExpandedCards();
      if (!isExpanded) {
        card.classList.add("expanded");
        body.classList.add("expanded");

        // Blur all other cards except the expanded one
        productCards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.add("blurred");
          }
        });
      }
    });
  });

  // Close product details when clicking outside
  document.body.addEventListener("click", () => {
    closeExpandedCards();
  });

  // Prevent body click when interacting with a product card
  productCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", () => {
      const productCard = productCards[index];
      const product = {
        title: productCard.querySelector("h3").innerText,
        price: parseFloat(
          productCard.querySelector("p").innerText.replace(",", "")
        ), // Ensure price is parsed as a number
        image: productCard.querySelector("img").src,
      };
      cart.push(product);
      updateCart();
      alert(`${product.title} added to cart!`);
    });
  });

  // Remove from cart functionality
  function removeFromCart(index) {
    const product = cart[index];
    cart.splice(index, 1);
    updateCart();
    alert(`${product.title} removed from cart!`);
  }

  // Function to update the cart
  function updateCart() {
    if (cart.length > 0) {
      cartItemsContainer.innerHTML = "";
      let totalPrice = 0;

      cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h4>${product.title}</h4>
          <p>${product.price}</p>
          <button class="remove-from-cart" data-index="${index}">
          <i class="fa-solid fa-trash-can"></i> <!-- Add trash can icon -->
        </button>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += product.price;
      });

      // Update total price display
      totalPriceElement.innerText = `Total: $${totalPrice.toLocaleString()}`;

      // Remove from cart functionality
      document.querySelectorAll(".remove-from-cart").forEach((button) => {
        button.addEventListener("click", () => {
          const index = button.getAttribute("data-index");
          removeFromCart(index);
        });
      });
    } else {
      cartItemsContainer.innerHTML = "<p>No items in cart.</p>";
      totalPriceElement.innerText = "Total: $0";
    }
  }

  // Buy Now button functionality
  buyNowButton.addEventListener("click", () => {
    if (cart.length > 0) {
      redirectToWhatsApp(); // Call the function to redirect to WhatsApp
    } else {
      alert("Your cart is empty.");
    }
  });

  // Redirecting to WhatsApp
  function redirectToWhatsApp() {
    const phoneNumber = "9605303244"; // Replace with a valid phone number
    const items = cart.map((product) => product.title).join(", "); // Join product titles into a string
    const message = `Hi, I am interested in the following items: ${items}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }

  // Toggle cart visibility on button click
  cartButton.addEventListener("click", () => {
    cartSection.classList.toggle("visible");
  });

  // Close cart when clicking outside (optional)
  document.addEventListener("click", (event) => {
    if (
      !cartSection.contains(event.target) &&
      !cartButton.contains(event.target)
    ) {
      cartSection.classList.remove("visible");
    }
  });
});
