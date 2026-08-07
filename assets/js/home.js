// Product details database for Quick View modal
const productDetailsData = {
  fibre: {
    name: "Coir Fibre",
    code: "AC-01",
    tag: "Coir Fibre",
    desc: "Premium natural coir fibre extracted from matured coconut husks. Processed using advanced cleaning and drying methods for superior quality. Widely used in mattresses, upholstery, geo textiles, ropes, brushes, and erosion control products.",
    images: [
      "assets/images/Products/coirfiberNew.jpeg",
      "assets/images/Products/whiteCoirFibre.jpeg",
      "assets/images/Products/coirfiberNew2.jpeg",
      "assets/images/Products/coirfiberNew4.jpeg",
      "assets/images/Products/fibreExport.jpeg"
    ],
    pills: ['High Tensile Strength', 'Eco-Friendly', 'Hydraulic Baled', 'Low Moisture', 'Export Certified'],
    specs: [
      ["Bale Size", "115 × 65 × 45 cm"],
      ["Weight", "110 – 125 kg"],
      ["Fibre Length", "5 – 25 cm"],
      ["Moisture", "Below 15%"],
      ["Impurities", "Below 3%"],
      ["Colour", "Golden Brown"],
      ["Loadability", "180 – 200 Bales / 40ft HC"]
    ]
  },
  peat: {
    name: "Coco Peat 5 KG Block",
    code: "AC-02",
    tag: "Coco Peat Block",
    desc: "Premium quality coco peat blocks suitable for horticulture, hydroponics, nurseries, and greenhouse cultivation. Available in low EC, washed, unwashed, buffered, and customized grades per buyer requirements.",
    images: [
      "assets/images/Products/cocopeatblock631.jpeg",
      "assets/images/Products/cocopeatblock632.jpeg",
      "assets/images/Products/cocopeatblock633.jpeg",
      "assets/images/Products/cocopeatblock635.jpeg",
      "assets/images/Products/cocopeat_block.jpeg"
    ],
    pills: ['Excellent Water Retention', '80–85 L Expansion', 'Low EC & High EC', 'Organic', 'pH Balanced'],
    specs: [
      ["Block Size", "30 × 30 × 12 cm"],
      ["Weight", "4.8 – 5 kg"],
      ["Expansion", "80 – 85 Litres"],
      ["EC Value", "Low EC (< 0.5 mS/cm) & High EC Available"],
      ["pH Value", "5.8 – 6.8"],
      ["Moisture", "Below 15%"],
      ["Compression", "5:1"]
    ]
  },
  briquette: {
    name: "Coco Peat Brick 650 Gms",
    code: "AC-03",
    tag: "Coco Briquettes",
    desc: "Lightweight coco peat briquettes specially designed for home gardening, seed germination, nurseries, and horticulture. Easy to use and expand quickly after adding water.",
    images: [
      "assets/images/Products/bricks.jpeg",
      "assets/images/Products/bricks2.jpeg",
      "assets/images/Products/bricks3.jpeg"
    ],
    pills: ['Lightweight', '9–10 L Expansion', 'Root Penetration', 'Moisture Retention', 'Indoor & Outdoor'],
    specs: [
      ["Brick Size", "20 × 10 × 5 cm"],
      ["Weight", "650 grams"],
      ["Expansion", "9 – 10 Litres"],
      ["EC Value", "Below 0.5 mS/cm"],
      ["pH Value", "5.8 – 6.8"],
      ["Moisture", "Below 15%"]
    ]
  },
  growbag: {
    name: "Cocopeat Grow Bag Slab",
    code: "AC-04 / AC-3A",
    tag: "Grow Bag Slab",
    desc: "Premium washed 100% cocopeat grow bag slabs specially processed for hydroponics, greenhouses, and commercial crop cultivation. High water retention, optimal aeration, and sun dried.",
    images: [
      "assets/images/Products/coirGrowBag.jpeg",
      "assets/images/Products/coirGrowBag2.jpeg",
      "assets/images/Products/openTopGrowBag.jpg",
      "assets/images/Products/GB.jpeg",
      "assets/images/Products/GBOT.jpeg",
      "assets/images/Products/GBS.jpeg"
    ],
    pills: ['12–30 L Volume', 'Washed Cocopeat 100%', 'Low & Standard EC', 'Sun Dried', 'Eco-Friendly'],
    specs: [
      ["Grade", "AC-3A - Almighty Coco Grow Bag"],
      ["Length", "50 cm / 90 cm / 100 cm / 120 cm"],
      ["Width", "15 cm / 18 cm / 20 cm"],
      ["Height", "8 cm / 12 cm / 15 cm"],
      ["Volume", "12 – 30 Litres"],
      ["EC Options", "Low EC / Standard EC (as required)"],
      ["pH Range", "5.5 – 6.8"],
      ["Composition", "Washed Cocopeat (100%)"],
      ["Compression Ratio", "5:1"],
      ["Moisture Content", "Less than 18%"],
      ["Drying Method", "Sun Drying"]
    ]
  },
  chips: {
    name: "Coco Husk Chips",
    code: "AC-06",
    tag: "Husk Chips",
    desc: "Superior quality coco husk chips processed from fresh coconut husks. Widely used in orchid cultivation, hydroponics, landscaping, reptile bedding, and horticulture applications.",
    images: [
      "assets/images/Products/cocochips.jpeg",
      "assets/images/Products/cocoHuskChips.jpeg",
      "assets/images/Products/cocoHuskChips2.jpeg"
    ],
    pills: ['Excellent Aeration', 'High Moisture Retention', 'Long-Lasting', '100% Natural', 'Orchid Ideal'],
    specs: [
      ["Chip Size", "1 – 3 cm"],
      ["Moisture Content", "15% – 18%"],
      ["EC Value", "Below 0.5 mS/cm"],
      ["Packing Mode", "5 kg Blocks / 25 kg Loose Bags"],
      ["Material", "100% Natural Coconut Husk"]
    ]
  },
  coins: {
    name: "Coco Coins & Discs",
    code: "AC-07",
    tag: "Coco Coins",
    desc: "Premium compressed coco peat coins and discs designed for seed germination and nursery propagation. Expand quickly when water is added and provide an excellent growing environment for young plants.",
    images: [
      "assets/images/Products/cocoPeatCoin2.jpeg",
      "assets/images/Products/cocoPeatCoin.jpeg",
      "assets/images/Products/cocoPeatCoin3.jpeg"
    ],
    pills: ['Fast Water Absorption', 'Seed Germination', 'Lightweight', 'Eco-Friendly', 'Custom Sizes'],
    specs: [
      ["Diameter Range", "30 – 100 mm"],
      ["Thickness", "8 – 20 mm"],
      ["pH Value", "5.8 – 6.8"],
      ["EC Value", "Below 0.5 mS/cm"],
      ["Material", "100% Natural Coco Peat"]
    ]
  },
  coconut: {
    name: "Fresh Coconuts & Saplings",
    code: "AC-08 to AC-11",
    tag: "Fresh Coconuts",
    desc: "Export quality semi husked, fully husked, and tender fresh coconuts sourced from selected farms in South Indian, along with healthy nursery-grown coconut seedlings suitable for commercial plantations and developments.",
    images: [
      "assets/images/Products/TenderCoconut.jpeg",
      "assets/images/Products/TenderCoconut2.jpeg",
      "assets/images/Products/fullyHuskedCoconut.jpeg",
      "assets/images/Products/NurserySeedlings.jpeg",
      "assets/images/Products/ageofSeedlings.jpeg",
      "assets/images/Products/tallCoconut.jpeg"
    ],
    pills: ['Disease-Free', 'High Oil Yield', 'Naturally Sweet', 'Hygienically Harvested', 'Bulk Export'],
    specs: [
      ["Semi Husked Weight", "450 – 650 g"],
      ["Fully Husked Weight", "500 – 700 g"],
      ["Tender Coconut Weight", "800 g – 1.5 kg"],
      ["Saplings Height", "2 – 4 ft healthy"],
      ["Planting Variety", "Tall / Hybrid / Dwarf"],
      ["Shelf Life", "45 – 60 Days"],
      ["PP Bag Packing", "PP Bags / Mesh / Gunny Bags"]
    ]
  }
};

