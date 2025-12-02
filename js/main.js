document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggler = document.querySelector(".navbar-toggler");
  const navCollapseEl = document.getElementById("primaryNav");

  if (navToggler && navCollapseEl) {
    const setBodyNavState = (isOpen) => {
      document.body.classList.toggle("nav-open", isOpen);
    };

    const updateNavHeight = () => {
      const navHeight = navCollapseEl.scrollHeight;
      navCollapseEl.style.setProperty("--nav-max-height", `${navHeight}px`);
    };

    const closeMenu = () => {
      navCollapseEl.classList.remove("show");
      navToggler.classList.add("collapsed");
      navToggler.setAttribute("aria-expanded", "false");
      setBodyNavState(false);
    };

    const openMenu = () => {
      updateNavHeight();
      navCollapseEl.classList.add("show");
      navToggler.classList.remove("collapsed");
      navToggler.setAttribute("aria-expanded", "true");
      setBodyNavState(true);
    };

    navToggler.classList.add("collapsed");
    navToggler.setAttribute("aria-expanded", "false");

    navToggler.addEventListener("click", () => {
      if (navCollapseEl.classList.contains("show")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navCollapseEl.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          closeMenu();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        closeMenu();
        navCollapseEl.style.removeProperty("--nav-max-height");
      } else if (navCollapseEl.classList.contains("show")) {
        updateNavHeight();
      }
    });

    navCollapseEl.addEventListener("transitionend", (event) => {
      if (event.propertyName === "max-height" && !navCollapseEl.classList.contains("show")) {
        navCollapseEl.style.removeProperty("--nav-max-height");
      }
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const inputs = Array.from(contactForm.querySelectorAll("input, textarea"));

  const validateField = (field) => {
    if (field.checkValidity()) {
      field.classList.remove("is-invalid");
    } else {
      field.classList.add("is-invalid");
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => validateField(input));
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    inputs.forEach((input) => {
      validateField(input);
      if (!input.checkValidity()) {
        isValid = false;
      }
    });

    if (isValid) {
      const toast = document.createElement("div");
      toast.className = "toast align-items-center text-bg-primary border-0 position-fixed top-0 end-0 m-3";
      toast.style.zIndex = "1080";
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            Thank you! We received your message and will respond shortly.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;

      document.body.appendChild(toast);

      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast, {
        delay: 4000,
      });

      toastBootstrap.show();

      toast.addEventListener("hidden.bs.toast", () => {
        toast.remove();
      });

      contactForm.reset();
    }
  });
});
