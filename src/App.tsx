import { useState, useEffect, useRef } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";

// ─── PROJECT LINKS ───────────────────────────────────────────────────────────
const REPOLENS_LIVE_URL = "https://repolens-two.vercel.app";
const REPOLENS_REPO_URL = "https://github.com/realvidhaan/repolens";

// ─── DATA ────────────────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Intwined Sketch",
    price: 12,
    category: "Sketch",
    image: "/intwined.png",
    shortDesc: "Cool sketch of a women twirling her hair",
    fullDesc:
      "A hand-drawin drawing using premium sketching pencils. Each line captures the movement of hair. Sketched on 140 lb cold-press drawing paper.",
    tags: ["sketch", "hair", "hand"],
  },
  {
    id: 2,
    name: "Greek Hero",
    price: 20,
    category: "Sketch",
    image: "/greek-hero.png",
    shortDesc: "Hand-illustrated sketch of a Greek bust",
    fullDesc:
      "A hand-illustrated sketch with a fierce Greek figure enveloped in a blue glow. Sketched on recycled card stock.",
    tags: ["sketch", "Greek", "statue"],
  },
  {
    id: 3,
    name: "Modern Ram",
    price: 12,
    category: "Drawing",
    image: "/modern-ram.png",
    shortDesc: "Marker & paint ram portrait",
    fullDesc:
      "An intricate ram drawing made with high-quality colored markers and paints on smooth Bristol paper. Each piece takes 4+ hours.",
    tags: ["drawing", "animal", "modern"],
  },
  {
    id: 4,
    name: "Takeoff",
    price: 20,
    category: "Painting",
    image: "/takeoff.png",
    shortDesc: "Cold painting of a spaceship",
    fullDesc:
      "Acryllic painting of a spaceship taking off. Made on premium canvas.",
    tags: ["painting", "space", "spaceship"],
  },
  {
    id: 5,
    name: "Hummingbird",
    price: 18,
    category: "Misc",
    image: "/modern-ram-photo.png",
    shortDesc: "Whimsical forest bird illustration",
    fullDesc:
      "Gold illustration of a hummingbird. Made on blackout paper.",
    tags: ["misc", "bird", "nature"],
  },
];

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Product = (typeof products)[0];
type Page =
  | { name: "landing" }
  | { name: "shop" }
  | { name: "projects" }
  | { name: "product"; product: Product };

// ─── ICONS ───────────────────────────────────────────────────────────────────

