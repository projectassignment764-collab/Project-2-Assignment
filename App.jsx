// App.jsx — CampusNest · Auth + City Panels + Property Listings
const { useState } = React;

/* ── PROPERTY DATA ─────────────────────────── */
const CITY_PROPERTIES = {
  "Cape Town": [
    { id: "ct1", name: "Nest House Observatory", address: "14 Station Road, Observatory, Cape Town", type: "Single & Sharing", price: "R3,200 – R4,800/mo", spots: 4, tags: ["NSFAS Accredited", "Fibre WiFi", "En-suite"], nearUni: "UCT · 8 min drive", emoji: "🏡", badge: "Popular" },
    { id: "ct2", name: "CampusNest Rondebosch", address: "22 Main Rd, Rondebosch, Cape Town", type: "Single Rooms", price: "R4,000 – R5,500/mo", spots: 2, tags: ["NSFAS Accredited", "Study Lounge", "Parking"], nearUni: "UCT · 5 min walk", emoji: "🏢", badge: "Limited" },
    { id: "ct3", name: "Mowbray Student Lodge", address: "8 Durban Rd, Mowbray, Cape Town", type: "Sharing Rooms", price: "R2,600 – R3,400/mo", spots: 8, tags: ["NSFAS Accredited", "Laundry", "Kitchen"], nearUni: "CPUT · 12 min bus", emoji: "🏠", badge: "Available" },
    { id: "ct4", name: "Pinelands Residence", address: "33 Howard Dr, Pinelands, Cape Town", type: "En-suite Rooms", price: "R4,500 – R6,000/mo", spots: 3, tags: ["Private Bathroom", "Fibre WiFi", "CCTV"], nearUni: "UWC · 20 min taxi", emoji: "🏘️", badge: "New" },
  ],
  "Johannesburg": [
    { id: "jhb1", name: "Braamfontein Heights", address: "55 De Korte St, Braamfontein, JHB", type: "Single & Sharing", price: "R3,000 – R4,500/mo", spots: 6, tags: ["NSFAS Accredited", "Biometric Access", "Study Room"], nearUni: "Wits · 5 min walk", emoji: "🏙️", badge: "Popular" },
    { id: "jhb2", name: "Doornfontein Student Den", address: "12 Nugget St, Doornfontein, JHB", type: "Sharing Rooms", price: "R2,400 – R3,200/mo", spots: 10, tags: ["NSFAS Accredited", "Laundry", "Parking"], nearUni: "UJ · 10 min walk", emoji: "🏢", badge: "Available" },
    { id: "jhb3", name: "Parktown Nest", address: "78 Jan Smuts Ave, Parktown, JHB", type: "En-suite Rooms", price: "R5,000 – R7,000/mo", spots: 2, tags: ["Premium", "Private Bathroom", "Gym Access"], nearUni: "Wits Medical · 3 min", emoji: "🏡", badge: "Limited" },
  ],
  "Pretoria": [
    { id: "pta1", name: "Hatfield House", address: "44 Hilda St, Hatfield, Pretoria", type: "Single & Sharing", price: "R2,800 – R4,200/mo", spots: 5, tags: ["NSFAS Accredited", "Fibre WiFi", "Braai Area"], nearUni: "UP · 6 min walk", emoji: "🏛️", badge: "Popular" },
    { id: "pta2", name: "Sunnyside Student Village", address: "19 Esselen St, Sunnyside, Pretoria", type: "Sharing Rooms", price: "R2,200 – R3,000/mo", spots: 12, tags: ["NSFAS Accredited", "CCTV", "Laundry"], nearUni: "TUT · 15 min bus", emoji: "🏘️", badge: "Available" },
    { id: "pta3", name: "Arcadia Residence", address: "62 Boom St, Arcadia, Pretoria", type: "En-suite Rooms", price: "R3,800 – R5,200/mo", spots: 3, tags: ["En-suite", "Study Lounge", "Parking"], nearUni: "UNISA · 20 min", emoji: "🏠", badge: "New" },
  ],
  "Bellville": [
    { id: "bvl1", name: "Raglan Student Lodge", address: "3 Raglan St, Bellville, Cape Town", type: "Single & Sharing", price: "R2,600 – R3,800/mo", spots: 7, tags: ["NSFAS Accredited", "House Parents", "WiFi"], nearUni: "UWC · 10 min bus", emoji: "🏘️", badge: "Popular" },
    { id: "bvl2", name: "Voortrekker Road Nest", address: "210 Voortrekker Rd, Bellville", type: "Sharing Rooms", price: "R2,100 – R2,900/mo", spots: 9, tags: ["NSFAS Accredited", "CCTV", "Kitchen"], nearUni: "CPUT Bellville · 5 min", emoji: "🏠", badge: "Available" },
  ],
  "Parow": [
    { id: "par1", name: "Parow Central Residence", address: "8 Hoewe St, Parow, Cape Town", type: "Single Rooms", price: "R2,400 – R3,400/mo", spots: 5, tags: ["NSFAS Accredited", "Laundry", "Study Room"], nearUni: "CPUT · 12 min taxi", emoji: "🌿", badge: "Available" },
    { id: "par2", name: "Parow North Nest", address: "41 Newton Rd, Parow North", type: "Sharing Rooms", price: "R1,900 – R2,700/mo", spots: 6, tags: ["NSFAS Accredited", "WiFi", "Secure Parking"], nearUni: "Northlink College · 8 min", emoji: "🏡", badge: "Limited" },
  ],
  "Durbanville": [
    { id: "dbv1", name: "Durbanville Student Manor", address: "15 Oxford St, Durbanville, Cape Town", type: "En-suite & Single", price: "R3,400 – R5,000/mo", spots: 3, tags: ["Premium", "Private Bathroom", "Fibre WiFi", "Parking"], nearUni: "Durbanville Campus · 5 min", emoji: "🌄", badge: "Limited" },
  ],
};

