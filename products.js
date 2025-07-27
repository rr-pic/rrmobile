const products = [
  {
    title: "Bluei Bluetooth Speaker",
    image: "r/iBluetooth-speaker.png",
    price: 249,
    oldPrice: 999
  },
  {
    title: "Neckband",
    image: "r/Bluetooth-Earphones.png",
    price: 249,
    oldPrice: 799
  },
  {
    title: "Data Cable V8",
    image: "r/v8-cable.png",
    price: 49,
    oldPrice: 549
  },
  {
    title: "Mobile Stand",
    image: "r/mobile-stand.png",
    price: 29,
    oldPrice: 199
  },
  {
    title: "T-800 Ultra Smart Watch",
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/watch/o/a/j/1-ultra-smart-fash-men-women-original-imahbgrrrgtj4bzk.jpeg?q=70&crop=false",
    price: 399,
    oldPrice: 999
  },
  {
    title: "Earphone Bluei",
    image: "r/bluei-earphone.png",
    price:59,
    oldPrice: 129
  },
  {
    title: "Cable Protector",
    image: "r/cable-pro.jpg",
    price: 29,
    oldPrice: 99
  },
  {
    title: "Earphone Ubon",
    image: "r/upon-earphones.png",
    price: 99,
    oldPrice: 299
  },
  {
    title: "C Type Data Cable",
    image: "r/c-type.png",
    price: 99,
    oldPrice: 299
  },
  {
    title: "C Type Earphone",
    image: "r/earphone-c.png",
    price: 199,
    oldPrice: 499
  },
  {
    title: "Type-C to 3.5mm Adapter",
    image: "r/c-type-3.5.png",
    price: 59,
    oldPrice: 249
  },
{
    title: "Earphone",
    image: "r/Earphone.png",
    price: 139,
    oldPrice: 499
  }
];

// Modal logic
function openModal(imageUrl, title) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  modal.style.display = "block";
  modal.setAttribute('aria-hidden', 'false');
  modalImg.src = imageUrl;
  modalImg.alt = title;
  modalCaption.textContent = title;
  modal.focus();
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
}

// Render product cards
function renderProducts() {
  const productsGrid = document.getElementById('products-grid');
  productsGrid.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image" tabindex="0" />
      <div class="product-title">${product.title}</div>
      <div class="product-pricing">
        <span class="price">₹${product.price}</span>
        <span class="old-price">₹${product.oldPrice}</span>
      </div>
    `;

    productsGrid.appendChild(productCard);

    const img = productCard.querySelector('.product-image');
    img.style.cursor = 'pointer';

    img.addEventListener('click', () =>
      openModal(product.image, product.title)
    );
    img.addEventListener('keypress', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(product.image, product.title);
      }
    });
  });
}

// === Hero Slider Logic ===
document.addEventListener('DOMContentLoaded', function() {
  renderProducts();

  // Modal events
  const modalClose = document.querySelector('.modal-close');
  modalClose.addEventListener('click', closeModal);

  const modal = document.getElementById('imageModal');
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === "Escape") closeModal();
  });

  // Carousel slider (icon menu)
  const carousel = document.getElementById('iconMenuCarousel');
  const btnLeft = document.getElementById('carouselLeft');
  const btnRight = document.getElementById('carouselRight');

  function scrollCarousel(direction) {
    const scrollAmount = carousel.offsetWidth * 0.65;
    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  btnLeft.addEventListener('click', () => scrollCarousel('left'));
  btnRight.addEventListener('click', () => scrollCarousel('right'));

  function updateCarouselButtons() {
    if (carousel.scrollWidth <= carousel.clientWidth) {
      btnLeft.style.display = btnRight.style.display = "none";
    } else {
      btnLeft.style.display = btnRight.style.display = "";
    }
  }
  updateCarouselButtons();
  window.addEventListener('resize', updateCarouselButtons);

  // Drag to scroll support for carousel
  let isDown = false, startX, scrollLeft;
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
  });
  carousel.addEventListener('mouseleave', () => { isDown = false; carousel.style.cursor = 'default'; });
  carousel.addEventListener('mouseup', () => { isDown = false; carousel.style.cursor = 'default'; });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollLeft - (x - startX);
  });
  // Touch events for swipe
  let touchStartX = null, touchStartLeft = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchStartLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('touchmove', (e) => {
    if (touchStartX === null) return;
    const moveX = e.touches[0].pageX - touchStartX;
    carousel.scrollLeft = touchStartLeft - moveX;
  });
  carousel.addEventListener('touchend', () => { touchStartX = null; });

  // --- Hero Slider ---
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const leftBtn = document.querySelector('.hero-nav.left');
  const rightBtn = document.querySelector('.hero-nav.right');
  const dotsWrap = document.getElementById('heroDots');
  let idx = 0, interval, paused = false;

  function showSlide(i) {
    slides.forEach((s, j) => s.classList.toggle('active', j === i));
    Array.from(dotsWrap.children).forEach((d, j) => d.classList.toggle('active', j === i));
    idx = i;
  }

  // Setup dots
  dotsWrap.innerHTML = '';
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('tabindex', 0);
    dot.addEventListener('click', () => { pauseSlider(); showSlide(i); });
    dot.addEventListener('keydown', e => {
      if (e.key === "Enter" || e.key === " ") { pauseSlider(); showSlide(i); }
    });
    dotsWrap.appendChild(dot);
  }
  showSlide(0);

  function nextSlide() { showSlide((idx + 1) % slides.length); }
  function prevSlide() { showSlide((idx - 1 + slides.length) % slides.length); }

  leftBtn.addEventListener('click', () => { pauseSlider(); prevSlide(); });
  rightBtn.addEventListener('click', () => { pauseSlider(); nextSlide(); });

  slides.forEach(slide => {
    slide.addEventListener('mouseenter', pauseSlider);
    slide.addEventListener('mouseleave', resumeSlider);
    slide.addEventListener('touchstart', pauseSlider, { passive: true });
    slide.addEventListener('touchend', resumeSlider, { passive: true });
  });

  function pauseSlider() {
    paused = true;
    clearInterval(interval);
  }
  function resumeSlider() {
    if (paused) {
      paused = false;
      startAuto();
    }
  }
  function startAuto() {
    clearInterval(interval);
    interval = setInterval(() => {
      if (!paused) nextSlide();
    }, 3400);
  }
  startAuto();
});


  document.addEventListener('DOMContentLoaded', function () {
    const referLink = document.getElementById('referLink');
    const popup = document.getElementById('referPopup');
    const closeBtn = document.getElementById('closeReferPopup');

    // Open popup on click
    referLink.addEventListener('click', function(e) {
      e.preventDefault();
      popup.style.display = 'flex';
      popup.setAttribute('aria-hidden', 'false');
      // Focus trap can be added here in advanced cases
    });

    // Close popup on clicking close button
    closeBtn.addEventListener('click', function() {
      popup.style.display = 'none';
      popup.setAttribute('aria-hidden', 'true');
    });

    // Close popup if clicking outside popup-content
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.style.display = 'none';
        popup.setAttribute('aria-hidden', 'true');
      }
    });

    // Optional: close popup with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.style.display === 'flex') {
        popup.style.display = 'none';
        popup.setAttribute('aria-hidden', 'true');
      }
    });
  });


