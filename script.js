// =======================
// Sidebar Toggle (Mobile)
// =======================
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// =======================
// Sidebar Nav Buttons as Filter
// =======================
const navBtns = document.querySelectorAll(".nav-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Active button highlight
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Filter gallery
    const cat = btn.dataset.category;
    galleryItems.forEach(item => {
      if (cat === "all" || item.dataset.category === cat) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// =======================
// Lightbox Feature
// =======================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.querySelector(".caption");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const images = Array.from(document.querySelectorAll(".gallery-item img"));
let currentIndex = 0;

images.forEach((img, i) => {
  img.addEventListener("click", () => {
    currentIndex = i;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.style.display = "block";
  updateLightbox();
}

function updateLightbox() {
  lightboxImg.src = images[currentIndex].src;
  captionText.innerHTML = images[currentIndex].alt;
}

function closeLightbox() {
  lightbox.style.display = "none";
}

closeBtn.addEventListener("click", closeLightbox);

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", e => {
  if (lightbox.style.display === "block") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    }
  }
});
