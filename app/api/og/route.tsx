import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'John Doe';
  const tag = searchParams.get('tag') || 'Data & AI Portfolio';

  // Fetch DM Serif Display (400) and DM Sans (400) as ArrayBuffers for Satori rendering
  const [dmSerifData, dmSansData] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2K_c.ttf'
    ).then((res) => res.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf'
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#EFEBE3',
          fontFamily: '"DM Sans"',
        }}
      >
        {/* Outer editorial border frame */}
        <div
          style={{
            width: '1120px',
            height: '550px',
            border: '1px solid #D4C9B8',
            borderRadius: '16px',
            background: '#F7F4EF',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Top label bar — mimics .pf-label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              background: '#EFEBE3',
              borderBottom: '1px solid #E0DAD0',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#999999',
            }}
          >
            portfolio · open graph
          </div>

          {/* Content area */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '48px 56px',
              gap: '20px',
            }}
          >
            {/* Tag pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#556E74',
                  border: '1px solid #D4C9B8',
                  padding: '5px 16px',
                  borderRadius: '100px',
                  background: '#EFEBE3',
                }}
              >
                {tag}
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontFamily: '"DM Serif Display"',
                fontSize: '52px',
                lineHeight: 1.15,
                color: '#1A1814',
                maxWidth: '900px',
              }}
            >
              {title}
            </div>

            {/* Divider */}
            <div
              style={{
                width: '64px',
                height: '1px',
                background: '#D4C9B8',
                marginTop: '8px',
              }}
            />

            {/* Byline */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '4px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4CAF7E',
                }}
              />
              <span
                style={{
                  fontSize: '14px',
                  color: '#5A5650',
                  fontWeight: 400,
                }}
              >
                John Doe · Data & AI Portfolio
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 24px',
              background: '#1A1814',
              borderTop: '1px solid #2E2A25',
            }}
          >
            <span
              style={{
                fontFamily: '"DM Serif Display"',
                fontSize: '14px',
                color: '#F7F4EF',
              }}
            >
              johndoe.dev
            </span>
            <div
              style={{
                display: 'flex',
                gap: '20px',
              }}
            >
              <span style={{ fontSize: '11px', color: '#5A5650' }}>LinkedIn</span>
              <span style={{ fontSize: '11px', color: '#5A5650' }}>GitHub</span>
              <span style={{ fontSize: '11px', color: '#5A5650' }}>Kaggle</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'DM Serif Display',
          data: dmSerifData,
          weight: 400 as const,
          style: 'normal' as const,
        },
        {
          name: 'DM Sans',
          data: dmSansData,
          weight: 400 as const,
          style: 'normal' as const,
        },
      ],
    }
  );
}
