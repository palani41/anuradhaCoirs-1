// CUSTOM GOOGLE TRANSLATE WITH SEARCH & FLAGS

(function () {
  // Mapping of Google Translate language codes to verified FlagCDN country codes
  const languageFlags = {
    // English & Indian Languages
    'en': 'us',
    'ta': 'in', // Tamil
    'hi': 'in', // Hindi
    'te': 'in', // Telugu
    'ml': 'in', // Malayalam
    'kn': 'in', // Kannada
    'bn': 'bd', // Bengali
    'gu': 'in', // Gujarati
    'mr': 'in', // Marathi
    'pa': 'in', // Punjabi
    'or': 'in', // Odia
    'as': 'in', // Assamese
    'bho': 'in', // Bhojpuri
    'doi': 'in', // Dogri
    'gom': 'in', // Konkani
    'mai': 'in', // Maithili
    'mni-Mtei': 'in', // Meiteilon (Manipuri)
    'lus': 'in', // Mizo
    'sa': 'in', // Sanskrit

    // Major World Languages
    'ar': 'sa', // Arabic
    'zh-CN': 'cn', // Chinese (Simplified)
    'zh-TW': 'tw', // Chinese (Traditional)
    'zh': 'cn',
    'yue': 'hk', // Cantonese
    'fr': 'fr', // French
    'de': 'de', // German
    'es': 'es', // Spanish
    'it': 'it', // Italian
    'ja': 'jp', // Japanese
    'ko': 'kr', // Korean
    'nl': 'nl', // Dutch
    'pt': 'pt', // Portuguese
    'ru': 'ru', // Russian
    'tr': 'tr', // Turkish
    'vi': 'vn', // Vietnamese
    'pl': 'pl', // Polish
    'th': 'th', // Thai
    'sv': 'se', // Swedish
    'ms': 'my', // Malay
    'id': 'id', // Indonesian
    'da': 'dk', // Danish
    'fi': 'fi', // Finnish
    'el': 'gr', // Greek
    'iw': 'il', // Hebrew
    'he': 'il', // Hebrew
    'no': 'no', // Norwegian
    'uk': 'ua', // Ukrainian
    'cs': 'cz', // Czech
    'ro': 'ro', // Romanian
    'hu': 'hu', // Hungarian
    'fa': 'ir', // Persian
    'sk': 'sk', // Slovak
    'bg': 'bg', // Bulgarian
    'hr': 'hr', // Croatian
    'lt': 'lt', // Lithuanian
    'lv': 'lv', // Latvian
    'sl': 'si', // Slovenian
    'et': 'ee', // Estonian

    // Additional Global & Regional Languages
    'ab': 'ge',  // Abkhaz
    'ace': 'id', // Acehnese
    'ach': 'ug', // Acholi
    'aa': 'et',  // Afar
    'af': 'za',  // Afrikaans
    'sq': 'al',  // Albanian
    'alz': 'ug', // Alur
    'am': 'et',  // Amharic
    'hy': 'am',  // Armenian
    'ast': 'es', // Asturian
    'ay': 'bo',  // Aymara
    'az': 'az',  // Azerbaijani
    'bm': 'ml',  // Bambara
    'ba': 'ru',  // Bashkir
    'eu': 'es',  // Basque
    'be': 'by',  // Belarusian
    'bem': 'zm', // Bemba
    'bs': 'ba',  // Bosnian
    'br': 'fr',  // Breton
    'ca': 'es',  // Catalan
    'ceb': 'ph', // Cebuano
    'chr': 'us', // Cherokee
    'ny': 'mw',  // Chichewa
    'co': 'fr',  // Corsican
    'dv': 'mv',  // Dhivehi
    'eo': 'eu',  // Esperanto (European Union Flag)
    'ee': 'gh',  // Ewe
    'fo': 'fo',  // Faroese
    'fj': 'fj',  // Fijian
    'fil': 'ph', // Filipino
    'tl': 'ph',  // Tagalog
    'fy': 'nl',  // Frisian
    'ff': 'sn',  // Fula
    'gl': 'es',  // Galician
    'ka': 'ge',  // Georgian
    'gn': 'py',  // Guarani
    'ht': 'ht',  // Haitian Creole
    'ha': 'ng',  // Hausa
    'haw': 'us', // Hawaiian
    'hmn': 'la', // Hmong
    'is': 'is',  // Icelandic
    'ig': 'ng',  // Igbo
    'ilo': 'ph', // Ilocano
    'ga': 'ie',  // Irish
    'jw': 'id',  // Javanese
    'jv': 'id',  // Javanese
    'kk': 'kz',  // Kazakh
    'km': 'kh',  // Khmer
    'rw': 'rw',  // Kinyarwanda
    'kri': 'sl', // Krio
    'ku': 'iq',  // Kurdish
    'ckb': 'iq', // Kurdish (Sorani)
    'ky': 'kg',  // Kyrgyz
    'lo': 'la',  // Lao
    'la': 'va',  // Latin
    'ln': 'cd',  // Lingala
    'lg': 'ug',  // Luganda
    'lb': 'lu',  // Luxembourgish
    'mk': 'mk',  // Macedonian
    'mg': 'mg',  // Malagasy
    'mt': 'mt',  // Maltese
    'mi': 'nz',  // Maori
    'mn': 'mn',  // Mongolian
    'my': 'mm',  // Myanmar (Burmese)
    'ne': 'np',  // Nepali
    'nso': 'za', // Northern Sotho
    'om': 'et',  // Oromo
    'ps': 'af',  // Pashto
    'qu': 'pe',  // Quechua
    'sm': 'ws',  // Samoan
    'gd': 'gb',  // Scots Gaelic
    'sr': 'rs',  // Serbian
    'st': 'ls',  // Sesotho
    'sn': 'zw',  // Shona
    'sd': 'pk',  // Sindhi
    'si': 'lk',  // Sinhala
    'so': 'so',  // Somali
    'su': 'id',  // Sundanese
    'sw': 'ke',  // Swahili
    'tg': 'tj',  // Tajik
    'tt': 'ru',  // Tatar
    'ti': 'er',  // Tigrinya
    'ts': 'za',  // Tsonga
    'tk': 'tm',  // Turkmen
    'ak': 'gh',  // Twi
    'ur': 'pk',  // Urdu
    'ug': 'cn',  // Uyghur
    'uz': 'uz',  // Uzbek
    'cy': 'gb',  // Welsh
    'xh': 'za',  // Xhosa
    'yi': 'il',  // Yiddish
    'yo': 'ng',  // Yoruba
    'zu': 'za'   // Zulu
  };

  // Helper to read cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Create flag container for a language (strictly displaying valid flags)
  function createFlagContainer(langCode, langName, isButton = false) {
    const container = document.createElement('div');
    container.className = isButton ? 'flag-container btn-flag-container' : 'flag-container list-flag-container';

    const flagCode = languageFlags[langCode] || 'us';

    const img = document.createElement('img');
    img.className = 'flag-img';
    img.src = `https://flagcdn.com/w40/${flagCode}.png`;
    img.alt = langName;
    img.loading = 'lazy';

    container.appendChild(img);
    return container;
  }

  function updateButtonFlag(btnElement, langCode, langName) {
    const existingFlag = btnElement.querySelector('.flag-container');
    if (existingFlag) {
      existingFlag.replaceWith(createFlagContainer(langCode, langName, true));
    }
  }

  // Build the custom dropdown UI
  function buildCustomDropdown(combo, container) {
    // Check if we already built it
    if (container.querySelector('.custom-translate-dropdown')) return;

    // Retrieve initial language from cookie/combo
    let activeLangCode = 'en';
    const googtrans = getCookie('googtrans');
    if (googtrans) {
      const parts = googtrans.split('/');
      if (parts.length > 2) {
        activeLangCode = parts[parts.length - 1];
      }
    } else if (combo.value) {
      activeLangCode = combo.value;
    }

    // Prepare list of languages from original Google combo options
    const options = Array.from(combo.options);
    const languagesList = [];

    options.forEach(opt => {
      if (!opt.value) return;
      let langName = opt.text;
      if (langName.toLowerCase() === 'select language') return;

      languagesList.push({
        code: opt.value,
        name: langName
      });
    });

    if (!languagesList.some(l => l.code === 'en')) {
      languagesList.unshift({ code: 'en', name: 'English' });
    }

    // Sort languages alphabetically
    languagesList.sort((a, b) => a.name.localeCompare(b.name));

    // Find active language object
    let activeLang = languagesList.find(l => l.code === activeLangCode) || { code: 'en', name: 'English' };

    // Create custom dropdown HTML elements
    const dropdownWrap = document.createElement('div');
    dropdownWrap.className = 'custom-translate-dropdown';

    const btn = document.createElement('button');
    btn.className = 'custom-translate-btn';
    btn.type = 'button';

    const btnFlagContainer = createFlagContainer(activeLang.code, activeLang.name, true);

    const btnText = document.createElement('span');
    btnText.className = 'btn-text';
    btnText.textContent = activeLang.name;

    const chevron = document.createElement('i');
    chevron.className = 'bi bi-chevron-down chevron-icon';

    btn.appendChild(btnFlagContainer);
    btn.appendChild(btnText);
    btn.appendChild(chevron);

    const menu = document.createElement('div');
    menu.className = 'custom-translate-menu';

    const searchWrap = document.createElement('div');
    searchWrap.className = 'custom-translate-search-wrap';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'custom-translate-search';
    searchInput.placeholder = 'Search language...';

    searchWrap.appendChild(searchInput);
    menu.appendChild(searchWrap);

    const listUl = document.createElement('ul');
    listUl.className = 'custom-translate-list';

    languagesList.forEach(lang => {
      const flagCode = languageFlags[lang.code];

      // Remove languages that do not have a mapped flag image
      if (!flagCode) return;

      const li = document.createElement('li');
      li.setAttribute('data-lang', lang.code);
      if (lang.code === activeLang.code) {
        li.className = 'active';
      }

      const flagContainer = document.createElement('div');
      flagContainer.className = 'flag-container list-flag-container';

      const img = document.createElement('img');
      img.className = 'flag-img';
      img.src = `https://flagcdn.com/w40/${flagCode}.png`;
      img.alt = lang.name;
      img.loading = 'lazy';

      // If flag image fails to load, remove the language option so only languages with valid flags are displayed
      img.onerror = () => {
        li.remove();
      };

      flagContainer.appendChild(img);

      const nameSpan = document.createElement('span');
      nameSpan.className = 'lang-name-text';
      nameSpan.textContent = lang.name;

      li.appendChild(flagContainer);
      li.appendChild(nameSpan);
      listUl.appendChild(li);

      // List item click handler
      li.addEventListener('click', () => {
        combo.value = lang.code;
        combo.dispatchEvent(new Event('change', { bubbles: true }));
        if (window.jQuery) {
          jQuery(combo).change();
        }

        // Update UI
        updateButtonFlag(btn, lang.code, lang.name);
        btnText.textContent = lang.name;

        // Mark active item
        menu.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        li.className = 'active';

        // Close menu
        menu.classList.remove('show');
        dropdownWrap.classList.remove('open');
        searchInput.value = '';
        listUl.querySelectorAll('li').forEach(item => item.style.display = 'flex');
      });
    });

    menu.appendChild(listUl);
    dropdownWrap.appendChild(btn);
    dropdownWrap.appendChild(menu);

    // Append dropdown to container
    container.parentNode.insertBefore(dropdownWrap, container);

    // Toggle menu visibility
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('show');

      menu.classList.toggle('show');
      dropdownWrap.classList.toggle('open');

      if (!isOpen) {
        searchInput.focus();
      }
    });

    // Search input filter logic
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const items = listUl.querySelectorAll('li');

      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!dropdownWrap.contains(e.target)) {
        menu.classList.remove('show');
        dropdownWrap.classList.remove('open');
      }
    });
  }

  // Initialize monitoring
  function init() {
    let checkInterval = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo');
      const container = document.getElementById('google_translate_element');

      if (combo && container && combo.options && combo.options.length > 1) {
        clearInterval(checkInterval);
        buildCustomDropdown(combo, container);
      }
    }, 150);

    setTimeout(() => {
      clearInterval(checkInterval);
    }, 15000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