// Swap images function for thumbnails inside tab panes
window.swapProductImage = function (thumb) {
  const parent = thumb.closest('.product-gallery-wrap');
  const mainImg = parent.querySelector('.main-gallery-img');
  mainImg.src = thumb.src;
  parent.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
};

// Swap images function for thumbnails inside modal window
window.swapModalProductImage = function (thumb) {
  const modalBody = thumb.closest('.modal-body-premium');
  const mainImg = modalBody.querySelector('#modalProductMainImg');
  if (mainImg) {
    mainImg.src = thumb.src;
  }
  modalBody.querySelectorAll('.modal-gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
};

$(document).ready(function () {
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  /* ---------- HERO: progress-bar + slide-counter sync & auto-cycle ---------- */
  var heroEl = document.getElementById('heroCarousel');
  if (heroEl) {
    var heroIntervalMs = 6000;
    var $segs = $('#heroProgressTrack .hero-progress-seg');

    // Explicitly initialize Bootstrap 5 Carousel with auto-cycling enabled
    var heroCarouselInstance = new bootstrap.Carousel(heroEl, {
      interval: heroIntervalMs,
      ride: 'carousel',
      pause: false,
      wrap: true
    });
    heroCarouselInstance.cycle();

    function runHeroProgress(activeIndex) {
      $segs.removeClass('filling done').each(function (i) {
        var $fill = $(this).find('.fill');
        $fill.css('transition', 'none').css('width', i < activeIndex ? '100%' : '0%');
        if (i < activeIndex) { $(this).addClass('done'); }
      });
      // force reflow then animate current segment
      void $segs.eq(activeIndex)[0].offsetWidth;
      var $cur = $segs.eq(activeIndex).addClass('filling');
      $cur.find('.fill').css('transition', 'width ' + heroIntervalMs + 'ms linear').css('width', '100%');
      $('#heroCurSlide').text(String(activeIndex + 1).padStart(2, '0'));
    }

    // init first slide
    runHeroProgress(0);

    heroEl.addEventListener('slide.bs.carousel', function (e) {
      runHeroProgress(e.to);
    });

    // clicking a segment jumps to that slide
    $segs.on('click', function () {
      var idx = $(this).index();
      heroCarouselInstance.to(idx);
      heroCarouselInstance.cycle();
    });
  }

  // Commitment Interactive Hub Dial Controls
  $('.dial-btn').on('click mouseenter', function () {
    const target = $(this).data('target');
    $('.dial-btn').removeClass('active');
    $(this).addClass('active');

    $('.commitment-panel').removeClass('active');
    $('#panel-' + target).addClass('active');

    // Keep mobile select menu synchronized
    $('.mobile-commitment-select').val(target);
  });

  // Mobile Select Dropdown Control
  $('.mobile-commitment-select').on('change', function () {
    const target = $(this).val();

    $('.commitment-panel').removeClass('active');
    $('#panel-' + target).addClass('active');

    // Keep desktop dials synchronized
    $('.dial-btn').removeClass('active');
    $(`.dial-btn[data-target="${target}"]`).addClass('active');
  });

  // Product Tabs
  $('.ptab-btn').on('click', function () {
    var tab = $(this).data('tab');
    $('.ptab-btn').removeClass('active');
    $(this).addClass('active');
    $('.product-tab-pane').removeClass('active');
    $('#tab-' + tab).addClass('active');
  });

  // Quick View Modal Population & Triggers
  $('.view-details-btn').on('click', function () {
    const prodKey = $(this).data('product');
    const data = productDetailsData[prodKey];
    if (!data) return;

    $('#productModalTitle').text(data.name + ' - Technical Overview');
    $('#productModalName').text(data.name);
    $('#productModalCode').text(data.code);
    $('#productModalTag').text(data.tag);
    $('#productModalDesc').text(data.desc);

    // Populate Main Image on Load
    $('#modalProductMainImg').attr('src', data.images[0]);

    // Populate Gallery Thumbnails inside Modal
    let thumbsHtml = '';
    data.images.forEach((img, idx) => {
      thumbsHtml += `
        <img src="${img}" alt="${data.name}" class="modal-gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="swapModalProductImage(this)" loading="lazy">
      `;
    });
    $('#modalProductThumbList').html(thumbsHtml);

    // Populate Feature Pills
    let pillsHtml = '';
    data.pills.forEach(pill => {
      pillsHtml += `
        <span class="modal-pill-item"><i class="bi bi-patch-check-fill"></i> ${pill}</span>
      `;
    });
    $('#productModalPillsList').html(pillsHtml);

    // Populate Key-Value Specifications List
    let specsHtml = '';
    data.specs.forEach(spec => {
      specsHtml += `
        <div class="modal-spec-row">
          <span class="modal-spec-label">${spec[0]}</span>
          <span class="modal-spec-value">${spec[1]}</span>
        </div>
      `;
    });
    $('#productModalSpecsList').html(specsHtml);

    // Set Inquire button attribute
    $('#modalInquireBtn').attr('data-product-name', data.name);

    // Show Modal
    const modal = new bootstrap.Modal(document.getElementById('productQuickViewModal'));
    modal.show();
  });

  // Handle Inquire Button in Modal
  $('#modalInquireBtn').on('click', function () {
    const productName = $(this).attr('data-product-name');

    // Hide Modal
    const modalEl = document.getElementById('productQuickViewModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) {
      modal.hide();
    }

    // Fill Form Message field
    const messageInput = $('textarea[name="message"]');
    if (messageInput.length > 0) {
      messageInput.val("Hello Anuradha Coirs, I would like to inquire about pricing, specifications, and shipping details for: " + productName + ". Thank you.");
    }

    // Smooth Scroll to Contact
    $('html, body').animate({
      scrollTop: $('#contact').offset().top - 80
    }, 800);
  });

  // Gallery Filter Isotope
  var $grid = $('.gallery-grid').isotope({ itemSelector: '.item', layoutMode: 'fitRows' });
  $('.gf-btn').on('click', function () {
    $('.gf-btn').removeClass('active');
    $(this).addClass('active');
    $grid.isotope({ filter: $(this).data('filter') });
  });

  // Magnific Popup
  $('.popup-btn').magnificPopup({
    type: 'image',
    gallery: { enabled: true },
    mainClass: 'mfp-fade'
  });

  // Show/hide back-to-top button
  var $scrollBtn = $('#scrollToTop');
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 400) {
      $scrollBtn.addClass('show');
    } else {
      $scrollBtn.removeClass('show');
    }
  });

  // Global Map Tooltip hover handlers
  $('.map-pin').on('mouseenter', function () {
    const name = $(this).data('name');
    const loc = $(this).data('location');
    const posLeft = $(this).css('left');
    const posTop = $(this).css('top');

    $('#mapTooltip .mt-name').text(name);
    $('#mapTooltip .mt-location').text(loc);
    $('#mapTooltip').css({
      left: posLeft,
      top: posTop,
      display: 'block'
    });
  }).on('mouseleave', function () {
    $('#mapTooltip').hide();
  });

  // ==========================================
  // FAQ INTERACTIVE ACCORDION & FILTER LOGIC
  // ==========================================
  $('.faq-card-header').on('click', function () {
    const $card = $(this).closest('.faq-card');
    const isActive = $card.hasClass('active');

    // Close all other open FAQ cards
    $('.faq-card').not($card).removeClass('active');

    if (isActive) {
      $card.removeClass('active');
    } else {
      $card.addClass('active');
    }
  });

  // FAQ Category Filter Pills
  $('.faq-filter-btn').on('click', function () {
    $('.faq-filter-btn').removeClass('active');
    $(this).addClass('active');

    const filterCat = $(this).data('category');
    const searchQuery = $('#faqSearchInput').val() ? $('#faqSearchInput').val().toLowerCase().trim() : '';

    filterFaqItems(filterCat, searchQuery);
  });

  // FAQ Search Input
  $('#faqSearchInput').on('keyup input', function () {
    const query = $(this).val().toLowerCase().trim();
    const activeCat = $('.faq-filter-btn.active').data('category') || 'all';

    if (query.length > 0) {
      $('#faqSearchClear').fadeIn(150);
    } else {
      $('#faqSearchClear').fadeOut(150);
    }

    filterFaqItems(activeCat, query);
  });

  $('#faqSearchClear').on('click', function () {
    $('#faqSearchInput').val('').trigger('input').focus();
  });

  function filterFaqItems(category, query) {
    let visibleCount = 0;

    $('.faq-card').each(function () {
      const itemCat = $(this).data('category');
      const questionText = $(this).find('.faq-question-text').text().toLowerCase();
      const answerText = $(this).find('.faq-answer-content').text().toLowerCase();

      const matchesCat = (category === 'all' || itemCat === category);
      const matchesSearch = (!query || questionText.includes(query) || answerText.includes(query));

      if (matchesCat && matchesSearch) {
        $(this).closest('.faq-card').stop(true, true).fadeIn(250);
        visibleCount++;
      } else {
        $(this).closest('.faq-card').stop(true, true).fadeOut(150);
      }
    });

    if (visibleCount === 0) {
      $('#noFaqResults').stop(true, true).fadeIn(200);
    } else {
      $('#noFaqResults').hide();
    }
  }

  // ==========================================
  // HOME CONTACT FORM SUBMISSION HANDLER
  // ==========================================
  const homeContactForm = document.getElementById('homeContactForm');
  if (homeContactForm) {
    const statusEl = document.getElementById('homeFormStatusMsg');
    const submitBtn = document.getElementById('homeContactSubmitBtn');

    homeContactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const firstName = document.getElementById('hcf-firstName')?.value.trim() || '';
      const lastName = document.getElementById('hcf-lastName')?.value.trim() || '';
      const fullName = (firstName + ' ' + lastName).trim();
      const email = document.getElementById('hcf-email')?.value.trim() || '';
      const phone = document.getElementById('hcf-phone')?.value.trim() || '';
      const subject = document.getElementById('hcf-subject')?.value.trim() || 'New Website Inquiry - Anuradha Coirs';
      const message = document.getElementById('hcf-message')?.value.trim() || '';

      // Validate required fields
      if (!firstName) {
        showStatus('Please enter your first name.', 'error');
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }
      if (!phone) {
        showStatus('Please enter your contact phone number.', 'error');
        return;
      }
      if (!message) {
        showStatus('Please enter your message or inquiry requirements.', 'error');
        return;
      }

      // UI Loading state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Message...`;
      hideStatus();

      const payload = {
        name: fullName,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        _subject: `New Inquiry from ${fullName} - Anuradha Coirs Website`,
        _template: 'table',
        _captcha: 'false'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/info@anuradhacoirs.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
          showStatus(`
            <div style="display:flex; align-items:flex-start; gap:10px;">
              <i class="bi bi-check-circle-fill" style="font-size:1.4rem; color:#2e7d32; flex-shrink:0;"></i>
              <div>
                <strong style="font-size:0.95rem; color:#1b5e20; display:block; margin-bottom:3px;">Thank You, ${firstName}! Message Sent Successfully.</strong>
                <span style="font-size:0.85rem; color:#2e7d32; line-height:1.4; display:block;">
                  Your inquiry has been sent to <strong>info@anuradhacoirs.com</strong>. Our team will review your requirements and respond within 24 hours.
                </span>
              </div>
            </div>
          `, 'success');
          homeContactForm.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('Direct submission error, triggering fallback:', err);
        const mailtoUrl = `mailto:info@anuradhacoirs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`
        )}`;
        const waUrl = `https://api.whatsapp.com/send?phone=919944859177&text=${encodeURIComponent(
          `Hello Anuradha Coirs,\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`
        )}`;

        showStatus(`
          <div style="font-size:0.88rem; color:#333;">
            <div style="color:#b71c1c; font-weight:600; margin-bottom:6px;">
              <i class="bi bi-info-circle-fill me-1"></i> Form submitted. Please click below to send via your preferred app:
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:6px;">
              <a href="${mailtoUrl}" class="btn btn-sm btn-outline-danger" style="font-size:0.82rem; font-weight:600; text-decoration:none;"><i class="bi bi-envelope-fill me-1"></i> Send via Email App</a>
              <a href="${waUrl}" target="_blank" class="btn btn-sm btn-outline-success" style="font-size:0.82rem; font-weight:600; text-decoration:none;"><i class="bi bi-whatsapp me-1"></i> Send via WhatsApp</a>
            </div>
          </div>
        `, 'warning');

        // Trigger mailto client
        window.location.href = mailtoUrl;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });

    function showStatus(html, type) {
      if (!statusEl) return;
      statusEl.style.display = 'block';
      statusEl.style.padding = '12px 14px';
      statusEl.style.borderRadius = '8px';
      statusEl.style.marginTop = '12px';
      statusEl.style.marginBottom = '12px';

      if (type === 'success') {
        statusEl.style.background = '#e8f5e9';
        statusEl.style.border = '1px solid #a5d6a7';
        statusEl.style.color = '#1b5e20';
      } else if (type === 'error') {
        statusEl.style.background = '#ffebee';
        statusEl.style.border = '1px solid #ffcdd2';
        statusEl.style.color = '#c62828';
        statusEl.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-1"></i> ${html}`;
        return;
      } else {
        statusEl.style.background = '#fff8e1';
        statusEl.style.border = '1px solid #ffe082';
        statusEl.style.color = '#e65100';
      }
      statusEl.innerHTML = html;
    }

    function hideStatus() {
      if (!statusEl) return;
      statusEl.style.display = 'none';
      statusEl.innerHTML = '';
    }
  }
});

