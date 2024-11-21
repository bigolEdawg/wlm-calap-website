document.addEventListener('DOMContentLoaded', function() {
    const sliderNavLinks = document.querySelectorAll('.slider-nav a');
    const slider = document.querySelector('.slider');
    const slidertwo = document.querySelector('.slider-two');

    sliderNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior
            const slideId = this.getAttribute('data-slide-id');
            const targetSlide = document.getElementById(slideId);
            
            if (targetSlide) {
                // Calculate the scroll position to transition to the target slide
                const scrollPosition = targetSlide.offsetLeft;
                slider.scrollLeft = scrollPosition;
                slidertwo.scrollLeft = scrollPosition;
            }
        });
    });
});