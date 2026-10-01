// JS mirror of the color tokens in App.css :root, for canvas renderers that
// can't read CSS variables. Keep the two in sync when a token changes.
export const PALETTE = {
  bg: '#0a0a0a',
  bgAlt: '#050505',
  surface: '#0f0f0f',
  surface2: '#141414',
  border: '#2a2a2a',
  borderSoft: '#1c1c1c',
  accent: '#00e38c',
  accentDk: '#00c078',
  text: '#e0e0e0',
  body: '#c0c0c0',
  muted: '#a0a0a0',
  dim: '#6e6e6e',
  warn: '#fab219',
  serious: '#ec835a',
  danger: '#d03b3b',
  info: '#4fc3f7',
}

// '#00e38c' -> '0, 227, 140'
export function hexToRgb(hex) {
  let h = hex.replace(/^#/, '')
  if (h.length === 3)
    h = h
      .split('')
      .map(c => c + c)
      .join('')
  const n = parseInt(h, 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

export function rgba(hex, alpha) {
  return `rgba(${hexToRgb(hex)}, ${alpha})`
}

export const FONT_MONO = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace'
export const FONT_SANS = 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
