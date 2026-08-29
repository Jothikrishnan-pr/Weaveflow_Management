import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Landing.css'

const steps = [
  { n: '01', title: 'Register a weaver', body: "Add a weaver once — name, contact, bank details, and saree type — and they're ready for their first loom." },
  { n: '02', title: 'Assign a loom', body: 'Hand out a production batch with a target and a rate per saree. One active loom per weaver at a time.' },
  { n: '03', title: 'Track production', body: 'Log completed sarees as they come in. The loom status moves itself forward as counts update.' },
  { n: '04', title: 'Settle payment', body: "Pay out what's owed. Advances and interest are deducted automatically at final settlement." },
]

const features = [
  { title: 'Weaver records', body: "One place for every weaver's contact details, bank information, and saree specialty.", icon: 'user' },
  { title: 'Loom tracking', body: 'Targets, completed counts, and status — always visible, always current.', icon: 'loom' },
  { title: 'Advances with interest', body: 'Cash advances accrue monthly interest and get deducted automatically at final settlement.', icon: 'coin' },
  { title: 'Salary settlement', body: 'Partial or final payments, with deductions capped so net pay never goes negative.', icon: 'receipt' },
  { title: 'Full history', body: 'Every loom, payment, and advance for a weaver, in one searchable record.', icon: 'history' },
  { title: 'Role-based access', body: 'Staff log daily production. Only admins move money or change structure.', icon: 'shield' },
]

const comparison = [
  { old: 'Production tallies live in a notebook, easy to lose or misread', now: "Every loom's progress logged the moment it happens" },
  { old: 'Advance interest calculated by hand, month to month', now: "Interest accrues automatically from the day it's issued" },
  { old: 'No record of who was paid what, or when', now: 'Every payment timestamped with a running sequence per loom' },
  { old: 'Anyone can change anything', now: 'Staff log production; only admins touch money' },
]

const statusFlow = ['OPEN', 'IN PROGRESS', 'WAITING FOR PAYMENT', 'COMPLETED']

const faqs = [
  { q: 'Does this replace paper records entirely?', a: "That's the idea — every weaver, loom, advance, and payment lives in one system instead of scattered notebooks." },
  { q: 'Can more than one person use it at once?', a: 'Yes. Staff accounts can log production and check status; admin accounts additionally handle advances, payments, and new weaver registration.' },
  { q: "What happens to an advance if it isn't fully repaid?", a: 'It stays open, accruing interest, until enough payments have been settled against it to close the balance.' },
  { q: "Is a weaver's full history kept?", a: "Yes — every loom they've been assigned, every payment made, and every advance given stays on their record." },
]

const stack = [
  { group: 'Frontend', items: ['React 18', 'Vite', 'React Router', 'Axios'] },
  { group: 'Backend', items: ['Spring Boot 3', 'Spring Security', 'JWT', 'Spring Data JPA'] },
  { 
    group: 'Database', 
    items: [
      { name: 'MySQL', current: false },
      { name: 'Aiven', current: false },
      { name: 'Railway', current: false },
      { name: 'TiDB Cloud', current: true }
    ]
  },
  { group: 'Hosting', items: ['Render (Web Service)', 'Render (Static Site)'] },
]

const marqueeItems = [
  'WEAVER MANAGEMENT', 'LOOM TRACKING', 'ADVANCES & INTEREST',
  'ROLE-BASED ACCESS', 'SALARY SETTLEMENT', 'FULL HISTORY',
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Reveal({ as: Tag = 'div', className = '', children, style }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  )
}

