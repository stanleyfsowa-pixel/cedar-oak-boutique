// ===== MAIN JAVASCRIPT FILE =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeForms();
    initializeScrollEffects();
    initializeModal();
    loadEvents();
    initializeLogoFallback();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '#ffffff';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== FORMS =====
function initializeForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Events newsletter form
    const eventsNewsletterForm = document.getElementById('events-newsletter-form');
    if (eventsNewsletterForm) {
        eventsNewsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
        // Simulate form submission
        showNotification('Thank you for subscribing! You\'ll receive our latest updates.', 'success');
        form.reset();
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            isValid = false;
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                input.style.borderColor = '#dc3545';
            }
        }
    });
    
    if (!isValid) {
        showFormMessage('error', 'Please fill in all required fields.');
        return;
    }
    
    if (!validateEmail(formData.get('email'))) {
        showFormMessage('error', 'Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        showFormMessage('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
        form.reset();
        // Reset border colors
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.style.borderColor = '#ddd';
        });
    }, 1000);
}

function showFormMessage(type, message) {
    const successDiv = document.getElementById('form-success');
    const errorDiv = document.getElementById('form-error');
    
    // Hide both first
    if (successDiv) successDiv.style.display = 'none';
    if (errorDiv) errorDiv.style.display = 'none';
    
    if (type === 'success' && successDiv) {
        successDiv.querySelector('p').textContent = message;
        successDiv.style.display = 'block';
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (type === 'error' && errorDiv) {
        errorDiv.querySelector('p').textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 4px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    // Show notification
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
    }, 4000);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.collection-card, .value-card, .event-card, .team-member, .type-card, .service-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== MODAL FUNCTIONALITY =====
function initializeModal() {
    const modal = document.getElementById('event-modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
}

function openModal(eventData) {
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    
    // Populate modal with event data
    document.getElementById('modal-title').textContent = eventData.title;
    document.getElementById('modal-date').textContent = formatDate(eventData.date);
    document.getElementById('modal-time').textContent = formatTime(eventData.time, eventData.endTime);
    document.getElementById('modal-location').textContent = eventData.location;
    document.getElementById('modal-description').textContent = eventData.description;
    
    // Set up RSVP button
    const rsvpBtn = document.getElementById('rsvp-btn');
    if (rsvpBtn) {
        rsvpBtn.onclick = function() {
            showNotification('RSVP functionality would be implemented here. Please call us to reserve your spot!', 'info');
        };
    }
    
    // Set up calendar button
    const calendarBtn = document.getElementById('add-calendar-btn');
    if (calendarBtn) {
        calendarBtn.onclick = function() {
            generateCalendarLink(eventData);
        };
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('event-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function generateCalendarLink(eventData) {
    const startDate = new Date(`${eventData.date}T${eventData.time}`);
    const endDate = eventData.endTime ? new Date(`${eventData.date}T${eventData.endTime}`) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours
    
    const formatGoogleDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
}

// ===== EVENTS LOADING =====
async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const data = await response.json();
        
        // Update events preview on homepage
        updateEventsPreview(data.events);
        
        // Update events grid on events page
        updateEventsGrid(data.events);
        
        return data.events;
    } catch (error) {
        console.error('Error loading events:', error);
        return [];
    }
}

function updateEventsPreview(events) {
    const eventsPreview = document.getElementById('events-preview');
    if (!eventsPreview) return;
    
    // Get featured events or first 2 events
    const featuredEvents = events.filter(event => event.featured).slice(0, 2) || events.slice(0, 2);
    
    eventsPreview.innerHTML = '';
    
    featuredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsPreview.appendChild(eventCard);
    });
}

function updateEventsGrid(events) {
    const eventsGrid = document.getElementById('events-grid');
    if (!eventsGrid) return;
    
    // Get future events
    const now = new Date();
    const futureEvents = events.filter(event => new Date(event.date) >= now);
    
    eventsGrid.innerHTML = '';
    
    if (futureEvents.length === 0) {
        eventsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #777;">No upcoming events at this time. Check back soon!</p>';
        return;
    }
    
    futureEvents.forEach(event => {
        const eventCard = createEventCard(event, true);
        eventsGrid.appendChild(eventCard);
    });
}

function createEventCard(event, clickable = false) {
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
    
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    if (clickable) {
        eventCard.style.cursor = 'pointer';
        eventCard.addEventListener('click', () => openModal(event));
    }
    
    eventCard.innerHTML = `
        <div class="event-date">
            <span class="date-day">${day}</span>
            <span class="date-month">${month}</span>
        </div>
        <div class="event-info">
            <h3>${event.title}</h3>
            <p class="event-time">${formatTime(event.time, event.endTime)}</p>
            <p>${event.description}</p>
        </div>
    `;
    
    return eventCard;
}

// ===== UTILITY FUNCTIONS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function formatTime(startTime, endTime) {
    const formatSingleTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };
    
    const formattedStart = formatSingleTime(startTime);
    if (endTime) {
        const formattedEnd = formatSingleTime(endTime);
        return `${formattedStart} - ${formattedEnd}`;
    }
    return formattedStart;
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add fade-in class to main content
    document.body.classList.add('loaded');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== LOGO FALLBACK HANDLING =====
function initializeLogoFallback() {
    const logoImages = document.querySelectorAll('.logo-image, .hero-logo-image');
    
    logoImages.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, show the text fallback
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('logo-text-fallback')) {
                this.style.display = 'none';
                fallback.style.display = 'flex';
            }
            
            // For hero logo, create text fallback if it doesn't exist
            if (this.classList.contains('hero-logo-image')) {
                this.style.display = 'none';
                const heroLogo = this.parentElement;
                heroLogo.innerHTML = `
                    <div class="hero-text-logo">
                        <h1 class="hero-logo-text">Cedar & Oak</h1>
                        <p class="hero-logo-subtitle">Boutique</p>
                    </div>
                `;
            }
        });
        
        img.addEventListener('load', function() {
            // If image loads successfully, hide text fallback
            const fallback = this.nextElementSibling;
            if (fallback && fallback.classList.contains('logo-text-fallback')) {
                fallback.style.display = 'none';
            }
        });
    });
}