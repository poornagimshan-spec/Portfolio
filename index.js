// PRELOADER
window.addEventListener('load', () => {
  document.getElementById('preloader').style.opacity = '0';
  setTimeout(() => document.getElementById('preloader').remove(), 400);
});

// THEME TOGGLE
const toggle = document.querySelector('.theme-toggle');
toggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});
// restore saved
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

// CUSTOM CURSOR
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// SMOOTH SCROLL & ACTIVE NAV
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (scrollY >= top) cur = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href').slice(1) === cur);
  });
});

// REVEAL ANIMATIONS
const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
revealItems.forEach(el => observer.observe(el));

// SKILL PROGRESS BARS
const skillBars = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const percent = card.dataset.skill;
      card.querySelector('.progress').style.width = percent + '%';
      skillObserver.unobserve(card);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => skillObserver.observe(bar));

// PORTFOLIO FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.cat === filter) ? 'block' : 'none';
    });
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// CONTACT FORM HANDLER
function handleSubmit(e) {
  e.preventDefault();
  alert('Thank you! Your message has been sent (demo).');
  e.target.reset();
}

// FOOTER YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// SCROLL-TO-TOP
document.querySelector('.to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});