// Cement Standards Application JavaScript
// Prepared by Mr.Fadi M.Darwesh 2025

document.addEventListener('DOMContentLoaded', function() {
    // Application data
    const cementData = {
        CEM_I: {
            name: "CEM I - Portland Cement",
            description: "Pure Portland cement with at least 95% clinker content",
            clinker_content: "95-100%",
            characteristics: "Highest early strength development, suitable for general construction",
            applications: ["Structural concrete", "High-strength applications", "General construction"],
            subtypes: null
        },
        CEM_II: {
            name: "CEM II - Portland Composite Cement",
            description: "Portland cement with various additives (slag, fly ash, limestone, etc.)",
            clinker_content: "65-94%",
            characteristics: "Good durability, reduced heat of hydration",
            applications: ["General construction", "Marine structures", "Mass concrete"],
            subtypes: {
                "CEM II/A-S": { clinker: "80-94%", slag: "6-20%" },
                "CEM II/B-S": { clinker: "65-79%", slag: "21-35%" },
                "CEM II/A-D": { clinker: "90-94%", silica_fume: "6-10%" },
                "CEM II/A-P": { clinker: "80-94%", pozzolana: "6-20%" },
                "CEM II/A-V": { clinker: "80-94%", fly_ash_siliceous: "6-20%" },
                "CEM II/A-L": { clinker: "80-94%", limestone: "6-20%" }
            }
        },
        CEM_III: {
            name: "CEM III - Blast Furnace Cement",
            description: "Cement with significant blast furnace slag content",
            clinker_content: "5-64%",
            characteristics: "Low heat of hydration, high sulfate resistance, slow early strength",
            applications: ["Mass concrete", "Marine environments", "Sulfate-aggressive conditions"],
            subtypes: {
                "CEM III/A": { clinker: "35-64%", slag: "36-65%" },
                "CEM III/B": { clinker: "20-34%", slag: "66-80%" },
                "CEM III/C": { clinker: "5-19%", slag: "81-95%" }
            }
        },
        CEM_IV: {
            name: "CEM IV - Pozzolanic Cement",
            description: "Cement with pozzolanic materials (natural pozzolana, fly ash)",
            clinker_content: "45-89%",
            characteristics: "Good long-term strength, reduced permeability",
            applications: ["Durable structures", "Chemical resistance applications"],
            subtypes: {
                "CEM IV/A": { clinker: "65-89%", pozzolanic_materials: "11-35%" },
                "CEM IV/B": { clinker: "45-64%", pozzolanic_materials: "36-55%" }
            }
        },
        CEM_V: {
            name: "CEM V - Composite Cement",
            description: "Cement with combination of slag and pozzolanic materials",
            clinker_content: "20-64%",
            characteristics: "Very low heat of hydration, excellent durability",
            applications: ["Mass concrete", "Marine structures", "Long-term durability"],
            subtypes: {
                "CEM V/A": { clinker: "40-64%", slag: "18-30%", pozzolanic: "18-30%" },
                "CEM V/B": { clinker: "20-38%", slag: "31-49%", pozzolanic: "31-49%" }
            }
        }
    };

    // Initialize application
    initNavigation();
    initSearch();
    initModals();
    initTabs();
    initCharts();
    initInteractiveFeatures();

    // Navigation functionality
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        // Handle navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Update active nav link
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Search functionality
    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            if (!query) return;

            // Clear previous highlights
            clearHighlights();

            // Search through content
            const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, li, .cement-card, .strength-card, .constituent-card, .requirement-card');
            let firstMatch = null;

            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(query) && !element.classList.contains('attribution')) {
                    highlightElement(element);
                    if (!firstMatch) {
                        firstMatch = element;
                    }
                }
            });

            // Scroll to first match
            if (firstMatch) {
                firstMatch.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

        function highlightElement(element) {
            element.classList.add('search-highlight');
            setTimeout(() => {
                element.classList.remove('search-highlight');
            }, 3000);
        }

        function clearHighlights() {
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.classList.remove('search-highlight');
            });
        }

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Modal functionality
    function initModals() {
        const modal = document.getElementById('cementModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const modalClose = document.querySelector('.modal-close');
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cementType = this.getAttribute('data-cement');
                showCementDetails(cementType);
            });
        });

        function showCementDetails(type) {
            const cement = cementData[type];
            if (!cement) return;

            modalTitle.textContent = cement.name;
            
            let content = `
                <div class="modal-details">
                    <div class="modal-section">
                        <h4>Description</h4>
                        <p>${cement.description}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h4>Clinker Content</h4>
                        <p>${cement.clinker_content}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h4>Main Characteristics</h4>
                        <p>${cement.characteristics}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h4>Applications</h4>
                        <ul>
                            ${cement.applications.map(app => `<li>${app}</li>`).join('')}
                        </ul>
                    </div>
            `;

            if (cement.subtypes) {
                content += `
                    <div class="modal-subtypes">
                        <h4>Subtypes</h4>
                        <div class="subtype-grid">
                            ${Object.entries(cement.subtypes).map(([name, composition]) => `
                                <div class="subtype-item">
                                    <div class="subtype-name">${name}</div>
                                    <div class="subtype-composition">
                                        ${Object.entries(composition).map(([key, value]) => 
                                            `${key.replace('_', ' ')}: ${value}`
                                        ).join(', ')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            content += `
                    <div class="modal-attribution" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border); text-align: center;">
                        <span class="attribution">Prepared by Mr.Fadi M.Darwesh 2025</span>
                    </div>
                </div>
            `;

            modalContent.innerHTML = content;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }

        modalClose.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // Tab functionality
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(tab => tab.classList.remove('active'));
                this.classList.add('active');
                
                // Show/hide tab content
                tabContents.forEach(content => {
                    if (content.id === `${targetTab}-tab`) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Chart initialization
    function initCharts() {
        const ctx = document.getElementById('strengthChart');
        if (!ctx) return;

        const strengthData = {
            labels: ['32.5 N', '32.5 R', '42.5 N', '42.5 R', '52.5 N', '52.5 R'],
            datasets: [{
                label: 'Minimum 28-day Strength (MPa)',
                data: [32.5, 32.5, 42.5, 42.5, 52.5, 52.5],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                borderWidth: 2
            }, {
                label: 'Early Strength Requirements (MPa)',
                data: [16, 10, 10, 20, 20, 30],
                backgroundColor: 'rgba(31, 184, 205, 0.3)',
                borderColor: '#1FB8CD',
                borderWidth: 2,
                type: 'line'
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: strengthData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cement Strength Classes - Strength Requirements',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Strength (MPa)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Cement Class'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    // Interactive features
    function initInteractiveFeatures() {
        // Smooth animations for cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe cards for animation
        const cards = document.querySelectorAll('.overview-card, .cement-card, .strength-card, .constituent-card, .requirement-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Interactive cement cards
        const cementCards = document.querySelectorAll('.cement-card');
        cementCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Interactive constituent cards
        const constituentCards = document.querySelectorAll('.constituent-card');
        constituentCards.forEach(card => {
            card.addEventListener('click', function() {
                const symbol = this.querySelector('.constituent-symbol');
                symbol.style.transform = 'scale(1.2)';
                symbol.style.background = 'var(--color-primary-hover)';
                
                setTimeout(() => {
                    symbol.style.transform = 'scale(1)';
                    symbol.style.background = 'var(--color-primary)';
                }, 300);
            });
        });

        // Smooth section transitions
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            observer.observe(section);
        });

        // Interactive search with suggestions
        const searchInput = document.getElementById('searchInput');
        const searchTerms = [
            'portland cement', 'blast furnace', 'pozzolanic', 'strength class', 
            'constituents', 'clinker', 'slag', 'fly ash', 'limestone', 'silica fume',
            'sulfate resistant', 'heat of hydration', 'setting time', 'compressive strength'
        ];

        searchInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            if (value.length > 2) {
                const suggestions = searchTerms.filter(term => 
                    term.includes(value) && term !== value
                );
                // Could implement suggestions dropdown here
            }
        });

        // Add loading states for interactive elements
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (!this.classList.contains('view-details-btn')) return;
                
                this.classList.add('loading');
                this.textContent = 'Loading...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = 'View Details';
                }, 500);
            });
        });
    }

    // Utility functions
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

    // Initialize theme handling
    function initTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        prefersDark.addEventListener('change', (e) => {
            // Theme automatically handled by CSS
            console.log('Theme changed to:', e.matches ? 'dark' : 'light');
        });
    }

    initTheme();

    // Performance optimization
    function initPerformanceOptimizations() {
        // Lazy load images if any were added
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Throttle scroll events
        let ticking = false;
        function updateScrollPosition() {
            // Handle scroll-based animations
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        });
    }

    initPerformanceOptimizations();

    // Accessibility enhancements
    function initAccessibility() {
        // Keyboard navigation for modal
        const modal = document.getElementById('cementModal');
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });

        // Add ARIA labels
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.setAttribute('aria-label', `Navigate to ${link.textContent} section`);
        });

        // Focus management
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        viewDetailsBtns.forEach(btn => {
            btn.setAttribute('aria-describedby', 'cement-details-description');
        });
    }

    initAccessibility();

    console.log('Cement Standards Application initialized successfully - Prepared by Mr.Fadi M.Darwesh 2025');
});