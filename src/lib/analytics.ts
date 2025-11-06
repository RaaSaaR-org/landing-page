// Google Analytics 4 tracking utilities

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

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

// Track standard events
export const trackEvent = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  const params: Record<string, string | number | boolean> = {
    event_category: category,
  };
  if (label) params.event_label = label;
  if (value !== undefined) params.value = value;

  window.gtag('event', action, params);
};

// Track custom events
export const trackCustomEvent = ({ eventName, params = {} }: CustomEvent) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
};

// ROI Calculator events
export const trackROICalculatorStart = () => {
  trackCustomEvent({
    eventName: 'roi_calculator_start',
    params: { engagement_type: 'calculator_interaction' },
  });
};

export const trackROICalculatorComplete = (calculatedROI: number) => {
  trackCustomEvent({
    eventName: 'roi_calculator_complete',
    params: {
      engagement_type: 'calculator_interaction',
      roi_value: calculatedROI,
    },
  });
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

// Demo booking events
export const trackDemoRequest = (source: string) => {
  trackCustomEvent({
    eventName: 'demo_request',
    params: {
      source: source,
      engagement_type: 'lead_generation',
    },
  });
};

// Video play events
export const trackVideoPlay = (videoName: string) => {
  trackCustomEvent({
    eventName: 'video_play',
    params: {
      video_name: videoName,
      engagement_type: 'media_interaction',
    },
  });
};

// Form submission events
export const trackFormSubmission = (formName: string, formType: string) => {
  trackCustomEvent({
    eventName: 'form_submission',
    params: {
      form_name: formName,
      form_type: formType,
      engagement_type: 'lead_generation',
    },
  });
};

// Download events
export const trackDownload = (fileName: string) => {
  trackCustomEvent({
    eventName: 'file_download',
    params: {
      file_name: fileName,
      engagement_type: 'content_download',
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
