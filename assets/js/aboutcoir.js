document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
