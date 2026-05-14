import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  Award,
  FileText,
  Landmark,
  Heart,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Eye,
  Target,
  Quote,
  ArrowUp,
} from "lucide-react";

/* ═══════════════════════════════════════════ */
/*              LOTUS SVG                      */
/* ═══════════════════════════════════════════ */
function Lotus({ size = 80, className = "", animated = false }: { size?: number | string; className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={className}>
      <circle cx="60" cy="60" r="52" stroke="#D4A853" strokeWidth="0.4" opacity={0.25}>
        {animated && <animate attributeName="r" values="52;54;52" dur="4s" repeatCount="indefinite" />}
      </circle>
      <circle cx="60" cy="60" r="38" stroke="#D4A853" strokeWidth="0.3" opacity={0.15}>
        {animated && <animate attributeName="r" values="38;36;38" dur="5s" repeatCount="indefinite" />}
      </circle>
      <path d="M60 95 C60 95 36 73 38 50 C40 27 60 18 60 18 C60 18 80 27 82 50 C84 73 60 95 60 95Z" fill="rgba(212,168,83,0.06)" stroke="#D4A853" strokeWidth="0.9" />
      <path d="M60 95 C60 95 20 66 26 42 C32 18 60 27 60 27" fill="none" stroke="#D4A853" strokeWidth="0.6" opacity={0.45} />
      <path d="M60 95 C60 95 100 66 94 42 C88 18 60 27 60 27" fill="none" stroke="#D4A853" strokeWidth="0.6" opacity={0.45} />
      <path d="M60 95 C60 95 12 58 20 36 C28 14 60 30 60 30" fill="none" stroke="#D4A853" strokeWidth="0.4" opacity={0.25} />
      <path d="M60 95 C60 95 108 58 100 36 C92 14 60 30 60 30" fill="none" stroke="#D4A853" strokeWidth="0.4" opacity={0.25} />
      <circle cx="60" cy="52" r="3.5" fill="#D4A853" opacity={0.5}>
        {animated && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />}
      </circle>
    </svg>
  );
}

/* ═══════════════════════════════════════════ */
/*              DIVIDER                        */
/* ═══════════════════════════════════════════ */
function Divider({ width = "w-16" }: { width?: string }) {
  return <div className={`${width} h-px mx-auto`} style={{ background: "linear-gradient(90deg, transparent, #D4A853, transparent)" }} />;
}

/* ═══════════════════════════════════════════ */
/*         SCROLL REVEAL HOOK                  */
/* ═══════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0, y = 30 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : `translateY(${y}px)`, transition: `all 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*              DATA                           */
/* ═══════════════════════════════════════════ */
const activities = [
  { icon: BookOpen, title: "Indian Knowledge Systems and Śāstra Studies", accent: "#D4A853" },
  { icon: Users, title: "Discourses, Satsangs and Activities of Ritual Nature", accent: "#7A8B6F" },
  { icon: GraduationCap, title: "Educational and Research Initiatives", accent: "#C4724E" },
  { icon: Award, title: "Competitive Examinations in Śāstras", accent: "#D4A853" },
  { icon: FileText, title: "Publications and Knowledge Dissemination", accent: "#8B7355" },
  { icon: Landmark, title: "Cultural Preservation and Heritage Activities", accent: "#7A8B6F" },
  { icon: Heart, title: "Community Welfare and Outreach Programs", accent: "#C4724E" },
];

const navLinks = [
  { label: "About", id: "about" },
  { label: "Activities", id: "activities" },
  { label: "Vision & Mission", id: "vision" },
  { label: "Contact", id: "contact" },
];

const emails = [
  { email: "info@navatma.org", label: "General Enquiries" },
  { email: "admin@navatma.org", label: "Administration" },
  { email: "academics@navatma.org", label: "Academic & Research" },
  { email: "events@navatma.org", label: "Publications & Events" },
];

