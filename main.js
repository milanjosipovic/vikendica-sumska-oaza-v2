document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  let currentImageIndex = 0;

  const updateLightbox = (index) => {
    if (!galleryImages.length || !lightboxImg) {
      return;
    }
    const total = galleryImages.length;
    currentImageIndex = (index + total) % total;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  };

  const openLightbox = (index) => {
    if (!lightbox) {
      return;
    }
    updateLightbox(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    if (!lightbox) {
      return;
    }
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (event) => {
      event.stopPropagation();
      updateLightbox(currentImageIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", (event) => {
      event.stopPropagation();
      updateLightbox(currentImageIndex + 1);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      updateLightbox(currentImageIndex - 1);
    }

    if (event.key === "ArrowRight") {
      updateLightbox(currentImageIndex + 1);
    }
  });

  const stickyCall = document.querySelector(".mobile-sticky-call");
  const hero = document.getElementById("hero");
  const contact = document.getElementById("kontakt");

  const toggleStickyCall = () => {
    if (!stickyCall || !hero) {
      return;
    }

    const heroBottom = hero.offsetTop + hero.offsetHeight;
    let contactVisible = false;

    if (contact) {
      const rect = contact.getBoundingClientRect();
      contactVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    }

    if (window.scrollY > heroBottom - 140 && !contactVisible) {
      stickyCall.classList.add("show");
    } else {
      stickyCall.classList.remove("show");
    }
  };

  toggleStickyCall();
  window.addEventListener("scroll", toggleStickyCall, { passive: true });
  window.addEventListener("resize", toggleStickyCall);

  const checkinInputs = [
    document.getElementById("checkin"),
    document.getElementById("quick-checkin"),
  ].filter(Boolean);

  const checkoutInputs = [
    document.getElementById("checkout"),
    document.getElementById("quick-checkout"),
  ].filter(Boolean);

  const today = new Date().toISOString().split("T")[0];
  checkinInputs.forEach((input) => {
    input.min = today;
    input.addEventListener("change", () => {
      checkoutInputs.forEach((checkout) => {
        checkout.min = input.value || today;
      });
    });
  });

  checkoutInputs.forEach((input) => {
    input.min = today;
  });
});
