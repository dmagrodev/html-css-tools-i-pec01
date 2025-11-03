
+( function() {
  const kioto = "Kioto";
  console.log(`Hello, ${kioto}!`);
} )();

//https://docs.fontawesome.com/apis/javascript aqui documentacion
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import { faCoffee, faHome, faMapMarkerAlt,faBars, faMinus } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faHome, faMapMarkerAlt,faBars, faMinus);

dom.watch();


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
            
            if (isExpanded) {
                toggleIcon.classList.remove('fa-bars');// HAMBURGUESA
                toggleIcon.classList.add('fa-times'); // X
            } else {
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-bars'); 
            }
        });
    }
};

// -----------------------------------------------------------------//
// INICIALIZACIÓN COMPONENTES
// -----------------------------------------------------------------//
const initApp = () => {

    initMobileMenuToggle();
};
// -----------------------------------------------------------------//
// LISTENER General
// -----------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', initApp);