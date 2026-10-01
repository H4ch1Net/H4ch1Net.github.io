// All page copy lives here so content edits never touch layout code (App.jsx).
// Privacy: this site lists name, email, GitHub, and LinkedIn only. No phone
// number, no street-level location. See AGENTS.md "Content Sensitivity Rules".

export const PROFILE = {
  name: 'Mauro',
  handle: 'H4ch1Net',
  email: 'h4ch1net@gmail.com',
  github: 'https://github.com/H4ch1Net',
  linkedin: 'https://linkedin.com/in/mauro-hernandez-rico',
  linkedinLabel: 'mauro-hernandez-rico',
  region: 'Coachella Valley, CA',
  timeZone: 'America/Los_Angeles',
  source: 'https://github.com/H4ch1Net/H4ch1Net.github.io',
  // Start of the Eisenhower Health apprenticeship; drives the "uptime" readout.
  itSince: '2024-06-01T00:00:00-07:00',
}

export const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'logs', label: 'Logs' },
  { id: 'contact', label: 'Contact' },
]

export const HERO = {
  eyebrow: 'Software engineering · Security · Infrastructure',
  eyebrowShort: 'Software · Security · Infrastructure',
  titleLines: ['I build software', 'for systems that'],
  titleAccent: 'can\u2019t go down.',
  lede: "I'm Mauro, a computer science student and systems administrator. I ship Python tooling into production at a 450-bed hospital, build open-source detection and network-visibility tools, and compete nationally in cybersecurity.",
}

export const HUD = [
  { label: 'Now', value: 'Systems Administrator', sub: 'Eisenhower Health' },
  { label: 'Studying', value: 'B.S. Computer Science', sub: 'CSUSB, class of 2029' },
]

export const METRICS = [
  { value: 450, suffix: '-bed', label: 'hospital infrastructure my Python automation supports' },
  { value: 3, label: 'production tools shipped in my first 60 days as a sysadmin' },
  { value: 1, suffix: 'st', label: 'place, college division, IE Mayors Cyber Cup 2025 (3rd of 143 overall)' },
  { value: 3, prefix: 'Top ', suffix: '%', label: 'National Cyber League, Diamond tier, Fall 2024 team game' },
]

export const MARQUEE = [
  'Python',
  'FastAPI',
  'React',
  'Vite',
  'Docker',
  'SQLite',
  'pytest',
  'PowerShell',
  'Bash',
  'Cisco IOS',
  'SNMP',
  'SSH',
  'Active Directory',
  'Group Policy',
  'Wireshark',
  'Burp Suite',
  'Nmap',
  'MITRE ATT&CK',
  'LLM APIs',
  'CesiumJS',
  'OAuth2',
  'Linux',
  'Git',
]

