// navigasi mobile
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', opened);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// progress bar saat scroll
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`;
});

// animasi elemen ketika masuk layar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.bar i').forEach(bar => bar.style.width = bar.dataset.width);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// angka statistik
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      el.textContent = target === 100 ? `${current}%` : current + (target === 3 ? '+' : '+');
      if (current >= target) clearInterval(timer);
    }, 35);
    countObserver.unobserve(el);
  });
}, { threshold: 0.7 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// teks berganti sederhana
const roles = ['Web Developer', 'RPL Student', 'Creative Learner'];
let roleIndex = 0;
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  const typed = document.getElementById('typedText');
  typed.style.opacity = 0;
  setTimeout(() => { typed.textContent = roles[roleIndex]; typed.style.opacity = 1; }, 220);
}, 2600);

// filter project
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none';
    });
  });
});

// ganti tema terang/gelap
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.getElementById('themeToggle').textContent = document.body.classList.contains('light') ? '☾' : '☼';
});

// form WhatsApp — ganti nomor di bawah dengan nomor kamu, gunakan kode negara tanpa tanda +
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const whatsappNumber = '6281234567890'; // GANTI dengan nomor WhatsApp kamu
  const name = document.getElementById('senderName').value.trim();
  const contact = document.getElementById('senderContact').value.trim();
  const message = document.getElementById('senderMessage').value.trim();
  const text = `Halo Haidar, saya ${name}. Kontak saya: ${contact}.%0A%0A${message}`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
});

// menu aktif sesuai section
const sections = document.querySelectorAll('main section[id]');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  nav.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});
        
