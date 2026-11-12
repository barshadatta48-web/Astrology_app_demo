import { useMemo, useState } from 'react'
import {
  Sparkles, LayoutDashboard, Orbit, CalendarDays, MoonStar, Sun,
  Stars, Settings, Menu, X, Search, Bell, ChevronRight,
  ArrowUpRight, CircleHelp, Clock3, MapPin, UserRound, WandSparkles,
  ChartNoAxesCombined, BookOpen, Compass, ShieldCheck
} from 'lucide-react'

const demoPlanets = [
  ['☉', 'Sun', 'Leo', '1st House', 'Strong'],
  ['☽', 'Moon', 'Taurus', '10th House', 'Exalted'],
  ['♂', 'Mars', 'Aries', '9th House', 'Own sign'],
  ['☿', 'Mercury', 'Virgo', '2nd House', 'Exalted'],
  ['♃', 'Jupiter', 'Cancer', '12th House', 'Exalted'],
  ['♀', 'Venus', 'Libra', '3rd House', 'Own sign'],
  ['♄', 'Saturn', 'Aquarius', '7th House', 'Own sign'],
]

const sections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'kundli', label: 'Birth chart', icon: Orbit },
  { id: 'panchang', label: 'Panchang', icon: CalendarDays },
  { id: 'horoscope', label: 'Horoscope', icon: MoonStar },
  { id: 'planets', label: 'Planetary positions', icon: Stars },
  { id: 'pricing', label: 'Pricing', icon: ChartNoAxesCombined },
]

function App() {
  const [active, setActive] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)

  const current = sections.find(s => s.id === active)
  const filteredPlanets = useMemo(() => demoPlanets.filter(p => p.join(' ').toLowerCase().includes(query.toLowerCase())), [query])

  function navigate(id) {
    setActive(id)
    setMobileOpen(false)
  }

  return <div className="app-shell">
    <aside className={mobileOpen ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="brand-mark"><Orbit size={21}/></div><span>astro<span className="brand-accent">verse</span></span><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="workspace-label">COSMIC WORKSPACE</div>
      <nav>
        {sections.map(item => <button key={item.id} onClick={() => navigate(item.id)} className={active === item.id ? 'nav-item selected' : 'nav-item'}><item.icon size={18}/><span>{item.label}</span>{active === item.id && <span className="nav-dot"/>}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={17}/></div><strong>Your cosmic journey</strong><p>Explore the patterns and possibilities in your chart.</p><button onClick={() => navigate('kundli')}>Explore chart <ChevronRight size={14}/></button></div>
        <button className="nav-item"><Settings size={18}/><span>Settings</span></button>
        <div className="user-mini"><div className="avatar">O</div><div><strong>Owner</strong><small>Personal workspace</small></div><span className="online-dot"/></div>
      </div>
    </aside>
    {mobileOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)}/>}
    <main className="main-area">
      <header className="topbar">
        <div className="top-left"><button className="menu-toggle" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{current?.label || 'Overview'}</strong></div></div>
        <div className="top-actions"><div className="date-chip"><MoonStar size={15}/> Cosmic calendar</div><button className="icon-btn" aria-label="Notifications"><Bell size={18}/><i/></button><button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}><div className="avatar small">O</div><span>Owner</span></button>{profileOpen && <div className="profile-pop"><strong>Owner workspace</strong><small>Single-user demo</small></div>}</div>
      </header>
      <div className="page-content">
        {active === 'overview' && <Overview onNavigate={navigate}/>}
        {active === 'kundli' && <Kundli/>}
        {active === 'panchang' && <Panchang/>}
        {active === 'horoscope' && <Horoscope/>}
        {active === 'pricing' && <Pricing/>}
        {active === 'planets' && <section className="section-page"><PageHeading eyebrow="CELESTIAL MAP" title="Planetary positions" desc="A snapshot of the graha placements in this illustrative birth chart."/><div className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search planets, signs or houses..."/></div><div className="planet-table"><div className="planet-row table-head"><span>Planet</span><span>Sign</span><span>House</span><span>Condition</span></div>{filteredPlanets.map(p => <div className="planet-row" key={p[1]}><span className="planet-name"><b>{p[0]}</b>{p[1]}</span><span>{p[2]}</span><span>{p[3]}</span><span><i className="status-pill">{p[4]}</i></span></div>)}</div><DemoNote/></section>}
        <footer className="footer"> <span>✧ Made for curious minds under a vast sky.</span><span>ASTROVERSE · COSMIC EDITION</span></footer>
      </div>
    </main>
  </div>
}

