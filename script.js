// ==================== MENU ITEMS DATA ====================
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
  snacks: Array.from({length: 16}, (_, i) => ({
    img: `images/snacks${i+1}.png`,
    name: `Snack ${i+1}`,
    price: `₱${50 + i*5}`
  })),
};

// ==================== MODAL FUNCTIONS ====================
function openModal(category) {
  const modal = document.getElementById(category);
  if (!modal) return;
  
  const modalContent = modal.querySelector(".menu-detail");
  
  // Clear old content
  modalContent.innerHTML = "";

  // Add items dynamically
  menuItems[category].forEach((item, index) => {
    const img = new Image();
    img.src = item.img;
    
    img.onload = () => {
      const div = document.createElement("div");
      div.className = "item";
      div.style.animationDelay = `${index * 0.05}s`;
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <p>${item.name}</p>
        <div class="price">${item.price}</div>
      `;
      modalContent.appendChild(div);
      
      // Trigger animation
      setTimeout(() => div.classList.add('visible'), 10);
    };
    
    // If image doesn't exist, skip it
    img.onerror = () => {
      console.log(`Image not found: ${item.img}`);
    };
  });

  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent body scroll
  
  // Add fade-in to modal
  setTimeout(() => modal.style.opacity = "1", 10);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Re-enable body scroll
  }, 300);
}

// Close modal when clicking outside
window.onclick = e => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
};

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll(".modal").forEach(modal => {
      if (modal.style.display === "flex") {
        closeModal(modal.id);
      }
    });
  }
});

// ==================== SCROLL ANIMATIONS ====================
const fadeEls = document.querySelectorAll(".fade-up");
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Optional: stop observing after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeEls.forEach(el => observer.observe(el));

// ==================== PARALLAX MOUSE MOVEMENT ====================
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (window.innerWidth - e.pageX) / 100;
  mouseY = (window.innerHeight - e.pageY) / 100;
});

// Smooth parallax animation
function animateParallax() {
  const layers = document.querySelectorAll(".parallax-layer");
  
  // Smooth interpolation
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;
  
  layers.forEach((layer, index) => {
    const speed = (index + 1) * 0.3;
    const x = currentX * speed;
    const y = currentY * speed;
    
    layer.style.transform = `translate(${x}px, ${y}px)`;
  });
  
  requestAnimationFrame(animateParallax);
}

// Start parallax animation
if (document.querySelectorAll(".parallax-layer").length > 0) {
  animateParallax();
}

// ==================== VIDEO CONTROLS ====================
const video = document.getElementById('ramVideo');
const unmuteBtn = document.getElementById('unmuteBtn');

if (video && unmuteBtn) {
  // Unmute video on button click
  unmuteBtn.addEventListener('click', function () {
    video.muted = false;
    video.play().catch(err => console.log("Play error:", err));
    
    // Fade out button
    unmuteBtn.style.opacity = '0';
    setTimeout(() => {
      unmuteBtn.style.display = 'none';
    }, 300);
  });
  
  // Show button again if video is muted
  video.addEventListener('volumechange', function() {
    if (video.muted) {
      unmuteBtn.style.display = 'flex';
      setTimeout(() => unmuteBtn.style.opacity = '1', 10);
    }
  });
  
  // Add play/pause on video click
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

// ==================== SMOOTH SCROLL FOR NAVIGATION ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip empty hash or just "#"
    if (href === '#' || href === '') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== HEADER SCROLL EFFECT ====================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.style.boxShadow = '0 2px 25px rgba(255, 107, 53, 0.3)';
    return;
  }
  
  if (currentScroll > lastScroll) {
    // Scrolling down - enhance shadow
    header.style.boxShadow = '0 4px 30px rgba(255, 107, 53, 0.4)';
  } else {
    // Scrolling up - reduce shadow
    header.style.boxShadow = '0 2px 25px rgba(255, 107, 53, 0.3)';
  }
  
  lastScroll = currentScroll;
});

// ==================== IMAGE LAZY LOADING ====================
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for resize events
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

// Handle window resize
const handleResize = debounce(() => {
  // Recalculate any size-dependent elements here
  console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// ==================== MENU PAGE SPECIFIC CODE ====================
// This section only runs on menu.html page
if (document.getElementById('menuItems')) {
  console.log('✅ Menu page detected - enhanced menu features loaded');
  
  // The menu.html has its own script inside the HTML file
  // Make sure clicks on menu items work
  document.addEventListener('click', function(e) {
    const menuItem = e.target.closest('#menuItems .item');
    if (menuItem) {
      console.log('🍜 Menu item clicked!');
    }
  });
}

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add keyboard navigation for modals
document.addEventListener('keydown', (e) => {
  const openModal = document.querySelector('.modal[style*="display: flex"]');
  
  if (openModal && e.key === 'Tab') {
    const focusableElements = openModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Trap focus within modal
    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
});

// ==================== SMOOTH PAGE TRANSITIONS ====================
// Create loader element
const createPageLoader = () => {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="page-loader-content">
      <div class="page-loader-spinner"></div>
      <div class="page-loader-text">Loading...</div>
    </div>
  `;
  document.body.appendChild(loader);
  return loader;
};

// Get or create loader
let pageLoader = document.querySelector('.page-loader');
if (!pageLoader) {
  pageLoader = createPageLoader();
}

// Handle all internal link clicks (ONLY for navigation links)
document.addEventListener('click', function(e) {
  
  // EMERGENCY: If on menu.html, don't intercept ANYTHING except nav links
  if (document.getElementById('menuItems')) {
    const link = e.target.closest('a');
    // Only intercept header nav on menu page
    if (link && link.closest('nav')) {
      if (link.href && !link.href.includes('#') && link.hostname === window.location.hostname) {
        e.preventDefault();
        document.body.classList.add('page-transition');
        pageLoader.classList.add('active');
        setTimeout(() => { window.location.href = link.href; }, 400);
      }
    }
    return; // Exit early on menu page for all other clicks
  }
  
  // FIRST: Check if clicking on menu items - let them work!
  if (e.target.closest('#menuItems .item')) {
    console.log('✅ Menu item click - allowing it');
    return; // Don't intercept menu items
  }
  
  // Check if clicking on modal close or inside modal
  if (e.target.closest('.modal') || e.target.closest('.close')) {
    return; // Don't intercept modal interactions
  }
  
  const link = e.target.closest('a');
  
  // Don't intercept if NO link was clicked
  if (!link) {
    return;
  }
  
  // Don't intercept Facebook/external links
  if (link.href.includes('facebook.com') || link.target === '_blank') {
    return;
  }
  
  // Don't intercept menu category links (these open modals on index.html)
  if (link.classList.contains('menu-item-link')) {
    return;
  }
  
  // ONLY intercept navigation links (header nav, back button, main CTAs)
  const isNavLink = link.closest('nav') || 
                    link.classList.contains('back-home') ||
                    link.classList.contains('btn') ||
                    link.classList.contains('cta-primary') ||
                    link.classList.contains('cta-secondary');
  
  if (isNavLink && 
      link.href && 
      !link.href.includes('#') &&
      link.hostname === window.location.hostname) {
    
    e.preventDefault();
    const destination = link.href;
    
    console.log('🚀 Navigating to:', destination);
    
    // Add fade-out animation
    document.body.classList.add('page-transition');
    pageLoader.classList.add('active');
    
    // Navigate after animation
    setTimeout(() => {
      window.location.href = destination;
    }, 400);
  }
});

// Remove loader after page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.remove('active');
    }
  }, 200);
});

