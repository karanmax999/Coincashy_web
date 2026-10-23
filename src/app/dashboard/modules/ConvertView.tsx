'use client';

import React, { useState, useEffect } from 'react';

export default function ConvertView() {
  const [fromAsset, setFromAsset] = useState<'BTC' | 'USDT' | 'EUR' | 'ETH'>('BTC');
  const [toAsset, setToAsset] = useState<'USDT' | 'BTC' | 'EUR' | 'ETH'>('USDT');
  const [fromAmount, setFromAmount] = useState('0.5');
  const [timeLeft, setTimeLeft] = useState(15);
  const [isRotating, setIsRotating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Conversion rates baseline
  const rates: Record<string, number> = {
    'BTC-USDT': 84297.67,
    'USDT-BTC': 1 / 84297.67,
    'BTC-EUR': 78120.40,
    'EUR-BTC': 1 / 78120.40,
    'ETH-USDT': 2640.35,
    'USDT-ETH': 1 / 2640.35,
    'ETH-EUR': 2445.80,
    'EUR-ETH': 1 / 2445.80,
    'EUR-USDT': 1.08,
    'USDT-EUR': 1 / 1.08,
  };

  const pairKey = `${fromAsset}-${toAsset}`;
  const rate = rates[pairKey] || 1;
  const numFrom = parseFloat(fromAmount) || 0;
  const calculatedTo = (numFrom * rate).toFixed(fromAsset === 'USDT' || fromAsset === 'EUR' ? 6 : 2);

  // 15-second guaranteed quote countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 15 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFlip = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 300);
    const temp = fromAsset;
    setFromAsset(toAsset as any);
    setToAsset(temp as any);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* ============ TITLE ============ */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--hi)' }}>Instant RFQ Conversion Desk</h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--fg-dim)', marginTop: '4px' }}>
          0% slippage institutional swaps executed at real-time DIA oracle rates.
        </p>
      </div>

      {/* ============ SWAP CARD ============ */}
      <div
        style={{
          borderRadius: '24px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          boxShadow: 'var(--shadow)',
          position: 'relative',
        }}
      >
        {/* Quote Lock Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--coin-usdt)', fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coin-usdt)', boxShadow: '0 0 8px var(--coin-usdt)' }} />
            <span>Guaranteed Quote Locked</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--fg-dim)' }}>
            <span>Refreshes in:</span>
            <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--hi)', fontWeight: 600 }}>{timeLeft}s</span>
          </div>
        </div>

        {/* FROM BOX */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            background: 'var(--ground)',
            border: '1px solid var(--line)',
            marginBottom: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--fg-faint)', marginBottom: '0.5rem' }}>
            <span>YOU PAY</span>
            <span>Available: 1.0245 BTC</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
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

            <button
              type="button"
              onClick={() => setFromAmount('1.0245')}
              style={{
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                fontSize: '0.72rem',
                color: 'var(--gold, #E2B866)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              MAX
            </button>

            <select
              value={fromAsset}
              onChange={(e) => setFromAsset(e.target.value as any)}
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
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>

        {/* FLIP BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '-14px 0', position: 'relative', zIndex: 2 }}>
          <button
            type="button"
            onClick={handleFlip}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--surface)',
              border: '1px solid var(--line-2)',
              color: 'var(--hi)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transform: isRotating ? 'rotate(180deg)' : 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
            title="Invert Conversion Pair"
          >
            <svg className="ic" style={{ width: 16, height: 16 }}><use href="#i-repeat" /></svg>
          </button>
        </div>

        {/* TO BOX */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            background: 'var(--ground)',
            border: '1px solid var(--line)',
            marginTop: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--fg-faint)', marginBottom: '0.5rem' }}>
            <span>YOU RECEIVE (ESTIMATED)</span>
            <span>0% Slippage Guaranteed</span>
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
              {calculatedTo}
            </div>

            <select
              value={toAsset}
              onChange={(e) => setToAsset(e.target.value as any)}
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
              <option value="EUR">EUR</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
        </div>

        {/* SUMMARY DETAILS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--fg-dim)', borderTop: '1px solid var(--line)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Indicative Rate</span>
            <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--hi)', fontWeight: 600 }}>
              1 {fromAsset} ≈ {rate.toLocaleString('en-US', { maximumFractionDigits: 4 })} {toAsset}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Execution Fee</span>
            <span style={{ color: 'var(--coin-usdt)', fontWeight: 600 }}>0.00% (Zero Slippage)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Settlement Destination</span>
            <span style={{ color: 'var(--hi)' }}>Instant Credit to Coincashy Custody</span>
          </div>
        </div>

        {/* EXECUTE BUTTON */}
        <button
          type="button"
          onClick={handleExecute}
          disabled={isExecuting || numFrom <= 0}
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
            cursor: isExecuting || numFrom <= 0 ? 'not-allowed' : 'pointer',
            opacity: isExecuting || numFrom <= 0 ? 0.6 : 1,
          }}
        >
          {isExecuting ? 'Locking Rate & Executing...' : `Convert ${fromAsset} to ${toAsset}`}
        </button>

      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
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
          onClick={() => setShowSuccess(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '24px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              padding: '2rem',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(39, 161, 127, 0.15)', color: 'var(--coin-usdt)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <svg className="ic" style={{ width: 28, height: 28 }}><use href="#i-check" /></svg>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--hi)' }}>Conversion Completed</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--fg-dim)', marginTop: '6px', lineHeight: 1.5 }}>
              Successfully converted <strong>{fromAmount} {fromAsset}</strong> into <strong>{calculatedTo} {toAsset}</strong> at locked rate.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="btn btn-solid btn-sm"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
