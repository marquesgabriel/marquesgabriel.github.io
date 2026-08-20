import { useEffect, useState } from 'react';

const CONSENT_STORAGE_KEY = 'marquesgabriel.github.io:cookie-consent';
const ADSENSE_PUBLISHER_ID = import.meta.env.REACT_APP_ADSENSE_PUBLISHER_ID;

type Consent = 'accepted' | 'declined' | null;

function loadConsent(): Consent {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'accepted' || stored === 'declined' ? stored : null;
  } catch {
    return null;
  }
}

// AdSense's script must only load after the user consents (legal
// requirement, not just a nicety) — same pattern as mtg's SupportSidebar.
function AdSlot() {
  useEffect(() => {
    if (!ADSENSE_PUBLISHER_ID) return;

    if (!document.querySelector('script[data-adsbygoogle-loader]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-adsbygoogle-loader', 'true');
      document.head.appendChild(script);
    }

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense script failed to initialize the slot — nothing to recover here
    }
  }, []);

  return (
    <div className="support-sidebar__ad-slot">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export const SupportSidebar = () => {
  // No Publisher ID configured (e.g. local dev without the build var set) —
  // render nothing rather than showing a consent prompt for ads that can't load.
  const [consent, setConsent] = useState<Consent>(() => loadConsent());

  if (!ADSENSE_PUBLISHER_ID) return null;

  const handleConsent = (value: 'accepted' | 'declined') => {
    setConsent(value);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // localStorage unavailable — consent choice just won't persist across reloads
    }
  };

  return (
    <div className="support-sidebar">
      {consent === 'accepted' && <AdSlot />}

      {consent === null && (
        <div className="support-sidebar__consent">
          <p>This site can show ads to help support development. Accept cookies to enable them.</p>
          <div className="support-sidebar__consent-actions">
            <button type="button" className="btn btn-sm btn-primary" onClick={() => handleConsent('accepted')}>
              Accept
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleConsent('declined')}>
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
