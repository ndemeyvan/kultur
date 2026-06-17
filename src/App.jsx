import { useState, useEffect, useRef } from 'react'
import { LANGUAGES } from './translations'
import './App.css'

function App() {
  const [lang, setLang] = useState('fr')
  const [theme, setTheme] = useState('dark')
  const [form, setForm] = useState({ name: '', email: '', role: 'fan', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())

  const t = LANGUAGES[lang]
  const observerRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.dataset.section))
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-section]').forEach((el) => observerRef.current.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.email) {
      setSubmitted(true)
      setForm({ name: '', email: '', role: 'fan', message: '' })
    }
  }

  const isVisible = (section) => visibleSections.has(section)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="app">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <button className="lang-btn" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* NAV */}
      <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-inner">
          <div className="logo" onClick={() => scrollTo('hero')}>
            <span className="logo-icon">K</span>
            <span className="logo-text">KULTUR</span>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <div className="nav-links">
            <button onClick={() => scrollTo('cases')}>{t.nav.cases}</button>
            <button onClick={() => scrollTo('artists')}>{t.nav.artists}</button>
            <button onClick={() => scrollTo('fans')}>{t.nav.fans}</button>
            <button onClick={() => scrollTo('team')}>{t.nav.team}</button>
            <button onClick={() => scrollTo('contact')} className="nav-cta">{t.nav.cta}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollTo('cases')}>{t.nav.cases}</button>
            <button onClick={() => scrollTo('artists')}>{t.nav.artists}</button>
            <button onClick={() => scrollTo('fans')}>{t.nav.fans}</button>
            <button onClick={() => scrollTo('team')}>{t.nav.team}</button>
            <button onClick={() => scrollTo('contact')} className="nav-cta">{t.nav.cta}</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" data-section="hero" className={`section hero-section ${isVisible('hero') ? 'visible' : ''}`}>
        <div className="hero-bg"></div>
        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="phone-header">KULTUR</div>
              <div className="phone-artist">
                <div className="phone-avatar"></div>
                <div>
                  <div className="phone-name">Ko-c</div>
                  <div className="phone-genre">Rappeur • Douala</div>
                </div>
              </div>
              {t.phone.map((c, i) => (
                <div key={i} className="phone-card">
                  <span className="phone-card-icon">{c.icon}</span>
                  <div>
                    <div className="phone-card-title">{c.title}</div>
                    <div className={`phone-card-sub ${i === 2 ? 'gold-text' : ''}`}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">{t.hero.badge}</div>
          <h1 className="hero-title">
            {t.hero.lines.map((line, i) => (
              <span key={i} className={`hero-line ${i === 1 ? 'gradient-text' : ''} ${i === 3 ? 'gold-text' : ''}`}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              {t.hero.cta}
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('cases')}>
              {t.hero.secondary} →
            </button>
          </div>
          <div className="hero-stats">
            {t.hero.stats.map((s, i) => (
              <div key={i} className="stat">
                <span className="stat-number">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section id="problem" data-section="problem" className={`section problem-section ${isVisible('problem') ? 'visible' : ''}`}>
        <div className="container">
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-corner"></div>
              <span className="problem-emoji">⚠️</span>
              <h2>{t.problem.problem.title}</h2>
              <p>{t.problem.problem.text}</p>
              <div className="problem-fact">{t.problem.problem.fact}</div>
            </div>
            <div className="problem-card solution">
              <div className="problem-corner"></div>
              <span className="problem-emoji">🚀</span>
              <h2>{t.problem.solution.title}</h2>
              <p>{t.problem.solution.text}</p>
              <div className="problem-fact gold-text">{t.problem.solution.fact}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" data-section="cases" className={`section cases-section ${isVisible('cases') ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag gold-text">⚡ {t.cases.tag}</span>
            <h2>{t.cases.title}</h2>
            <p className="section-desc">{t.cases.desc}</p>
          </div>
          <div className="cases-grid">
            {t.pillars.map((p, i) => (
              <div key={i} className="case-card">
                <div className="case-icon">{p.icon}</div>
                <h3 className="case-title">{p.title}</h3>
                <p className="case-desc">{p.desc}</p>
                <div className="case-stat">
                  <span className="case-stat-num">{p.stat}</span>
                  <span className="case-stat-label">{p.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISTS */}
      <section id="artists" data-section="artists" className={`section artists-section ${isVisible('artists') ? 'visible' : ''}`}>
        <div className="container">
          <div className="split-grid">
            <div className="split-content">
              <span className="section-tag gold-text">🎤 {t.artists.tag}</span>
              <h2>{t.artists.title}</h2>
              <p className="split-desc">{t.artists.desc}</p>
              <ul className="benefits-list">
                {t.artists.items.map((item, i) => (
                  <li key={i} className="benefit-item">
                    <span className="check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="split-visual">
              <div className="stats-card">
                <div className="stats-header">
                  <span className="stats-dot"></span>
                  <span>Dashboard</span>
                </div>
                {t.artists.stats.map((r, i) => (
                  <div key={i} className="stats-row">
                    <span>{r.label}</span>
                    <span className="gold-text">{r.value}</span>
                  </div>
                ))}
                <div className="stats-bar">
                  <div className="stats-bar-fill"></div>
                </div>
                <span className="stats-growth">{t.artists.growth}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FANS */}
      <section id="fans" data-section="fans" className={`section fans-section ${isVisible('fans') ? 'visible' : ''}`}>
        <div className="container">
          <div className="split-grid reverse">
            <div className="split-visual">
              <div className="community-card">
                <div className="community-avatars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="avatar" style={{ animationDelay: `${i * 0.15}s` }}></div>
                  ))}
                </div>
                <p className="community-text">
                  <strong>+2 500</strong> {t.fans.community}
                </p>
                <div className="community-grid">
                  {t.fans.cities.map((city, i) => (
                    <span key={i} className="community-city">{city}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="split-content">
              <span className="section-tag gold-text">💚 {t.fans.tag}</span>
              <h2>{t.fans.title}</h2>
              <p className="split-desc">{t.fans.desc}</p>
              <ul className="benefits-list">
                {t.fans.items.map((item, i) => (
                  <li key={i} className="benefit-item">
                    <span className="check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section id="partnership" data-section="partnership" className={`section partnership-section ${isVisible('partnership') ? 'visible' : ''}`}>
        <div className="container">
          <div className="partnership-card">
            <span className="section-tag gold-text">🤝 {t.partnership.tag}</span>
            <h2>{t.partnership.title}</h2>
            <p>{t.partnership.desc}</p>
            <div className="festival-badge">
              <span>DHHF</span>
              <span className="festival-year">2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" data-section="team" className={`section team-section ${isVisible('team') ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag gold-text">👥 {t.team.tag}</span>
            <h2>{t.team.title}</h2>
            <p className="section-desc">{t.team.desc}</p>
          </div>
          <div className="team-grid">
            {t.team.members.map((m, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar" style={{ background: 'var(--gold)' }}>{m.initial}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-bio">{m.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-section="contact" className={`section contact-section ${isVisible('contact') ? 'visible' : ''}`}>
        <div className="container">
          <div className="contact-inner">
            <div className="contact-info">
              <span className="section-tag gold-text">🔥 {t.contact.tag}</span>
              <h2>{t.contact.title}</h2>
              <p className="contact-desc">{t.contact.desc}</p>
              <div className="contact-benefits">
                {t.contact.benefits.map((b, i) => (
                  <div key={i} className="contact-benefit">
                    <span className="contact-check">✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3>{t.contact.success.title} 🎉</h3>
                  <p>{t.contact.success.desc}</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" placeholder={t.contact.form.name} value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder={t.contact.form.email} value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <select value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}>
                      <option value="fan">{t.contact.form.fan}</option>
                      <option value="artist">{t.contact.form.artist}</option>
                      <option value="producer">{t.contact.form.producer}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea placeholder={t.contact.form.message} rows="3" value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                  </div>
                  <button type="submit" className="btn-primary btn-full">
                    {t.contact.form.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-accent"></div>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">K</span>
                <span className="logo-text">KULTUR</span>
              </div>
              <p>{t.footer.desc}</p>
            </div>
            <div className="footer-links">
              <h4>{t.footer.links}</h4>
              <a href="#">{t.footer.legal}</a>
              <a href="#">{t.footer.privacy}</a>
              <a href="#">{t.footer.cgu}</a>
              <a href="#">{t.footer.contact}</a>
            </div>
            <div className="footer-social">
              <h4>{t.footer.social}</h4>
              <div className="social-icons">
                {['IG', 'X', 'TT', 'YT'].map((s, i) => (
                  <a key={i} href="#" className="social-icon" aria-label={s}>{s}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
