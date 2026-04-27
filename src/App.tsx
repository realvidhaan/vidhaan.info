import { useState, useEffect, useRef } from "react";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";

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

const blogPosts = [
  {
    id: 1,
    title: "Why I Started Selling My Art",
    date: "April 15, 2026",
    readTime: "3 min read",
    preview:
      "It all started when my teacher hung my drawing on the classroom wall and everyone kept asking if they could have a copy.",
    content: `It all started when my teacher hung my drawing on the classroom wall and everyone kept asking if they could have a copy. I realized people actually liked what I made, and that felt really amazing!

I've been drawing and painting since I was about 6. My mom got me a watercolor set for my birthday and I never stopped. At first I just painted random things — flowers, cats, my dog Biscuit. But then I started experimenting with galaxies and abstract art.

Starting this shop was a big step. I had to learn how to take photos of my art (lighting is SO important), figure out pricing, and write descriptions. My older sister helped me set up the website.

The best part? Knowing that something I made with my own hands is hanging on someone else's wall. That makes all the hard work worth it. If you're thinking about selling your art too — just go for it!`,
  },
  {
    id: 2,
    title: "My Favorite Art Supplies Under $20",
    date: "April 2, 2026",
    readTime: "4 min read",
    preview:
      "You don't need expensive supplies to make great art. Here are the exact tools I use every day that won't break the bank.",
    content: `You don't need to spend a fortune on art supplies! Here are my honest favorites that are actually affordable.

**Watercolors:** The Sakura Koi 24-color pocket set is my go-to. It's only about $15 and the colors are vibrant. I've tried fancier sets but this one travels well and has everything I need.

**Pencils:** A basic set of Staedtler colored pencils works great for sketching. For more detailed work, Prismacolor Premier pencils are worth saving up for.

**Paper:** This is where I don't skimp. Cheap paper can ruin even the best paint. I use Strathmore 400 series watercolor paper for paintings and Bristol board for drawings.

**Brushes:** Craft store brushes work fine when you're starting out. Focus more on paper quality than brushes.

The most important supply? Time and practice. No amount of expensive gear beats sitting down and actually making things.`,
  },
  {
    id: 3,
    title: "Behind the Scenes: How I Make a Greeting Card",
    date: "March 20, 2026",
    readTime: "5 min read",
    preview:
      "From blank paper to finished card — I'm taking you through my whole process, including the mistakes and happy accidents.",
    content: `People always ask how long it takes to make a card. The honest answer: anywhere from 30 minutes to 3 hours depending on the design.

**Step 1: Sketch**
I always start with a light pencil sketch. This is where I figure out composition. I make mistakes here so I don't make them on the final piece.

**Step 2: Ink**
For designs with linework, I use Micron pens in size 0.3 and 0.5. I let the ink dry for at least 10 minutes before erasing pencil lines — learned that the hard way.

**Step 3: Color**
Watercolor first, then colored pencil details on top. I work light to dark, adding layers as things dry.

**Step 4: Finishing Touches**
A white gel pen for highlights, gold paint pen for special details, then I scan or photograph the finished piece.

**Step 5: Print & Cut**
I print on cardstock, score the fold line carefully, and cut with a craft knife for clean edges.

The whole process is really relaxing once you get into a rhythm.`,
  },
];

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Product = (typeof products)[0];
type BlogPost = (typeof blogPosts)[0];
type Page =
  | { name: "landing" }
  | { name: "shop" }
  | { name: "product"; product: Product }
  | { name: "blog" }
  | { name: "blogpost"; post: BlogPost }
  | { name: "checkout"; product: Product; quantity: number };

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

