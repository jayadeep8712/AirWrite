// Create floating bubbles
const create_Bubbles = () => {
    const bubblesContainer = document.querySelector(".sbubbles");
    for (let i = 0; i < 50; i++) {
      const bubble = document.createElement("div");
      bubble.className = "sbubble";
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.width = `${Math.random() * 30 + 10}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.animationDelay = `${Math.random() * 8}s`;
      bubblesContainer.appendChild(bubble);
    }
  };
  create_Bubbles();
  
  // Cursor following sea animal
  const aquaAnimal = document.getElementById("aquaAnimal");
  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;
  const speed = 0.1;
  
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - aquaAnimal.offsetWidth / 2;
    mouseY = e.clientY - aquaAnimal.offsetHeight / 2;
  
    // Show the aqua animal when mouse moves
    gsap.to(aquaAnimal, {
      opacity: 1,
      duration: 0.3,
    });
  });
  
  function animate() {
    // Smooth follow
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
  
    // Calculate direction for flipping the image
    const direction = mouseX > currentX ? 1 : -1;
  
    gsap.set(aquaAnimal, {
      x: currentX,
      y: currentY,
      scaleX: direction, // Flip the image based on movement direction
    });
  
    requestAnimationFrame(animate);
  }
  animate();
  
  // GSAP Animations for cards
  const cards = document.querySelectorAll(".target-card");
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 100,
      rotation: 5,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      },
    });
  });
  
  // Carousel functionality
  const carousel = document.querySelector(".carousel");
  let currentIndex = 0;
  const cardWidth = 420;
  
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      gsap.to(carousel, {
        x: -currentIndex * cardWidth,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  });
  
  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      gsap.to(carousel, {
        x: -currentIndex * cardWidth,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  });
  