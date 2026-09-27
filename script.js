/* ==========================================================================
   Ritesh Kumar Yadav — Portfolio JavaScript Logic (v7.0 - Fail-Safe Contact)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar Sticky Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  // Scroll Reveal Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Click Ripple Motion Effect
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn, .social-icon, .filter-btn, .copy-btn');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Certificate Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Certificate Lightbox Modal
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalOrg = document.getElementById('modal-org');
  const modalClose = document.getElementById('modal-close');
  const modalDownload = document.getElementById('modal-download');

  const openModal = (imgSrc, title, org) => {
    if (!modal) return;
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalOrg.textContent = org;
    if (modalDownload) modalDownload.href = imgSrc;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.verify-link')) return;
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const org = card.getAttribute('data-org');
      openModal(imgSrc, title, org);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Case Study Modal Logic
  const caseModal = document.getElementById('case-modal');
  const caseModalTitle = document.getElementById('case-modal-title');
  const caseModalContent = document.getElementById('case-modal-content');
  const caseModalClose = document.getElementById('case-modal-close');

  const caseStudyData = {
    'flyrank': {
      title: 'FlyRank ML Search Intelligence Engine',
      content: `
        <div class="case-study-section">
          <h4><i class="fas fa-bullseye"></i> Problem Statement</h4>
          <p>Analyzing large-scale website content (30,000+ pages) manually to determine which pages require content refresh or optimization is extremely time-consuming for marketing teams.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-filter"></i> Dataset & Feature Engineering</h4>
          <p>Scored content quality signals, organic search impressions, bounce rates, word counts, and content decay metrics across 30,000+ content URLs in Pandas.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-cogs"></i> ML Model Architecture</h4>
          <p>Built classification and regression scoring models in Scikit-Learn (Random Forest & Gradient Boosting) to prioritize high-value content refresh opportunities.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-chart-line"></i> Measurable Results & Live Site</h4>
          <p>Automated SEO opportunity ranking, improving decision efficiency by over 60%.</p>
          <div style="margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="https://riteshy1526.github.io/flyrank-internship-ml/work/paper/" target="_blank" class="btn btn-primary btn-sm">
              <i class="fas fa-external-link-alt"></i> Visit Live Project Site 🚀
            </a>
            <a href="https://github.com/riteshy1526/flyrank-internship-ml" target="_blank" class="btn btn-outline btn-sm">
              <i class="fab fa-github"></i> GitHub Repository ↗
            </a>
          </div>
        </div>
      `
    },
    'face-rec': {
      title: 'Face Recognition using PCA & ANN (91% Accuracy)',
      content: `
        <div class="case-study-section">
          <h4><i class="fas fa-bullseye"></i> Problem Statement</h4>
          <p>Facial recognition over high-dimensional image matrices (e.g., 10,000+ pixels per image) causes severe computational bottlenecks and overfitting without feature reduction.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-camera"></i> OpenCV Preprocessing</h4>
          <p>Processed raw facial images through grayscale conversion, contrast normalization, histogram equalization, and facial alignment in OpenCV.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-compress-alt"></i> PCA + ANN Pipeline</h4>
          <p>Applied Principal Component Analysis (PCA) to compress high-dimensional pixel matrices into 30 eigenface components, retaining 92% of original variance. Passed reduced vectors into an Artificial Neural Network (ANN) classifier.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-trophy"></i> Results & Accuracy</h4>
          <p>Achieved <strong>91% classification accuracy</strong> across a 40-class benchmark face dataset with sub-10ms inference latency per image.</p>
        </div>
      `
    },
    'contentpulse': {
      title: 'ContentPulse AI – Website Content Refresh Engine',
      content: `
        <div class="case-study-section">
          <h4><i class="fas fa-bullseye"></i> Problem Statement</h4>
          <p>Content creators lack real-time AI tools to evaluate live web content quality and receive actionable optimization recommendations.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-laptop-code"></i> Tech Stack & Application</h4>
          <p>Built an interactive web application using Python, Streamlit, and FastAPI that ingests web content, extracts key readability & keyword density signals, and feeds them into trained ML scoring models.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-rocket"></i> Deployment & Impact</h4>
          <p>Deployed live on Streamlit Cloud with an intuitive UI dashboard allowing users to input any URL and instantly view AI-generated content scores.</p>
        </div>
      `
    },
    'seatledger': {
      title: 'SeatLedger – Library Management System',
      content: `
        <div class="case-study-section">
          <h4><i class="fas fa-bullseye"></i> Problem Statement</h4>
          <p>Managing student seat allocations, library occupancy, and reservation ledgers manually leads to scheduling conflicts and lack of transparency.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-database"></i> Architecture & Database</h4>
          <p>Engineered a full-stack library management system in Python and Streamlit backed by relational SQL tables tracking student IDs, seat numbers, time slots, and check-in ledgers.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-check-circle"></i> Live Features</h4>
          <p>Real-time seat occupancy visualization, student self-service portal, and admin dashboard live on Streamlit Cloud.</p>
        </div>
      `
    },
    'salary': {
      title: 'Salary Prediction ML Engine',
      content: `
        <div class="case-study-section">
          <h4><i class="fas fa-bullseye"></i> Problem Statement</h4>
          <p>Estimating accurate compensation packages for technical job roles based on complex non-linear combinations of experience, education, and domain skills.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-vial"></i> Model Training & Evaluation</h4>
          <p>Cleaned and encoded multi-feature candidate data. Evaluated multiple regression algorithms (Linear, Ridge, Lasso, Random Forest Regressor) with cross-validation.</p>
        </div>
        <div class="case-study-section">
          <h4><i class="fas fa-chart-bar"></i> Performance Metrics</h4>
          <p>Achieved high $R^2$ accuracy score with low Root Mean Squared Error (RMSE), enabling accurate salary predictions across career levels.</p>
        </div>
      `
    }
  };

  document.querySelectorAll('.open-case-study').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-case');
      if (caseStudyData[key] && caseModal) {
        caseModalTitle.textContent = caseStudyData[key].title;
        caseModalContent.innerHTML = caseStudyData[key].content;
        caseModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (caseModalClose) {
    caseModalClose.addEventListener('click', () => {
      caseModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (caseModal) caseModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // PCA Interactive Simulator
  const pcaSlider = document.getElementById('pca-slider');
  const pcaValue = document.getElementById('pca-value');
  const pcaVariance = document.getElementById('pca-variance');
  const pcaSize = document.getElementById('pca-size');
  const pcaAccuracy = document.getElementById('pca-accuracy');

  if (pcaSlider) {
    pcaSlider.addEventListener('input', (e) => {
      const k = parseInt(e.target.value);
      if (pcaValue) pcaValue.textContent = k;

      let variance = Math.min(99, Math.round(50 + 48 * (1 - Math.exp(-k / 20))));
      let accuracy = Math.min(96, Math.round(60 + 35 * (1 - Math.exp(-k / 18))));
      let compressedKb = Math.round(k * 0.4);

      if (pcaVariance) pcaVariance.textContent = `${variance}%`;
      if (pcaAccuracy) pcaAccuracy.textContent = `${accuracy}%`;
      if (pcaSize) pcaSize.textContent = `${compressedKb} KB (from 400 KB)`;
    });
  }

  // Copy to Clipboard Utility
  window.copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${type} to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Toast Function
  const toast = document.getElementById('toast');
  window.showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  // FAIL-SAFE CONTACT FORM HANDLER
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
      }

      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const subject = formData.get('subject_title') || 'Portfolio Inquiry';
      const message = formData.get('message') || '';

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          showToast('✅ Message sent to riteshy1526@gmail.com! (Check Inbox/Spam)');
          contactForm.reset();
        } else {
          console.warn('Web3Forms Notice:', result);
          // Fallback to Gmail compose window if key is unverified or blocked
          const formattedBody = `Hello Ritesh,\n\n${message}\n\n-------------------------\nSender Details:\nName: ${name}\nEmail: ${email}`;
          const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=riteshy1526@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
          window.open(gmailWebUrl, '_blank');
          showToast('⚠️ Opening Gmail to complete sending your message!');
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        const formattedBody = `Hello Ritesh,\n\n${message}\n\n-------------------------\nSender Details:\nName: ${name}\nEmail: ${email}`;
        const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=riteshy1526@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
        window.open(gmailWebUrl, '_blank');
        showToast('⚠️ Opening Gmail to send message!');
      } finally {
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      }
    });
  }
});
