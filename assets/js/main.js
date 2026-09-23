/**
 * Dobişko - Landing Page Interactive Scripts
 * Pure Vanilla JavaScript with zero external runtime dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initFaqAccordion();
  initScreenshotModal();
  initDownloadHandlers();
  initSweetSoundToggle();
  initSweetParticles();
});

/* -------------------------------------------------------------------------- */
/* 1. Mobile Menu Drawer                                                      */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    if (show) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0', '-translate-y-4');
        mobileMenu.classList.add('opacity-100', 'translate-y-0');
      }, 10);
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.remove('opacity-100', 'translate-y-0');
      mobileMenu.classList.add('opacity-0', '-translate-y-4');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 250);
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    toggleMenu(isHidden);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleMenu(false));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Navbar Dynamic Elevation on Scroll                                      */
/* -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-md', 'py-3');
      navbar.classList.remove('py-5');
    } else {
      navbar.classList.remove('shadow-md', 'py-3');
      navbar.classList.add('py-5');
    }
  }, { passive: true });
}

/* -------------------------------------------------------------------------- */
/* 3. FAQ Accordion                                                           */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-toggle');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      // Close all FAQs first
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));
      document.querySelectorAll('.faq-toggle').forEach(b => b.setAttribute('aria-expanded', 'false'));

      // If clicked item wasn't open, open it
      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        button.setAttribute('aria-expanded', 'true');
        playSweetSound(440, 0.08); // cute blip
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Screenshot Lightbox Modal                                               */
/* -------------------------------------------------------------------------- */
let currentScreenshotIndex = 0;
const screenshotsData = [
  {
    title: "Donut Şelalesi ve Tatlı Parkuru",
    desc: "Altın donatları topla, engellerden zıpla ve şeker rampalarından uç!",
    tag: "Aksiyon"
  },
  {
    title: "Çikolata Vadisi & Şeker Roketi",
    desc: "Çikolata girdaplarına dikkat et! Şeker roketini alarak gökyüzünde şeker seli yakala.",
    tag: "Güçlendirici"
  },
  {
    title: "Dobişko Dolabı - Kostüm Özelleştirme",
    desc: "Aşçı şapkası, çilekli pelerin ve sevimli pati ayakkabılarıyla Dobişko'yu dilediğin gibi süsle.",
    tag: "Karakter"
  },
  {
    title: "Liderlik Tablosu & Rekor Yarışı",
    desc: "En yüksek skoru yap, arkadaşlarınla yarış ve haftalık tatlı ödülleri kazan!",
    tag: "Sosyal & Rekor"
  }
];

function initScreenshotModal() {
  const modal = document.getElementById('screenshotModal');
  const modalImg = document.getElementById('modalImageContainer');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTag = document.getElementById('modalTag');
  const closeBtn = document.getElementById('modalCloseBtn');
  const prevBtn = document.getElementById('modalPrevBtn');
  const nextBtn = document.getElementById('modalNextBtn');
  const triggers = document.querySelectorAll('.gallery-trigger');

  if (!modal) return;

  function updateModal(index) {
    currentScreenshotIndex = (index + screenshotsData.length) % screenshotsData.length;
    const data = screenshotsData[currentScreenshotIndex];
    const sourceCard = document.querySelector(`[data-index="${currentScreenshotIndex}"] .screenshot-preview-art`);

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalTag) modalTag.textContent = data.tag;
    if (modalImg && sourceCard) {
      modalImg.innerHTML = sourceCard.outerHTML;
      // remove hover scales inside modal
      const preview = modalImg.firstElementChild;
      if (preview) {
        preview.classList.remove('h-56', 'h-64');
        preview.classList.add('h-72', 'sm:h-96', 'w-full');
      }
    }
  }

  function openModal(index) {
    updateModal(index);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    playSweetSound(523.25, 0.1);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(trigger.getAttribute('data-index') || '0', 10);
      openModal(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateModal(currentScreenshotIndex - 1);
      playSweetSound(392, 0.08);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateModal(currentScreenshotIndex + 1);
      playSweetSound(587.33, 0.08);
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') updateModal(currentScreenshotIndex - 1);
      else if (e.key === 'ArrowRight') updateModal(currentScreenshotIndex + 1);
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Download Handlers & Toast Notification                                 */
/* -------------------------------------------------------------------------- */
function initDownloadHandlers() {
  const downloadBtns = document.querySelectorAll('.download-trigger');
  const toast = document.getElementById('downloadToast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    const toastMsg = document.getElementById('toastMessage');
    if (toastMsg && message) toastMsg.textContent = message;

    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 4500);
  }

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Trigger festive sweet confetti
      createConfettiBurst(e.clientX, e.clientY);
      playVictorySound();
      showToast("🍩 Dobişko APK v1.0.4 hazırlanıyor... İndirme 3 saniye içinde başlayacak!");
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Pure Web Audio Synthesizer (Arcade Game Audio)                         */
/* -------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSweetSound(freq = 440, duration = 0.1) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    // Audio context not allowed or unsupported
  }
}

function playVictorySound() {
  if (!soundEnabled) return;
  try {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playSweetSound(freq, 0.18);
      }, idx * 75);
    });
  } catch (err) {}
}

function initSweetSoundToggle() {
  const toggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundIcon) {
      soundIcon.className = soundEnabled
        ? 'fa-solid fa-volume-high text-pink-500'
        : 'fa-solid fa-volume-xmark text-slate-400';
    }
    if (soundEnabled) {
      playSweetSound(523.25, 0.1);
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 7. Canvas Confetti Sweet Burst Generator                                  */
/* -------------------------------------------------------------------------- */
function createConfettiBurst(originX, originY) {
  const colors = ['#f43f5e', '#fb7185', '#f59e0b', '#fde047', '#38bdf8', '#34d399', '#a855f7'];
  const confettiCount = 35;
  const container = document.body;

  const posX = originX && originX > 0 ? originX : window.innerWidth / 2;
  const posY = originY && originY > 0 ? originY : window.innerHeight / 2;

  for (let i = 0; i < confettiCount; i++) {
    const piece = document.createElement('div');
    piece.className = 'fixed pointer-events-none rounded-full z-50';
    
    // Randomize shape (circle or candy pill or star)
    const size = Math.floor(Math.random() * 10) + 6;
    piece.style.width = `${size}px`;
    piece.style.height = `${size}px`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = `${posX}px`;
    piece.style.top = `${posY}px`;
    piece.style.opacity = '1';
    piece.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';

    container.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 120 + 80;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity + 60; // bias downward like gravity
    const rotation = Math.random() * 720;

    piece.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${destX}px, ${destY}px) scale(0.6) rotate(${rotation}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 600 + 700,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'forwards'
    }).onfinish = () => {
      piece.remove();
    };
  }
}

/* -------------------------------------------------------------------------- */
/* 8. Ambient Background Floating Sweets Particle Canvas                      */
/* -------------------------------------------------------------------------- */
function initSweetParticles() {
  const canvas = document.getElementById('sweetParticlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }, { passive: true });

  const sweetsIcons = ['🍪', '🍩', '🍬', '🧁', '⭐', '🍓'];
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 12 : 22;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 14,
      char: sweetsIcons[Math.floor(Math.random() * sweetsIcons.length)],
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.25,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y < -30) {
        p.y = height + 30;
        p.x = Math.random() * width;
      }
      if (p.x < -30) p.x = width + 30;
      if (p.x > width + 30) p.x = -30;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.font = `${p.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}
