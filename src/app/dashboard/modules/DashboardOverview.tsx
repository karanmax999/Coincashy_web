'use client';

import React, { useState } from 'react';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
}

export default function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const [hideBalance, setHideBalance] = useState(false);
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');

  const assets = [
    {
      symbol: 'EUR',
      name: 'European Virtual IBAN',
      type: 'fiat',
      amount: '€42,100.00',
      valEUR: '€42,100.00',
      change: 'Active',
      isPositive: true,
      tag: 'SEPA Instant',
      color: '#3B82F6',
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin (Custody Vault)',
      type: 'crypto',
      amount: '1.0245 BTC',
      valEUR: '€81,320.00',
      change: '+1.8%',
      isPositive: true,
      tag: 'BitGo MPC',
      color: '#F7931A',
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      type: 'crypto',
      amount: '5,030.00 USDT',
      valEUR: '€4,640.00',
      change: '+0.1%',
      isPositive: true,
      tag: 'TRC-20 / ERC-20',
      color: '#26A17B',
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      type: 'crypto',
      amount: '2,500.00 USDC',
      valEUR: '€2,305.00',
      change: '0.0%',
      isPositive: true,
      tag: 'ERC-20 Native',
      color: '#2775CA',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      type: 'crypto',
      amount: '1.4500 ETH',
      valEUR: '€3,828.00',
      change: '+2.4%',
      isPositive: true,
      tag: 'Staking Eligible',
      color: '#627EEA',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* ============ HERO PORTFOLIO VALUE CARD (Inspired by ether.fi) ============ */}
      <div
        style={{
          padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)',
          border: '1px solid var(--line)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow)',
        }}
      >
        {/* Glow ambient background */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(226, 184, 102, 0.12) 0%, rgba(39, 161, 127, 0.08) 50%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          
          {/* Left: Balance & PnL */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-faint)', fontFamily: 'var(--f-mono)' }}>
                PORTFOLIO VALUE · {currency}
              </span>
              <button
                type="button"
                onClick={() => setHideBalance(!hideBalance)}
                aria-label={hideBalance ? 'Show balance' : 'Hide balance'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--fg-dim)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                title={hideBalance ? 'Reveal balance' : 'Mask balance'}
              >
                <svg className="ic" style={{ width: 16, height: 16 }}>
                  <use href={hideBalance ? '#i-x' : '#i-eye'} />
                </svg>
              </button>
            </div>

            <div
              className="display mono num"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 3.75rem)',
                fontWeight: 650,
                color: 'var(--hi)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginTop: '0.35rem',
              }}
            >
              {hideBalance ? '€ ••••••••' : currency === 'EUR' ? '€128,450.00' : '$139,215.00'}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '999px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontSize: '0.78rem', fontWeight: 600 }}>
                <svg className="ic" style={{ width: 13, height: 13 }}><use href="#i-arrow-up-right" /></svg>
                <span>+€3,012.40 (+2.4%) past 24h</span>
              </div>
              <span style={{ fontSize: '0.76rem', color: 'var(--fg-faint)' }}>
                Oracle DIA real-time valuation
              </span>
            </div>
          </div>

          {/* Right: Floating Circular Quick Actions (Direct ether.fi pattern) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            
            {/* Deposit */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => onNavigate('fiat-deposit')}
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line-2)',
                  color: 'var(--hi)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
                className="hover:scale-105 hover:border-[var(--gold)]"
                title="Deposit EUR via vIBAN or Crypto"
              >
                <svg className="ic" style={{ width: 20, height: 20 }}><use href="#i-arrow-down-left" /></svg>
              </button>
              <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--fg-dim)' }}>Deposit</span>
            </div>

            {/* Send / Withdraw */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => onNavigate('crypto-withdraw')}
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line-2)',
                  color: 'var(--hi)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
                className="hover:scale-105 hover:border-[var(--gold)]"
                title="Send Crypto or Outbound SEPA Wire"
              >
                <svg className="ic" style={{ width: 20, height: 20 }}><use href="#i-arrow-up-right" /></svg>
              </button>
              <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--fg-dim)' }}>Send</span>
            </div>

            {/* Buy */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => onNavigate('buy')}
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line-2)',
                  color: 'var(--hi)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
                className="hover:scale-105 hover:border-[var(--gold)]"
                title="Buy Crypto with Card or SEPA"
              >
                <svg className="ic" style={{ width: 20, height: 20 }}><use href="#i-credit-card" /></svg>
              </button>
              <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--fg-dim)' }}>Buy</span>
            </div>

            {/* Swap / Convert */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => onNavigate('convert')}
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--jade), var(--brass))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 20px rgba(39, 161, 127, 0.35)',
                }}
                className="hover:scale-105 hover:brightness-110"
                title="Instant RFQ 0% Slippage Swap"
              >
                <svg className="ic" style={{ width: 20, height: 20 }}><use href="#i-repeat" /></svg>
              </button>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--hi)' }}>Swap</span>
            </div>

          </div>

        </div>
      </div>

      {/* ============ PROMPT BANNER: ENABLE BANK TRANSFERS / vIBAN ============ */}
      <div
        style={{
          padding: '1.25rem 1.75rem',
          borderRadius: '18px',
          background: 'linear-gradient(90deg, rgba(39, 161, 127, 0.08) 0%, rgba(226, 184, 102, 0.08) 100%)',
          border: '1px solid rgba(226, 184, 102, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* EU & Poland Flag Icons */}
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
            <span>🇪🇺</span>
            <span style={{ marginLeft: '-6px' }}>🇵🇱</span>
          </div>
          <div>
            <div style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--hi)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Dedicated European Virtual IBAN Active</span>
              <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: 'var(--coin-usdt)', color: '#fff', fontWeight: 600 }}>0% SEPA Instant</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--fg-dim)', marginTop: '2px' }}>
              Your corporate account is provisioned with a dedicated Polish EUR IBAN for automated institutional wire clearing.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('fiat-deposit')}
          className="btn btn-solid btn-sm"
          style={{ background: 'var(--gold, #E2B866)', color: '#000', fontWeight: 600, border: 'none' }}
        >
          View Wire Details →
        </button>
      </div>

      {/* ============ MULTI-ASSET HOLDINGS SECTION ============ */}
      <div
        style={{
          padding: '1.75rem',
          borderRadius: '20px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--hi)' }}>Treasury Holdings &amp; Balances</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--fg-dim)', marginTop: '2px' }}>Aggregated across segregated fiat safeguarding and BitGo MPC custody.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('fiat-deposit')}
            className="btn btn-line btn-sm"
          >
            + Add Funds
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {assets.map((asset) => (
            <div
              key={asset.symbol}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                background: 'var(--ground)',
                border: '1px solid var(--line)',
                transition: 'all 0.15s ease',
              }}
              className="hover:border-[var(--line-2)] hover:bg-[var(--surface-2)]"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: `${asset.color}15`,
                    border: `1px solid ${asset.color}40`,
                    color: asset.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    fontFamily: 'var(--f-mono)',
                  }}
                >
                  {asset.symbol}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--hi)' }}>{asset.name}</span>
                    <span style={{ fontSize: '0.7rem', padding: '2px 7px', borderRadius: '999px', background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--fg-dim)' }}>
                      {asset.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--fg-dim)', marginTop: '2px', fontFamily: 'var(--f-mono)' }}>
                    {asset.symbol} · {asset.type.toUpperCase()}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1rem', fontWeight: 650, color: 'var(--hi)', fontFamily: 'var(--f-mono)' }}>
                  {hideBalance ? '••••••' : asset.amount}
                </div>
                <div style={{ fontSize: '0.76rem', color: asset.isPositive ? 'var(--jade-text-d)' : 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  <span>{hideBalance ? '' : asset.valEUR}</span>
                  <span>({asset.change})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ 2x2 INSTITUTIONAL FEATURES GRID (ether.fi style) ============ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        
        <div
          onClick={() => onNavigate('convert')}
          style={{
            padding: '1.5rem',
            borderRadius: '18px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          className="hover:border-[var(--jade)] hover:translate-y-[-2px]"
        >
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg className="ic" style={{ width: 20, height: 20 }}><use href="#i-repeat" /></svg>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--hi)' }}>0% Slippage RFQ Swaps</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '4px', lineHeight: 1.5 }}>
            Execute large-ticket institutional conversions locked at live DIA oracle rates with zero price impact.
          </p>
          <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--jade-text-d)', fontWeight: 500 }}>
            Launch RFQ Engine →
          </span>
        </div>

        <div
          onClick={() => onNavigate('fiat-deposit')}
          style={{
            padding: '1.5rem',
            borderRadius: '18px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          className="hover:border-[var(--gold)] hover:translate-y-[-2px]"
        >
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(226, 184, 102, 0.12)', color: 'var(--gold, #E2B866)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg className="ic" style={{ width: 20, height: 20 }}><use href="#i-landmark" /></svg>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--hi)' }}>Multi-Currency Virtual IBANs</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '4px', lineHeight: 1.5 }}>
            Automated SEPA Instant &amp; SWIFT clearing in EUR, PLN, USD, and CHF under Polish VASP supervision.
          </p>
          <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--gold, #E2B866)', fontWeight: 500 }}>
            Manage IBANs →
          </span>
        </div>

        <div
          onClick={() => onNavigate('wallets')}
          style={{
            padding: '1.5rem',
            borderRadius: '18px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          className="hover:border-[var(--line-2)] hover:translate-y-[-2px]"
        >
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--surface-2)', color: 'var(--hi)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg className="ic" style={{ width: 20, height: 20 }}><use href="#i-wallet" /></svg>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--hi)' }}>Whitelisted Address Book</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '4px', lineHeight: 1.5 }}>
            Enforce MPC withdrawal whitelists with 24-hour time-lock protection and dual-authorization policies.
          </p>
          <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--fg-dim)', fontWeight: 500 }}>
            View Addresses →
          </span>
        </div>

        <div
          onClick={() => onNavigate('profile')}
          style={{
            padding: '1.5rem',
            borderRadius: '18px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          className="hover:border-[var(--line-2)] hover:translate-y-[-2px]"
        >
          <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--surface-2)', color: 'var(--hi)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg className="ic" style={{ width: 20, height: 20 }}><use href="#i-user" /></svg>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--hi)' }}>Dedicated VIP OTC Desk</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--fg-dim)', marginTop: '4px', lineHeight: 1.5 }}>
            Direct senior trader line via private Telegram desk with sub-15s quote execution for large tickets.
          </p>
          <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--fg-dim)', fontWeight: 500 }}>
            Desk Contact →
          </span>
        </div>

      </div>

      {/* ============ RECENT ACTIVITY TABLE ============ */}
      <div
        style={{
          padding: '1.75rem',
          borderRadius: '20px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--hi)' }}>Recent Activity</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--fg-dim)', marginTop: '2px' }}>Real-time audit log of all inbound and outbound transactions.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('transactions')}
            style={{ fontSize: '0.84rem', color: 'var(--jade-text-d)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
          >
            View all transactions →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left', color: 'var(--fg-faint)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Rail / Type</th>
                <th style={{ padding: '0.75rem 1rem' }}>Asset</th>
                <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Date &amp; Time</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>vIBAN Deposit</td>
                <td style={{ padding: '1rem' }}>EUR (SEPA Instant)</td>
                <td style={{ padding: '1rem', color: 'var(--coin-usdt)', fontWeight: 600, fontFamily: 'var(--f-mono)' }}>+€16,820.00</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Settled
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--fg-dim)', fontSize: '0.82rem' }}>Today, 14:22</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }}>RFQ Conversion</td>
                <td style={{ padding: '1rem' }}>BTC → USDT</td>
                <td style={{ padding: '1rem', fontFamily: 'var(--f-mono)' }}>0.25 BTC → 21,074 USDT</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Completed
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--fg-dim)', fontSize: '0.82rem' }}>Yesterday, 09:41</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', fontWeight: 600 }}>Crypto Withdrawal</td>
                <td style={{ padding: '1rem' }}>USDT (ERC-20)</td>
                <td style={{ padding: '1rem', color: 'var(--coral)', fontWeight: 600, fontFamily: 'var(--f-mono)' }}>-5,000.00 USDT</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Settled
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--fg-dim)', fontSize: '0.82rem' }}>21 Oct, 18:05</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