function Icon({ name }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'user':
      return <svg {...common}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.5-4 5-5.5 7-5.5s5.5 1.5 7 5.5" /></svg>
    case 'loom':
      return <svg {...common}><rect x="3.5" y="5" width="17" height="14" rx="1.5" /><path d="M3.5 10h17M8 5v14M15 5v14" /></svg>
    case 'coin':
      return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 8v8M9.5 10a2.5 2 0 0 1 5 0c0 1.5-2.5 2-2.5 2s-2.5.5-2.5 2a2.5 2 0 0 0 5 0" /></svg>
    case 'receipt':
      return <svg {...common}><path d="M6 3h12v18l-2.5-1.5L13 21l-1-1.5-1 1.5-2.5-1.5L6 21V3z" /><path d="M9 8h6M9 12h6" /></svg>
    case 'history':
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
    case 'shield':
      return <svg {...common}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
    case 'copy':
      return <svg {...common}><rect x="8" y="8" width="12" height="12" rx="1.5" /><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" /></svg>
    case 'check':
      return <svg {...common}><path d="M4 12l5 5L20 6" /></svg>
    case 'github':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.52.1.72-.23.72-.5v-1.95c-2.92.64-3.54-1.24-3.54-1.24-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.08 1.62 1.09 1.62 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.67-1.4-2.33-.27-4.79-1.17-4.79-5.2 0-1.15.41-2.09 1.08-2.82-.11-.27-.47-1.34.1-2.8 0 0 .88-.28 2.89 1.08a10 10 0 0 1 5.26 0c2-1.36 2.88-1.08 2.88-1.08.58 1.46.22 2.53.1 2.8.68.73 1.08 1.67 1.08 2.82 0 4.04-2.46 4.92-4.8 5.18.38.33.72.97.72 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5z" />
        </svg>
      )
    default:
      return null
  }
}

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — silently ignore, field is still visible to copy manually
    }
  }
  return (
    <div className="credential-row">
      <div className="credential-text">
        <span className="credential-label">{label}</span>
        <span className="credential-value">{value}</span>
      </div>
      <button type="button" className="credential-copy" onClick={handleCopy} aria-label={`Copy ${label}`}>
        <Icon name={copied ? 'check' : 'copy'} />
      </button>
    </div>
  )
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [flowStep, setFlowStep] = useState(0)
    const [isNavHidden, setIsNavHidden] = useState(false) // Add this state
  const [lastScrollY, setLastScrollY] = useState(0) // Add this state
  const heroRef = useRef(null)
  const threadsRef = useRef(null)
  const mockupRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const h = document.documentElement
        const scrollTop = h.scrollTop
        const max = h.scrollHeight - h.clientHeight
        setProgress(max > 0 ? (scrollTop / max) * 100 : 0)
        setScrolled(scrollTop > 40)
        
        // Auto-hide navbar logic
        if (scrollTop > 100) { // Only hide after scrolling past 100px
          if (scrollTop > lastScrollY) {
            // Scrolling down - hide navbar
            setIsNavHidden(true)
          } else {
            // Scrolling up - show navbar
            setIsNavHidden(false)
          }
        } else {
          // At top of page - always show navbar
          setIsNavHidden(false)
        }
        setLastScrollY(scrollTop)
        
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY]) // Add lastScrollY as dependency

  useEffect(() => {
    const hero = heroRef.current
    const threads = threadsRef.current
    const mockup = mockupRef.current
    if (!hero) return
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      if (threads) threads.style.transform = `translate(${x * 14}px, ${y * 14}px)`
      if (mockup) mockup.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
    }
    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setFlowStep((s) => (s + 1) % statusFlow.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="landing">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <header className={`landing-nav ${scrolled ? 'is-scrolled' : ''} ${isNavHidden ? 'is-hidden' : ''}`}>
        <div className="landing-nav-inner">
          <div className="landing-brand">
            <span className="brand-mark">WF</span>
            <span className="landing-brand-name">WeaveFlow</span>
          </div>

          <nav className="landing-nav-links">
            <a href="#how">How it works</a>
            <a href="#demo">Try it</a>
            <a href="#features">Features</a>
            <a href="#stack">Stack</a>
            <a href="#faq">FAQ</a>
          </nav>

          <Link to="/login" className="btn btn-gold landing-nav-cta">Sign in</Link>

          <button
            className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            type="button"
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`nav-mobile ${menuOpen ? 'is-open' : ''}`}>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#demo" onClick={() => setMenuOpen(false)}>Try it</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <Link to="/login" className="btn btn-gold" onClick={() => setMenuOpen(false)}>Sign in</Link>
        </div>
      </header>

      <section className="hero" ref={heroRef}>
        <div className="hero-threads" ref={threadsRef} aria-hidden="true">
          <div className="thread-layer thread-warp" />
          <div className="thread-layer thread-weft" />
        </div>
        <div className="hero-blob hero-blob-gold" aria-hidden="true" />
        <div className="hero-blob hero-blob-maroon" aria-hidden="true" />
        <div className="hero-blob hero-blob-sage" aria-hidden="true" />

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow hero-anim" style={{ animationDelay: '0.05s' }}>
              Weavers management, in one place
            </p>
            <h1 className="hero-title hero-anim" style={{ animationDelay: '0.15s' }}>
              Every loom, every rupee,
              <br />
              <span className="hero-highlight">woven into one ledger</span>
            </h1>
            <p className="hero-sub hero-anim" style={{ animationDelay: '0.28s' }}>
              WeaveFlow tracks your weavers, their production, and their pay —
              from the first saree on the loom to the last rupee settled.
            </p>
            <div className="hero-actions hero-anim" style={{ animationDelay: '0.4s' }}>
              <Link to="/login" className="btn btn-gold">Sign in to your account</Link>
              <a href="#demo" className="btn btn-ghost">Try the live demo</a>
            </div>
            <p className="hero-stackline hero-anim" style={{ animationDelay: '0.5s' }}>
              Built with React · Spring Boot · MySQL
            </p>
          </div>

          <div className="hero-mockup-wrap hero-anim" style={{ animationDelay: '0.35s' }}>
            <div className="hero-mockup" ref={mockupRef}>
              <div className="mockup-header">
                <span className="mockup-dot" /><span className="mockup-dot" /><span className="mockup-dot" />
                <span className="mockup-title">Loom · L014</span>
              </div>
              <div className="mockup-body">
                <div className="mockup-row">
                  <span className="mockup-weaver">Weaver · WV014</span>
                  <span className="mockup-badge mockup-badge-progress">IN PROGRESS</span>
                </div>
                <div className="mockup-progress">
                  <div className="mockup-progress-fill" />
                </div>
                <div className="mockup-progress-label">7 / 10 sarees completed</div>
                <div className="mockup-stats">
                  <div className="mockup-stat">
                    <span className="mockup-stat-label">Rate</span>
                    <span className="mockup-stat-value">₹9600</span>
                  </div>
                  <div className="mockup-stat">
                    <span className="mockup-stat-label">Target</span>
                    <span className="mockup-stat-value">10</span>
                  </div>
                  <div className="mockup-stat">
                    <span className="mockup-stat-label">Type</span>
                    <span className="mockup-stat-value">SILK</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-chip float-chip-a">Advance · ₹5,000 OPEN</div>
            <div className="float-chip float-chip-b">✓ Payment settled</div>
            <div className="float-chip float-chip-c">Role · ADMIN</div>
          </div>
        </div>

        <div className="hero-marquee" aria-hidden="true">
          <div className="hero-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span className="hero-marquee-item" key={i}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="section-inner">
          <Reveal as="p" className="section-eyebrow">The workflow</Reveal>
          <Reveal as="h2" className="section-title">How it moves through the shop floor</Reveal>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <Reveal key={s.n} className="step-card" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="step-n">{s.n}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-body">{s.body}</p>
                {i < steps.length - 1 && <div className="step-connector" aria-hidden="true" />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="demo">
        <div className="section-inner">
          <Reveal as="p" className="section-eyebrow">No request needed</Reveal>
          <Reveal as="h2" className="section-title">Try it yourself</Reveal>
          <Reveal as="p" className="section-lede">
            This is a live demo, not a mockup. Sign in with either account below and explore
            the real app — nothing to install, nothing to ask permission for.
          </Reveal>

          <div className="demo-grid">
            <Reveal className="demo-card">
              <span className="role-badge role-badge-admin">ADMIN</span>
              <p className="demo-desc">Full access — add weavers, looms, advances, payments.</p>
              <CopyField label="Username" value="demo_admin" />
              <CopyField label="Password" value="admin@123" />
              <Link to="/login?u=demo_admin&p=admin%40123" className="btn btn-primary demo-btn">
                Sign in as Admin
              </Link>
            </Reveal>

            <Reveal className="demo-card" style={{ transitionDelay: '100ms' }}>
              <span className="role-badge role-badge-staff">STAFF</span>
              <p className="demo-desc">Day-to-day access — update sarees, view history and search.</p>
              <CopyField label="Username" value="demo_staff" />
              <CopyField label="Password" value="staff@123" />
              <Link to="/login?u=demo_staff&p=staff%40123" className="btn btn-primary demo-btn">
                Sign in as Staff
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <Reveal as="p" className="section-eyebrow">Live on every loom</Reveal>
          <Reveal as="h2" className="section-title">A loom's status moves itself forward</Reveal>
          <Reveal className="flow-demo">
            <div className="flow-track">
              {statusFlow.map((label, i) => (
                <div key={label} className={`flow-node ${i <= flowStep ? 'is-active' : ''} ${i === flowStep ? 'is-current' : ''}`}>
                  <span className="flow-dot" />
                  <span className="flow-label">{label}</span>
                </div>
              ))}
              <div className="flow-fill" style={{ width: `${(flowStep / (statusFlow.length - 1)) * 100}%` }} />
            </div>
            <p className="flow-caption">
              Illustrative — this is what one loom looks like moving from assignment to full payment.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt" id="features">
        <div className="section-inner">
          <Reveal as="p" className="section-eyebrow">What it keeps track of</Reveal>
          <Reveal as="h2" className="section-title">Everything in one record</Reveal>
          <div className="feature-grid">
            {features.map((f, i) => (
              <Reveal key={f.title} className="feature-card" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="feature-icon"><Icon name={f.icon} /></div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-body">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="stack">
        <div className="section-inner">
          <Reveal as="p" className="section-eyebrow">Under the hood</Reveal>
          <Reveal as="h2" className="section-title">Built with</Reveal>
          <div className="stack-grid">
            {stack.map((group, i) => (
              <Reveal key={group.group} className="stack-card" style={{ transitionDelay: `${i * 80}ms` }}>
                <h3 className="stack-group">{group.group}</h3>
                <div className="stack-chips">
                  {group.items.map((item) => {
                    // Handle both string and object items
                    const itemName = typeof item === 'object' ? item.name : item
                    const isCurrent = typeof item === 'object' ? item.current : false
                    
                    return (
                      <span className={`stack-chip ${isCurrent ? 'is-current' : ''}`} key={itemName}>
                        {itemName}
                        {isCurrent && (
                          <span className="stack-chip-tick">
                            <Icon name="check" />
                          </span>
                        )}
                      </span>
                    )
                  })}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-inner">
          <Reveal as="p" className="section-eyebrow">Why teams switch</Reveal>
          <Reveal as="h2" className="section-title">From notebook to ledger</Reveal>
          <div className="compare-grid">
            <Reveal className="compare-col compare-old">
              <h3>Paper &amp; memory</h3>
              <ul>
                {comparison.map((c) => (
                  <li key={c.old}><span className="compare-mark compare-mark-old">✕</span>{c.old}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="compare-col compare-now" style={{ transitionDelay: '120ms' }}>
              <h3>WeaveFlow</h3>
              <ul>
                {comparison.map((c) => (
                  <li key={c.now}><span className="compare-mark compare-mark-now">✓</span>{c.now}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <Reveal as="p" className="section-eyebrow">Two roles, one system</Reveal>
          <Reveal as="h2" className="section-title">Built for two kinds of days</Reveal>
          <div className="role-grid">
            <Reveal className="role-card">
              <span className="role-badge role-badge-staff">STAFF</span>
              <h3 className="role-title">Day-to-day floor work</h3>
              <p className="role-body">
                Log completed sarees, check the dashboard, look up a weaver's
                history or search their record.
              </p>
            </Reveal>
            <Reveal className="role-card" style={{ transitionDelay: '90ms' }}>
              <span className="role-badge role-badge-admin">ADMIN</span>
              <h3 className="role-title">Everything that moves money</h3>
              <p className="role-body">
                Register weavers, assign looms, issue advances, and settle
                salary payments — everything staff can do, plus the rest.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="faq">
        <div className="section-inner section-inner-narrow">
          <Reveal as="p" className="section-eyebrow">Questions</Reveal>
          <Reveal as="h2" className="section-title">Before you sign in</Reveal>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <Reveal key={f.q} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                  type="button"
                >
                  {f.q}
                  <span className={`faq-chevron ${openFaq === i ? 'is-open' : ''}`}>⌄</span>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'is-open' : ''}`}>
                  <p>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="hero-threads cta-threads" aria-hidden="true">
          <div className="thread-layer thread-warp" />
        </div>
        <Reveal className="cta-inner">
          <h2 className="cta-title">Ready to sign in?</h2>
          <div className="cta-actions">
            <Link to="/login" className="btn btn-gold">Sign in to WeaveFlow</Link>
            <a href="#demo" className="btn btn-ghost">Try the live demo</a>
          </div>
        </Reveal>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-brand">
            <span className="brand-mark">WF</span>
            <span className="landing-brand-name">WeaveFlow</span>
          </div>
          <p className="footer-credit">
            © 2026 · Developed by Jothikrishnan P R ·{' '}
            <a
              href="https://github.com/Jothikrishnan-pr/Weaveflow_Management"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-github"
            >
              <Icon name="github" /> GitHub
            </a>
          </p>
          <Link to="/login" className="btn btn-primary">Sign in</Link>
        </div>
      </footer>
    </div>
  )
}