// Form validation functions
function showError(message) {
  const errorMessage = document.createElement("div");
  errorMessage.className = "error-popup";
  errorMessage.innerHTML = `
        <div class="error-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
  document.body.appendChild(errorMessage);
  setTimeout(() => errorMessage.remove(), 3000);
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
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Basic validation
    if (!fullname || !email || !username || !password || !confirmPassword) {
      e.preventDefault();
      showError("Please fill in all fields");
      return false;
    }

    // Password validation
    if (password !== confirmPassword) {
      e.preventDefault();
      showError("Passwords do not match!");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      showError("Please enter a valid email address");
      return false;
    }

    // Let the form submit normally to register.php
  });
}
