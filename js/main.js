document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     TASK MENU LOGIC
     ========================================= */
  const taskMenuBtn = document.getElementById("taskMenuBtn");
  const taskMenuContainer = document.querySelector(".task-menu-container");
  const hamburgerIcon = document.querySelector(".hamburger");
  const closeIcon = document.querySelector(".close-icon");
  const menuItems = document.querySelectorAll(".menu-item");

  if (taskMenuBtn) {
    taskMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    function toggleMenu() {
      const isOpen = taskMenuContainer.classList.contains("open");

      if (isOpen) {
        taskMenuContainer.classList.remove("open");
        taskMenuBtn.classList.remove("active");
        hamburgerIcon.style.display = "block";
        closeIcon.style.display = "none";
      } else {
        taskMenuContainer.classList.add("open");
        taskMenuBtn.classList.add("active");
        hamburgerIcon.style.display = "none";
        closeIcon.style.display = "block";
      }
    }

    document.addEventListener("click", (e) => {
      if (
        taskMenuContainer.classList.contains("open") &&
        !taskMenuContainer.contains(e.target)
      ) {
        toggleMenu();
      }
    });

    menuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSelector = item.getAttribute("data-target");
        const targetSection = document.querySelector(targetSelector);

        if (targetSection) {
          toggleMenu();
          const offsetTop =
            targetSection.getBoundingClientRect().top + window.scrollY - 20;

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  /* ==============
  --- RANGE SLIDER LOGIC ---
  =============*/
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

  /*=============================================
--- DYNAMIC TABS GENERATOR ------------------------------------------------
==============*/

  const tabsContainer = document.getElementById("dynamicTabsContainer");

  if (tabsContainer) {
    const tabsData = [
      {
        id: 1,
        navLabel: "منو شماره یک",
        navIcon: "assets/icons/FlowerTulip.svg",
        contentTitle: "منو شماره یک",
        titleIcon: "assets/icons/FlowerTulip1.svg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و برای شرایط فعلی تکنولوژی مورد نیاز...",
        image: "assets/images/1.jpeg",
        hasPlayBtn: true,
        link: "#",
      },
      {
        id: 2,
        navLabel: "منو شماره دوم",
        navIcon: "assets/icons/Football.svg",
        contentTitle: "منو شماره دو",
        titleIcon: "assets/icons/FlowerTulip1.svg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.",
        image: "assets/images/dog-big.jpeg",
        hasPlayBtn: false,
        link: "#",
      },
      {
        id: 3,
        navLabel: "منو شماره سوم",
        navIcon: "assets/icons/Flag.svg",
        contentTitle: "منو شماره سه",
        titleIcon: "assets/icons/FlowerTulip1.svg",
        desc: "توضیحات مربوط به تب سوم در اینجا قرار می‌گیرد.",
        image: "assets/images/dog-big.jpeg",
        hasPlayBtn: false,
        link: "#",
      },
      {
        id: 4,
        navLabel: "منو شماره چهارم",
        navIcon: "assets/icons/Feather.svg",
        contentTitle: "منو شماره چهارم",
        titleIcon: "assets/icons/FlowerTulip1.svg",
        desc: "توضیحات مربوط به تب چهارم در اینجا قرار می‌گیرد.",
        image: "assets/images/dog-big.jpeg",
        hasPlayBtn: false,
        link: "#",
      },
    ];

    const radiosHTML = tabsData
      .map(
        (item) =>
          `<input type="radio" id="tab-${item.id}" name="tab-group" ${
            item.id === 1 ? "checked" : ""
          } />`
      )
      .join("");

    const navLabelsHTML = tabsData
      .map(
        (item) => `
      <label for="tab-${item.id}" class="tab-label">
          <img src="${item.navIcon}" class="nav-icon" alt="icon">
          ${item.navLabel}
      </label>`
      )
      .join("");

    const contentsHTML = tabsData
      .map((item) => {
        return `
      <div class="tab-content content-${item.id}">
          <div class="text-col">
              <div class="tab-title-wrapper">
                  <img src="${item.titleIcon}" alt="icon" class="title-icon" />
                  <h3>${item.contentTitle}</h3>
              </div>
              
              <p>${item.desc}</p>
              
              <a href="${item.link}" class="tab-btn">
                  اطلاعات بیشتر
                  <img src="assets/icons/ArrowLeft.svg" class="btn-icon" alt="arrow">
              </a>
          </div>
          
          <div class="img-col">
              <div class="img-frame">
                  <img src="${item.image}" alt="Tab ${item.id}" />
                  ${item.hasPlayBtn ? '<div class="play-btn"></div>' : ""}
              </div>
          </div>
      </div>`;
      })
      .join("");

    tabsContainer.innerHTML = `
      ${radiosHTML}
      <div class="tabs-nav">
          ${navLabelsHTML}
      </div>
      <div class="tabs-content-area">
          ${contentsHTML}
      </div>
  `;

    setTimeout(() => {
      const playBtns = document.querySelectorAll(".play-btn");
      const videoPopup = document.getElementById("videoPopup");

      if (videoPopup && playBtns.length > 0) {
        playBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            videoPopup.classList.add("active");
            document.body.style.overflow = "hidden";
          });
        });
      }
    }, 100);
  }

  /*==============================
   --- CUSTOM SLIDER LOGIC ------------------------------------
   ===========*/
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

  /*===========
  --- VIDEO POPUP LOGIC ---
  ==============*/
  const videoPopup = document.getElementById("videoPopup");
  const playBtns = document.querySelectorAll(".play-btn");
  const closePopupBtn = document.getElementById("closePopup");
  const popupOverlay = document.querySelector(".popup-overlay");

  if (videoPopup) {
    function openVideoPopup() {
      videoPopup.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeVideoPopup() {
      videoPopup.classList.remove("active");
      document.body.style.overflow = "auto";
      const video = videoPopup.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
    playBtns.forEach((btn) => {
      btn.addEventListener("click", openVideoPopup);
    });
    if (closePopupBtn) {
      closePopupBtn.addEventListener("click", closeVideoPopup);
    }
    if (popupOverlay) {
      popupOverlay.addEventListener("click", closeVideoPopup);
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && videoPopup.classList.contains("active")) {
        closeVideoPopup();
      }
    });
  }

  /*==============
Form --------------
==============*/
  // PASSWORD FUNCTIONALITY (Eye + Validation)
  const passwordInput = document.getElementById("password");
  const toggleButton = document.getElementById("togglePassword");
  const ruleLength = document.getElementById("rule-length");
  const ruleNumber = document.getElementById("rule-number");
  const ruleSpecial = document.getElementById("rule-special");
  const usernameInput = document.querySelector('input[placeholder*="حمیدرضا"]');
  const phoneInput = document.querySelector('input[placeholder*="۰۹۱۲"]');
  const submitBtn = document.getElementById("submitBtn");

  toggleButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.classList.add("active");
    } else {
      passwordInput.type = "password";
      this.classList.remove("active");
    }
  });

  // Password validation on input
  passwordInput.addEventListener("input", function () {
    const value = this.value;

    // Check length (at least 8 characters)
    if (value.length >= 8) {
      ruleLength.classList.add("valid");
    } else {
      ruleLength.classList.remove("valid");
    }

    // Check for numbers
    if (/\d/.test(value)) {
      ruleNumber.classList.add("valid");
    } else {
      ruleNumber.classList.remove("valid");
    }

    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>؟\-]/.test(value)) {
      ruleSpecial.classList.add("valid");
    } else {
      ruleSpecial.classList.remove("valid");
    }

    checkFormValidity();
  });

  function checkFormValidity() {
    const isUsernameValid = usernameInput.value.trim().length >= 3;
    const isPhoneValid = /^09\d{9}$/.test(
      phoneInput.value.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    );
    const isPasswordLengthValid = ruleLength.classList.contains("valid");
    const isPasswordNumberValid = ruleNumber.classList.contains("valid");
    const isPasswordSpecialValid = ruleSpecial.classList.contains("valid");

    if (
      isUsernameValid &&
      isPhoneValid &&
      isPasswordLengthValid &&
      isPasswordNumberValid &&
      isPasswordSpecialValid
    ) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  usernameInput.addEventListener("input", checkFormValidity);
  phoneInput.addEventListener("input", checkFormValidity);
});
