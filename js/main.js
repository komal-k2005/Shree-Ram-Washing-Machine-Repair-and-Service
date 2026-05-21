(function () {
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dots button");
  var prev = document.querySelector(".hero-prev");
  var next = document.querySelector(".hero-next");
  var current = 0;
  var timer;

  function showSlide(n) {
    if (!slides.length) return;
    current = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.classList.toggle("active", i === current);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
  }

  function nextSlide() { showSlide(current + 1); }

  if (slides.length) {
    showSlide(0);
    if (prev) prev.addEventListener("click", function () { showSlide(current - 1); });
    if (next) next.addEventListener("click", nextSlide);
    dots.forEach(function (d, i) {
      d.addEventListener("click", function () { showSlide(i); });
    });
    timer = setInterval(nextSlide, 6000);
    document.querySelector(".hero-slider")?.addEventListener("mouseenter", function () {
      clearInterval(timer);
    });
    document.querySelector(".hero-slider")?.addEventListener("mouseleave", function () {
      timer = setInterval(nextSlide, 6000);
    });
  }

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  var form = document.getElementById("enquiry-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (note) note.classList.add("show");
      form.reset();
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
