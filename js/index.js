// Toggle like button
function toggleLike(button) {
  const voteSection = button.parentElement;
  const dislikeBtn = voteSection.querySelector(".vote-btn:last-child");
  const voteCount = voteSection.querySelector(".vote-count");
  let count = parseInt(voteCount.textContent);

  // Remove dislike if active
  if (dislikeBtn.classList.contains("disliked")) {
    dislikeBtn.classList.remove("disliked");
    count++;
  }

  // Toggle like
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    count--;
  } else {
    button.classList.add("liked");
    count++;
  }

  voteCount.textContent = count;
}

// Toggle dislike button
function toggleDislike(button) {
  const voteSection = button.parentElement;
  const likeBtn = voteSection.querySelector(".vote-btn:first-child");
  const voteCount = voteSection.querySelector(".vote-count");
  let count = parseInt(voteCount.textContent);

  // Remove like if active
  if (likeBtn.classList.contains("liked")) {
    likeBtn.classList.remove("liked");
    count--;
  }

  // Toggle dislike
  if (button.classList.contains("disliked")) {
    button.classList.remove("disliked");
    count++;
  } else {
    button.classList.add("disliked");
    count--;
  }

  voteCount.textContent = count;
}

// Toggle comments section
function toggleComments(button) {
  const commentForm = button
    .closest(".question-card")
    .querySelector(".comment-form");
  commentForm.classList.toggle("active");

  if (commentForm.classList.contains("active")) {
    commentForm.querySelector(".comment-input").focus();
  }
}

// Form submission handler
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("questionForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const title = document.getElementById("questionTitle").value;
      const description = document.getElementById("questionDescription").value;

      if (title.trim()) {
        // Show success message
        const submitBtn = this.querySelector(".btn");
        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-check"></i> Posted!';
        submitBtn.style.background = "#27ae60";

        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = "";
          this.reset();
        }, 2000);
      }
    });
});