function PageHeading({ eyebrow, title, desc }) {
  return <div className="page-heading"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>
}

function Overview({ onNavigate }) {
  return <div className="overview">
    <div className="welcome-row"><div><div className="eyebrow">WEDNESDAY · COSMIC INSIGHTS</div><h1>Your universe, <em>unfolding.</em></h1><p className="muted">A moment to pause, reflect, and reconnect with your path.</p></div><div className="welcome-orbit"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-core">✦</div><span className="orbit-star s-one">✧</span><span className="orbit-star s-two">✦</span></div></div>
    <div className="hero-card"><div className="hero-copy"><div className="hero-tag"><Sparkles size={14}/> TODAY'S COSMIC NOTE</div><h2>Trust the timing<br/>of your <em>becoming.</em></h2><p>Growth often begins quietly. Give your ideas room to take shape before asking them to bloom.</p><button className="light-button" onClick={() => onNavigate('horoscope')}>Read your horoscope <ArrowUpRight size={16}/></button></div><div className="hero-art"><div className="planet-glow"/><div className="planet-large"/><div className="planet-orbit orbit-a"/><div className="planet-orbit orbit-b"/><span className="art-star a">✦</span><span className="art-star b">✧</span><span className="art-star c">·</span></div><div className="hero-caption">THE ART OF ALIGNMENT <span>✧</span></div></div>
    <div className="section-title-row"><div><div className="eyebrow">YOUR ASTROLOGY</div><h2>Explore your chart</h2></div><span className="subtle-link">DEMO PROFILE <span>✦</span></span></div>
    <div className="feature-grid">
      <Feature icon={Orbit} title="Birth chart" desc="Explore the twelve houses and your planetary placements." tag="JANMA KUNDLI" onClick={() => onNavigate('kundli')}/>
      <Feature icon={CalendarDays} title="Panchang" desc="Discover the five elements of the traditional Vedic calendar." tag="DAILY ALMANAC" onClick={() => onNavigate('panchang')}/>
      <Feature icon={MoonStar} title="Horoscope" desc="Reflect on today's themes for your zodiac sign." tag="DAILY GUIDANCE" onClick={() => onNavigate('horoscope')}/>
    </div>
    <section className="counselling-card" aria-label="Astrology counselling demo price">
      <div className="counselling-copy">
        <div className="eyebrow">PERSONAL GUIDANCE · DEMO OFFERING</div>
        <h2>One-to-one astrology counselling</h2>
        <p>Discuss your questions and explore your chart in a sample personal guidance session.</p>
        <span className="counselling-note">Demo price only · No booking or payment is enabled</span>
      </div>
      <div className="counselling-price">
        <span className="price-label">SAMPLE SESSION</span>
        <strong>₹499</strong>
        <span>per 30 minutes</span>
      </div>
    </section>
    <div className="bottom-grid"><div className="panel moon-panel"><div className="panel-head"><div><div className="eyebrow">LUNAR OBSERVATION</div><h3>Moon phase</h3></div><MoonStar size={19}/></div><div className="moon-visual"><div className="moon-shape"/><div><strong>Waxing crescent</strong><p className="muted">A symbol of intention and new beginnings.</p></div></div><div className="panel-foot">ILLUSTRATIVE PHASE · NOT LIVE ASTRONOMICAL DATA</div></div><div className="panel profile-panel"><div className="panel-head"><div><div className="eyebrow">YOUR PROFILE</div><h3>Birth details</h3></div><UserRound size={19}/></div><div className="profile-line"><span>Name</span><strong>Demo Seeker</strong></div><div className="profile-line"><span>Tradition</span><strong>Vedic astrology</strong></div><div className="profile-line"><span>Chart status</span><strong className="gold-text">Sample chart</strong></div><button className="text-button" onClick={() => onNavigate('kundli')}>View birth chart <ChevronRight size={15}/></button></div></div>
  </div>
}


