'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleToggleTheme = () => {
    if (typeof window !== 'undefined' && window.__toggleTheme) {
      window.__toggleTheme();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--ground)', color: 'var(--fg)', position: 'relative' }}>
      
      {/* ============ LEFT SHOWCASE PANE (Desktop >= 1024px) ============ */}
      <aside
        style={{
          flex: '1 1 50%',
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(2.5rem, 5vw, 4.5rem)',
          background: 'linear-gradient(170deg, #070709 0%, #000000 100%)',
          borderRight: '1px solid var(--line)',
          position: 'relative',
          overflow: 'hidden',
          color: '#ffffff',
        }}
        className="auth-showcase-pane"
      >
        {/* Background Visual Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 0, 255, 0.22) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(226, 184, 102, 0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <g fill="none" stroke="currentColor" strokeWidth={1}>
            <circle cx={400} cy={400} r={180} />
            <circle cx={400} cy={400} r={280} />
            <circle cx={400} cy={400} r={380} />
            <circle cx={400} cy={400} r={480} />
          </g>
        </svg>

        {/* Top Header & Brand */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Link href="/" aria-label="Back to Coincashy home" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <Image src="/media/logo-white.png" alt="Coincashy" width={140} height={32} style={{ height: '32px', width: 'auto' }} priority />
          </Link>
          
          <div style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', fontSize: '0.8rem', color: '#fff', fontWeight: 500, backdropFilter: 'blur(10px)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--coin-usdt)', boxShadow: '0 0 10px var(--coin-usdt)' }} />
            <span>Polish VASP Registered · KRS: 0001135823 · EU MiCA</span>
          </div>
        </div>

        {/* Middle Value Proposition */}
        <div style={{ position: 'relative', zIndex: 2, margin: '2rem 0' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            The institutional gateway for European <em>crypto-fiat settlement.</em>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '520px', margin: 0 }}>
            Access deep institutional liquidity, automated SEPA Instant clearing, and dedicated multi-currency virtual IBANs from a single regulated workspace.
          </p>
        </div>

        {/* Bottom Institutional Trust Seals */}
        <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="ic" style={{ width: 14, height: 14, color: 'var(--coin-usdt)' }}><use href="#i-check" /></svg>
              <span>BitGo &amp; Utila MPC Custody</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="ic" style={{ width: 14, height: 14, color: 'var(--coin-usdt)' }}><use href="#i-check" /></svg>
              <span>1:1 Segregated Fiat Safeguarding</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="ic" style={{ width: 14, height: 14, color: 'var(--coin-usdt)' }}><use href="#i-check" /></svg>
              <span>SEPA Instant &amp; FPS Clearing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg className="ic" style={{ width: 14, height: 14, color: 'var(--coin-usdt)' }}><use href="#i-check" /></svg>
              <span>Real-Time AML Screening</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ============ RIGHT FORM PANE ============ */}
      <main
        style={{
          flex: '1 1 50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          background: 'var(--ground)',
        }}
      >
        {/* Top Bar: Return Link + Theme Switcher */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem',
              color: 'var(--fg-dim)',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            className="hover:text-[var(--fg)]"
          >
            <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-chevron-left" /></svg>
            <span>Back to coincashy.io</span>
          </Link>

          <button
            className="theme-btn"
            type="button"
            data-theme-toggle
            aria-label="Switch to light mode"
            title="Switch theme"
            onClick={handleToggleTheme}
          >
            <svg className="ic ic-sun" aria-hidden="true"><use href="#i-sun" /></svg>
            <svg className="ic ic-moon" aria-hidden="true"><use href="#i-moon" /></svg>
          </button>
        </header>

        {/* Centered Form Wrapper */}
        <div style={{ width: '100%', maxWidth: '440px', margin: 'auto' }}>
          {children}
        </div>

        {/* Security Trust Footnote */}
        <footer style={{ width: '100%', maxWidth: '480px', margin: '2rem auto 0', textAlign: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--fg-faint)', justifyContent: 'center' }}>
            <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-lock" /></svg>
            <span>256-bit TLS Encryption · ISO 27001 Aligned · Polish VASP KRS 0001135823</span>
          </div>
        </footer>
      </main>

      {/* Responsive Style to display showcase pane on >= 1024px */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .auth-showcase-pane {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
