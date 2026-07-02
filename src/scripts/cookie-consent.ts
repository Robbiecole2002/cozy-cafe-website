export {};

const STORAGE_KEY = 'cozycafe-cookie-consent';

function activateConsentedScripts() {
  document.querySelectorAll<HTMLScriptElement>('script[data-consent="analytics"]').forEach((old) => {
    const replacement = document.createElement('script');
    for (const attr of Array.from(old.attributes)) {
      if (attr.name === 'type' || attr.name === 'data-src' || attr.name === 'data-consent') continue;
      replacement.setAttribute(attr.name, attr.value);
    }
    const src = old.getAttribute('data-src');
    if (src) {
      replacement.src = src;
    } else {
      replacement.textContent = old.textContent;
    }
    old.replaceWith(replacement);
  });
}

function init() {
  const banner = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  if (!banner) return;

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === 'accepted') {
    activateConsentedScripts();
    return;
  }

  if (stored === 'rejected') {
    return;
  }

  banner.hidden = false;

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    banner.hidden = true;
    activateConsentedScripts();
  });

  rejectBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    banner.hidden = true;
  });
}

init();
