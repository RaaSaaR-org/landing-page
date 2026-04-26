// Google Analytics 4 tracking utilities

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

type CustomEvent = {
  eventName: string;
  params?: Record<string, string | number | boolean>;
};

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
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
