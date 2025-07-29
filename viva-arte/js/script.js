document.addEventListener('DOMContentLoaded', () => {
    // Implementación del scroll suave para los enlaces del menú
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento por defecto del ancla

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula la posición para que el header fijo no tape el inicio de la sección
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Pequeño script para el slider de imágenes (opcional, el CSS ya maneja la animación)
    // Si quieres un control más dinámico (botones de siguiente/anterior, etc.)
    // tendrías que expandir esta sección.
    // Por ahora, la animación en CSS es suficiente para un slider simple.
});



    let slideIndex = 1; // Inicia en el primer slide

    // Función para mostrar un slide específico
    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("carousel-slide");
        const dots = document.getElementsByClassName("dot");

        // Reinicia el índice si se pasa de los límites
        if (n > slides.length) {
            slideIndex = 1;
        }    
        if (n < 1) {
            slideIndex = slides.length;
        }

        // Oculta todos los slides
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }

        // Remueve la clase 'active' de todos los dots
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // Muestra el slide actual y marca el dot activo
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
    }

    // Función para avanzar o retroceder slides
    function moveSlide(n) {
        showSlides(slideIndex += n);
    }

    // Función para ir a un slide específico usando los dots
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Muestra el primer slide al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        showSlides(slideIndex);
    });

    // Opcional: Auto-avance del carrusel cada cierto tiempo
    let autoSlideInterval = setInterval(() => {
        moveSlide(1);
     }, 5000); // Cambia de slide cada 5 segundos (5000 ms)

    // Opcional: Pausar auto-avance al pasar el mouse por el carrusel
    // const carouselContainer = document.querySelector('.carousel-container');
    // carouselContainer.addEventListener('mouseenter', () => {
    //     clearInterval(autoSlideInterval);
    // });
    // carouselContainer.addEventListener('mouseleave', () => {
    //     autoSlideInterval = setInterval(() => {
    //         moveSlide(1);
    //     }, 5000);
    // });


  


document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.image-carousel');
    const images = document.querySelectorAll('.image-carousel img');

    // --- Verificación clave ---
    if (!carousel || images.length === 0) {
        console.error("Error: No se encontraron elementos para el carrusel de scroll infinito. Revisa tu HTML.");
        return;
    }
    // -------------------------

    const imageWidth = images[0].clientWidth; // Ancho de una sola imagen (debería ser el mismo para todas)
    let currentPosition = 0; // Posición actual de desplazamiento
    const totalImages = images.length / 2; // Número de imágenes originales (sin las duplicadas)

    // Función para animar el desplazamiento
    function scrollCarousel() {
        currentPosition -= 1; // Desplaza 1px a la izquierda. Ajusta este valor para más velocidad
        carousel.style.transform = `translateX(${currentPosition}px)`;

        // Si hemos pasado la mitad de las imágenes (es decir, las originales),
        // reiniciamos la posición para crear el efecto de loop
        if (currentPosition <= -imageWidth * totalImages) {
            currentPosition = 0; // Reinicia al principio
        }

        requestAnimationFrame(scrollCarousel); // Usa requestAnimationFrame para una animación más suave
    }

    // Iniciar la animación
    scrollCarousel();
});
