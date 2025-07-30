document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.querySelector('.page-container');
    const pages = document.querySelectorAll('.page');
    // Referencia solo a los enlaces del menú principal para la activación de la clase 'active'
    const mainNavLinks = document.querySelectorAll('.nav-menu a');
    // Referencia a TODOS los elementos clicables que pueden cambiar la página.
    // Usamos el contenedor de la navbar y el contenedor de la agenda para delegar eventos.
    const navbar = document.querySelector('.navbar');
    const agendaText = document.querySelector('.agenda-text'); // Contenedor de los enlaces de artistas en agenda

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    let currentPageIndex = 0;
    let isTransitioning = false;

    // Función para actualizar la página visible
    function updatePage(index) {
        if (isTransitioning || index < 0 || index >= pages.length) return;

        isTransitioning = true;
        currentPageIndex = index;
        const offset = -currentPageIndex * 100;
        pageContainer.style.transform = `translateX(${offset}vw)`;

        // Actualizar la clase 'active' en el menú de navegación principal
        mainNavLinks.forEach(link => link.classList.remove('active'));

        // Lógica para resaltar el enlace correcto en el menú principal
        if (index === 0) { // Quiénes somos
            document.querySelector('.nav-menu a[href="#quienes-somos"]').classList.add('active');
        } else if (index === 1) { // Dónde estamos
            document.querySelector('.nav-menu a[href="#donde-estamos"]').classList.add('active');
        } else if (index === 2 || (index >= 3 && index <= 6)) { // Agenda o cualquier página de artista
            document.querySelector('.nav-menu a[href="#agenda"]').classList.add('active');
        } else if (index === 7) { // Contacto
            document.querySelector('.nav-menu a[href="#contacto"]').classList.add('active');
        }

        // Después de la transición, permitir nuevas transiciones
        pageContainer.addEventListener('transitionend', () => {
            isTransitioning = false;
        }, { once: true });
    }

    // Delegación de eventos para los enlaces del menú principal
    navbar.addEventListener('click', (e) => {
        const targetLink = e.target.closest('.nav-menu a'); // Busca el ancestro <a> más cercano
        if (targetLink) {
            e.preventDefault();
            const indexToNavigate = parseInt(targetLink.getAttribute('data-page'));
            if (!isNaN(indexToNavigate)) {
                updatePage(indexToNavigate);
                // Cerrar el menú de hamburguesa si está abierto
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                }
            }
        }
    });

    // Delegación de eventos para los enlaces de la agenda
    if (agendaText) { // Asegurarse de que el elemento existe
        agendaText.addEventListener('click', (e) => {
            const targetLink = e.target.closest('a'); // Busca el ancestro <a> más cercano
            if (targetLink && targetLink.parentElement.tagName === 'P') { // Asegura que es un link dentro de un <p> en agenda
                e.preventDefault();
                const indexToNavigate = parseInt(targetLink.getAttribute('data-page'));
                if (!isNaN(indexToNavigate)) {
                    updatePage(indexToNavigate);
                    // No hay menú de hamburguesa que cerrar aquí, ya que no es el menú principal.
                }
            }
        });
    }


    // Navegación con flechas del teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            if (currentPageIndex < pages.length - 1) {
                updatePage(currentPageIndex + 1);
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentPageIndex > 0) {
                updatePage(currentPageIndex - 1);
            }
        }
    });

    // Manejo del menú de hamburguesa
    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Cerrar el menú de hamburguesa al hacer clic fuera
    document.addEventListener('click', (e) => {
        // Asegurarse de que el clic no fue en el botón de hamburguesa ni dentro del menú
        if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
        }
    });

    // Iniciar en la primera página y activar el primer enlace
    updatePage(0);

    // Desplazamiento táctil (para móviles y tablets)
    let touchStartX = 0;
    let touchEndX = 0;

    pageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    pageContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    pageContainer.addEventListener('touchend', () => {
        const threshold = 50; // Distancia mínima para considerar un swipe
        if (touchEndX < touchStartX - threshold) {
            // Swipe a la izquierda (avanzar página)
            if (currentPageIndex < pages.length - 1) {
                updatePage(currentPageIndex + 1);
            }
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe a la derecha (retroceder página)
            if (currentPageIndex > 0) {
                updatePage(currentPageIndex - 1);
            }
        }
        // Resetear valores
        touchStartX = 0;
        touchEndX = 0;
    });
});