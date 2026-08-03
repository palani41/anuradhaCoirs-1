(function() {
    const CONSENT_KEY = 'ac_cookie_consent';

    // Check if consent has already been given or denied
    if (localStorage.getItem(CONSENT_KEY)) {
        return;
    }

    // Add styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .cc-banner-container {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #f8f9fa;
            border-top: 1px solid #e9ecef;
            box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
            z-index: 999999;
            padding: 20px 0;
            font-family: inherit;
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cc-banner-container.cc-show {
            transform: translateY(0);
        }
        .cc-banner-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
        .cc-text {
            color: #333;
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0;
        }
        .cc-buttons {
            display: flex;
            gap: 12px;
            flex-shrink: 0;
        }
        .cc-btn {
            padding: 10px 24px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
        }
        .cc-btn:active {
            transform: scale(0.97);
        }
        .cc-btn-accept {
            background-color: #28a745;
            color: #fff;
            box-shadow: 0 4px 6px rgba(40, 167, 69, 0.2);
        }
        .cc-btn-accept:hover {
            background-color: #218838;
            box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);
        }
        .cc-btn-reject {
            background-color: #e9ecef;
            color: #495057;
        }
        .cc-btn-reject:hover {
            background-color: #dde0e3;
        }
        @media (max-width: 768px) {
            .cc-banner-inner {
                flex-direction: column;
                text-align: center;
            }
            .cc-buttons {
                width: 100%;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);

    // Create banner HTML
    const banner = document.createElement('div');
    banner.className = 'cc-banner-container';
    banner.innerHTML = `
        <div class="cc-banner-inner">
            <p class="cc-text">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
            </p>
            <div class="cc-buttons">
                <button id="cc-btn-reject" class="cc-btn cc-btn-reject">Reject</button>
                <button id="cc-btn-accept" class="cc-btn cc-btn-accept">Accept</button>
            </div>
        </div>
    `;

    function hideBanner() {
        banner.classList.remove('cc-show');
        setTimeout(() => {
            if(banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 400); // Wait for transition
    }

    function initBanner() {
        document.body.appendChild(banner);
        
        // Trigger animation
        setTimeout(() => {
            banner.classList.add('cc-show');
        }, 100);

        // Event listeners
        document.getElementById('cc-btn-accept').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            hideBanner();
        });

        document.getElementById('cc-btn-reject').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'rejected');
            hideBanner();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBanner);
    } else {
        initBanner();
    }
})();
