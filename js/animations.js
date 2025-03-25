/*--------------------------------------------------------------
# Animation Initialization
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    initAOS();
    
    // Initialize GSAP animations
    initGSAP();
    
    // Initialize typing animation
    initTypeAnimation();
});

/*--------------------------------------------------------------
# AOS (Animate On Scroll) Initialization
--------------------------------------------------------------*/
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

/*--------------------------------------------------------------
# GSAP Animations
--------------------------------------------------------------*/
function initGSAP() {
    // Hero section animations
    gsap.from('.hero-content h1 .greeting', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2
    });
    
    gsap.from('.hero-content h1 .name', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4
    });
    
    gsap.from('.hero-content h1 .job-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.6
    });
    
    gsap.from('.hero-content p', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.8
    });
    
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1
    });
    
    gsap.from('.social-icons a', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        delay: 1.2
    });
    
    // Skills animation with ScrollTrigger
    gsap.utils.toArray('.skill-level').forEach(skill => {
        const width = skill.style.width;
        
        // Set initial width to 0
        gsap.set(skill, { width: 0 });
        
        // Animate width when scrolled into view
        ScrollTrigger.create({
            trigger: skill,
            start: 'top 90%',
            onEnter: () => gsap.to(skill, {
                width: width,
                duration: 1.5,
                ease: 'power2.out'
            })
        });
    });
    
    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%'
            }
        });
    });
    
    // Projects hover animations
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const image = item.querySelector('.project-img');
        const info = item.querySelector('.project-info');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(image, {
                y: -10,
                duration: 0.3,
                ease: 'power1.out'
            });
            
            gsap.to(info, {
                y: -10,
                duration: 0.3,
                ease: 'power1.out',
                delay: 0.1
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(image, {
                y: 0,
                duration: 0.3,
                ease: 'power1.out'
            });
            
            gsap.to(info, {
                y: 0,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
    });
}

/*--------------------------------------------------------------
# Typing Animation
--------------------------------------------------------------*/
function initTypeAnimation() {
    // Select the element to animate
    const jobTitle = document.querySelector('.hero-content h1 .job-title');
    
    if (!jobTitle) return;
    
    // Store the original text
    const originalText = jobTitle.textContent;
    
    // Clear the content initially
    jobTitle.textContent = '';
    
    // Set up typing animation
    let charIndex = 0;
    let typingInterval;
    
    function typeText() {
        if (charIndex < originalText.length) {
            jobTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval);
            
            // After typing is complete, set up blinking cursor
            setupCursor();
        }
    }
    
    function setupCursor() {
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        
        // Append cursor after the text
        jobTitle.appendChild(cursor);
        
        // Add keyframes for blinking
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Start typing after a delay
    setTimeout(() => {
        typingInterval = setInterval(typeText, 100);
    }, 1200);
}

/*--------------------------------------------------------------
# Parallax Effect
--------------------------------------------------------------*/
document.addEventListener('mousemove', function(e) {
    parallaxEffect(e);
});

function parallaxEffect(e) {
    // Select elements for parallax effect
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        // Get mouse position
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate position
        const moveX = (mouseX - windowWidth / 2) * 0.01;
        const moveY = (mouseY - windowHeight / 2) * 0.01;
        
        // Apply transform
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

/*--------------------------------------------------------------
# Scroll Animations
--------------------------------------------------------------*/
window.addEventListener('scroll', function() {
    // Get scroll position
    const scrollPosition = window.scrollY;
    
    // Navbar transform
    const navbar = document.getElementById('navbar');
    if (scrollPosition > 100) {
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
});
