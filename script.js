// ===== ROTATING ROLE BADGE =====
class RotatingText {
  constructor(el, roles, interval = 2800) {
    this.el = el;
    this.roles = roles;
    this.currentIndex = 0;
    this.interval = interval;
    this.isAnimating = false;

    this.el.textContent = roles[0];
    setTimeout(() => this.startCycling(), this.interval);
  }

  async next() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const nextIndex = (this.currentIndex + 1) % this.roles.length;

    // Fade out (width change happens invisibly at opacity 0)
    this.el.style.opacity = '0';
    await new Promise(r => setTimeout(r, 280));

    this.el.textContent = this.roles[nextIndex];
    this.currentIndex = nextIndex;

    // Fade in
    this.el.style.opacity = '1';
    await new Promise(r => setTimeout(r, 280));

    this.isAnimating = false;
  }

  startCycling() {
    setInterval(() => this.next(), this.interval);
  }
}

// ===== CONNECT TOGGLE =====
function initConnectToggle() {
  const connectBtn = document.getElementById('connect-btn');
  const socialNav = document.getElementById('social-nav');

  connectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = socialNav.classList.contains('is-open');
    if (isOpen) {
      socialNav.classList.remove('is-open');
      connectBtn.classList.remove('is-dimmed');
    } else {
      socialNav.classList.add('is-open');
      connectBtn.classList.add('is-dimmed');
    }
  });
}

// ===== MAIL MODAL =====
function initModal() {
  const mailLink = document.getElementById('link-mail');
  const modal = document.getElementById('mail-modal');
  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.modal-close');
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('.form-submit');  // ← add this

  emailjs.init('AD4lLGV5HmU5sQdlR');  // ← add this, paste your key here

  function open() {
    modal.classList.add('is-open');
    modal.removeAttribute('aria-hidden');
    closeBtn.focus();
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  mailLink.addEventListener('click', (e) => {
    e.preventDefault();
    open();
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    emailjs.send(
      'service_m07ofvw',
      'template_ln40nii',
      { name, email, message }
    ).then(() => {
      submitBtn.textContent = 'SENT [OK]';
      setTimeout(() => {
        close();
        form.reset();
        submitBtn.textContent = 'SEND';
        submitBtn.disabled = false;
      }, 1500);
    }).catch((err) => {
      console.error('EmailJS error:', err);
      submitBtn.textContent = 'FAILED — TRY AGAIN';
      submitBtn.disabled = false;
    });
  });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  console.log('typing animation init', document.getElementById('terminal-text'));
  const el = document.getElementById('terminal-text');
  if (!el) return;
  const text = ' OPEN TO INTERNSHIPS & FULL-TIME ROLES';
  let i = 0;

  setTimeout(() => {
    const type = () => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(type, 55);
      }
    };
    type();
  }, 2500);
}

// ===== MATRIX CURSOR =====
function initMatrixCursor() {
  const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*[]{}';
  const dot = document.getElementById('cursor-dot');
  let lastSpawn = 0;

  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    const now = Date.now();
    if (now - lastSpawn < 40) return;
    lastSpawn = now;

    const char = document.createElement('div');
    char.className = 'matrix-char';
    char.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];

    const isRed = Math.random() < 0.15;
    char.style.color = isRed ? '#e50000' : '#39ff14';
    char.style.textShadow = isRed ? '0 0 8px #e50000' : '0 0 8px #39ff14';

    const offsetX = (Math.random() - 0.5) * 16;
    char.style.left = (mouseX + offsetX) + 'px';
    char.style.top = mouseY + 'px';
    char.style.fontSize = (10 + Math.random() * 8) + 'px';

    document.body.appendChild(char);
    setTimeout(() => char.remove(), 800);
  });
}


// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const roleEl = document.getElementById('role-text');
  const roles = [
    'ML ENGINEER',
    'AI & AUTOMATION',
    'MACHINE LEARNING',
    'BACKEND',
    'CONTENT CREATION',
    'VIDEOGRAPHY',
    'MANAGEMENT'
  ];
  new RotatingText(roleEl, roles, 2800);

  initConnectToggle();
  initModal();
  initTypingAnimation();
  initMatrixCursor();
});
