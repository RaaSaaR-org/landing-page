'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, trackPageView } from '@/lib/analytics';
import { initHotjar } from '@/lib/hotjar';
import { getStoredConsent, onConsentChange, type ConsentDecision } from '@/lib/consent';

function AnalyticsTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!enabled || !pathname) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [enabled, pathname, searchParams]);

  return null;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentDecision | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Read consent on mount + listen for changes
  useEffect(() => {
    setConsent(getStoredConsent());
    const off = onConsentChange((next) => setConsent(next));
    return off;
  }, []);

  // Initialize GA + Hotjar exactly once after the user accepts
  useEffect(() => {
    if (consent === 'accepted' && !initialized) {
      initGA();
      initHotjar();
      setInitialized(true);
    }
  }, [consent, initialized]);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker enabled={initialized} />
      </Suspense>
      {children}
    </>
  );
}
