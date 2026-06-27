const CART_KEY = "novaCart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalItems = getCart().reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = totalItems;
  });
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function showToast(message) {
  let toast = document.querySelector("[data-toast]");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.dataset.toast = "";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 1800);
}

function setupMenu() {
  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");

  if (!menuButton || !navigation) return;

  function closeMenu() {
    menuButton.classList.remove("open");
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", isOpen);
  });

  navigation.addEventListener("click", closeMenu);
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
}

function setupCookieBanner() {
  if (localStorage.getItem("novaCookiesAccepted")) return;

  const banner = document.createElement("aside");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-label", "Cookie notice");
  banner.innerHTML = `
    <h2>Your privacy matters</h2>
    <p>We use browser storage to remember your cart and cookie choice.</p>
    <button class="button button-primary" type="button">Accept</button>
  `;
  document.body.append(banner);

  banner.querySelector("button").addEventListener("click", () => {
    localStorage.setItem("novaCookiesAccepted", "true");
    banner.remove();
  });
}

function setupScrollFeatures() {
  const header = document.querySelector("[data-header]");
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.textContent = "↑";
  document.body.append(backToTop);

  function updateOnScroll() {
    const hasScrolled = window.scrollY > 30;
    header?.classList.toggle("scrolled", hasScrolled);
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }

  window.addEventListener("scroll", updateOnScroll, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateOnScroll();
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

setupMenu();
setupCookieBanner();
setupScrollFeatures();
updateCartCount();

window.NovaStore = { getCart, saveCart, updateCartCount, formatPrice, showToast };
