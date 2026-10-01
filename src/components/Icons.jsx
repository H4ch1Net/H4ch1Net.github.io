// Small inline icon set (24px grid, stroke = currentColor) plus the GitHub and
// LinkedIn marks and per-project glyphs. All decorative: aria-hidden.

function Svg({ children, size = 16, className = '', viewBox = '0 0 24 24', fill = 'none' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={fill === 'none' ? 'currentColor' : 'none'}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export const ArrowRight = props => (
  <Svg {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const ArrowUpRight = props => (
  <Svg {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
)

export const CopyIcon = props => (
  <Svg {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </Svg>
)

export const CheckIcon = props => (
  <Svg {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
)

export const SearchIcon = props => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </Svg>
)

export const MailIcon = props => (
  <Svg {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
)

export const MenuIcon = props => (
  <Svg {...props}>
    <path d="M4 8h16M4 16h16" />
  </Svg>
)

export const CloseIcon = props => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const HashIcon = props => (
  <Svg {...props}>
    <path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16" />
  </Svg>
)

export const CodeIcon = props => (
  <Svg {...props}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
  </Svg>
)

export const FileIcon = props => (
  <Svg {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </Svg>
)

export const GitHubMark = ({ size = 16, className = '' }) => (
  <Svg size={size} className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </Svg>
)

export const LinkedInMark = ({ size = 16, className = '' }) => (
  <Svg size={size} className={className} viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
  </Svg>
)

// Line glyphs for the "more projects" cards, drawn on a 32px grid.
const GLYPHS = {
  nexus: (
    <>
      <path d="M16 3.5 27 9.75v12.5L16 28.5 5 22.25V9.75z" />
      <circle cx="16" cy="14" r="3" />
      <path d="M16 17v5" />
    </>
  ),
  nerd: (
    <>
      <ellipse cx="16" cy="8" rx="9" ry="3.5" />
      <path d="M7 8v16c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V8" />
      <path d="M7 16c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5" />
    </>
  ),
  rover: (
    <>
      <rect x="7" y="10" width="18" height="9" rx="2" />
      <path d="M12 10V6h8v4M16 6V3.5" />
      <circle cx="10" cy="24" r="3" />
      <circle cx="22" cy="24" r="3" />
      <path d="M13 24h6" />
    </>
  ),
  'memory-threads': (
    <path d="M11 4.5 5 8l2.5 5.5L10 12v15.5h12V12l2.5 1.5L27 8l-6-3.5c-.7 2-2.6 3.3-5 3.3s-4.3-1.3-5-3.3z" />
  ),
  'ks-led': (
    <>
      <path d="M12 22h8M13 26h6" />
      <path d="M16 4a7 7 0 0 0-4 12.7V20h8v-3.3A7 7 0 0 0 16 4z" />
      <path d="M25.5 7.5a8 8 0 0 1 0 9M28 5a12 12 0 0 1 0 14" />
    </>
  ),
  'job-hunter': (
    <>
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="6" />
      <circle cx="16" cy="16" r="1.5" />
      <path d="M16 2v5M16 25v5M2 16h5M25 16h5" />
    </>
  ),
}

export function ProjectGlyph({ id, className = '' }) {
  return (
    <Svg size={32} viewBox="0 0 32 32" className={`glyph ${className}`}>
      {GLYPHS[id] ?? <circle cx="16" cy="16" r="10" />}
    </Svg>
  )
}

// Stack-section column icons.
export const StackIcon = ({ id }) => {
  const paths = {
    swe: (
      <>
        <path d="m10 9-6 7 6 7M22 9l6 7-6 7" />
        <path d="m18 6-4 20" />
      </>
    ),
    sec: (
      <>
        <path d="M16 3.5 26 7.5v8c0 6-4.2 10.6-10 13-5.8-2.4-10-7-10-13v-8z" />
        <path d="m11.5 16 3 3 6-6.5" />
      </>
    ),
    infra: (
      <>
        <rect x="4" y="5" width="24" height="8" rx="2" />
        <rect x="4" y="19" width="24" height="8" rx="2" />
        <path d="M9 9h.01M9 23h.01M14 9h9M14 23h9M16 13v6" />
      </>
    ),
  }
  return (
    <Svg size={28} viewBox="0 0 32 32" className="stack-icon">
      {paths[id]}
    </Svg>
  )
}
