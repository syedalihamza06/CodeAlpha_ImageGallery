// =======================
// Sidebar Toggle (Mobile)
// =======================
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});


// =======================
// Sidebar Navigation Buttons as Filter
// =======================
const navBtns = document.querySelectorAll(".nav-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove old active
    navBtns.forEach(b => b.classList.remove("active"));
    // Add active to current
    btn.classList.add("active");

    // Get category
    const cat = btn.dataset.category;

    // Filter gallery
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

// Open Lightbox on image click
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

// Update Lightbox content
function updateLightbox() {
  lightboxImg.src = images[currentIndex].src;
  captionText.innerHTML = images[currentIndex].alt;
}

// Close Lightbox
function closeLightbox() {
  lightbox.style.display = "none";
}

// Close button
closeBtn.addEventListener("click", closeLightbox);

// Prev button
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
});

// Next button
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
});

// Close on outside click
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard Support (Esc, Left, Right)
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
