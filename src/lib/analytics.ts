// Google Analytics 4 tracking utilities

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

type CustomEvent = {
  eventName: string;
  params?: Record<string, string | number | boolean>;
};

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  // gtag stub: MUST push the native `arguments` object — gtag.js processes
  // entries via `entry.callee`/Arguments-shape detection and silently ignores
  // plain Arrays (which is what `(...args) => dataLayer.push(args)` produces).
  // Using `function(){...}` instead of an arrow keeps `arguments` valid.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    } as Window['gtag'];
  }

  // Consent Mode v2: GA4 properties created in 2024+ default to "implicit denied"
  // for EEA visitors, which silently drops every hit until consent is signalled.
  // Our cookie banner only calls initGA() after the user accepts, so we explicitly
  // grant analytics + ad storage here.
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  // Now load gtag.js — queued calls above replay once it's ready.
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
};

// Track page view
export const trackPageView = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackCustomEvent = ({ eventName, params = {} }: CustomEvent) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
};

// CTA events
export const trackCTAClick = (ctaName: string, location: string) => {
  trackCustomEvent({
    eventName: 'cta_click',
    params: {
      cta_name: ctaName,
      cta_location: location,
    },
  });
};

// Extend window interface for gtag
declare global {
  interface Window {
    gtag: (command: string, ...args: (string | Date | Record<string, string | number | boolean>)[]) => void;
    dataLayer: unknown[];
  }
}
