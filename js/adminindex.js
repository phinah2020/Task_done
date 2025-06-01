// Simulate real-time updates
function updateStats() {
  const statValues = document.querySelectorAll(".stat-value");
  statValues.forEach((stat) => {
    const currentValue = parseInt(stat.textContent.replace(",", ""));
    const randomChange = Math.random() > 0.7 ? 1 : 0;
    if (randomChange) {
      stat.textContent = (currentValue + 1).toLocaleString();
    }
  });
}

// Add hover effects and interactions
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });
});

// Simulate loading state
function showLoading() {
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.classList.add("loading-skeleton");
  });

  setTimeout(() => {
    document.querySelectorAll(".stat-card").forEach((card) => {
      card.classList.remove("loading-skeleton");
    });
  }, 1000);
}

// Initialize
setInterval(updateStats, 10000); // Update stats every 10 seconds

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Add responsive menu toggle for mobile
function addMobileMenu() {
  const header = document.querySelector(".dashboard-header");
  const actions = document.querySelector(".header-actions");

  if (window.innerWidth <= 768) {
    actions.style.width = "100%";
    actions.style.justifyContent = "space-between";
  }
}

window.addEventListener("resize", addMobileMenu);
addMobileMenu();
