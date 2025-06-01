document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const passwordContainer = document.getElementById("password-container");

  // Create password toggle button
  const togglePassword = document.createElement("i");
  togglePassword.className = "fa-solid fa-eye password-toggle";
  togglePassword.style.position = "absolute";
  togglePassword.style.right = "10px";
  togglePassword.style.top = "50%";
  togglePassword.style.transform = "translateY(-50%)";
  togglePassword.style.cursor = "pointer";

  // Function to show notification
  function showNotification(message, isError = false) {
    const notification = document.createElement("div");
    notification.className = `notification ${isError ? "error" : "success"}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  loginForm.addEventListener("submit", async (e) => {
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

    const formData = new FormData(loginForm);

    try {
      // Simulated API call - replace this with your actual login API endpoint
      console.log("Logging in with:", {
        username: formData.get("username"),
        password: "********",
      });

      // Here you would typically make an AJAX call to your login API
      // For demonstration, we'll simulate a successful login
      
      showNotification("Login successful!");
      
      // Redirect to admin dashboard after successful login
      setTimeout(() => {
        window.location.href = "admin/index.html";
      }, 1000);
    } catch (error) {
      showNotification("Login failed. Please try again.", true);
    }
  });

  // Add password visibility toggle
  if (passwordContainer) {
    passwordContainer.style.position = "relative";
    passwordContainer.appendChild(togglePassword);

    togglePassword.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      togglePassword.className = `fa-solid ${type === "password" ? "fa-eye" : "fa-eye-slash"} password-toggle`;
    });
  }
});
