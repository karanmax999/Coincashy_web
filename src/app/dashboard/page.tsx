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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    { id: 'profile' as DashboardTab, label: 'Profile & Security', icon: '#i-user-check' },
  ];

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

          {/* Navigation Links */}
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

        {/* User Account & Logout Footer */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--line)', background: 'var(--surface-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--jade), var(--brass))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                CC
              </div>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--hi)' }}>Corporate Desk</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--fg-faint)' }}>Verified KYB Tier-2</div>
              </div>
            </div>
          </div>
          <Link
            href="/auth/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '6px 10px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: 'var(--coral)',
              border: '1px solid var(--line)',
              background: 'var(--ground)',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <span>Logout</span>
          </Link>
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
              {menuItems.find((m) => m.id === activeTab)?.label}
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

          {/* ============ OTHER TABS (Interactive Placeholders) ============ */}
          {activeTab !== 'overview' && (
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