export const FEATURED = [
  {
    id: 'sentryd',
    name: 'sentryd',
    kind: 'Network anomaly detection platform',
    year: '2026',
    summary:
      'Explainable detection, from packet capture to analyst report. Every alert carries the rule that fired, its severity and confidence, and the packets that triggered it.',
    points: [
      'Replays pcap captures or live traffic through explainable rules: port scans, ARP spoofing, EWMA traffic-spike baselines, and YAML signatures.',
      'Ships a CLI, a live terminal dashboard, and a FastAPI web console with case management and CSV, JSON, and Markdown analyst exports.',
      'An optional LLM triage layer explains alerts but never influences detection. Runs fully offline in Docker with a passing pytest suite.',
    ],
    stack: ['Python', 'FastAPI', 'SQLite', 'Docker', 'pytest'],
    href: 'https://github.com/H4ch1Net/sentryd',
  },
  {
    id: 'switch-vis',
    name: 'switch-vis',
    kind: 'Live switch front-panel visualizer',
    year: '2026',
    summary:
      'Point it at a switch and see every port the way the switch sees it: link state, VLAN, speed, duplex, PoE, and err-disabled, rendered on a realistic front panel.',
    points: [
      'Reads live port state over SNMP with a dependency-free IF-MIB walker, or over SSH and serial console by parsing Cisco IOS show output.',
      'Searchable catalog of 100+ switch models across Catalyst, Aruba, Juniper, and Ubiquiti, with live polling and a browser dashboard.',
      'Built-in ping, DNS, TCP, traceroute, and ARP tooling for IDF and MDF documentation.',
    ],
    stack: ['Python', 'SNMP', 'SSH', 'Serial', 'Cisco IOS'],
    href: 'https://github.com/H4ch1Net/switch-vis-v2',
  },
  {
    id: 'argus',
    name: 'Argus',
    kind: 'OSINT geospatial intelligence console',
    year: '2026',
    summary:
      'A live 3D globe that correlates public intelligence feeds into one browser console, with threat-map arcs and multi-source asset correlation.',
    points: [
      'Fuses flight, AIS vessel, satellite TLE, seismic, wildfire, BGP, certificate transparency, and Shodan feeds.',
      'Key-broker proxy with an allowlisted feed registry, OAuth2 token management, and a per-feed budget governor.',
      'Capability-tiered renderer that adapts resolution and frame rate to the client device.',
    ],
    stack: ['JavaScript', 'CesiumJS', 'OAuth2', 'REST APIs'],
    href: 'https://github.com/H4ch1Net/argus',
  },
  {
    id: 'bagley',
    name: 'Bagley',
    kind: 'Agentic AI operations assistant',
    year: '2024 - present',
    summary:
      'Ask in plain language, by voice or text, and it connects to your hosts over SSH to scan, diagnose, and tune them.',
    points: [
      'Autonomously connects to remote hosts over SSH, scans networks, runs diagnostics, and tunes system performance from natural language.',
      'Built on a command-routing engine, a real-time event handler, a multi-interface pipeline, and an LLM integration layer.',
    ],
    stack: ['Python', 'LLM APIs', 'SSH', 'Voice + text'],
    href: 'https://github.com/H4ch1Net/bagley-assistant',
  },
]

// `status` replaces the link for work that can't be public.
export const PROJECTS = [
  {
    id: 'nexus',
    name: 'Nexus',
    kind: 'Cybersecurity toolkit',
    year: '2025 - present',
    summary:
      'All-in-one Python toolkit for CTF competition and security research: cryptography, OSINT, password cracking, log and network analysis, forensics, and exploitation. MIT licensed.',
    stack: ['Python', 'OSINT', 'Cryptography', 'Forensics'],
    href: 'https://github.com/H4ch1Net/Nexus',
  },
  {
    id: 'nerd',
    name: 'NERD',
    kind: 'Network equipment inventory CLI',
    year: '2025',
    summary:
      'Menu-driven CLI over a JSON-backed datastore for network equipment inventory: lookup, add, modify, and delete across switches, purchase orders, serial numbers, and asset attributes.',
    stack: ['Python', 'Standard library only', 'JSON'],
    status: 'In production · internal',
  },
  {
    id: 'rover',
    name: 'Autonomous Rover',
    kind: 'NASA NCAS 2026',
    year: 'Jan 2026',
    summary:
      'Most autonomous rover of the 4 competing teams: coordinate navigation, gyroscopic drift correction, ultrasonic obstacle avoidance, and mineral identification by color sensor.',
    stack: ['Python', 'MicroPython', 'LEGO EV3', 'ev3dev'],
    href: 'https://github.com/H4ch1Net/NCAS26-RedGiant-Jarvis',
  },
  {
    id: 'memory-threads',
    name: 'Memory Threads',
    kind: 'PS/NExT Vibe-a-thon 2026',
    year: 'Jun 2026',
    summary:
      'Client-side apparel mockup generator that turns style, colorway, artwork, and event inputs into four concepts, with layer controls, front and back views, and PNG, PDF, PowerPoint, and SVG export.',
    stack: ['React', 'Vite', 'JavaScript'],
    status: 'Private repo',
  },
  {
    id: 'ks-led',
    name: 'KS LED Controller',
    kind: 'Bluetooth reverse engineering',
    summary:
      'Reverse-engineered the Bluetooth protocol of discontinued KS LED hardware, then wrote an open-source Python controller to replace the broken vendor app.',
    stack: ['Python', 'Bluetooth LE', 'Reverse engineering'],
    href: 'https://github.com/H4ch1Net/ks-led-controller',
  },
  {
    id: 'job-hunter',
    name: 'job-hunter',
    kind: 'Job search automation',
    summary:
      'Aggregates listings from Adzuna, USAJobs, The Muse, and RemoteOK, scores relevance with an LLM, and serves results through a local dashboard backed by SQLite.',
    stack: ['Python', 'SQLite', 'LLM scoring'],
    status: 'Private repo',
  },
]

