document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Function to show notifications
  function showNotification(message, isError = false) {
    // Remove any existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${isError ? "error" : "success"}`;
    notification.innerHTML = `<p>${message}</p>`;

    // Add to DOM
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => notification.remove(), 3000);
  }

  // Add password visibility toggle
  const passwordContainer = passwordInput.parentElement;
  const togglePassword = document.createElement("i");
  togglePassword.className = "fa-solid fa-eye password-toggle";
  togglePassword.style.position = "absolute";
  togglePassword.style.right = "15px";
  togglePassword.style.top = "50%";
  togglePassword.style.transform = "translateY(-50%)";
  togglePassword.style.cursor = "pointer";
  togglePassword.style.color = "#888";

  passwordContainer.style.position = "relative";
  passwordContainer.appendChild(togglePassword);

  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.className = "fa-solid fa-eye-slash password-toggle";
    } else {
      passwordInput.type = "password";
      togglePassword.className = "fa-solid fa-eye password-toggle";
    }
  });

  // Form submission handler
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!usernameInput.value.trim()) {
      showNotification("Please enter your username or email", true);
      usernameInput.focus();
      return;
    }

    if (!passwordInput.value.trim()) {
      showNotification("Please enter your password", true);
      passwordInput.focus();
      return;
    }

    // For demonstration, we'll use client-side validation
    // In a real app, this would be an API call to your backend
    const formData = new FormData(loginForm);

    console.log("Logging in with:", {
      username: formData.get("username"),
      password: "********",
    });

    // Simulate successful login
    showNotification("Login successful!");

    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
});