const CITIES = [
  { name: "Cape Town",    props: "12+", emoji: "🌊", tag: "NSFAS Accredited" },
  { name: "Johannesburg", props: "8+",  emoji: "🏙️", tag: "NSFAS Accredited" },
  { name: "Pretoria",     props: "6+",  emoji: "🏛️", tag: "NSFAS Accredited" },
  { name: "Bellville",    props: "5+",  emoji: "🏘️", tag: "Available Now" },
  { name: "Parow",        props: "4+",  emoji: "🌿", tag: "Available Now" },
  { name: "Durbanville",  props: "3+",  emoji: "🌄", tag: "Limited Spots" },
];

const FEATURES = [
  { icon: "🔒", title: "Safe & Secure",           desc: "24/7 security, controlled access, CCTV monitoring at all our properties nationwide." },
  { icon: "📶", title: "High-Speed WiFi",          desc: "Uncapped fibre internet in every room — perfect for online learning and streaming." },
  { icon: "👨‍👩‍👧", title: "Dedicated House Parents", desc: "On-site support staff who care about your wellbeing, not just the building." },
  { icon: "✅", title: "NSFAS Accredited",         desc: "All properties are NSFAS accredited — we handle the admin so you can focus on studying." },
];

const AMENITIES = [
  { icon: "🛏️", name: "Furnished Rooms" }, { icon: "📶", name: "Fibre WiFi" },
  { icon: "🍳", name: "Kitchen Access" },  { icon: "🅿️", name: "Free Parking" },
  { icon: "🧺", name: "Laundry" },         { icon: "📚", name: "Study Areas" },
  { icon: "🛡️", name: "24/7 Security" },   { icon: "🚿", name: "Private Bathrooms" },
];

const TESTIMONIALS = [
  { stars: "★★★★★", text: "CampusNest gave me more than a room — they gave me a home. The house parents are amazing and I always felt safe.", name: "Lerato M.", uni: "UWC, Cape Town", initials: "LM" },
  { stars: "★★★★★", text: "The NSFAS process was so smooth. I didn't have to stress about accommodation at all during registration.", name: "Sipho D.", uni: "CPUT, Bellville", initials: "SD" },
  { stars: "★★★★★", text: "Clean, affordable, and WiFi that actually works. Finding a place like this is nearly impossible — very grateful.", name: "Anika V.", uni: "TUT, Pretoria", initials: "AV" },
];

