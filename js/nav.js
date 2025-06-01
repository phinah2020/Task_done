let sidebarCollapsed = false;

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const header = document.getElementById("header");
  const mainContent = document.getElementById("mainContent");

  sidebarCollapsed = !sidebarCollapsed;

  if (sidebarCollapsed) {
    sidebar.classList.add("collapsed");
    header.classList.add("sidebar-collapsed");
    mainContent.classList.add("sidebar-collapsed");
  } else {
    sidebar.classList.remove("collapsed");
    header.classList.remove("sidebar-collapsed");
    mainContent.classList.remove("sidebar-collapsed");
  }
}

// Add smooth hover effects
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(4px)";
  });

  item.addEventListener("mouseleave", function () {
    if (!this.classList.contains("active")) {
      this.style.transform = "translateX(0)";
    }
  });
});

// Mobile responsive sidebar toggle
if (window.innerWidth <= 768) {
  function toggleMobileSidebar() {
    document.getElementById("sidebar").classList.toggle("mobile-open");
  }
}

// Handle window resize
window.addEventListener("resize", function () {
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("collapsed");
    sidebarCollapsed = false;
  }
});
