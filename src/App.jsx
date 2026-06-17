import { useState, useEffect, useRef } from 'react'
import './App.css'

const PILLARS = [
  { icon: '🎵', title: 'Musique', desc: 'Streaming et téléchargement de sons, playlists personnalisées', color: 'var(--magenta)', stat: '2 500+', statLabel: 'sons disponibles' },
  { icon: '💰', title: 'Abonnements', desc: 'Les fans s\'abonnent à leurs artistes (500-2000 FCFA/mois)', color: 'var(--gold)', stat: '500-2000 FCFA', statLabel: 'par mois' },
  { icon: '🎤', title: 'Événements', desc: 'Billeterie en ligne pour concerts, festivals, et concerts virtuels', color: 'var(--cyan)', stat: '50+', statLabel: 'événements prévus' },
  { icon: '🛍️', title: 'Boutique', desc: 'Vente de goodies, produits dérivés, et contenus digitaux', color: 'var(--purple)', stat: '100%', statLabel: 'des revenus à l\'artiste' },
  { icon: '📣', title: 'Shout-out', desc: 'Messages personnalisés vendus par les artistes', color: 'var(--orange)', stat: '×2', statLabel: 'engagement fans' },
  { icon: '🤝', title: 'Réseautage', desc: 'Marketplace pour beats, services, collaborations (V2)', color: 'var(--green)', stat: 'Bientôt', statLabel: 'Version 2' },
]

const TEAM = [
  { initial: 'L', name: 'Landry', role: 'CEO & Fondateur', color: 'var(--gold)', bio: 'Musicien et entrepreneur. 10 ans dans l\'industrie musicale.' },
  { initial: 'M', name: 'Michaël', role: 'CTO', color: 'var(--cyan)', bio: 'Full-stack developer. A construit 3 apps à succès.' },
  { initial: 'A', name: 'Amina', role: 'Design Lead', color: 'var(--magenta)', bio: 'UI/UX designer. Portfolio avec 3 startups africaines.' },
  { initial: 'K', name: 'Karl', role: 'Community', color: 'var(--green)', bio: 'Community manager. +50 000 followers cumulés.' },
]

