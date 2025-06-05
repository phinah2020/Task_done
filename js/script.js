// Form validation functions
ffunction showError(message, isSuccess = false) {
  const notification = document.createElement("div");
  notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Login form handling
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic validation
    if (!username || !password) {
      e.preventDefault();
      showError("Please fill in all fields");
      return false;
    }
    // Let the form submit normally to login.php
  });
}

// Signup form handling
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Basic validation
    if (!fullname || !email || !username || !password || !confirmPassword) {
      showError("Please fill in all fields");
      return;
    }

    // Password validation
    if (password !== confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Please enter a valid email address");
      return;
    }

    // Store user data in localStorage (for demo purposes)
    localStorage.setItem('user', JSON.stringify({
      fullname,
      email,
      username
    }));

    // Show success message
    showError("Registration successful! Redirecting to login...");

    // Redirect to signin page after a short delay
    setTimeout(() => {
      window.location.href = 'signin.html';
    }, 2000);
