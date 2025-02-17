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
        let sectionPosition = skillsSection.getBoundingClientRect().top;
        let screenPosition = window.innerHeight / 1.5; // Trigger when 50% visible

        if (sectionPosition < screenPosition && !animationTriggered) {
            animationTriggered = true;
            animateProgressBars();
        }
    }

    
    window.addEventListener("scroll", checkScroll);

    showSections();
});