function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState('')
  const plans = [
    { name: 'Cosmic Starter', price: 'Free', period: 'forever', description: 'A gentle introduction to your cosmic workspace.', features: ['Explore the sample birth chart', 'Daily horoscope reflections', 'Panchang overview', 'Basic planetary positions'], action: 'Start exploring', featured: false },
    { name: 'Cosmic Plus', price: '₹499', period: 'per month', description: 'More room for deeper personal astrology exploration.', features: ['Everything in Starter', 'Expanded chart insights', 'Personalized horoscope themes', 'Save favourite readings'], action: 'Choose Cosmic Plus', featured: true },
    { name: 'Cosmic Pro', price: '₹999', period: 'per month', description: 'A richer experience for dedicated astrology seekers.', features: ['Everything in Cosmic Plus', 'Detailed divisional chart views', 'In-depth planetary interpretations', 'Priority one-to-one guidance access'], action: 'Choose Cosmic Pro', featured: false },
  ]
  return <section className="section-page pricing-page">
    <PageHeading eyebrow="COSMIC WORKSPACE" title="Choose your cosmic journey" desc="Explore the plans and find the level of guidance that feels right for you."/>
    <div className="pricing-intro"><Sparkles size={17}/><span>Simple demo pricing · No checkout or payment is enabled</span></div>
    <div className="pricing-grid">{plans.map(plan => <article className={plan.featured ? 'pricing-card featured' : 'pricing-card'} key={plan.name}>
      {plan.featured && <div className="popular-label">MOST POPULAR</div>}
      <div className="eyebrow">{plan.name.toUpperCase()}</div>
      <h2>{plan.price}<small>{plan.period}</small></h2>
      <p className="pricing-description">{plan.description}</p>
      <div className="pricing-divider"/>
      <div className="pricing-includes">WHAT'S INCLUDED</div>
      <ul>{plan.features.map(feature => <li key={feature}><ShieldCheck size={15}/>{feature}</li>)}</ul>
      <button className={plan.featured ? 'pricing-action primary-action' : 'pricing-action'} onClick={() => setSelectedPlan(plan.name)}>{selectedPlan === plan.name ? 'Selected for demo' : plan.action}<ArrowUpRight size={15}/></button>
    </article>)}</div>
    <div className="pricing-footnote">{selectedPlan ? `${selectedPlan} is selected in this demo. No subscription or payment has been started.` : 'All prices and plan features are illustrative placeholders for this demo and can be customized before launch.'}</div>
  </section>
}

function Feature({ icon: Icon, title, desc, tag, onClick }) {
  return <button className="feature-card" onClick={onClick}><div className="feature-top"><div className="feature-icon"><Icon size={20}/></div><ArrowUpRight size={17}/></div><div className="eyebrow">{tag}</div><h3>{title}</h3><p>{desc}</p><span className="feature-link">Explore <ChevronRight size={14}/></span></button>
}

function DemoNote() {
  return <div className="demo-note"><CircleHelp size={16}/><span>Illustrative demo placements only — not calculated from a birth date, time, location, or astronomical ephemeris.</span></div>
}

