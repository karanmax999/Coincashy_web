'use client';

import React, { useState } from 'react';

interface TransactionItem {
  id: string;
  type: string;
  category: 'fiat' | 'crypto' | 'convert';
  asset: string;
  network?: string;
  counterparty: string;
  amount: string;
  isPositive: boolean;
  status: 'Settled' | 'Pending' | 'Completed';
  date: string;
  reference: string;
  fee: string;
}

export default function TransactionsView() {
  const [filterTab, setFilterTab] = useState<'all' | 'fiat' | 'crypto' | 'convert'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<TransactionItem | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const transactions: TransactionItem[] = [
    {
      id: 'TX-9482101',
      type: 'vIBAN Deposit',
      category: 'fiat',
      asset: 'EUR (SEPA Instant)',
      counterparty: 'mBank S.A. (Warsaw)',
      amount: '+€16,820.00',
      isPositive: true,
      status: 'Settled',
      date: 'Today, 14:22',
      reference: 'SEPA-PL-849201948',
      fee: '€0.00 (0% Fee)',
    },
    {
      id: 'TX-9482102',
      type: 'RFQ Conversion',
      category: 'convert',
      asset: 'BTC → USDT',
      counterparty: 'Coincashy Institutional Desk',
      amount: '0.25 BTC → 21,074 USDT',
      isPositive: true,
      status: 'Completed',
      date: 'Yesterday, 09:41',
      reference: 'RFQ-CC-84297',
      fee: '0% Slippage Locked',
    },
    {
      id: 'TX-9482103',
      type: 'Crypto Withdrawal',
      category: 'crypto',
      asset: 'USDT',
      network: 'ERC-20',
      counterparty: 'Whitelisted Vault (BitGo 0x8a...3f)',
      amount: '-5,000.00 USDT',
      isPositive: false,
      status: 'Settled',
      date: '21 Oct, 18:05',
      reference: '0x9482...a8fe10b',
      fee: '3.50 USDT (Gas)',
    },
    {
      id: 'TX-9482104',
      type: 'Fiat Withdrawal',
      category: 'fiat',
      asset: 'EUR (SEPA Instant)',
      counterparty: 'Santander Corporate IBAN (...3847)',
      amount: '-€25,000.00',
      isPositive: false,
      status: 'Settled',
      date: '20 Oct, 11:15',
      reference: 'SEPA-OUT-994820',
      fee: '€1.50 (Instant Rail)',
    },
    {
      id: 'TX-9482105',
      type: 'Crypto Deposit',
      category: 'crypto',
      asset: 'BTC',
      network: 'Bitcoin Native',
      counterparty: 'Whitelisted External Desk',
      amount: '+0.5000 BTC',
      isPositive: true,
      status: 'Settled',
      date: '19 Oct, 16:30',
      reference: 'b948a7...31cc90',
      fee: '0.0001 BTC (Miner)',
    },
    {
      id: 'TX-9482106',
      type: 'Guest Counterparty Deposit',
      category: 'fiat',
      asset: 'EUR (SWIFT Wire)',
      counterparty: 'LGT Bank Liechtenstein',
      amount: '+€50,000.00',
      isPositive: true,
      status: 'Settled',
      date: '18 Oct, 10:02',
      reference: 'SWIFT-IN-492019',
      fee: '€12.00 (SWIFT In)',
    },
  ];

  const filtered = transactions.filter((tx) => {
    if (filterTab !== 'all' && tx.category !== filterTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(q) ||
        tx.type.toLowerCase().includes(q) ||
        tx.asset.toLowerCase().includes(q) ||
        tx.counterparty.toLowerCase().includes(q) ||
        tx.reference.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Statement exported successfully as CSV/PDF (Simulated MT940 / CAMT.053).');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* ============ TITLE & CONTROLS ============ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--hi)' }}>Transactions &amp; Settlement Ledger</h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--fg-dim)', marginTop: '2px' }}>
            Auditable records of all SEPA Instant wires, OTC RFQ swaps, and MPC crypto transfers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="btn btn-line btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <svg className="ic" style={{ width: 14, height: 14 }}><use href="#i-download" /></svg>
          <span>{isExporting ? 'Exporting...' : 'Export Statement (CSV / PDF)'}</span>
        </button>
      </div>

      {/* ============ FILTER CONTROLS (ether.fi inspired segmented bar) ============ */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderRadius: '16px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Segmented Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--ground)', padding: '4px', borderRadius: '10px', border: '1px solid var(--line)' }}>
          {[
            { id: 'all' as const, label: 'All Activity' },
            { id: 'fiat' as const, label: 'vIBAN & Fiat' },
            { id: 'crypto' as const, label: 'Crypto Transfers' },
            { id: 'convert' as const, label: 'Conversions / Swaps' },
          ].map((tab) => {
            const isActive = filterTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterTab(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--hi)' : 'var(--fg-dim)',
                  background: isActive ? 'var(--surface-2)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: 'clamp(220px, 30vw, 340px)' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by counterparty, reference, or hash..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              background: 'var(--ground)',
              color: 'var(--fg)',
              fontSize: '0.82rem',
            }}
          />
          <svg className="ic" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--fg-faint)' }}>
            <use href="#i-search" />
          </svg>
        </div>
      </div>

      {/* ============ DATA TABLE ============ */}
      <div
        style={{
          borderRadius: '20px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left', color: 'var(--fg-faint)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', background: 'var(--surface-2)' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Transaction ID</th>
                <th style={{ padding: '0.85rem 1rem' }}>Rail / Type</th>
                <th style={{ padding: '0.85rem 1rem' }}>Asset</th>
                <th style={{ padding: '0.85rem 1rem' }}>Counterparty / Destination</th>
                <th style={{ padding: '0.85rem 1rem' }}>Amount</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Date &amp; Time</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr
                  key={tx.id}
                  style={{ borderBottom: '1px solid var(--line)', transition: 'background 0.15s ease' }}
                  className="hover:bg-[var(--surface-2)]"
                >
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'var(--f-mono)', color: 'var(--fg-dim)', fontSize: '0.78rem' }}>
                    {tx.id}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--hi)' }}>
                    {tx.type}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{tx.asset}</span>
                      {tx.network && (
                        <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--fg-faint)' }}>
                          {tx.network}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--fg-dim)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tx.counterparty}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 650, fontFamily: 'var(--f-mono)', color: tx.isPositive ? 'var(--coin-usdt)' : 'var(--coral)' }}>
                    {tx.amount}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '99px', background: 'rgba(39, 161, 127, 0.12)', color: 'var(--coin-usdt)', fontSize: '0.74rem', fontWeight: 600 }}>
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--fg-dim)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {tx.date}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedTx(tx)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid var(--line)',
                        background: 'var(--ground)',
                        color: 'var(--fg-dim)',
                        fontSize: '0.76rem',
                        cursor: 'pointer',
                      }}
                      className="hover:text-[var(--hi)] hover:border-[var(--line-2)]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ RECEIPT MODAL / DRAWER ============ */}
      {selectedTx && (
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
          onClick={() => setSelectedTx(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              borderRadius: '24px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              padding: '2rem',
              boxShadow: 'var(--shadow)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--jade-text-d)', fontWeight: 600, letterSpacing: '0.08em' }}>
                  CERTIFIED SETTLEMENT RECEIPT
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--hi)', marginTop: '2px' }}>
                  {selectedTx.type}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--fg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '10px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--fg-dim)' }}>Settled Amount</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--f-mono)', color: selectedTx.isPositive ? 'var(--coin-usdt)' : 'var(--coral)', fontSize: '1.05rem' }}>
                  {selectedTx.amount}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-dim)' }}>Status</span>
                <span style={{ color: 'var(--coin-usdt)', fontWeight: 600 }}>{selectedTx.status} · Polish VASP Verified</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-dim)' }}>Clearing Reference / Hash</span>
                <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--hi)' }}>{selectedTx.reference}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-dim)' }}>Counterparty Entity</span>
                <span style={{ color: 'var(--hi)' }}>{selectedTx.counterparty}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-dim)' }}>Network / Processing Fee</span>
                <span style={{ color: 'var(--hi)' }}>{selectedTx.fee}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-dim)' }}>Timestamp</span>
                <span style={{ color: 'var(--hi)' }}>{selectedTx.date}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  alert('Generating PDF Audit Receipt...');
                  setSelectedTx(null);
                }}
                className="btn btn-solid btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Download PDF Receipt
              </button>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="btn btn-line btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
