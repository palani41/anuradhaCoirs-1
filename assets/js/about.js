document.addEventListener("DOMContentLoaded", function () {
      // 1. Intersection Observer for Fade-Ups
      const fadeElements = document.querySelectorAll('.anim-fade-up');
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

      fadeElements.forEach(el => fadeObserver.observe(el));

      // 2. Animated Counters
      const counters = document.querySelectorAll('.counter');
      let countersStarted = false;

      const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          countersStarted = true;
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target;
              }
            };
            updateCounter();
          });
        }
      }, { threshold: 0.5 });

      const statsSection = document.getElementById('statsSection');
      if (statsSection) counterObserver.observe(statsSection);

      // 3. Parallax Shapes
      const parallaxEls = document.querySelectorAll('.js-parallax');
      let ticking = false;

      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            const scrolled = window.pageYOffset;
            parallaxEls.forEach(el => {
              const speed = el.getAttribute('data-speed');
              el.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // 4. Timeline Progress Line
            const timeline = document.getElementById('timelineContainer');
            const progress = document.getElementById('timelineProgress');
            if (timeline && progress) {
              const rect = timeline.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              if (rect.top < windowHeight / 2) {
                let fillHeight = (windowHeight / 2) - rect.top;
                if (fillHeight > rect.height) fillHeight = rect.height;
                progress.style.height = fillHeight + 'px';
              } else {
                progress.style.height = '0px';
              }
            }

            ticking = false;
          });
          ticking = true;
        }
      });

      // 5. Testimonial Carousel
      const slides = document.querySelectorAll('.testimonial-slide');
      const dots = document.querySelectorAll('.testimonial-dot');
      let currentSlide = 0;
      let slideTimer;

      function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
      }

      function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
      }

      function startAutoplay() {
        slideTimer = setInterval(nextSlide, 5000);
      }

      function resetAutoplay() {
        clearInterval(slideTimer);
        startAutoplay();
      }

      if (slides.length && dots.length) {
        dots.forEach(dot => {
          dot.addEventListener('click', function () {
            showSlide(+this.getAttribute('data-index'));
            resetAutoplay();
          });
        });
        startAutoplay();
      }

      // 6. Subtle 3D tilt on interactive cards
      const tiltEls = document.querySelectorAll('.value-card, .bento-card, .cert-badge');
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      if (isFinePointer) {
        tiltEls.forEach(el => {
          el.style.transformStyle = 'preserve-3d';
          el.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -10;
            const rotateY = ((x / rect.width) - 0.5) * 10;
            this.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
          });
          el.addEventListener('mouseleave', function () {
            this.style.transform = '';
          });
        });
      }
    });

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
