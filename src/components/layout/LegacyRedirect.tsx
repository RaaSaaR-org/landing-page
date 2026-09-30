import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

/** Static export has no server redirects, so moved pages point crawlers and visitors at their new URL. */
export function legacyRedirectMetadata(target: string): Metadata {
  return {
    alternates: { canonical: `${SITE_URL}${target}` },
  };
}

export function LegacyRedirect({ target }: { target: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(target)} + window.location.search + window.location.hash);` }} />
      <p className="p-8"><a href={target} className="text-primary-400 underline">{target}</a></p>
    </>
  );
}