/* ── SHARED MODAL WRAPPER ─────────────────── */
function Modal({ onClose, children, wide }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={wide ? "modal-box modal-box-wide" : "modal-box"}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

/* ── AUTH MODALS ──────────────────────────── */
function LoginModal({ onClose, onSwitchRegister, onSwitchAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setMsg('Please fill in all fields.'); return; }
    setLoading(true); setMsg('');
    setTimeout(() => { setLoading(false); setMsg('✅ Logged in successfully!'); }, 1200);
  };
  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <div className="modal-logo">CampusNest <span className="modal-logo-badge">SA</span></div>
        <h2 className="modal-title">Welcome back</h2>
        <p className="modal-sub">Log in to manage your accommodation</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" placeholder="student@university.ac.za" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-icon-wrap">
            <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" className="show-pass-btn" onClick={() => setShowPass(!showPass)}>{showPass ? '🙈' : '👁️'}</button>
          </div>
        </div>
        <div className="form-row-between">
          <label className="checkbox-label"><input type="checkbox" /> Remember me</label>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>
        {msg && <div className={msg.startsWith('✅') ? 'form-msg success' : 'form-msg error'}>{msg}</div>}
        <button type="submit" className="auth-submit-btn" disabled={loading}>{loading ? <span className="spinner" /> : 'Log In →'}</button>
      </form>
      <div className="modal-divider"><span>or</span></div>
      <div className="modal-footer-links">
        <p>Don't have an account? <button className="link-btn" onClick={onSwitchRegister}>Create one</button></p>
        <p><button className="link-btn admin-link-btn" onClick={onSwitchAdmin}>🔐 Admin login</button></p>
      </div>
    </Modal>
  );
}

function RegisterModal({ onClose, onSwitchLogin }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', university: '', password: '', confirm: '', nsfas: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) { setMsg('Please fill in all required fields.'); return; }
    if (form.password !== form.confirm) { setMsg('Passwords do not match.'); return; }
    if (form.password.length < 8) { setMsg('Password must be at least 8 characters.'); return; }
    setLoading(true); setMsg('');
    setTimeout(() => { setLoading(false); setMsg('✅ Account created! Check your email to verify.'); }, 1400);
  };
  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <div className="modal-logo">CampusNest <span className="modal-logo-badge">SA</span></div>
        <h2 className="modal-title">Create your account</h2>
        <p className="modal-sub">Join 800+ students nationwide</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-row-2">
          <div className="form-group"><label>Full name <span className="req">*</span></label><input type="text" placeholder="Thabo Nkosi" value={form.name} onChange={e => update('name', e.target.value)} /></div>
          <div className="form-group"><label>Phone number</label><input type="tel" placeholder="+27 82 000 0000" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
        </div>
        <div className="form-group"><label>Email address <span className="req">*</span></label><input type="email" placeholder="you@university.ac.za" value={form.email} onChange={e => update('email', e.target.value)} /></div>
        <div className="form-group"><label>University / Institution</label><input type="text" placeholder="e.g. UCT, CPUT, Wits…" value={form.university} onChange={e => update('university', e.target.value)} /></div>
        <div className="form-row-2">
          <div className="form-group"><label>Password <span className="req">*</span></label>
            <div className="input-icon-wrap">
              <input type={showPass ? 'text' : 'password'} placeholder="Min 8 characters" value={form.password} onChange={e => update('password', e.target.value)} />
              <button type="button" className="show-pass-btn" onClick={() => setShowPass(!showPass)}>{showPass ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="form-group"><label>Confirm password <span className="req">*</span></label><input type="password" placeholder="Repeat password" value={form.confirm} onChange={e => update('confirm', e.target.value)} /></div>
        </div>
        <label className="checkbox-label nsfas-check"><input type="checkbox" checked={form.nsfas} onChange={e => update('nsfas', e.target.checked)} /> I am an NSFAS bursary holder</label>
        {msg && <div className={msg.startsWith('✅') ? 'form-msg success' : 'form-msg error'}>{msg}</div>}
        <button type="submit" className="auth-submit-btn" disabled={loading}>{loading ? <span className="spinner" /> : 'Create Account →'}</button>
        <p className="terms-note">By signing up you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
      </form>
      <div className="modal-footer-links"><p>Already have an account? <button className="link-btn" onClick={onSwitchLogin}>Log in</button></p></div>
    </Modal>
  );
}

