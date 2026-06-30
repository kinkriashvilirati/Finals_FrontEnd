const productGrid = document.querySelector("[data-product-grid]");
const statusMessage = document.querySelector("[data-product-status]");
const searchInput = document.querySelector("[data-search-input]");
const categoryFilter = document.querySelector("[data-category-filter]");

let products = [];

async function loadProducts() {
  try {
    const response = await fetch("data/store-products.json");
    if (!response.ok) throw new Error("The product request failed.");

    products = await response.json();
    addCategoryOptions();
    renderProducts(products);
    statusMessage.hidden = true;
  } catch (error) {
    statusMessage.textContent = "Products could not be loaded. Please run the website through a local server.";
    console.error(error);
  }
}

function addCategoryOptions() {
  const categories = [...new Set(products.map((product) => product.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });
}

function renderProducts(productList) {
  if (productList.length === 0) {
    productGrid.innerHTML = '<p class="empty-results">No products match your search.</p>';
    return;
  }

  productGrid.innerHTML = productList
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image-wrap">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-bottom">
              <span class="product-price">${NovaStore.formatPrice(product.price)}</span>
              <button class="add-button" type="button" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">+</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function filterProducts() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}

function addToCart(productId, button) {
  const selectedProduct = products.find((product) => product.id === productId);
  const cart = NovaStore.getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...selectedProduct, quantity: 1 });
  }
  console.log(NovaStore)
  NovaStore.saveCart(cart);
  NovaStore.showToast(`${selectedProduct.name} added to cart`);
  button.textContent = "✓";
  button.classList.add("added");
  setTimeout(() => {
    button.textContent = "+";
    button.classList.remove("added");
  }, 1000);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product-id]");
  if (button) addToCart(button.dataset.productId, button);
});

loadProducts();