export const EXPERIENCE = [
  {
    role: 'Systems Administrator',
    period: 'Jun 2025 - Present',
    current: true,
    points: [
      'Build and maintain Python network automation and asset management tooling for the enterprise infrastructure of a 450-bed hospital. Shipped three production tools in the first 60 days.',
      'Built NERD, a menu-driven CLI over a JSON-backed datastore for network equipment inventory: lookup, add, modify, and delete across switches, purchase orders, serial numbers, and asset attributes.',
      'Standardized all tooling on the Python standard library with zero third-party dependencies, removing deployment friction across segmented hospital networks while maintaining HIPAA compliance.',
    ],
    tags: ['Python', 'Network automation', 'Cisco IOS', 'HIPAA'],
  },
  {
    role: 'IT Desktop Technician',
    period: 'Sep 2024 - Jun 2025',
    points: [
      'Engineered a menu-driven PowerShell deployment framework covering Active Directory group assignment, role-based software installs, and Windows and Lenovo driver updates. It replaced an 8-hour manual imaging cycle for four workstations with parallel, unattended deployment and automated post-build verification.',
      'Administered Active Directory computer objects and security group membership to enforce Group Policy, and resolved 10+ tickets a day through Ivanti and RDP across clinical and administrative environments.',
      'Ran Windows 11 upgrades and device migrations with certified Blancco data sanitization under healthcare data-handling policy.',
    ],
    tags: ['PowerShell', 'Active Directory', 'Group Policy', 'Ivanti'],
  },
  {
    role: 'IT Service Desk',
    period: 'Jun 2024 - Sep 2024',
    points: [
      'Resolved 25-30+ support tickets a day in JIRA across clinical and administrative departments, maintaining HIPAA compliance on all patient-adjacent systems.',
    ],
    tags: ['JIRA', 'ITSM', 'HIPAA'],
  },
]

export const EMPLOYER = {
  name: 'Eisenhower Health',
  program: 'IT Apprenticeship',
  location: 'Rancho Mirage, CA',
  blurb:
    '450-bed regional health system. HIPAA-regulated, segmented networks, clinical systems that run around the clock.',
}

export const LEADERSHIP = {
  role: 'President, CODIS Cybersecurity Club',
  org: 'College of the Desert',
  period: '2026',
  points: [
    'Lead the competitive cybersecurity team through regional and national CTF events, and coordinate competition logistics, registration, and team placement.',
    'Run a captain-led weekly training program covering ethical hacking, web exploitation, digital forensics, Wireshark, binary exploitation, reverse engineering, hash cracking, and A+, Network+, and Security+ prep.',
  ],
}

