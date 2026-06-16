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
    // TODO: wire up EmailJS / Formspree
    console.log('Contact form submitted — integration pending');
    close();
  });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const el = document.getElementById('terminal-text');
  const text = ' OPEN TO INTERNSHIPS & PART-TIME ROLES';
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
  }, 1200);
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
});