// ==================== DARK MODE TOGGLE ====================
// Apply saved theme IMMEDIATELY before page renders
(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    }
  } catch (e) {
    console.log('Could not load saved theme');
  }
})();

// Full dark mode functionality after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  
  if (!themeToggle) {
    console.log('⚠️ Theme toggle button not found on this page');
    console.log('💡 Make sure you added the button HTML before </body> tag');
    return;
  }

  console.log('✅ Dark mode toggle found and ready!');

  // Toggle theme on click
  themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🖱️ Toggle button clicked!');
    
    // Toggle dark mode class
    document.body.classList.toggle('dark-mode');
    document.documentElement.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      console.log(isDark ? '🌙 Dark mode ENABLED and SAVED' : '☀️ Light mode ENABLED and SAVED');
    } catch (e) {
      console.log('⚠️ Could not save theme preference');
    }
    
    // Rotation animation
    this.style.transform = 'rotate(360deg) scale(1.1)';
    setTimeout(() => {
      this.style.transform = '';
    }, 300);
  });
  
  // Log current theme
  const currentTheme = localStorage.getItem('theme') || 'light';
  console.log(`Current theme: ${currentTheme}`);
});

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c🍜 Welcome to MQ Ramyeon Snackhaus & Minimart!', 
  'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cEnjoy delicious Korean noodles and meals!', 
  'color: #ff8c42; font-size: 14px;');

// ==================== INITIALIZATION ====================
console.log('✅ All JavaScript features loaded successfully!');