export const ABOUT = {
  title: 'Studying full time. Shipping full time.',
  bio: [
    "I'm Mauro, also known online as H4ch1Net. I started on a hospital service desk in 2024 and have worked my way into systems administration, automating whatever the job let me automate along the way: first a PowerShell deployment framework, then Python network automation and inventory tooling that's still in production.",
    "I'm dual-enrolled full time at CSUSB and College of the Desert while working full time in enterprise IT. Outside of that, I compete in CTFs, run my college's cybersecurity club, and build tools for detection, network visibility, and automation. Software engineering is where I'm headed.",
  ],
  education: [
    {
      school: 'California State University, San Bernardino',
      degree: 'B.S. Computer Science',
      year: 'Expected 2029',
      note: "Dean's List, College of Natural Sciences, Spring 2026",
    },
    {
      school: 'College of the Desert',
      degree: 'A.S. Computer Information Systems',
      year: 'Expected 2027',
    },
  ],
  hardware: ['Raspberry Pi', 'ESP32', 'Arduino'],
  focus: [
    { label: 'Detection engineering', project: 'sentryd', id: 'sentryd' },
    { label: 'Network visibility', project: 'switch-vis', id: 'switch-vis' },
    { label: 'Geospatial OSINT', project: 'Argus', id: 'argus' },
    { label: 'Agentic tooling', project: 'Bagley', id: 'bagley' },
  ],
}

export const STACK = [
  {
    id: 'swe',
    title: 'Software engineering',
    blurb: 'Backend services, CLIs, and developer tooling, mostly in Python and increasingly full stack.',
    groups: [
      { label: 'Languages', items: ['Python', 'JavaScript', 'C++', 'C#', 'SQL', 'PowerShell', 'Bash', 'MicroPython'] },
      {
        label: 'Frameworks & tools',
        items: ['FastAPI', 'React', 'Vite', 'SQLite', 'Docker', 'pytest', 'Git', 'REST APIs', 'JSON', 'YAML'],
      },
      {
        label: 'AI & automation',
        items: ['LLM integration', 'OpenAI', 'Anthropic', 'OpenRouter', 'Agentic systems', 'Tool orchestration'],
      },
    ],
  },
  {
    id: 'sec',
    title: 'Security',
    blurb: 'Offense-informed defense: competition experience feeding detection engineering and tooling.',
    groups: [
      {
        label: 'Tools',
        items: ['Wireshark', 'Burp Suite', 'Metasploit', 'Nmap', 'John the Ripper', 'Gobuster', 'Autopsy', 'CyberChef'],
      },
      {
        label: 'Practice',
        items: ['Packet & log analysis', 'Digital forensics', 'OSINT', 'Vulnerability assessment', 'Endpoint security'],
      },
      { label: 'Frameworks', items: ['MITRE ATT&CK', 'OWASP Top 10', 'CVE research'] },
    ],
  },
  {
    id: 'infra',
    title: 'Infrastructure & IT',
    blurb: 'Enterprise Windows and Cisco networks in a HIPAA-regulated, around-the-clock environment.',
    groups: [
      {
        label: 'Systems',
        items: [
          'Active Directory',
          'Group Policy',
          'Windows Server',
          'Windows 10/11',
          'Linux (Ubuntu, Kali)',
          'VMware',
        ],
      },
      {
        label: 'Networking',
        items: ['Cisco IOS', 'TCP/IP', 'DNS', 'DHCP', 'VLANs', 'SNMP', 'SSH', 'VPN', 'Infoblox', 'Cisco Modeling Labs'],
      },
      {
        label: 'Operations',
        items: ['Ivanti', 'Blancco', 'JIRA / ITSM', 'Patch management', 'Imaging & deployment', 'HIPAA'],
      },
    ],
  },
]

export const HONORS = [
  {
    mark: '1st',
    title: 'Inland Empire Mayors Cyber Cup',
    meta: 'IEGO Collaborative · 2025',
    detail: 'College division winner, 3rd overall of 143 teams.',
  },
  {
    mark: 'MVP',
    title: 'NASA NCAS 2026',
    meta: 'National Community College Aerospace Scholars',
    detail: 'Team MVP, selected from the full cohort for technical leadership and performance.',
  },
  {
    mark: 'Top 3%',
    title: 'National Cyber League',
    meta: 'Fall 2024 team game',
    detail: 'Diamond tier nationally.',
    verify: 'https://cyberskyline.com/verify/8N631HG39DG2',
  },
  {
    mark: "Dean's List",
    title: 'CSUSB',
    meta: 'College of Natural Sciences · Spring 2026',
    detail: 'Earned while working full time and dual-enrolled.',
  },
]

