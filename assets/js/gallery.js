const galleryData = [
  // 1. Manufacture (from Process Folder)
  { folder: 'Process', filename: 'huskCollection.jpeg', category: 'process', badge: 'Manufacture', label: 'Husk Collection' },
  { folder: 'Process', filename: 'huskSeparation.jpeg', category: 'process', badge: 'Manufacture', label: 'Husk Separation' },
  { folder: 'Process', filename: 'fibreExtraction.jpeg', category: 'process', badge: 'Manufacture', label: 'Fibre Extraction' },
  { folder: 'Process', filename: 'drying.jpeg', category: 'process', badge: 'Manufacture', label: 'Coir Drying' },
  { folder: 'Process', filename: 'washing.jpeg', category: 'process', badge: 'Manufacture', label: 'Coco Peat Washing' },
  { folder: 'Process', filename: 'blockMaking.jpeg', category: 'process', badge: 'Manufacture', label: 'Block Pressing' },
  { folder: 'Process', filename: 'blockMaking2.jpeg', category: 'process', badge: 'Manufacture', label: 'Block Pressing' },
  { folder: 'Process', filename: 'loading.jpeg', category: 'process', badge: 'Manufacture', label: 'Container Loading' },

  // 2. Manufacture (from Products Folder - machinery / facility / staff)
  { folder: 'Products', filename: 'block_pressing_machine.jpeg', category: 'process', badge: 'Manufacture', label: 'Block Pressing Machine' },

  // 3. Brand Visuals (from head Folder)
  { folder: 'head', filename: 'HomePageimages.jpeg', category: 'banners', badge: 'Brand Visuals', label: 'Anuradha Coirs' },
  { folder: 'head', filename: 'Contact-head.jpeg', category: 'banners', badge: 'Brand Visuals', label: 'Reach Out To Us' },

  // 4. Products (from Products Folder)
  { folder: 'Products', filename: 'TenderCoconut.jpeg', category: 'products', badge: 'Products', label: 'Tender Coconut' },
  { folder: 'Products', filename: 'bricks.jpeg', category: 'products', badge: 'Products', label: 'Coco Peat Bricks' },
  { folder: 'Products', filename: 'cocoHuskChips2.jpeg', category: 'products', badge: 'Products', label: 'Coco Husk Chips' },
  { folder: 'Products', filename: 'cocoPeatCoin.jpeg', category: 'products', badge: 'Products', label: 'Coco Peat Coins' },
  { folder: 'Products', filename: 'cocochips.jpeg', category: 'products', badge: 'Products', label: 'Coco Chips' },
  { folder: 'Products', filename: 'cocopeat_block.jpeg', category: 'products', badge: 'Products', label: 'Coco Peat Block' },
  { folder: 'Products', filename: 'GB.jpeg', category: 'products', badge: 'Products', label: 'Cocopeat Grow Bag Slab' },
  { folder: 'Products', filename: 'coirGrowBag.jpeg', category: 'products', badge: 'Products', label: 'Cocopeat Grow Bag Slab' },
  { folder: 'Products', filename: 'coirfiberNew2.jpeg', category: 'products', badge: 'Products', label: 'Premium Coir Fibre' },
  { folder: 'Products', filename: 'fibreExport.jpeg', category: 'products', badge: 'Products', label: 'Coir Fibre Export Bales' },
  { folder: 'Products', filename: 'fullyHuskedCoconut.jpeg', category: 'products', badge: 'Products', label: 'Fully Husked Coconut' },
  { folder: 'Products', filename: 'raw_coconut_husks.jpeg', category: 'products', badge: 'Products', label: 'Raw Coconut Husks' },
  { folder: 'Products', filename: 'openTopGrowBag2.jpeg', category: 'products', badge: 'Products', label: 'Cocopeat Open Top Grow Bag' }
];