function AdminLoginModal({ onClose, onSwitchLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !code) { setMsg('All fields are required for admin access.'); return; }
    setLoading(true); setMsg('');
    setTimeout(() => { setLoading(false); setMsg('✅ Admin access granted. Redirecting…'); }, 1500);
  };
  return (
    <Modal onClose={onClose}>
      <div className="modal-header admin-modal-header">
        <div className="admin-shield">🔐</div>
        <h2 className="modal-title">Admin Portal</h2>
        <p className="modal-sub">Restricted access · CampusNest staff only</p>
      </div>
      <div className="admin-warning">⚠️ This area is for authorised CampusNest administrators only. Unauthorised access attempts are logged.</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group"><label>Admin email</label><input type="email" placeholder="admin@campusnest.co.za" value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div className="form-group"><label>Password</label>
          <div className="input-icon-wrap">
            <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" className="show-pass-btn" onClick={() => setShowPass(!showPass)}>{showPass ? '🙈' : '👁️'}</button>
          </div>
        </div>
        <div className="form-group"><label>2FA Security Code</label><input type="text" placeholder="6-digit code" maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g,''))} className="code-input" /></div>
        {msg && <div className={msg.startsWith('✅') ? 'form-msg success' : 'form-msg error'}>{msg}</div>}
        <button type="submit" className="auth-submit-btn admin-submit-btn" disabled={loading}>{loading ? <span className="spinner" /> : '🔐 Access Admin Panel'}</button>
      </form>
      <div className="modal-footer-links"><p><button className="link-btn" onClick={onSwitchLogin}>← Back to student login</button></p></div>
    </Modal>
  );
}

/* ── APPLICATION MODAL ────────────────────── */
function ApplyModal({ property, city, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', uni: '', year: '', type: '', nsfas: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) { setMsg('Please fill in all required fields.'); return; }
    setLoading(true); setMsg('');
    setTimeout(() => { setLoading(false); setMsg('✅ Application submitted! Our team will contact you within 24 hours.'); }, 1400);
  };
  return (
    <Modal onClose={onClose}>
      <div className="modal-header">
        <div className="apply-property-tag">
          <span className="apply-prop-emoji">{property.emoji}</span>
          <div>
            <div className="apply-property-name">{property.name}</div>
            <div className="apply-property-city">{city} · {property.price}</div>
          </div>
        </div>
        <h2 className="modal-title" style={{marginTop:'16px'}}>Apply for this room</h2>
        <p className="modal-sub">Fill in your details and we'll get back to you within 24 hours</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-row-2">
          <div className="form-group"><label>Full name <span className="req">*</span></label><input type="text" placeholder="Thabo Nkosi" value={form.name} onChange={e => update('name', e.target.value)} /></div>
          <div className="form-group"><label>Phone <span className="req">*</span></label><input type="tel" placeholder="+27 82 000 0000" value={form.phone} onChange={e => update('phone', e.target.value)} /></div>
        </div>
        <div className="form-group"><label>Email address <span className="req">*</span></label><input type="email" placeholder="you@university.ac.za" value={form.email} onChange={e => update('email', e.target.value)} /></div>
        <div className="form-row-2">
          <div className="form-group"><label>University / Institution</label><input type="text" placeholder="e.g. UCT, Wits…" value={form.uni} onChange={e => update('uni', e.target.value)} /></div>
          <div className="form-group"><label>Year of study</label>
            <select value={form.year} onChange={e => update('year', e.target.value)}>
              <option value="">Select year</option>
              <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>Postgraduate</option>
            </select>
          </div>
        </div>
        <div className="form-group"><label>Preferred room type</label>
          <select value={form.type} onChange={e => update('type', e.target.value)}>
            <option value="">Any available</option>
            <option>Single room</option><option>Sharing room</option><option>En-suite room</option>
          </select>
        </div>
        <label className="checkbox-label nsfas-check"><input type="checkbox" checked={form.nsfas} onChange={e => update('nsfas', e.target.checked)} /> I am applying via NSFAS bursary</label>
        <div className="form-group"><label>Any special requirements?</label>
          <textarea className="apply-textarea" placeholder="Dietary needs, accessibility, move-in date, etc." value={form.message} onChange={e => update('message', e.target.value)} rows={3} />
        </div>
        {msg && <div className={msg.startsWith('✅') ? 'form-msg success' : 'form-msg error'}>{msg}</div>}
        <button type="submit" className="auth-submit-btn" disabled={loading}>{loading ? <span className="spinner" /> : '📋 Submit Application'}</button>
        <p className="terms-note">Available spots: <strong style={{color:'var(--navy)'}}>{property.spots} remaining</strong> · We'll confirm availability when we contact you.</p>
      </form>
    </Modal>
  );
}

