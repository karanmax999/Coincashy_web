'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Please enter your username or email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication processing
    setTimeout(() => {
      setIsLoading(false);
      // For now, redirect to dashboard or show simulated logged-in state
      router.push('/dashboard');
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
      {/* Mobile Branding (only visible on smaller screens) */}
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

      {/* Header */}
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
          Login
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--low)', lineHeight: 1.5 }}>
          Enter your credentials to access your trading workspace and accounts.
        </p>
      </div>

      {/* Error Alert */}
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

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Username / Email Field */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label
            htmlFor="identifier"
            style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--fg)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            Username
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="identifier"
              type="text"
              name="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Username or work email"
              autoComplete="username"
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
                transition: 'border-color 0.2s, box-shadow 0.2s',
                outline: 'none',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-2)')}
            />
          </div>
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label
              htmlFor="password"
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--fg)',
                letterSpacing: '-0.01em',
              }}
            >
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              style={{
                fontSize: '0.8rem',
                color: 'var(--jade-text-d)',
                fontWeight: 500,
                transition: 'opacity 0.2s',
              }}
              className="hover:underline"
            >
              Reset password
            </Link>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                height: '48px',
                padding: '0 3rem 0 1rem',
                borderRadius: '12px',
                background: 'var(--surface-2)',
                border: '1px solid var(--line-2)',
                color: 'var(--fg)',
                fontSize: '0.92rem',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                outline: 'none',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-2)')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--fg-dim)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg className="ic" style={{ width: 18, height: 18 }}>
                <use href={showPassword ? '#i-eye' : '#i-eye'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.75rem' }}>
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '4px',
              accentColor: 'var(--accent)',
              cursor: 'pointer',
            }}
          />
          <label htmlFor="remember" style={{ fontSize: '0.82rem', color: 'var(--low)', cursor: 'pointer', userSelect: 'none' }}>
            Remember this device for 30 days
          </label>
        </div>

        {/* Submit Button */}
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
          {isLoading ? (
            <>
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid currentColor',
                  borderRightColor: 'transparent',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.6s linear infinite',
                }}
              />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Next</span>
              <svg className="ic" aria-hidden="true" style={{ width: 16, height: 16 }}><use href="#i-arrow-right" /></svg>
            </>
          )}
        </button>
      </form>

      {/* Alternative SSO / Passkey */}
      <div style={{ margin: '1.75rem 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
        <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-faint)' }}>or</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
      </div>

      <button
        type="button"
        onClick={() => router.push('/dashboard')}
        className="btn btn-line"
        style={{
          width: '100%',
          height: '44px',
          borderRadius: '12px',
          fontSize: '0.88rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-lock" /></svg>
        <span>Sign in with Passkey / Security Key</span>
      </button>

      {/* Bottom Switcher */}
      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--low)' }}>
        New user?{' '}
        <Link
          href="/auth/signup"
          style={{
            color: 'var(--jade-text-d)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
          className="hover:underline"
        >
          Sign up
        </Link>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
