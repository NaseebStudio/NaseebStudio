document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  // Current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav
  const hamb = document.getElementById('hamb');
  const nav = document.getElementById('navLinks');
  hamb.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamb.setAttribute('aria-expanded', open);
  });

  // Showreel controls
  const reel = document.getElementById('showreel');
  const playReel = document.getElementById('playReel');
  const muteReel = document.getElementById('muteReel');
  playReel.addEventListener('click', () => {
    reel.play();
  });
  muteReel.addEventListener('click', () => {
    reel.muted = !reel.muted;
    muteReel.textContent = reel.muted ? 'Unmute' : 'Mute';
  });

  // Update carousel on window resize
  window.addEventListener('resize', updateCarousel);

  // Lightbox modal for featured work
  const modal = document.getElementById('modal');
  const modalVideo = document.getElementById('modalVideo');
  document.querySelectorAll('.thumb .play button').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('open');
      const src = btn.getAttribute('data-video');
      modalVideo.src = src;
      modalVideo.play();
    });
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modalVideo.pause();
      modalVideo.removeAttribute('src');
    }
  });

  // Contact form: build email + WhatsApp link
  const form = document.getElementById('contactForm');
  const waDirect = document.getElementById('waDirect');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent('New Project Inquiry — ' + (data.service || ''));
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || ''}\nService: ${data.service}\n\nDetails:\n${data.message || ''}`);
    window.location.href = `naseeb.studi@gmail.com.studio?subject=${subject}&body=${body}`;
  });

  waDirect.addEventListener('click', (e) => {
    const data = Object.fromEntries(new FormData(form));
    const msg = `Hi Aabid! I have a ${data.service} project. My name is ${data.name}. ${data.message || ''}`;
    waDirect.href = `https://wa.me/917517503427?text=${encodeURIComponent(msg)}`;
  });
});