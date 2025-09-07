// Cart functionality
let cart = [];
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.querySelector(".cart-count");

// Open cart
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartSidebar.classList.add("open");
});

// Close cart
closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

// Add to cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    const img = button.getAttribute("data-img");

    // Check if product already in cart
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        img,
        quantity: 1,
      });
    }

    updateCart();

    // Show cart sidebar when adding an item
    cartSidebar.classList.add("open");
  });
});

// Update cart
function updateCart() {
  // Clear cart items
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  // Add items to cart
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    count += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price} x ${item.quantity}</p>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                `;

    cartItems.appendChild(cartItem);
  });

  // Update total and count
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartCount.textContent = count;

  // Add event listeners to remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      cart = cart.filter((item) => item.id !== id);
      updateCart();
    });
  });
}

// Initialize cart
updateCart();
