const menuToggler = document.querySelector('.menu-toggler');
const sideBar = document.querySelector('.side-bar');

const navItemLinks = document.querySelectorAll('.nav li a');
const pages = document.querySelectorAll('.page');

const filterBtn = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.portfolio-item');

/*Slidebar Toggle*/
menuToggler.addEventListener('click', function () {
    sideBar.classList.toggle('active');
});

/* Page Navigation Functionality */
for (let i = 0; i < navItemLinks.length; i++) {
    navItemLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        const itemLinkText = this.textContent.toLowerCase();

        // Remove active class from all navigation links
        for (let j = 0; j < navItemLinks.length; j++) {
            navItemLinks[j].classList.remove('active');
        }

        // Add active class to clicked link
        this.classList.add('active');

        // Show/hide pages
        for (let j = 0; j < pages.length; j++) {
            if (pages[j].classList.contains(itemLinkText)) {
                pages[j].classList.add('active');
            } else {
                pages[j].classList.remove('active');
            }
        }

        // Close mobile menu after navigation
        if (window.innerWidth <= 1024) {
            sideBar.classList.remove('active');
        }
    });
}

/* Portfolio Filter Functionality */
for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener('click', function () {
        // Remove active class from all filter buttons
        for (let j = 0; j < filterBtn.length; j++) {
            filterBtn[j].classList.remove('active');
        }

        // Add active class to clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        // Show/hide portfolio items based on filter
        for (let j = 0; j < portfolioItems.length; j++) {
            const itemCategory =
                portfolioItems[j].querySelector('.item-category');

            if (filterValue === 'all') {
                portfolioItems[j].classList.add('active');
            } else {
                const categoryText = itemCategory.textContent
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace('&', '');

                if (
                    categoryText.includes(filterValue) ||
                    (filterValue === 'ai-automation' &&
                        (categoryText.includes('ai') ||
                            categoryText.includes('automation'))) ||
                    (filterValue === 'coding' && categoryText.includes('coding'))
                ) {
                    portfolioItems[j].classList.add('active');
                } else {
                    portfolioItems[j].classList.remove('active');
                }
            }
        }
    });
}

/* Close mobile menu when clicking outside */
document.addEventListener('click', function (e) {
    if (window.innerWidth <= 1024) {
        if (!sideBar.contains(e.target) && !menuToggler.contains(e.target)) {
            sideBar.classList.remove('active');
        }
    }
});

/* Smooth scrolling for internal links */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

/* Initialize portfolio filter - show all items by default */
window.addEventListener('DOMContentLoaded', function () {
    // Make sure all portfolio items are visible initially
    for (let i = 0; i < portfolioItems.length; i++) {
        portfolioItems[i].classList.add('active');
    }

    // Make sure the "All" filter button is active initially
    const allFilterBtn = document.querySelector(
        '.filter-item[data-filter="all"]'
    );
    if (allFilterBtn) {
        allFilterBtn.classList.add('active');
    }
});

/* Add animation delays for portfolio items */
function animatePortfolioItems() {
    const visibleItems = document.querySelectorAll('.portfolio-item.active');
    visibleItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

/* Call animation function after filter changes */
filterBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        setTimeout(animatePortfolioItems, 100);
    });
});

/* Skills progress bar animation */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
            }
        });
    });

    skillBars.forEach((bar) => {
        observer.observe(bar);
    });
}

/* Initialize skill bar animation */
window.addEventListener('DOMContentLoaded', animateSkillBars);
