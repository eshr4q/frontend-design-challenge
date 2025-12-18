document.addEventListener("DOMContentLoaded", () => {
  // --- RANGE SLIDER LOGIC ---
  const rangeInput = document.getElementById("rangeInput");
  const displayValue = document.getElementById("displayValue");
  const labelContainer = document.getElementById("labelContainer");

  // Convert English to Persian
  function toPersianDigits(num) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (x) => farsiDigits[x]);
  }

  function setupLabels() {
    if (!labelContainer) return;
    labelContainer.innerHTML = "";
    for (let i = 10; i <= 100; i += 10) {
      const span = document.createElement("span");
      span.textContent = toPersianDigits(i);
      labelContainer.appendChild(span);
    }
  }

  // Update slider gradient and value
  function updateSlider() {
    if (!rangeInput) return;

    const val = parseInt(rangeInput.value);
    const min = parseInt(rangeInput.min);
    const max = parseInt(rangeInput.max);

    // Calculate percentage for gradient
    const percentage = ((val - min) / (max - min)) * 100;

    // Apply to CSS Variable
    rangeInput.style.setProperty("--progress", `${percentage}%`);

    // Update Text
    if (displayValue) {
      displayValue.textContent = toPersianDigits(val);
    }
  }

  // Initialize
  setupLabels();
  if (rangeInput) {
    rangeInput.addEventListener("input", updateSlider);
    updateSlider(); // Run once on load
  }
  // --- CUSTOM SLIDER LOGIC ---
  const track = document.getElementById("track");
  if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById("btnPrev");
    const prevBtn = document.getElementById("btnNext");
    const dotWrapper = document.getElementById("dotWrapper");

    let currentIndex = 0;

    // Generate Dots
    slides.forEach((_, idx) => {
      const d = document.createElement("div");
      d.classList.add("nav-dot");
      if (idx === 0) d.classList.add("active");
      d.addEventListener("click", () => goToSlide(idx));
      dotWrapper.appendChild(d);
    });

    const dots = Array.from(dotWrapper.children);

    function goToSlide(index) {
      currentIndex = index;

      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = 24;

      // Calculate how much to move left to center this item
      const moveAmount = slideWidth / 2 + index * (slideWidth + gap);

      track.style.transform = `translateX(-${moveAmount}px)`;

      slides.forEach((s) => s.classList.remove("active"));
      slides[currentIndex].classList.add("active");

      dots.forEach((d) => d.classList.remove("active"));
      dots[currentIndex].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
      if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) goToSlide(currentIndex - 1);
    });

    setTimeout(() => goToSlide(0), 100);

    window.addEventListener("resize", () => goToSlide(currentIndex));
  }
});
