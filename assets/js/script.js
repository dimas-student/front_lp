/*=====================================================
  DOM READY
=====================================================*/

let appInitialized = false;

function initApp() {

    if (appInitialized) return;

    appInitialized = true;

    loader();

    scrollProgress();

    stickyNavbar();

    backToTop();

    smoothScroll();

    mobileMenu();

    mobileDropdown();

    autoCloseMenu();

    counterAnimation();

    scrollReveal();

    activeNavigation();

    heroParallax();

    rippleEffect();

    cardTilt();

    smartNavbar();

    floatingButtons();

}

document.addEventListener("components:loaded", initApp);

document.addEventListener("DOMContentLoaded", () => {

    const componentPlaceholders = [
        "#loader-component",
        "#topbar-component",
        "#header-component",
        "#footer-component"
    ];

    const hasComponentPlaceholders = componentPlaceholders.some((selector) =>
        document.querySelector(selector)
    );

    if (!hasComponentPlaceholders) {

        initApp();

    }

});

/*=====================================================
  LOADER
=====================================================*/

function loader() {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

    }, 300);


}

/*=====================================================
  SCROLL PROGRESS
=====================================================*/

function scrollProgress() {

    const progress = document.querySelector(".scroll-progress");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progressHeight =
            (window.pageYOffset / totalHeight) * 100;

        progress.style.width = progressHeight + "%";

    });

}

/*=====================================================
  STICKY NAVBAR
=====================================================*/

function stickyNavbar() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}

/*=====================================================
  BACK TO TOP
=====================================================*/

function backToTop() {

    const button = document.querySelector(".back-to-top");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=====================================================
  SMART NAVBAR (PAUSE WHEN MOBILE MENU IS OPEN)
=====================================================*/

function smartNavbar() {

    const header = document.querySelector(".header");

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        // Do not trigger hide transform if mobile menu is open
        if (header.classList.contains("menu-open")) return;

        const current = window.pageYOffset;

        if (current > lastScroll && current > 220) {

            header.style.transform = "translateY(-130%)";

        } else {

            header.style.transform = "translateY(0)";

        }

        lastScroll = current;

    });

}

/*=====================================================
  SMOOTH SCROLL
=====================================================*/

function smoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (href === "#" || !href) return;

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}

/*=====================================================
  MOBILE MENU (FULLSCREEN SIDEBAR OVERLAY)
=====================================================*/

function mobileMenu() {

    const hamburger = document.querySelector(".hamburger");

    const menu = document.querySelector(".nav-menu");

    const header = document.querySelector(".header");

    if (!hamburger || !menu) return;

    hamburger.addEventListener("click", () => {

        const isActive = hamburger.classList.toggle("active");

        menu.classList.toggle("active");

        if (header) {

            header.classList.toggle("menu-open");

            if (isActive) {

                header.style.transform = "none";

            }

        }

        // Lock body scroll when fullscreen mobile menu is open
        if (isActive) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }

    });

}

/*=====================================================
  COUNTER ANIMATION
=====================================================*/

function counterAnimation() {

    const counters = document.querySelectorAll(".counter, .hero-stat-counter");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseFloat(counter.dataset.target || "0");

            const suffix = counter.dataset.suffix || "";

            const separator = counter.dataset.separator || "";

            const duration = 2000; // 2 seconds animation

            const startTime = performance.now();

            const animate = (currentTime) => {

                const elapsedTime = currentTime - startTime;

                const progress = Math.min(elapsedTime / duration, 1);

                // Ease out cubic function for smooth deceleration
                const easeProgress = 1 - Math.pow(1 - progress, 3);

                const currentValue = Math.floor(easeProgress * target);

                let formattedValue = currentValue.toString();

                if (separator === ".") {

                    formattedValue = currentValue.toLocaleString("id-ID");

                } else if (separator === ",") {

                    formattedValue = currentValue.toLocaleString("en-US");

                }

                counter.innerText = formattedValue + suffix;

                if (progress < 1) {

                    requestAnimationFrame(animate);

                } else {

                    let finalFormatted = target.toString();

                    if (separator === ".") {

                        finalFormatted = target.toLocaleString("id-ID");

                    } else if (separator === ",") {

                        finalFormatted = target.toLocaleString("en-US");

                    }

                    counter.innerText = finalFormatted + suffix;

                }

            };

            requestAnimationFrame(animate);

            observer.unobserve(counter);

        });

    }, {

        threshold: 0.3

    });

    counters.forEach(counter => observer.observe(counter));

}