// Helper to generate a clean title from filename
function formatLabel(filename) {
  let name = filename.substring(0, filename.lastIndexOf('.'));
  name = name.replace(/[-_]/g, ' ');
  name = name.replace(/(\d+)/g, ' $1');
  name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  name = name.replace(/\s+/g, ' ').trim();
  return name.split(' ').map(word => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

$(document).ready(function () {
  /* Footer year */
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  /* ══════════════ COVERFLOW SHOWCASE ══════════════ */
  // Curated highlight reel — one strong image per storyline
  const featuredFiles = [
    'coirfiberNew2.jpeg', 'bricks.jpeg', 'cocopeat_block.jpeg', 'raw_coconut_husks.jpeg',
    'openTopGrowBag2.jpeg', 'fibreExtraction.jpeg', 'coirGrowBag.jpeg', 'cocoHuskChips2.jpeg', 'blockMaking2.jpeg'
  ];
  const featured = featuredFiles
    .map(fn => galleryData.find(g => g.filename === fn))
    .filter(Boolean);

  const $track = $('#coverflowTrack');
  const $label = $('#cfLabel');
  const $badge = $('#cfBadge');
  const $dots = $('#cfDots');
  const n = featured.length;
  let current = 0;
  let autoplayTimer = null;

  // Build DOM once
  featured.forEach((item, i) => {
    const path = `assets/images/${item.folder}/${item.filename}`;
    const label = item.label || formatLabel(item.filename);
    const $el = $(`
          <div class="cf-item" data-index="${i}">
            <div class="cf-string"></div>
            <div class="cf-peg"></div>
            <div class="cf-card">
              <img src="${path}" alt="${label}" loading="lazy">
              <span class="cf-tag">${label}</span>
            </div>
          </div>
        `);
    $el.on('click', function () {
      const idx = parseInt($(this).data('index'), 10);
      if (idx !== current) { current = idx; renderCoverflow(true); }
    });
    $track.append($el);

    const $dot = $(`<span class="cf-dot" data-index="${i}"></span>`);
    $dot.on('click', function () {
      current = parseInt($(this).data('index'), 10);
      renderCoverflow(true);
    });
    $dots.append($dot);
  });

  const $items = $track.find('.cf-item');
  const $dotEls = $dots.find('.cf-dot');

  function shortestOffset(i, cur) {
    let raw = i - cur;
    if (raw > n / 2) raw -= n;
    if (raw < -n / 2) raw += n;
    return raw;
  }

  function renderCoverflow() {
    $items.each(function () {
      const i = parseInt($(this).data('index'), 10);
      const offset = shortestOffset(i, current);
      const abs = Math.abs(offset);
      const $el = $(this);

      if (abs > 3) {
        $el.css({ opacity: 0, pointerEvents: 'none' });
        return;
      }

      const x = offset * 150;
      const rotate = offset * -32;
      const scale = 1 - abs * 0.16;
      const z = -abs * 140;
      const opacity = 1 - abs * 0.28;

      $el.css({
        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`,
        zIndex: 10 - abs,
        opacity: Math.max(opacity, 0),
        pointerEvents: 'auto'
      });
      $el.toggleClass('is-center', offset === 0);
    });

    const cur = featured[current];
    $label.text(cur.label || formatLabel(cur.filename));
    $badge.text(cur.badge);

    $dotEls.each(function () {
      const i = parseInt($(this).data('index'), 10);
      $(this).toggleClass('is-active', i === current);
    });
  }

  function next() { current = (current + 1) % n; renderCoverflow(); }
  function prev() { current = (current - 1 + n) % n; renderCoverflow(); }

  $('.cf-next').on('click', function () { next(); restartAutoplay(); });
  $('.cf-prev').on('click', function () { prev(); restartAutoplay(); });

  function startAutoplay() {
    autoplayTimer = setInterval(next, 4200);
  }
  function restartAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  const $wrap = $('#coverflowWrap');
  $wrap.on('mouseenter', () => clearInterval(autoplayTimer));
  $wrap.on('mouseleave', startAutoplay);

  // Touch swipe support
  let touchStartX = 0;
  $wrap.on('touchstart', function (e) { touchStartX = e.originalEvent.touches[0].clientX; });
  $wrap.on('touchend', function (e) {
    const dx = e.originalEvent.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
      restartAutoplay();
    }
  });

  renderCoverflow();
  startAutoplay();

  /* ══════════════ FILTERABLE "SWATCH BOARD" GRID ══════════════ */
  const $galGrid = $('#galGrid');

  const introText = {
    '*': 'Every photo below, sorted like fibre on a sample board.',
    '.products': 'Finished coir & coconut goods — grow bags, cocopeat blocks, fibre and more, ready for export.',
    '.process': 'Behind the scenes: husk collection, extraction, drying and quality checks at our facility.',
    '.banners': 'Brand imagery used across our website and marketing materials.'
  };

  // Track a running index per-category so the first item of each
  // category can be presented as a larger "featured" swatch.
  const catSeen = {};
  galleryData.forEach((item, idx) => {
    const path = `assets/images/${item.folder}/${item.filename}`;
    const label = item.label || formatLabel(item.filename);
    const delay = (idx % 16) * 0.045;

    const seen = catSeen[item.category] || 0;
    catSeen[item.category] = seen + 1;

    let sizeClass = '';
    if (seen === 0) {
      sizeClass = 'gal-item-lg gal-item-tall';           // featured card per category
    } else if (seen % 5 === 1) {
      sizeClass = 'gal-item-tall';
    } else if (seen % 5 === 3) {
      sizeClass = 'gal-item-short';
    }

    const itemHtml = `
          <div class="gal-item ${item.category} ${sizeClass}">
            <div class="gal-inner popup-wrap" style="animation-delay: ${delay}s;">
              <a href="${path}" class="gal-thumb popup-btn">
                <img src="${path}" alt="${label}" loading="lazy">
                <div class="gal-overlay"><i class="bi bi-zoom-in ov-icon"></i></div>
              </a>
              <div class="gal-caption">
                <span class="gal-cat-dot"></span>
                <span class="gal-label">${label}</span>
              </div>
            </div>
          </div>
        `;
    $galGrid.append(itemHtml);
  });

  var $grid = $galGrid.isotope({
    itemSelector: '.gal-item',
    layoutMode: 'masonry',
    percentPosition: true,
    masonry: { columnWidth: '.grid-sizer' }
  });

  $grid.imagesLoaded().progress(function () {
    $grid.isotope('layout');
  });

  /* Counts per category, shown on the filter chips + stat */
  const catCounts = { products: 0, process: 0, banners: 0 };
  galleryData.forEach(i => catCounts[i.category]++);
  $('#count-all').text(galleryData.length);
  $('#count-products').text(catCounts.products);
  $('#count-process').text(catCounts.process);
  $('#count-banners').text(catCounts.banners);
  $('#visible-count').text(galleryData.length);

  $('.gf-btn').on('click', function () {
    $('.gf-btn').removeClass('is-active');
    $(this).addClass('is-active');

    var filter = $(this).data('filter');
    $grid.isotope({ filter: filter });

    var count = (filter === '*')
      ? $('.gal-item').length
      : $(filter + '.gal-item').length;
    $('#visible-count').text(count);

    $('#galleryIntro').css('opacity', 0);
    setTimeout(function () {
      $('#galleryIntro').text(introText[filter] || introText['*']).css('opacity', 1);
    }, 150);
  });

  $galGrid.magnificPopup({
    delegate: '.popup-btn',
    type: 'image',
    gallery: { enabled: true, navigateByImgClick: true },
    mainClass: 'mfp-fade',
    removalDelay: 160
  });
});

/* Google Translate bridge */
document.getElementById('translate-select') && document.getElementById('translate-select').addEventListener('change', function () {
  var combo = document.querySelector('.goog-te-combo');
  if (combo) { combo.value = this.value; combo.dispatchEvent(new Event('change')); }
});
