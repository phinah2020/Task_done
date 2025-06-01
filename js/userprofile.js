// Add smooth scrolling and enhanced interactions
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to interactive elements
  const cards = document.querySelectorAll(
    ".stat-card, .question-item, .meetup-item"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = this.classList.contains("stat-card")
        ? "translateY(-5px)"
        : "translateX(5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "none";
    });
  });

  // Add click handlers for questions (could navigate to question detail)
  const questionItems = document.querySelectorAll(".question-item");
  questionItems.forEach((item) => {
    item.addEventListener("click", function () {
      console.log(
        "Navigate to question:",
        this.querySelector(".question-title").textContent
      );
      // Add navigation logic here
    });
  });

  // Add click handlers for meetups (could show more details)
  const meetupItems = document.querySelectorAll(".meetup-item");
  meetupItems.forEach((item) => {
    item.addEventListener("click", function () {
      console.log(
        "Show meetup details:",
        this.querySelector(".meetup-title").textContent
      );
      // Add meetup details logic here
    });
  });

  // Animate statistics on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Initially hide elements for animation
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // Add responsive menu toggle if needed
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      document.body.classList.add("mobile-view");
    } else {
      document.body.classList.remove("mobile-view");
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();
});
