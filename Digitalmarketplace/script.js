document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle logic
  const menuBtn = document.getElementById("mobile-menu-btn");
  const navActions = document.getElementById("nav-actions-container");

  if (menuBtn && navActions) {
    menuBtn.addEventListener("click", () => {
      navActions.classList.toggle("active");
      menuBtn.classList.toggle("open");
    });
  }

  // Observer for 'appear' animations (Category cards and M-Pesa steps)
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  // Target elements for the fade-in/pop-in scroll animation
  const itemsToAnimate = document.querySelectorAll(
    ".category-card, .process-step li, .process-step span",
  );
  itemsToAnimate.forEach((el) => appearObserver.observe(el));

  // Counter Animation for stats in the 'About' section
  const counters = document.querySelectorAll(".about .container h3");

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const originalText = target.innerText;
          const endValue = parseFloat(originalText.replace(/[^0-9.]/g, ""));

          animateCounter(target, 0, endValue, 2000, originalText);
          countObserver.unobserve(target);
        }
      });
    },
    { threshold: 1.0 },
  );

  /**
   * Smoothly animates a numeric counter.
   */
  function animateCounter(obj, start, end, duration, originalText) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);

      // Formatting logic to maintain currency and suffixes
      if (originalText.includes("Ksh")) {
        obj.innerHTML = `Ksh. ${current}M+`;
      } else if (originalText.includes("+")) {
        obj.innerHTML = `${current.toLocaleString()}+`;
      } else {
        obj.innerHTML = current;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = originalText; // Snap to exact text at the end
      }
    };
    window.requestAnimationFrame(step);
  }

  counters.forEach((counter) => countObserver.observe(counter));
});
