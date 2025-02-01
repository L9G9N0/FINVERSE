// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const themeMenu = document.getElementById('theme-menu');
const themeOptions = document.querySelectorAll('.theme-option');
const html = document.documentElement;

// Theme icons
const icons = {
  light: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>',
  dark: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path></svg>',
  auto: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
};

// Theme Switcher Logic
function setTheme(theme) {
  if (theme === 'auto') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  } else if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  
  localStorage.setItem('theme', theme);
  themeToggle.innerHTML = icons[theme];
  themeMenu.classList.add('hidden');
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Theme toggle button
themeToggle.addEventListener('click', () => {
  themeMenu.classList.toggle('hidden');
});

// Theme options
themeOptions.forEach(option => {
  option.addEventListener('click', () => {
    const theme = option.dataset.theme;
    setTheme(theme);
  });
});

// Close theme menu when clicking outside
document.addEventListener('click', (e) => {
  if (!themeToggle.contains(e.target) && !themeMenu.contains(e.target)) {
    themeMenu.classList.add('hidden');
  }
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (localStorage.getItem('theme') === 'auto') {
    setTheme('auto');
  }
});

// Slider functionality
const slides = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;

function updateSlider() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto-advance slides
setInterval(nextSlide, 5000);