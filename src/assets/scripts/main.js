
+( function() {
  const kioto = "Kioto";
  console.log(`Hello, ${kioto}!`);
} )();

//https://docs.fontawesome.com/apis/javascript aqui documentacion
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faCoffee, faHome, faMapMarkerAlt,faBars, faMinus, faChevronRight, faChevronLeft,faStar ,faTimesCircle} from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faHome, faMapMarkerAlt,faBars, faMinus,faChevronRight, faChevronLeft,faStar,faTimesCircle);

dom.watch();

// -----------------------------------------------------------------//
// CLASE: imageSlider
// -----------------------------------------------------------------//
class imageSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.sliderTrack = sliderElement.querySelector('.slider__track');
        this.slides = sliderElement.querySelectorAll('.slider__slide');
        this.prevBtn = sliderElement.querySelector('.slider__btn--prev');
        this.nextBtn = sliderElement.querySelector('.slider__btn--next');
        this.dotsContainer = sliderElement.querySelector('.slider__dots');

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoAdvanceTime = 7000;
        this.autoAdvanceInterval = null;

        // Inicializar el slider
        this.createDots();
        this.addEventListeners();
        this.startAutoAdvance();
        this.moveToSlide(0);
    }

    

    moveToSlide(index) {
        if (index < 0) {
            index = this.totalSlides - 1; 
        } else if (index >= this.totalSlides) {
            index = 0; 
        }
        this.currentIndex = index;

        
        let offset = 0; 
        for (let i = 0; i < this.currentIndex; i++) 
        {
            offset += this.slides[i].offsetWidth; 
        }
        
        this.sliderTrack.style.transform = `translateX(-${offset}px)`;
        this.updateDots();
    }
    
    nextSlide = () => {
        this.moveToSlide(this.currentIndex + 1);
    }
    
    prevSlide = () => {
        this.moveToSlide(this.currentIndex - 1);gallery__image
    }

    startAutoAdvance() {
        if (this.totalSlides <= 1) return;
        clearInterval(this.autoAdvanceInterval);
        this.autoAdvanceInterval = setInterval(this.nextSlide, this.autoAdvanceTime);
    }

    stopAutoAdvance() {
        clearInterval(this.autoAdvanceInterval);
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider__dot');
            dot.classList.toggle('slider__dot--active', index === this.currentIndex);
            dot.setAttribute('role', 'button'); 
            dot.setAttribute('tabindex', '0');  
            dot.setAttribute('aria-label', `Ir a la diapositiva ${index + 1}`);
            dot.addEventListener('click', () => {
                this.stopAutoAdvance();
                this.moveToSlide(index);
                this.startAutoAdvance();
            });
            this.dotsContainer.appendChild(dot);
        });
    }

    updateDots() {
        this.dotsContainer.querySelectorAll('.slider__dot').forEach((dot, index) => {
            dot.classList.toggle('slider__dot--active', index === this.currentIndex);
        });
    }

    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoAdvance();
                this.prevSlide();
                this.startAutoAdvance();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoAdvance();
                this.nextSlide();
                this.startAutoAdvance();
            });
        }
        
        this.slider.addEventListener('mouseenter', this.stopAutoAdvance);
        this.slider.addEventListener('mouseleave', this.startAutoAdvance);
    }
}



// -----------------------------------------------------------------//
// LIGHTBOX para Galeria (Usando srcset como fuente de URL hasheada)
// -----------------------------------------------------------------//
const initLightboxGallery = () => {
    const galleryImages = document.querySelectorAll('.gallery__image'); 
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox__close-btn');

    const openLightbox = (imageSrc) => {
        lightboxImage.src = imageSrc;
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = ''; 
    };

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {

            const picture = image.closest('picture');
            let fullUrl = image.getAttribute("data-full-src"); 

            if (picture) {
                const webpSource = picture.querySelector('source[type="image/webp"]');
                
                if (webpSource) {
                    const srcset = webpSource.getAttribute('srcset');
                    
                    // Regex para encontrar todas las URLs y sus descriptores de ancho
                    const matches = srcset.match(/([^\s]+)\s+\d+w/g); 
                    
                    if (matches && matches.length > 0) {
                        const lastMatch = matches[matches.length - 1];
                        fullUrl = lastMatch.split(' ')[0]; 
                    }
                }
            }

            if (fullUrl) {
                openLightbox(fullUrl);
            } else {
                openLightbox(image.src);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });
};


// -----------------------------------------------------------------//
// TOGGLE MENÚ for mobile view
// -----------------------------------------------------------------//
const initMobileMenuToggle = () => {
    const toggleButton = document.querySelector('.main-nav__toggle');
    const navList = document.querySelector('.main-nav__list');
    const toggleIcon = toggleButton ? toggleButton.querySelector('.fas') : null; 
    const OPEN_MOD = 'main-nav__list--is-open';

    if (toggleButton && navList && toggleIcon) {
        toggleButton.addEventListener('click', () => {

            navList.classList.toggle(OPEN_MOD);
            
            const isExpanded = navList.classList.contains(OPEN_MOD);
            toggleButton.setAttribute('aria-expanded', isExpanded); 
            //TODO volver aqui con esta importacion no funciona correctamente, aunque cambia el icono no actualiza el icono en imagen, parece qun problema con fontawesome y el dom
            // if (isExpanded) {
            //     toggleIcon.classList.remove('fa-bars');// HAMBURGUESA
            //     toggleIcon.classList.add('fa-minus'); // -
            // } else {
            //     toggleIcon.classList.remove('fa-minus');
            //     toggleIcon.classList.add('fa-bars'); 
            // }
        });
    }
};


// -----------------------------------------------------------------//
// COLLAPSABLE CONTENT para los containers
// -----------------------------------------------------------------//

const initCollapsibleContent = () => {
    const toggleButtons = document.querySelectorAll('.cat-details-toggle-btn');
    
    toggleButtons.forEach(button => {
        const contentId = button.getAttribute('aria-controls');
        const contentElement = document.getElementById(contentId);
        
        if (contentElement) {
            button.addEventListener('click', () => {
                const card = button.closest('.cat-card');//añadido para la edicion del clip-path, no actualiza en netlify
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                console.log('Botón clicado. Estado actual de aria-expanded:', isExpanded);
                button.setAttribute('aria-expanded', !isExpanded);
                contentElement.classList.toggle('cat-details-collapsable');//añadido para la edicion del clip-path, no actualiza en netlify
                card.classList.toggle('is-open');
                console.log('Estado actualizado de aria-expanded:', button.getAttribute('aria-expanded'));
                contentElement.classList.toggle('cat-details-collapsable-is-open');
            });
        }
    });
};


// -----------------------------------------------------------------//
// INICIALIZACIÓN COMPONENTES
// -----------------------------------------------------------------//
const initApp = () => {

    initMobileMenuToggle();
    initLightboxGallery(); 
    initCollapsibleContent();
    const allSliders = document.querySelectorAll('.slider'); //Collect de todos los sliders de la pagina
    
    allSliders.forEach(sliderElement => {
        new imageSlider(sliderElement);
    });
};

// -----------------------------------------------------------------//
// LISTENER General
// -----------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', initApp);