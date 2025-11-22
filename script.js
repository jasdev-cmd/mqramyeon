// Modal functions
function openModal(id, event) {
  const modal = document.getElementById(id);
  modal.style.display = "block";

  // Position modal above clicked menu item
  const rect = event.currentTarget.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  modal.style.position = "absolute";
  modal.style.top = rect.top + scrollTop + "px";
  modal.style.left = rect.left + scrollLeft + "px";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";
}

window.onclick = e => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) modal.style.display = "none";
  });
};

// Fade-in scroll effect
const fadeEls = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
});
fadeEls.forEach(el => observer.observe(el));

// Parallax mouse movement
document.addEventListener("mousemove", (e) => {
  const layers = document.querySelectorAll(".parallax-layer");
  const x = (window.innerWidth - e.pageX) / 100;
  const y = (window.innerHeight - e.pageY) / 100;

  layers.forEach((layer, index) => {
    const speed = (index + 1) * 0.3;
    layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// Tap to unmute video
const video = document.getElementById('ramVideo');
const btn = document.getElementById('unmuteBtn');

if (video && btn) {
  btn.addEventListener('click', function () {
    video.muted = false;
    video.play();
    btn.style.display = 'none';
  });
}
// Menu Items Arrays (with real names and prices for stir-fry)
const menuItems = {
  ramyeon: [
    { img: "images/ram1.png", name: "Jin Ramen Mild", price: "₱87" },
    { img: "images/ram2.png", name: "Jin Ramen Spicy", price: "₱87" },
    { img: "images/ram3.png", name: "Spicy Cheese Ramen", price: "₱96" },
    { img: "images/ram4.png", name: "Cheese Ramen", price: "₱97" },
    { img: "images/ram5.png", name: "Spicy Cheesy Ramen", price: "₱97" },
    { img: "images/ram6.png", name: "Nongshim Super Spicy", price: "₱95" },
    { img: "images/ram7.png", name: "Shin Ramyun", price: "₱95" },
    { img: "images/ram8.png", name: "Cheesy Ramyun", price: "₱100" },
    { img: "images/ram9.png", name: "Ansungtangmyun", price: "₱112" },
    { img: "images/ram10.png", name: "Veggie Soon", price: "₱85" },
    { img: "images/ram11.png", name: "Koreno Beef", price: "₱85" },
    { img: "images/ram12.png", name: "Koreno Shrimp", price: "₱85" },
  ],
  stirfry: [
    { img: "images/stir1.png", name: "Buldak Original", price: "₱135" },
    { img: "images/stir2.png", name: "Buldak Carbonara", price: "₱134" },
    { img: "images/stir3.png", name: "Buldak Rose", price: "₱138" },
    { img: "images/stir4.png", name: "Buldak Quattro Cheese", price: "₱130" },
    { img: "images/stir5.png", name: "Spicy Cheese Stir Fry", price: "₱100" },
    { img: "images/stir6.png", name: "Koreno Jjajangmen", price: "₱86" },
    { img: "images/stir7.png", name: "Nongshim Cheese Stir Fry", price: "₱130" },
    { img: "images/stir8.png", name: "Nongshim Shin Ramyun Spicy", price: "₱130" },
  ],
  meals: Array.from({length: 16}, (_, i) => ({
    img: `images/meal${i+1}.png`,
    name: `Meal ${i+1}`,
    price: `₱${100 + i*5}`
  })),
  minimart: Array.from({length: 16}, (_, i) => ({
    img: `images/minimart${i+1}.png`,
    name: `Minimart ${i+1}`,
    price: `₱${50 + i*5}`
  })),
};


// Open Modal (dynamic menu items, only shows if image exists)
function openModal(category) {
  const modal = document.getElementById(category);
  const modalContent = modal.querySelector(".menu-detail");
  
  // Clear old content
  modalContent.innerHTML = "";

  // Add items dynamically
  menuItems[category].forEach(item => {
    // Check if image exists
    const img = new Image();
    img.src = item.img;
    img.onload = () => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <p>${item.name}</p>
        <div class="price">${item.price}</div>
      `;
      modalContent.appendChild(div);
    }
    // if image doesn't exist, do nothing (item won't show)
  });

  modal.style.display = "flex";
}

// Close Modal
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Close modal on clicking outside
window.onclick = e => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) modal.style.display = "none";
  });
}

