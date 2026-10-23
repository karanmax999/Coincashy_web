'use client';

import React, { useState } from 'react';

interface BankAccount {
  id: string;
  bankName: string;
  holder: string;
  iban: string;
  bic: string;
  currency: 'EUR' | 'PLN' | 'USD';
  status: 'Verified' | 'Pending Review';
  isDefault: boolean;
}

export default function BankAccountsView() {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: 'BANK-1',
      bankName: 'mBank S.A.',
      holder: 'Alpha Treasury Partners Sp. z o.o.',
      iban: 'PL89 1140 2004 0000 3821 9482 1029',
      bic: 'BREXPLPW',
      currency: 'EUR',
      status: 'Verified',
      isDefault: true,
    },
    {
      id: 'BANK-2',
      bankName: 'Santander Bank Polska S.A.',
      holder: 'Alpha Treasury Partners Sp. z o.o.',
      iban: 'PL12 1090 2402 0000 9921 4820 1938',
      bic: 'WBKAPLPW',
      currency: 'EUR',
      status: 'Verified',
      isDefault: false,
    },
    {
      id: 'BANK-3',
      bankName: 'PKO Bank Polski (Corporate PLN)',
      holder: 'Alpha Treasury Partners Sp. z o.o.',
      iban: 'PL50 1020 1013 0000 4820 9182 3019',
      bic: 'BPKOPLPW',
      currency: 'PLN',
      status: 'Verified',
      isDefault: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [iban, setIban] = useState('');
  const [bic, setBic] = useState('');
  const [currency, setCurrency] = useState<'EUR' | 'PLN' | 'USD'>('EUR');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !iban || !bic) return;
    const newBank: BankAccount = {
      id: `BANK-${accounts.length + 1}`,
      bankName,
      holder: 'Alpha Treasury Partners Sp. z o.o.',
      iban,
      bic,
      currency,
      status: 'Pending Review',
      isDefault: false,
    };
    setAccounts([...accounts, newBank]);
    setShowAddModal(false);
    setBankName('');
    setIban('');
    setBic('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* ============ TITLE & CONTROLS ============ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--hi)' }}>Corporate Bank Accounts</h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--fg-dim)', marginTop: '2px' }}>
            Verified corporate bank accounts authorized for SEPA Instant and SWIFT wire payouts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn btn-solid btn-sm"
          style={{ background: 'var(--gold, #E2B866)', color: '#000', fontWeight: 600, border: 'none' }}
        >
          + Link Corporate Account
        </button>
      </div>

      {/* ============ BANK CARDS GRID ============ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {accounts.map((acc) => (
          <div
            key={acc.id}
            style={{
              padding: '1.5rem',
              borderRadius: '18px',
              background: 'var(--surface)',
              border: acc.isDefault ? '1px solid var(--jade-text-d)' : '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
              position: 'relative',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '8px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg className="ic" style={{ width: 16, height: 16, color: 'var(--gold, #E2B866)' }}><use href="#i-landmark" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--hi)' }}>{acc.bankName}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--fg-dim)' }}>{acc.currency} Corporate Wire Account</div>
                  </div>
                </div>

                <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '999px', background: acc.status === 'Verified' ? 'rgba(39, 161, 127, 0.12)' : 'rgba(245, 166, 35, 0.12)', color: acc.status === 'Verified' ? 'var(--coin-usdt)' : 'var(--pending)', fontWeight: 600 }}>
                  {acc.status}
                </span>
              </div>

              <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '10px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: '2px' }}>IBAN / Account Number</div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, fontFamily: 'var(--f-mono)', color: 'var(--hi)' }}>{acc.iban}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--fg-dim)', marginTop: '0.75rem' }}>
                <span>BIC / SWIFT:</span>
                <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--hi)', fontWeight: 600 }}>{acc.bic}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '0.75rem' }}>
              {acc.isDefault ? (
                <span style={{ fontSize: '0.75rem', color: 'var(--jade-text-d)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg className="ic" style={{ width: 12, height: 12 }}><use href="#i-check" /></svg>
                  Default Withdrawal Account
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAccounts(accounts.map(a => ({ ...a, isDefault: a.id === acc.id })));
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--fg-dim)', fontSize: '0.75rem', cursor: 'pointer' }}
                  className="hover:text-[var(--hi)]"
                >
                  Set as Default
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(acc.iban.replace(/\s/g, ''));
                  alert('IBAN copied to clipboard!');
                }}
                className="btn btn-line btn-sm"
                style={{ padding: '3px 8px', fontSize: '0.72rem' }}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ============ ADD MODAL ============ */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              borderRadius: '24px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              padding: '2rem',
              boxShadow: 'var(--shadow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--hi)' }}>Link Corporate Bank Account</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--fg)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'var(--surface-2)', border: '1px solid var(--line)', fontSize: '0.78rem', color: 'var(--fg-dim)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
              <strong>Notice:</strong> The account name must match your verified company name (<strong>Alpha Treasury Partners Sp. z o.o.</strong>) in accordance with Polish VASP AML rules.
            </div>

            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--fg-faint)', display: 'block', marginBottom: '4px' }}>Bank Name</label>
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. BNP Paribas Bank Polska"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--ground)', color: 'var(--hi)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--fg-faint)', display: 'block', marginBottom: '4px' }}>Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface-2)', color: 'var(--hi)', fontSize: '0.85rem' }}
                >
                  <option value="EUR">EUR (€) - SEPA Instant</option>
                  <option value="PLN">PLN (zł) - Elixir / Express</option>
                  <option value="USD">USD ($) - SWIFT Wire</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--fg-faint)', display: 'block', marginBottom: '4px' }}>IBAN / Account Number</label>
                <input
                  type="text"
                  required
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  placeholder="PL00 0000 0000..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--ground)', color: 'var(--hi)', fontSize: '0.85rem', fontFamily: 'var(--f-mono)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--fg-faint)', display: 'block', marginBottom: '4px' }}>BIC / SWIFT</label>
                <input
                  type="text"
                  required
                  value={bic}
                  onChange={(e) => setBic(e.target.value)}
                  placeholder="e.g. BNPAFFRPW"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--ground)', color: 'var(--hi)', fontSize: '0.85rem', fontFamily: 'var(--f-mono)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-solid btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  Verify &amp; Link Account
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-line btn-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
