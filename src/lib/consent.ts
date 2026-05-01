// Tiny consent state stored in localStorage. Read sync on mount, write on user action.
// Pre-decision = no analytics tracking. Default-private.

export type ConsentDecision = 'accepted' | 'rejected';

const STORAGE_KEY = 'emai-consent-v1';
const EVENT = 'emai-consent-change';

export function getStoredConsent(): ConsentDecision | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'accepted' || v === 'rejected') return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function setStoredConsent(decision: ConsentDecision): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, decision);
    window.dispatchEvent(new CustomEvent(EVENT, { detail: decision }));
  } catch {
    /* ignore */
  }
}

export function onConsentChange(handler: (decision: ConsentDecision) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<ConsentDecision>).detail;
    if (detail === 'accepted' || detail === 'rejected') handler(detail);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
