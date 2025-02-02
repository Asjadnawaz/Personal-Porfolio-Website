// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// DOM Elements
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.querySelector('.scroll-progress');
const scrollToTopBtn = document.querySelector('#scrollToTop');
const contactForm = document.querySelector('.contact-form');
const preloader = document.querySelector('#preloader');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinksMobile = document.querySelectorAll('.nav-links li');
const inputGroups = document.querySelectorAll('.input-group');
const submitBtn = document.querySelector('.submit-btn');
const heroText = document.querySelector('.hero h1');
const projectCards = document.querySelectorAll('.project-card');
const skillCards = document.querySelectorAll('.skill-card');
const infoItems = document.querySelectorAll('.info-item');
const socialLinks = document.querySelectorAll('.social-link');

// Toggle mobile menu
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Change navbar style and update scroll progress
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Update scroll progress
    if (scrollProgress) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / totalScroll) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                activeLink.classList.add('active');
            } else {
                activeLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Form handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email');
            } else {
                removeError(input);
            }
        });

        if (!isValid) return;

        // Animate submit button
        submitBtn.classList.add('submitting');
        submitBtn.disabled = true;

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showSuccess();
            
            // Reset form
            contactForm.reset();
            inputGroups.forEach(group => {
                group.querySelector('label').classList.remove('active');
            });
        } catch (error) {
            showError(null, 'Something went wrong. Please try again.');
        } finally {
            submitBtn.classList.remove('submitting');
            submitBtn.disabled = false;
        }
    });
}

// Scroll to top
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Loading screen
window.addEventListener('load', () => {
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.remove();
        }, 1000);
    }
});

// Mobile menu functionality
burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');
    
    // Animate links
    navLinksMobile.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add floating label animation
inputGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    // Initial check for pre-filled inputs
    if (input.value.trim() !== '') {
        label.classList.add('active');
    }

    // Handle input focus
    input.addEventListener('focus', () => {
        label.classList.add('active', 'highlight');
    });

    // Handle input blur
    input.addEventListener('blur', () => {
        label.classList.remove('highlight');
        if (input.value.trim() === '') {
            label.classList.remove('active');
        }
    });

    // Handle input changes
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            label.classList.add('active');
        }
    });
});

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const group = input ? input.parentElement : contactForm;
    const existingError = group.querySelector('.error-message');
    
    if (!existingError) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        group.appendChild(error);
    }
}

function removeError(input) {
    const group = input.parentElement;
    const error = group.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

function showSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully!';
    
    contactForm.insertBefore(successMessage, contactForm.firstChild);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Typing animation for hero section
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation when page loads
    window.addEventListener('load', typeWriter);
}

// Project cards hover effect
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Skills animation
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('i').style.transform = 'scale(1.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('i').style.transform = 'scale(1)';
    });
});

// Info Items Hover Animation
infoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Social Links Animation
socialLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.1)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});
