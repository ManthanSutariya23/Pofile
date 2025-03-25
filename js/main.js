/*--------------------------------------------------------------
# Document Ready
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    // Initialize preloader
    preloaderInit();

    // Initialize navbar effects
    navbarInit();

    // Initialize smooth scrolling
    smoothScrollInit();

    // Initialize back to top button
    backToTopInit();

    // Initialize skills animation
    skillsAnimation();

    // Initialize project filtering
    projectFilterInit();

    // Initialize contact form
    contactFormInit();
});

/*--------------------------------------------------------------
# Preloader
--------------------------------------------------------------*/
function preloaderInit() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.style.opacity = '0';
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

/*--------------------------------------------------------------
# Navbar
--------------------------------------------------------------*/
function navbarInit() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle mobile menu
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlight on scroll
    window.addEventListener('scroll', function () {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/*--------------------------------------------------------------
# Smooth Scrolling
--------------------------------------------------------------*/
function smoothScrollInit() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/*--------------------------------------------------------------
# Back to Top Button
--------------------------------------------------------------*/
function backToTopInit() {
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 700) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*--------------------------------------------------------------
# Skills Animation
--------------------------------------------------------------*/
function skillsAnimation() {
    // Only start the animation when the element is in view
    const skillLevels = document.querySelectorAll('.skill-level');

    // Create an observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
                observer.unobserve(entry.target);
            } else {
                entry.target.style.width = "0%";
            }
        });
    }, { threshold: 0.1 });

    // Observe each skill level element
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

/*--------------------------------------------------------------
# Project Filtering
--------------------------------------------------------------*/
function projectFilterInit() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/*--------------------------------------------------------------
# Contact Form
--------------------------------------------------------------*/
function contactFormInit() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Here you would normally send the form data to a server
            // For this example, we'll simulate a successful submission
            simulateFormSubmission(formData);
        });
    }

    function showFormMessage(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;

        // Hide the message after 5 seconds
        setTimeout(function () {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    }

    function simulateFormSubmission(formData) {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate server request delay
        setTimeout(function () {
            // Show success message
            showFormMessage('Thank you! Your message has been sent.', 'success');

            // Reset form
            contactForm.reset();

            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 1500);
    }
}

document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        subject: document.getElementById("subject").value
    };

    const response = await fetch("https://nodejs-serverless-function-express-eosin-kappa.vercel.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
});