/*=====================================================
  SCROLL REVEAL
=====================================================*/

function scrollReveal() {

    const reveals = document.querySelectorAll(".fade-up");

    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.12

    });

    reveals.forEach(item => observer.observe(item));

}

/*=====================================================
  ACTIVE NAVIGATION
=====================================================*/

function activeNavigation() {

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".nav-menu a");

    if (!sections.length || !navLinks.length) return;

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 160;

            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/*=====================================================
  MOBILE DROPDOWN (TOGGLE ACCORDION)
=====================================================*/

function mobileDropdown() {

    const dropdown = document.querySelector(".dropdown");

    if (!dropdown) return;

    const trigger = dropdown.querySelector("a");

    if (!trigger) return;

    trigger.addEventListener("click", function (e) {

        if (window.innerWidth > 992) return;

        e.preventDefault();

        e.stopPropagation();

        dropdown.classList.toggle("open");

    });

}

/*=====================================================
  AUTO CLOSE MOBILE MENU (IGNORE DROPDOWN TRIGGER)
=====================================================*/

function autoCloseMenu() {

    const menu = document.querySelector(".nav-menu");

    const hamburger = document.querySelector(".hamburger");

    const header = document.querySelector(".header");

    if (!menu || !hamburger) return;

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", (e) => {

            // Ignore dropdown trigger link so menu doesn't close on click
            if (link.parentElement.classList.contains("dropdown")) {

                return;

            }

            menu.classList.remove("active");

            hamburger.classList.remove("active");

            if (header) {

                header.classList.remove("menu-open");

            }

            document.body.style.overflow = "";

        });

    });

}

/*=====================================================
  RIPPLE EFFECT
=====================================================*/

function rippleEffect() {

    const buttons = document.querySelectorAll(

        ".btn-primary, .btn-hero-primary, .btn-hero-glass"

    );

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(

                this.clientWidth,

                this.clientHeight

            );

            const radius = diameter / 2;

            circle.style.width =
                circle.style.height = diameter + "px";

            circle.style.left =
                e.clientX -
                this.getBoundingClientRect().left -
                radius + "px";

            circle.style.top =
                e.clientY -
                this.getBoundingClientRect().top -
                radius + "px";

            circle.classList.add("ripple");

            const ripple = this.querySelector(".ripple");

            if (ripple) ripple.remove();

            this.appendChild(circle);

        });

    });

}

/*=====================================================
  CARD TILT
=====================================================*/

function cardTilt() {

    const cards = document.querySelectorAll(".service-card, .news-item");

    if (window.innerWidth <= 768) return;

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 8;

            const rotateX = ((y / rect.height) - 0.5) * -8;

            card.style.transform =

                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}

/*=====================================================
  HERO PARALLAX
=====================================================*/

function heroParallax() {

    const heroBg = document.querySelector(".hero-bg");

    if (!heroBg || window.innerWidth <= 768) return;

    window.addEventListener("scroll", () => {

        const scrolled = window.pageYOffset;

        heroBg.style.transform =
            `scale(1.03) translateY(${scrolled * 0.12}px)`;

    });

}

/*=====================================================
  FLOATING BUTTONS
=====================================================*/

function floatingButtons() {

    const whatsapp = document.querySelector(".floating-whatsapp");

    const help = document.querySelector(".floating-help");

    if (!whatsapp && !help) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            whatsapp?.classList.add("show");

            help?.classList.add("show");

        } else {

            whatsapp?.classList.remove("show");

            help?.classList.remove("show");

        }

    });

}