'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

// Sidebar variables & mobile toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// Project Modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalCategory = document.querySelector("[data-modal-category]");
const modalMetrics = document.querySelector("[data-modal-metrics]");
const modalTech = document.querySelector("[data-modal-tech]");

const toggleModal = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
};

// Add click event to project cards to open rich modal
const projectCards = document.querySelectorAll("[data-project-card]");

projectCards.forEach(card => {
  card.addEventListener("click", function (e) {
    e.preventDefault();

    const title = this.dataset.title || this.querySelector(".project-title")?.innerText || "Project";
    const category = this.dataset.category || this.querySelector(".project-category")?.innerText || "";
    const imgSrc = this.dataset.img || this.querySelector("img")?.src || "";
    const description = this.dataset.desc || "";
    const metrics = this.dataset.metrics || "";
    const tech = this.dataset.tech || "";

    if (modalTitle) modalTitle.innerText = title;
    if (modalImg) {
      modalImg.src = imgSrc;
      modalImg.alt = title;
    }
    if (modalCategory) modalCategory.innerText = category.toUpperCase();
    if (modalText) {
      modalText.innerHTML = `<p>${description}</p>`;
    }
    if (modalMetrics) {
      if (metrics) {
        const metricsItems = metrics.split('|').map(m => `<div class="modal-metrics-item"><span>▹</span> ${m.trim()}</div>`).join('');
        modalMetrics.innerHTML = `<div class="modal-section-title">Key Impact &amp; Engineering Highlights</div><div class="modal-metrics-box">${metricsItems}</div>`;
        modalMetrics.style.display = "block";
      } else {
        modalMetrics.style.display = "none";
      }
    }
    if (modalTech) {
      if (tech) {
        const techPills = tech.split(',').map(t => `<span class="modal-tech-pill">${t.trim()}</span>`).join('');
        modalTech.innerHTML = `<div class="modal-section-title">Technologies Used</div><div class="modal-tech-pills">${techPills}</div>`;
        modalTech.style.display = "block";
      } else {
        modalTech.style.display = "none";
      }
    }

    toggleModal();
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleModal);
if (overlay) overlay.addEventListener("click", toggleModal);

// Close modal on ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalContainer && modalContainer.classList.contains("active")) {
    toggleModal();
  }
});

// Custom category filter for projects
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

const filterFunc = function (selectedValue) {
  const normSelected = selectedValue.trim().toLowerCase();

  for (let i = 0; i < filterItems.length; i++) {
    const itemCat = (filterItems[i].dataset.category || "").trim().toLowerCase();

    if (normSelected === "all" || normSelected === itemCat) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// Filter select items on mobile
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText;
    if (selectValue) selectValue.innerText = selectedValue;
    elementToggleFunc(select);
    filterFunc(selectedValue);

    // Sync desktop active button
    filterBtns.forEach(btn => {
      if (btn.innerText.trim().toLowerCase() === selectedValue.trim().toLowerCase()) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  });
}

// Filter button items on desktop
let lastClickedBtn = filterBtns[0];

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    const selectedValue = this.innerText;
    if (selectValue) selectValue.innerText = selectedValue;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact form variables & validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formToast = document.querySelector("[data-form-toast]");

if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="fullname"]')?.value || "";
    const email = form.querySelector('[name="email"]')?.value || "";
    const message = form.querySelector('[name="message"]')?.value || "";

    // Show confirmation feedback
    if (formToast) {
      formToast.classList.add("active");
      setTimeout(() => {
        formToast.classList.remove("active");
      }, 6000);
    }

    // Prepare mailto link as fallback
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:srihithajindam1402@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
    if (formBtn) formBtn.setAttribute("disabled", "");
  });
}

// Page navigation logic
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const target = (this.dataset.navTarget || this.innerText).trim().toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      const pageName = (pages[j].dataset.page || "").trim().toLowerCase();

      if (target === pageName) {
        pages[j].classList.add("active");
        navigationLinks[j]?.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j]?.classList.remove("active");
      }
    }

    // Keep the clicked button active even if indexes differ
    navigationLinks.forEach(btn => {
      const btnTarget = (btn.dataset.navTarget || btn.innerText).trim().toLowerCase();
      if (btnTarget === target) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  });
}