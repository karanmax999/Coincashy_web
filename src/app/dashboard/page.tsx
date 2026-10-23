'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type DashboardTab = 
  | 'overview' 
  | 'transactions' 
  | 'convert' 
  | 'buy' 
  | 'crypto-deposit' 
  | 'crypto-withdraw' 
  | 'fiat-deposit' 
  | 'fiat-withdraw' 
  | 'guest-deposit' 
  | 'orders' 
  | 'wallets' 
  | 'bank-accounts' 
  | 'profile';

type ProfileSubTab = 'entity' | 'security' | 'limits' | 'preferences' | 'api';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [profileSubTab, setProfileSubTab] = useState<ProfileSubTab>('entity');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Profile interactive state
  const [copiedUid, setCopiedUid] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [autoSettle, setAutoSettle] = useState(false);
  const [telegramAlerts, setTelegramAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [baseCurrency, setBaseCurrency] = useState<'EUR' | 'USD' | 'PLN' | 'CHF' | 'GBP'>('EUR');
  const [sessionsRevoked, setSessionsRevoked] = useState(false);

  // 12 operational menu items (Profile is accessed via the bottom user card)
  const menuItems = [
    { id: 'overview' as DashboardTab, label: 'Dashboard', icon: '#i-store' },
    { id: 'transactions' as DashboardTab, label: 'Transaction history', icon: '#i-receipt' },
    { id: 'convert' as DashboardTab, label: 'Convert', icon: '#i-repeat' },
    { id: 'buy' as DashboardTab, label: 'Buy Crypto', icon: '#i-credit-card' },
    { id: 'crypto-deposit' as DashboardTab, label: 'Crypto Deposit', icon: '#i-arrow-down-left' },
    { id: 'crypto-withdraw' as DashboardTab, label: 'Crypto Withdrawals', icon: '#i-arrow-up-right' },
    { id: 'fiat-deposit' as DashboardTab, label: 'Add Funds (vIBAN)', icon: '#i-landmark' },
    { id: 'fiat-withdraw' as DashboardTab, label: 'Fiat Withdrawals', icon: '#i-banknote' },
    { id: 'guest-deposit' as DashboardTab, label: 'Guests Deposits', icon: '#i-users' },
    { id: 'orders' as DashboardTab, label: 'Conversions History', icon: '#i-chart-candlestick' },
    { id: 'wallets' as DashboardTab, label: 'Address Book', icon: '#i-wallet' },
    { id: 'bank-accounts' as DashboardTab, label: 'Bank Accounts', icon: '#i-landmark' },
  ];

  const handleCopyUid = () => {
    navigator.clipboard?.writeText('CC-94821');
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard?.writeText('cc_live_94821a8f9b2047d1bce8');
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const handleToggleTheme = () => {
    if (typeof window !== 'undefined' && window.__toggleTheme) {
      window.__toggleTheme();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ground)', color: 'var(--fg)', fontFamily: 'var(--f-body)' }}>
      
      {/* ============ SIDEBAR ============ */}
      <aside
        style={{
          width: '280px',
          background: 'var(--surface)',
          borderRight: '1px solid var(--line)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
        }}
        className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        <div>
          {/* Logo & Portal Badge */}
          <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid var(--line)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src="/media/logo-white.png"
                alt="Coincashy"
                width={125}
                height={28}
                style={{ height: '28px', width: 'auto' }}
                className="logo-on-dark"
              />
              <Image
                src="/media/logo-black.png"
                alt="Coincashy"
                width={125}
                height={28}
                style={{ height: '28px', width: 'auto' }}
                className="logo-on-paper"
              />
            </Link>
            <div style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--jade-text-d)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <span className="dot live" style={{ width: 6, height: 6 }} />
              <span>Trading &amp; Treasury Portal</span>
            </div>
          </div>

          {/* Navigation Links (12 Operational Modules) */}
          <nav style={{ padding: '0.75rem', overflowY: 'auto', maxHeight: 'calc(100vh - 180px)' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '0.86rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'var(--hi)' : 'var(--fg-dim)',
                        background: isActive ? 'var(--surface-2)' : 'transparent',
                        border: isActive ? '1px solid var(--line-2)' : '1px solid transparent',
                        transition: 'all 0.15s ease',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <svg className="ic" style={{ width: 16, height: 16, color: isActive ? 'var(--jade-text-d)' : 'currentColor' }}>
                        <use href={item.icon} />
                      </svg>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* User Account / Profile Navigation Trigger (Clickable) */}
        <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid var(--line)', background: 'var(--surface-2)' }}>
          <button
            type="button"
            onClick={() => {
              setActiveTab('profile');
              setSidebarOpen(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: '12px',
              background: activeTab === 'profile' ? 'var(--surface)' : 'transparent',
              border: activeTab === 'profile' ? '1px solid var(--jade-text-d)' : '1px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease',
              boxShadow: activeTab === 'profile' ? '0 2px 10px rgba(39, 161, 127, 0.15)' : 'none',
            }}
            title="Open Corporate Profile & Organization Command"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--jade), var(--brass))',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                  boxShadow: activeTab === 'profile' ? '0 0 0 2px var(--jade-text-d)' : 'none',
                }}
              >
                CC
              </div>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--hi)' }}>Corporate Desk</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--jade-text-d)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coin-usdt)' }} />
                  <span>Verified KYB Tier-2</span>
                </div>
              </div>
            </div>
            <svg
              className="ic"
              style={{
                width: 16,
                height: 16,
                color: activeTab === 'profile' ? 'var(--jade-text-d)' : 'var(--fg-faint)',
                transform: activeTab === 'profile' ? 'translateX(2px)' : 'none',
                transition: 'transform 0.15s ease',
              }}
            >
              <use href="#i-chevron-right" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ============ MAIN CONTENT AREA ============ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Header */}
        <header
          style={{
            height: '64px',
            borderBottom: '1px solid var(--line)',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(1rem, 3vw, 2rem)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
              style={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--surface-2)',
                color: 'var(--fg)',
                cursor: 'pointer',
              }}
              aria-label="Toggle Navigation"
            >
              <svg className="ic" style={{ width: 18, height: 18 }}><use href="#i-layers" /></svg>
            </button>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)', textTransform: 'capitalize' }}>
              {activeTab === 'profile' ? 'Corporate Profile & Treasury Command' : menuItems.find((m) => m.id === activeTab)?.label}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '999px', background: 'var(--surface-2)', border: '1px solid var(--line)', fontSize: '0.75rem', color: 'var(--coin-usdt)', fontWeight: 500 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coin-usdt)' }} />
              <span>VASP Regulated (KRS: 0001135823)</span>
            </div>

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

            <Link
              href="/"
              style={{
                fontSize: '0.82rem',
                color: 'var(--fg-dim)',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                background: 'var(--surface-2)',
              }}
            >
              Public Site ↗
            </Link>
          </div>
        </header>

        {/* Main View Container */}
        <main style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          
          {/* ============ OVERVIEW TAB ============ */}
          {activeTab === 'overview' && (
            <div>
              {/* Balances Card */}
              <div style={{ padding: '2rem', borderRadius: '20px', background: 'linear-gradient(145deg, var(--surface), var(--surface-2))', border: '1px solid var(--line)', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(circle at top right, rgba(0,0,255,0.12), transparent 70%)', pointerEvents: 'none' }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-faint)', fontFamily: 'var(--f-mono)' }}>
                        TOTAL PORTFOLIO VALUATION
                      </span>
                      <div className="display mono num" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', fontWeight: 600, color: 'var(--hi)', marginTop: '0.25rem' }}>
                        €128,450.00
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--coin-usdt)', marginTop: '0.25rem', fontWeight: 500 }}>
                        <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-check" /></svg>
                        <span>+2.4% past 24 hours · Real-time DIA valuation</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button type="button" onClick={() => setActiveTab('convert')} className="btn btn-solid btn-sm">
                        <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-repeat" /></svg>
                        Convert
                      </button>
                      <button type="button" onClick={() => setActiveTab('fiat-deposit')} className="btn btn-line btn-sm">
                        <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-landmark" /></svg>
                        Add Funds (vIBAN)
                      </button>
                      <button type="button" onClick={() => setActiveTab('crypto-deposit')} className="btn btn-line btn-sm">
                        <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-arrow-down-left" /></svg>
                        Deposit Crypto
                      </button>
                    </div>
                  </div>

                  {/* Asset Breakdown Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                      <div style={{ fontSize: '0.76rem', color: 'var(--fg-faint)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>EUR Virtual IBAN</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--hi)' }}>€42,100.00</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--fg-dim)' }}>SEPA Instant Active</div>
                    </div>
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                      <div style={{ fontSize: '0.76rem', color: 'var(--fg-faint)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Bitcoin (BTC)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--hi)' }}>1.0245 BTC</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--fg-dim)' }}>≈ €81,320.00</div>
                    </div>
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                      <div style={{ fontSize: '0.76rem', color: 'var(--fg-faint)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Tether (USDT)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 650, color: 'var(--hi)' }}>5,030.00 USDT</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--fg-dim)' }}>TRC-20 &amp; ERC-20</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)' }}>Recent Activity</h2>
                  <button type="button" onClick={() => setActiveTab('transactions')} style={{ fontSize: '0.82rem', color: 'var(--jade-text-d)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                    View all transactions →
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left', color: 'var(--fg-faint)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Type</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Asset / Pair</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Date &amp; Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>vIBAN Deposit</td>
                        <td style={{ padding: '1rem' }}>EUR (SEPA Instant)</td>
                        <td style={{ padding: '1rem', color: 'var(--coin-usdt)', fontWeight: 600 }}>+€16,820.00</td>
                        <td style={{ padding: '1rem' }}><span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontSize: '0.75rem', fontWeight: 600 }}>Settled</span></td>
                        <td style={{ padding: '1rem', color: 'var(--fg-dim)', fontSize: '0.82rem' }}>Today, 14:22</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>RFQ Conversion</td>
                        <td style={{ padding: '1rem' }}>BTC → USDT</td>
                        <td style={{ padding: '1rem' }}>0.25 BTC → 21,074 USDT</td>
                        <td style={{ padding: '1rem' }}><span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontSize: '0.75rem', fontWeight: 600 }}>Completed</span></td>
                        <td style={{ padding: '1rem', color: 'var(--fg-dim)', fontSize: '0.82rem' }}>Yesterday, 09:41</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>Crypto Withdrawal</td>
                        <td style={{ padding: '1rem' }}>USDT (ERC-20)</td>
                        <td style={{ padding: '1rem', color: 'var(--coral)', fontWeight: 600 }}>-5,000.00 USDT</td>
                        <td style={{ padding: '1rem' }}><span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontSize: '0.75rem', fontWeight: 600 }}>Settled</span></td>
                        <td style={{ padding: '1rem', color: 'var(--fg-dim)', fontSize: '0.82rem' }}>21 Oct, 18:05</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============ PROFILE TAB (Comprehensive Corporate Command) ============ */}
          {activeTab === 'profile' && (
            <div>
              {/* Header Hero Banner */}
              <div
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)',
                  border: '1px solid var(--line)',
                  marginBottom: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: '350px', height: '100%', background: 'radial-gradient(circle at top right, rgba(39, 161, 127, 0.15), transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div
                      style={{
                        width: 'clamp(56px, 6vw, 68px)',
                        height: 'clamp(56px, 6vw, 68px)',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, var(--jade), var(--brass))',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                        boxShadow: '0 8px 24px rgba(39, 161, 127, 0.25)',
                        flexShrink: 0,
                      }}
                    >
                      CC
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.75rem)', fontWeight: 600, color: 'var(--hi)' }}>
                          Alpha Treasury Partners Sp. z o.o.
                        </h2>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(39, 161, 127, 0.12)', border: '1px solid rgba(39, 161, 127, 0.25)', color: 'var(--coin-usdt)', fontSize: '0.75rem', fontWeight: 600 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coin-usdt)' }} />
                          Verified KYB Tier-2
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '0.5rem', flexWrap: 'wrap', fontSize: '0.84rem', color: 'var(--fg-dim)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>UID:</span>
                          <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--hi)', fontWeight: 600 }}>#CC-94821</span>
                          <button
                            type="button"
                            onClick={handleCopyUid}
                            style={{ background: 'none', border: 'none', color: copiedUid ? 'var(--coin-usdt)' : 'var(--fg-faint)', cursor: 'pointer', padding: '2px 4px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            title="Copy Account UID"
                          >
                            <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-copy" /></svg>
                            <span>{copiedUid ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <span>·</span>
                        <span>Poland (EU) · KRS: 0001092834</span>
                        <span>·</span>
                        <span>Primary Desk: desk@alphatrading.eu</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setProfileSubTab('limits')}
                      className="btn btn-solid btn-sm"
                    >
                      <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-arrow-up-right" /></svg>
                      Request Tier-3 Limit Upgrade
                    </button>
                    <Link
                      href="/auth/login"
                      className="btn btn-line btn-sm"
                      style={{ color: 'var(--coral)', borderColor: 'rgba(235, 87, 87, 0.3)' }}
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sub-Tab Navigation Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem', marginBottom: '2rem', overflowX: 'auto' }}>
                {[
                  { id: 'entity' as ProfileSubTab, label: 'Organization & KYB', icon: '#i-landmark' },
                  { id: 'security' as ProfileSubTab, label: 'Security & 2FA', icon: '#i-lock' },
                  { id: 'limits' as ProfileSubTab, label: 'Tier Limits & Allowances', icon: '#i-chart-candlestick' },
                  { id: 'preferences' as ProfileSubTab, label: 'Treasury Preferences', icon: '#i-credit-card' },
                  { id: 'api' as ProfileSubTab, label: 'API & Developer Keys', icon: '#i-code' },
                ].map((tab) => {
                  const isActive = profileSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setProfileSubTab(tab.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontSize: '0.86rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'var(--hi)' : 'var(--fg-dim)',
                        background: isActive ? 'var(--surface-2)' : 'transparent',
                        border: isActive ? '1px solid var(--line-2)' : '1px solid transparent',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <svg className="ic" style={{ width: 14, height: 14, color: isActive ? 'var(--jade-text-d)' : 'currentColor' }}>
                        <use href={tab.icon} />
                      </svg>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Content Grid: 2 Column (Content + Concierge Desk) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                
                {/* Left Primary Column (Takes 2/3 on desktop) */}
                <div style={{ flex: '1 1 65%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  
                  {/* ====== SUBTAB 1: ORGANIZATION & KYB ====== */}
                  {profileSubTab === 'entity' && (
                    <>
                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)' }}>Corporate Entity Profile</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '2px' }}>Verified legal entity data recorded under Polish VASP AML compliance.</p>
                          </div>
                          <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontWeight: 600 }}>
                            Active · Valid until Jan 2027
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                          <div>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Legal Entity Name</label>
                            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--hi)', marginTop: '4px' }}>Alpha Treasury Partners Sp. z o.o.</div>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Registration (KRS) / REGON</label>
                            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--hi)', marginTop: '4px', fontFamily: 'var(--f-mono)' }}>0001092834 / 382910482</div>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Tax Identification (NIP / VAT EU)</label>
                            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--hi)', marginTop: '4px', fontFamily: 'var(--f-mono)' }}>PL5272948210</div>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Country of Incorporation</label>
                            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--hi)', marginTop: '4px' }}>Poland (European Union)</div>
                          </div>
                          <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Registered Office Address</label>
                            <div style={{ fontSize: '0.92rem', color: 'var(--hi)', marginTop: '4px' }}>ul. Złota 59, Skylight Building, 00-120 Warsaw, Poland</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)', marginBottom: '1.25rem' }}>Primary Authorized Representative</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                          <div>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Representative Name</label>
                            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--hi)', marginTop: '4px' }}>Janusz Kowalczyk</div>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Role / Title</label>
                            <div style={{ fontSize: '0.92rem', color: 'var(--hi)', marginTop: '4px' }}>Managing Director &amp; Head of Treasury</div>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Authorized Email</label>
                            <div style={{ fontSize: '0.92rem', color: 'var(--hi)', marginTop: '4px' }}>desk@alphatrading.eu</div>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)' }}>Identity Verification</label>
                            <div style={{ fontSize: '0.85rem', color: 'var(--coin-usdt)', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-check" /></svg>
                              <span>Biometric Passport Cleared</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'var(--surface-2)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--hi)' }}>Coincashy Certified KYB Dossier</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--fg-dim)', marginTop: '2px' }}>Download your cryptographic certificate of compliance and banking attestation letter.</div>
                        </div>
                        <button type="button" className="btn btn-line btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-check" /></svg>
                          <span>Download PDF Letter</span>
                        </button>
                      </div>
                    </>
                  )}

                  {/* ====== SUBTAB 2: SECURITY & 2FA ====== */}
                  {profileSubTab === 'security' && (
                    <>
                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)' }}>Two-Factor Authentication (2FA)</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '2px' }}>Protects all withdrawals, address book modifications, and sensitive treasury commands.</p>
                          </div>
                          <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px', background: twoFactorEnabled ? 'rgba(39, 161, 127, 0.12)' : 'rgba(235, 87, 87, 0.12)', color: twoFactorEnabled ? 'var(--coin-usdt)' : 'var(--coral)', fontWeight: 600 }}>
                            {twoFactorEnabled ? 'Enabled & Enforced' : 'Disabled'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg className="ic" style={{ width: 18, height: 18, color: 'var(--coin-usdt)' }}><use href="#i-lock" /></svg>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--hi)' }}>Authenticator App (TOTP)</div>
                              <div style={{ fontSize: '0.76rem', color: 'var(--fg-dim)' }}>Google Authenticator, 1Password, or YubiKey OATH</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                            className="btn btn-line btn-sm"
                          >
                            {twoFactorEnabled ? 'Reconfigure' : 'Enable 2FA'}
                          </button>
                        </div>
                      </div>

                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)' }}>Hardware Security Keys &amp; Passkeys</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '2px' }}>FIDO2 / WebAuthn cryptographic hardware keys for institutional-grade protection.</p>
                          </div>
                          <button type="button" className="btn btn-solid btn-sm">
                            + Add Key
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg className="ic" style={{ width: 18, height: 18, color: 'var(--coin-usdt)' }}><use href="#i-check" /></svg>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--hi)' }}>Primary YubiKey 5C NFC</div>
                              <div style={{ fontSize: '0.76rem', color: 'var(--fg-dim)' }}>Added 14 Jan 2026 · Last used today at 14:10</div>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--coin-usdt)', fontWeight: 600 }}>Active</span>
                        </div>
                      </div>

                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)' }}>Active Sessions &amp; Device Audit</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '2px' }}>Currently authorized devices and access locations.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSessionsRevoked(true)}
                            className="btn btn-line btn-sm"
                            style={{ color: 'var(--coral)', borderColor: 'rgba(235, 87, 87, 0.3)' }}
                          >
                            {sessionsRevoked ? 'Sessions Revoked' : 'Revoke Other Sessions'}
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: '10px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                            <div>
                              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--hi)' }}>Warsaw, Poland · Chrome 124 (Windows 11)</div>
                              <div style={{ fontSize: '0.74rem', color: 'var(--fg-dim)' }}>IP: 185.190.41.*** · Current active session</div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--coin-usdt)', fontWeight: 600 }}>This Device</span>
                          </div>

                          {!sessionsRevoked && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: '10px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                              <div>
                                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--hi)' }}>Frankfurt, Germany · Safari (macOS)</div>
                                <div style={{ fontSize: '0.74rem', color: 'var(--fg-dim)' }}>IP: 91.132.88.*** · Last active 3 hours ago</div>
                              </div>
                              <span style={{ fontSize: '0.75rem', color: 'var(--fg-faint)' }}>Secondary Desk</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* ====== SUBTAB 3: TIER LIMITS & ALLOWANCES ====== */}
                  {profileSubTab === 'limits' && (
                    <>
                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)' }}>24-Hour Settlement Limit Utilization</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '2px' }}>Daily rolling volume across SEPA Instant, SWIFT wires, and MPC crypto transfers.</p>
                          </div>
                          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--hi)' }}>€42,100 / €250,000</span>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ width: '100%', height: '10px', borderRadius: '999px', background: 'var(--ground)', overflow: 'hidden', border: '1px solid var(--line)', marginBottom: '0.5rem' }}>
                          <div style={{ width: '16.8%', height: '100%', background: 'linear-gradient(90deg, var(--jade), var(--brass))', borderRadius: '999px' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--fg-faint)' }}>
                          <span>16.8% consumed today</span>
                          <span>Resets at 00:00 UTC</span>
                        </div>
                      </div>

                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)', marginBottom: '1.25rem' }}>Tier-2 Institutional Volume Matrix</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left', color: 'var(--fg-faint)', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                              <th style={{ padding: '0.65rem 0.75rem' }}>Rail</th>
                              <th style={{ padding: '0.65rem 0.75rem' }}>Daily Outbound</th>
                              <th style={{ padding: '0.65rem 0.75rem' }}>Monthly Cap</th>
                              <th style={{ padding: '0.65rem 0.75rem' }}>Single Ticket Cap</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: '1px solid var(--line)' }}>
                              <td style={{ padding: '0.85rem 0.75rem', fontWeight: 600 }}>SEPA Instant (EUR)</td>
                              <td style={{ padding: '0.85rem 0.75rem' }}>€250,000.00</td>
                              <td style={{ padding: '0.85rem 0.75rem' }}>€5,000,000.00</td>
                              <td style={{ padding: '0.85rem 0.75rem' }}>€100,000.00</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--line)' }}>
                              <td style={{ padding: '0.85rem 0.75rem', fontWeight: 600 }}>SWIFT Wire Inbound</td>
                              <td style={{ padding: '0.85rem 0.75rem', color: 'var(--coin-usdt)' }}>Unlimited</td>
                              <td style={{ padding: '0.85rem 0.75rem', color: 'var(--coin-usdt)' }}>Unlimited</td>
                              <td style={{ padding: '0.85rem 0.75rem', color: 'var(--coin-usdt)' }}>Unlimited</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--line)' }}>
                              <td style={{ padding: '0.85rem 0.75rem', fontWeight: 600 }}>Crypto MPC Custody</td>
                              <td style={{ padding: '0.85rem 0.75rem' }}>€500,000 eq.</td>
                              <td style={{ padding: '0.85rem 0.75rem' }}>€10,000,000 eq.</td>
                              <td style={{ padding: '0.85rem 0.75rem' }}>€250,000 eq.</td>
                            </tr>
                            <tr>
                              <td style={{ padding: '0.85rem 0.75rem', fontWeight: 600 }}>Instant RFQ Convert</td>
                              <td style={{ padding: '0.85rem 0.75rem' }}>€1,000,000.00</td>
                              <td style={{ padding: '0.85rem 0.75rem', color: 'var(--coin-usdt)' }}>Unlimited</td>
                              <td style={{ padding: '0.85rem 0.75rem' }}>€1,000,000.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(39, 161, 127, 0.08), rgba(226, 184, 102, 0.08))', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--hi)' }}>Need custom volume over €1,000,000 / day?</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--fg-dim)', marginTop: '2px' }}>Apply for Tier-3 Custom Liquidity with bilateral credit settlement and dedicated treasury lines.</div>
                        </div>
                        <button type="button" className="btn btn-solid btn-sm">
                          Contact Institutional Desk
                        </button>
                      </div>
                    </>
                  )}

                  {/* ====== SUBTAB 4: TREASURY PREFERENCES ====== */}
                  {profileSubTab === 'preferences' && (
                    <>
                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)', marginBottom: '1.25rem' }}>Default Settlement Currency</h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginBottom: '1rem' }}>Primary denomination for portfolio reporting, invoices, and automated quotes.</p>
                        
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          {(['EUR', 'USD', 'PLN', 'CHF', 'GBP'] as const).map((curr) => {
                            const isSelected = baseCurrency === curr;
                            return (
                              <button
                                key={curr}
                                type="button"
                                onClick={() => setBaseCurrency(curr)}
                                style={{
                                  padding: '8px 16px',
                                  borderRadius: '10px',
                                  border: isSelected ? '1px solid var(--jade-text-d)' : '1px solid var(--line)',
                                  background: isSelected ? 'var(--surface-2)' : 'var(--ground)',
                                  color: isSelected ? 'var(--hi)' : 'var(--fg-dim)',
                                  fontWeight: isSelected ? 600 : 500,
                                  cursor: 'pointer',
                                  fontSize: '0.86rem',
                                }}
                              >
                                {curr}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)', marginBottom: '1.25rem' }}>Automated Settlement Rules</h3>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--line)' }}>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--hi)' }}>Auto-Convert Incoming Crypto to EUR vIBAN</div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--fg-dim)' }}>Instantly execute RFQ convert for incoming USDT/USDC deposits and credit EUR balance.</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAutoSettle(!autoSettle)}
                            style={{
                              width: '44px',
                              height: '24px',
                              borderRadius: '999px',
                              background: autoSettle ? 'var(--jade)' : 'var(--line-2)',
                              position: 'relative',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'background 0.2s',
                            }}
                          >
                            <span style={{ position: 'absolute', top: 2, left: autoSettle ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--line)' }}>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--hi)' }}>Telegram Bot Instant Alerts</div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--fg-dim)' }}>Receive instant notifications in your private Telegram treasury group for filled orders.</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setTelegramAlerts(!telegramAlerts)}
                            style={{
                              width: '44px',
                              height: '24px',
                              borderRadius: '999px',
                              background: telegramAlerts ? 'var(--jade)' : 'var(--line-2)',
                              position: 'relative',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'background 0.2s',
                            }}
                          >
                            <span style={{ position: 'absolute', top: 2, left: telegramAlerts ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0' }}>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--hi)' }}>Email Wire Clearances &amp; Statements</div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--fg-dim)' }}>Daily MT940 / CAMT.053 accounting statements delivered to desk@alphatrading.eu.</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEmailAlerts(!emailAlerts)}
                            style={{
                              width: '44px',
                              height: '24px',
                              borderRadius: '999px',
                              background: emailAlerts ? 'var(--jade)' : 'var(--line-2)',
                              position: 'relative',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'background 0.2s',
                            }}
                          >
                            <span style={{ position: 'absolute', top: 2, left: emailAlerts ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ====== SUBTAB 5: API & DEVELOPER KEYS ====== */}
                  {profileSubTab === 'api' && (
                    <>
                      <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--hi)' }}>Institutional API Credentials</h3>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '2px' }}>REST &amp; WebSocket endpoints for programmatic quoting and treasury sweeping.</p>
                          </div>
                          <button type="button" className="btn btn-solid btn-sm">
                            + Generate Key
                          </button>
                        </div>

                        <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)', marginBottom: '1.25rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--hi)' }}>Production API Key #1 (Trading Desk)</div>
                            <span style={{ fontSize: '0.74rem', color: 'var(--coin-usdt)', fontWeight: 600 }}>Active</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-2)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                            <code style={{ fontSize: '0.82rem', fontFamily: 'var(--f-mono)', color: 'var(--hi)', flex: 1 }}>
                              cc_live_94821a8f9b2047d1bce8••••••••••••
                            </code>
                            <button
                              type="button"
                              onClick={handleCopyApiKey}
                              style={{ background: 'none', border: 'none', color: copiedApiKey ? 'var(--coin-usdt)' : 'var(--fg-dim)', cursor: 'pointer', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-copy" /></svg>
                              <span>{copiedApiKey ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)', display: 'block', marginBottom: '0.5rem' }}>
                            IP Address Whitelist (CIDR)
                          </label>
                          <input
                            type="text"
                            defaultValue="185.190.41.0/24, 91.132.88.14"
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              borderRadius: '8px',
                              border: '1px solid var(--line)',
                              background: 'var(--ground)',
                              color: 'var(--fg)',
                              fontSize: '0.85rem',
                              fontFamily: 'var(--f-mono)',
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Right Column: Dedicated OTC Concierge Desk Widget */}
                <div style={{ flex: '1 1 35%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Account Manager Card */}
                  <div style={{ padding: '1.75rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)', position: 'relative' }}>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--jade-text-d)', fontWeight: 600, marginBottom: '0.75rem' }}>
                      DEDICATED OTC CONCIERGE
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--jade), #1A1A24)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1rem' }}>
                        MW
                      </div>
                      <div>
                        <div style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--hi)' }}>Marek Wiśniewski</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--fg-dim)' }}>Senior Institutional Sales &amp; OTC Desk</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem', color: 'var(--fg-dim)', borderTop: '1px solid var(--line)', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Direct Telegram:</span>
                        <span style={{ color: 'var(--jade-text-d)', fontWeight: 600, fontFamily: 'var(--f-mono)' }}>@coincashy_desk_alpha</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Desk Phone:</span>
                        <span style={{ fontFamily: 'var(--f-mono)' }}>+48 22 104 8920</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Execution SLA:</span>
                        <span style={{ color: 'var(--hi)', fontWeight: 600 }}>&lt; 15 seconds</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Working Hours:</span>
                        <span>24/7 Priority Clearing</span>
                      </div>
                    </div>

                    <a
                      href="https://t.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-solid btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-mail" /></svg>
                      Open OTC Direct Desk
                    </a>
                  </div>

                  {/* Polish VASP & Custody Safeguards */}
                  <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
                    <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)', marginBottom: '0.75rem' }}>
                      REGULATORY SAFEGUARDS
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--fg-dim)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg className="ic" style={{ width: 14, height: 14, color: 'var(--coin-usdt)' }}><use href="#i-check" /></svg>
                        <span>Polish VASP Registered (KRS: 0001135823)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg className="ic" style={{ width: 14, height: 14, color: 'var(--coin-usdt)' }}><use href="#i-check" /></svg>
                        <span>BitGo &amp; Utila Multi-Party Custody</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg className="ic" style={{ width: 14, height: 14, color: 'var(--coin-usdt)' }}><use href="#i-check" /></svg>
                        <span>1:1 Segregated Fiat Safeguarding</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ============ OTHER TABS (Interactive Placeholders) ============ */}
          {activeTab !== 'overview' && activeTab !== 'profile' && (
            <div style={{ padding: '2.5rem', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--line)', textAlign: 'center' }}>
              <div style={{ width: 54, height: 54, borderRadius: '14px', background: 'var(--surface-2)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: 'var(--jade-text-d)' }}>
                <svg className="ic" style={{ width: 26, height: 26 }}>
                  <use href={menuItems.find((m) => m.id === activeTab)?.icon} />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--hi)', marginBottom: '0.5rem' }}>
                {menuItems.find((m) => m.id === activeTab)?.label}
              </h2>
              <p style={{ color: 'var(--low)', maxWidth: '500px', margin: '0 auto 1.75rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Module actively mapped to the new Coincashy design system. In production, this section coordinates your {menuItems.find((m) => m.id === activeTab)?.label.toLowerCase()} workflows with Polish VASP security.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="btn btn-line btn-sm"
              >
                ← Back to Dashboard Overview
              </button>
            </div>
          )}

        </main>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .dashboard-sidebar {
            position: fixed !important;
            left: -300px;
            transition: left 0.3s ease;
          }
          .dashboard-sidebar.open {
            left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