function Kundli() {
  return <section className="section-page"><PageHeading eyebrow="JANMA KUNDLI" title="Your birth chart" desc="A traditional North Indian chart layout for exploring the twelve houses."/><div className="kundli-layout"><div className="panel chart-panel"><div className="panel-head"><div><div className="eyebrow">RASHI CHART · D1</div><h3>North Indian format</h3></div><span className="sample-badge">SAMPLE</span></div><div className="kundli-chart"><svg viewBox="0 0 500 500" role="img" aria-label="Illustrative North Indian Vedic chart"><rect x="4" y="4" width="492" height="492" fill="#15132b" stroke="#b9965b" strokeWidth="2"/><path d="M4 4 L496 496 M496 4 L4 496 M250 4 L496 250 L250 496 L4 250 Z" fill="none" stroke="#a98754" strokeWidth="1.5"/><path d="M250 4 L250 496 M4 250 L496 250" stroke="#a98754" opacity=".35"/><g fill="#e9d7b4" fontSize="15" textAnchor="middle" fontFamily="Georgia"><text x="250" y="116">1 · Aries</text><text x="373" y="66">2 · Taurus</text><text x="430" y="180">3 · Gemini</text><text x="375" y="310">4 · Cancer</text><text x="250" y="410">5 · Leo</text><text x="125" y="310">6 · Virgo</text><text x="70" y="180">7 · Libra</text><text x="125" y="66">8 · Scorpio</text><text x="250" y="245" fontSize="22" fill="#d9b978">ॐ</text><text x="250" y="267" fontSize="10" fill="#a9a1c4">COSMIC MAP</text><text x="180" y="190" fontSize="12">Ju</text><text x="320" y="190" fontSize="12">Mo</text><text x="180" y="330" fontSize="12">Sa</text><text x="320" y="330" fontSize="12">Ve</text></g></svg></div><DemoNote/></div><div className="side-stack"><div className="panel"><div className="eyebrow">PROFILE OVERVIEW</div><h3>Demo Seeker</h3><p className="muted small-copy">Sample birth profile for interface demonstration.</p><div className="profile-line"><span>Lagna</span><strong>Aries (Mesha)</strong></div><div className="profile-line"><span>Moon sign</span><strong>Taurus (Vrishabha)</strong></div><div className="profile-line"><span>Sun sign</span><strong>Leo (Simha)</strong></div></div><div className="panel insight-panel"><Sparkles size={18}/><h3>Chart reflection</h3><p>This sample chart emphasizes initiative, steadiness, and creative expression. Treat these themes as prompts for reflection, not predictions.</p></div></div></div></section>
}

function Panchang() {
  const items = [['Tithi','Shukla Paksha · Panchami'],['Vara','Budhavara · Wednesday'],['Nakshatra','Rohini'],['Yoga','Siddha'],['Karana','Bava']]
  return <section className="section-page"><PageHeading eyebrow="VEDIC ALMANAC" title="Panchang" desc="The five traditional elements of the Hindu calendar."/><div className="panchang-banner"><div className="panchang-sun"><Sun size={32}/></div><div><div className="eyebrow">DAILY COSMIC RHYTHM</div><h2>A day for thoughtful beginnings.</h2><p>Use this sample almanac to explore the Panchang categories.</p></div><div className="panchang-date"><CalendarDays size={18}/><strong>Demo day</strong><small>Illustrative values</small></div></div><div className="panchang-grid">{items.map(([k,v],i)=><div className="panel panchang-item" key={k}><div className="panchang-number">0{i+1}</div><div className="eyebrow">{k.toUpperCase()}</div><h3>{v}</h3><p>{['Lunar day in the waxing fortnight.','The weekday associated with Mercury.','A lunar mansion traditionally linked with growth.','A yoga traditionally associated with accomplishment.','A half-tithi used in Panchang calculation.'][i]}</p></div>)}</div><DemoNote/></section>
}

function Horoscope() {
  const signs = [['♈','Aries'],['♉','Taurus'],['♊','Gemini'],['♋','Cancer'],['♌','Leo'],['♍','Virgo'],['♎','Libra'],['♏','Scorpio'],['♐','Sagittarius'],['♑','Capricorn'],['♒','Aquarius'],['♓','Pisces']]
  const [sign, setSign] = useState('Aries')
  return <section className="section-page"><PageHeading eyebrow="DAILY GUIDANCE" title="Horoscope" desc="Choose a sun sign and explore a reflective daily reading."/><div className="horoscope-layout"><div className="panel sign-panel"><div className="eyebrow">CHOOSE YOUR SIGN</div><div className="sign-grid">{signs.map(([symbol,name])=><button key={name} onClick={()=>setSign(name)} className={sign===name?'sign-option active':'sign-option'}><b>{symbol}</b><span>{name}</span></button>)}</div></div><div className="panel reading-panel"><div className="reading-symbol">{signs.find(s=>s[1]===sign)?.[0]}</div><div className="eyebrow">A MOMENT FOR {sign.toUpperCase()}</div><h2>Make space for what matters.</h2><p>Today invites you to bring gentle focus to one meaningful intention. Listen before reacting, and let patience guide your next step. A small, consistent action may feel more rewarding than a dramatic change.</p><div className="reading-meta"><span><WandSparkles size={15}/> Reflection</span><span><Clock3 size={15}/> 2 min read</span></div><div className="reading-disclaimer">This is general sample horoscope copy, not a personalized prediction or live transit reading.</div></div></div></section>
}

export default App
