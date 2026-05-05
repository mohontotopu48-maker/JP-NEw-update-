'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  ChevronDown,
  Play,
  Shield,
  ClipboardCheck,
  Hammer,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Menu,
  X,
  Star,
  Home,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Palette,
  BookOpen,
  Clock,
  ThumbsUp,
  Eye,
} from 'lucide-react'

/* ── colour tokens ── */
const OCEAN = '#0A2540'
const TEAL = '#00C9A7'
const TEAL_GLOW = '0 0 24px rgba(0,201,167,.45)'

/* ── animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ════════════════════════════════════════════════════════════════
   1. HEADER
   ════════════════════════════════════════════════════════════════ */
function Header() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Residential')
  const [scrolled, setScrolled] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = ['Residential', 'Commercial', 'Blog', 'Guides']

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
      style={{ background: OCEAN }}
    >
      {/* Top contact strip — hides on scroll */}
      <div className={`hidden md:flex items-center justify-end max-w-7xl mx-auto px-6 text-sm text-white/70 gap-4 transition-all duration-300 overflow-hidden ${scrolled ? 'h-0 py-0' : 'h-8 py-1.5'}`}>
        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          Serving the OC Coast
        </span>
        <span className="text-white/40">|</span>
        <a href="tel:7149367013" className="flex items-center gap-1.5 font-semibold text-white hover:text-[#00C9A7] transition-colors">
          <Phone size={14} />
          714-936-7013
        </a>
      </div>

      {/* Main nav row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300" style={{ height: scrolled ? '60px' : '72px' }}>
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img src="/jp-logo.png" alt="JP Stucco Repair" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-bold text-lg leading-none">JP Stucco</span>
            <span className="block text-[#00C9A7] text-xs font-medium tracking-wider uppercase">Repair</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveLink(link)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeLink === link
                  ? 'text-[#00C9A7]'
                  : 'text-white/80 hover:text-white'
              }`}
              style={activeLink === link ? { textShadow: TEAL_GLOW } : undefined}
            >
              {link}
            </button>
          ))}

          {/* Services dropdown */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => { setServicesOpen(!servicesOpen); setActiveLink('Services') }}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeLink === 'Services' && !servicesOpen
                  ? 'text-[#00C9A7]'
                  : 'text-white/80 hover:text-white'
              }`}
              style={activeLink === 'Services' ? { textShadow: TEAL_GLOW } : undefined}
            >
              Services
              <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-56 rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
                >
                  {['Stucco Repair', 'Stucco Patches', 'Weep Screed Repair', 'Smooth Stucco'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00C9A7] transition-colors"
                    >
                      <CheckCircle2 size={14} className="text-[#00C9A7]" />
                      {item}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTA cluster */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:7149367013" className="text-white font-bold text-sm flex items-center gap-1.5">
            <Phone size={15} />
            714-936-7013
          </a>
          <a
            href="#"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
            style={{ background: TEAL }}
          >
            Get Free Assessment
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-white/10"
            style={{ background: OCEAN }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => { setActiveLink(link); setMobileOpen(false) }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeLink === link ? 'text-[#00C9A7] bg-white/5' : 'text-white/80'
                  }`}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => setActiveLink('Services')}
                className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-white/80"
              >
                Services ▾
              </button>
              {['Stucco Repair', 'Stucco Patches', 'Weep Screed Repair', 'Smooth Stucco'].map((s) => (
                <a key={s} href="#" className="block pl-8 py-2 text-sm text-white/60 hover:text-[#00C9A7]">{s}</a>
              ))}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <a href="tel:7149367013" className="flex items-center gap-2 text-white font-bold text-sm px-4">
                  <Phone size={15} /> 714-936-7013
                </a>
                <a
                  href="#"
                  className="block text-center px-5 py-3 rounded-full text-sm font-semibold text-white"
                  style={{ background: TEAL }}
                >
                  Get Free Assessment
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ════════════════════════════════════════════════════════════════
   2. HERO SECTION
   ════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-white overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00C9A7]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#0A2540]/5 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div>
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0A2540]/5 text-[#0A2540] mb-6">
                <Star size={14} className="text-[#00C9A7]" />
                5.0★ Google Rating · 3,500+ Homes
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
              <span style={{ color: OCEAN }}>Orange County&apos;s</span>
              <br />
              <span style={{ color: TEAL }}>Most Referred Stucco Pro.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Permanent, high-end stucco restoration for the OC Coast. We identify the root cause
              to ensure your home is protected for the long haul.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
                style={{ background: TEAL }}
              >
                Get Your Free Assessment
                <ArrowRight size={16} />
              </a>
              <a
                href="tel:7149367013"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:bg-[#0A2540] hover:text-white hover:border-[#0A2540]"
                style={{ color: OCEAN, borderColor: OCEAN }}
              >
                <Phone size={16} />
                714-936-7013
              </a>
            </motion.div>

            {/* Metrics */}
            <motion.div {...fadeUp(0.4)} className="mt-10 flex flex-wrap gap-8">
              {[
                { value: '3,500+', label: 'Homes Repaired', icon: <Home size={16} className="text-[#00C9A7]" /> },
                { value: '5.0★', label: 'Google Rating', icon: <Star size={16} className="text-[#00C9A7]" /> },
                { value: '100%', label: 'Root Cause Fix', icon: <Shield size={16} className="text-[#00C9A7]" /> },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#00C9A7]/10 flex items-center justify-center">
                    {m.icon}
                  </div>
                  <div>
                    <div className="text-xl font-extrabold" style={{ color: TEAL }}>{m.value}</div>
                    <div className="text-xs text-gray-500">{m.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — hero image with play button */}
          <motion.div {...fadeUp(0.15)} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/hero-home.png"
                alt="Beautiful Mediterranean stucco home on the Orange County coast"
                className="w-full h-auto object-cover aspect-[16/9] group-hover:scale-[1.03] transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Play button */}
              <button
                className="absolute inset-0 flex items-center justify-center group/play"
                aria-label="Play video testimonial"
              >
                <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover/play:scale-110 group-hover/play:shadow-[0_0_40px_rgba(0,201,167,.5)]">
                  <Play size={28} className="text-[#00C9A7] ml-1" fill="#00C9A7" />
                </span>
              </button>
            </div>

            {/* Floating badge — permanent fix */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-4 -right-2 sm:right-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${TEAL}15` }}>
                <Shield size={20} style={{ color: TEAL }} />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: OCEAN }}>Permanent Fix</div>
                <div className="text-xs text-gray-500">Root Cause Method</div>
              </div>
            </motion.div>

            {/* Floating badge — video */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-4 -left-2 sm:left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50">
                <Play size={18} className="text-red-500" />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: OCEAN }}>Watch Video</div>
                <div className="text-xs text-gray-500">Homeowner Stories</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   SOCIAL PROOF BAR
   ════════════════════════════════════════════════════════════════ */
function SocialProofBar() {
  const stats = [
    { icon: <Home size={20} />, value: '3,500+', label: 'Homes Repaired' },
    { icon: <Star size={20} />, value: '5.0★', label: 'Google Rating' },
    { icon: <Clock size={20} />, value: '20+ Years', label: 'OC Experience' },
    { icon: <ThumbsUp size={20} />, value: '100%', label: 'Satisfaction' },
  ]

  return (
    <section className="py-8 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(i * 0.08)}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${TEAL}10`, color: TEAL }}>
                {s.icon}
              </div>
              <div>
                <div className="text-lg font-extrabold" style={{ color: OCEAN }}>{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   3. HIDDEN DANGER SECTION
   ════════════════════════════════════════════════════════════════ */
function HiddenDanger() {
  const dangerPoints = [
    {
      icon: <AlertTriangle size={24} className="text-red-500" />,
      title: 'Destroyed Paper Barrier',
      copy: 'Behind your stucco sits a paper moisture barrier — and it\'s shredding. Years of coastal humidity and rain seep through tiny cracks, causing the paper to deteriorate, tear, and literally disintegrate. Once the paper goes, your home\'s first line of defense is gone.',
    },
    {
      icon: <AlertTriangle size={24} className="text-amber-500" />,
      title: 'Toxic Mold on Your Studs',
      copy: 'When moisture breaches the barrier, black mold blooms across the wood studs inside your walls. It spreads silently — you won\'t see it, but your family breathes it. Mold remediation alone can cost tens of thousands, and it keeps coming back until the stucco is fixed right.',
    },
    {
      icon: <AlertTriangle size={24} className="text-orange-500" />,
      title: 'The Insurance Denial Trap',
      copy: 'Here\'s what most homeowners don\'t know: long-term neglect and gradual deterioration are standard exclusion clauses in nearly every homeowner\'s policy. The longer you wait, the more likely your claim gets denied — and you\'re left holding the entire bill.',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-gray-50/80 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-500/[0.03] blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: OCEAN }}>
            Destroyed Paper. Toxic Mold.
            <br />
            <span className="text-red-500">Hiding Behind Your Stucco.</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            What you can&apos;t see will hurt you — and your wallet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {dangerPoints.map((pt, i) => (
            <motion.div
              key={pt.title}
              {...fadeUp(i * 0.12)}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {pt.icon}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: OCEAN }}>{pt.title}</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">{pt.copy}</p>
            </motion.div>
          ))}
        </div>

        {/* Damage visual */}
        <motion.div {...fadeUp(0.3)} className="mt-14 rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto relative group">
          <img
            src="/stucco-damage.png"
            alt="Hidden water damage and mold behind stucco walls"
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 text-white">
              <Eye size={18} className="text-[#00C9A7]" />
              <span className="text-sm font-medium">See what&apos;s really behind your walls</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Bar */}
        <motion.div {...fadeUp(0.4)}>
          <div
            className="mt-14 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{ background: OCEAN }}
          >
            <div className="text-white text-center sm:text-left">
              <span className="text-lg sm:text-xl font-bold">Find Out How Bad It Really Is</span>
              <p className="text-white/60 text-sm mt-1">No obligation. No pressure. Just the truth about your stucco.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#"
                className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)] whitespace-nowrap"
                style={{ background: TEAL }}
              >
                See What&apos;s Wrong — Free
              </a>
              <a href="tel:7149367013" className="text-white font-bold text-sm flex items-center gap-1.5 whitespace-nowrap hover:text-[#00C9A7] transition-colors">
                <Phone size={15} />
                714-936-7013
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   4. HOW IT WORKS — 3-STEP PROCESS
   ════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <ClipboardCheck size={28} />,
      title: 'Free Walkthrough',
      copy: 'Send a photo or schedule an onsite walkthrough. We identify the root cause — not just the symptoms — so you know exactly what you\'re dealing with.',
      accent: TEAL,
    },
    {
      num: '02',
      icon: <Shield size={28} />,
      title: 'Get Your Estimate',
      copy: 'Receive a detailed, fixed-price estimate with zero hidden fees. You\'ll know the full scope, timeline, and cost before we start. No surprises.',
      accent: OCEAN,
    },
    {
      num: '03',
      icon: <Hammer size={28} />,
      title: 'We Get It Done',
      copy: 'On-time completion. Fast, clean, and built to last. Every project backed by our commitment to permanent results that protect your home for decades.',
      accent: TEAL,
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00C9A7]/[0.04] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ background: `${TEAL}10`, color: TEAL }}>
            <Home size={14} />
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold" style={{ color: OCEAN }}>
            How It Works.
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Three steps to a permanent stucco fix. No runaround. No guesswork.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-[#00C9A7]/30 via-[#0A2540]/30 to-[#00C9A7]/30" style={{ maskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)' }} />
          </div>

          {steps.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.15)} className="relative text-center group">
              <div
                className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl relative z-10"
                style={{ background: step.accent }}
              >
                <span className="text-white">{step.icon}</span>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: TEAL }}>
                Step {step.num}
              </span>
              <h3 className="text-xl font-bold mb-3" style={{ color: OCEAN }}>{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-[15px] max-w-sm mx-auto">{step.copy}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div {...fadeUp(0.4)} className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
            style={{ background: TEAL }}
          >
            Start Your Free Walkthrough
            <ArrowRight size={18} />
          </a>
          <p className="mt-4 text-sm text-gray-400">No obligation · Free photo review · Same-day callback</p>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   CTA BANNER (pre-footer)
   ════════════════════════════════════════════════════════════════ */
function PreFooterCTA() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden" style={{ background: OCEAN }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#00C9A7]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#00C9A7]/5 blur-[80px]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div {...fadeUp()}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Ready to Protect Your Home?
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Get a free root-cause assessment from Orange County&apos;s most referred stucco professional. No pressure, no obligations.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
              style={{ background: TEAL }}
            >
              Get Free Assessment
              <ArrowRight size={18} />
            </a>
            <a
              href="tel:7149367013"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white border-2 border-white/30 hover:border-white transition-colors"
            >
              <Phone size={18} />
              714-936-7013
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   5. FOOTER
   ════════════════════════════════════════════════════════════════ */
function Footer() {
  const ocCoastCities = ['Newport Beach', 'Huntington Beach', 'Seal Beach', 'Costa Mesa', 'Corona del Mar', 'Newport Coast']
  const southCoastalCities = ['Laguna Beach', 'Dana Point', 'San Clemente', 'Laguna Niguel', 'San Juan Capistrano', 'Aliso Viejo']

  return (
    <footer style={{ background: OCEAN }} className="text-white">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src="/jp-logo.png" alt="JP Stucco Repair" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-lg leading-none">JP Stucco</span>
                <span className="block text-[#00C9A7] text-xs font-medium tracking-wider uppercase">Repair</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00C9A7] transition-colors duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              1100 Newport Center Dr, Suite 100<br />
              Newport Beach, CA 92660
            </p>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white/80">Services</h4>
            <ul className="space-y-3">
              {['Stucco Repair', 'Stucco Patches', 'Weep Screed Repair', 'Smooth Stucco'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-white/60 hover:text-[#00C9A7] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white/80">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: 'Price Calculator', icon: <Calculator size={14} /> },
                { label: 'Cost Guide', icon: <BookOpen size={14} /> },
                { label: 'Color Visualizer', icon: <Palette size={14} /> },
              ].map((r) => (
                <li key={r.label}>
                  <a href="#" className="text-white/60 hover:text-[#00C9A7] transition-colors text-sm flex items-center gap-2">
                    <span className="text-[#00C9A7]">{r.icon}</span>
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white/80">Contact</h4>
            <a href="tel:7149367013" className="text-xl font-bold text-white hover:text-[#00C9A7] transition-colors flex items-center gap-2 mb-4">
              <Phone size={20} />
              714-936-7013
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
              style={{ background: TEAL }}
            >
              Get Free Assessment
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 mb-8" />

        {/* Service Area Grid */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl">
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: TEAL }}>
              The OC Coast
            </h5>
            <ul className="space-y-2">
              {ocCoastCities.map((city) => (
                <li key={city}>
                  <a href="#" className="text-white/50 hover:text-[#00C9A7] transition-colors text-sm flex items-center gap-2">
                    <MapPin size={12} className="text-[#00C9A7]/60" />
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: TEAL }}>
              South Coastal OC
            </h5>
            <ul className="space-y-2">
              {southCoastalCities.map((city) => (
                <li key={city}>
                  <a href="#" className="text-white/50 hover:text-[#00C9A7] transition-colors text-sm flex items-center gap-2">
                    <MapPin size={12} className="text-[#00C9A7]/60" />
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} JP Stucco Repair. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ════════════════════════════════════════════════════════════════
   PAGE COMPOSITION
   ════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <SocialProofBar />
        <HiddenDanger />
        <HowItWorks />
        <PreFooterCTA />
      </main>
      <Footer />
    </div>
  )
}
