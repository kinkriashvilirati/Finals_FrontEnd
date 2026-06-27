const cartItems = document.querySelector("[data-cart-items]");
const summaryCount = document.querySelector("[data-summary-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const checkoutButton = document.querySelector("[data-checkout-button]");
const checkoutMessage = document.querySelector("[data-checkout-message]");

function renderCart() {
  const cart = NovaStore.getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Browse the collection and add something you like.</p>
        <a class="button button-primary" href="index.html#products">Start shopping</a>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
          <article class="cart-item">
            <div class="cart-item-image"><img src="${item.image}" alt="${item.name}" /></div>
            <div>
              <h2>${item.name}</h2>
              <p class="cart-item-category">${item.category}</p>
              <div class="quantity-controls" aria-label="Change quantity">
                <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                <button class="remove-button" type="button" data-action="remove" data-id="${item.id}">Remove</button>
              </div>
            </div>
            <span class="cart-item-price">${NovaStore.formatPrice(item.price * item.quantity)}</span>
          </article>
        `
      )
      .join("");
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  summaryCount.textContent = itemCount;
  cartTotal.textContent = NovaStore.formatPrice(totalPrice);
  checkoutButton.disabled = cart.length === 0;
}

function updateItem(productId, action) {
  const cart = NovaStore.getCart();
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  if (action === "increase") item.quantity += 1;
  if (action === "decrease") item.quantity -= 1;

  const updatedCart = action === "remove" || item.quantity === 0
    ? cart.filter((cartItem) => cartItem.id !== productId)
    : cart;

  NovaStore.saveCart(updatedCart);
  renderCart();
}

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (button) updateItem(button.dataset.id, button.dataset.action);
});

checkoutButton.addEventListener("click", () => {
  checkoutMessage.textContent = "Checkout is disabled because this is a frontend demonstration.";
  NovaStore.showToast("Frontend demo: no payment was processed");
});

renderCart();