const svgBase = (size: number) => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeft = ({ size = 18 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const MenuIcon = ({ size = 22 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <line x1="3" y1="8" x2="21" y2="8" />
    <line x1="3" y1="16" x2="21" y2="16" />
  </svg>
);

const XIcon = ({ size = 22 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ScanIcon = ({ size = 16 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LayersIcon = ({ size = 18 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const BarsIcon = ({ size = 18 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ChatIcon = ({ size = 18 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);


// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -8;
    const ry = (px - 0.5) * 10;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

// ─── REUSABLE PIECES ─────────────────────────────────────────────────────────

function Marquee({ items }: { items: string[] }) {
  const repeated = Array.from({ length: 4 }).flatMap(() => items);
  return (
    <div className="marquee">
      <div className="marquee-track">
        {repeated.map((it, i) => (
          <span key={i} className="marquee-item">
            {it}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0, as: As = "div" }: { children: ReactNode; delay?: number; as?: React.ElementType }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <As ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </As>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({
  page,
  navigate,
  menuOpen,
  setMenuOpen,
}: {
  page: Page;
  navigate: (p: Page) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  const links: { label: string; page: Page }[] = [
    { label: "Index", page: { name: "landing" } },
    { label: "Shop", page: { name: "shop" } },
    { label: "Projects", page: { name: "projects" } },
  ];

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button
          onClick={() => { navigate({ name: "landing" }); setMenuOpen(false); }}
          className="nav-logo"
        >
          <img src="/logo.png" alt="Vidhaan’s Masterpieces logo" className="logo-mark" />
          <span className="logo-text">vidhaan's<em>masterpieces</em></span>
        </button>

        <div className="nav-links">
          {links.map((link, i) => (
            <button
              key={link.label}
              onClick={() => navigate(link.page)}
              className={`nav-link ${page.name === link.page.name ? "active" : ""}`}
            >
              <span className="nav-link-num">0{i + 1}</span>
              {link.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-burger"
            aria-label="Menu"
          >
            {menuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile">
          {links.map((link, i) => (
            <button
              key={link.label}
              onClick={() => { navigate(link.page); setMenuOpen(false); }}
              className={`nav-mobile-link ${page.name === link.page.name ? "active" : ""}`}
            >
              <span className="nav-mobile-num">0{i + 1}</span>
              {link.label}
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onClick,
  index,
}: {
  product: Product;
  onClick: () => void;
  index: number;
}) {
  const tilt = useTilt();
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div ref={revealRef} className="card-wrap reveal" onClick={onClick}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="card"
      >
        <div className="card-img-wrap">
          <img src={product.image} alt={product.name} className="card-img" loading="lazy" />
          <div className="card-shine" />
          <span className="card-cat">{product.category}</span>
          <span className="card-num">№ {String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="card-meta">
          <h3 className="card-name">{product.name}</h3>
          <div className="card-row">
            <span className="card-price">${product.price}.00</span>
            <span className="card-cta">
              View <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LANDING ─────────────────────────────────────────────────────────────────

function LandingPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grain" />
        <div className="hero-meta">
          <span>EST. 2024</span>
          <span className="dot">/</span>
          <span>VIDHAAN.INFO</span>
          <span className="dot">/</span>
          <span>EDITION 002</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-line">vidhaan's</span>
          <span className="hero-line hero-line-2">
            master<em>pieces</em>
          </span>
        </h1>

        <div className="hero-bottom">
          <div className="hero-tag">
            <span className="hero-tag-num">/01</span>
            <p>
              Original drawings, watercolor paintings &amp; hand-illustrated greeting cards. Every piece made with care
              by an 11-year-old artist.
            </p>
          </div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate({ name: "shop" })}>
              <span>Shop the collection</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={["HANDCRAFTED", "ORIGINAL ART", "WATERCOLOR", "DRAWING", "GREETING CARDS", "SINCE 2026"]} />

      {/* FEATURED EDITORIAL */}
      <section className="section">
        <div className="section-head">
          <div>
            <Eyebrow>/ 02 Featured</Eyebrow>
            <h2 className="section-title">Latest works,<br /><em>fresh from the studio.</em></h2>
          </div>
          <Reveal>
            <button className="btn-ghost" onClick={() => navigate({ name: "shop" })}>
              All works <ArrowRight size={14} />
            </button>
          </Reveal>
        </div>

        <div className="editorial">
          {products.slice(0, 3).map((p, i) => (
            <EditorialItem
              key={p.id}
              product={p}
              index={i}
              onClick={() => navigate({ name: "product", product: p })}
            />
          ))}
        </div>
      </section>

      <Footer navigate={navigate} />
    </>
  );
}

// ─── EDITORIAL ITEM (alternating magazine layout) ────────────────────────────

function EditorialItem({
  product,
  index,
  onClick,
}: {
  product: Product;
  index: number;
  onClick: () => void;
}) {
  const tilt = useTilt();
  const reverse = index % 2 === 1;
  return (
    <Reveal>
      <div className={`editorial-row ${reverse ? "reverse" : ""}`} onClick={onClick}>
        <div className="editorial-img-col">
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="editorial-img-frame"
          >
            <img src={product.image} alt={product.name} loading="lazy" />
            <span className="editorial-num">№ {String(index + 1).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="editorial-text-col">
          <Eyebrow>{product.category}</Eyebrow>
          <h3 className="editorial-title">{product.name}</h3>
          <p className="editorial-desc">{product.fullDesc}</p>
          <div className="editorial-row-bottom">
            <span className="editorial-price">${product.price}.00</span>
            <span className="editorial-cta">
              View piece <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── SHOP PAGE ───────────────────────────────────────────────────────────────

function ShopPage({ navigate }: { navigate: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <section className="page-head">
        <div className="hero-grain" />
        <Eyebrow>/ Shop Vol. 01</Eyebrow>
        <h1 className="page-title">
          The <em>collection.</em>
        </h1>
        <p className="page-sub">
          Original works · No prints, no reprints · Each one one-of-a-kind.
        </p>

        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter ${filter === cat ? "active" : ""}`}
            >
              {cat}
              {filter === cat && <span className="filter-mark"></span>}
            </button>
          ))}
        </div>
      </section>

      <section className="section section-grid">
        <div className="grid">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onClick={() => navigate({ name: "product", product: p })}
            />
          ))}
        </div>
      </section>

      <Marquee items={["EVERY PIECE ORIGINAL", "HAND MADE", "ONE OF ONE", "NO REPRINTS"]} />

      <Footer navigate={navigate} />
    </>
  );
}

// ─── PROJECTS PAGE ───────────────────────────────────────────────────────────

const projectFeatures = [
  {
    icon: <LayersIcon />,
    title: "Architecture briefing",
    desc: "Reads the file tree and key sources, then writes a sharp, plain-English breakdown of how the project is structured.",
  },
  {
    icon: <BarsIcon />,
    title: "Live language breakdown",
    desc: "Pulls real GitHub stats: stars, forks, and a colour-coded map of every language in the repo.",
  },
  {
    icon: <ChatIcon />,
    title: "Code-aware chat",
    desc: "Ask anything about the codebase and get answers grounded in the actual files. No vague guesses.",
  },
];

const repolensStack = ["Next.js", "TypeScript", "Tailwind", "Local AI", "GitHub API"];

function ProjectsPage({ navigate }: { navigate: (p: Page) => void }) {
  const tilt = useTilt();

  return (
    <>
      <section className="page-head">
        <div className="hero-grain" />
        <Eyebrow>/ Projects Vol. 01</Eyebrow>
        <h1 className="page-title">
          Things I've <em>built.</em>
        </h1>
      </section>

      <section className="section section-grid">
        <Reveal>
          <article className="project-feature">
            {/* ── Left: live demo mockup ── */}
            <div className="project-showcase">
              <div
                ref={tilt.ref}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                className="browser-frame"
              >
                <div className="browser-bar">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-url">
                    <ScanIcon size={11} /> repolens.app
                  </span>
                </div>
                <div className="browser-body">
                  <span className="rl-badge">
                    <ScanIcon size={11} /> Understand any codebase in 60s
                  </span>
                  <h3 className="rl-headline">
                    See any GitHub repo
                    <br />
                    <span className="rl-gradient">through a clear lens</span>
                  </h3>
                  <div className="rl-search">
                    <ScanIcon size={13} />
                    <span className="rl-search-text">vercel/next.js</span>
                    <span className="rl-search-btn">Analyze</span>
                  </div>
                  <div className="rl-tiles">
                    <div className="rl-tile rl-tile-wide">
                      <span className="rl-tile-dot" />
                      <span className="rl-tile-dot" />
                      <span className="rl-tile-dot" />
                    </div>
                    <div className="rl-tile rl-tile-tall" />
                    <div className="rl-tile" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: project detail ── */}
            <div className="project-detail">
              <Eyebrow>AI · Developer Tool</Eyebrow>
              <h2 className="project-title">
                Repo<em>Lens</em>
              </h2>
              <div className="project-tags">
                {repolensStack.map((t) => (
                  <span key={t} className="tag">/ {t}</span>
                ))}
              </div>

              <div className="project-actions">
                <a
                  className="btn-primary"
                  href={REPOLENS_LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Try the live demo</span>
                  <ArrowUpRight size={16} />
                </a>
                <a
                  className="btn-ghost"
                  href={REPOLENS_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={16} /> View source
                </a>
              </div>
            </div>
          </article>
        </Reveal>

        {/* ── Capability cards ── */}
        <div className="project-features">
          {projectFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="pfeature">
                <span className="pfeature-icon">{f.icon}</span>
                <h3 className="pfeature-title">{f.title}</h3>
                <p className="pfeature-desc">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee items={["DESIGNED & BUILT", "AI POWERED", "SHIPPED WITH CARE", "MORE SOON"]} />

      <Footer navigate={navigate} />
    </>
  );
}

// ─── PRODUCT DETAIL ──────────────────────────────────────────────────────────

function ProductDetailPage({ product, navigate }: { product: Product; navigate: (p: Page) => void }) {
  const tilt = useTilt();

  return (
    <>
      <section className="product-detail">
        <button className="back-link" onClick={() => navigate({ name: "shop" })}>
          <ArrowLeft size={16} /> Back to collection
        </button>

        <div className="product-grid">
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="product-img-frame"
          >
            <img src={product.image} alt={product.name} />
            <span className="product-img-num">№ {String(product.id).padStart(2, "0")}</span>
          </div>

          <div className="product-info">
            <Eyebrow>{product.category}</Eyebrow>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-divider" />
            <p className="product-price">${product.price}.00</p>
            <p className="product-desc">{product.fullDesc}</p>

            <div className="product-tags">
              {product.tags.map((t) => (
                <span key={t} className="tag">/ {t}</span>
              ))}
            </div>



            <a
              href={`https://venmo.com/Minu-Agarwal?txn=pay&note=${encodeURIComponent(product.name)}&amount=${product.price}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "18px 32px",
                background: "#3D95CE",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(61,149,206,0.45)",
                transition: "all 0.2s ease",
                marginTop: "12px",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#2d7ab0";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(61,149,206,0.55)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#3D95CE";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(61,149,206,0.45)";
              }}
            >
              {/* Venmo logo mark */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="white" fillOpacity="0.2"/>
                <path d="M19.5 3C20.3 4.6 20.7 6.3 20.7 8.5C20.7 14.6 15.7 22.3 11.8 22.3C8.1 22.3 7.4 17.8 5.9 13C5.2 10.9 4.4 8.6 3 8.6L4.7 7.2C7 7.2 9 9.9 9.9 12.6C10.5 14.5 11 17.3 12.3 17.3C14.3 17.3 17.3 11.8 17.3 7.9C17.3 5.9 16.7 4.5 15.8 3.5L19.5 3Z" fill="white"/>
              </svg>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>
                Pay ${product.price}.00 with Venmo
              </span>
            </a>

            <p className="product-note">Free shipping · Pay securely via Venmo · Made with care</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <Eyebrow>/ More works</Eyebrow>
            <h2 className="section-title">You might also like.</h2>
          </div>
        </div>
        <div className="grid">
          {products.filter((p) => p.id !== product.id).slice(0, 3).map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onClick={() => navigate({ name: "product", product: p })}
            />
          ))}
        </div>
      </section>

      <Footer navigate={navigate} />
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-big">
          Made by <em>hand,</em><br />
          made with <em>love.</em>
        </h2>
        <button className="btn-primary" onClick={() => navigate({ name: "shop" })}>
          <span>Shop the collection</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="footer-bottom">
        <span>© 2026 vidhaan.info</span>
        <span>Edition 002</span>
        <span>All works original</span>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>({ name: "landing" });
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Re-mount key to trigger page-enter animation
  const pageKey = `${page.name}-${
    page.name === "product" ? page.product.id : ""
  }`;

  return (
    <div className="app">
      <Nav page={page} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main key={pageKey} className="page-enter">
        {page.name === "landing" && <LandingPage navigate={navigate} />}
        {page.name === "shop" && <ShopPage navigate={navigate} />}
        {page.name === "projects" && <ProjectsPage navigate={navigate} />}
        {page.name === "product" && <ProductDetailPage product={page.product} navigate={navigate} />}
      </main>
    </div>
  );
}
