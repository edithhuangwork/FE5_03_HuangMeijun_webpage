document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu-items");
    toggleButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });
});


// 
    // 表單提交處理
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // 獲取表單數據
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            
            // 驗證數據
            if (name && email && message) {
                console.log("Form submitted:", { name, email, message });
                alert("Thank you for contacting us!");
                contactForm.reset();
            }
        });
    };