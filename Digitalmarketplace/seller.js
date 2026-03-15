document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Authentication Check (for sellers) ---
  const sellerPages = [
    "seller_dashboard.html",
    "seller_products.html",
    "seller_orders.html",
  ];
  const currentPath = window.location.pathname;
  const isSellerPage = sellerPages.some((page) => currentPath.includes(page));

  if (isSellerPage) {
    const isLoggedIn = localStorage.getItem("sellerSession");
    if (!isLoggedIn) {
      // Redirect to login page, pre-selecting 'seller' role
      window.location.href = "login.html?role=seller";
      return; // Stop execution
    }
  }

  // --- 2. Sidebar & Dashboard Logic ---
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    const toggleBtn = document.getElementById("sidebar-toggle");

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

    // Close sidebar when clicking a link on mobile
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

  // --- 3. Logout functionality ---
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("sellerSession");
      window.location.href = "login.html";
    });
  }
});
