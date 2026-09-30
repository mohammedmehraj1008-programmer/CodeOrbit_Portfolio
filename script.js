// ==================== STICKY HEADER SCROLL TRIGGER ====================
const scrollHeader = () => {
    const header = document.querySelector('.header');
    // Scroll benchmark is set to 50vh, modifying aesthetic properties
    if (window.scrollY >= 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
};
window.addEventListener('scroll', scrollHeader);


// ==================== MOBILE MENU BAR CONTROL ====================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        
        // Dynamic visual change of hamburger icon (Hamburger vs Close symbol)
        const toggleIcon = navToggle.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
            toggleIcon.className = 'fa-solid fa-xmark';
        } else {
            toggleIcon.className = 'fa-solid fa-bars-staggered';
        }
    });
}

// Automatically close the slider menu when a navigation item is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        const toggleIcon = navToggle.querySelector('i');
        toggleIcon.className = 'fa-solid fa-bars-staggered';
    });
});


// ==================== SCROLL MONITOR ACTIVE SECTION INDICATOR ====================
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (sectionsClass) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);


// ==================== AUTOMATED TAGLINE TYPEWRITER SPEED CONTROL ====================
const typewriterText = document.getElementById('typewriter');
const roles = [
    "B.Tech Cyber Security Student",
    "Application Dev Innovator",
    "Data Structures Enthusiast",
    "Secure Coding Practitioner"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delay = 150;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        delay = 75; // Speed up when deleting text
    } else {
        typewriterText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        delay = 150; // Typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
        delay = 2000; // Keep the full tagline visible for 2 seconds
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Move to the next tagline
        delay = 500; // Pause before typing next tagline
    }

    setTimeout(typeEffect, delay);
}

// Trigger initial delay when DOM structure loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});


// ==================== OBSERVER API SCROLL REVEAL & BAR FILL TRIGGER ====================
const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animate progress/skill bars when their card scrolls into view
            const progressFills = entry.target.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const targetWidth = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 100);
            });
            
            // Unobserve the element so animations only trigger once
            revealOnScrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // Triggers animation when 15% of element is visible
});

revealElements.forEach(element => {
    revealOnScrollObserver.observe(element);
});


// ==================== DYNAMIC CONTACT SUBMISSION & CUSTOM TOAST ====================
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent standard page refresh
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Visual simulation of network transmit
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Transmitting Data... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Logs data packet details in console as validation testing
            console.log("SECURE DATA PACKET SENT:", { name, email, subject, message });

            // Restore form styles
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();

            // Fire Custom success Toast dialog
            showToast();
        }, 1200);
    });
}

function showToast() {
    toast.classList.add('show');
    // Hide the success banner automatically after 4.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}