const CartIcon = ({ size = 20 }: { size?: number }) => (
  <svg {...svgBase(size)}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
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

const PlusIcon = ({ size = 14 }: { size?: number }) => (
  <svg {...svgBase(size)} strokeWidth={2}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = ({ size = 14 }: { size?: number }) => (
  <svg {...svgBase(size)} strokeWidth={2}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CheckIcon = ({ size = 56 }: { size?: number }) => (
  <svg {...svgBase(size)} strokeWidth={2}>
    <polyline points="20 6 9 17 4 12" />
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
  cartCount,
  menuOpen,
  setMenuOpen,
}: {
  page: Page;
  navigate: (p: Page) => void;
  cartCount: number;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  const links: { label: string; page: Page }[] = [
    { label: "Index", page: { name: "landing" } },
    { label: "Shop", page: { name: "shop" } },
    { label: "Journal", page: { name: "blog" } },
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
            onClick={() => navigate({ name: "shop" })}
            className="nav-cart"
            aria-label="Cart"
          >
            <CartIcon size={18} />
            <span className="nav-cart-count">[{String(cartCount).padStart(2, "0")}]</span>
          </button>
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
          <span>EST. 2026</span>
          <span className="dot">/</span>
          <span>VIDHAAN.INFO</span>
          <span className="dot">/</span>
          <span>EDITION 001</span>
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
            <button className="btn-ghost" onClick={() => navigate({ name: "blog" })}>
              Read the journal
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
            <Eyebrow>/ 02 — Featured</Eyebrow>
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

      {/* PHILOSOPHY STRIP */}
      <section className="philosophy">
        <Reveal>
          <p className="philosophy-text">
            Each piece is hand-painted, hand-drawn, or hand-illustrated. <em>No prints, no reprints.</em> When you buy something here, you're getting an original — the only one of its kind in the world.
          </p>
        </Reveal>
        <div className="philosophy-stats">
          {[
            { num: "05", label: "Original works" },
            { num: "100%", label: "Hand-made" },
            { num: "11", label: "Years young" },
            { num: "∞", label: "Made with love" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="stat">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* JOURNAL TEASER */}
      <section className="section">
        <div className="section-head">
          <div>
            <Eyebrow>/ 03 — Journal</Eyebrow>
            <h2 className="section-title">From the studio.</h2>
          </div>
          <Reveal>
            <button className="btn-ghost" onClick={() => navigate({ name: "blog" })}>
              All entries <ArrowRight size={14} />
            </button>
          </Reveal>
        </div>

        <div className="journal-list">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 80}>
              <button className="journal-row" onClick={() => navigate({ name: "blogpost", post })}>
                <span className="journal-num">№ {String(i + 1).padStart(2, "0")}</span>
                <div className="journal-content">
                  <h3 className="journal-title">{post.title}</h3>
                  <p className="journal-preview">{post.preview}</p>
                </div>
                <div className="journal-meta">
                  <span>{post.date}</span>
                  <span className="journal-arrow"><ArrowUpRight size={18} /></span>
                </div>
              </button>
            </Reveal>
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
        <Eyebrow>/ Shop — Vol. 01</Eyebrow>
        <h1 className="page-title">
          The <em>collection.</em>
        </h1>
        <p className="page-sub">
          {filtered.length.toString().padStart(2, "0")} original works · No prints, no reprints · Each one one-of-a-kind.
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

// ─── PRODUCT DETAIL ──────────────────────────────────────────────────────────

function ProductDetailPage({ product, navigate }: { product: Product; navigate: (p: Page) => void }) {
  const [quantity, setQuantity] = useState(1);
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

            <div className="qty-row">
              <span className="qty-label">Qty</span>
              <div className="qty-stepper">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><MinusIcon /></button>
                <span>{String(quantity).padStart(2, "0")}</span>
                <button onClick={() => setQuantity(quantity + 1)}><PlusIcon /></button>
              </div>
            </div>

            <button
              className="btn-primary btn-block"
              onClick={() => navigate({ name: "checkout", product, quantity })}
            >
              <span>Buy now — ${product.price * quantity}.00</span>
              <ArrowUpRight size={16} />
            </button>

            <p className="product-note">Free shipping · Secure checkout · Made with care</p>
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

// ─── BLOG ────────────────────────────────────────────────────────────────────

function BlogPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <section className="page-head">
        <div className="hero-grain" />
        <Eyebrow>/ Journal — Vol. 01</Eyebrow>
        <h1 className="page-title">
          Notes from <em>the studio.</em>
        </h1>
        <p className="page-sub">Behind-the-scenes, art tips, and stories about growing up as a young artist.</p>
      </section>

      <section className="section">
        <div className="journal-big">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              <button
                className="journal-big-row"
                onClick={() => navigate({ name: "blogpost", post })}
              >
                <span className="journal-big-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="journal-big-content">
                  <div className="journal-big-meta">
                    <span>{post.date}</span>
                    <span className="dot">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="journal-big-title">{post.title}</h2>
                  <p className="journal-big-preview">{post.preview}</p>
                  <span className="journal-big-cta">Read entry <ArrowUpRight size={16} /></span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer navigate={navigate} />
    </>
  );
}

// ─── BLOG POST ───────────────────────────────────────────────────────────────

function BlogPostPage({ post, navigate }: { post: BlogPost; navigate: (p: Page) => void }) {
  const renderContent = (text: string) =>
    text.split("\n\n").map((para, i) => {
      const parts = para.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
        chunk.startsWith("**") && chunk.endsWith("**") ? (
          <strong key={j}>{chunk.slice(2, -2)}</strong>
        ) : (
          chunk
        )
      );
      return <p key={i} className="post-para">{parts}</p>;
    });

  return (
    <>
      <article className="post">
        <button className="back-link" onClick={() => navigate({ name: "blog" })}>
          <ArrowLeft size={16} /> Back to journal
        </button>

        <div className="post-meta">
          <span>{post.date}</span>
          <span className="dot">·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="post-title">{post.title}</h1>
        <div className="post-divider" />

        <div className="post-body">{renderContent(post.content)}</div>

        <div className="post-cta">
          <p className="post-cta-text">Like what you see?</p>
          <button className="btn-primary" onClick={() => navigate({ name: "shop" })}>
            <span>Browse the collection</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </article>

      <Footer navigate={navigate} />
    </>
  );
}

// ─── CHECKOUT ────────────────────────────────────────────────────────────────

function CheckoutPage({
  product,
  initialQty,
  navigate,
}: {
  product: Product;
  initialQty: number;
  navigate: (p: Page) => void;
}) {
  const [qty, setQty] = useState(initialQty);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const total = product.price * qty;

  if (done) {
    return (
      <section className="success">
        <div className="success-inner">
          <div className="success-mark">
            <CheckIcon size={48} />
          </div>
          <Eyebrow>/ Order confirmed</Eyebrow>
          <h1 className="success-title">Order placed.</h1>
          <p className="success-text">
            Thank you for buying <strong>{product.name}</strong>. This is a demo — no real payment was processed.
          </p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => navigate({ name: "shop" })}>
              <span>Keep shopping</span>
              <ArrowUpRight size={16} />
            </button>
            <button className="btn-ghost" onClick={() => navigate({ name: "landing" })}>
              Back home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <button className="back-link" onClick={() => navigate({ name: "product", product })}>
        <ArrowLeft size={16} /> Back to product
      </button>

      <Eyebrow>/ Checkout</Eyebrow>
      <h1 className="page-title">
        Complete <em>your order.</em>
      </h1>

      <div className="checkout-grid">
        <div className="checkout-form">
          <div className="form-section">
            <h2 className="form-h">/ 01 — Details</h2>
            <div className="form-fields">
              <input
                className="field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
              <input
                className="field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
              <textarea
                className="field"
                placeholder="Shipping address"
                rows={3}
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-h">/ 02 — Payment</h2>
            <div className="card-fake">
              <div className="card-fake-row">
                <span>Stripe</span>
                <span className="card-fake-pill">Secure</span>
              </div>
              <div className="card-fake-num">•••• •••• •••• ••••</div>
              <div className="card-fake-foot">
                <div><span className="card-fake-l">Expiry</span><span>MM / YY</span></div>
                <div><span className="card-fake-l">CVV</span><span>•••</span></div>
              </div>
            </div>
          </div>
        </div>

        <aside className="checkout-summary">
          <h2 className="form-h">/ 03 — Summary</h2>
          <div className="summary-card">
            <div className="summary-product">
              <img src={product.image} alt={product.name} />
              <div className="summary-product-info">
                <Eyebrow>{product.category}</Eyebrow>
                <h3>{product.name}</h3>
                <p className="summary-price">${product.price}.00</p>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Qty</span>
              <div className="qty-stepper compact">
                <button onClick={() => setQty(Math.max(1, qty - 1))}><MinusIcon /></button>
                <span>{String(qty).padStart(2, "0")}</span>
                <button onClick={() => setQty(qty + 1)}><PlusIcon /></button>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-totals">
              <div><span>Subtotal</span><span>${total}.00</span></div>
              <div><span>Shipping</span><span className="free">Free</span></div>
              <div className="total"><span>Total</span><span>${total}.00</span></div>
            </div>

            <button className="btn-primary btn-block" onClick={() => setDone(true)}>
              <span>Pay ${total}.00 with Stripe</span>
              <ArrowUpRight size={16} />
            </button>
            <p className="summary-note">Secure payment · Demo only — no real charge</p>
          </div>
        </aside>
      </div>
    </section>
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
        <span>Edition 001</span>
        <span>All works original</span>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>({ name: "landing" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (p.name === "checkout") setCartCount((c) => c + 1);
  };

  // Re-mount key to trigger page-enter animation
  const pageKey = `${page.name}-${
    page.name === "product" ? page.product.id : page.name === "blogpost" ? page.post.id : ""
  }`;

  return (
    <div className="app">
      <Nav page={page} navigate={navigate} cartCount={cartCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main key={pageKey} className="page-enter">
        {page.name === "landing" && <LandingPage navigate={navigate} />}
        {page.name === "shop" && <ShopPage navigate={navigate} />}
        {page.name === "product" && <ProductDetailPage product={page.product} navigate={navigate} />}
        {page.name === "blog" && <BlogPage navigate={navigate} />}
        {page.name === "blogpost" && <BlogPostPage post={page.post} navigate={navigate} />}
        {page.name === "checkout" && (
          <CheckoutPage product={page.product} initialQty={page.quantity} navigate={navigate} />
        )}
      </main>
    </div>
  );
}
