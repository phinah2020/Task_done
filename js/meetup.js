class MeetupManager {
  constructor() {
    this.meetups = JSON.parse(localStorage.getItem("meetups")) || [];
    this.currentEditId = null;
    this.tags = [];
    this.searchTimeout = null;
    this.selectedTagIndex = -1;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderMeetups();
    this.setupTagSearch();
  }

  // Simulated database of tags - replace with actual API call
  async fetchTagsFromDatabase(searchTerm) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock database tags - replace with actual API call
    const mockTags = [
      "javascript",
      "react",
      "vue",
      "angular",
      "nodejs",
      "python",
      "django",
      "flask",
      "machine-learning",
      "ai",
      "data-science",
      "web-development",
      "mobile-development",
      "ios",
      "android",
      "flutter",
      "react-native",
      "blockchain",
      "cryptocurrency",
      "defi",
      "nft",
      "smart-contracts",
      "cloud-computing",
      "aws",
      "azure",
      "google-cloud",
      "kubernetes",
      "docker",
      "devops",
      "ci-cd",
      "testing",
      "automation",
      "ui-ux",
      "design",
      "figma",
      "photoshop",
      "illustrator",
      "startup",
      "entrepreneurship",
      "business",
      "marketing",
      "growth",
      "networking",
      "career",
      "mentorship",
      "leadership",
      "management",
    ];

    // Filter tags based on search term
    return mockTags
      .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 8) // Limit results
      .map((tag) => ({
        id: tag,
        name: tag,
        category: this.getTagCategory(tag),
      }));
  }

  getTagCategory(tag) {
    const categories = {
      javascript: "Programming",
      react: "Framework",
      vue: "Framework",
      angular: "Framework",
      nodejs: "Runtime",
      python: "Programming",
      django: "Framework",
      flask: "Framework",
      "machine-learning": "AI/ML",
      ai: "AI/ML",
      "data-science": "Data",
      "web-development": "Development",
      "mobile-development": "Development",
      ios: "Mobile",
      android: "Mobile",
      flutter: "Framework",
      "react-native": "Framework",
      blockchain: "Technology",
      cryptocurrency: "Finance",
      defi: "Finance",
      nft: "Technology",
      "smart-contracts": "Technology",
      "cloud-computing": "Cloud",
      aws: "Cloud",
      azure: "Cloud",
      "google-cloud": "Cloud",
      kubernetes: "DevOps",
      docker: "DevOps",
      devops: "DevOps",
      "ci-cd": "DevOps",
      testing: "Quality",
      automation: "DevOps",
      "ui-ux": "Design",
      design: "Design",
      figma: "Design Tool",
      photoshop: "Design Tool",
      illustrator: "Design Tool",
      startup: "Business",
      entrepreneurship: "Business",
      business: "Business",
      marketing: "Business",
      growth: "Business",
      networking: "Professional",
      career: "Professional",
      mentorship: "Professional",
      leadership: "Professional",
      management: "Professional",
    };
    return categories[tag] || "General";
  }

  setupEventListeners() {
    const createForm = document.getElementById("createMeetupForm");
    createForm.addEventListener("submit", (e) => this.handleCreateMeetup(e));
  }

  setupTagSearch() {
    const tagInput = document.getElementById("tagInput");
    const tagsDropdown = document.getElementById("tagsDropdown");

    tagInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.trim();

      // Clear previous timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      if (searchTerm.length >= 2) {
        // Show loading spinner
        tagsDropdown.innerHTML = `
                            <div class="tag-suggestion">
                                <div class="loading-spinner"></div>
                                <span>Searching tags...</span>
                            </div>
                        `;
        tagsDropdown.classList.add("show");

        // Debounce search
        this.searchTimeout = setTimeout(async () => {
          try {
            const suggestions = await this.fetchTagsFromDatabase(searchTerm);
            this.renderTagSuggestions(suggestions);
          } catch (error) {
            console.error("Error fetching tags:", error);
            tagsDropdown.innerHTML = `
                                    <div class="tag-suggestion">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        <span>Error loading tags</span>
                                    </div>
                                `;
          }
        }, 300);
      } else {
        tagsDropdown.classList.remove("show");
      }
    });

    // Handle keyboard navigation
    tagInput.addEventListener("keydown", (e) => {
      const suggestions = tagsDropdown.querySelectorAll(
        ".tag-suggestion:not(.no-results)"
      );

      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.selectedTagIndex = Math.min(
          this.selectedTagIndex + 1,
          suggestions.length - 1
        );
        this.updateSelectedTag(suggestions);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.selectedTagIndex = Math.max(this.selectedTagIndex - 1, -1);
        this.updateSelectedTag(suggestions);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (this.selectedTagIndex >= 0 && suggestions[this.selectedTagIndex]) {
          const tagName = suggestions[this.selectedTagIndex].dataset.tag;
          this.selectTag(tagName);
        }
      } else if (e.key === "Escape") {
        tagsDropdown.classList.remove("show");
        this.selectedTagIndex = -1;
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".tags-search-container")) {
        tagsDropdown.classList.remove("show");
        this.selectedTagIndex = -1;
      }
    });
  }

  renderTagSuggestions(suggestions) {
    const tagsDropdown = document.getElementById("tagsDropdown");

    if (suggestions.length === 0) {
      tagsDropdown.innerHTML = `
                        <div class="tag-suggestion no-results">
                            <i class="fas fa-search"></i>
                            <span>No tags found</span>
                        </div>
                    `;
    } else {
      tagsDropdown.innerHTML = suggestions
        .filter((tag) => !this.tags.includes(tag.name))
        .map(
          (tag, index) => `
                            <div class="tag-suggestion" data-tag="${tag.name}" onclick="meetupManager.selectTag('${tag.name}')">
                                <i class="fas fa-tag"></i>
                                <div>
                                    <div>${tag.name}</div>
                                    <small style="opacity: 0.7; font-size: 0.8rem;">${tag.category}</small>
                                </div>
                            </div>
                        `
        )
        .join("");
    }

    tagsDropdown.classList.add("show");
    this.selectedTagIndex = -1;
  }

  updateSelectedTag(suggestions) {
    suggestions.forEach((suggestion, index) => {
      suggestion.classList.toggle("selected", index === this.selectedTagIndex);
    });
  }

  selectTag(tagName) {
    if (!this.tags.includes(tagName)) {
      this.tags.push(tagName);
      this.renderTags();
    }

    const tagInput = document.getElementById("tagInput");
    const tagsDropdown = document.getElementById("tagsDropdown");

    tagInput.value = "";
    tagsDropdown.classList.remove("show");
    this.selectedTagIndex = -1;
    tagInput.focus();
  }

  addTag(tagText) {
    if (tagText && !this.tags.includes(tagText)) {
      this.tags.push(tagText);
      this.renderTags();
    }
  }

  removeTag(tagText) {
    this.tags = this.tags.filter((tag) => tag !== tagText);
    this.renderTags();
  }

  renderTags() {
    const tagsContainer = document.getElementById("tagsContainer");
    const tagInput = document.getElementById("tagInput");

    // Clear existing tags
    const existingTags = tagsContainer.querySelectorAll(".tag-item");
    existingTags.forEach((tag) => tag.remove());

    // Add current tags
    this.tags.forEach((tag) => {
      const tagElement = document.createElement("div");
      tagElement.className = "tag-item";
      tagElement.innerHTML = `
                        ${tag}
                        <span class="tag-remove" onclick="meetupManager.removeTag('${tag}')">
                            <i class="fas fa-times"></i>
                        </span>
                    `;
      tagsContainer.insertBefore(tagElement, tagInput);
    });
  }

  handleCreateMeetup(e) {
    e.preventDefault();

    const title = document.getElementById("meetupTitle").value;
    const date = document.getElementById("meetupDate").value;
    const description = document.getElementById("meetupDescription").value;

    const meetup = {
      id: Date.now(),
      title,
      date,
      description,
      tags: [...this.tags],
      createdAt: new Date().toISOString(),
    };

    this.meetups.unshift(meetup);
    this.saveMeetups();
    this.renderMeetups();
    this.resetForm();
    this.showSuccess("Meetup created successfully!");
  }

  deleteMeetup(id) {
    if (confirm("Are you sure you want to delete this meetup?")) {
      this.meetups = this.meetups.filter((meetup) => meetup.id !== id);
      this.saveMeetups();
      this.renderMeetups();
      this.showSuccess("Meetup deleted successfully!");
    }
  }

  editMeetup(id) {
    const meetup = this.meetups.find((m) => m.id === id);
    if (!meetup) return;

    // Hide all other edit forms
    document.querySelectorAll(".edit-form").forEach((form) => {
      form.classList.remove("active");
    });

    // Show current edit form
    const editForm = document.getElementById(`edit-form-${id}`);
    editForm.classList.add("active");
    this.currentEditId = id;
  }

  cancelEdit(id) {
    const editForm = document.getElementById(`edit-form-${id}`);
    editForm.classList.remove("active");
    this.currentEditId = null;
  }

  saveEdit(id) {
    const meetup = this.meetups.find((m) => m.id === id);
    if (!meetup) return;

    const title = document.getElementById(`edit-title-${id}`).value;
    const date = document.getElementById(`edit-date-${id}`).value;
    const description = document.getElementById(`edit-description-${id}`).value;
    const tagsValue = document.getElementById(`edit-tags-${id}`).value;
    const tags = tagsValue
      ? tagsValue
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    meetup.title = title;
    meetup.date = date;
    meetup.description = description;
    meetup.tags = tags;

    this.saveMeetups();
    this.renderMeetups();
    this.showSuccess("Meetup updated successfully!");
  }

  renderMeetups() {
    const meetupsList = document.getElementById("meetupsList");

    if (this.meetups.length === 0) {
      meetupsList.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-calendar-plus"></i>
                            <h3>No meetups yet</h3>
                            <p>Create your first meetup to get started!</p>
                        </div>
                    `;
      return;
    }

    meetupsList.innerHTML = this.meetups
      .map(
        (meetup) => `
                    <div class="meetup-card">
                        <div class="meetup-header">
                            <div class="meetup-info">
                                <h3 class="meetup-title">${meetup.title}</h3>
                                <div class="meetup-date">
                                    <i class="fas fa-calendar"></i>
                                    ${new Date(
                                      meetup.date
                                    ).toLocaleDateString()} at ${new Date(
          meetup.date
        ).toLocaleTimeString()}
                                </div>
                            </div>
                            <div class="meetup-actions">
                                <button class="btn btn-secondary btn-small" onclick="meetupManager.editMeetup(${
                                  meetup.id
                                })">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button class="btn btn-danger btn-small" onclick="meetupManager.deleteMeetup(${
                                  meetup.id
                                })">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                        
                        <p class="meetup-description">${meetup.description}</p>
                        
                        ${
                          meetup.tags && meetup.tags.length > 0
                            ? `
                            <div class="meetup-tags">
                                ${meetup.tags
                                  .map(
                                    (tag) =>
                                      `<span class="meetup-tag">#${tag}</span>`
                                  )
                                  .join("")}
                            </div>
                        `
                            : ""
                        }

                        <div class="edit-form" id="edit-form-${meetup.id}">
                            <h4><i class="fas fa-edit"></i> Edit Meetup</h4>
                            
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" id="edit-title-${
                                  meetup.id
                                }" class="form-control" value="${meetup.title}">
                            </div>
                            
                            <div class="form-group">
                                <label>Date & Time</label>
                                <input type="datetime-local" id="edit-date-${
                                  meetup.id
                                }" class="form-control" value="${meetup.date}">
                            </div>
                            
                            <div class="form-group">
                                <label>Description</label>
                                <textarea id="edit-description-${
                                  meetup.id
                                }" class="form-control">${
          meetup.description
        }</textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Tags (comma-separated)</label>
                                <input type="text" id="edit-tags-${
                                  meetup.id
                                }" class="form-control" value="${
          meetup.tags ? meetup.tags.join(", ") : ""
        }" placeholder="tag1, tag2, tag3">
                            </div>
                            
                            <div class="form-actions">
                                <button class="btn btn-primary btn-small" onclick="meetupManager.saveEdit(${
                                  meetup.id
                                })">
                                    <i class="fas fa-save"></i> Save Changes
                                </button>
                                <button class="btn btn-secondary btn-small" onclick="meetupManager.cancelEdit(${
                                  meetup.id
                                })">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                `
      )
      .join("");
  }

  resetForm() {
    document.getElementById("createMeetupForm").reset();
    this.tags = [];
    this.renderTags();
  }

  saveMeetups() {
    localStorage.setItem("meetups", JSON.stringify(this.meetups));
  }

  showSuccess(message) {
    const successMessage = document.getElementById("successMessage");
    const successText = document.getElementById("successText");
    successText.textContent = message;
    successMessage.classList.add("show");

    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 3000);
  }
}

// Initialize the meetup manager
const meetupManager = new MeetupManager();