// National Cyber League results, oldest to newest. Labels match the
// cyberskyline.com verification pages.
export const NCL_SEASONS = [
  {
    season: 'Fall 2022',
    team: { tier: 'gold', label: 'Gold', verify: 'https://cyberskyline.com/verify/3RXF0FUJXNAW' },
    individual: { tier: 'platinum', label: 'Platinum', verify: 'https://cyberskyline.com/verify/MUXA657MJX6X' },
  },
  {
    season: 'Spring 2023',
    team: { tier: 'platinum', label: 'Platinum', verify: 'https://cyberskyline.com/verify/UCQR3H95VD3V' },
    individual: { tier: 'platinum', label: 'Platinum', verify: 'https://cyberskyline.com/verify/CPCFW8GL10N4' },
  },
  {
    season: 'Fall 2023',
    team: { tier: 'gold', label: 'Gold', verify: 'https://cyberskyline.com/verify/MLBDDJNL01K0' },
    individual: { tier: 'bronze', label: 'Bronze', verify: 'https://cyberskyline.com/verify/JNDQPQJLPJPC' },
  },
  {
    season: 'Fall 2024',
    team: {
      tier: 'diamond',
      label: 'Diamond-3',
      pct: '97th pct',
      verify: 'https://cyberskyline.com/verify/8N631HG39DG2',
    },
    individual: {
      tier: 'diamond',
      label: 'Diamond-1',
      pct: '87th pct',
      verify: 'https://cyberskyline.com/verify/D7YWWNXMDH4N',
    },
  },
  {
    season: 'Fall 2025',
    team: {
      tier: 'diamond',
      label: 'Diamond-4',
      pct: '87th pct',
      verify: 'https://cyberskyline.com/verify/433Q1RTAP7WT',
    },
    individual: {
      tier: 'diamond',
      label: 'Diamond-1',
      pct: '83rd pct',
      verify: 'https://cyberskyline.com/verify/P0GK5KL1N4VA',
    },
  },
]

export const COMPETITIONS = [
  {
    name: 'IE CA Mayors Cyber Cup 2025, Main Event',
    result: '3rd of 143 teams · 1st among Inland Empire colleges',
    score: '1470 / 2075 pts',
  },
  { name: 'SoCal Cyber Cup 2024, Final Round', verify: 'https://cyberskyline.com/verify/8D3FU1H344UM' },
  { name: 'SoCal Cyber Cup, Qualifier Round', verify: 'https://cyberskyline.com/verify/UFVQF7TAVHP0' },
  { name: 'IE/Desert CA Mayors Cyber Cup 2023', result: '25th of 91 teams', score: '725 / 2000 pts' },
  { name: 'Also competed in', result: 'MetaCTF · SkillBit Flash CTF · Vegetable CTF' },
]

export const CERTS = [
  {
    name: 'CompTIA A+',
    detail: 'Certified Sep 2025 · valid through Sep 2028',
    verify: 'https://cp.certmetrics.com/comptia/en/public/verify/credential/NXCDHT0Y8JFE20DJ',
  },
  { name: 'TestOut PC Pro', verify: 'https://certification.testout.com/verifycert/6-2C6-M4997' },
  { name: 'TestOut Network Pro', verify: 'https://certification.testout.com/verifycert/6-2C6-SP9QT' },
  { name: 'TestOut Security Pro', verify: 'https://certification.testout.com/verifycert/6-2C6-V3A3KA' },
]

export const CERTS_IN_PROGRESS = ['CompTIA Security+', 'Cisco CCNA']

export const CONTACT = {
  title: ['Let’s build something', 'that stays up.'],
  lede: "I'm open to software engineering internships and roles, especially where reliability and security matter. Email is the fastest way to reach me.",
}
