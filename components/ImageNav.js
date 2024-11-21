import React, { useEffect } from 'react';
import Image from 'next/image';

export default function ImageNav({ homepage }) {
    const homepageImage = homepage.find(hp => hp.fields.header === "Stewart Images");

    // Assuming images are stored in a field called 'images'
    const images = homepageImage?.fields?.multipleImages;

    useEffect(() => {
        // This code runs after the component mounts
        const sliderNavLinks = document.querySelectorAll('.slider-nav a');
        const slider = document.querySelector('.slider');
        const slidertwo = document.querySelector('.slider-two');

        const handleClick = function(event) {
            event.preventDefault(); // Prevent the default behavior
            const slideId = this.getAttribute('data-slide-id');
            const targetSlide = document.getElementById(slideId);

            if (targetSlide) {
                // Calculate the scroll position to transition to the target slide
                const scrollPosition = targetSlide.offsetLeft;
                slider.scrollLeft = scrollPosition;
                if (slidertwo) {
                    slidertwo.scrollLeft = scrollPosition;
                }
            }
        };

        sliderNavLinks.forEach(link => {
            link.addEventListener('click', handleClick);
        });

        // Cleanup the event listeners when the component unmounts
        return () => {
            sliderNavLinks.forEach(link => {
                link.removeEventListener('click', handleClick);
            });
        };
    }, []); // Empty dependency array to run this only on mount

    return (
        <div className="slider-wrapper">
            {homepageImage ? (
                <>
                    <p className="">found</p>
                    <div className="slider" id='content'>
                        {images.map((image, index) => (
                            <Image
                                layout="responsive"
                                key={index}
                                src={'https:' + image.fields.file.url}
                                id={`slide-${index + 1}`}
                                alt={image.fields.title || `Slide ${index + 1}`}
                                width={image.fields.file.details.image.width}
                                height={image.fields.file.details.image.height}
                                priority
                            />
                        ))}
                    </div>

                    <div className="slider-nav">
                        {images.map((_, index) => (
                            <a key={index} href={`#slide-${index + 1}`} data-slide-id={`slide-${index + 1}`}></a>
                        ))}
                    </div>
                </>
            ) : (
                <p>not found</p>
            )}
        </div>
    );
}
