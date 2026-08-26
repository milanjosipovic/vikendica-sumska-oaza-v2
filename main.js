document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LIGHTBOX FUNKCIONALNOST ZA GALERIJU ---
  const galleryImages = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  let currentImageIndex = 0;

  const updateLightboxImage = (index) => {
    const totalImages = galleryImages.length;
    if (!totalImages) {
      return;
    }

    currentImageIndex = (index + totalImages) % totalImages;
    const activeImage = galleryImages[currentImageIndex];
    lightboxImg.src = activeImage.src;
    lightboxImg.alt = activeImage.alt;
  };

  // Otvaranje slike na klik
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      updateLightboxImage(index);
      lightbox.style.display = "flex";
    });
  });

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightboxImage(currentImageIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightboxImage(currentImageIndex + 1);
    });
  }

  // Zatvaranje klikom na dugme X
  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Zatvaranje klikom bilo gde van slike
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });

  // Zatvaranje pritiskom na ESC taster
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      lightbox.style.display = "none";
    }

    if (lightbox.style.display === "flex" && e.key === "ArrowLeft") {
      updateLightboxImage(currentImageIndex - 1);
    }

    if (lightbox.style.display === "flex" && e.key === "ArrowRight") {
      updateLightboxImage(currentImageIndex + 1);
    }
  });

  // Prikaži fiksno mobilno dugme tek nakon hero sekcije.
  const stickyCall = document.querySelector(".mobile-sticky-call");
  const heroSection = document.querySelector(".hero");
  const contactSection = document.querySelector("#kontakt");

  if (stickyCall && heroSection) {
    const toggleStickyCall = () => {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      let isContactInView = false;

      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        isContactInView =
          contactRect.top < window.innerHeight * 0.85 && contactRect.bottom > 0;
      }

      if (window.scrollY > heroBottom - 120 && !isContactInView) {
        stickyCall.classList.add("is-visible");
      } else {
        stickyCall.classList.remove("is-visible");
      }
    };

    toggleStickyCall();
    window.addEventListener("scroll", toggleStickyCall, { passive: true });
    window.addEventListener("resize", toggleStickyCall);
  }
});
