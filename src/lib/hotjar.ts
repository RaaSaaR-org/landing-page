// Hotjar tracking utilities

export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '';
export const HOTJAR_SNIPPET_VERSION = 6;

// Initialize Hotjar
export const initHotjar = () => {
  if (!HOTJAR_ID || typeof window === 'undefined') return;

  const w = window as typeof window & {
    hj?: { q?: unknown[] };
    _hjSettings?: { hjid: string | number; hjsv: number };
  };

  w.hj =
    w.hj ||
    function (...args: unknown[]) {
      (w.hj!.q = w.hj!.q || []).push(args);
    };
  w._hjSettings = { hjid: HOTJAR_ID, hjsv: HOTJAR_SNIPPET_VERSION };
  const a = document.getElementsByTagName('head')[0];
  const r = document.createElement('script');
  r.async = true;
  r.src = `https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=${HOTJAR_SNIPPET_VERSION}`;
  a.appendChild(r);
};

// Trigger Hotjar events
export const triggerHotjarEvent = (eventName: string) => {
  if (typeof window === 'undefined' || !window.hj) return;
  window.hj('event', eventName);
};

// Identify users (for authenticated sessions)
export const identifyHotjarUser = (userId: string, attributes: Record<string, string | number | boolean> = {}) => {
  if (typeof window === 'undefined' || !window.hj) return;
  window.hj('identify', userId, attributes);
};

// Tag recordings
export const tagHotjarRecording = (tags: string[]) => {
  if (typeof window === 'undefined' || !window.hj) return;
  tags.forEach(tag => {
    window.hj('tagRecording', [tag]);
  });
};

// Extend window interface for Hotjar
declare global {
  interface Window {
    hj: (command: string, ...args: (string | string[] | Record<string, string | number | boolean>)[]) => void;
    _hjSettings: {
      hjid: string | number;
      hjsv: number;
    };
  }
}