/* ── CITY PANEL ───────────────────────────── */
const BADGE_COLORS = {
  "Popular":   { bg: "rgba(245,166,35,0.12)",  color: "#b07a10", border: "rgba(245,166,35,0.3)" },
  "Limited":   { bg: "rgba(231,76,60,0.09)",   color: "#c0392b", border: "rgba(231,76,60,0.25)" },
  "Available": { bg: "rgba(46,204,113,0.10)",  color: "#1a8a4a", border: "rgba(46,204,113,0.25)" },
  "New":       { bg: "rgba(52,152,219,0.10)",  color: "#1a6e9e", border: "rgba(52,152,219,0.25)" },
};

function PropertyCard({ property, city, onApply }) {
  const bc = BADGE_COLORS[property.badge] || BADGE_COLORS["Available"];
  return (
    <div className="prop-card">
      <div className="prop-card-top">
        <div className="prop-emoji-wrap">{property.emoji}</div>
        <div className="prop-card-info">
          <div className="prop-card-name">{property.name}</div>
          <div className="prop-card-addr">📍 {property.address}</div>
        </div>
        <div className="prop-badge" style={{background:bc.bg, color:bc.color, border:`1px solid ${bc.border}`}}>{property.badge}</div>
      </div>
      <div className="prop-card-meta">
        <div className="prop-meta-item">🏠 {property.type}</div>
        <div className="prop-meta-item">💰 {property.price}</div>
        <div className="prop-meta-item">🎓 {property.nearUni}</div>
        <div className="prop-meta-item">🪑 {property.spots} spots left</div>
      </div>
      <div className="prop-tags">
        {property.tags.map(t => <span key={t} className="prop-tag">{t}</span>)}
      </div>
      <div className="prop-card-actions">
        <a href={"mailto:getinfo@campusnest.co.za?subject=Enquiry: " + property.name} className="prop-enquire-btn">✉️ Enquire</a>
        <button className="prop-apply-btn" onClick={() => onApply(property)}>Apply Now →</button>
      </div>
    </div>
  );
}

