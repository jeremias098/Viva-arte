// Selectores del DOM
const pageContainer = document.querySelector('.page-container');
const pages = document.querySelectorAll('.page');
const navbar = document.querySelector('.navbar');
const agendaText = document.querySelector('.agenda-text');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

// Comprobación inicial para evitar errores
if (!pageContainer || !hamburgerMenu || !navMenu) {
  console.error("Error: Faltan elementos esenciales.");
} else {
  let currentPageIndex = 0;
  let isTransitioning = false;

  function updatePage(index) {
    if (isTransitioning || index < 0 || index >= pages.length) return;
    isTransitioning = true;
    currentPageIndex = index;
    pageContainer.style.transform = `translateX(${-currentPageIndex * 100}vw)`;

    document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
    
    // Lógica para resaltar el enlace correcto en el menú
    if (index >= 2 && index <= 6) {
      // Si estamos en Agenda o en un artista, resalta "Agenda"
      const agendaLink = document.querySelector('.nav-menu a[data-page="2"]');
      if (agendaLink) agendaLink.classList.add('active');
    } else {
      // Si no, resalta el enlace correspondiente
      const activeLink = document.querySelector(`.nav-menu a[data-page="${index}"]`);
      if (activeLink) activeLink.classList.add('active');
    }

    pageContainer.addEventListener('transitionend', () => {
      isTransitioning = false;
    }, { once: true });
  }

  function closeMenu() {
    hamburgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
  }

  hamburgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  if (navbar) {
    navbar.addEventListener('click', (e) => {
      const targetLink = e.target.closest('.nav-menu a');
      if (targetLink) {
        e.preventDefault();
        const indexToNavigate = parseInt(targetLink.getAttribute('data-page'), 10);
        if (!isNaN(indexToNavigate)) {
          updatePage(indexToNavigate);
          closeMenu();
        }
      }
    });
  }

  if (agendaText) {
    agendaText.addEventListener('click', (e) => {
      const targetLink = e.target.closest('a[data-page]');
      if (targetLink) {
        e.preventDefault();
        const indexToNavigate = parseInt(targetLink.getAttribute('data-page'), 10);
        if (!isNaN(indexToNavigate)) updatePage(indexToNavigate);
      }
    });
  }

  // ===== ESTE ES EL NUEVO BLOQUE DE CÓDIGO AÑADIDO =====
  // Delegación de eventos para los botones "Volver a la Agenda"
  pageContainer.addEventListener('click', (e) => {
    // Verificamos si el elemento clickeado (o su padre más cercano) tiene la clase 'btn-volver'
    const volverButton = e.target.closest('.btn-volver');

    if (volverButton) {
      e.preventDefault(); // Prevenimos que el enlace '#' intente navegar.
      updatePage(2);      // Le decimos que vaya a la página de Agenda (índice 2).
    }
  });
  // ===== FIN DEL CÓDIGO AÑADIDO =====

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPageIndex < pages.length - 1) {
      updatePage(currentPageIndex + 1);
    } else if (e.key === 'ArrowLeft' && currentPageIndex > 0) {
      updatePage(currentPageIndex - 1);
    }
  });

  // Desplazamiento táctil
  let touchStartX = 0;
  pageContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  pageContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const threshold = 50;

    if (touchStartX - touchEndX > threshold && currentPageIndex < pages.length - 1) {
      updatePage(currentPageIndex + 1);
    } else if (touchEndX - touchStartX > threshold && currentPageIndex > 0) {
      updatePage(currentPageIndex - 1);
    }
  });

  updatePage(0); // Iniciar en la primera página
}
