import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const BLUE = '#001b55'
const GOLD = '#d79b05'
const PROGRAM = 'Ingeniería en Tecnologías de la Información'

async function loadLogo(): Promise<string | null> {
  try {
    const file = await readFile(path.join(process.cwd(), 'public/logo.png'))
    return `data:image/png;base64,${file.toString('base64')}`
  } catch {
    return null
  }
}

// Pick the title size from its length so long titles wrap inside the card instead of overflowing.
function titleFontSize(title: string): number {
  if (title.length <= 24) return 92
  if (title.length <= 48) return 76
  if (title.length <= 80) return 60
  return 48
}

export async function renderOgImage({ title, subtitle }: { title: string; subtitle?: string }) {
  const logo = await loadLogo()

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: BLUE,
        padding: '64px 72px',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {logo ? (
          // The logo is transparent inside its ring, so it sits on a white disc to stay legible on blue.
          <div style={{ display: 'flex', width: 104, height: 104, borderRadius: 52, backgroundColor: '#ffffff' }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={logo} width={104} height={104} />
          </div>
        ) : null}
        <div style={{ display: 'flex', width: 96, height: 6, backgroundColor: GOLD }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            fontSize: titleFontSize(title),
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ display: 'flex', marginTop: 24, fontSize: 32, color: '#c9d3ee', lineHeight: 1.3 }}>
            {subtitle}
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', borderTop: `4px solid ${GOLD}`, paddingTop: 20 }}>
        {title.startsWith(PROGRAM) ? null : (
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 600 }}>{PROGRAM}</div>
        )}
        <div style={{ display: 'flex', fontSize: 26, color: GOLD, marginTop: 6 }}>ESPOCH Sede Morona Santiago</div>
      </div>
    </div>,
    { ...ogSize },
  )
}
