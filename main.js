document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LIGHTBOX FUNKCIONALNOST ZA GALERIJU ---
  const galleryImages = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  // Otvaranje slike na klik
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.style.display = "flex";
    });
  });

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
  });
});
