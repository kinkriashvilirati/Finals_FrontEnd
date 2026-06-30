# NOVA Market

## Big Picture

NOVA Market is a small responsive online store built with **HTML**, **CSS**, **JavaScript**, and **JSON**.

The project has four main pages:

* [`index.html`](index.html) — shop/home page
* [`about.html`](about.html) — about page
* [`register.html`](register.html) — registration form
* [`cart.html`](cart.html) — shopping cart page

The website uses:

* **HTML** for page structure
* **CSS** for design and responsive layout
* **JavaScript** for interactivity
* **JSON** for product data
* **localStorage** for saving cart data and cookie choice

---

## CSS Organization

The CSS is split by responsibility, so each file has a clear purpose.

### Global Styles

[`styles/style.css`](styles/style.css)

This file contains shared styles used across the whole website, including:

* colors
* typography
* containers
* buttons
* shared helper classes
* cookie banner
* toast message
* back-to-top button

### Navigation

[`styles/navigation.css`](styles/navigation.css)

This file controls:

* header layout
* logo
* navigation links
* cart count
* mobile burger menu

### Footer

[`styles/footer.css`](styles/footer.css)

This file controls the footer layout and footer styling.

### Shop/Home Page

[`styles/shop.css`](styles/shop.css)

This file controls the homepage sections, including:

* hero section
* benefits section
* newsletter section

### Products

[`styles/products.css`](styles/products.css)

This file controls:

* product grid
* product cards
* search controls
* category filter controls
* add-to-cart button

### About Page

[`styles/about.css`](styles/about.css)

This file controls:

* story section
* values section
* contact strip

### Register Page

[`styles/register.css`](styles/register.css)

This file controls:

* registration form layout
* input fields
* validation messages

### Cart Page

[`styles/cart.css`](styles/cart.css)

This file controls:

* cart items
* quantity controls
* cart summary
* empty cart state

---

## JavaScript Flow

## Shared JavaScript

The shared JavaScript file is:

[`scripts/shared.js`](scripts/shared.js)

This file runs on every page.

It handles:

* saving and reading the cart from `localStorage`
* updating the cart count in the navigation
* showing toast messages
* opening and closing the mobile menu
* showing the cookie banner
* scroll effects
* sticky header shadow
* back-to-top button
* setting the current year in the footer

---

## Homepage Product Flow

The homepage uses:

[`scripts/store.js`](scripts/store.js)

Product data comes from:

[`data/store-products.json`](data/store-products.json)

The homepage flow works like this:

1. JavaScript fetches the products from `store-products.json`.
2. It creates category filter options.
3. It renders product cards inside the product grid.
4. Search and category filters update the visible products.
5. Clicking the `+` button adds a product to the cart.
6. The cart is saved in `localStorage`.
7. A toast message confirms that the item was added.

---

## Cart Page Flow

The cart page uses:

[`scripts/cart-page.js`](scripts/cart-page.js)

The cart page flow works like this:

1. It reads cart data from `localStorage`.
2. If the cart is empty, it shows an empty-cart message.
3. If there are products, it renders each cart item.
4. It calculates the item count and total price.
5. Quantity buttons increase or decrease product quantity.
6. The remove button deletes an item from the cart.
7. Checkout is disabled because this project is only a frontend demo.

---

## Registration Page Flow

The registration page uses:

[`scripts/register.js`](scripts/register.js)

It handles:

* form validation
* required field checking
* email validation
* password validation rules
* confirm password matching
* terms checkbox validation
* password show/hide buttons
* success message after valid submission

---

## Good Presentation Order

A good way to present this project is:

1. Start with the purpose:
   “This is a responsive online store built with HTML, CSS, JavaScript, and JSON.”

2. Show the main pages:

   * Home
   * About
   * Register
   * Cart

3. Explain the file structure.

4. Explain how CSS is organized into separate files.

5. Explain homepage product loading with `fetch()`.

6. Explain cart saving with `localStorage`.

7. Explain shared features:

   * navigation
   * cookie banner
   * toast message
   * back-to-top button

8. Finish with responsiveness:

   * layout changes at `1024px`
   * `768px`
   * `480px`
   * `320px`

---

## Strong Presentation Line

This project separates structure, styling, and behavior clearly: HTML defines the pages, CSS files are organized by section or page, JavaScript controls the dynamic features, and product data comes from a JSON file.
