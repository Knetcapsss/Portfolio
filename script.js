// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const projectImages = document.querySelectorAll('.project-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let currentCategory = '';
let galleryLightboxMode = false;
let allProjectImages = [];

// Organize project images by category
function organizeProjectImages() {
  const categories = {};
  projectImages.forEach((img) => {
    const category = img.dataset.category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(img);
  });
  return categories;
}

const projectCategories = organizeProjectImages();

// Open lightbox when project image is clicked
projectImages.forEach((img) => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    currentCategory = img.dataset.category;
    allProjectImages = projectCategories[currentCategory];
    currentImageIndex = allProjectImages.indexOf(img);
    galleryLightboxMode = false;
    openLightbox(img.src);
  });
});

function openLightbox(imageSrc) {
  lightboxImg.src = imageSrc;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
  galleryLightboxMode = false;
}

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Navigation buttons
lightboxPrev.addEventListener('click', () => {
  if (galleryLightboxMode) {
    currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentSlide].src;
  } else {
    currentImageIndex = (currentImageIndex - 1 + allProjectImages.length) % allProjectImages.length;
    lightboxImg.src = allProjectImages[currentImageIndex].src;
  }
});

lightboxNext.addEventListener('click', () => {
  if (galleryLightboxMode) {
    currentSlide = (currentSlide + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentSlide].src;
  } else {
    currentImageIndex = (currentImageIndex + 1) % allProjectImages.length;
    lightboxImg.src = allProjectImages[currentImageIndex].src;
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      lightboxPrev.click();
    } else if (e.key === 'ArrowRight') {
      lightboxNext.click();
    }
  }
});

// ===== GALLERY SLIDER FUNCTIONALITY =====
const gallerySlider = document.querySelector('.gallery-slider');
const slides = document.querySelectorAll('.gallery-slide');
const sliderPrevBtn = document.querySelector('.slider-prev');
const sliderNextBtn = document.querySelector('.slider-next');
const dots = document.querySelectorAll('.dot');
const galleryImages = document.querySelectorAll('.gallery-img');

let currentSlide = 0;

function moveSlide(n) {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${n * 100}%)`;
  });

  dots.forEach((dot, index) => {
    if (index === n) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Previous button
sliderPrevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  moveSlide(currentSlide);
});

// Next button
sliderNextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  moveSlide(currentSlide);
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    moveSlide(currentSlide);
  });
});

// Gallery images lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    currentSlide = index;
    galleryLightboxMode = true;
    openLightbox(img.src);
  });
});

// Keyboard navigation for gallery slider
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      sliderPrevBtn.click();
    } else if (e.key === 'ArrowRight') {
      sliderNextBtn.click();
    }
  } else if (galleryLightboxMode) {
    if (e.key === 'ArrowLeft') {
      currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentSlide].src;
    } else if (e.key === 'ArrowRight') {
      currentSlide = (currentSlide + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[currentSlide].src;
    }
  }
});

// Active nav link indicator
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});