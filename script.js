document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    function toggleMenu() {
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : 'auto';
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once animated to keep it shown
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-up, .reveal-up, .reveal-left, .reveal-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Trigger animations for elements already in view on load
    setTimeout(() => {
        document.querySelectorAll('.animate-up').forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // --- Parallax Effect ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            // Adjust the divisor for more/less parallax effect
            parallaxBg.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    // --- WhatsApp Direct Links from Services ---
    const wppLinks = document.querySelectorAll('.wpp-service-link');
    const wppNumber = '5511972287724';

    wppLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const service = link.getAttribute('data-service');
            const message = `Olá, vim pelo site e gostaria de saber mais sobre o serviço de ${service}.`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${wppNumber}?text=${encodedMessage}`, '_blank');
        });
    });

    // --- Form Submit to WhatsApp ---
    const form = document.getElementById('leadForm');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            let wppMessage = `Olá, sou ${nome} e vim pelo site. Gostaria de agendar uma avaliação para ${servico}.`;
            if (mensagem) {
                wppMessage += `\nObservação: ${mensagem}`;
            }
            
            const encodedMessage = encodeURIComponent(wppMessage);
            
            // Redirect to WhatsApp
            window.open(`https://wa.me/${wppNumber}?text=${encodedMessage}`, '_blank');
            
            // Optional: reset form
            form.reset();
        });
    }
});
