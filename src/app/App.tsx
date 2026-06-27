import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "motion/react"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  ChevronDown,
  Menu,
  X,
  Send,
  MapPin,
  ArrowUp,
  Terminal,
  Layers,
  Zap,
  GitBranch,
  Award,
  MessageSquare,
  Brain,
  Box,
  Settings,
  Trophy,
  Users,
  BookOpen,
  Globe,
} from "lucide-react"

// ─── Pre-computed static data ─────────────────────────────────────────────────

const CONTRIBUTION_DATA = Array.from({ length: 364 }, (_, i) => {
  const v = (i * 7 + (i % 13) + (i % 31)) % 100
  return v < 45 ? 0 : v < 65 ? 1 : v < 82 ? 2 : v < 94 ? 3 : 4
})

const HERO_DOTS: { top: string; left: string; dur: number; del: number }[] = [
  { top: "18%", left: "12%", dur: 2.8, del: 0 },
  { top: "28%", left: "80%", dur: 3.2, del: 0.4 },
  { top: "62%", left: "16%", dur: 2.5, del: 0.8 },
  { top: "74%", left: "84%", dur: 3.6, del: 0.2 },
  { top: "13%", left: "54%", dur: 2.9, del: 1.0 },
  { top: "84%", left: "47%", dur: 3.1, del: 0.6 },
]

const CONTRIB_COLORS = [
  "bg-white/5",
  "bg-blue-900/70",
  "bg-blue-700/70",
  "bg-blue-500/80",
  "bg-blue-400",
]

// ─── Reusable primitives ──────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Pill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
      <span className="text-blue-400 text-[11px] font-semibold tracking-widest uppercase font-mono">
        {text}
      </span>
    </div>
  )
}

