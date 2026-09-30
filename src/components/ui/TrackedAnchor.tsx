'use client';

import type { ReactNode } from 'react';
import { trackCTAClick } from '@/lib/analytics';

interface TrackedAnchorProps {
  href: string;
  /** CTA label reported to analytics. */
  label: string;
  /** Where on the site the CTA sits, e.g. "sovereignty". */
  location: string;
  className?: string;
  children: ReactNode;
}

/** Plain anchor that reports CTA clicks, so otherwise static sections can stay server components. */
export function TrackedAnchor({ href, label, location, className, children }: TrackedAnchorProps) {
  return <a href={href} onClick={() => trackCTAClick(label, location)} className={className}>{children}</a>;
}
