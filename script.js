document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const skillsSection = document.getElementById("skills");
    const progressBars = document.querySelectorAll(".progress-bar");
    let animationTriggered = false;

    function showSections() {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add("show");
            }, index * 500);
        });
    }

    function animateProgressBars() {
        progressBars.forEach(bar => {
            let targetWidth = parseInt(bar.getAttribute("data-width"));
            let currentWidth = 0;

            let animation = setInterval(() => {
                if (currentWidth >= targetWidth) {
                    clearInterval(animation);
                } else {
                    currentWidth++;
                    bar.style.width = currentWidth + "%";
                    bar.textContent = currentWidth + "%";
                }
            }, 15);
        });
    }

    function checkScroll() {
        let sectionPosition = skillsSection ? skillsSection.getBoundingClientRect().top : 0;
        let screenPosition = window.innerHeight / 1.5;

        if (sectionPosition < screenPosition && !animationTriggered) {
            animationTriggered = true;
            animateProgressBars();
        }
    }

    window.addEventListener("scroll", checkScroll);

    showSections();

    // ✅ Initialize EmailJS inside DOMContentLoaded
    emailjs.init("mPXEtgJMOOHf5zVDT");

    // ✅ Get form element safely
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent page reload

            emailjs.sendForm("service_ux5idpj", "template_ovgf6qf", this)
            .then(function(response) {
                alert("Message sent successfully! ✅");
            }, function(error) {
                alert("Failed to send message. ❌ Please try again.");
            });
        });
    } else {
        console.error("Contact form not found!");
    }
});