function SectionHead({
  pill,
  title,
  accent,
  subtitle,
}: {
  pill: string
  title: string
  accent: string
  subtitle?: string
}) {
  return (
    <div className="text-center mb-16">
      <Pill text={pill} />
      <h2
        className="text-4xl md:text-5xl font-bold text-white mb-4"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {title}{" "}
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {accent}
        </span>
      </h2>
      {subtitle && (
        <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Typing animation ─────────────────────────────────────────────────────────

const ROLES = [
  "Software Engineer",
  "AI Enthusiast",
  "Blockchain Developer",
  "Full Stack Developer",
  "IoT Builder",
]

function useTyping() {
  const [idx, setIdx] = useState(0)
  const [sub, setSub] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = ROLES[idx]
    if (!del && sub === word.length) {
      const t = setTimeout(() => setDel(true), 2200)
      return () => clearTimeout(t)
    }
    if (del && sub === 0) {
      setDel(false)
      setIdx((p) => (p + 1) % ROLES.length)
      return
    }
    const t = setTimeout(() => setSub((p) => p + (del ? -1 : 1)), del ? 45 : 95)
    return () => clearTimeout(t)
  }, [sub, del, idx])

  return ROLES[idx].substring(0, sub)
}

// ─── Hero illustration ────────────────────────────────────────────────────────

function HeroIllustration() {
  return (
    <div className="relative w-full h-[520px] flex items-center justify-center select-none">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-52 h-52 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* Orbit rings — inline transform handles centering + rotation */}
      <div
        className="absolute rounded-full border border-blue-500/10"
        style={{
          top: "50%",
          left: "50%",
          width: 340,
          height: 340,
          animation: "orbitRing 22s linear infinite",
        }}
      />
      <div
        className="absolute rounded-full border border-purple-500/6"
        style={{
          top: "50%",
          left: "50%",
          width: 430,
          height: 430,
          animation: "orbitRing 36s linear infinite reverse",
        }}
      />

      {/* Central laptop */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Screen */}
        <div
          className="w-60 rounded-xl bg-[#080e20] border border-blue-500/30 shadow-2xl shadow-blue-500/20 overflow-hidden relative"
          style={{ height: 168 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/20" />
          {/* Traffic lights */}
          <div className="absolute top-2.5 left-4 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
            <div className="w-2 h-2 rounded-full bg-green-400/70" />
          </div>
          {/* Code */}
          <div className="p-4 pt-8 font-mono text-[11px] space-y-[5px] relative z-10 leading-none">
            <div>
              <span className="text-purple-400">const </span>
              <span className="text-blue-300">mohit</span>
              <span className="text-white"> = </span>
              <span className="text-yellow-300">{"{"}</span>
            </div>
            <div className="pl-3">
              <span className="text-cyan-300">role</span>
              <span className="text-white">: </span>
              <span className="text-green-300">"Engineer"</span>
              <span className="text-white">,</span>
            </div>
            <div className="pl-3">
              <span className="text-cyan-300">stack</span>
              <span className="text-white">: </span>
              <span className="text-green-300">["AI","Web3","IoT"]</span>
            </div>
            <div className="pl-3">
              <span className="text-cyan-300">status</span>
              <span className="text-white">: </span>
              <span className="text-yellow-300">"building"</span>
            </div>
            <div className="text-yellow-300">{"}"}</div>
            <div className="flex items-center gap-1 mt-2 pt-1 border-t border-white/5">
              <span className="text-[#555]">▶</span>
              <span className="text-green-400">Output: Ready ✓</span>
              <motion.span
                className="inline-block w-[5px] h-3.5 bg-blue-400 ml-0.5"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
        {/* Hinge + base */}
        <div className="w-64 h-2.5 rounded-b-xl bg-[#080e20] border border-blue-500/20 border-t-0" />
        <div className="w-24 h-1 rounded-b bg-[#080e20] border border-blue-500/15 border-t-0" />
      </motion.div>

      {/* Floating card: Blockchain */}
      <motion.div
        className="absolute top-8 right-4 md:right-14 bg-[#0F172A]/90 backdrop-blur-xl border border-purple-500/30 rounded-xl p-3 text-xs shadow-xl shadow-purple-500/10 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-2 h-2 bg-purple-400 rotate-45 rounded-[2px]" />
          <span className="text-purple-300 font-semibold">Blockchain</span>
        </div>
        <div className="text-[#94A3B8] font-mono">0x3f4a…8b2c</div>
        <div className="text-green-400 text-[10px] mt-1">✓ Block confirmed</div>
      </motion.div>

      {/* Floating card: AI */}
      <motion.div
        className="absolute bottom-14 right-2 md:right-12 bg-[#0F172A]/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-3 text-xs shadow-xl shadow-cyan-500/10 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Brain size={11} className="text-cyan-400" />
          <span className="text-cyan-300 font-semibold">AI Model</span>
        </div>
        <div className="flex items-end gap-0.5 mb-1">
          {[12, 18, 10, 20, 15, 22, 14].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-sm bg-cyan-400/70"
              style={{ height: h }}
            />
          ))}
        </div>
        <div className="text-[#94A3B8]">accuracy: 94.2%</div>
      </motion.div>

      {/* Floating card: Full Stack */}
      <motion.div
        className="absolute top-14 left-2 md:left-12 bg-[#0F172A]/90 backdrop-blur-xl border border-blue-500/30 rounded-xl p-3 text-xs shadow-xl shadow-blue-500/10 z-20"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <Globe size={11} className="text-blue-400" />
          <span className="text-blue-300 font-semibold">Full Stack</span>
        </div>
        {(
          [
            ["React", "bg-blue-400", "w-12"],
            ["Node.js", "bg-green-400", "w-9"],
            ["Postgres", "bg-indigo-400", "w-8"],
          ] as [string, string, string][]
        ).map(([label, color, width]) => (
          <div key={label} className="flex items-center gap-1.5 mb-1 last:mb-0">
            <div className={`h-1 ${width} ${color} rounded-full`} />
            <span className="text-[#94A3B8]">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Floating card: IoT */}
      <motion.div
        className="absolute bottom-8 left-2 md:left-14 bg-[#0F172A]/90 backdrop-blur-xl border border-green-500/30 rounded-xl p-3 text-xs shadow-xl shadow-green-500/10 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Zap size={11} className="text-green-400" />
          <span className="text-green-300 font-semibold">IoT / ESP32</span>
        </div>
        <div className="text-[#94A3B8] font-mono text-[10px]">Device online</div>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400">Connected</span>
        </div>
      </motion.div>

      {/* Ambient dots */}
      {HERO_DOTS.map((d, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/50 z-0 pointer-events-none"
          style={{ top: d.top, left: d.left }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.del }}
        />
      ))}
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050816]/85 backdrop-blur-2xl border-b border-white/5 py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          KAKAMOHITSINGH<span className="text-white/40">.</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Hire Me
        </a>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a1020]/98 backdrop-blur-2xl border-t border-white/5 px-6 py-4 space-y-0.5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block py-3 text-[#94A3B8] hover:text-white text-sm border-b border-white/5 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block mt-4 px-4 py-2.5 text-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const typed = useTyping()

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#07092e] to-[#050816]" />
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-blue-700/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-700/6 rounded-full blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-7">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">
                Available for opportunities
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-7xl font-bold leading-[1.06] tracking-tight mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Mohit Kumar Singh
              </span>
            </h1>

            <div
              className="flex items-center text-xl md:text-2xl font-semibold text-[#94A3B8] h-9 mb-8"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="text-blue-400">{typed}</span>
              <motion.span
                className="inline-block w-0.5 h-6 bg-blue-400 ml-0.5"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
              />
            </div>

            <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed max-w-xl mb-9">
              I build modern web applications, blockchain solutions, AI-powered tools, and IoT
              projects that solve real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="flex flex-wrap gap-4 mb-9"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
            >
              View Projects
              <ExternalLink
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3"
          >
            {(
              [
                [Github, "GitHub", "#"],
                [Linkedin, "LinkedIn", "#"],
                [Mail, "Email", "mailto:mohit@example.com"],
                [Code2, "LeetCode", "#"],
              ] as [typeof Github, string, string][]
            ).map(([Icon, label, href]) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroIllustration />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#94A3B8]/50 text-xs hover:text-[#94A3B8] transition-colors"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span>Scroll</span>
        <ChevronDown size={15} />
      </motion.a>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: "2024", label: "Started Programming Journey" },
  { year: "2025", label: "Built Flutter & Firebase Applications" },
  { year: "2026", label: "Mastering Full Stack, AI & Blockchain" },
  { year: "Future", label: "Software Engineer at a Top Tech Company" },
]

function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead
            pill="About Me"
            title="Passionate about"
            accent="building the future"
            subtitle="B.Tech IT student with a drive for innovation, problem-solving, and cross-domain engineering"
          />
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FadeUp delay={0.1}>
            <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-8 space-y-5 h-full">
              {(
                [
                  [
                    BookOpen,
                    "B.Tech Information Technology — Rajkiya Engineering College, Mainpuri (2024–2028)",
                  ],
                  [Brain, "Passionate about AI, Blockchain, Web Development, and IoT"],
                  [Zap, "Love solving complex engineering problems with elegant, efficient code"],
                  [Trophy, "Active in startups, hackathons, and open-source communities"],
                  [MapPin, "Based in Aligarh, Uttar Pradesh, India"],
                ] as [typeof BookOpen, string][]
              ).map(([Icon, text]) => (
                <div key={text} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <p className="text-[#94A3B8] text-sm leading-relaxed pt-1.5">{text}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-8">
              <h3
                className="text-lg font-semibold text-white mb-8"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                My Journey
              </h3>
              <div>
                {TIMELINE.map((item, i) => (
                  <div key={item.year} className="flex gap-5 relative pb-7 last:pb-0">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold">
                        {item.year === "Future" ? "✦" : item.year.slice(2)}
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-blue-500/40 to-transparent mt-1.5" />
                      )}
                    </div>
                    <div className="pt-1.5">
                      <div className="text-[10px] text-blue-400 font-mono font-semibold tracking-wider mb-1">
                        {item.year}
                      </div>
                      <p className="text-white text-sm font-medium leading-snug">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const STACK = [
  {
    name: "Languages",
    Icon: Code2,
    hue: "blue",
    items: ["Python", "C", "HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    name: "Frontend",
    Icon: Globe,
    hue: "cyan",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    Icon: Layers,
    hue: "purple",
    items: ["Node.js", "Express", "Prisma", "PostgreSQL", "Firebase", "REST API"],
  },
  {
    name: "AI / ML",
    Icon: Brain,
    hue: "pink",
    items: ["OpenAI APIs", "Prompt Engineering", "Python", "Automation"],
  },
  {
    name: "Blockchain",
    Icon: Box,
    hue: "orange",
    items: ["Solidity", "Web3.js", "Ethers.js", "Hardhat", "Smart Contracts"],
  },
  {
    name: "Tools",
    Icon: Settings,
    hue: "green",
    items: ["Git", "GitHub", "Docker", "VS Code", "Figma", "Postman", "Linux"],
  },
]

const STACK_HUE: Record<string, { card: string; icon: string; badge: string }> = {
  blue: {
    card: "border-blue-500/15 hover:border-blue-500/30",
    icon: "bg-blue-500/10 text-blue-400",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  cyan: {
    card: "border-cyan-500/15 hover:border-cyan-500/30",
    icon: "bg-cyan-500/10 text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  purple: {
    card: "border-purple-500/15 hover:border-purple-500/30",
    icon: "bg-purple-500/10 text-purple-400",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  pink: {
    card: "border-pink-500/15 hover:border-pink-500/30",
    icon: "bg-pink-500/10 text-pink-400",
    badge: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  },
  orange: {
    card: "border-orange-500/15 hover:border-orange-500/30",
    icon: "bg-orange-500/10 text-orange-400",
    badge: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  },
  green: {
    card: "border-green-500/15 hover:border-green-500/30",
    icon: "bg-green-500/10 text-green-400",
    badge: "bg-green-500/10 text-green-300 border-green-500/20",
  },
}

function TechStack() {
  return (
    <section id="stack" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/4 via-transparent to-purple-600/4 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead
            pill="Tech Stack"
            title="Technologies I"
            accent="Work With"
            subtitle="A curated toolkit for building modern, scalable, and intelligent applications"
          />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK.map(({ name, Icon, hue, items }, i) => {
            const c = STACK_HUE[hue]
            return (
              <FadeUp key={name} delay={i * 0.09}>
                <div
                  className={`bg-[#0F172A] border ${c.card} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/30`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.icon}`}
                    >
                      <Icon size={16} />
                    </div>
                    <h3
                      className="font-semibold text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${c.badge}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "DropsFI",
    subtitle: "Crypto + Web3 Platform",
    desc: "A comprehensive cryptocurrency and Web3 platform with real-time portfolio tracking, DeFi integration, Telegram bots, and multi-chain analytics dashboard.",
    tags: ["React", "Web3.js", "Node.js", "PostgreSQL", "JWT"],
    features: ["Dashboard", "Portfolio Tracking", "Telegram Bot", "Analytics", "Auth"],
    hue: "blue",
    status: "Live",
    mono: "DF",
  },
  {
    title: "Kaka Helper",
    subtitle: "Smart Campus Utility App",
    desc: "A Flutter-based smart campus app featuring digital wallet payments, QR code scanning, menu management, admin dashboard, and real-time push notifications.",
    tags: ["Flutter", "Firebase", "Dart", "QR Payments", "Notifications"],
    features: ["Wallet", "QR Payments", "Menu Mgmt", "Admin Panel", "Bookings"],
    hue: "purple",
    status: "Production",
    mono: "KH",
  },
  {
    title: "Smart WiFi Car",
    subtitle: "IoT & Embedded Systems",
    desc: "ESP32-powered remotely controlled smart car with real-time WiFi control, custom web interface, PWM speed management, and live sensor feedback.",
    tags: ["ESP32", "C++", "WiFi", "PWM", "Motor Driver"],
    features: ["WiFi Control", "PWM Speed", "Real-time", "Web Interface", "Sensors"],
    hue: "green",
    status: "Built",
    mono: "SW",
  },
  {
    title: "AI Assistant",
    subtitle: "Modern AI-Powered Tool",
    desc: "Intelligent conversational assistant with context-aware responses, advanced prompt engineering, multi-turn memory, and workflow automation capabilities.",
    tags: ["React", "OpenAI API", "Node.js", "Prompt Eng."],
    features: ["Chat UI", "Context Memory", "Automation", "Multi-modal", "History"],
    hue: "cyan",
    status: "In Dev",
    mono: "AI",
  },
]

const PROJ_HUE: Record<
  string,
  { border: string; header: string; status: string; dot: string; tag: string; btn: string }
> = {
  blue: {
    border: "border-blue-500/20 hover:border-blue-500/40",
    header: "from-blue-950/80 to-blue-900/30",
    status: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400",
    tag: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    btn: "from-blue-600 to-blue-700",
  },
  purple: {
    border: "border-purple-500/20 hover:border-purple-500/40",
    header: "from-purple-950/80 to-purple-900/30",
    status: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    dot: "bg-purple-400",
    tag: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    btn: "from-purple-600 to-purple-700",
  },
  green: {
    border: "border-green-500/20 hover:border-green-500/40",
    header: "from-green-950/80 to-teal-900/30",
    status: "text-green-400 bg-green-500/10 border-green-500/20",
    dot: "bg-green-400",
    tag: "bg-green-500/10 text-green-300 border-green-500/20",
    btn: "from-green-600 to-teal-600",
  },
  cyan: {
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    header: "from-cyan-950/80 to-blue-900/30",
    status: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    dot: "bg-cyan-400",
    tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    btn: "from-cyan-600 to-blue-600",
  },
}

function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead
            pill="Projects"
            title="Featured"
            accent="Work"
            subtitle="A selection of projects showcasing capabilities across multiple domains"
          />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => {
            const c = PROJ_HUE[p.hue]
            return (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div
                  className={`group bg-[#0F172A] border ${c.border} rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/40`}
                >
                  {/* Card header */}
                  <div
                    className={`relative h-36 bg-gradient-to-br ${c.header} flex items-center justify-center overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 60%)",
                      }}
                    />
                    {/* Grid lines */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />
                    <span
                      className="text-7xl font-black text-white/[0.06] tracking-tighter select-none relative z-10"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {p.mono}
                    </span>
                    <div
                      className={`absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${c.status}`}
                    >
                      {p.status}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3
                      className="text-lg font-bold text-white mb-0.5"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mb-3">{p.subtitle}</p>
                    <p className="text-sm text-[#94A3B8]/80 leading-relaxed mb-4">{p.desc}</p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                      {p.features.map((f) => (
                        <div key={f} className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                          <div className={`w-1 h-1 rounded-full ${c.dot}`} />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${c.tag}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/8 transition-colors">
                        <Github size={13} />
                        Code
                      </button>
                      <button
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r ${c.btn} text-sm text-white hover:opacity-90 transition-opacity`}
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </button>
                    </div>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────

const SKILLS_DATA = [
  { name: "Problem Solving", pct: 88, color: "#3B82F6" },
  { name: "Full Stack Development", pct: 82, color: "#8B5CF6" },
  { name: "Backend Engineering", pct: 78, color: "#06B6D4" },
  { name: "UI / UX Design", pct: 70, color: "#EC4899" },
  { name: "Blockchain / Web3", pct: 75, color: "#F59E0B" },
  { name: "AI & Prompt Engineering", pct: 80, color: "#22C55E" },
  { name: "Communication", pct: 85, color: "#6366F1" },
]

function Bar({ s, i }: { s: (typeof SKILLS_DATA)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-white">{s.name}</span>
        <span className="text-xs text-[#94A3B8] font-mono">{s.pct}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}50` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${s.pct}%` } : {}}
          transition={{ duration: 1.3, delay: i * 0.08, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead
            pill="Skills"
            title="My"
            accent="Expertise"
            subtitle="A breakdown of technical proficiency across key domains"
          />
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FadeUp delay={0.1}>
            <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-8">
              <h3
                className="text-sm font-semibold text-white mb-6"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Proficiency Overview
              </h3>
              {SKILLS_DATA.map((s, i) => (
                <Bar key={s.name} s={s} i={i} />
              ))}
            </div>
          </FadeUp>

          <div className="space-y-5">
            <FadeUp delay={0.15}>
              <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-6">
                <h3
                  className="text-sm font-semibold text-white mb-3"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Learning Philosophy
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-2.5">
                  Building with purpose — every project is an opportunity to solve a real problem
                  and push technical limits.
                </p>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Exploring the intersection of AI, blockchain, and full-stack to create
                  comprehensive, impactful solutions.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.22}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "15+", l: "Projects Built", col: "text-blue-400" },
                  { v: "200+", l: "Problems Solved", col: "text-purple-400" },
                  { v: "30+", l: "GitHub Repos", col: "text-cyan-400" },
                  { v: "5+", l: "Hackathons", col: "text-green-400" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="bg-[#0F172A] border border-white/5 rounded-xl p-5 text-center hover:border-white/10 transition-colors"
                  >
                    <div
                      className={`text-2xl font-bold mb-1 ${s.col}`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {s.v}
                    </div>
                    <div className="text-xs text-[#94A3B8]">{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────

const EXP = [
  {
    icon: "🌐",
    title: "Open Source Contributions",
    role: "Community Developer",
    period: "2025 — Present",
    desc: "Contributing to open-source projects: filing issues, submitting PRs, adding features, and improving documentation across the ecosystem.",
  },
  {
    icon: "🏗️",
    title: "Personal Projects",
    role: "Independent Builder",
    period: "2024 — Present",
    desc: "Designing and building full-stack applications, blockchain DApps, AI-powered tools, and IoT systems completely from scratch.",
  },
  {
    icon: "⚡",
    title: "Hackathons & Competitions",
    role: "Competitive Engineer",
    period: "2025 — Present",
    desc: "Competing in hackathons and coding challenges, delivering complete working products under extreme time pressure with cross-functional teams.",
  },
  {
    icon: "📚",
    title: "Continuous Learning",
    role: "Self-directed",
    period: "2024 — Present",
    desc: "Pursuing deep knowledge in CS fundamentals, system design, and emerging technologies through courses, papers, and hands-on experimentation.",
  },
]

function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead pill="Experience" title="My" accent="Journey" />
        </FadeUp>

        <div className="max-w-3xl mx-auto">
          {EXP.map((e, i) => (
            <FadeUp key={e.title} delay={i * 0.1}>
              <div className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-white/8 flex items-center justify-center text-xl">
                    {e.icon}
                  </div>
                  {i < EXP.length - 1 && (
                    <div className="w-px flex-1 mt-2 bg-gradient-to-b from-white/10 to-transparent" />
                  )}
                </div>
                <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-5 flex-1 hover:border-white/10 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <h3
                        className="font-semibold text-white text-sm"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {e.title}
                      </h3>
                      <p className="text-xs text-blue-400">{e.role}</p>
                    </div>
                    <span className="text-xs text-[#94A3B8] font-mono bg-white/5 px-2 py-1 rounded-md">
                      {e.period}
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── GitHub Stats ─────────────────────────────────────────────────────────────

function GitHubStats() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/4 via-transparent to-purple-600/4 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead
            pill="GitHub"
            title="Coding"
            accent="Activity"
            subtitle="Metrics and insights from my development activity"
          />
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {(
            [
              [GitBranch, "Repositories", "30+", "blue"],
              [Zap, "Contributions", "500+", "purple"],
              [Terminal, "Coding Hours", "1,200+", "cyan"],
              [Code2, "Languages", "8+", "green"],
            ] as [typeof GitBranch, string, string, string][]
          ).map(([Icon, label, value, hue]) => {
            const iconCls = {
              blue: "bg-blue-500/10 text-blue-400",
              purple: "bg-purple-500/10 text-purple-400",
              cyan: "bg-cyan-500/10 text-cyan-400",
              green: "bg-green-500/10 text-green-400",
            }[hue]!
            const textCls = {
              blue: "text-blue-400",
              purple: "text-purple-400",
              cyan: "text-cyan-400",
              green: "text-green-400",
            }[hue]!
            return (
              <FadeUp key={label} delay={0.08}>
                <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-6 text-center hover:border-white/10 transition-colors">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 ${iconCls}`}
                  >
                    <Icon size={19} />
                  </div>
                  <div
                    className={`text-3xl font-bold mb-1 ${textCls}`}
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs text-[#94A3B8]">{label}</div>
                </div>
              </FadeUp>
            )
          })}
        </div>

        {/* Contribution graph */}
        <FadeUp delay={0.2}>
          <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-7 overflow-hidden">
            <p className="text-xs text-[#94A3B8] font-mono mb-5">
              Contribution graph — 2025 · 364 days
            </p>
            <div className="overflow-x-auto">
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "repeat(7, 12px)",
                  gridAutoFlow: "column",
                  gap: "3px",
                  width: "max-content",
                }}
              >
                {CONTRIBUTION_DATA.map((level, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-[2px] ${CONTRIB_COLORS[level]}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4">
              <span className="text-[11px] text-[#94A3B8]">Less</span>
              {CONTRIB_COLORS.map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-[2px] ${c}`} />
              ))}
              <span className="text-[11px] text-[#94A3B8]">More</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Certifications ───────────────────────────────────────────────────────────

const CERTS = [
  { icon: "⛓️", title: "Blockchain Fundamentals", issuer: "Coursera", year: "2025" },
  { icon: "🤖", title: "AI & Machine Learning", issuer: "Google", year: "2025" },
  { icon: "🐍", title: "Python for Everybody", issuer: "University of Michigan", year: "2025" },
  { icon: "☁️", title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2026" },
  { icon: "🌐", title: "Web Development Bootcamp", issuer: "Udemy", year: "2025" },
  { icon: "📜", title: "Solidity & Smart Contracts", issuer: "Alchemy University", year: "2026" },
]

function Certifications() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead pill="Certifications" title="Credentials &" accent="Learning" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.08}>
              <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-5 flex items-start gap-4 hover:border-blue-500/20 hover:scale-[1.02] transition-all duration-300">
                <div className="text-3xl leading-none">{c.icon}</div>
                <div>
                  <h3
                    className="font-semibold text-white text-sm mb-1"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mb-2">{c.issuer}</p>
                  <div className="flex items-center gap-1.5">
                    <Award size={11} className="text-blue-400" />
                    <span className="text-xs text-blue-400 font-mono">{c.year}</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Achievements ─────────────────────────────────────────────────────────────

const ACH_DATA = [
  { v: "200+", l: "Problems Solved", Icon: Terminal, hue: "blue" },
  { v: "15+", l: "Projects Built", Icon: Layers, hue: "purple" },
  { v: "30+", l: "GitHub Repos", Icon: GitBranch, hue: "cyan" },
  { v: "5+", l: "Hackathons", Icon: Trophy, hue: "yellow" },
  { v: "20+", l: "Open Source PRs", Icon: Users, hue: "green" },
  { v: "25+", l: "Technologies", Icon: BookOpen, hue: "pink" },
]

const ACH_CLR: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  purple: "bg-purple-500/10 text-purple-400",
  cyan: "bg-cyan-500/10 text-cyan-400",
  yellow: "bg-yellow-500/10 text-yellow-400",
  green: "bg-green-500/10 text-green-400",
  pink: "bg-pink-500/10 text-pink-400",
}
const ACH_TXT: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
  yellow: "text-yellow-400",
  green: "text-green-400",
  pink: "text-pink-400",
}

function Achievements() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 via-transparent to-purple-600/3 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead pill="Achievements" title="Numbers That" accent="Matter" />
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {ACH_DATA.map(({ v, l, Icon, hue }, i) => (
            <FadeUp key={l} delay={i * 0.07}>
              <div className="bg-[#0F172A] border border-white/5 rounded-2xl p-5 text-center hover:border-white/10 hover:scale-105 transition-all duration-300">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${ACH_CLR[hue]}`}
                >
                  <Icon size={17} />
                </div>
                <div
                  className={`text-2xl font-bold mb-1 ${ACH_TXT[hue]}`}
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {v}
                </div>
                <div className="text-xs text-[#94A3B8] leading-tight">{l}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "Mohit consistently brings both technical depth and creative thinking to every project. His ability to bridge frontend, backend, and blockchain domains is remarkable for someone early in their career.",
    name: "Prof. Anil Sharma",
    role: "HOD, IT Dept — REC Mainpuri",
    init: "AS",
  },
  {
    quote:
      "Working with Mohit on our hackathon project was incredible. He delivered a complete full-stack solution in 24 hours with clean code and thoughtful architectural decisions.",
    name: "Rahul Verma",
    role: "Teammate & Fellow Developer",
    init: "RV",
  },
  {
    quote:
      "His passion for learning new technologies and applying them practically sets him apart. From IoT to AI to Web3, Mohit always dives deep and ships real, working things.",
    name: "Priya Sinha",
    role: "Open Source Collaborator",
    init: "PS",
  },
]

function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <SectionHead pill="Testimonials" title="What People" accent="Say" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.11}>
              <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                <MessageSquare size={22} className="text-blue-400/40 mb-4 flex-shrink-0" />
                <p className="text-[#94A3B8] text-sm leading-relaxed italic flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.init}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-[#94A3B8]">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  const inputCls =
    "w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-[#94A3B8]/40 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/6 via-transparent to-purple-900/6 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <SectionHead
            pill="Contact"
            title="Let's Build Something"
            accent="Amazing Together"
            subtitle="Open for internships, collaborations, freelance projects, and exciting opportunities"
          />
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              <p className="text-[#94A3B8] leading-relaxed">
                Whether you&apos;re a startup, an established company, or a fellow developer with an
                exciting idea — I&apos;d love to hear from you. Let&apos;s create something
                extraordinary together.
              </p>

              {(
                [
                  [Mail, "Email", "KAKAMOHITSINGH@GMAIL.COM", "mailto:kakamohitsingh@gmail.com"],
                  [Linkedin, "LinkedIn", "linkedin.com/in/kakamohitsingh", "#"],
                  [Github, "GitHub", "github.com/kakamohitsingh", "#"],
                  [MapPin, "Location", "Aligarh, Uttar Pradesh, India", null],
                ] as [typeof Mail, string, string, string | null][]
              ).map(([Icon, label, value, href]) => (
                <div key={label} className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8] mb-0.5">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-white hover:text-blue-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm text-white">{value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* CTA badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {["Open to Internships", "Remote Friendly", "Hackathon Ready"].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.18}>
            <form onSubmit={submit} className="bg-[#0F172A] border border-white/5 rounded-2xl p-8 space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#94A3B8] mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  required
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#94A3B8] mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#94A3B8] mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project or idea…"
                  rows={5}
                  required
                  className={`${inputCls} resize-none`}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                whileTap={{ scale: 0.97 }}
              >
                {sent ? (
                  <>
                    <span className="text-green-300">✓</span> Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 mb-9">
          <div>
            <div
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              KAKAMOHITSINGH.
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
              B.Tech IT Student building the future of software, one commit at a time.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <div className="space-y-2.5">
              {["About", "Projects", "Skills", "Contact"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="block text-sm text-[#94A3B8] hover:text-white transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {([Github, Linkedin, Mail, Code2] as typeof Github[]).map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7 border-t border-white/5">
          <p className="text-xs text-[#94A3B8]">
            © 2026 Mohit Kumar Singh. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
          >
            <ArrowUp size={13} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  return (
    <div
      className="min-h-screen bg-[#050816] text-white overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <style>{`
        @keyframes orbitRing {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 9999px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.5); }
        html { scroll-behavior: smooth; }
      `}</style>

      <Nav />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Skills />
      <Experience />
      <GitHubStats />
      <Certifications />
      <Achievements />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
