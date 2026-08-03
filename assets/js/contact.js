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
});
