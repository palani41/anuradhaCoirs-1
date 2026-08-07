document.addEventListener("DOMContentLoaded", function () {
  // Set footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Initialize POI-free Leaflet map for India Office
  const mapContainer = document.getElementById('india-leaflet-map');
  if (mapContainer && typeof L !== 'undefined') {
    const coords = [10.096865671359767, 77.92534727535363];
    const map = L.map('india-leaflet-map', {
      center: coords,
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // High quality Voyager tiles — clean map without competitor POI clutter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      attribution: '&copy; <a href="https://carto.com/" target="_blank">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    }).addTo(map);

    // Red location pin icon
    const redIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add marker for ANURADHA COIRS & FIBRES
    const marker = L.marker(coords, { icon: redIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: 'Inter', system-ui, sans-serif; padding: 6px 4px; text-align: left; min-width: 220px;">
        <h6 style="font-family: 'Poppins', sans-serif; font-weight: 700; color: #1b3d2f; margin: 0 0 6px 0; font-size: 14px; letter-spacing: -0.2px;">ANURADHA COIRS &amp; FIBRES</h6>
        <p style="font-size: 12px; color: #4a5568; margin: 0 0 10px 0; line-height: 1.45;">212/6B Krishnapuram Main Road, Nilakkottai,<br>Dindigul, Tamilnadu – 624219</p>
        <a href="https://www.google.com/maps/search/?api=1&query=ANURADHA+COIRS+%26+FIBRES+Nilakkottai" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #c59d5f; text-decoration: none;">
          Get Directions on Google Maps &rarr;
        </a>
      </div>
    `);
  }

  // Initialize Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusEl = document.getElementById('formStatusMsg');
    const submitBtn = document.getElementById('contactSubmitBtn');

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const firstName = document.getElementById('cf-firstName')?.value.trim() || '';
      const lastName = document.getElementById('cf-lastName')?.value.trim() || '';
      const fullName = (firstName + ' ' + lastName).trim();
      const email = document.getElementById('cf-email')?.value.trim() || '';
      const phone = document.getElementById('cf-phone')?.value.trim() || '';
      const subject = document.getElementById('cf-subject')?.value.trim() || 'New Website Inquiry - Anuradha Coirs';
      const message = document.getElementById('cf-message')?.value.trim() || '';

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
          contactForm.reset();
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
