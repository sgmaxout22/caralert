// ==========================================================================
// 1. Loader & Initialization Components
// ==========================================================================
// Hides the full-screen pre-loader element 800ms after the page fully loads
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof loader !== 'undefined') {
            loader.style.display = 'none';[cite: 29]
        }
    }, 800);[cite: 29]
});

// ==========================================================================
// 2. Interaction Observers (Timeline & Animated Counters)
// ==========================================================================
// Reveal steps on scroll inside the "How It Works" timeline section
const stepObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('show');[cite: 27]
        }
    });
});
document.querySelectorAll('.step').forEach(s => stepObserver.observe(s));[cite: 27]

// Animate metric numerical counters dynamically once visible on screen
const counters = document.querySelectorAll('.count');[cite: 24]
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;[cite: 24]
        
        const el = entry.target;[cite: 24]
        const target = +el.dataset.target;[cite: 24]
        let n = 0;[cite: 24]
        const step = Math.max(1, Math.ceil(target / 80));[cite: 24]
        
        const timer = setInterval(() => {
            n += step;[cite: 24]
            if (n >= target) {
                n = target;[cite: 24]
                clearInterval(timer);[cite: 24]
            }
            // Appends percentage tags or standard positive signs appropriately
            el.textContent = n + (target === 99 ? '%' : target === 24 ? '+' : '+');[cite: 24]
        }, 20);[cite: 24]
        
        counterObserver.unobserve(el);[cite: 24]
    });
});
counters.forEach(c => counterObserver.observe(c));[cite: 24]

// ==========================================================================
// 3. UI Component Actions (Interactive FAQ Dropdowns & Live Search Filter)
// ==========================================================================
// Toggle disclosure answers within the FAQ component lists
document.querySelectorAll(".q").forEach(b => {
    b.onclick = () => b.parentElement.classList.toggle("open");[cite: 23]
});

// Real-time keyword filter query parser over the FAQ list markup
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.oninput = () => {
        let t = searchInput.value.toLowerCase();[cite: 23]
        document.querySelectorAll(".item").forEach(i => {
            i.style.display = i.innerText.toLowerCase().includes(t) ? "block" : "none";[cite: 23]
        });
    };
}

// ==========================================================================
// 4. Global Cards & Video Container Micro-interactions
// ==========================================================================
// Setup standard hover transformations smoothly on generic component cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', () => {
        card.style.transform = 'translateY(-12px) scale(1.03)';[cite: 26]
    });
    card.addEventListener('mouseenter', () => {
        card.style.scale = '1.03';[cite: 28]
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';[cite: 26]
        card.style.scale = '';[cite: 28]
    });
});

// Setup specialized highlight shadows relative to the video card elements
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 40px rgba(0,87,255,.45)';[cite: 25]
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';[cite: 25]
    });
});

// ==========================================================================
// 5. Native Forms & Auxiliary Window Control Scripts
// ==========================================================================
// Standard browser interception logic running over the contact block
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.onsubmit = e => {
        e.preventDefault();[cite: 22]
        alert('Demo form submitted');[cite: 22]
    };
}

// Smooth scroll implementation bound to the footer return actions
const topButton = document.getElementById('topBtn');
if (topButton) {
    topButton.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });[cite: 21]
    };
}