function CityPanelModal({ city, onClose, onApply }) {
  const properties = CITY_PROPERTIES[city.name] || [];
  const [filter, setFilter] = useState('All');
  const types = ['All', 'Single', 'Sharing', 'En-suite'];
  const filtered = filter === 'All' ? properties : properties.filter(p => p.type.toLowerCase().includes(filter.toLowerCase()));
  return (
    <Modal onClose={onClose} wide={true}>
      <div className="city-panel-header">
        <div className="city-panel-emoji">{city.emoji}</div>
        <div>
          <h2 className="city-panel-title">{city.name}</h2>
          <p className="city-panel-sub">{properties.length} properties available · <span className="city-panel-tag">{city.tag}</span></p>
        </div>
      </div>
      <div className="city-filter-row">
        <span className="city-filter-label">Filter:</span>
        {types.map(t => (
          <button key={t} className={filter === t ? "city-filter-pill active" : "city-filter-pill"} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>
      <div className="city-props-list">
        {filtered.length === 0
          ? <div className="city-no-results">No properties match this filter.</div>
          : filtered.map(p => <PropertyCard key={p.id} property={p} city={city.name} onApply={onApply} />)
        }
      </div>
      <div className="city-panel-footer">
        <span>Can't find what you're looking for?</span>
        <a href="mailto:getinfo@campusnest.co.za" className="city-footer-link">Contact us for custom options →</a>
      </div>
    </Modal>
  );
}

/* ── PAGE COMPONENTS ──────────────────────── */
function Navbar({ onLoginClick, onRegisterClick, loggedIn, onLogout }) {
  return (
    <nav className="nav">
      <a href="#" className="nav-logo">CampusNest<span className="nav-logo-badge">SA</span></a>
      <ul className="nav-links">
        <li><a href="#cities">Locations</a></li>
        <li><a href="#why">Why Us</a></li>
        <li><a href="#amenities">Amenities</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="mailto:getinfo@mystudenthouse.co.za" className="nav-cta">Find a Room</a></li>
      </ul>
      <div className="nav-auth-group">
        {loggedIn ? (
          <>
            <span className="nav-welcome">👋 Welcome back!</span>
            <button className="nav-login-btn" onClick={onLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button className="nav-login-btn" onClick={onLoginClick}>Log In</button>
            <button className="nav-register-btn" onClick={onRegisterClick}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}

function Hero({ onRegisterClick }) {
  return (
    <section className="hero">
      <div className="hero-bg-pattern" />
      <div className="hero-bg-grid" />
      <div className="hero-content">
        <div className="hero-tag"><span className="hero-dot" />Nr. 1 Student Accommodation · South Africa</div>
        <h1>Your <span>Home Away</span><br />From Home</h1>
        <p>Safe, affordable, NSFAS-accredited student housing across Cape Town, Johannesburg, Pretoria and more. 800+ students housed. House parents on-site.</p>
        <div className="hero-btns">
          <a href="#cities" className="btn-primary">Find Accommodation →</a>
          <button className="btn-outline" onClick={onRegisterClick}>Create Account</button>
        </div>
        <div className="hero-stats">
          <div><div className="hero-stat-num">800+</div><div className="hero-stat-label">Students housed</div></div>
          <div><div className="hero-stat-num">30+</div><div className="hero-stat-label">Properties</div></div>
          <div><div className="hero-stat-num">100%</div><div className="hero-stat-label">NSFAS accredited</div></div>
        </div>
      </div>
      <div className="hero-image-col">
        {[0,1,2].map(i => (
          <div key={i} className="hero-img-card" style={i === 0 ? {gridRow:'span 2'} : {}}>
            <div className="hero-img-placeholder"><span className="house-icon">{['🏘️','📚','🛡️'][i]}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SearchBar() {
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  return (
    <div className="search-bar-section">
      <div className="search-bar-wrap">
        <div className="search-field"><label>City</label>
          <select value={city} onChange={e => setCity(e.target.value)}>
            <option value="">All cities</option>
            {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div className="search-field"><label>Room type</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">Any type</option>
            <option>Single room</option><option>Sharing room</option><option>En-suite</option>
          </select>
        </div>
        <div className="search-field"><label>University / Campus</label>
          <input type="text" placeholder="e.g. UWC, CPUT, UCT…" />
        </div>
        <button className="search-btn">Search →</button>
      </div>
    </div>
  );
}

function CitiesSection({ onCityClick }) {
  return (
    <section className="cities-section" id="cities">
      <div className="cities-header">
        <div>
          <span className="section-tag">Browse by Location</span>
          <h2 className="section-title">Find Accommodation<br />Near Your Campus</h2>
        </div>
        <p className="section-sub" style={{textAlign:'right', maxWidth:300}}>
          Click any city to browse available properties and apply directly.
        </p>
      </div>
      <div className="city-grid">
        {CITIES.map(city => (
          <button key={city.name} className="city-card city-card-btn" onClick={() => onCityClick(city)}>
            <div className="city-card-img"><span style={{fontSize:'3.5rem'}}>{city.emoji}</span></div>
            <div className="city-card-body">
              <div className="city-card-name">{city.name}</div>
              <div className="city-card-count">{city.props} properties available</div>
              <div className="city-card-badge">{city.tag}</div>
              <div className="city-card-cta">View properties →</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="why-section" id="why">
      <span className="section-tag">Why CampusNest</span>
      <h2 className="section-title">More Than Just a Room</h2>
      <div className="why-grid">
        <div className="why-features">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-item">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-text"><h3>{f.title}</h3><p>{f.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="why-visual">
          <div className="why-main-card">
            <div className="why-card-num">800+</div>
            <div className="why-card-label">Students successfully housed nationwide</div>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:'0.875rem',lineHeight:1.7,fontWeight:300,marginBottom:'1.5rem'}}>
              We've experienced 100% year-on-year growth since founding. Our mission is a nurturing environment that gives students the best opportunity to study, thrive, and make lifelong memories.
            </p>
            <div className="nsfas-badge"><span className="nsfas-dot" />NSFAS Accredited Properties</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  return (
    <section className="amenities-section" id="amenities">
      <span className="section-tag" style={{background:'rgba(245,166,35,0.15)',color:'#f5a623'}}>What's Included</span>
      <h2 className="section-title">Everything You Need</h2>
      <p className="section-sub">Every property comes fully equipped — no hidden costs, no surprises.</p>
      <div className="amenities-grid">
        {AMENITIES.map(a => (
          <div key={a.name} className="amenity-card">
            <div className="amenity-icon">{a.icon}</div>
            <div className="amenity-name">{a.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="testimonials">
      <span className="section-tag">Student Reviews</span>
      <h2 className="section-title">What Our Students Say</h2>
      <p className="section-sub">Trusted by students, parents, and institutions across South Africa.</p>
      <div className="testimonials-grid">
        {TESTIMONIALS.map(t => (
          <div key={t.name} className="testimonial-card">
            <div className="testimonial-stars">{t.stars}</div>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <div className="author-avatar">{t.initials}</div>
              <div><div className="author-name">{t.name}</div><div className="author-uni">{t.uni}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection({ onRegisterClick }) {
  return (
    <section className="cta-section">
      <h2>Ready to Find Your Home?</h2>
      <p>Get in touch with our team and secure your spot before the semester starts.</p>
      <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
        <button className="btn-dark" onClick={onRegisterClick}>Apply Now →</button>
        <a href="tel:+27215183015" className="btn-dark" style={{background:'rgba(13,31,60,0.15)',color:'#0d1f3c',border:'1.5px solid rgba(13,31,60,0.25)'}}>📞 +27 21 518 3015</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">CampusNest</div>
          <p className="footer-brand-desc">South Africa's leading private student accommodation provider. Safe, affordable housing with house parents on-site. 100% owned by M5 Global.</p>
          <div className="footer-contact">
            <span>📍 3 Raglan Street, Bellville, South Africa</span>
            <a href="tel:+27215183015">📞 +27 21 518 3015</a>
            <a href="mailto:getinfo@mystudenthouse.co.za">✉️ getinfo@campusNest.co.za</a>
          </div>
        </div>
        <div>
          <div className="footer-heading">Locations</div>
          <ul className="footer-links">{CITIES.map(c => <li key={c.name}><a href="#">{c.name}</a></li>)}</ul>
        </div>
        <div>
          <div className="footer-heading">Company</div>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li><li><a href="#">Find Accommodation</a></li>
            <li><a href="#">For Landlords</a></li><li><a href="#">NSFAS Info</a></li><li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Support</div>
          <ul className="footer-links">
            <li><a href="#">FAQ</a></li><li><a href="#">Apply Online</a></li>
            <li><a href="#">Student Portal</a></li><li><a href="#">House Rules</a></li>
          </ul>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <span>© 2025 My Student House · M5 Global. All rights reserved.</span>
        <div className="footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></div>
      </div>
    </footer>
  );
}

/* ── ROOT APP ─────────────────────────────── */
function App() {
  const [modal, setModal]         = useState('none');
  const [cityPanel, setCityPanel] = useState(null);
  const [applyProp, setApplyProp] = useState(null);
  const [loggedIn, setLoggedIn]   = useState(false);

  const openLogin    = () => setModal('login');
  const openRegister = () => setModal('register');
  const openAdmin    = () => setModal('admin');
  const closeModal   = () => setModal('none');

  const handleCityClick = (city) => setCityPanel(city);
  const closeCityPanel  = () => setCityPanel(null);
  const handleApply     = (property) => { setApplyProp({ property, city: cityPanel }); setCityPanel(null); };
  const closeApply      = () => setApplyProp(null);

  return (
    <>
      <Navbar onLoginClick={openLogin} onRegisterClick={openRegister} loggedIn={loggedIn} onLogout={() => setLoggedIn(false)} />
      <Hero onRegisterClick={openRegister} />
      <SearchBar />
      <CitiesSection onCityClick={handleCityClick} />
      <WhySection />
      <AmenitiesSection />
      <TestimonialsSection />
      <CtaSection onRegisterClick={openRegister} />
      <Footer />

      {modal === 'login'    && <LoginModal onClose={closeModal} onSwitchRegister={() => setModal('register')} onSwitchAdmin={openAdmin} />}
      {modal === 'register' && <RegisterModal onClose={closeModal} onSwitchLogin={() => setModal('login')} />}
      {modal === 'admin'    && <AdminLoginModal onClose={closeModal} onSwitchLogin={() => setModal('login')} />}

      {cityPanel && !applyProp && <CityPanelModal city={cityPanel} onClose={closeCityPanel} onApply={handleApply} />}
      {applyProp && <ApplyModal property={applyProp.property} city={applyProp.city?.name} onClose={closeApply} />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
