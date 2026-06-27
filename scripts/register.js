const form = document.querySelector("[data-register-form]");
const successMessage = document.querySelector("[data-form-success]");

const patterns = {
  fullName: /^[A-Za-z][A-Za-z '-]{1,49}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
};

function showError(fieldName, message) {
  const field = form.elements[fieldName];
  const error = form.querySelector(`[data-error-for="${fieldName}"]`);
  field.classList.toggle("invalid", Boolean(message));
  field.setAttribute("aria-invalid", String(Boolean(message)));
  error.textContent = message;
}

function validateForm() {
  const fullName = form.elements.fullName.value.trim();
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;
  const confirmPassword = form.elements.confirmPassword.value;
  const termsAccepted = form.elements.terms.checked;

  showError("fullName", patterns.fullName.test(fullName) ? "" : "Enter a valid name using letters.");
  showError("email", patterns.email.test(email) ? "" : "Enter a valid email address.");
  showError("password", patterns.password.test(password) ? "" : "Use 8+ characters with a letter and a number.");
  showError("confirmPassword", confirmPassword && confirmPassword === password ? "" : "Passwords must match.");

  const termsError = form.querySelector('[data-error-for="terms"]');
  termsError.textContent = termsAccepted ? "" : "You must accept the terms.";

  return Boolean(
    patterns.fullName.test(fullName) &&
    patterns.email.test(email) &&
    patterns.password.test(password) &&
    confirmPassword === password &&
    termsAccepted
  );
}

document.querySelectorAll("[data-password-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.passwordToggle);
    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    button.textContent = showPassword ? "Hide" : "Show";
    button.setAttribute("aria-label", `${showPassword ? "Hide" : "Show"} password`);
  });
});

form.addEventListener("input", (event) => {
  if (event.target.name) {
    successMessage.textContent = "";
    const error = form.querySelector(`[data-error-for="${event.target.name}"]`);
    if (error) error.textContent = "";
    event.target.classList.remove("invalid");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  if (!validateForm()) return;

  successMessage.textContent = "Account created successfully for this demonstration.";
  form.reset();
});
