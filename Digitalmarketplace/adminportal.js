document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Authentication Check ---
  const protectedPages = [
    "adminportal.html",
    "admin_products.html",
    "admin_sellers.html",
    "admin_orders.html",
    "admin_analytics.html",
    "admin_settings.html",
  ];
  const currentPath = window.location.pathname;
  // Check if current URL contains any of the protected page names
  const isProtected = protectedPages.some((page) => currentPath.includes(page));

  if (isProtected) {
    const isLoggedIn = localStorage.getItem("adminSession");
    if (!isLoggedIn) {
      window.location.href = "admin_login.html";
      return; // Stop execution of further scripts
    }
  }

  // --- 2. Login Page Logic ---
  const loginForm = document.getElementById("admin-login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Mock Credentials Validation
      if (email === "isaacmutinda752@gmail.com" && password === "webrayz") {
        localStorage.setItem("adminSession", "true");
        window.location.href = "adminportal.html";
      } else {
        alert(
          "Invalid credentials. Please use: admin@sokodigital.com / admin123",
        );
      }
    });
  }

  // --- 3. Sidebar & Dashboard Logic (Only runs if sidebar exists) ---
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    const toggleBtn = document.getElementById("sidebar-toggle");
    // const mainContent = document.querySelector(".main-content");

    // Create overlay element
    const overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
      });
    }

    // Close sidebar when clicking overlay
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });

    // Close sidebar when clicking a link (optional, for better UX on mobile)
    const sidebarLinks = document.querySelectorAll(".sidebar-nav a");
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
          sidebar.classList.remove("active");
          overlay.classList.remove("active");
        }
      });
    });
  }

  // --- 4. Logout functionality ---
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("adminSession");
      window.location.href = "admin_login.html";
    });
  }
});
