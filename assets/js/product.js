/* ══════════════════════════════════════
           UTILITY
        ══════════════════════════════════════ */
        function cm(c) { return CAT_META[c] || { icon: 'bi-box-fill', color: '#8c6d35', bg: '#fdf6ec', desc: '' }; }
        function getProds() { return SEED.slice(); }
        function slug(s) { return String(s).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); }
        function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

        /* ══════════════════════════════════════
           TOAST SYSTEM
        ══════════════════════════════════════ */
        function showToast(msg, type = 'info', icon = 'bi-check-circle-fill') {
            const stack = document.getElementById('toastStack');
            const el = document.createElement('div');
            el.className = `toast-item ${type}`;
            el.innerHTML = `<i class="bi ${icon}"></i> ${msg}`;
            stack.appendChild(el);
            setTimeout(() => {
                el.classList.add('removing');
                setTimeout(() => el.remove(), 350);
            }, 3000);
        }

        /* ══════════════════════════════════════
           WISHLIST
        ══════════════════════════════════════ */
        let wishlist = JSON.parse(localStorage.getItem('ac_wishlist') || '[]');
        function toggleWish(id, btn) {
            const idx = wishlist.indexOf(id);
            if (idx === -1) {
                wishlist.push(id);
                btn.classList.add('active');
                showToast('Added to wishlist', 'success', 'bi-heart-fill');
            } else {
                wishlist.splice(idx, 1);
                btn.classList.remove('active');
                showToast('Removed from wishlist', 'info', 'bi-heart');
            }
            localStorage.setItem('ac_wishlist', JSON.stringify(wishlist));
        }

        /* ══════════════════════════════════════
           RECENTLY VIEWED
        ══════════════════════════════════════ */
        let recentlyViewed = JSON.parse(localStorage.getItem('ac_recently') || '[]');
        function addRecently(id) {
            recentlyViewed = recentlyViewed.filter(x => x !== id);
            recentlyViewed.unshift(id);
            if (recentlyViewed.length > 8) recentlyViewed = recentlyViewed.slice(0, 8);
            localStorage.setItem('ac_recently', JSON.stringify(recentlyViewed));
            renderRecently();
        }
        function renderRecently() {
            const sec = document.getElementById('recentlySection');
            const prods = recentlyViewed.map(id => SEED.find(p => p.id === id)).filter(Boolean);
            if (prods.length < 2) { sec.style.display = 'none'; return; }
            sec.style.display = 'block';
            sec.innerHTML = `<div class="recently-section">
    <div class="recently-title"><i class="bi bi-clock-history me-2" style="color:var(--gold)"></i>Recently Viewed</div>
    <div class="recently-grid">${prods.map(p => {
                const img = (p.images && p.images.length) ? p.images[0] : (p.image || 'assets/images/Products/coirfiberNew.jpeg');
                return `
      <div class="recently-item" onclick="openDetail('${esc(p.id)}')">
        <img src="${esc(img)}" alt="${esc(p.name)}" onerror="this.src='assets/images/Products/coirfiberNew.jpeg'" loading="lazy">
        <div class="recently-item-name">${esc(p.name)}</div>
      </div>`;
            }).join('')}
    </div>
  </div>`;
        }

        /* ══════════════════════════════════════
           CART STATE
        ══════════════════════════════════════ */
        let cart = JSON.parse(localStorage.getItem('ac_cart') || '[]'); // [{id, unit, amount}]

        window.addEventListener('storage', function (e) {
            if (e.key === 'ac_cart') {
                cart = JSON.parse(e.newValue || '[]');
                updateCartBadge();
                if (document.getElementById('cartDrawer') && document.getElementById('cartDrawer').classList.contains('open')) {
                    renderCartItems();
                }
            }
        });

        window.addEventListener('pageshow', function () {
            cart = JSON.parse(localStorage.getItem('ac_cart') || '[]');
            updateCartBadge();
        });

        function saveCart() {
            localStorage.setItem('ac_cart', JSON.stringify(cart));
        }

        function cartCount() { return cart.length; }
        function cartItemCount() { return cart.length; }

        function updateCartBadge() {
            const cnt = cartCount();

            const navBadge = document.getElementById('navCartBadge');
            if (navBadge) navBadge.textContent = cnt;

            const headCount = document.getElementById('cartHeadCount');
            if (headCount) headCount.textContent = cnt;

            const scbCount = document.getElementById('scbCount');
            if (scbCount) scbCount.textContent = cnt;

            // Sticky bar
            const bar = document.getElementById('stickyCartBar');
            if (bar && window.innerWidth <= 767) {
                bar.style.display = cnt > 0 ? 'flex' : 'none';
            }
        }

        let currentQQProduct = null;
        let currentQQGrade = 'low_ec';

        function addToCart(id, amount = 100) {
            const p = SEED.find(x => x.id === id);
            if (!p) return;

            // If product has quality options (Low EC & High EC)
            if (p.qualities) {
                // If user currently has an active EC filter on product.html
                if (typeof activeECFilter !== 'undefined' && activeECFilter === 'low_ec') {
                    addToCartWithGrade(id, 'Low EC (< 0.5 mS/cm)', amount);
                    return;
                } else if (typeof activeECFilter !== 'undefined' && activeECFilter === 'high_ec') {
                    addToCartWithGrade(id, 'High EC (2.5 – 3.5 mS/cm)', amount);
                    return;
                }
                // Otherwise open Quick Quality Selection Modal
                openQuickQualityModal(id);
                return;
            }

            addToCartWithGrade(id, '', amount);
        }

        function addToCartWithGrade(id, gradeTag = '', amount = 100, unit = 'Pieces') {
            cart = JSON.parse(localStorage.getItem('ac_cart') || '[]');
            const existing = cart.find(i => i.id === id && i.grade === gradeTag);
            if (existing) {
                existing.amount += amount;
                existing.unit = unit;
                showToast('Quantity updated in cart', 'success', 'bi-cart-check-fill');
            } else {
                cart.push({ id, unit: unit, amount: amount, grade: gradeTag });
                const p = SEED.find(x => x.id === id);
                const name = p ? p.name : '';
                showToast(`Added ${name} ${gradeTag ? '(' + gradeTag + ')' : ''} to cart!`, 'success', 'bi-cart-plus-fill');
            }
            saveCart();
            // Badge pop animation
            const badge = document.getElementById('navCartBadge');
            if (badge) {
                badge.classList.remove('pop');
                void badge.offsetWidth;
                badge.classList.add('pop');
            }
            updateCartBadge();
            renderCartItems();
        }

        function openQuickQualityModal(id) {
            const p = SEED.find(x => x.id === id);
            if (!p) return;
            currentQQProduct = p;
            currentQQGrade = 'low_ec';

            $('#qqModalName').text(p.name);
            $('#qqModalCode').text(`Code: ${p.code} • Category: ${p.category}`);
            const img = (p.images && p.images.length) ? p.images[0] : (p.image || 'assets/images/Products/coirfiberNew.jpeg');
            $('#qqModalImg').attr('src', img);

            selectQQGrade('low_ec');
            $('#qqQtyInput').val(100);
            $('#qqUnitSelect').val('Pieces');

            const modalEl = document.getElementById('quickQualityModal');
            if (modalEl) {
                let modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (!modalInstance) modalInstance = new bootstrap.Modal(modalEl);
                modalInstance.show();
            }
        }

        function selectQQGrade(grade) {
            currentQQGrade = grade;
            if (grade === 'low_ec') {
                $('#qqBtnLow').addClass('active');
                $('#qqBtnHigh').removeClass('active');
                $('#qqCheckLow').attr('class', 'bi bi-check-circle-fill text-success');
                $('#qqCheckHigh').attr('class', 'bi bi-circle text-muted');
            } else {
                $('#qqBtnHigh').addClass('active');
                $('#qqBtnLow').removeClass('active');
                $('#qqCheckHigh').attr('class', 'bi bi-check-circle-fill text-warning');
                $('#qqCheckLow').attr('class', 'bi bi-circle text-muted');
            }
        }

        function confirmQQAddToCart() {
            if (!currentQQProduct) return;
            const gradeTag = currentQQGrade === 'high_ec' ? 'High EC (2.5 – 3.5 mS/cm)' : 'Low EC (< 0.5 mS/cm)';
            const qty = parseInt($('#qqQtyInput').val() || 100);
            const unit = $('#qqUnitSelect').val() || 'Pieces';

            addToCartWithGrade(currentQQProduct.id, gradeTag, qty, unit);

            const modalEl = document.getElementById('quickQualityModal');
            if (modalEl) {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) modalInstance.hide();
            }

            setTimeout(openCart, 400);
        }

        function removeFromCart(id) {
            cart = JSON.parse(localStorage.getItem('ac_cart') || '[]');
            cart = cart.filter(i => i.id !== id);
            saveCart();
            updateCartBadge();
            renderCartItems();
            showToast('Item removed from cart', 'info', 'bi-trash');
        }

        function changeCartUnit(id, unit) {
            cart = JSON.parse(localStorage.getItem('ac_cart') || '[]');
            const item = cart.find(i => i.id === id);
            if (!item) return;
            item.unit = unit;

            // Set reasonable default amounts based on selected unit
            if (unit === 'Ton') {
                item.amount = 10;
            } else if (unit === 'Kg') {
                item.amount = 500;
            } else {
                item.amount = 100;
            }
            saveCart();
            renderCartItems();
            updateCartBadge();
        }

        function updateCartAmount(id, deltaSign) {
            cart = JSON.parse(localStorage.getItem('ac_cart') || '[]');
            const item = cart.find(i => i.id === id);
            if (!item) return;
            let delta = 1;
            if (item.unit === 'Kg') {
                delta = 50;
            } else if (item.unit === 'Pieces') {
                delta = 10;
            }
            item.amount = Math.max(1, item.amount + (deltaSign * delta));
            saveCart();
            renderCartItems();
            updateCartBadge();
        }

        function setCartAmount(id, val) {
            cart = JSON.parse(localStorage.getItem('ac_cart') || '[]');
            const item = cart.find(i => i.id === id);
            if (!item) return;
            const parsed = parseInt(val);
            if (!isNaN(parsed) && parsed > 0) {
                item.amount = parsed;
            }
            saveCart();
            renderCartItems();
            updateCartBadge();
        }

        function renderCartItems() {
            const wrap = document.getElementById('cartItemsWrap');
            const footer = document.getElementById('cartFooter');

            if (cart.length === 0) {
                wrap.innerHTML = `<div class="cart-empty">
      <i class="bi bi-cart-x"></i>
      <h5>Your cart is empty</h5>
      <p>Add products to your enquiry cart and place an order via WhatsApp</p>
    </div>`;
                footer.style.display = 'none';
                return;
            }

            footer.style.display = 'block';
            let html = '';
            cart.forEach(item => {
                const p = SEED.find(x => x.id === item.id);
                if (!p) return;
                const img = (p.images && p.images.length) ? p.images[0] : (p.image || 'assets/images/Products/coirfiberNew.jpeg');
                html += `<div class="cart-item">
      <img src="${esc(img)}" alt="${esc(p.name)}" class="cart-item-img" onerror="this.src='assets/images/Products/coirfiberNew.jpeg'" loading="lazy">
      <div class="cart-item-info">
        <div class="cart-item-cat">${esc(p.category)}</div>
        <div class="cart-item-name">${esc(p.name)}</div>
        <div class="cart-item-code">${esc(p.code)}</div>
        <div class="cart-item-actions" style="display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap;">
          <select class="cart-unit-select" onchange="changeCartUnit('${p.id}', this.value)">
            <option value="Pieces" ${item.unit === 'Pieces' ? 'selected' : ''}>Pieces</option>
            <option value="Kg" ${item.unit === 'Kg' ? 'selected' : ''}>Kg</option>
            <option value="Ton" ${item.unit === 'Ton' ? 'selected' : ''}>Ton</option>
          </select>
          <div class="cart-qty-ctrl" style="display:flex;align-items:center;border:1.5px solid var(--border);border-radius:4px;overflow:hidden;">
            <button onclick="updateCartAmount('${p.id}',-1)" style="width:24px;height:24px;border:none;background:var(--cream2);cursor:pointer;display:flex;align-items:center;justify-content:center;"><i class="bi bi-dash"></i></button>
            <input type="number" value="${item.amount}" onchange="setCartAmount('${p.id}',this.value)" style="width:55px;text-align:center;border:none;outline:none;font-family:var(--fb);font-weight:700;font-size:.85rem;background:#fff;height:24px;padding:0;">
            <button onclick="updateCartAmount('${p.id}',1)" style="width:24px;height:24px;border:none;background:var(--cream2);cursor:pointer;display:flex;align-items:center;justify-content:center;"><i class="bi bi-plus"></i></button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${p.id}')" title="Remove" style="margin-left:auto;background:none;border:none;color:var(--text-muted);cursor:pointer;transition:var(--tr);"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    </div>`;
            });

            wrap.innerHTML = html;

            // Update summary rows
            document.getElementById('cartTotalItems').textContent = cartItemCount();
        }

        function openCart() {
            cart = JSON.parse(localStorage.getItem('ac_cart') || '[]');
            renderCartItems();
            document.getElementById('cartDrawer').classList.add('open');
            document.getElementById('cartOverlay').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeCart() {
            document.getElementById('cartDrawer').classList.remove('open');
            document.getElementById('cartOverlay').classList.remove('open');
            document.body.style.overflow = '';
        }

        document.getElementById('cartClose').addEventListener('click', closeCart);
        document.getElementById('cartOverlay').addEventListener('click', closeCart);
        document.getElementById('btnContinueShopping').addEventListener('click', closeCart);

        /* WhatsApp quick send from cart */
        document.getElementById('cartWaCta').addEventListener('click', function () {
            if (cart.length === 0) { showToast('Cart is empty', 'info', 'bi-cart-x'); return; }
            const lines = cart.map(item => {
                const p = SEED.find(x => x.id === item.id);
                return `• ${p.name} (${p.code}) — ${item.amount} ${item.unit}`;
            }).join('%0A');
            const msg = `Hello! I'm interested in the following products from Anuradha Coirs & Fibers:%0A%0A${lines}%0A%0APlease send me pricing and availability.`;
            window.open(`https://api.whatsapp.com/send?phone=919944859177&text=${msg}`, '_blank');
        });

        /* Place Order button */
        document.getElementById('btnPlaceOrder').addEventListener('click', function () {
            if (cart.length === 0) { showToast('Cart is empty', 'info', 'bi-cart-x'); return; }
            closeCart();
            openOrderModal();
        });

        /* ══════════════════════════════════════
           ORDER MODAL
        ══════════════════════════════════════ */
        function openOrderModal() {
            // Restore default view (form and footer)
            const formView = document.getElementById('orderModalFormView');
            const successView = document.getElementById('orderModalSuccessView');
            const modalFooter = document.querySelector('.order-modal .modal-footer');
            if (formView) formView.style.display = '';
            if (successView) successView.style.display = 'none';
            if (modalFooter) modalFooter.style.display = '';

            renderOrderSummary();
            new bootstrap.Modal(document.getElementById('orderModal')).show();
        }

        function renderOrderSummary() {
            const itemsEl = document.getElementById('osSummaryItems');
            const totalsEl = document.getElementById('osTotals');

            let itemsHtml = '';
            cart.forEach(item => {
                const p = SEED.find(x => x.id === item.id);
                if (!p) return;
                const img = (p.images && p.images.length) ? p.images[0] : (p.image || 'assets/images/Products/coirfiberNew.jpeg');
                itemsHtml += `<div class="os-item">
      <img src="${esc(img)}" alt="${esc(p.name)}" class="os-item-img" onerror="this.src='assets/images/Products/coirfiberNew.jpeg'" loading="lazy">
      <div class="os-item-info">
        <div class="os-item-name">${esc(p.name)}</div>
        <div class="os-item-qty">Code: ${esc(p.code)} &nbsp;|&nbsp; ${item.amount} ${item.unit}</div>
      </div>
    </div>`;
            });

            totalsEl.innerHTML = `
    <div class="os-total-row"><span>Total Products</span><span>${cartItemCount()}</span></div>
    <div class="os-total-row grand"><span>Enquiry Status</span><span style="color:var(--green);font-size:.82rem;">Ready to Send</span></div>
    <p style="font-size:.7rem;color:var(--text-light);margin-top:10px;line-height:1.5;">Pricing will be quoted after we review your requirements. All exports are subject to current availability and shipping terms.</p>
  `;

            itemsEl.innerHTML = itemsHtml;
        }

        function validateOrderForm() {
            const required = ['of-name', 'of-mobile', 'of-whatsapp', 'of-email', 'of-country', 'of-state', 'of-city', 'of-zip', 'of-address'];
            let valid = true;
            required.forEach(id => {
                const el = document.getElementById(id);
                if (!el.value.trim()) {
                    el.style.borderColor = 'var(--red)';
                    el.style.boxShadow = '0 0 0 3px rgba(229,57,53,.1)';
                    valid = false;
                } else {
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                }
            });
            return valid;
        }

        function submitOrder() {
            if (!validateOrderForm()) {
                showToast('Please fill in all required fields', 'info', 'bi-exclamation-circle-fill');
                return;
            }

            const name = document.getElementById('of-name').value.trim();
            const company = document.getElementById('of-company').value.trim();
            const mobile = document.getElementById('of-mobile').value.trim();
            const whatsapp = document.getElementById('of-whatsapp').value.trim();
            const email = document.getElementById('of-email').value.trim();
            const country = document.getElementById('of-country').value.trim();
            const state = document.getElementById('of-state').value.trim();
            const city = document.getElementById('of-city').value.trim();
            const zip = document.getElementById('of-zip').value.trim();
            const address = document.getElementById('of-address').value.trim();
            const notes = document.getElementById('of-notes').value.trim();

            // Build WhatsApp message
            let productLines = '';
            cart.forEach((item, idx) => {
                const p = SEED.find(x => x.id === item.id);
                if (p) productLines += `\n${idx + 1}. ${p.name} (${p.code}) — ${item.amount} ${item.unit}`;
            });

            const msg = `🌿 *NEW PRODUCT ENQUIRY — ANURADHA COIRS & FIBERS*\n\n`
                + `👤 *Customer Details:*\n`
                + `Name: ${name}\n`
                + (company ? `Company: ${company}\n` : '')
                + `Mobile: ${mobile}\n`
                + `WhatsApp: ${whatsapp}\n`
                + `Email: ${email}\n\n`
                + `📍 *Shipping Address:*\n`
                + `${address}, ${city}, ${state} ${zip}\n`
                + `Country: ${country}\n\n`
                + `🛒 *Ordered Products:*${productLines}\n\n`
                + `📦 *Total Products:* ${cartItemCount()}\n\n`
                + (notes ? `📝 *Notes:* ${notes}\n\n` : '')
                + `Please confirm availability and share pricing. Thank you!`;

            const encoded = encodeURIComponent(msg);
            const waURL = `https://api.whatsapp.com/send?phone=919944859177&text=${encoded}`;

            // Show success state inside modal by toggling visibility
            const formView = document.getElementById('orderModalFormView');
            const successView = document.getElementById('orderModalSuccessView');
            const modalFooter = document.querySelector('.order-modal .modal-footer');
            if (formView) formView.style.display = 'none';
            if (modalFooter) modalFooter.style.display = 'none';
            if (successView) {
                successView.style.display = 'block';
                successView.innerHTML = `<div class="order-success">
    <div class="success-icon"><i class="bi bi-check-lg"></i></div>
    <h4>Order Ready to Send!</h4>
    <p>Your enquiry has been prepared. Click below to open WhatsApp and send it directly to our team.</p>
    <a href="${waURL}" target="_blank" class="btn-wa-redirect" onclick="finalizeOrder()">
      <i class="bi bi-whatsapp" style="font-size:1.1rem;"></i>
      Open WhatsApp & Send Order
    </a>
    <p style="margin-top:16px;font-size:.78rem;color:var(--text-light);">
      Our team will respond within 24 hours with pricing and availability.
    </p>
  </div>`;
            }
        }

        function finalizeOrder() {
            cart = [];
            saveCart();
            updateCartBadge();
            renderCartItems();
            showToast('Order sent! Our team will contact you soon.', 'success', 'bi-whatsapp');

            // Hide the modal after redirecting
            const modalEl = document.getElementById('orderModal');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) {
                modalInstance.hide();
            }
        }

        /* ══════════════════════════════════════
           PRODUCT SHARE
        ══════════════════════════════════════ */
        function shareProduct(name, code) {
            const text = `Check out ${name} (${code}) from Anuradha Coirs & Fibers! Premium export-quality coir products.`;
            if (navigator.share) {
                navigator.share({ title: name, text: text, url: window.location.href });
            } else {
                const wa = `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`;
                window.open(wa, '_blank');
            }
        }

        /* ══════════════════════════════════════
           STATE
        ══════════════════════════════════════ */
        let activeCat = null, searchQ = '', viewMode = 'g3', sortMode = 'default';

        /* ══════════════════════════════════════
           CATEGORY DRAWER
        ══════════════════════════════════════ */
        function openDrawer() {
            document.getElementById('catDrawer').classList.add('open');
            document.getElementById('drawerOverlay').classList.add('open');
            document.body.style.overflow = 'hidden';
            buildDrawer(getProds());
        }
        function closeDrawer() {
            document.getElementById('catDrawer').classList.remove('open');
            document.getElementById('drawerOverlay').classList.remove('open');
            document.body.style.overflow = '';
        }
        document.getElementById('openDrawer').addEventListener('click', openDrawer);
        document.getElementById('drawerClose').addEventListener('click', closeDrawer);
        document.getElementById('drawerOverlay').addEventListener('click', function (e) {
            // Only close drawer if it's the cat drawer that's open
            if (document.getElementById('catDrawer').classList.contains('open')) closeDrawer();
        });

        function buildDrawer(prods) {
            const cats = [...new Set(prods.map(p => p.category))];
            let h = `<a class="drawer-all ${activeCat === null ? 'on' : ''}" data-cat="all" href="#">
    <div class="drawer-all-ico"><i class="bi bi-grid-fill"></i></div>
    <span class="drawer-all-lbl">All Products</span>
    <span class="drawer-all-cnt">${prods.length}</span>
  </a>`;
            h += '<span class="drawer-sec-lbl">Categories</span>';
            cats.forEach(cat => {
                const m = cm(cat), n = prods.filter(p => p.category === cat).length;
                h += `<a class="drawer-cat ${activeCat === cat ? 'on' : ''}" data-cat="${esc(cat)}" href="#">
      <div class="drawer-cat-ico" style="background:${m.bg}"><i class="bi ${m.icon}" style="color:${m.color}"></i></div>
      <div class="drawer-cat-info">
        <div class="drawer-cat-name">${esc(cat)}</div>
        <div class="drawer-cat-desc">${esc(m.desc)}</div>
      </div>
      <span class="drawer-cat-cnt">${n}</span>
    </a>`;
            });
            h += `<div class="drawer-cta"><p>Need bulk pricing or custom specifications?</p><a href="contact.html"><i class="bi bi-send-fill me-1"></i>Request Quote</a></div>`;
            document.getElementById('drawerBody').innerHTML = h;
        }

        $(document).on('click', '.drawer-all,.drawer-cat', function (e) {
            e.preventDefault();
            const cat = $(this).data('cat');
            searchQ = ''; activeCat = (cat === 'all') ? null : String(cat);
            closeDrawer(); render();
            setTimeout(() => $('html,body').animate({ scrollTop: $('#shopWrap').offset().top - 80 }, 260), 50);
        });

        $(document).on('input', '.sb-input', function () {
            searchQ = $(this).val().trim(); activeCat = null; render();
        });

        /* ══════════════════════════════════════
           CARD HTML BUILDER
        ══════════════════════════════════════ */
        let activeECFilter = 'all';

        function filterByECGrade(grade, btnEl) {
            activeECFilter = grade;
            $('.qfs-btn').removeClass('active low high');
            if (btnEl) {
                $(btnEl).addClass('active');
                if (grade === 'low_ec') $(btnEl).addClass('low');
                if (grade === 'high_ec') $(btnEl).addClass('high');
            }
            render();
        }

        function cardHTML(p) {
            const isList = viewMode === 'gl';
            const imgs = (p.images && p.images.length) ? p.images : [p.image || 'assets/images/Products/coirfiberNew.jpeg'];
            const img = imgs[0];
            const pills = (p.pills || []).slice(0, isList ? 5 : 3).map(t => `<span class="pc-pill">${esc(t)}</span>`).join('');
            const ornament = `<div class="pc-ornament"><div class="pc-ornament-line"></div><div class="pc-ornament-diamond"></div><div class="pc-ornament-line"></div></div>`;
            const codeBadge = `<span class="pc-code-badge">${esc(p.code)}</span>`;
            const isWishlisted = wishlist.includes(p.id);

            const bm = BADGE_META[p.badge] || (p.isNew ? BADGE_META['new'] : null);
            const badge = bm ? `<span class="pc-badge ${bm.cls}">${bm.lbl}</span>` : '';
            const ecBadge = p.qualities ? `<span class="pc-quality-tag-pill"><i class="bi bi-patch-check-fill text-gold me-1"></i> Low EC &amp; High EC Available</span>` : '';

            const galleryNav = imgs.length > 1 ? `
      <button class="pc-img-nav prev" onclick="event.stopPropagation();cycleCardImg('${esc(p.id)}',-1)"><i class="bi bi-chevron-left"></i></button>
      <button class="pc-img-nav next" onclick="event.stopPropagation();cycleCardImg('${esc(p.id)}',1)"><i class="bi bi-chevron-right"></i></button>
      <span class="pc-gallery-count"><i class="bi bi-images"></i> ${imgs.length}</span>
      <div class="pc-img-dots">${imgs.map((_, i) => `<span class="${i === 0 ? 'on' : ''}"></span>`).join('')}</div>` : '';

            return `<div class="prod-card" data-id="${esc(p.id)}" data-imgidx="0">
    <div class="pc-img-wrap">
      <img src="${esc(img)}" alt="${esc(p.name)}" class="pc-img" loading="lazy" onerror="this.src='assets/images/Products/coirfiberNew.jpeg'">
      <div class="pc-overlay">
        <button class="pc-qv btn-qv" data-id="${esc(p.id)}" onclick="event.stopPropagation();openDetail('${esc(p.id)}')"><i class="bi bi-eye"></i><span class="d-none d-sm-inline ms-1">Quick View</span></button>
        <button class="pc-add-cart" data-id="${esc(p.id)}" onclick="event.stopPropagation();addToCart('${esc(p.id)}',100);setTimeout(openCart,400);"><i class="bi bi-cart-plus"></i><span class="d-none d-sm-inline ms-1">Add to Cart</span></button>
      </div>
      ${galleryNav}
      ${badge}${codeBadge}
      <button class="pc-wish${isWishlisted ? ' active' : ''}" data-id="${esc(p.id)}" onclick="event.stopPropagation();toggleWish('${esc(p.id)}',this)" title="Wishlist">
        <i class="bi bi-heart${isWishlisted ? '-fill' : ''}"></i>
      </button>
    </div>
    <div class="pc-body">
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px;">
        <span class="pc-cat-tag">${esc(p.category)}</span>
        ${ecBadge}
      </div>
      <div class="pc-name">${esc(p.name)}</div>
      ${ornament}
      <div class="pc-desc">${esc(p.description)}</div>
      <div class="pc-pills">${pills}</div>
      <div class="pc-actions">
        <button class="btn-add-cart" onclick="event.stopPropagation();addToCart('${esc(p.id)}',100);setTimeout(openCart,400);"><i class="bi bi-cart-plus"></i> Add to Cart</button>
        <button class="btn-details btn-qv" data-id="${esc(p.id)}" onclick="event.stopPropagation();openDetail('${esc(p.id)}')"><i class="bi bi-eye-fill"></i></button>
        <a href="contact.html?product=${encodeURIComponent(p.name)}" class="btn-quote-sm" onclick="event.stopPropagation()"><i class="bi bi-send-fill"></i></a>
      </div>
    </div>
  </div>`;
        }

        function cycleCardImg(id, dir) {
            const p = SEED.find(x => x.id === id);
            if (!p) return;
            const imgs = (p.images && p.images.length) ? p.images : [p.image];
            const card = document.querySelector(`.prod-card[data-id="${id}"]`);
            if (!card) return;
            let idx = parseInt(card.getAttribute('data-imgidx') || '0');
            idx = (idx + dir + imgs.length) % imgs.length;
            card.setAttribute('data-imgidx', idx);
            card.querySelector('.pc-img').src = imgs[idx];
            card.querySelectorAll('.pc-img-dots span').forEach((d, i) => d.classList.toggle('on', i === idx));
        }
        /* ══════════════════════════════════════
           SORT
        ══════════════════════════════════════ */
        function sortList(list) {
            const a = list.slice();
            if (sortMode === 'az') return a.sort((x, y) => x.name.localeCompare(y.name));
            if (sortMode === 'za') return a.sort((x, y) => y.name.localeCompare(x.name));
            if (sortMode === 'new') return a.sort((x, y) => (y.isNew ? 1 : 0) - (x.isNew ? 1 : 0));
            return a;
        }

        /* ══════════════════════════════════════
           RENDER
        ══════════════════════════════════════ */
        function render() {
            const all = getProds();
            const cats = [...new Set(all.map(p => p.category))];
            let list = all;
            if (activeCat) list = list.filter(p => p.category === activeCat);
            if (activeECFilter === 'low_ec') {
                list = list.filter(p => p.qualities && p.qualities.low_ec);
            } else if (activeECFilter === 'high_ec') {
                list = list.filter(p => p.qualities && p.qualities.high_ec);
            }
            if (searchQ) {
                const q = searchQ.toLowerCase();
                list = list.filter(p => (p.name || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
            }
            list = sortList(list);

            let titleText = activeCat || (searchQ ? `"${searchQ}"` : 'All Products');
            if (activeECFilter === 'low_ec') titleText += ' • 🌿 Low EC (Washed)';
            if (activeECFilter === 'high_ec') titleText += ' • ⚡ High EC (Unwashed)';

            $('#fbTitle').text(titleText);
            $('#fbCount').html(`<strong>${list.length}</strong> product${list.length !== 1 ? 's' : ''} found`);

            if (!list.length) {
                $('#shopInner').html(`<div class="empty-wrap">
      <i class="bi bi-search"></i>
      <h4>No products found</h4>
      <p>Try a different keyword or clear the filter.</p>
      <button class="btn-clear" onclick="clearAll()">Clear Filter</button>
    </div>`);
                return;
            }

            const gc = viewMode === 'gl' ? 'gl' : viewMode === 'g2' ? 'g2' : viewMode === 'g4' ? 'g4' : '';
            let html = '';

            if (activeCat) {
                const m = cm(activeCat);
                html = `<div class="cat-section">
      <div class="cat-hdr">
        <div class="cat-hdr-ico" style="background:${m.bg}"><i class="bi ${m.icon}" style="color:${m.color}"></i></div>
        <div class="cat-hdr-info"><h3>${esc(activeCat)}</h3><p>${esc(m.desc)} &bull; ${list.length} product${list.length !== 1 ? 's' : ''}</p></div>
      </div>
      <div class="prod-grid ${gc}">${list.map(cardHTML).join('')}</div>
    </div>`;
            } else {
                cats.forEach(cat => {
                    const prods = list.filter(p => p.category === cat);
                    if (!prods.length) return;
                    const m = cm(cat);
                    html += `<div class="cat-section" id="sec-${slug(cat)}">
        <div class="cat-hdr">
          <div class="cat-hdr-ico" style="background:${m.bg}"><i class="bi ${m.icon}" style="color:${m.color}"></i></div>
          <div class="cat-hdr-info"><h3>${esc(cat)}</h3><p>${esc(m.desc)} &bull; ${prods.length} product${prods.length !== 1 ? 's' : ''}</p></div>
        </div>
        <div class="prod-grid ${gc}">${prods.map(cardHTML).join('')}</div>
      </div>`;
                });
            }
            $('#shopInner').html(html);
            renderRecently();
        }

        function clearAll() { activeCat = null; activeECFilter = 'all'; searchQ = ''; filterByECGrade('all', '#btnECAll'); }

        /* View Toggle */
        function setView(mode, btn) {
            viewMode = mode;
            $('.view-btn').removeClass('active');
            $(btn).addClass('active');
            render();
        }
        $('#vG3').on('click', function () { setView('g3', this); });
        $('#vG2').on('click', function () { setView('g2', this); });
        $('#vG4').on('click', function () { setView('g4', this); });
        $('#vLst').on('click', function () { setView('gl', this); });
        $('#sortSel').on('change', function () { sortMode = $(this).val(); render(); });

        /* Card Click */
        $(document).on('click', '.btn-qv', function (e) {
            e.stopPropagation();
            openDetail($(this).data('id'));
        });
        $(document).on('click', '.prod-card', function () {
            openDetail($(this).data('id'));
        });

        /* ══════════════════════════════════════
           DETAIL MODAL
        ══════════════════════════════════════ */
        function openDetail(id) {
            window.location.href = `product-detail.html?id=${id}`;
        }

        /* ══════════════════════════════════════
           BOOT
        ══════════════════════════════════════ */
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('category');
        if (catParam) {
            activeCat = catParam;
        }
        const gradeParam = urlParams.get('grade');
        if (gradeParam) {
            activeECFilter = gradeParam;
            if (gradeParam === 'low_ec') {
                $('.qfs-btn').removeClass('active low high');
                $('#btnECLow').addClass('active low');
            } else if (gradeParam === 'high_ec') {
                $('.qfs-btn').removeClass('active low high');
                $('#btnECHigh').addClass('active high');
            }
        }
        $('#footer-year').text(new Date().getFullYear());
        updateCartBadge();
        render();
