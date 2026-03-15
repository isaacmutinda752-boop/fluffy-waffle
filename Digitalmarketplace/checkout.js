document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.getElementById("checkout-form");
  const payButton = document.querySelector(".pay-btn-large");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (validateForm()) {
        // Simulate payment processing visual feedback
        const originalText = payButton.innerText;
        payButton.innerText = "Processing Payment...";
        payButton.disabled = true;
        payButton.style.opacity = "0.7";
        payButton.style.cursor = "not-allowed";

        // Simulate network delay (2 seconds)
        setTimeout(() => {
          // Retrieve product info from storage
          const productData = JSON.parse(
            localStorage.getItem("checkoutProduct") || "{}",
          );

          // Create Order Object
          const orderData = {
            id: "SKD" + Math.floor(100000 + Math.random() * 900000), // Random ID
            date: new Date().toLocaleDateString(),
            item: productData.title || "Digital Product",
            amount: productData.price || "0",
            customerName: document.getElementById("name").value,
            customerEmail: document.getElementById("email").value,
            customerPhone: document.getElementById("phone").value,
          };

          // Save order details to localStorage for the success page to read
          localStorage.setItem("lastOrder", JSON.stringify(orderData));

          // Redirect to success page
          window.location.href = "success.html";
        }, 2000);
      }
    });
  }

  function validateForm() {
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");

    // Basic validation
    if (!name.value.trim()) {
      alert("Please enter your full name.");
      name.focus();
      return false;
    }

    // Regex for Kenyan phone numbers (supports 07..., 01..., +254...)
    const phonePattern = /^(?:254|\+254|0)?(7|1)\d{8}$/;
    if (!phonePattern.test(phone.value.replace(/\s+/g, ""))) {
      alert("Please enter a valid M-Pesa phone number.");
      phone.focus();
      return false;
    }

    return true;
  }
});
