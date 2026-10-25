'use client';

import React, { useState } from 'react';

export default function FiatDepositView() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    beneficiary: 'Alpha Treasury Partners Sp. z o.o.',
    iban: 'PL82 1020 4900 0000 9482 1029 3847',
    bic: 'BPKOPLPW',
    bankName: 'PKO Bank Polski S.A. / Coincashy Settlement Custody',
    bankAddress: 'ul. Pulawska 15, 02-515 Warsaw, Poland',
    reference: 'CC-94821-EUR',
    currency: 'EUR (€)',
  };

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* ============ TITLE ============ */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--hi)' }}>European Virtual IBAN Deposit</h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--fg-dim)', marginTop: '4px' }}>
          Transfer funds directly via SEPA Instant or SWIFT with 0% deposit fees.
        </p>
      </div>

      {/* ============ WIRE DETAILS CARD ============ */}
      <div
        style={{
          borderRadius: '24px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          padding: 'clamp(1rem, 3vw, 2rem)',
          boxShadow: 'var(--shadow)',
        }}
      >
        {/* IBAN Header Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--line)', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#003399',
                border: '2px solid var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                flexShrink: 0,
              }}
              title="European Union"
            >
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
                <circle cx="12" cy="12" r="7.5" fill="none" stroke="#FFCC00" strokeWidth="1.8" strokeDasharray="1.2 2.7" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--hi)' }}>Dedicated Corporate EUR vIBAN</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--jade-text-d)', fontWeight: 500 }}>SEPA Instant Supported (Credited in &lt;10s)</div>
            </div>
          </div>

          <span style={{ fontSize: '0.74rem', padding: '3px 8px', borderRadius: '999px', background: 'rgba(0, 0, 255, 0.12)', color: 'var(--jade-text-d)', fontWeight: 600 }}>
            0% Deposit Fee
          </span>
        </div>

        {/* MANDATORY PAYMENT REFERENCE (CRITICAL) */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0, 0, 255, 0.12) 0%, rgba(59, 130, 246, 0.06) 100%)',
            border: '1px solid rgba(226, 184, 102, 0.3)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold, #E2B866)', fontWeight: 600 }}>
              MANDATORY PAYMENT REFERENCE
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--coral)', fontWeight: 600 }}>Required</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--f-mono)', color: 'var(--hi)' }}>
              {bankDetails.reference}
            </span>
            <button
              type="button"
              onClick={() => handleCopy('ref', bankDetails.reference)}
              className="btn btn-solid btn-sm"
              style={{ background: 'var(--gold, #E2B866)', color: '#000', border: 'none', fontWeight: 600, flexShrink: 0 }}
            >
              {copiedField === 'ref' ? 'Copied!' : 'Copy Reference'}
            </button>
          </div>

          <div style={{ fontSize: '0.76rem', color: 'var(--fg-dim)', marginTop: '0.4rem', lineHeight: 1.4 }}>
            You MUST include this code in the payment reference/narrative field of your bank transfer so your funds are automatically allocated to your treasury account.
          </div>
        </div>

        {/* BANK ACCOUNT FIELDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          
          {/* Beneficiary */}
          <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>Beneficiary Name</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--hi)', marginTop: '2px' }}>{bankDetails.beneficiary}</div>
            </div>
            <button type="button" onClick={() => handleCopy('ben', bankDetails.beneficiary)} className="btn btn-line btn-sm" style={{ padding: '4px 10px', fontSize: '0.74rem', flexShrink: 0 }}>
              {copiedField === 'ben' ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* IBAN */}
          <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>EUR IBAN</div>
              <div style={{ fontSize: '0.96rem', fontWeight: 700, fontFamily: 'var(--f-mono)', color: 'var(--hi)', marginTop: '2px', wordBreak: 'break-all' }}>{bankDetails.iban}</div>
            </div>
            <button type="button" onClick={() => handleCopy('iban', bankDetails.iban.replace(/\s/g, ''))} className="btn btn-solid btn-sm" style={{ padding: '4px 10px', fontSize: '0.74rem', flexShrink: 0 }}>
              {copiedField === 'iban' ? 'Copied' : 'Copy IBAN'}
            </button>
          </div>

          {/* BIC / SWIFT */}
          <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>BIC / SWIFT Code</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--f-mono)', color: 'var(--hi)', marginTop: '2px' }}>{bankDetails.bic}</div>
            </div>
            <button type="button" onClick={() => handleCopy('bic', bankDetails.bic)} className="btn btn-line btn-sm" style={{ padding: '4px 10px', fontSize: '0.74rem', flexShrink: 0 }}>
              {copiedField === 'bic' ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Bank Name */}
          <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'var(--ground)', border: '1px solid var(--line)' }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--fg-faint)' }}>Bank &amp; Clearing Institution</div>
            <div style={{ fontSize: '0.86rem', color: 'var(--hi)', marginTop: '2px' }}>{bankDetails.bankName}</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--fg-dim)', marginTop: '1px' }}>{bankDetails.bankAddress}</div>
          </div>

        </div>

        {/* BOTTOM ACTION */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => alert('Downloading official Bank Transfer Instruction Letter (PDF)...')}
            className="btn btn-line btn-sm"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Download Transfer Instructions (PDF)
          </button>
        </div>

      </div>

    </div>
  );
}
