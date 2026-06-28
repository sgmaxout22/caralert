// ==========================================================================
// 1. Loader & Initialization Components (Strict File Protocol Safe)
// ==========================================================================
function hideLoader() {
    const loaderElement = document.getElementById('loader');
    if (loaderElement) {
        loaderElement.style.display = 'none';
    }
}

// FORCE Bypasses the loader screen after 1 second if events fail due to browser security policies
setTimeout(hideLoader, 1000);

window.addEventListener('load', () => {
    hideLoader();
});

// ==========================================================================
// 2. Interaction Observers (Wrapped to prevent crashing on local origins)
// ==========================================================================
try {
    // Reveal steps on scroll inside the "How It Works" timeline section
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('show');
            }
        });
    });
    document.querySelectorAll('.step').forEach(s => stepObserver.observe(s));

    // Animate metric numerical counters dynamically once visible on screen
    const counters = document.querySelectorAll('.count');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const el = entry.target;
            const target = +el.dataset.target;
            let n = 0;
            const step = Math.max(1, Math.ceil(target / 80));
            
            const timer = setInterval(() => {
                n += step;
                if (n >= target) {
                    n = target;
                    clearInterval(timer);
                }
                el.textContent = n + (target === 99 ? '%' : target === 24 ? '+' : '+');
            }, 20);
            
            counterObserver.unobserve(el);
        });
    });
    counters.forEach(c => counterObserver.observe(c));
} catch (e) {
    console.warn("IntersectionObserver blocked or unsupported on file:/// origin. Automatically making sections visible.");
    // Fallback if browser blocks the observers locally: Show everything immediately
    document.querySelectorAll('.step').forEach(s => s.classList.add('show'));
}

// ==========================================================================
// 3. UI Component Actions (Interactive FAQ Dropdowns & Live Search Filter)
// ==========================================================================
document.querySelectorAll(".q").forEach(b => {
    b.onclick = () => b.parentElement.classList.toggle("open");
});

// Safe keyword filter configuration
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.oninput = () => {
        let t = searchInput.value.toLowerCase();
        document.querySelectorAll(".item").forEach(i => {
            i.style.display = i.innerText.toLowerCase().includes(t) ? "block" : "none";
        });
    };
}

// ==========================================================================
// 4. Global Cards & Video Container Micro-interactions
// ==========================================================================
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', () => {
        card.style.transform = 'translateY(-12px) scale(1.03)';
    });
    card.addEventListener('mouseenter', () => {
        card.style.scale = '1.03';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.scale = '';
    });
});

document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 20px 40px rgba(0,87,255,.45)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

// ==========================================================================
// 5. Native Forms & Auxiliary Window Control Scripts
// ==========================================================================
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.onsubmit = e => {
        e.preventDefault();
        alert('Demo form submitted');
    };
}

const topButton = document.getElementById('topBtn');
if (topButton) {
    topButton.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}
