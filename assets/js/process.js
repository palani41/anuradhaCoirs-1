document.getElementById('footer-year').textContent = new Date().getFullYear();

    /* Kill GT banner */
    function killGTBanner() {
      document.querySelectorAll(
        'iframe.skiptranslate,iframe.goog-te-banner-frame,.goog-te-banner-frame,#goog-gt-tt,.goog-tooltip'
      ).forEach(el => { el.style.cssText = 'display:none!important;height:0!important;'; });
      document.body.style.top = '0px';
      document.documentElement.style.top = '0px';
    }
    setInterval(killGTBanner, 300);
    new MutationObserver(killGTBanner).observe(document.body, { childList: true, subtree: true });
