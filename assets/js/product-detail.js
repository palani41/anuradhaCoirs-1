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
        <img src="${esc(img)}" alt="${esc(p.name)}" loading="lazy">
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
                const gradeBadge = item.grade ? `<div style="font-size:0.7rem;font-weight:700;color:var(--gold-deep);background:var(--gold-pale);padding:2px 6px;border-radius:4px;display:inline-block;margin:2px 0;"><i class="bi bi-patch-check-fill me-1"></i>${esc(item.grade)}</div>` : '';
                html += `<div class="cart-item">
      <img src="${esc(img)}" alt="${esc(p.name)}" class="cart-item-img" loading="lazy">
      <div class="cart-item-info">
        <div class="cart-item-cat">${esc(p.category)}</div>
        <div class="cart-item-name">${esc(p.name)}</div>
        ${gradeBadge}
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
      <img src="${esc(img)}" alt="${esc(p.name)}" class="os-item-img" loading="lazy">
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
                const gradeText = item.grade ? ` [Grade: ${item.grade}]` : '';
                if (p) productLines += `\n${idx + 1}. ${p.name} (${p.code})${gradeText} — ${item.amount} ${item.unit}`;
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
           PRODUCT DETAIL RENDERER
        ══════════════════════════════════════ */
        let activeProduct = null;
        let currentDetailGrade = 'low_ec';

        function switchQualityGrade(productId, grade) {
            currentDetailGrade = grade;
            const p = SEED.find(x => x.id === productId);
            if (!p || !p.qualities || !p.qualities[grade]) return;

            const q = p.qualities[grade];
            $('.qg-switch-btn').removeClass('active');
            if (grade === 'low_ec') {
                $('#btnGradeLow').addClass('active');
            } else {
                $('#btnGradeHigh').addClass('active');
            }

            function getSpecIcon(label) {
                const lbl = label.toLowerCase();
                if (lbl.includes('size') || lbl.includes('diameter')) return 'bi-arrows-angle-expand';
                if (lbl.includes('weight')) return 'bi-box-seam';
                if (lbl.includes('expansion')) return 'bi-droplet-half';
                if (lbl.includes('ec')) return 'bi-lightning-charge-fill';
                if (lbl.includes('ph')) return 'bi-water';
                if (lbl.includes('moisture')) return 'bi-thermometer-half';
                if (lbl.includes('compression')) return 'bi-align-center';
                if (lbl.includes('length')) return 'bi-rulers';
                if (lbl.includes('fiber') || lbl.includes('sand')) return 'bi-filter-circle';
                if (lbl.includes('packaging')) return 'bi-box-fill';
                return 'bi-check-circle-fill';
            }

            const specsHTML = q.specs.map((r, idx) => `
                <div class="spec-mini-card delay-${idx + 1}">
                    <span class="spec-mini-card-icon"><i class="bi ${getSpecIcon(r[0])}"></i></span>
                    <div class="spec-mini-card-label">${esc(r[0])}</div>
                    <div class="spec-mini-card-value">${esc(r[1])}</div>
                </div>
            `).join('');

            $('#detailSpecsGrid').html(specsHTML);
            $('#detailDescText').text(q.description);
            showToast(`Switched quality specs to ${q.title}`, 'info', grade === 'low_ec' ? 'bi-droplet-fill' : 'bi-lightning-charge-fill');
        }

        function loadProductDetail() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            if (!id) {
                showProductError("No Product Specified");
                return;
            }

            const p = SEED.find(x => x.id === id);
            if (!p) {
                showProductError("Product Not Found");
                return;
            }

            activeProduct = p;
            addRecently(p.id);

            // Update Breadcrumbs
            $('#detailBreadcrumb').html(`
                <li class="breadcrumb-item"><a href="index.html"><i class="bi bi-house-fill me-1"></i>Home</a></li>
                <li class="breadcrumb-item"><a href="product.html">Products</a></li>
                <li class="breadcrumb-item"><a href="product.html?category=${encodeURIComponent(p.category)}">${esc(p.category)}</a></li>
                <li class="breadcrumb-item active" aria-current="page">${esc(p.name)}</li>
            `);

            // Update Page Hero text and dynamic high-quality hero image per product
            const heroBgImg = p.heroImage || ((p.images && p.images.length) ? p.images[0] : (p.image || 'assets/images/Products/coirfiberNew.jpeg'));
            $('.page-hero').css({
                'background-image': `url('${heroBgImg}')`,
                'background-position': 'center center',
                'background-size': 'cover',
                'background-repeat': 'no-repeat'
            });
            $('.page-hero h1').html(`${esc(p.name)}`);
            $('.page-hero p').html(`Product Code: ${esc(p.code)} &bull; Category: ${esc(p.category)}`);

            // Quality Grade Selection setup
            currentDetailGrade = 'low_ec';
            let activeSpecs = (p.qualities && p.qualities.low_ec) ? p.qualities.low_ec.specs : p.specs;
            let activeDesc = (p.qualities && p.qualities.low_ec) ? p.qualities.low_ec.description : p.description;

            let qualitySwitcherHTML = '';
            if (p.qualities) {
                qualitySwitcherHTML = `
                    <div class="quality-grade-box">
                        <div class="qg-title-label"><i class="bi bi-sliders text-gold me-1"></i> Choose Quality Grade / EC Level:</div>
                        <div class="qg-switcher-group">
                            <button type="button" class="qg-switch-btn active" id="btnGradeLow" onclick="switchQualityGrade('${p.id}', 'low_ec')">
                                <div class="qg-btn-title"><i class="bi bi-droplet-fill text-success me-1"></i> Low EC (Washed)</div>
                                <div class="qg-btn-subtitle">&lt; 0.5 mS/cm &bull; Hydroponics &amp; Greenhouses</div>
                            </button>
                            <button type="button" class="qg-switch-btn" id="btnGradeHigh" onclick="switchQualityGrade('${p.id}', 'high_ec')">
                                <div class="qg-btn-title"><i class="bi bi-lightning-charge-fill text-warning me-1"></i> High EC (Unwashed)</div>
                                <div class="qg-btn-subtitle">2.5 – 3.5 mS/cm &bull; Bedding &amp; Soil Amendment</div>
                            </button>
                        </div>
                    </div>
                `;
            }

            // Populate Specs
            function getSpecIcon(label) {
                const lbl = label.toLowerCase();
                if (lbl.includes('size') || lbl.includes('diameter')) return 'bi-arrows-angle-expand';
                if (lbl.includes('weight')) return 'bi-box-seam';
                if (lbl.includes('expansion')) return 'bi-droplet-half';
                if (lbl.includes('ec')) return 'bi-lightning-charge-fill';
                if (lbl.includes('ph')) return 'bi-water';
                if (lbl.includes('moisture')) return 'bi-thermometer-half';
                if (lbl.includes('compression')) return 'bi-align-center';
                if (lbl.includes('length')) return 'bi-rulers';
                if (lbl.includes('fiber') || lbl.includes('sand')) return 'bi-filter-circle';
                if (lbl.includes('packaging')) return 'bi-box-fill';
                return 'bi-check-circle-fill';
            }
            const specsHTML = (activeSpecs || []).map((r, idx) => `
                <div class="spec-mini-card delay-${idx + 1}">
                    <span class="spec-mini-card-icon"><i class="bi ${getSpecIcon(r[0])}"></i></span>
                    <div class="spec-mini-card-label">${esc(r[0])}</div>
                    <div class="spec-mini-card-value">${esc(r[1])}</div>
                </div>
            `).join('');
            const highlightsHTML = (p.highlights || []).length > 0
                ? `<ul class="highlight-list">${p.highlights.map(h => `<li><i class="bi bi-patch-check-fill"></i><span>${esc(h)}</span></li>`).join('')}</ul>`
                : '';
            const pills = (p.pills || []).map(t => `<span class="dm-pill">${esc(t)}</span>`).join('');
            const ruleHTML = `<div class="dm-rule"><div class="dm-rule-line"></div><span class="dm-rule-ornament">&#9670;&nbsp;&#9670;&nbsp;&#9670;</span><div class="dm-rule-line"></div></div>`;
            const imgs = (p.images && p.images.length) ? p.images : [p.image || 'assets/images/Products/coirfiberNew.jpeg'];
            const img = imgs[0];
            const thumbRow = imgs.length > 1 ? `<div class="dm-thumb-row">${imgs.map((src, i) =>
                `<img src="${esc(src)}" class="dm-thumb${i === 0 ? ' active' : ''}" onclick="switchDetailImg('${esc(src)}', this)" loading="lazy">`
            ).join('')}</div>` : '';
            const bm = BADGE_META[p.badge] || (p.isNew ? BADGE_META['new'] : null);
            const badge = bm ? `<span class="pc-badge ${bm.cls}" style="position:relative;top:0;left:0;">${bm.lbl}</span>` : '';
            const isWishlisted = wishlist.includes(p.id);

            // Render details
            $('#productDetailCard').html(`
                <div class="dm-layout page-mode">
                    <div class="dm-img-col">
                        <div class="dm-img-main-container" id="dmImgContainer" onmousemove="zoomMainImg(event)" onmouseleave="resetZoomMainImg()">
                            <img src="${esc(img)}" alt="${esc(p.name)}" class="dm-img-main" id="dmMainImg" loading="lazy">
                        </div>
                        ${thumbRow}
                        <div class="dm-img-meta">
                            <span class="dm-code">${esc(p.code)}</span>
                            <div class="dm-share-row">
                                <button class="dm-share-btn" onclick="shareProduct('${esc(p.name)}','${esc(p.code)}')" title="Share"><i class="bi bi-share-fill"></i></button>
                                <button class="dm-share-btn" onclick="window.open('https://api.whatsapp.com/send?phone=919944859177&text=${encodeURIComponent('Hi! I am interested in ' + p.name + ' (' + p.code + '). Please send me more details.')}','_blank')" title="WhatsApp"><i class="bi bi-whatsapp"></i></button>
                                <button class="dm-share-btn pc-wish${isWishlisted ? ' active' : ''}" data-id="${esc(p.id)}" onclick="toggleWishDetail('${esc(p.id)}',this)" title="Wishlist"><i class="bi bi-heart${isWishlisted ? '-fill' : ''}"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="dm-info-col">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                            <span class="dm-cat-tag">${esc(p.category)}</span>${badge}
                        </div>
                        <h4 class="dm-name" style="font-size: 2.2rem;">${esc(p.name)}</h4>
                        ${ruleHTML}
                        <p class="dm-desc" id="detailDescText">${esc(activeDesc)}</p>
                        ${highlightsHTML}
                        <div class="dm-pills">${pills}</div>
                        ${qualitySwitcherHTML}
                        ${specsHTML ? `<div class="dm-spec-title" style="margin-top: 15px;">Technical Specifications</div>
                        <div class="spec-card-grid" id="detailSpecsGrid">${specsHTML}</div>` : ''}
                        
                        <div class="dm-qty-row mt-4" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                            <div style="display:flex;flex-direction:column;gap:4px;">
                                <span class="dm-qty-label" style="margin:0;">Select Unit</span>
                                <select class="dm-unit-select" id="detailUnitSelect" onchange="onDetailUnitChange()">
                                    <option value="Pieces">Pieces</option>
                                    <option value="Kg">Kg</option>
                                    <option value="Ton">Ton</option>
                                </select>
                            </div>
                            <div style="display:flex;flex-direction:column;gap:4px;">
                                <span class="dm-qty-label" style="margin:0;">Quantity</span>
                                <div class="dm-qty-ctrl">
                                    <button onclick="detQtyChange(-1)"><i class="bi bi-dash"></i></button>
                                    <input type="number" id="detQtyInput" value="100" min="1" max="999999">
                                    <button onclick="detQtyChange(1)"><i class="bi bi-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dm-actions">
                            <button class="dm-btn-cart" onclick="addToCartFromDetailPage('${esc(p.id)}')"><i class="bi bi-cart-plus-fill"></i> Add to Enquiry Cart</button>
                            <a href="contact.html?product=${encodeURIComponent(p.name)}" class="dm-btn-q"><i class="bi bi-send-fill"></i> Request Quote</a>
                            <button class="dm-btn-back" onclick="goBack()" title="Back"><i class="bi bi-arrow-left"></i></button>
                        </div>
                    </div>
                </div>
            `);

            renderRelatedProducts(p);
            renderUsesAndApplications(p);
        }

        function switchWhereUsedBanner(pid, idx, newSrc, newTitle, newDesc, el) {
            // Update active tab card
            const parent = el.closest('.where-used-tabs-col');
            if (parent) {
                parent.querySelectorAll('.where-used-tab-card').forEach(item => item.classList.remove('active'));
            }
            el.classList.add('active');

            // Animate image switch
            const img = document.getElementById(`whereUsedBannerImg_${pid}`);
            if (img && img.src !== newSrc) {
                img.style.opacity = '0.3';
                img.style.transform = 'scale(1.04)';
                setTimeout(() => {
                    img.src = newSrc;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 180);
            }

            // Update title
            const titleEl = document.getElementById(`whereUsedBannerTitle_${pid}`);
            if (titleEl && newTitle) {
                titleEl.style.opacity = '0';
                setTimeout(() => {
                    titleEl.textContent = newTitle;
                    titleEl.style.opacity = '1';
                }, 180);
            }
        }

        function switchInfoMedia(imgId, titleId, newSrc, newTitle, el) {
            // 1. Update active class among sibling items
            const parent = el.closest('.info-content-col');
            if (parent) {
                parent.querySelectorAll('.info-list-item').forEach(item => item.classList.remove('active'));
            }
            el.classList.add('active');

            // 2. Animate main image switch
            const img = document.getElementById(imgId);
            if (img && img.src !== newSrc) {
                img.style.opacity = '0.3';
                img.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    img.src = newSrc;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 180);
            }

            // 3. Update overlay title
            const titleEl = document.getElementById(titleId);
            if (titleEl && newTitle) {
                titleEl.style.opacity = '0';
                setTimeout(() => {
                    titleEl.textContent = newTitle;
                    titleEl.style.opacity = '1';
                }, 180);
            }
        }

        function renderUsesAndApplications(p) {
            // Render Uses
            if (p.uses && p.uses.length > 0) {
                const mainUseImg = p.uses[0].image || 'assets/images/Products/coirfiberNew.jpeg';
                let usesHTML = `
                    <h2 class="info-heading reveal-on-scroll">What is the use of this product?</h2>
                    <p class="info-subheading reveal-on-scroll">Discover the key benefits and primary functions</p>
                    <div class="info-row reveal-on-scroll">
                        <div class="info-media-col">
                            <div class="info-media-wrapper">
                                <img src="${esc(mainUseImg)}" alt="What is the use of ${esc(p.name)}" class="info-media-img" id="usesMainImg_${esc(p.id)}" loading="lazy">
                                <div class="info-media-overlay" id="usesOverlay_${esc(p.id)}">
                                    <span class="info-media-badge"><i class="bi bi-stars"></i> Primary Application</span>
                                    <h4 class="info-media-title" id="usesTitle_${esc(p.id)}">${esc(p.uses[0].title)}</h4>
                                </div>
                            </div>
                        </div>
                        <div class="info-content-col">
                `;
                p.uses.forEach((item, idx) => {
                    usesHTML += `
                        <div class="info-list-item interactive-info-item ${idx === 0 ? 'active' : ''} reveal-on-scroll delay-${idx + 1}" 
                             onmouseenter="switchInfoMedia('usesMainImg_${esc(p.id)}', 'usesTitle_${esc(p.id)}', '${esc(item.image)}', '${esc(item.title)}', this)">
                            <div class="info-active-indicator"></div>
                            <span class="info-list-icon"><i class="bi ${esc(item.icon)}"></i></span>
                            <div class="info-list-text">
                                <h4 class="info-list-title">${esc(item.title)}</h4>
                                <p class="info-list-desc">${esc(item.desc)}</p>
                            </div>
                        </div>
                    `;
                });
                usesHTML += `
                        </div>
                    </div>
                `;
                $('#productUsesSection').html(usesHTML).show();
            } else {
                $('#productUsesSection').hide().empty();
            }

            // Render Where Used (Dark Forest Glassmorphism Banner with Interactive Tabs)
            if (p.whereUsed && p.whereUsed.length > 0) {
                const firstItem = p.whereUsed[0];
                const mainWhereUsedImg = firstItem.image || 'assets/images/Products/coirfiberNew.jpeg';

                let whereUsedHTML = `
                    <div class="where-used-banner-container reveal-on-scroll">
                        <div class="where-used-banner-header text-center">
                            <span class="where-used-banner-badge"><i class="bi bi-geo-alt-fill"></i> APPLICATION ENVIRONMENTS</span>
                            <h2 class="where-used-banner-title">Where is it used?</h2>
                            <p class="where-used-banner-sub">Target industries and professional environments optimized for maximum performance</p>
                        </div>
                        <div class="where-used-banner-content">
                            <div class="where-used-tabs-col">
                `;

                p.whereUsed.forEach((item, idx) => {
                    whereUsedHTML += `
                        <div class="where-used-tab-card ${idx === 0 ? 'active' : ''}" 
                             onmouseenter="switchWhereUsedBanner('${esc(p.id)}', ${idx}, '${esc(item.image)}', '${esc(item.title)}', '${esc(item.desc)}', this)">
                            <div class="tab-card-header">
                                <span class="tab-card-icon"><i class="bi ${esc(item.icon)}"></i></span>
                                <div class="tab-card-titles">
                                    <span class="tab-card-num">0${idx + 1}</span>
                                    <h4 class="tab-card-name">${esc(item.title)}</h4>
                                </div>
                            </div>
                            <p class="tab-card-desc">${esc(item.desc)}</p>
                        </div>
                    `;
                });

                whereUsedHTML += `
                            </div>
                            <div class="where-used-showcase-col">
                                <div class="where-used-showcase-frame">
                                    <img src="${esc(mainWhereUsedImg)}" alt="${esc(firstItem.title)}" id="whereUsedBannerImg_${esc(p.id)}" class="where-used-banner-img" loading="lazy">
                                    <div class="where-used-showcase-overlay">
                                        <span class="showcase-tag"><i class="bi bi-patch-check-fill"></i> Verified Industry Application</span>
                                        <h3 class="showcase-title" id="whereUsedBannerTitle_${esc(p.id)}">${esc(firstItem.title)}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                $('#productWhereUsedSection').html(whereUsedHTML).show();
            } else {
                $('#productWhereUsedSection').hide().empty();
            }

            // Master Crop Image & Category Database
            const CROP_DATABASE = {
                // VEGETABLES
                'tomatoes': { name: 'Tomato Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80' },
                'tomato': { name: 'Tomato Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80' },
                'cucumbers': { name: 'Cucumber Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&auto=format&fit=crop&q=80' },
                'cucumber': { name: 'Cucumber Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&auto=format&fit=crop&q=80' },
                'capsicum growers': { name: 'Capsicum Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80' },
                'capsicums & peppers': { name: 'Capsicum Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80' },
                'bell peppers': { name: 'Capsicum Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80' },
                'chili peppers': { name: 'Chili Peppers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80' },
                'eggplants': { name: 'Eggplant Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80' },
                'lettuce': { name: 'Lettuce & Greens', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&auto=format&fit=crop&q=80' },
                'spinach': { name: 'Spinach', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80' },
                'zucchini': { name: 'Zucchini Growers', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&auto=format&fit=crop&q=80' },
                'herbs': { name: 'Culinary Herbs', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=400&auto=format&fit=crop&q=80' },
                'potted herbs': { name: 'Culinary Herbs', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=400&auto=format&fit=crop&q=80' },
                'microgreens': { name: 'Microgreens', category: 'VEGETABLES', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=400&auto=format&fit=crop&q=80' },

                // SOFT FRUITS
                'blueberries': { name: 'Blueberry Growers', category: 'SOFT FRUITS', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&auto=format&fit=crop&q=80' },
                'blueberry growers': { name: 'Blueberry Growers', category: 'SOFT FRUITS', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&auto=format&fit=crop&q=80' },
                'raspberries': { name: 'Raspberries', category: 'SOFT FRUITS', image: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400&auto=format&fit=crop&q=80' },
                'strawberries': { name: 'Strawberries', category: 'SOFT FRUITS', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&auto=format&fit=crop&q=80' },
                'watermelon growers': { name: 'Watermelon Growers', category: 'SOFT FRUITS', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&auto=format&fit=crop&q=80' },
                'watermelon': { name: 'Watermelon Growers', category: 'SOFT FRUITS', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&auto=format&fit=crop&q=80' },
                'melons': { name: 'Melon Growers', category: 'SOFT FRUITS', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&auto=format&fit=crop&q=80' },

                // FLOWERS & ORNAMENTALS
                'flowers': { name: 'Floriculture & Flowers', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&auto=format&fit=crop&q=80' },
                'roses': { name: 'Rose', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80' },
                'rose': { name: 'Rose', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80' },
                'lisianthus': { name: 'Lisianthus', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&auto=format&fit=crop&q=80' },
                'carnation': { name: 'Carnation', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&auto=format&fit=crop&q=80' },
                'carnations': { name: 'Carnation', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&auto=format&fit=crop&q=80' },
                'gerbera': { name: 'Gerbera', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400&auto=format&fit=crop&q=80' },
                'gerberas': { name: 'Gerbera', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400&auto=format&fit=crop&q=80' },
                'orchids': { name: 'Orchids', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400&auto=format&fit=crop&q=80' },
                'anthuriums': { name: 'Anthuriums', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&auto=format&fit=crop&q=80' },
                'anthurium': { name: 'Anthuriums', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&auto=format&fit=crop&q=80' },
                'bromeliads': { name: 'Bromeliads', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&auto=format&fit=crop&q=80' },
                'marigolds': { name: 'Marigolds', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400&auto=format&fit=crop&q=80' },
                'pot plants': { name: 'Pot Plants', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop&q=80' },
                'epiphytes': { name: 'Epiphytes', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400&auto=format&fit=crop&q=80' },
                'tropical foliage': { name: 'Tropical Foliage', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&auto=format&fit=crop&q=80' },
                'ferns': { name: 'Ferns & Foliage', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&auto=format&fit=crop&q=80' },
                'succulents': { name: 'Succulents & Cacti', category: 'FLOWERS', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&auto=format&fit=crop&q=80' },

                // VINES & SPECIALTY
                'hops': { name: 'Hops', category: 'VINES & SPECIALTY', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&auto=format&fit=crop&q=80' },
                'grapes': { name: 'Grapes', category: 'VINES & SPECIALTY', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&auto=format&fit=crop&q=80' },
                'vanilla vines': { name: 'Vanilla Vines', category: 'VINES & SPECIALTY', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=400&auto=format&fit=crop&q=80' },
                'climbing peppers': { name: 'Climbing Peppers', category: 'VINES & SPECIALTY', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&auto=format&fit=crop&q=80' },
                'runner beans': { name: 'Runner Beans', category: 'VINES & SPECIALTY', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80' },

                // PALMS & SEEDLINGS
                'east coast tall': { name: 'East Coast Tall Palms', category: 'COCONUT PALMS', image: 'assets/images/Products/tallCoconut.jpeg' },
                'west coast tall': { name: 'West Coast Tall Palms', category: 'COCONUT PALMS', image: 'assets/images/Products/tallCoconut.jpeg' },
                'orange dwarf': { name: 'Orange Dwarf Seedlings', category: 'COCONUT PALMS', image: 'assets/images/Products/NurserySeedlings.jpeg' },
                'green dwarf': { name: 'Green Dwarf Seedlings', category: 'COCONUT PALMS', image: 'assets/images/Products/greenSemicoconut.jpeg' },
                'hybrid palms': { name: 'Hybrid Palms', category: 'COCONUT PALMS', image: 'assets/images/Products/ageofSeedlings.jpeg' },
                'tall coconut palms': { name: 'Tall Coconut Palms', category: 'COCONUT PALMS', image: 'assets/images/Products/tallCoconut.jpeg' },
                'dwarf green palms': { name: 'Dwarf Green Palms', category: 'COCONUT PALMS', image: 'assets/images/Products/greenSemicoconut.jpeg' },
                'orange dwarf palms': { name: 'Orange Dwarf Palms', category: 'COCONUT PALMS', image: 'assets/images/Products/NurserySeedlings.jpeg' },
                'hybrid coconuts': { name: 'Hybrid Coconuts', category: 'COCONUT PALMS', image: 'assets/images/Products/ageofSeedlings.jpeg' },
                'chowghat orange dwarf': { name: 'Chowghat Orange Dwarf', category: 'COCONUT PALMS', image: 'assets/images/Products/NurserySeedlings.jpeg' },
                'malayan yellow dwarf': { name: 'Malayan Yellow Dwarf', category: 'COCONUT PALMS', image: 'assets/images/Products/NurserySeedlings.jpeg' },
                'ganga bondam': { name: 'Ganga Bondam Palms', category: 'COCONUT PALMS', image: 'assets/images/Products/greenSemicoconut.jpeg' },
                'tall coconut cultivars': { name: 'Tall Coconut Cultivars', category: 'COCONUT PALMS', image: 'assets/images/Products/tallCoconut.jpeg' },
                'dwarf cultivars': { name: 'Dwarf Cultivars', category: 'COCONUT PALMS', image: 'assets/images/Products/NurserySeedlings.jpeg' },
                'txd palms': { name: 'TxD Hybrid Palms', category: 'COCONUT PALMS', image: 'assets/images/Products/ageofSeedlings.jpeg' }
            };

            // Render Crops Section with Categorized Cards & Images
            if (p.crops && p.crops.length > 0) {
                const categoriesMap = {};
                p.crops.forEach(cropItem => {
                    let cropName = typeof cropItem === 'string' ? cropItem : (cropItem.name || '');
                    let lookupKey = cropName.toLowerCase().trim();
                    let mapped = CROP_DATABASE[lookupKey];

                    if (!mapped) {
                        // Smart fallback for unmapped crop names
                        let inferredCategory = 'SPECIALTY CROPS';
                        let inferredImage = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80';

                        if (lookupKey.includes('flower') || lookupKey.includes('rose') || lookupKey.includes('bloom') || lookupKey.includes('plant')) {
                            inferredCategory = 'FLOWERS';
                            inferredImage = 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&auto=format&fit=crop&q=80';
                        } else if (lookupKey.includes('palm') || lookupKey.includes('coconut') || lookupKey.includes('dwarf') || lookupKey.includes('tall')) {
                            inferredCategory = 'COCONUT PALMS';
                            inferredImage = 'assets/images/Products/NurserySeedlings.jpeg';
                        } else if (lookupKey.includes('berry') || lookupKey.includes('fruit') || lookupKey.includes('melon')) {
                            inferredCategory = 'SOFT FRUITS';
                            inferredImage = 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&auto=format&fit=crop&q=80';
                        } else if (lookupKey.includes('herb') || lookupKey.includes('green') || lookupKey.includes('veg')) {
                            inferredCategory = 'VEGETABLES';
                            inferredImage = 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=400&auto=format&fit=crop&q=80';
                        }

                        mapped = {
                            name: cropName,
                            category: (typeof cropItem === 'object' && cropItem.category) ? cropItem.category : inferredCategory,
                            image: (typeof cropItem === 'object' && cropItem.image) ? cropItem.image : inferredImage
                        };
                    }

                    const catName = mapped.category.toUpperCase();
                    if (!categoriesMap[catName]) {
                        categoriesMap[catName] = [];
                    }
                    categoriesMap[catName].push(mapped);
                });

                let cropsHTML = `
                    <div class="crops-section-wrapper reveal-on-scroll">
                        <div class="crops-header text-center">
                            <span class="crops-section-badge"><i class="bi bi-flower1"></i> CROP COMPATIBILITY</span>
                            <h2 class="crops-main-title">What types of crops can be grown using <span class="highlight-product-name">${esc(p.name)}</span>?</h2>
                            <p class="crops-main-subtitle">Proven to maximize growth yield, root health, and aeration for these global crop varieties</p>
                        </div>
                        <div class="crops-categories-grid">
                `;

                for (const [catTitle, cropList] of Object.entries(categoriesMap)) {
                    let catIcon = 'bi-grid-fill';
                    let catColorClass = 'cat-veg';
                    if (catTitle.includes('VEGETABLE')) {
                        catIcon = 'bi-flower2';
                        catColorClass = 'cat-veg';
                    } else if (catTitle.includes('FRUIT')) {
                        catIcon = 'bi-sun-fill';
                        catColorClass = 'cat-fruits';
                    } else if (catTitle.includes('FLOWER')) {
                        catIcon = 'bi-flower1';
                        catColorClass = 'cat-flowers';
                    } else {
                        catIcon = 'bi-tree-fill';
                        catColorClass = 'cat-vines';
                    }

                    cropsHTML += `
                        <div class="crop-category-card ${catColorClass}">
                            <div class="category-card-header">
                                <span class="cat-card-icon"><i class="bi ${catIcon}"></i></span>
                                <h3 class="cat-card-title">${esc(catTitle)}</h3>
                            </div>
                            <div class="category-crops-list">
                    `;

                    cropList.forEach(c => {
                        cropsHTML += `
                            <div class="crop-item-card">
                                <div class="crop-img-wrap">
                                    <img src="${esc(c.image)}" alt="${esc(c.name)}" loading="lazy" class="crop-thumb-img">
                                </div>
                                <span class="crop-item-name">${esc(c.name)}</span>
                            </div>
                        `;
                    });

                    cropsHTML += `
                            </div>
                        </div>
                    `;
                }

                cropsHTML += `
                        </div>
                    </div>
                `;
                $('#productCropsSection').html(cropsHTML).show();
            } else {
                $('#productCropsSection').hide().empty();
            }

            // Render Reviews
            if (p.reviews && p.reviews.length > 0) {
                let reviewsHTML = `
                    <h2 class="info-heading reveal-on-scroll">Customer Reviews</h2>
                    <p class="info-subheading reveal-on-scroll">Simple & modern feedback from our global buyers</p>
                    <div class="reviews-grid reveal-on-scroll">
                `;
                p.reviews.forEach((rev, idx) => {
                    const initials = rev.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                    reviewsHTML += `
                        <div class="review-card reveal-on-scroll delay-${idx + 1}">
                            <div class="review-stars">
                                ${'<i class="bi bi-star-fill"></i>'.repeat(rev.rating)}
                                ${'<i class="bi bi-star"></i>'.repeat(5 - rev.rating)}
                            </div>
                            <p class="review-comment">"${esc(rev.comment)}"</p>
                            <div class="review-author">
                                <div class="review-avatar">${esc(initials)}</div>
                                <div class="review-meta">
                                    <h4 class="review-name">${esc(rev.name)}</h4>
                                    <p class="review-location"><i class="bi bi-geo-alt-fill"></i> ${esc(rev.location)}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
                reviewsHTML += `
                    </div>
                `;
                $('#productReviewsSection').html(reviewsHTML).show();
            } else {
                $('#productReviewsSection').hide().empty();
            }

            // Set up scroll animations via IntersectionObserver
            setupScrollAnimations();
        }

        function setupScrollAnimations() {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('revealed');
                            // Once revealed, we can unobserve
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.15,
                    rootMargin: '0px 0px -50px 0px'
                });

                document.querySelectorAll('.reveal-on-scroll').forEach(el => {
                    observer.observe(el);
                });
            } else {
                // Fallback if IntersectionObserver not supported
                document.querySelectorAll('.reveal-on-scroll').forEach(el => {
                    el.classList.add('revealed');
                });
            }
        }

        function toggleWishDetail(id, btn) {
            toggleWish(id, btn);
            // Sync heart icon display inside detail card
            const icon = btn.querySelector('i');
            const isWishlisted = wishlist.includes(id);
            if (isWishlisted) {
                icon.className = 'bi bi-heart-fill';
            } else {
                icon.className = 'bi bi-heart';
            }
        }

        function onDetailUnitChange() {
            const unit = document.getElementById('detailUnitSelect').value;
            const el = document.getElementById('detQtyInput');
            if (unit === 'Ton') {
                el.value = 10;
            } else if (unit === 'Kg') {
                el.value = 500;
            } else {
                el.value = 100;
            }
        }

        function detQtyChange(d) {
            const unit = document.getElementById('detailUnitSelect')?.value || 'Pieces';
            const el = document.getElementById('detQtyInput');
            if (!el) return;
            let step = 10;
            if (unit === 'Kg') step = 50;
            else if (unit === 'Ton') step = 1;
            el.value = Math.max(1, parseInt(el.value || 100) + d * step);
        }

        function addToCartFromDetailPage(id) {
            const qty = parseInt(document.getElementById('detQtyInput')?.value || 100);
            const unit = document.getElementById('detailUnitSelect')?.value || 'Pieces';
            const p = SEED.find(x => x.id === id);

            let gradeTag = '';
            if (p && p.qualities) {
                gradeTag = currentDetailGrade === 'high_ec' ? 'High EC (2.5 – 3.5 mS/cm)' : 'Low EC (< 0.5 mS/cm)';
            }

            // Add to cart with specific unit & quality grade
            const existing = cart.find(i => i.id === id && i.grade === gradeTag);
            if (existing) {
                existing.amount += qty;
                existing.unit = unit; // update unit
                showToast('Quantity updated in cart', 'success', 'bi-cart-check-fill');
            } else {
                cart.push({ id, unit: unit, amount: qty, grade: gradeTag });
                showToast(`Added ${p.name} ${gradeTag ? '(' + gradeTag + ')' : ''} to enquiry cart!`, 'success', 'bi-cart-plus-fill');
            }
            saveCart();
            updateCartBadge();
            renderCartItems();

            setTimeout(openCart, 400);
        }

        function switchDetailImg(src, el) {
            const mainImg = document.getElementById('dmMainImg');
            if (mainImg) {
                // Apply a smooth fade out transition
                mainImg.style.opacity = 0.3;
                setTimeout(() => {
                    mainImg.src = src;
                    mainImg.style.opacity = 1;
                }, 150);
            }
            document.querySelectorAll('.dm-thumb').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }

        function zoomMainImg(e) {
            const container = e.currentTarget;
            const img = container.querySelector('img');
            const rect = container.getBoundingClientRect();

            // Calculate coordinates in percentages
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(1.8)';
        }

        function resetZoomMainImg() {
            const img = document.getElementById('dmMainImg');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.transformOrigin = 'center center';
            }
        }

        function showProductError(message) {
            $('#productDetailCard').html(`
                <div class="text-center py-5">
                    <i class="bi bi-exclamation-triangle" style="font-size: 3.5rem; color: var(--gold);"></i>
                    <h3 class="mt-3" style="font-family: var(--fh);">${esc(message)}</h3>
                    <p style="color: var(--text-muted);">Please go back to the products catalog page to browse our items.</p>
                    <a href="product.html" class="btn-primary-coir mt-3 px-4 py-2 d-inline-flex align-items-center gap-2" style="background: var(--forest); color: #fff; border-radius: 4px; padding: 10px 20px; text-decoration: none;">
                        <i class="bi bi-arrow-left"></i> Back to Products
                    </a>
                </div>
            `);
            $('#relatedSection').hide();
        }

        function goBack() {
            if (document.referrer.indexOf(window.location.host) !== -1) {
                window.history.back();
            } else {
                window.location.href = 'product.html';
            }
        }

        function renderRelatedProducts(currProd) {
            const all = getProds();
            // Get products in same category except current one
            const related = all.filter(p => p.category === currProd.category && p.id !== currProd.id).slice(0, 3);
            if (related.length === 0) {
                $('#relatedSection').hide();
                return;
            }

            $('#relatedSection').show();

            // Generate cards
            const gridHTML = related.map(p => {
                const isWishlisted = wishlist.includes(p.id);
                const bm = BADGE_META[p.badge] || (p.isNew ? BADGE_META['new'] : null);
                const badge = bm ? `<span class="pc-badge ${bm.cls}">${bm.lbl}</span>` : '';
                const imgs = (p.images && p.images.length) ? p.images : [p.image || 'assets/images/Products/coirfiberNew.jpeg'];
                const img = imgs[0];

                return `
                    <div class="prod-card" data-id="${esc(p.id)}" onclick="window.location.href='product-detail.html?id=${p.id}'" style="cursor: pointer;">
                        <div class="pc-img-wrap">
                            <img src="${esc(img)}" alt="${esc(p.name)}" class="pc-img" loading="lazy">
                            ${badge}
                            <button class="pc-wish${isWishlisted ? ' active' : ''}" onclick="event.stopPropagation();toggleWish('${esc(p.id)}',this)">
                                <i class="bi bi-heart${isWishlisted ? '-fill' : ''}"></i>
                            </button>
                        </div>
                        <div class="pc-body">
                            <span class="pc-cat-tag">${esc(p.category)}</span>
                            <div class="pc-name">${esc(p.name)}</div>
                            <div class="pc-desc" style="font-size: .82rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 38px; margin-top: 5px;">${esc(p.description)}</div>
                            <div class="pc-actions" style="margin-top: 15px;">
                                <button class="btn-add-cart" onclick="event.stopPropagation();addToCart('${esc(p.id)}',100);setTimeout(openCart,400);" style="flex:1;"><i class="bi bi-cart-plus"></i> Add to Cart</button>
                                <button class="btn-details" onclick="event.stopPropagation();window.location.href='product-detail.html?id=${p.id}'"><i class="bi bi-eye-fill"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            $('#relatedInner').html(gridHTML);
        }

        /* ══════════════════════════════════════
           BOOT
        ══════════════════════════════════════ */
        $('#footer-year').text(new Date().getFullYear());
        updateCartBadge();
        loadProductDetail();
