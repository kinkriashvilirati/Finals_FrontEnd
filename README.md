# NOVA Market

NOVA Market is a responsive general-products store built with semantic HTML5, CSS, and vanilla JavaScript.

## Pages

- `index.html` — fetched product catalogue, search, and category filter
- `cart.html` — persistent shopping cart
- `register.html` — validated registration form
- `about.html` — project and brand information

## Course requirements

- Semantic HTML5 elements
- Hover effects and CSS transitions
- Responsive layouts at 1024px, 768px, 480px, and 320px
- Google Fonts
- Registration form with required fields, regex validation, and password visibility controls
- Functional mobile burger menu
- Products loaded with a GET request using `fetch()`
- Product search and category filter
- Cart and cookie choice saved in `localStorage`
- Scroll-aware header and back-to-top button

## Run locally

The products are loaded from a JSON file with `fetch()`, so use a local server instead of opening the HTML file directly.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. The project also works when deployed with GitHub Pages.
