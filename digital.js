// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to top button
window.addEventListener('scroll', function() {
    var backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

document.getElementById('backToTop').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate stats counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200;

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const count = parseInt(stat.textContent);
        const increment = target / speed;

        if (count < target) {
            stat.textContent = Math.ceil(count + increment);
            setTimeout(animateStats, 1);
        } else {
            stat.textContent = target;
        }
    });
}

// Initialize stats animation when scrolled to stats section
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Typed.js for hero section
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ["Digital Marketing", "SEO", "Social Media", "PPC", "Content Strategy"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    // Create particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 10;
            const opacity = Math.random() * 0.5 + 0.1;

            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = opacity;

            particlesContainer.appendChild(particle);
        }
    }
});

// portfolio
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-button-group button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const moreItems = document.querySelectorAll('.more-items');
    const toggleButton = document.getElementById('toggleProjects');
    let showingAll = false;

    // Only show toggle button if there are hidden items
    if (moreItems.length === 0) {
        toggleButton.style.display = 'none';
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Show/hide items based on filter
            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Reset the toggle button state when filtering
            showingAll = false;
            toggleButton.textContent = 'View More Projects';

            // Hide button if filtered results don't have more items
            const filteredMoreItems = document.querySelectorAll(`.more-items:not([style*="display: none"])`);
            toggleButton.style.display = filteredMoreItems.length > 0 ? 'inline-block' : 'none';
        });
    });

    // Toggle more/less projects
    toggleButton.addEventListener('click', function (e) {
        e.preventDefault();

        showingAll = !showingAll;

        if (showingAll) {
            moreItems.forEach(item => {
                item.style.display = 'block';
            });
            toggleButton.textContent = 'View Less Projects';
        } else {
            moreItems.forEach(item => {
                item.style.display = 'none';
            });
            toggleButton.textContent = 'View More Projects';
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleProjects');
    const viewMoreText = toggleButton.querySelector('.view-more-text');
    const arrowIcon = toggleButton.querySelector('.arrow-icon');

    // Initial animation
    setTimeout(() => {
        toggleButton.classList.add('pulse');
    }, 1000);

    // Remove pulse animation on hover
    toggleButton.addEventListener('mouseenter', function () {
        this.classList.remove('pulse');
    });

    // Toggle functionality
    toggleButton.addEventListener('click', function (e) {
        e.preventDefault();

        const isShowingMore = this.classList.toggle('show-less');
        viewMoreText.textContent = isShowingMore ? 'View Less Projects' : 'View More Projects';

        // Add temporary pulse effect when toggling
        this.classList.remove('pulse');
        void this.offsetWidth; // Trigger reflow
        this.classList.add('pulse');
        setTimeout(() => this.classList.remove('pulse'), 2000);
    });
});