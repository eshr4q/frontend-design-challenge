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
  ============== */

  const rangeInput = document.getElementById("rangeInput");
  const displayValue = document.getElementById("displayValue");
  const labelContainer = document.getElementById("labelContainer");

  const MIN = 10;
  const MAX = 100;
  const STEP = 10;
  const STEPS_COUNT = (MAX - MIN) / STEP + 1;

// English → Persian digits
  function toPersianDigits(num) {
    const farsiDigits = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    return num.toString().replace(/\d/g, d => farsiDigits[d]);
  }

// Build labels (10 → 100)
  function setupLabels() {
    if (!labelContainer) return;
    labelContainer.innerHTML = "";

    for (let i = MIN; i <= MAX; i += STEP) {
      const span = document.createElement("span");
      span.textContent = toPersianDigits(i);
      labelContainer.appendChild(span);
    }
  }

// SNAP-based calculation
  function updateSlider() {
    if (!rangeInput) return;

    const value = Number(rangeInput.value);
    const index = (value - MIN) / STEP;
    const percentage = (index / (STEPS_COUNT - 1)) * 100;

    rangeInput.style.setProperty("--progress", `${percentage}%`);

    if (displayValue) {
      displayValue.textContent = toPersianDigits(value);
    }
  }


  setupLabels();

  if (rangeInput) {
    rangeInput.addEventListener("input", updateSlider);
    updateSlider();
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

    setTimeout(() => goToSlide(1), 100);

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
 /* =========================================
      Form - SELECTORS & VARIABLES
     ========================================= */
     const signupContent = document.querySelector(".signup-content");
     const signupForm = document.querySelector(".signup-form-container form");
     
     // Buttons
     const submitBtn = document.getElementById("submitBtn");
     const btnCancel = document.querySelector(".btn-cancel");
     const backToFormBtn = document.getElementById("backToFormBtn");
     const backFromErrorBtn = document.getElementById("backFromErrorBtn");
   
     // Messages
     const successMessage = document.getElementById("successMessage");
     const errorMessage = document.getElementById("errorMessage");
   
     // Inputs
     // FIX: We select by type since ID is missing in HTML
     const usernameInput = document.querySelector('input[type="text"]'); 
     const phoneInput = document.querySelector('input[type="tel"]');
     const passwordInput = document.querySelector('input[type="password"]');
   
     // Rules
     const ruleLength = document.getElementById("rule-length");
     const ruleNumber = document.getElementById("rule-number");
     const ruleSpecial = document.getElementById("rule-special");
   
     /* =========================================
        TOGGLE PASSWORD VISIBILITY
        ========================================= */
     const toggleButton = document.getElementById("togglePassword");
     if (toggleButton && passwordInput) {
       toggleButton.addEventListener("click", function () {
         if (passwordInput.type === "password") {
           passwordInput.type = "text";
           this.classList.add("active");
         } else {
           passwordInput.type = "password";
           this.classList.remove("active");
         }
       });
     }
   
     /* =========================================
        FORM VALIDATION LOGIC
        ========================================= */
     function checkFormValidity() {
       if (!usernameInput || !phoneInput || !passwordInput) return;
   
       // 1. Username Validation
       const usernameVal = usernameInput.value;
       const hasUsernameNumbers = /[0-9۰-۹]/.test(usernameVal);
       // Valid only if length is good AND no numbers
       const isUsernameValid = usernameVal.trim().length >= 3 && !hasUsernameNumbers;
   
       // 2. Phone Validation
       const rawPhone = phoneInput.value;
       const enPhone = rawPhone.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
       const isPhoneValid = /^09\d{9}$/.test(enPhone);
   
       // 3. Password Validation
       const isPassLen = passwordInput.value.length >= 8;
       const isPassNum = /\d/.test(passwordInput.value);
       const isPassSpecial = /[!@#$%^&*(),.?":{}|<>_+\-=\[\]]/.test(passwordInput.value);
   
       // Update Password Rule UI
       if (ruleLength) isPassLen ? ruleLength.classList.add("valid") : ruleLength.classList.remove("valid");
       if (ruleNumber) isPassNum ? ruleNumber.classList.add("valid") : ruleNumber.classList.remove("valid");
       if (ruleSpecial) isPassSpecial ? ruleSpecial.classList.add("valid") : ruleSpecial.classList.remove("valid");
   
       // Enable/Disable Submit Button
       if (submitBtn) {
         if (isUsernameValid && isPhoneValid && isPassLen && isPassNum && isPassSpecial) {
           submitBtn.disabled = false;
           submitBtn.style.opacity = "1";
           submitBtn.style.cursor = "pointer";
         } else {
           submitBtn.disabled = true;
           submitBtn.style.opacity = "0.6";
           submitBtn.style.cursor = "not-allowed";
         }
       }
     }
   
     /* =========================================
        EVENT LISTENERS (INPUTS)
        ========================================= */
   
     // --- Username Listener (FIXED) ---
     if (usernameInput) {
       usernameInput.addEventListener("input", function (e) {
         const value = e.target.value;
         const hasNumbers = /[0-9۰-۹]/.test(value);
   
         // FIX: Find the parent .form-group dynamically
         const parentGroup = usernameInput.closest('.form-group');
   
         if (parentGroup) {
           if (hasNumbers) {
             parentGroup.classList.add("has-error");
           } else {
             parentGroup.classList.remove("has-error");
           }
         }
   
         checkFormValidity();
       });
     }
   
     // --- Phone Listener ---
     if (phoneInput) {
       phoneInput.addEventListener("input", function () {
         this.value = this.value.replace(/[^0-9۰-۹]/g, ""); // Allow only digits
         checkFormValidity();
       });
     }
   
     // --- Password Listener ---
     if (passwordInput) {
       passwordInput.addEventListener("input", checkFormValidity);
     }
   
     /* =========================================
        ANIMATION LOGIC (Flying Smiley & Reset)
        ========================================= */
   
     let savedBadgeRect = null;
   
     function runSmileyAnimation(type) {
       const isSuccess = type === "success";
       const originalSmileyBadge = document.querySelector(".smiley-badge");
       if (!originalSmileyBadge) return;
   
       const originalImg = originalSmileyBadge.querySelector("img");
       const startRect = originalSmileyBadge.getBoundingClientRect();
       savedBadgeRect = startRect;
   
       const startSize = 70;
       const finalSize = 82;
   
       const offset = (startSize - startRect.width) / 2;
       const startLeft = startRect.left - offset;
       const startTop = startRect.top - offset;
   
       const flyer = document.createElement("div");
       flyer.classList.add("flyer-clone");
       flyer.style.width = startSize + "px";
       flyer.style.height = startSize + "px";
       flyer.style.left = startLeft + "px";
       flyer.style.top = startTop + "px";
       flyer.style.backgroundColor = isSuccess ? "var(--light-green)" : "#FFD4D4";
   
       const flyerImg = document.createElement("img");
       flyerImg.src = isSuccess ? originalImg.src : "assets/icons/SmileySad.svg";
       flyer.appendChild(flyerImg);
       document.body.appendChild(flyer);
   
       originalSmileyBadge.style.opacity = "0";
   
       if (isSuccess) {
         signupContent.classList.add("success-state");
       } else {
         signupContent.classList.add("error-state");
       }
       signupForm.classList.add("form-fade-out");
   
       const mainWrapperRect = signupContent.getBoundingClientRect();
       const destX = mainWrapperRect.left + mainWrapperRect.width / 2 - finalSize / 2;
       const destY = mainWrapperRect.top + mainWrapperRect.height / 2 - finalSize / 2 - 105;
   
       requestAnimationFrame(() => {
         flyer.style.width = finalSize + "px";
         flyer.style.height = finalSize + "px";
         flyer.style.left = destX + "px";
         flyer.style.top = destY + "px";
       });
   
       setTimeout(() => {
         signupForm.style.display = "none";
         const targetMessage = isSuccess ? successMessage : errorMessage;
         targetMessage.style.display = "flex";
   
         const finalIconBox = targetMessage.querySelector(".success-icon-box");
         if (finalIconBox) {
           finalIconBox.classList.add("revealed");
         }
   
         flyer.remove();
       }, 600);
     }
   
     // --- Fly Back Animation ---
     function resetFormUI() {
       const activeMsg = successMessage.style.display === "flex" ? successMessage : null;
   
       if (!activeMsg || !savedBadgeRect) {
         hardResetUI();
         return;
       }
   
       const iconBox = activeMsg.querySelector(".success-icon-box");
       const iconImg = activeMsg.querySelector(".success-smiley") || activeMsg.querySelector("img");
       const startRect = iconBox.getBoundingClientRect();
   
       const flyer = document.createElement("div");
       flyer.classList.add("flyer-clone");
       flyer.style.width = "82px";
       flyer.style.height = "82px";
       flyer.style.left = startRect.left + "px";
       flyer.style.top = startRect.top + "px";
       flyer.style.backgroundColor = activeMsg === successMessage ? "var(--light-green)" : "#FFD4D4";
   
       const flyerImg = document.createElement("img");
       flyerImg.src = iconImg.src || iconImg.getAttribute("src");
       flyer.appendChild(flyerImg);
       document.body.appendChild(flyer);
   
       iconBox.classList.remove("revealed");
       iconBox.style.opacity = "0";
   
       signupContent.classList.remove("success-state", "error-state");
       activeMsg.style.display = "none";
   
       signupForm.style.display = "block";
       setTimeout(() => {
         signupForm.classList.remove("form-fade-out");
       }, 50);
   
       const targetSize = 70;
       const targetX = savedBadgeRect.left + savedBadgeRect.width / 2 - targetSize / 2;
       const targetY = savedBadgeRect.top + savedBadgeRect.height / 2 - targetSize / 2;
   
       requestAnimationFrame(() => {
         flyer.style.width = targetSize + "px";
         flyer.style.height = targetSize + "px";
         flyer.style.left = targetX + "px";
         flyer.style.top = targetY + "px";
       });
   
       setTimeout(() => {
         flyer.remove();
         const originalBadge = document.querySelector(".smiley-badge");
         if (originalBadge) originalBadge.style.opacity = "1";
   
         signupForm.reset();
   
         // Fix: Remove error class from username if it exists
         if (usernameInput) {
           const parentGroup = usernameInput.closest('.form-group');
           if (parentGroup) parentGroup.classList.remove("has-error");
         }
         
         checkFormValidity();
   
         document.querySelectorAll(".success-icon-box").forEach((box) => {
           box.classList.remove("revealed");
           box.style.opacity = "";
           box.style.transform = "";
         });
       }, 600);
     }
   
     function hardResetUI() {
       signupContent.classList.remove("success-state", "error-state");
       signupForm.style.display = "block";
       signupForm.classList.remove("form-fade-out");
       successMessage.style.display = "none";
       errorMessage.style.display = "none";
       
       // Fix: Remove error class from username manually
       if (usernameInput) {
           const parentGroup = usernameInput.closest('.form-group');
           if (parentGroup) parentGroup.classList.remove("has-error");
       }
   
       const originalBadge = document.querySelector(".smiley-badge");
       if (originalBadge) originalBadge.style.opacity = "1";
       signupForm.reset();
       checkFormValidity();
     }
   
     /* =========================================
        BUTTON EVENTS
        ========================================= */
     if (signupForm) {
       signupForm.addEventListener("submit", function (e) {
         e.preventDefault();
         if (submitBtn && !submitBtn.disabled) {
           runSmileyAnimation("success");
         }
       });
     }
   
     if (btnCancel) {
       btnCancel.addEventListener("click", function (e) {
         e.preventDefault();
         runSmileyAnimation("error");
       });
     }
   
     if (backToFormBtn) backToFormBtn.addEventListener("click", resetFormUI);
     if (backFromErrorBtn) backFromErrorBtn.addEventListener("click", resetFormUI);
   });