function App() {
  const [form, setForm] = useState({ name: '', email: '', role: 'fan', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const observerRef = useRef(null)

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

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

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

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      {/* Announcement bar */}
      <div className="announcement-bar">
        <div className="announcement-track">
          <span>🔥 KULTUR ARRIVE BIENTÔT — PRÉ-INSCRIS-TOI 🔥 KULTUR ARRIVE BIENTÔT — PRÉ-INSCRIS-TOI 🔥 KULTUR ARRIVE BIENTÔT — PRÉ-INSCRIS-TOI 🔥 KULTUR ARRIVE BIENTÔT — PRÉ-INSCRIS-TOI</span>
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
            <button onClick={() => scrollTo('cases')}>Cas d&apos;usage</button>
            <button onClick={() => scrollTo('artists')}>Artistes</button>
            <button onClick={() => scrollTo('fans')}>Fans</button>
            <button onClick={() => scrollTo('team')}>Équipe</button>
            <button onClick={() => scrollTo('contact')} className="nav-cta">Pré-inscris-toi</button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollTo('cases')}>Cas d&apos;usage</button>
            <button onClick={() => scrollTo('artists')}>Artistes</button>
            <button onClick={() => scrollTo('fans')}>Fans</button>
            <button onClick={() => scrollTo('team')}>Équipe</button>
            <button onClick={() => scrollTo('contact')} className="nav-cta">Pré-inscris-toi</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" data-section="hero" className={`section hero-section ${isVisible('hero') ? 'visible' : ''}`}>
        <div className="hero-bg">
          <div className="floating-shape shape-1" style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}></div>
          <div className="floating-shape shape-2" style={{ transform: `translate(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px)` }}></div>
          <div className="floating-shape shape-3" style={{ transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * -0.02}px)` }}></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Disponible bientôt
          </div>
          <h1 className="hero-title">
            <span className="hero-line">La plateforme</span>
            <span className="hero-line gradient-text">qui fait gagner</span>
            <span className="hero-line">les artistes</span>
            <span className="hero-line gold-text">partout dans le monde</span>
          </h1>
          <p className="hero-subtitle">
            Abonnements, concerts virtuels, shout-outs, streaming exclusif…
            Tout pour monétiser ta musique <span className="gold-text">sans intermédiaire</span>.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              🚀 Je m&apos;inscris
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('cases')}>
              Voir les fonctionnalités →
            </button>
          </div>
          <div className="hero-stats">
            {[
              { num: '100+', label: 'Artistes inscrits' },
              { num: '0%', label: 'Commission cachée' },
              { num: 'Orange Money', label: 'Paiement instantané' },
            ].map((s, i) => (
              <div key={i} className="stat">
                <span className="stat-number">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
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
              {[
                { icon: '🎵', title: 'Nouveau son', sub: '2 500 écoutes' },
                { icon: '🎤', title: 'Concert à venir', sub: '25 Juin • Douala' },
                { icon: '💰', title: 'Revenus du mois', sub: '+ 450 000 FCFA', gold: true },
              ].map((c, i) => (
                <div key={i} className="phone-card">
                  <span className="phone-card-icon">{c.icon}</span>
                  <div>
                    <div className="phone-card-title">{c.title}</div>
                    <div className={`phone-card-sub ${c.gold ? 'gold-text' : ''}`}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-glow"></div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section id="problem" data-section="problem" className={`section problem-section ${isVisible('problem') ? 'visible' : ''}`}>
        <div className="container">
          <div className="problem-grid">
            <div className="problem-card problem">
              <div className="problem-corner"></div>
              <span className="problem-emoji">⚠️</span>
              <h2>Le&nbsp;problème</h2>
              <p>
                Les artistes galèrent à gagner de l&apos;argent avec leur musique.
                Les plateformes de streaming payent des miettes, les intermédiaires prennent
                des commissions excessives.
              </p>
              <div className="problem-fact">84% des artistes gagnent moins de 100 000 FCFA/mois</div>
            </div>
            <div className="problem-card solution">
              <div className="problem-corner"></div>
              <span className="problem-emoji">🚀</span>
              <h2>La&nbsp;solution</h2>
              <p>
                Kultur leur donne les outils pour vendre directement à leurs fans :
                abonnements, billets, shout-outs, streaming exclusif, boutique.
              </p>
              <div className="problem-fact gold-text">Sans intermédiaire. Paiement instantané via Orange Money.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" data-section="cases" className={`section cases-section ${isVisible('cases') ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ color: 'var(--magenta)' }}>⚡ Cas d&apos;usage</span>
            <h2 className="gradient-text">Tout ce que <br/>Kultur propose</h2>
            <p className="section-desc">6 piliers pour tout gérer. De la musique au cash.</p>
          </div>
          <div className="cases-grid">
            {PILLARS.map((p, i) => (
              <div key={i} className="case-card" style={{ '--card-accent': p.color }}>
                <div className="case-accent" style={{ background: p.color }}></div>
                <div className="case-icon">{p.icon}</div>
                <h3 className="case-title">{p.title}</h3>
                <p className="case-desc">{p.desc}</p>
                <div className="case-stat">
                  <span className="case-stat-num" style={{ color: p.color }}>{p.stat}</span>
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
              <span className="section-tag" style={{ color: 'var(--green)' }}>🎤 Pour les artistes</span>
              <h2>Gagne de l&apos;argent <br/><span className="gradient-text">directement</span></h2>
              <p className="split-desc">Les outils pour vivre de ta musique.</p>
              <ul className="benefits-list">
                {[
                  'Gagne de l\'argent directement – pas d\'intermédiaire',
                  'Fidélise tes fans – crée une communauté engagée',
                  'Statistiques en temps réel – suis tes revenus, tes abonnés',
                  'Visibilité – sois mis en avant sur la plateforme',
                ].map((item, i) => (
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
                  <span>Dashboard Artiste</span>
                </div>
                {[
                  { label: 'Revenus du mois', value: '+2 350 000 FCFA' },
                  { label: 'Abonnés', value: '1 247' },
                  { label: 'Écoutes', value: '45 892' },
                  { label: 'Shout-outs vendus', value: '12' },
                ].map((r, i) => (
                  <div key={i} className="stats-row">
                    <span>{r.label}</span>
                    <span className="gold-text">{r.value}</span>
                  </div>
                ))}
                <div className="stats-bar">
                  <div className="stats-bar-fill" style={{ width: '76%' }}></div>
                </div>
                <span className="stats-growth">+124% vs mois dernier</span>
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
                  {['#F5B041', '#FF006E', '#00E5FF', '#7000FF', '#00FF88'].map((c, i) => (
                    <div key={i} className="avatar" style={{ background: c, animationDelay: `${i * 0.15}s` }}></div>
                  ))}
                </div>
                <p className="community-text">
                  <strong>+2 500 fans</strong> ont déjà rejoint la communauté
                </p>
                <div className="community-grid">
                  {['Douala', 'Yaoundé', 'Paris', 'Montréal', 'Abidjan', 'Bamenda'].map((city, i) => (
                    <span key={i} className="community-city">{city}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="split-content">
              <span className="section-tag" style={{ color: 'var(--magenta)' }}>💚 Pour les fans</span>
              <h2>Soutiens tes artistes <br/><span className="gradient-text">préférés</span></h2>
              <p className="split-desc">De manière concrète et directe.</p>
              <ul className="benefits-list">
                {[
                  'Soutiens tes artistes – de manière concrète',
                  'Accès exclusif – sons inédits, vidéos, making-of',
                  'Shout-outs personnalisés – anniversaires, félicitations',
                  'Rejoins une communauté de passionnés',
                ].map((item, i) => (
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
            <div className="partnership-glow"></div>
            <span className="section-tag" style={{ color: 'var(--cyan)' }}>🤝 Partenariat officiel</span>
            <h2>Kultur × <span className="gradient-text">Douala Hip Hop Festival</span></h2>
            <p>Billets disponibles via l&apos;application Kultur. Reste connecté.</p>
            <div className="festival-badge">
              <span className="festival-dhhf">DHHF</span>
              <span className="festival-year">2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" data-section="team" className={`section team-section ${isVisible('team') ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ color: 'var(--cyan)' }}>👥 L&apos;équipe</span>
            <h2>Des passionnés <br/><span className="gradient-text">à Douala</span></h2>
            <p className="section-desc">Kultur est porté par une équipe de passionnés de musique et de tech.</p>
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={i} className="team-card" style={{ '--team-color': m.color }}>
                <div className="team-accent"></div>
                <div className="team-avatar" style={{ background: m.color }}>{m.initial}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-bio">{m.bio}</div>
                <div className="team-social">
                  <span>in</span>
                  <span>𝕏</span>
                </div>
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
              <span className="section-tag" style={{ color: 'var(--gold)' }}>🔥 Lancement imminent</span>
              <h2>Rejoins <span className="gradient-text">Kultur</span> dès maintenant</h2>
              <p className="section-desc" style={{ textAlign: 'left', margin: '0 0 32px' }}>
                Sois parmi les premiers à découvrir l&apos;application.
                Pré-inscris-toi et reçois toutes les infos du lancement.
              </p>
              <div className="contact-benefits">
                {['Accès anticipé', 'Badge fondateur', '-20% abonnement à vie', 'Newsletter VIP'].map((b, i) => (
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
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#00FF88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3>Merci ! 🎉</h3>
                  <p>Tu seras informé du lancement officiel de Kultur.</p>
                  <div className="success-confetti">
                    {[
                      { x: '20%', y: '15%' }, { x: '70%', y: '10%' }, { x: '40%', y: '85%' },
                      { x: '85%', y: '40%' }, { x: '10%', y: '60%' }, { x: '55%', y: '25%' },
                      { x: '30%', y: '50%' }, { x: '75%', y: '75%' },
                    ].map((pos, i) => (
                      <span key={i} className="confetti-dot" style={{
                        '--x': pos.x, '--y': pos.y,
                        '--delay': `${i * 0.1}s`,
                        background: [ 'var(--gold)', 'var(--magenta)', 'var(--cyan)', 'var(--purple)', 'var(--green)' ][i % 5]
                      }}>●</span>
                    ))}
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="text" placeholder="Ton nom" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Ton email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <select value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}>
                      <option value="fan">Je suis un Fan</option>
                      <option value="artist">Je suis un Artiste</option>
                      <option value="producer">Je suis un Producteur</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Un message (optionnel)" rows="3" value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
                  </div>
                  <button type="submit" className="btn-primary btn-full pulse-btn">
                    🚀 Je m&apos;inscris
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-bg"></div>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">K</span>
                <span className="logo-text">KULTUR</span>
              </div>
              <p>La première plateforme de monétisation directe entre les artistes et leurs fans.</p>
            </div>
            <div className="footer-links">
              <h4>Liens</h4>
              <a href="#">Mentions légales</a>
              <a href="#">Politique de confidentialité</a>
              <a href="#">CGU</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-social">
              <h4>Réseaux</h4>
              <div className="social-icons">
                {['IG', '𝕏', 'TT', 'YT'].map((s, i) => (
                  <a key={i} href="#" className="social-icon" aria-label={s}>{s}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Kultur – Tous droits réservés. Fait avec ❤️ à Douala.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
