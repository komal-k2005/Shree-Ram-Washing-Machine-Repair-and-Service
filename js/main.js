/*
 * Shri Ram Enterprises - Main JS File
 * Core: Animations Init, Header Scroll, Mobile Nav, Sliders, and Form validation
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      disable: 'mobile' // Optional: disable on mobile for absolute performance, or keep enabled
    });
  }

  // 2. Sticky Header Scroll Effect
  const header = document.getElementById('header');
  const checkScroll = () => {
    // Only apply transparency toggle on home page where hero exists.
    // Subpages have the scrolled state by default in HTML.
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') || 
                       !window.location.pathname.includes('.html');
                       
    if (isHomePage) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', checkScroll);
  // Initial check on load
  checkScroll();

  // 3. Mobile Navigation Menu Overlay
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileOverlayClose = document.getElementById('mobile-overlay-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileOverlay && mobileOverlayClose) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop page scrolling
    });

    const closeMenu = () => {
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = 'auto'; // Restore scrolling
    };

    mobileOverlayClose.addEventListener('click', closeMenu);
    
    // Close overlay when clicking on a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // 4. Services Nav Dropdown (Desktop hover/click toggle)
  const servicesNav = document.getElementById('services-nav');
  const servicesDropdown = document.getElementById('services-dropdown');

  if (servicesNav && servicesDropdown) {
    let timeoutId;
    
    servicesNav.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
      servicesDropdown.style.display = 'flex';
    });

    servicesNav.addEventListener('mouseleave', () => {
      timeoutId = setTimeout(() => {
        servicesDropdown.style.display = 'none';
      }, 300);
    });

    servicesDropdown.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
    });

    servicesDropdown.addEventListener('mouseleave', () => {
      servicesDropdown.style.display = 'none';
    });
  }

  // 5. Testimonial Review Slider Logic
  const slider = document.getElementById('review-slider');
  const slides = document.querySelectorAll('.review-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (slider && slides.length > 0) {
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    const updateSlider = () => {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlider();
    };

    // Button controls
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        startAutoSlide();
      });

      prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        startAutoSlide();
      });
    }

    // Auto-slide transition every 6 seconds
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 6000);
    };

    startAutoSlide();
  }

  // 6. Interactive Booking/Contact Form Validation and Submission
  const appointmentForm = document.getElementById('appointment-form');
  const formFeedback = document.getElementById('form-feedback');

  if (appointmentForm && formFeedback) {
    // Set default date input limit (prevent selecting past dates)
    const dateInput = appointmentForm.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page reload

      // Simple frontend validation checks
      const nameInput = document.getElementById('name').value.trim();
      const phoneInput = document.getElementById('phone').value.trim();
      const dateVal = dateInput ? dateInput.value : '';

      if (!nameInput || !phoneInput || !dateVal) {
        formFeedback.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        formFeedback.style.color = '#b91c1c';
        formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formFeedback.textContent = 'Please fill out all required fields marked with *';
        formFeedback.style.display = 'block';
        return;
      }

      // Phone number regex pattern check (digits, min 10 digits)
      const phonePattern = /^[0-9]{10,12}$/;
      // Strip out spaces, dashes, or brackets if user entered them
      const cleanPhone = phoneInput.replace(/[\s\-\(\)\+]/g, '');
      
      if (!phonePattern.test(cleanPhone) && cleanPhone.length < 10) {
        formFeedback.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        formFeedback.style.color = '#b91c1c';
        formFeedback.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        formFeedback.textContent = 'Please enter a valid 10-digit mobile number';
        formFeedback.style.display = 'block';
        return;
      }

      // Show loading state
      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right: 8px;"></i> Sending...';
      submitBtn.disabled = true;

      // Natively submit the form to bypass the e.preventDefault()
      HTMLFormElement.prototype.submit.call(appointmentForm);
    });
  }

});