/* ═══════════════════════════════════════════ */
/*              MAIN APP                       */
/* ═══════════════════════════════════════════ */
export default function App() {
  const [intro, setIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);

  /* Intro sequence — auto transitions, no click */
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase(1), 300);
    const t2 = setTimeout(() => setIntroPhase(2), 1000);
    const t3 = setTimeout(() => setIntroPhase(3), 1800);
    const t4 = setTimeout(() => setIntroPhase(4), 2600);
    const t5 = setTimeout(() => setIntro(false), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  useEffect(() => {
    if (intro) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [intro]);

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Intro Overlay ── */
  if (intro) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "#2C1810" }}>
        {/* Ambient glow */}
        <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)", animation: "introGlow 4s ease-in-out infinite" }} />
        <div className="absolute inset-0" style={{ opacity: 0.03, backgroundImage: "radial-gradient(circle, #D4A853 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        <div className="relative z-10 text-center">
          {/* Lotus */}
          <div style={{ opacity: introPhase >= 1 ? 1 : 0, transform: introPhase >= 1 ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)", transition: "all 1s cubic-bezier(0.4,0,0.2,1)" }}>
            <Lotus size={90} className="mx-auto" animated />
          </div>

          {/* Name */}
          <div style={{ opacity: introPhase >= 2 ? 1 : 0, transform: introPhase >= 2 ? "translateY(0)" : "translateY(15px)", transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s", marginTop: "1.8rem" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 300, color: "#FBF7F0", letterSpacing: "0.06em", lineHeight: 1.1 }}>
              NAV<span style={{ color: "#D4A853", fontWeight: 500 }}>Ā</span>TM<span style={{ color: "#D4A853", fontWeight: 500 }}>Ā</span>
            </h1>
          </div>

                    <div style={{ opacity: introPhase >= 3 ? 1 : 0, transition: "opacity 0.6s 0.1s", marginTop: "1.2rem" }}>
              <Divider width="w-14" />
            </div>
          <div style={{ opacity: introPhase >= 3 ? 1 : 0, transform: introPhase >= 3 ? "translateY(0)" : "translateY(10px)", transition: "all 0.7s 0.2s", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#D4A853", fontWeight: 600 }}>
              Preserving Wisdom. Inspiring Generations.
            </p>
          </div>

          {/* Fade out overlay */}
          {introPhase >= 4 && (
            <div className="fixed inset-0 z-20" style={{ background: "#1E120B", animation: "fadeIn 0.8s forwards" }} />
          )}
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Nunito+Sans:wght@300;400;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Nunito Sans', sans-serif; }
          body { background: #2C1810; overflow: hidden; }
          @keyframes introGlow { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity:1; } 50% { transform: translate(-50%,-50%) scale(1.15); opacity:0.5; } }
          @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        `}</style>
      </div>
    );
  }

  /* ── Main Site ── */
  return (
    <div style={{ background: "#1E120B", minHeight: "100vh", animation: "siteReveal 0.8s ease" }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 w-full z-50 transition-all" style={{
        background: scrolled ? "rgba(30,18,11,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,168,83,0.06)" : "1px solid transparent",
        padding: scrolled ? "0.65rem 1.5rem" : "1rem 1.5rem",
        transitionDuration: "0.4s",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="border-none bg-transparent cursor-pointer flex items-center gap-2.5">
            <Lotus size={26} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: "#D4A853", letterSpacing: "0.04em" }}>NAVĀTMĀ</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="bg-transparent border-none cursor-pointer rounded-full transition-all"
                style={{ color: "#F5EDE0", opacity: 0.55, fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, fontWeight: 600, padding: "0.45rem 1rem" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "#D4A853"; e.currentTarget.style.background = "rgba(212,168,83,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.55"; e.currentTarget.style.color = "#F5EDE0"; e.currentTarget.style.background = "transparent"; }}
              >{link.label}</button>
            ))}
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden bg-transparent border-none cursor-pointer" style={{ color: "#D4A853" }}>
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden py-4 flex flex-col gap-3 items-center" style={{ borderTop: "1px solid rgba(212,168,83,0.08)" }}>
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="bg-transparent border-none cursor-pointer"
                style={{ color: "#F5EDE0", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontWeight: 600 }}
              >{l.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden" style={{ padding: "9rem 1.5rem 5rem", background: "linear-gradient(180deg, #2C1810 0%, #231510 50%, #1E120B 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(212,168,83,0.06), transparent 65%)" }} />

        <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Reveal><Lotus size={64} className="mx-auto mb-5 opacity-80" animated /></Reveal>
          <Reveal delay={0.12}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#FBF7F0", letterSpacing: "0.06em" }}>
              NAV<span style={{ color: "#D4A853", fontWeight: 500 }}>Ā</span>TM<span style={{ color: "#D4A853", fontWeight: 500 }}>Ā</span>
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-5" style={{ fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#D4A853", fontWeight: 600 }}>
              Preserving Wisdom. Inspiring Generations.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-4" style={{ fontSize: "0.88rem", color: "#F5EDE0", opacity: 0.4, maxWidth: 420, lineHeight: 1.7, fontWeight: 300, margin: "0 auto" }}>
              A not-for-profit institution dedicated to education, Indian Knowledge Systems, and spiritual heritage.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding: "5.5rem 1.5rem", background: "#FFFCF7", position: "relative" }}>
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.2), transparent)" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Reveal className="text-center">
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4724E", fontWeight: 700, marginBottom: "0.7rem" }}>Who We Are</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 400, color: "#2C1810", lineHeight: 1.3 }}>
              About <em style={{ color: "#C4724E", fontStyle: "italic" }}>NAVĀTMĀ</em>
            </h2>
            <div className="mt-3"><Divider /></div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-center" style={{ fontSize: "1.05rem", lineHeight: 2.1, color: "#7A6B5E", maxWidth: 620, margin: "2rem auto 0" }}>
              NAVĀTMĀ is a not-for-profit institution dedicated to the advancement of education, Indian Knowledge Systems, spiritual and cultural heritage, value-based learning, and societal well-being.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-center" style={{ fontSize: "1.05rem", lineHeight: 2.1, color: "#7A6B5E", maxWidth: 620, margin: "1.2rem auto 0" }}>
              Guided by the spiritual lineage and vision of <strong style={{ color: "#3A2A1F", fontWeight: 600 }}>Srimad Uttaradimathadhisha Paramapoojya 1008 Sri Sri Satyatma Theertha Swamiji</strong>, NAVĀTMĀ seeks to preserve timeless traditions while fostering contemporary learning and holistic development.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ ACTIVITIES ═══ */}
      <section id="activities" className="relative" style={{ padding: "5.5rem 1.5rem", background: "#1E120B" }}>
        <div className="absolute inset-0 opacity-3" style={{ backgroundImage: "radial-gradient(circle, #D4A853 0.5px, transparent 0.5px)", backgroundSize: "40px 40px" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 10 }}>
          <Reveal className="text-center mb-12">
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#F0D48A", fontWeight: 700, marginBottom: "0.7rem" }}>What We Do</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 400, color: "#FBF7F0" }}>
              Our <em style={{ color: "#D4A853", fontStyle: "italic" }}>Activities</em>
            </h2>
            <div className="mt-3"><Divider /></div>
          </Reveal>
          {/* Activities Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem", justifyContent: "center" }}>
            {activities.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="rounded-2xl transition-all cursor-default h-full" style={{ padding: "1.5rem", border: "1px solid rgba(212,168,83,0.08)", background: "rgba(255,255,255,0.015)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${item.accent}50`; e.currentTarget.style.background = `${item.accent}08`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${item.accent}18` }}>
                        <Icon size={20} style={{ color: item.accent }} />
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 500, color: "#F5EDE0", lineHeight: 1.5, paddingTop: "0.15rem" }}>
                        {item.title}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRESIDENT'S MESSAGE ═══ */}
      <section className="relative overflow-hidden" style={{ padding: "5.5rem 1.5rem", background: "linear-gradient(135deg, #4A5D3E 0%, #3a4f2f 50%, #2d3f24 100%)" }}>
        <div className="absolute inset-0 opacity-4" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)" }} />
        <div className="absolute top-6 left-6 opacity-5"><Lotus size={120} /></div>
        <div className="absolute bottom-6 right-6 opacity-5" style={{ transform: "rotate(180deg)" }}><Lotus size={100} /></div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center", position: "relative", zIndex: 10 }}>
          <Reveal>
            <Quote size={32} style={{ color: "rgba(240,212,138,0.25)", margin: "0 auto 1.2rem" }} />
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#F0D48A", fontWeight: 700, marginBottom: "1.8rem" }}>
              Message from the President
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.15rem, 2.3vw, 1.65rem)", color: "#FBF7F0", fontWeight: 300, fontStyle: "italic", lineHeight: 1.9, marginBottom: "2.2rem" }}>
              "Knowledge rooted in dharma and tradition has the power to guide society towards harmony, wisdom, and responsible living. NAVĀTMĀ has been established with the vision of preserving our timeless heritage while nurturing future generations through education, values, and service."
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4" style={{ color: "#F0D48A", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", lineHeight: 1.7 }}>
              Srimad Uttaradimathadhisha Paramapoojya<br />
              <span style={{ fontSize: "0.85rem", letterSpacing: "0.02em" }}>1008 Sri Sri Satyatma Theertha Swamiji</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ VISION & MISSION ═══ */}
      <section id="vision" style={{ padding: "6rem 1.5rem 7rem", background: "#FFFCF7" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Reveal className="text-center mb-16">
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#C4724E", fontWeight: 700, marginBottom: "0.7rem" }}>Our Purpose</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 400, color: "#2C1810" }}>
              Vision <em style={{ color: "#C4724E", fontStyle: "italic" }}>&</em> Mission
            </h2>
            <div className="mt-3"><Divider /></div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", justifyContent: "center" }}>

            {/* Vision Card */}
            <Reveal>
              <div
                className="rounded-2xl h-full relative overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  background: "radial-gradient(ellipse at top left, rgba(212,168,83,0.08) 0%, rgba(44,24,16,0.98) 60%), #2C1810",
                  border: "1px solid rgba(212,168,83,0.12)",
                  borderTop: "3px solid #D4A853",
                  padding: "2.5rem 2rem 2rem",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,168,83,0.15)";
                  e.currentTarget.style.borderTopColor = "#F0D48A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderTopColor = "#D4A853";
                }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04]"><Lotus size={160} /></div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #D4A853, #F0D48A)" }}>
                    <Eye size={24} style={{ color: "#2C1810" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "#FBF7F0" }}>Vision</h3>
                </div>
                <p className="relative z-10" style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "#F5EDE0", opacity: 0.75 }}>
                  To preserve and promote the timeless wisdom of Indian traditions and knowledge systems while fostering education, ethical values, and holistic societal development.
                </p>
              </div>
            </Reveal>

            {/* Mission Card */}
            <Reveal delay={0.15}>
              <div
                className="rounded-2xl h-full relative overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  background: "radial-gradient(ellipse at top left, rgba(122,139,111,0.1) 0%, rgba(44,24,16,0.98) 60%), #2C1810",
                  border: "1px solid rgba(122,139,111,0.15)",
                  borderTop: "3px solid #7A8B6F",
                  padding: "2.5rem 2rem 2rem",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(122,139,111,0.2)";
                  e.currentTarget.style.borderTopColor = "#9AAB8D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderTopColor = "#7A8B6F";
                }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04]" style={{ transform: "rotate(15deg)" }}><Lotus size={160} /></div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #7A8B6F, #4A5D3E)" }}>
                    <Target size={24} style={{ color: "#FBF7F0" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "#FBF7F0" }}>Mission</h3>
                </div>
                <p className="relative z-10" style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "#F5EDE0", opacity: 0.75 }}>
                  To establish and support educational, cultural, spiritual, and research initiatives that integrate traditional wisdom with contemporary learning and contribute to national and societal well-being.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="relative" style={{ padding: "5.5rem 1.5rem", background: "#1E120B" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Reveal className="text-center mb-12">
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase" as const, color: "#F0D48A", fontWeight: 700, marginBottom: "0.7rem" }}>Reach Out</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 400, color: "#FBF7F0" }}>
              Contact <em style={{ color: "#D4A853", fontStyle: "italic" }}>Us</em>
            </h2>
            <div className="mt-3"><Divider /></div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", justifyContent: "center" }}>
            <Reveal>
              <div className="rounded-2xl p-5 md:p-6 h-full" style={{ border: "1px solid rgba(212,168,83,0.08)", background: "rgba(255,255,255,0.015)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,168,83,0.1)" }}>
                    <MapPin size={17} style={{ color: "#D4A853" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#FBF7F0" }}>Address</h3>
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "#F5EDE0", opacity: 0.55, wordBreak: "break-word" }}>
                  NAVĀTMĀ<br />
                  No. 2, Arundhati Gurukulam,<br />
                  Raghavasadanam, Pampa Mahakavi Road,<br />
                  Uttaradi Math Compound,<br />
                  Shankarapuram, Basavanagudi,<br />
                  Bengaluru – 560004
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="rounded-2xl p-5 md:p-6 h-full" style={{ border: "1px solid rgba(212,168,83,0.08)", background: "rgba(255,255,255,0.015)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,168,83,0.1)" }}>
                    <Mail size={17} style={{ color: "#D4A853" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#FBF7F0" }}>Get in Touch</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {emails.map((item, i) => (
                    <div key={i}>
                      <a href={`mailto:${item.email}`} style={{ color: "#F0D48A", fontSize: "0.85rem", textDecoration: "none", transition: "opacity 0.3s", wordBreak: "break-all" }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                      >{item.email}</a>
                      <p style={{ fontSize: "0.65rem", color: "#F5EDE0", opacity: 0.3, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginTop: "2px" }}>{item.label}</p>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-1" style={{ color: "#F5EDE0", opacity: 0.4 }}>
                    <Phone size={13} />
                    <span style={{ fontSize: "0.85rem" }}>+91-XXXXXXXXXX</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#150D07", borderTop: "1px solid rgba(212,168,83,0.04)", padding: "2.5rem 1.5rem 1.8rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <Lotus size={28} className="mx-auto mb-3 opacity-30" />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#D4A853", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "0.7rem" }}>NAVĀTMĀ</p>
          <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "#F5EDE0", opacity: 0.28, maxWidth: 480, margin: "0 auto 1.2rem" }}>
            Rooted in tradition and guided by knowledge, NAVĀTMĀ is dedicated to education, Indian Knowledge Systems, spiritual heritage, and societal well-being.
          </p>
          <div style={{ width: 25, height: "1px", background: "rgba(212,168,83,0.15)", margin: "0 auto 0.8rem" }} />
          <p style={{ fontSize: "0.67rem", color: "#F5EDE0", opacity: 0.15, letterSpacing: "0.08em" }}>© 2026 NAVĀTMĀ. All Rights Reserved.</p>
        </div>
      </footer>

      {/* ═══ BACK TO TOP ═══ */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-none transition-all"
        style={{ background: "rgba(212,168,83,0.85)", color: "#2C1810", opacity: showTop ? 1 : 0, pointerEvents: showTop ? "auto" as const : "none", transform: showTop ? "translateY(0)" : "translateY(10px)", transitionDuration: "0.3s" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#D4A853"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(212,168,83,0.3)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.85)"; e.currentTarget.style.transform = showTop ? "translateY(0)" : "translateY(10px)"; e.currentTarget.style.boxShadow = "none"; }}
      ><ArrowUp size={17} /></button>

      {/* ═══ GLOBAL STYLES ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Nunito+Sans:wght@300;400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Nunito Sans', sans-serif; }
        html { scroll-behavior: smooth; }
        body { background: #1E120B; }
        @keyframes siteReveal { from { opacity: 0; } to { opacity: 1; } }
        ::selection { background: rgba(212,168,83,0.25); color: #FBF7F0; }
      `}</style>
    </div>
  );
}