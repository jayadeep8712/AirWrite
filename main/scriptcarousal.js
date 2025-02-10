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

// // GSAP Animations for cards     <-----------------------------------------------
// const cards = document.querySelectorAll(".target-card");
// cards.forEach((card) => {
//   gsap.from(card, {
//     opacity: 0,
//     y: 100,
//     rotation: 5,
//     duration: 1,
//     ease: "power3.out",
//     scrollTrigger: {
//       trigger: card,
//       start: "top bottom",
//       end: "top center",
//       scrub: 1,
//     },
//   });
// });

// // Carousel functionality
// const carousel = document.querySelector(".carousel");
// let currentIndex = 0;
// const cardWidth = 420;

// document.getElementById("prevBtn").addEventListener("click", () => {
//   if (currentIndex > 0) {
//     currentIndex--;
//     gsap.to(carousel, {
//       x: -currentIndex * cardWidth,
//       duration: 0.8,
//       ease: "power2.out",
//     });
//   }
// });

// document.getElementById("nextBtn").addEventListener("click", () => {
//   if (currentIndex < cards.length - 1) {
//     currentIndex++;
//     gsap.to(carousel, {
//       x: -currentIndex * cardWidth,
//       duration: 0.8,
//       ease: "power2.out",
//     });
//   }
// });

//// ------------------------------Gallary----------------------------
// Title animation
gsap.to(".gallery-title", {
  opacity: 1,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".gallery-title",
    start: "top bottom-=100",
  },
});

// Unique animations for each SDG card
document.querySelectorAll(".gallery-item").forEach((item, index) => {
  // Staggered entrance with unique animations
  gsap.fromTo(
    item,
    {
      opacity: 0,
      scale: 0.8,
      rotation: index % 2 === 0 ? -10 : 10,
      y: 50,
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      y: 0,
      duration: 1,
      delay: index * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".gallery-container",
        start: "top bottom-=100",
      },
    }
  );

  // Hover pulse effect
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      scale: 1,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.in",
    });
  });

  // Parallax effect on mouse move
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angleX = (e.clientX - centerX) / 20;
    const angleY = (e.clientY - centerY) / 20;

    gsap.to(item, {
      rotationX: -angleY,
      rotationY: angleX,
      ease: "power1.out",
      duration: 0.5,
      transformPerspective: 400,
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      rotationX: 0,
      rotationY: 0,
      ease: "power1.in",
      duration: 0.5,
    });
  });
});


// Custom cursor
const cursor = document.querySelector(".cursor");
const cursorFollow = document.querySelector(".cursor-follow");

document.addEventListener("mousemove", (e) => {
  const rotationY = e.movementX > 0 ? 180 : 0;

  gsap.to(cursor, {
    x: e.clientX - 5,
    y: e.clientY - 5,
    rotationY: rotationY, // Flip the image
    duration: 0.1,
    ease: "power2.out"
  });

  gsap.to(cursorFollow, {
    x: e.clientX - 25,
    y: e.clientY - 25,
    rotationY: rotationY, // Flip the image
    duration: 0.3,
    ease: "power2.out"
  });
});







document.querySelector('.toggle-arrow').addEventListener('click', function() {
  const card = document.querySelector('.profile-card');
  card.classList.toggle('active');
  this.style.transform = card.classList.contains('active') ? 
      'translateY(-50%) rotate(180deg)' : 'translateY(-50%)';
});

document.addEventListener('click', function(e) {
  const card = document.querySelector('.profile-card');
  const arrow = document.querySelector('.toggle-arrow');
  if (!card.contains(e.target) && !arrow.contains(e.target) && card.classList.contains('active')) {
      card.classList.remove('active');
      arrow.style.transform = 'translateY(-50%)';
  }
});