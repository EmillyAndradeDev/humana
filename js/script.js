/* ==========================================================================
   SCRIPT PRINCIPAL - HUMANA
   Contém: Efeito de digitação, Animações ao rolar (Fade In) e Navbar dinâmica
   ========================================================================== */

// --- 1. Efeito de Digitação (Typewriter) ---
const typingTextElement = document.getElementById('typing-text');

// Frases que serão digitadas e apagadas
const phrases = [
    "Como seria se sua equipe tivesse direção?",
    "Se seus processos fossem claros?",
    "Se sua essência fosse vista no digital?",
    "Se o clima interno refletisse a cultura?"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 50;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    // Lógica para apagar
    if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 30; // Mais rápido para apagar
    } 
    // Lógica para escrever
    else {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 60; // Velocidade normal de digitação
    }

    // Se terminou de escrever a frase completa
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa longa antes de começar a apagar
    } 
    // Se terminou de apagar a frase inteira
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Passa para a próxima frase
        typeSpeed = 500; // Pausa curta antes de começar a próxima
    }

    setTimeout(typeWriter, typeSpeed);
}

// Inicia o efeito de digitação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', typeWriter);


// --- 2. Animação de Fade-In ao rolar (Intersection Observer) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Dispara quando 10% do elemento estiver visível
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Para de observar após animar uma vez
        }
    });
}, observerOptions);

// Seleciona todos os elementos com a classe .fade-in-section
document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});


// --- 3. Navbar muda de cor ao rolar ---
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        // Estilo quando rola para baixo
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.98)";
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
    } else {
        // Estilo no topo da página
        navbar.style.backgroundColor = "rgba(5, 5, 5, 0.9)";
        navbar.style.boxShadow = "none";
    }
});