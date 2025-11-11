
    // Create floating particles
    function createParticles() {
      const animatedBg = document.querySelector('.animated-bg');
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${(i % 3) + 1}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        animatedBg.appendChild(particle);
      }
    }

    createParticles();

    // Helpers to work with CSS variables
    const rootEl = document.documentElement;
    const getVar = (name) => getComputedStyle(rootEl).getPropertyValue(name).trim();
    const setVar = (name, value) => rootEl.style.setProperty(name, value);
    const THEME_KEY = 'anu_theme';

    function applyTheme(theme) {
      rootEl.setAttribute('data-theme', theme);
      const toggleBtn = document.getElementById('theme-toggle');
      if (toggleBtn) {
        const isDark = theme === 'dark';
        toggleBtn.setAttribute('aria-pressed', String(isDark));
        const icon = toggleBtn.querySelector('.theme-icon');
        if (icon) icon.textContent = isDark ? '🌙' : '☀️';
      }
    }

    function initTheme() {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        applyTheme(saved);
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
      }
    }

    function toggleTheme() {
      const current = rootEl.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    }

    const defaultConfig = {
      developer_name: 'ANUPAMA K',
      tagline: 'Frontend Developer | MERN Stack Specialist',
      linkedin_url: 'https://www.linkedin.com/in/anupama-k',
      email: 'anupamaa2024@gmail.com',
      github_url: 'https://github.com/ANUPAMAKUMARAN',
      background_color: getVar('--bg') || '#0a0a0a',
      text_color: getVar('--text') || '#ffffff',
      primary_action_color: getVar('--primary') || '#dc2626',
      secondary_action_color: getVar('--primary-2') || '#ef4444',
      font_family: 'Poppins',
      font_size: 16
    };

    async function onConfigChange(config) {
      const customFont = config.font_family || defaultConfig.font_family;
      const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      const baseSize = config.font_size || defaultConfig.font_size;

      document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
      document.body.style.fontSize = `${baseSize}px`;

      const backgroundColor = config.background_color || defaultConfig.background_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
      const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;

      // Update CSS variables so styles update everywhere consistently
      setVar('--bg', backgroundColor);
      setVar('--text', textColor);
      setVar('--primary', primaryActionColor);
      setVar('--primary-2', secondaryActionColor);

      document.getElementById('developer-name').textContent = config.developer_name || defaultConfig.developer_name;
      document.getElementById('tagline').textContent = config.tagline || defaultConfig.tagline;
      
      const linkedinLink = document.querySelector('.social-icon[title="LinkedIn"]');
      if (linkedinLink) {
        linkedinLink.href = config.linkedin_url || defaultConfig.linkedin_url;
      }
      
      const emailLink = document.querySelector('.social-icon[title="Email"]');
      if (emailLink) {
        emailLink.href = `mailto:${config.email || defaultConfig.email}`;
      }
      
      const githubLink = document.querySelector('.social-icon[title="GitHub"]');
      if (githubLink) {
        githubLink.href = config.github_url || defaultConfig.github_url;
      }

      document.querySelector('.hero h1').style.fontSize = `${baseSize * 2.5}px`;
      document.querySelector('.hero .tagline').style.fontSize = `${baseSize * 1.2}px`;
      document.querySelectorAll('.section-title').forEach(el => {
        el.style.fontSize = `${baseSize * 1.8}px`;
      });
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value) => {
                config.background_color = value;
                window.elementSdk.setConfig({ background_color: value });
              }
            },
            {
              get: () => config.surface_color || defaultConfig.surface_color,
              set: (value) => {
                config.surface_color = value;
                window.elementSdk.setConfig({ surface_color: value });
              }
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => {
                config.text_color = value;
                window.elementSdk.setConfig({ text_color: value });
              }
            },
            {
              get: () => config.primary_action_color || defaultConfig.primary_action_color,
              set: (value) => {
                config.primary_action_color = value;
                window.elementSdk.setConfig({ primary_action_color: value });
              }
            },
            {
              get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
              set: (value) => {
                config.secondary_action_color = value;
                window.elementSdk.setConfig({ secondary_action_color: value });
              }
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
              config.font_family = value;
              window.elementSdk.setConfig({ font_family: value });
            }
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
              config.font_size = value;
              window.elementSdk.setConfig({ font_size: value });
            }
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ['developer_name', config.developer_name || defaultConfig.developer_name],
          ['tagline', config.tagline || defaultConfig.tagline],
          ['linkedin_url', config.linkedin_url || defaultConfig.linkedin_url],
          ['email', config.email || defaultConfig.email],
          ['github_url', config.github_url || defaultConfig.github_url]
        ])
      });
    }

    // Theme toggle wiring
    initTheme();
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = href ? document.querySelector(href) : null;

        // If drawer is open, close it first so body exits fixed/no-scroll state
        const navLinksOpen = document.querySelector('.nav-links')?.classList.contains('active');
        if (navLinksOpen || document.body.classList.contains('no-scroll')) {
          // closeDrawer is defined below; safe to call here
          try { closeDrawer(); } catch {}
          // Delay scrolling slightly to allow layout to settle
          requestAnimationFrame(() => {
            setTimeout(() => {
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 30);
          });
          return;
        }

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Drawer Navigation Functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const body = document.body;
    let scrollPosition = 0;
    
    // Toggle drawer
    function toggleDrawer() {
      const isOpening = !navLinks.classList.contains('active');
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      drawerOverlay.classList.toggle('active');

      if (isOpening) {
        scrollPosition = window.scrollY || window.pageYOffset;
        body.classList.add('no-scroll');
        body.style.top = `-${scrollPosition}px`;
      } else {
        closeDrawer();
      }
    }
    
    // Close drawer
    function closeDrawer() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      drawerOverlay.classList.remove('active');
      if (body.classList.contains('no-scroll')) {
        const offset = parseInt(body.style.top || '0', 10);
        body.classList.remove('no-scroll');
        body.style.top = '';
        window.scrollTo(0, Math.abs(offset));
      }
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    
    // Close drawer when clicking on nav links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
    
    // Close drawer when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeDrawer();
      }
    });
    
    // Removed cssText override; handled scroll lock via body.top and restoring scroll