// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial animation timeline
const tl = gsap.timeline();

// Create light rays
const createLightRays = () => {
  const rays = document.querySelector(".light-rays");
  for (let i = 0; i < 5; i++) {
    const ray = document.createElement("div");
    ray.style.position = "absolute";
    ray.style.top = "0";
    ray.style.left = `${20 + i * 15}%`;
    ray.style.width = "5px";
    ray.style.height = "100%";
    ray.style.background =
      "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)";
    ray.style.transform = `rotate(${-20 + i * 10}deg)`;
    rays.appendChild(ray);
  }
};

// Create splash particles effect
const createSplashParticles = () => {
  const particlesContainer = document.querySelector(".splash-particles");
  const numParticles = 50;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("splash-particle");

    const size = 5 + Math.random() * 20;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particlesContainer.appendChild(particle);

    gsap.set(particle, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 1,
    });

    gsap.to(particle, {
      x: `+=${-300 + Math.random() * 600}`,
      y: `+=${-300 + Math.random() * 600}`,
      opacity: 0,
      duration: 1.5 + Math.random(),
      ease: "power2.out",
    });
  }
};

// Create bubbles
const createBubbles = () => {
  const container = document.querySelector(".sea-creatures");
  for (let i = 0; i < 30; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    const size = 5 + Math.random() * 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    container.appendChild(bubble);

    gsap.set(bubble, {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 100,
    });

    gsap.to(bubble, {
      y: -100,
      x: `+=${-50 + Math.random() * 100}`,
      duration: 10 + Math.random() * 20,
      ease: "power1.inOut",
      repeat: -1,
      delay: Math.random() * 5,
    });
  }
};

// Create and animate sea creatures
const createSeaCreatures = () => {
  const container = document.querySelector(".sea-creatures");

  // Animate fish
  for (let i = 0; i < 8; i++) {
    const fish = document.createElement("img");
    fish.className = "fish";
    fish.src = "https://staging.svgrepo.com/show/18529/fish.svg";
    container.appendChild(fish);

    gsap.set(fish, {
      x: -150,
      y: 100 + Math.random() * (window.innerHeight - 200),
      scale: 0.5 + Math.random() * 1,
      rotation: Math.random() * 20 - 10,
    });

    // Complex swimming motion
    gsap.to(fish, {
      x: window.innerWidth + 150,
      duration: 15 + Math.random() * 10,
      ease: "none",
      repeat: -1,
      delay: Math.random() * 5,
      modifiers: {
        y: `+=${Math.sin(Date.now()) * 50}`,
      },
    });

    // Subtle rotation animation
    gsap.to(fish, {
      rotation: "+=15",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  // Animate jellyfish
  for (let i = 0; i < 5; i++) {
    const jellyfish = document.querySelector(".jellyfish").cloneNode(true);
    container.appendChild(jellyfish);

    gsap.set(jellyfish, {
      x: 100 + Math.random() * (window.innerWidth - 200),
      y: window.innerHeight + 100,
      scale: 0.6 + Math.random() * 0.8,
    });

    // Floating motion
    gsap.to(jellyfish, {
      y: -150,
      duration: 25 + Math.random() * 15,
      ease: "power1.inOut",
      repeat: -1,
      delay: Math.random() * 5,
    });

    // Sideways drift
    gsap.to(jellyfish, {
      x: "+=50",
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Bell pulsing animation
    gsap.to(jellyfish.querySelector(".bell"), {
      scale: 0.9,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Tentacle movement
    jellyfish.querySelectorAll(".tentacle").forEach((tentacle, index) => {
      gsap.to(tentacle, {
        scaleY: 0.7 + Math.random() * 0.3,
        duration: 1 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });
  }
};

// Main animation sequence
tl.to("#ball", {
  duration: 2,
  left: "50%",
  xPercent: -50,
  ease: "power2.inOut",
  rotation: 720,
})
  .to("#ball", {
    duration: 0.7,
    scale: 2,
    ease: "power2.in",
  })
  .to(".splash", {
    duration: 1.5,
    scale: 20,
    ease: "power2.inOut",
    onStart: createSplashParticles,
  })
  .to(
    "#ball",
    {
      duration: 0.1,
      opacity: 0,
    },
    "-=0.8"
  )
  .to(".light-rays", {
    duration: 2,
    opacity: 0.5,
    ease: "power2.out",
  })
  .to(".heading", {
    duration: 1.5,
    opacity: 1,
    y: 0,
    ease: "elastic.out(1, 0.8)",
  })
  .to(".scroll-indicator", {
    duration: 1,
    opacity: 1,
    ease: "power2.out",
  });

// Initialize effects
createLightRays();
createBubbles();
tl.call(createSeaCreatures);

//Navbar animation
const navbarTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".content-section",
    start: "top top",
    toggleActions: "play none none reverse",
  },
});

navbarTl.to(".navbar", {
  top: 0,
  duration: 0.5,
  ease: "power2.out",
});

// Content sections scroll animations
gsap.utils.toArray(".content-section").forEach((section, i) => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top center",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
  });
});

// Scroll indicator animation
gsap.to(".scroll-indicator", {
  y: "15px",
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// Smooth scroll on arrow click
document.querySelector(".scroll-indicator").addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  });
});

 // Hamburger menu functionality
 const hamburger = document.querySelector('.hamburger');
 const navLinks = document.querySelector('.nav-links');
 let isOpen = false;

 function toggleMenu() {
     isOpen = !isOpen;
     hamburger.classList.toggle('active');
     navLinks.classList.toggle('active');
     // Prevent body scrolling when menu is open
     document.body.style.overflow = isOpen ? 'hidden' : '';
 }

 hamburger.addEventListener('click', (e) => {
     e.stopPropagation();
     toggleMenu();
 });

 // Close menu when clicking a link
 navLinks.querySelectorAll('a').forEach(link => {
     link.addEventListener('click', () => {
         toggleMenu();
     });
 });

 // Close menu when clicking outside
 document.addEventListener('click', (e) => {
     if (isOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
         toggleMenu();
     }
 });

 // Prevent clicks inside the menu from closing it
 navLinks.addEventListener('click', (e) => {
     e.stopPropagation();
 });
 

// Navbar link hover and click animations
const navLinksItems = document.querySelectorAll(".navbar .nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    // Luxurious scroll animation
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: targetSection,
        offsetY: 50,
      },
      ease: "power2.inOut",
    });

    // Link activation effect
    gsap.fromTo(
      link,
      { scale: 1, color: "white" },
      {
        scale: 1.1,
        color: "#1e90ff",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      }
    );
  });

  // Hover effect
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      scale: 1.1,
      color: "#1e90ff",
      duration: 0.3,
      ease: "power1.out",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      scale: 1,
      color: "black",
      duration: 0.3,
      ease: "power1.out",
    });
  });
});

// Smooth scroll on arrow click
document.querySelector(".scroll-indicator").addEventListener("click", () => {
  const firstContentSection = document.querySelector(".content-section");
  if (firstContentSection) {
    firstContentSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});
