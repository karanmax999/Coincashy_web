'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Please provide your username or email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div
      style={{
        padding: 'clamp(2rem, 5vw, 2.75rem)',
        borderRadius: '24px',
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--shadow)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Mobile Branding */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }} className="lg:hidden">
        <Link href="/" style={{ display: 'inline-block' }}>
          <Image
            src="/media/logo-white.png"
            alt="Coincashy"
            width={130}
            height={30}
            style={{ height: '30px', width: 'auto' }}
            className="logo-on-dark"
          />
          <Image
            src="/media/logo-black.png"
            alt="Coincashy"
            width={130}
            height={30}
            style={{ height: '30px', width: 'auto' }}
            className="logo-on-paper"
          />
        </Link>
      </div>

      {isSubmitted ? (
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(39, 161, 127, 0.15)',
              color: 'var(--coin-usdt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              border: '1px solid rgba(39, 161, 127, 0.3)',
            }}
          >
            <svg className="ic" style={{ width: 28, height: 28 }}><use href="#i-check" /></svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--hi)', marginBottom: '0.75rem' }}>
            Check your email
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--low)', lineHeight: 1.6, marginBottom: '2rem' }}>
            If an account exists for <b style={{ color: 'var(--fg)' }}>{identifier}</b>, we have dispatched a secure password reset link. Please check your inbox and spam folder.
          </p>
          <Link
            href="/auth/login"
            className="btn btn-solid"
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Back to login
          </Link>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--hi)',
                marginBottom: '0.5rem',
              }}
            >
              Reset password
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--low)', lineHeight: 1.5 }}>
              Enter your verified email or username and we'll send a secure link to reset your account password.
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: 'rgba(242, 154, 136, 0.12)',
                border: '1px solid var(--coral)',
                color: 'var(--coral)',
                fontSize: '0.84rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg className="ic" style={{ width: 16, height: 16, flexShrink: 0 }}><use href="#i-x" /></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '1.75rem' }}>
              <label
                htmlFor="reset-identifier"
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--fg)',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Username or Email
              </label>
              <input
                id="reset-identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Username or work email"
                autoComplete="email"
                required
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 1rem',
                  borderRadius: '12px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line-2)',
                  color: 'var(--fg)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-2)')}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-solid"
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: isLoading ? 'wait' : 'pointer',
                opacity: isLoading ? 0.75 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isLoading ? 'Sending link...' : 'Send reset link'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
            <Link
              href="/auth/login"
              style={{
                color: 'var(--fg-dim)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              className="hover:text-[var(--fg)]"
            >
              <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-chevron-left" /></svg>
              <span>Back to login</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
