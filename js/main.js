/**
* Template Name: Sailor
* Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  // document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
  //   carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
  //     if (index === 0) {
  //       carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
  //     } else {
  //       carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
  //     }
  //   });
  // });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
          // Reaplica clases y estilos personalizados después del reordenamiento
          initIsotope.on('arrangeComplete', function() {
            document.querySelectorAll('.about-img-portfolio img').forEach(img => {
              img.style.filter = 'grayscale(100%)';
            });
          });

        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();

// CARRUSEL DE TESTIMONIOS
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.testimonial-carousel-track');
  const items = document.querySelectorAll('.testimonial-item');
  const itemWidth = items[0].offsetWidth + 20; // Ancho + gap
  
  // Duplicamos los items para efecto infinito
  track.innerHTML += track.innerHTML;
  
  // Reiniciamos la animación cuando llega al final
  track.addEventListener('animationiteration', function() {
    track.style.animation = 'none';
    void track.offsetWidth; // Trigger reflow
    track.style.animation = 'scroll 30s linear infinite';
  });
  
  // Pausar al hacer hover
  track.addEventListener('mouseenter', function() {
    track.style.animationPlayState = 'paused';
  });
  
  track.addEventListener('mouseleave', function() {
    track.style.animationPlayState = 'running';
  });
});

 const imageModal = document.getElementById('imageModal');
    imageModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const imageSrc = button.getAttribute('data-bs-image');
      const modalImage = imageModal.querySelector('#modalImage');
      modalImage.src = imageSrc;
    });



// // // FLAGS

// const flags = document.querySelectorAll(".flags-ar, .flags-br, .flags-gb");

// const selectFlag = (flag) => {
//   // Eliminar la clase "hovered" de todos los elementos
//   flags.forEach((flag) => flag.classList.remove("hovered"));
//   // Agregar la clase "hovered" al elemento seleccionado
//   flag.classList.add("hovered");

//   // Almacenar la selección de la bandera en el almacenamiento local del navegador
//   localStorage.setItem("selectedFlag", flag.dataset.language);
// };

// const loadFlag = () => {
//   // Obtener la bandera seleccionada almacenada en el almacenamiento local del navegador
//   const selectedFlag = localStorage.getItem("selectedFlag");

//   if (selectedFlag) {
//     // Buscar el elemento de bandera correspondiente a la selección almacenada
//     const flagElement = document.querySelector(`[data-language="${selectedFlag}"]`);
//     if (flagElement) {
//       flagElement.classList.add("hovered");
//     }
//   }
// };

// flags.forEach((flag) => {
//   flag.addEventListener("click", () => {
//     selectFlag(flag);
//   });
// });

// // Cargar la bandera al cargar la página
// loadFlag();

// /**
//  * =============================================
//  * MODE OSCURO - IMPLEMENTACIÓN COMPLETA
//  * =============================================
//  */

// // 1. Configuración inicial
// const darkModeToggle = document.createElement('button');
// darkModeToggle.id = 'darkModeToggle';
// darkModeToggle.className = 'dark-mode-toggle';
// darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
// darkModeToggle.setAttribute('aria-label', 'Alternar modo oscuro');

// // 2. Añadir el botón al DOM (preferiblemente en el header)
// const header = document.querySelector('header');
// if (header) {
//     header.appendChild(darkModeToggle);
// } else {
//     document.body.insertAdjacentElement('afterbegin', darkModeToggle);
// }

// // 3. Verificar preferencias del sistema y localStorage
// function checkDarkModePreference() {
//     const savedTheme = localStorage.getItem('theme');
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     return savedTheme ? savedTheme === 'dark' : systemPrefersDark;
// }

// // 4. Aplicar el tema
// function applyTheme(isDark) {
//     const html = document.documentElement;
    
//     if (isDark) {
//         html.setAttribute('data-theme', 'dark');
//         darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
//         localStorage.setItem('theme', 'dark');
//     } else {
//         html.removeAttribute('data-theme');
//         darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
//         localStorage.setItem('theme', 'light');
//     }
    
//     // Ajustar el logo según el tema
//     const logos = document.querySelectorAll('.logo-hero, .logo-img, .logo-image, .logo-image2');
//     logos.forEach(logo => {
//         logo.style.filter = isDark ? 'brightness(0) invert(1)' : 'none';
//     });
// }

// // 5. Alternar el tema
// function toggleTheme() {
//     const isDark = !document.documentElement.hasAttribute('data-theme');
//     applyTheme(isDark);
// }

// // 6. Event Listeners
// darkModeToggle.addEventListener('click', toggleTheme);

// // Escuchar cambios en las preferencias del sistema
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
//     if (!localStorage.getItem('theme')) {
//         applyTheme(e.matches);
//     }
// });

// // 7. Inicialización al cargar la página
// document.addEventListener('DOMContentLoaded', () => {
//     const isDark = checkDarkModePreference();
//     applyTheme(isDark);
    
//     // Asegurar que el botón sea visible después de la carga
//     setTimeout(() => {
//         darkModeToggle.style.opacity = '1';
//     }, 300);
// });

// // 8. Estilos dinámicos para el botón (puedes mover esto a tu CSS)
// const style = document.createElement('style');
// style.textContent = `
// .dark-mode-toggle {
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     background: var(--accent-color);
//     color: var(--contrast-color);
//     border: none;
//     cursor: pointer;
//     z-index: 9999;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.3s ease;
//     opacity: 0;
//     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
// }

// .dark-mode-toggle:hover {
//     transform: scale(1.1);
//     background: color-mix(in srgb, var(--accent-color), transparent 20%);
// }

// .dark-mode-toggle i {
//     font-size: 1.2rem;
// }

// [data-theme="dark"] {
//     --background-color: #121212;
//     --default-color: #e6e7ee;
//     --heading-color: #ffffff;
//     --accent-color: #1d93c8;
//     --surface-color: #1e1e1e;
//     --contrast-color: #ffffff;
//     --nav-color: #e6e7ee;
//     --nav-hover-color: #1d93c8;
//     --nav-mobile-background-color: #1e1e1e;
//     --nav-dropdown-background-color: #2a2a2a;
//     --nav-dropdown-color: #e6e7ee;
//     --nav-dropdown-hover-color: #1d93c8;
// }

// [data-theme="dark"] .hero .carousel-item:before {
//     background: rgba(30, 30, 30, 0.7);
// }

// [data-theme="dark"] .footer {
//     background-color: #1a1a1a;
//     color: #e6e7ee;
// }

// [data-theme="dark"] .footer .footer-links ul a {
//     color: #b0b0b0;
// }

// [data-theme="dark"] .footer .footer-links ul a:hover {
//     color: #ffffff;
// }

// [data-theme="dark"] .about-img-portfolio img {
//     filter: grayscale(30%);
// }

// [data-theme="dark"] .about-img-portfolio:hover img {
//     filter: grayscale(0%);
// }

// [data-theme="dark"] .proyectos-info {
//     background: rgba(30, 30, 30, 0.85) !important;
//     color: #e6e7ee !important;
// }

// [data-theme="dark"] .proyectos-info-content p {
//     color: #b0b0b0 !important;
// }
// `;
// document.head.appendChild(style);