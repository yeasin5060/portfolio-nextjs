// Official SVG paths and metadata for all technologies
export const techStackCategories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

export const techStack = [
  // --- FRONTEND ---
  {
    name: 'React.js',
    category: 'Frontend',
    color: '#61DAFB',
    bgGlow: 'rgba(97, 218, 251, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Component architecture, custom hooks, Virtual DOM optimization & state management.',
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    color: '#FFFFFF',
    bgGlow: 'rgba(255, 255, 255, 0.2)',
    level: 'Advanced',
    experience: '1.5+ Years',
    description: 'App Router, Server Components, SSR/SSG, Turbopack, and full-stack API routes.',
    icon: (
      <svg viewBox="0 0 180 180" className="w-full h-full" fill="currentColor">
        <mask height="180" id="nextMask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
          <circle cx="90" cy="90" fill="black" r="90" />
        </mask>
        <g mask="url(#nextMask)">
          <circle cx="90" cy="90" data-theme="dark" fill="black" r="90" stroke="white" strokeWidth="6" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)" />
          <rect fill="url(#paint1_linear)" height="72" width="12" x="115" y="54" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="109" x2="144.5" y1="116.5" y2="160.5">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear" x1="121" x2="120.799" y1="54" y2="106.875">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    color: '#F7DF1E',
    bgGlow: 'rgba(247, 223, 30, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Modern ES6+, asynchronous programming, event loop, closures, DOM manipulation.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#F7DF1E">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm-1.8 17.6c-1.4 0-2.4-.8-2.8-1.9l1.8-1c.2.5.6.9 1 .9.5 0 .9-.3.9-.9V8.4h2.2v6.4c0 1.8-1.1 2.8-3.1 2.8zm5.9 0c-1.8 0-3-1-3.6-2.2l1.9-1.1c.4.7.9 1.1 1.7 1.1.7 0 1.2-.4 1.2-.9 0-.6-.5-.8-1.5-1.2l-.7-.3c-1.7-.7-2.4-1.6-2.4-3 0-1.7 1.3-3 3.3-3 1.5 0 2.5.6 3.1 1.7l-1.8 1.1c-.3-.5-.7-.8-1.3-.8-.5 0-.9.3-.9.7 0 .5.4.7 1.4 1.1l.7.3c2 .8 2.6 1.8 2.6 3.1 0 1.9-1.5 3.5-3.8 3.5z"/>
      </svg>
    )
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    color: '#3178C6',
    bgGlow: 'rgba(49, 120, 198, 0.2)',
    level: 'Proficient',
    experience: '1+ Years',
    description: 'Type safety, generics, interfaces, strict typing in React & Node backends.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#3178C6">
        <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0z" fill="#3178C6"/>
        <path d="M11.96 15.65c-.32.61-.79 1.1-1.38 1.45-.6.35-1.33.53-2.18.53-1.04 0-1.92-.26-2.63-.78-.72-.52-1.19-1.28-1.42-2.27l2.25-.6c.11.53.34.93.68 1.2.34.27.78.4 1.3.4.45 0 .82-.1 1.1-.3.28-.2.43-.5.43-.9 0-.33-.12-.6-.35-.8-.23-.2-.68-.42-1.35-.65l-.83-.28c-1.07-.37-1.85-.85-2.33-1.44-.48-.59-.72-1.34-.72-2.24 0-.98.36-1.8 1.07-2.46.72-.66 1.67-.99 2.87-.99.98 0 1.82.25 2.5.75.68.5 1.11 1.19 1.28 2.07l-2.23.56c-.09-.45-.29-.79-.58-1.01-.3-.23-.68-.34-1.15-.34-.43 0-.77.1-1.02.3-.25.2-.38.48-.38.83 0 .28.11.51.34.7.23.19.66.39 1.28.6l.83.28c1.15.39 1.98.88 2.5 1.48.51.59.77 1.34.77 2.25 0 .97-.36 1.8-1.07 2.49zm9.04-7.53h-3.41v9.28h-2.58V8.12h-3.42V5.98h9.41v2.14z" fill="#ffffff"/>
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    color: '#06B6D4',
    bgGlow: 'rgba(6, 182, 212, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Modern v4 & v3 utility classes, responsive grids, dark mode, animations.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#06B6D4">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    )
  },
  {
    name: 'Redux Toolkit',
    category: 'Frontend',
    color: '#764ABC',
    bgGlow: 'rgba(118, 74, 188, 0.2)',
    level: 'Proficient',
    experience: '1.5+ Years',
    description: 'Global state slices, async thunks, RTK Query, state normalization.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#764ABC">
        <path d="M15.9 8.2c.4 1.3.3 2.7-.2 3.8-.5 1-1.4 1.8-2.6 2.3-1.2.4-2.5.3-3.6-.1-.5-.2-1-.5-1.5-.9l-1.3 1.5c.7.6 1.4 1 2.2 1.3 1.6.6 3.4.7 5.1.1 1.7-.6 3-1.8 3.7-3.3.7-1.6.8-3.5.2-5.3-.6-1.8-2-3.1-3.7-3.9l-1.1 1.7c1.3.6 2.3 1.6 2.8 2.8zM8.1 15.8c-.4-1.3-.3-2.7.2-3.8.5-1 1.4-1.8 2.6-2.3 1.2-.4 2.5-.3 3.6.1.5.2 1 .5 1.5.9l1.3-1.5c-.7-.6-1.4-1-2.2-1.3-1.6-.6-3.4-.7-5.1-.1-1.7.6-3 1.8-3.7 3.3-.7 1.6-.8 3.5-.2 5.3.6 1.8 2 3.1 3.7 3.9l1.1-1.7c-1.3-.6-2.3-1.6-2.8-2.8z"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    )
  },
  {
    name: 'Framer Motion',
    category: 'Frontend',
    color: '#0055FF',
    bgGlow: 'rgba(0, 85, 255, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Gestures, spring physics, scroll animations, layout transitions, exit effects.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#0055FF">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    )
  },
  {
    name: 'HTML5',
    category: 'Frontend',
    color: '#E34F26',
    bgGlow: 'rgba(227, 79, 38, 0.2)',
    level: 'Expert',
    experience: '2+ Years',
    description: 'Semantic markup, accessibility (a11y), SEO standards, Web APIs.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#E34F26">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.4 5.4H5.1l.4 4.5h12.5l-.5 5.5-5.5 1.5-5.5-1.5-.3-3.2h2.5l.2 1.5 3.1.8 3.1-.8.3-3.4H5.8L4.9 3.2h14.3l-.3 2.2z"/>
      </svg>
    )
  },
  {
    name: 'CSS3',
    category: 'Frontend',
    color: '#1572B6',
    bgGlow: 'rgba(21, 114, 182, 0.2)',
    level: 'Expert',
    experience: '2+ Years',
    description: 'Flexbox, CSS Grid, custom properties, keyframes, transitions, media queries.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#1572B6">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.5 5.4H5.1l.4 4.5h10.4l-.4 4.3-3.5 1-3.5-1-.2-2.3H5.8l.4 4.5 5.8 1.6 5.8-1.6.8-8.8H5.6L5.3 3.2h13l-.3 2.2z"/>
      </svg>
    )
  },

  // --- BACKEND ---
  {
    name: 'Node.js',
    category: 'Backend',
    color: '#339933',
    bgGlow: 'rgba(51, 153, 51, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Runtime environment, Event loop, Streams, Buffer, modular backends.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#339933">
        <path d="M12 0l10.4 6v12L12 24 1.6 18V6L12 0zm0 2.3L3.6 7.1v9.8L12 21.7l8.4-4.8V7.1L12 2.3zm1.1 5.3v2.8c1.3.2 2.3.9 2.3 2.1 0 1.4-1.2 2-2.5 2.1l-.8.1c-.9.1-1.3.4-1.3.8 0 .5.5.8 1.3.8 1 0 1.8-.4 2.2-1l1.5 1.1c-.8 1.1-2.1 1.7-3.7 1.7-2.3 0-3.6-1.2-3.6-2.8 0-1.4 1-2.2 2.4-2.3l.9-.1c.8-.1 1.2-.3 1.2-.7 0-.4-.4-.7-1.1-.7-.8 0-1.5.3-2 1L8.4 9.1c.7-1.1 2-1.7 3.5-1.7.4 0 .8.1 1.2.2z"/>
      </svg>
    )
  },
  {
    name: 'Express.js',
    category: 'Backend',
    color: '#FFFFFF',
    bgGlow: 'rgba(255, 255, 255, 0.15)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'RESTful architecture, custom middleware, routing, error handling, JWT auth.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M24 18.588l-6.035-7.317 5.617-6.81h-3.659l-3.945 4.88-3.958-4.88H8.361l5.63 6.81-6.048 7.317h3.672l4.377-5.393 4.364 5.393H24zM3.488 18.588h3.332V5.461H3.488v13.127z"/>
      </svg>
    )
  },
  {
    name: 'REST API',
    category: 'Backend',
    color: '#009688',
    bgGlow: 'rgba(0, 150, 136, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Clean CRUD endpoints, pagination, JWT auth, status codes, CORS policies.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#009688">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    )
  },
  {
    name: 'Socket.IO',
    category: 'Backend',
    color: '#010101',
    bgGlow: 'rgba(1, 1, 1, 0.25)',
    level: 'Proficient',
    experience: '1+ Years',
    description: 'Bi-directional real-time communication, chat rooms, broadcast events, online presence.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#010101">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.836 12.836l-2.072 2.072-1.768-1.768 1.188-1.188a1.66 1.66 0 0 0-1.184-.488h-3.99a1.66 1.66 0 0 0-1.66 1.66v2.332h-2.5V13.12a4.16 4.16 0 0 1 4.16-4.16h3.99c1.096 0 2.09.444 2.808 1.162l1.028-1.028 2.072 2.072-2.072 1.67z"/>
      </svg>
    )
  },

  // --- DATABASE ---
  {
    name: 'MongoDB',
    category: 'Database',
    color: '#47A248',
    bgGlow: 'rgba(71, 162, 72, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Document models, Mongoose schemas, Aggregation Pipelines, indexing, Atlas.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#47A248">
        <path d="M12 0C11.5 0 10.5 4.5 10.5 7.5C10.5 13.5 6 15 6 18C6 21.3 8.7 24 12 24C15.3 24 18 21.3 18 18C18 15 13.5 13.5 13.5 7.5C13.5 4.5 12.5 0 12 0ZM12 21.8C10 21.8 8.8 20.2 8.8 18.5C8.8 16.5 10.6 15.1 11.4 13.8C11.7 13.4 11.9 12.8 12 12.2C12.1 12.8 12.3 13.4 12.6 13.8C13.4 15.1 15.2 16.5 15.2 18.5C15.2 20.2 14 21.8 12 21.8Z"/>
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    color: '#4169E1',
    bgGlow: 'rgba(65, 105, 225, 0.2)',
    level: 'Intermediate',
    experience: '1+ Years',
    description: 'Relational data modeling, foreign keys, ACID transactions, complex queries.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#4169E1">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5S10 17.33 10 16.5v-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v3zm3.5-3c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5zm-7 0c0 .83-.67 1.5-1.5 1.5S8 14.33 8 13.5v-2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v2z"/>
      </svg>
    )
  },
  {
    name: 'Prisma',
    category: 'Database',
    color: '#2D3748',
    bgGlow: 'rgba(45, 55, 72, 0.2)',
    level: 'Intermediate',
    experience: '1+ Years',
    description: 'Type-safe database ORM, schema migrations, relations, query generation.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#2D3748">
        <path d="M21.728 17.728L13.714 1.488a1.92 1.92 0 0 0-3.428 0L2.272 17.728a1.92 1.92 0 0 0 1.714 2.768h16.028a1.92 1.92 0 0 0 1.714-2.768zM12 4.8l6.4 13.2H5.6L12 4.8z"/>
      </svg>
    )
  },

  // --- TOOLS ---
  {
    name: 'Git',
    category: 'Tools',
    color: '#F05032',
    bgGlow: 'rgba(240, 80, 50, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Branching strategies, merge conflict resolution, interactive rebase, stashing.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#F05032">
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.808 2.585l3.22 3.22a1.78 1.78 0 0 1 2.257 2.257l3.097 3.097a1.78 1.78 0 0 1 2.256 2.257l3.908-3.908a1.5 1.5 0 0 0 0-2.578zM15.424 16.5a1.78 1.78 0 0 1-2.257-2.257l-3.097-3.097a1.78 1.78 0 0 1-1.393.187L5.59 14.42a1.78 1.78 0 1 1-1.06-1.06l3.087-3.087a1.78 1.78 0 0 1-.187-1.393L2.585 3.935.452 6.068a1.5 1.5 0 0 0 0 2.126l10.48 10.48a1.5 1.5 0 0 0 2.126 0l2.366-2.366v-.008z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    category: 'Tools',
    color: '#FFFFFF',
    bgGlow: 'rgba(255, 255, 255, 0.15)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Version control, open source collaboration, CI/CD Actions, pull requests.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'VS Code',
    category: 'Tools',
    color: '#007ACC',
    bgGlow: 'rgba(0, 122, 204, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Primary IDE, debugging, extension ecosystem, terminal integration.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#007ACC">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .32 8.704L3.898 12 .32 15.296a1 1 0 0 0 .007 1.443l1.322 1.202c.369.335.928.355 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zM18.5 16.5l-8.08-6.5 8.08-6.5v13z"/>
      </svg>
    )
  },
  {
    name: 'Postman',
    category: 'Tools',
    color: '#FF6C37',
    bgGlow: 'rgba(255, 108, 55, 0.2)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'API testing, automated request collections, environment variables, mock servers.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FF6C37">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm6.54 11.23l-3.32 1.92c-.12.07-.27.07-.39 0l-1.63-.94a.4.4 0 0 0-.4 0l-1.63.94c-.12.07-.27.07-.39 0L7.46 11.23a.39.39 0 0 1 0-.68l3.32-1.92c.12-.07.27-.07.39 0l1.63.94c.12.07.28.07.4 0l1.63-.94c.12-.07.27-.07.39 0l3.32 1.92c.24.14.24.54 0 .68z"/>
      </svg>
    )
  },
  {
    name: 'Figma',
    category: 'Tools',
    color: '#F24E1E',
    bgGlow: 'rgba(242, 78, 30, 0.2)',
    level: 'Proficient',
    experience: '2+ Years',
    description: 'UI/UX design, wireframing, component design systems, developer handoff.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/>
        <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/>
        <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E"/>
        <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/>
        <circle cx="16" cy="12" r="4" fill="#1ABCFE"/>
      </svg>
    )
  },
  {
    name: 'Docker',
    category: 'Tools',
    color: '#2496ED',
    bgGlow: 'rgba(36, 150, 237, 0.2)',
    level: 'Intermediate',
    experience: '1+ Years',
    description: 'Containerization of Node/React apps, Dockerfile configuration, local dev parity.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#2496ED">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.79 9.89c-.465-.465-1.285-.638-2.07-.465-.138-.838-.744-1.536-1.583-1.815-.28-.093-.56-.14-.838-.14a3.86 3.86 0 00-1.862.465l-.326.186-.186.326a5.79 5.79 0 00-.838 2.887c0 .28.047.56.094.838H.208a.208.208 0 00-.208.208c0 .698.047 1.396.14 2.094.698 3.676 3.49 6.654 7.213 7.632.744.186 1.489.28 2.233.28 2.42 0 4.793-.79 6.748-2.28 2.699-2.047 4.28-5.165 4.374-8.562.744-.093 1.443-.465 1.954-1.024.512-.558.745-1.256.558-1.954-.093-.326-.28-.605-.465-.838z"/>
      </svg>
    )
  },
  {
    name: 'Vercel',
    category: 'Tools',
    color: '#FFFFFF',
    bgGlow: 'rgba(255, 255, 255, 0.15)',
    level: 'Advanced',
    experience: '2+ Years',
    description: 'Serverless deployments, edge caching, custom domains, automated CI/CD preview builds.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M24 22.525H0l12-21.05 12 21.05z"/>
      </svg>
    )
  }
];

