import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="de" className="dark">
      <body
        style={{
          background: '#141414',
          color: '#F5F5F4',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          margin: 0,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '5rem',
            fontWeight: 700,
            color: 'rgba(255, 103, 0, 0.4)',
            marginBottom: '1rem',
            lineHeight: 1,
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Seite nicht gefunden / Page not found
        </h1>
        <p style={{ color: '#A8A29E', maxWidth: '40rem', marginBottom: '2rem' }}>
          Die angefragte Seite existiert nicht. The requested page does not exist.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/de"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              background: '#FF6700',
              color: '#fff',
              borderRadius: '0.75rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Zur Startseite (DE)
          </Link>
          <Link
            href="/en"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              border: '1px solid #2A2A2A',
              color: '#F5F5F4',
              borderRadius: '0.75rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Back to home (EN)
          </Link>
        </div>
      </body>
    </html>
  );
}
