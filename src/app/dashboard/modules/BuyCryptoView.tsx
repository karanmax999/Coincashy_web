'use client';

import React, { useState } from 'react';

export default function BuyCryptoView() {
  const [fiatAmount, setFiatAmount] = useState('2500');
  const [fiatCurrency, setFiatCurrency] = useState<'EUR' | 'PLN' | 'USD'>('EUR');
  const [cryptoAsset, setCryptoAsset] = useState<'BTC' | 'ETH' | 'USDT' | 'USDC'>('USDT');
  const [paymentMethod, setPaymentMethod] = useState<'sepa' | 'card' | 'applepay'>('sepa');
  const [isProcessing, setIsProcessing] = useState(false);

  const btcRate = 78120;
  const usdtRate = 1.08;
  const ethRate = 2445;

  const numFiat = parseFloat(fiatAmount) || 0;
  let cryptoReceived = '0.00';
  if (cryptoAsset === 'USDT' || cryptoAsset === 'USDC') {
    cryptoReceived = (numFiat * usdtRate).toFixed(2);
  } else if (cryptoAsset === 'BTC') {
    cryptoReceived = (numFiat / btcRate).toFixed(6);
  } else if (cryptoAsset === 'ETH') {
    cryptoReceived = (numFiat / ethRate).toFixed(4);
  }

  const feeRate = paymentMethod === 'sepa' ? 0 : paymentMethod === 'card' ? 0.012 : 0.014;
  const feeAmount = (numFiat * feeRate).toFixed(2);
  const totalFiat = (numFiat + parseFloat(feeAmount)).toFixed(2);

  const handleBuy = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Onramp order of ${fiatAmount} ${fiatCurrency} for ${cryptoReceived} ${cryptoAsset} initiated successfully.`);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* ============ TITLE ============ */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--hi)' }}>Institutional Fiat-to-Crypto Onramp</h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--fg-dim)', marginTop: '4px' }}>
          Acquire digital assets via SEPA Instant, corporate cards, or swift wires with guaranteed settlement.
        </p>
      </div>

      {/* ============ ONRAMP CARD ============ */}
      <div
        style={{
          borderRadius: '24px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          boxShadow: 'var(--shadow)',
        }}
      >
        {/* FIAT SPEND */}
        <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--ground)', border: '1px solid var(--line)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--fg-faint)', marginBottom: '0.5rem' }}>
            <span>I WANT TO SPEND</span>
            <span>Min: €50 · Max: €250,000</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="number"
              value={fiatAmount}
              onChange={(e) => setFiatAmount(e.target.value)}
              placeholder="0.00"
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: 'var(--hi)',
                fontSize: '1.75rem',
                fontWeight: 600,
                fontFamily: 'var(--f-mono)',
                outline: 'none',
              }}
            />

            <select
              value={fiatCurrency}
              onChange={(e) => setFiatCurrency(e.target.value as any)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                color: 'var(--hi)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              <option value="EUR">EUR (€)</option>
              <option value="PLN">PLN (zł)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>

        {/* CRYPTO RECEIVE */}
        <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'var(--ground)', border: '1px solid var(--line)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--fg-faint)', marginBottom: '0.5rem' }}>
            <span>YOU RECEIVE (ESTIMATED)</span>
            <span>Zero Slippage Guarantee</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                flex: 1,
                color: 'var(--hi)',
                fontSize: '1.75rem',
                fontWeight: 600,
                fontFamily: 'var(--f-mono)',
              }}
            >
              {cryptoReceived}
            </div>

            <select
              value={cryptoAsset}
              onChange={(e) => setCryptoAsset(e.target.value as any)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                color: 'var(--hi)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
            </select>
          </div>
        </div>

        {/* PAYMENT METHOD SELECTOR */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-faint)', display: 'block', marginBottom: '0.75rem' }}>
            Select Payment Method
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { id: 'sepa' as const, name: 'SEPA Instant (EUR Virtual IBAN)', fee: '0.00% Fee · < 10s Clearance', recommended: true },
              { id: 'card' as const, name: 'Corporate Debit / Credit Card (Mastercard / Visa)', fee: '1.20% Fee · Instant Settlement', recommended: false },
              { id: 'applepay' as const, name: 'Apple Pay / Google Pay', fee: '1.40% Fee · 1-Touch Authorization', recommended: false },
            ].map((method) => {
              const isSelected = paymentMethod === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: isSelected ? '1px solid var(--jade-text-d)' : '1px solid var(--line)',
                    background: isSelected ? 'var(--surface-2)' : 'var(--ground)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', border: isSelected ? '5px solid var(--jade-text-d)' : '2px solid var(--fg-faint)', background: '#fff' }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--hi)' }}>{method.name}</div>
                      <div style={{ fontSize: '0.74rem', color: isSelected ? 'var(--jade-text-d)' : 'var(--fg-dim)' }}>{method.fee}</div>
                    </div>
                  </div>
                  {method.recommended && (
                    <span style={{ fontSize: '0.7rem', padding: '2px 7px', borderRadius: '999px', background: 'rgba(39, 161, 127, 0.15)', color: 'var(--coin-usdt)', fontWeight: 600 }}>
                      Fastest
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ORDER BREAKDOWN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--fg-dim)', borderTop: '1px solid var(--line)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Payment Processing Fee</span>
            <span style={{ color: feeRate === 0 ? 'var(--coin-usdt)' : 'var(--hi)', fontWeight: 600 }}>
              {feeRate === 0 ? '€0.00 (Zero Fee)' : `€${feeAmount}`}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Fiat Payable</span>
            <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--hi)', fontWeight: 700, fontSize: '0.95rem' }}>
              €{totalFiat} {fiatCurrency}
            </span>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="button"
          onClick={handleBuy}
          disabled={isProcessing || numFiat <= 0}
          className="btn btn-solid"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1rem',
            fontWeight: 600,
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--jade), var(--brass))',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: isProcessing || numFiat <= 0 ? 'not-allowed' : 'pointer',
            opacity: isProcessing || numFiat <= 0 ? 0.6 : 1,
          }}
        >
          {isProcessing ? 'Connecting Gateway...' : `Buy ${cryptoReceived} ${cryptoAsset}`}
        </button>

      </div>

    </div>
  );
}
