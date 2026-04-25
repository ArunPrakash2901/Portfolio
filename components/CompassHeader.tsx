export default function CompassHeader() {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-[28px] text-[#1A1814] m-0">The Data Professional Compass</h2>
          <details className="relative">
            <summary
              className="group flex h-5 w-5 cursor-pointer list-none items-center justify-center rounded-full border border-[#556E74] text-[#2F6B75] transition-all hover:border-[#1A1814] hover:text-[#1A1814] [&::-webkit-details-marker]:hidden"
              aria-label="How to read this chart"
            >
              <span className="text-[10px] font-serif italic">i</span>
            </summary>

            <div
              id="compass-info"
              role="region"
              aria-label="Chart explanation"
              style={{
                position: 'absolute',
                top: '28px',
                left: '0',
                width: 'min(320px, 90vw)',
                background: '#EFEBE3',
                border: '0.5px solid #D4C9B8',
                borderRadius: '8px',
                padding: '16px',
                zIndex: 100,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: '#5A5650',
                  lineHeight: 1.7,
                  marginBottom: '12px',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
              >
                Self-assessed snapshot, not a performance review. Each axis is a skill area — further from the centre means more confident.
              </p>
              <ul
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: 0,
                  margin: 0,
                  listStyle: 'none',
                }}
              >
                {[
                  'Scores are honest estimates, not inflated',
                  'Cloud / Infra at 2% is deliberate — not used it yet',
                  'Hover each axis to see contributing evidence',
                  'The shape matters more than any single number',
                ].map((line, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: '11px',
                      color: '#5A5650',
                      fontFamily: 'var(--font-mono)',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{ color: '#556E74', flexShrink: 0 }}>·</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
        <p className="text-[12px] text-[#556E74] italic mt-1">honest, self-assessed · hover each axis for breakdown</p>
      </div>
    </div>
  );
}
