document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
    setTimeout(() => notification.remove(), 3000);
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

      alert("Please enter your username or email");
    if (!usernameInput.value.trim()) {
      showNotification("Please enter your username or email", true);
      usernameInput.focus();
      return;
    }
      alert("Please enter your password");
    if (!passwordInput.value.trim()) {
      showNotification("Please enter your password", true);
      passwordInput.focus();
      return;
    // Here you would typically make an AJAX call to your login.php
    // For demonstration, we'll just show a success message
    const formData = new FormData(loginForm);

    // Simulated API call
    console.log("Logging in with:", {
      username: formData.get("username"),
      password: "********",
    });

    // Show success message (replace this with your actual login logic)
    alert("Login successful!");

    // Optional: Redirect to dashboard or home page
    // window.location.href = 'index.html';
  });
              window.location.href = "admin/index.html";
  // Password visibility toggle could be added here if needed
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
});
