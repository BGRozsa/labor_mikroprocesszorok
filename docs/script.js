/* ==============================================================================
   Sapientia EMTE - Mikroprocesszoros Rendszerek Labor Portál JS
   Vágólapra másolás és Navigációs logika
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Vágólapra másolás gombok kezelése
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const codeText = codeBlock.querySelector('code').innerText;
      
      navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Másolva!';
        btn.classList.add('copied');
        
        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });

  // 2. Aktív menüpont jelölése görgetéskor
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Lábkiosztási Diagramok Tab váltó logika
  const tabButtons = document.querySelectorAll('.diagram-tab-btn');
  const tabPanels = document.querySelectorAll('.diagram-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
        activePanel.style.display = 'block';
      }
    });
  });
});

