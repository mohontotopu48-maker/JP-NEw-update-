'use client'

import { useState, useEffect, useRef } from 'react'
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
  Home as HomeIcon,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Palette,
  BookOpen,
  Eye,
  BadgeCheck,
  Search,
  DollarSign,
  Wrench,
  Droplets,
  Layers,
  Camera,
  MessageSquare,
} from 'lucide-react'

/* ── colour tokens ── */
const OCEAN = '#0A2540'
const TEAL = '#00C9A7'
const CRIMSON = '#DC2626'
const TEAL_GLOW = '0 0 24px rgba(0,201,167,.45)'

/* ── animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ════════════════════════════════════════════════════════════════
   1. PERSISTENT OCEAN BLUE HEADER
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
                activeLink === 'Services'
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
                  className="absolute top-full right-0 mt-2 w-60 rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
                >
                  {[
                    { label: 'Stucco Repair', href: '#patching-services' },
                    { label: 'Stucco Patches', href: '#patching-services' },
                    { label: 'Weep Screed Repair', href: '#assessment' },
                    { label: 'Smooth Stucco', href: '#patching-services' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00C9A7] transition-colors"
                    >
                      <CheckCircle2 size={14} className="text-[#00C9A7]" />
                      {item.label}
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
            href="#assessment"
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
                onClick={() => setServicesOpen(!servicesOpen)}
                className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-[#00C9A7] flex items-center gap-1"
              >
                Services
                <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {[
                      { label: 'Stucco Repair', href: '#patching-services' },
                      { label: 'Stucco Patches', href: '#patching-services' },
                      { label: 'Weep Screed Repair', href: '#assessment' },
                      { label: 'Smooth Stucco', href: '#patching-services' },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => { setMobileOpen(false); setServicesOpen(false) }}
                        className="block pl-8 py-2 text-sm text-white/60 hover:text-[#00C9A7] transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="pt-3 border-t border-white/10 space-y-3">
                <a href="tel:7149367013" className="flex items-center gap-2 text-white font-bold text-sm px-4">
                  <Phone size={15} /> 714-936-7013
                </a>
                <a
                  href="#assessment"
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
   2. THE MODERN HERO (SPLIT-SCREEN)
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
            <motion.h1 {...fadeUp(0)} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
              <span style={{ color: OCEAN }}>Stucco Repair</span>
              <br />
              <span style={{ color: TEAL }}>Done Right.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.1)} className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Permanent, high-end stucco restoration for the OC Coast. We find the hidden cause,
              fix it permanently, and ensure your home is protected for the long haul.
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="mt-8">
              <a
                href="#assessment"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
                style={{ background: TEAL }}
              >
                BOOK FREE ASSESSMENT
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right — video thumbnail with play button */}
          <motion.div {...fadeUp(0.15)} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/hero-home.png"
                alt="Luxury coastal Orange County stucco home"
                className="w-full h-auto object-cover aspect-[16/9] group-hover:scale-[1.03] transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Play button — white circle with teal triangle */}
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
              transition={{ delay: 0.5, duration: 0.5 }}
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
          </motion.div>
        </div>

        {/* Metric Bar — Four clean white cards */}
        <motion.div {...fadeUp(0.3)} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <HomeIcon size={22} style={{ color: OCEAN }} />, value: '3,500+', label: 'Homes Repaired' },
            { icon: <Search size={22} style={{ color: OCEAN }} />, value: 'Root-Cause', label: 'Fix Method' },
            { icon: <BadgeCheck size={22} style={{ color: OCEAN }} />, value: 'Licensed', label: '& Insured' },
            { icon: <Star size={22} style={{ color: OCEAN }} />, value: '5.0★', label: 'Google Rating' },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-3 hover:shadow-md hover:border-[#00C9A7]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${TEAL}10` }}>
                {m.icon}
              </div>
              <div>
                <div className="text-lg font-extrabold" style={{ color: OCEAN }}>{m.value}</div>
                <div className="text-xs text-gray-500">{m.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   3. THE "HIDDEN DANGER" DEEP-DIVE
   ════════════════════════════════════════════════════════════════ */
function HiddenDanger() {
  const dangerPoints = [
    {
      icon: <AlertTriangle size={22} className="text-red-500" />,
      title: 'Shredded Moisture Barriers',
      copy: 'Behind your stucco sits a paper moisture barrier — and it\'s shredding. Years of coastal humidity and rain seep through tiny cracks, causing the paper to deteriorate, tear, and literally disintegrate. Once the paper goes, your home\'s first line of defense is gone.',
    },
    {
      icon: <AlertTriangle size={22} className="text-amber-500" />,
      title: 'Silent Black Mold Growth',
      copy: 'When moisture breaches the barrier, black mold blooms silently across the wood studs inside your walls. You won\'t see it, but your family breathes it. Mold remediation alone can cost tens of thousands, and it keeps coming back until the stucco is fixed right.',
    },
    {
      icon: <AlertTriangle size={22} className="text-orange-500" />,
      title: 'The Insurance Denial Trap',
      copy: 'Long-term neglect and gradual deterioration are standard exclusion clauses in nearly every homeowner\'s policy. The longer you wait, the more likely your claim gets denied — and you\'re left holding the entire bill out of pocket.',
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
        </motion.div>

        {/* Split layout: Image left, text right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — damage image */}
          <motion.div {...fadeUp(0.1)} className="relative group">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/stucco-damage.png"
                alt="Cut-away wall showing water damage and mold behind stucco"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-white">
                <Eye size={18} className="text-[#00C9A7]" />
                <span className="text-sm font-medium">See what&apos;s really behind your walls</span>
              </div>
            </div>
          </motion.div>

          {/* Right — danger text */}
          <div className="space-y-6">
            {dangerPoints.map((pt, i) => (
              <motion.div
                key={pt.title}
                {...fadeUp(0.15 + i * 0.1)}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    {pt.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: OCEAN }}>{pt.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{pt.copy}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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
   4. THE COASTAL PROCESS (3-STEP PLAN)
   ════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <ClipboardCheck size={28} />,
      title: 'Free Walkthrough',
      copy: 'Schedule an onsite coastal walkthrough to identify the root cause. We don\'t guess — we inspect, so you know exactly what you\'re dealing with.',
      accent: TEAL,
    },
    {
      num: '02',
      icon: <Shield size={28} />,
      title: 'Get Your Estimate',
      copy: 'A detailed, fixed-price estimate with a clear, professional scope of work. Zero hidden fees — you\'ll know the full cost before we start.',
      accent: OCEAN,
    },
    {
      num: '03',
      icon: <Hammer size={28} />,
      title: 'We Get It Done',
      copy: 'On-time completion, fast, clean, and built to last. Every project backed by our commitment to permanent results that protect your home for decades.',
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
            href="#assessment"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
            style={{ background: TEAL }}
          >
            BOOK FREE ASSESSMENT
            <ArrowRight size={18} />
          </a>
          <p className="mt-4 text-sm text-gray-400">No obligation · Onsite walkthrough · Same-day callback</p>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   5A. STUCCO PATCHING SERVICES
   ════════════════════════════════════════════════════════════════ */
function PatchingServices() {
  const cosmeticBullets = ['Hairline cracks', 'Surface chips', 'Chalky spots', 'Settlement cracks']
  const structuralBullets = ['Holes showing framing/paper', 'Impact damage', 'Utility cutouts', 'Rusted lath', 'Plumbing removals']

  const patchRightItems = [
    { icon: <CheckCircle2 size={18} className="text-[#00C9A7]" />, text: 'Single crack or hole (< 2 sqft)' },
    { icon: <CheckCircle2 size={18} className="text-[#00C9A7]" />, text: 'Utility cutout' },
    { icon: <CheckCircle2 size={18} className="text-[#00C9A7]" />, text: 'Isolated impact' },
  ]
  const fullRepairItems = [
    { icon: <AlertTriangle size={18} className="text-red-500" />, text: 'Multiple damaged areas' },
    { icon: <AlertTriangle size={18} className="text-red-500" />, text: 'Water damage behind stucco' },
    { icon: <AlertTriangle size={18} className="text-red-500" />, text: 'Widespread cracking' },
    { icon: <AlertTriangle size={18} className="text-red-500" />, text: 'Delamination / bubbling' },
  ]

  return (
    <section id="patching-services" className="py-20 md:py-28 bg-white relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00C9A7]/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#DC2626]/[0.03] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* ─── 1. Section Header ─── */}
        <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: OCEAN }}>
            Stucco Patching Services
          </h2>
          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Hairline cracks, utility cutouts, impact damage — our patching crew fixes localized problems
            without re-stuccoing entire walls. Two types of patches, one clear recommendation after a
            free on-site inspection.
          </p>
        </motion.div>

        {/* Action Bar */}
        <motion.div {...fadeUp(0.1)} className="flex flex-col items-center gap-4 mb-16">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#assessment"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
              style={{ background: TEAL }}
            >
              GET FREE ASSESSMENT
              <ArrowRight size={18} />
            </a>
            <span className="text-gray-500 text-sm">
              Or call: <a href="tel:6573005675" className="font-semibold hover:text-[#00C9A7] transition-colors" style={{ color: OCEAN }}>(657) 300-5675</a>
            </span>
          </div>
          <a
            href="sms:6573005675"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00C9A7] transition-colors group"
          >
            <Camera size={16} className="group-hover:scale-110 transition-transform" />
            <span>Text us a photo of your damage for a quick estimate</span>
          </a>
        </motion.div>

        {/* ─── 2. The Comparison Grid ─── */}
        <motion.div {...fadeUp(0.15)} className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ color: OCEAN }}>
            Cosmetic vs. Structural
          </h3>
          <p className="mt-2 text-gray-500 text-base">Two Types of Stucco Patches — and Why It Matters.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {/* Left Column — Cosmetic */}
          <motion.div {...fadeUp(0.2)} className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-7 lg:p-8 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${TEAL}10` }}>
                <Palette size={24} style={{ color: TEAL }} />
              </div>
              <div>
                <h4 className="text-xl font-bold" style={{ color: OCEAN }}>Cosmetic Stucco Patch</h4>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: TEAL }}>Surface Only</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-[15px] mb-6">
              A skim repair of the finish coat — no cutting into the wall, no new lath. We clean and key the
              surface, fill the damage with matched stucco material, and float the texture back in so the
              repair blends with the surrounding wall.
            </p>
            <ul className="space-y-3">
              {cosmeticBullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-gray-700 text-sm">
                  <CheckCircle2 size={16} style={{ color: TEAL }} className="shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column — Structural (highlighted crimson) */}
          <motion.div {...fadeUp(0.25)} className="bg-white rounded-2xl border-2 shadow-sm p-7 lg:p-8 hover:shadow-lg transition-all duration-300 relative" style={{ borderColor: CRIMSON }}>
            {/* Recommended badge */}
            <div className="absolute -top-3.5 right-6 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: CRIMSON }}>
              RECOMMENDED
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#FEE2E2' }}>
                <Shield size={24} style={{ color: CRIMSON }} />
              </div>
              <div>
                <h4 className="text-xl font-bold" style={{ color: OCEAN }}>Stucco Patching with Lath</h4>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: CRIMSON }}>Full-Depth Repair</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-[15px] mb-6">
              A full one-coat system rebuild. We cut back to healthy stucco, strip out old rusted wire,
              install new galvanized lath, and apply fiber-reinforced stucco to rebuild the wall monolithically.
            </p>
            <ul className="space-y-3">
              {structuralBullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-gray-700 text-sm">
                  <CheckCircle2 size={16} style={{ color: CRIMSON }} className="shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ─── 3. Smooth Stucco Warning ─── */}
        <motion.div {...fadeUp(0.3)} className="mb-16">
          <div className="rounded-2xl border-2 p-6 sm:p-8" style={{ background: '#FFF1F2', borderColor: CRIMSON }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#FEE2E2' }}>
                <AlertTriangle size={22} style={{ color: CRIMSON }} />
              </div>
              <div>
                <h4 className="font-bold text-base mb-2" style={{ color: CRIMSON }}>Smooth Stucco — No Patches.</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Smooth finish stucco cannot be patched — localized repairs will always be visible. For
                  smooth stucco, we re-stucco the entire wall plane for a uniform finish.{' '}
                  <a href="#" className="font-semibold hover:underline" style={{ color: CRIMSON }}>
                    Learn about smooth stucco services →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── 4. Patch vs. Full Repair Logic Table ─── */}
        <motion.div {...fadeUp(0.35)} className="mb-16">
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-2">
              <div className="p-5 sm:p-6 text-center" style={{ background: `${TEAL}10` }}>
                <span className="text-sm sm:text-base font-bold" style={{ color: OCEAN }}>Patching is right when…</span>
              </div>
              <div className="p-5 sm:p-6 text-center" style={{ background: '#FEE2E2' }}>
                <span className="text-sm sm:text-base font-bold" style={{ color: OCEAN }}>Full repair is better when…</span>
              </div>
            </div>
            {/* Table Body */}
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              <div className="p-5 sm:p-6 space-y-4">
                {patchRightItems.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    {item.icon}
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 sm:p-6 space-y-4">
                {fullRepairItems.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    {item.icon}
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── 5. Final Bottom CTA ─── */}
        <motion.div {...fadeUp(0.4)} className="text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: OCEAN }}>
            Not Sure What You Need?
          </h3>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">
            We&apos;ll inspect the damage for free and recommend the most cost-effective solution — patch,
            repair, or re-stucco.
          </p>
          <a
            href="#assessment"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
            style={{ background: TEAL }}
          >
            GET FREE ASSESSMENT
            <ArrowRight size={18} />
          </a>
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
              href="#assessment"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
              style={{ background: TEAL }}
            >
              BOOK FREE ASSESSMENT
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
   5. ARCHITECTURAL OC COASTAL FOOTER
   ════════════════════════════════════════════════════════════════ */
function Footer() {
  const ocCoastCities = ['Newport Beach', 'Huntington Beach', 'Seal Beach', 'Costa Mesa', 'Corona del Mar', 'Newport Coast']
  const southCoastalCities = ['Laguna Beach', 'Dana Point', 'San Clemente', 'Laguna Niguel', 'San Juan Capistrano', 'Aliso Viejo']

  return (
    <footer style={{ background: OCEAN }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">

        {/* Centered tagline */}
        <div className="text-center mb-12">
          <p className="text-white/90 text-lg font-medium tracking-wide">
            Expert Guide <span className="text-white/40 mx-2">|</span> Helping You Win
          </p>
        </div>

        {/* Service & Resource Columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand + social + address + serving badge */}
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
            {/* Serving badge */}
            <div className="flex items-center gap-2">
              <MapPin size={16} style={{ color: TEAL }} />
              <span className="text-sm font-medium" style={{ color: TEAL }}>
                Serving the OC Coast for over 25 Years.
              </span>
            </div>
          </div>

          {/* Col 2 — Our Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white/80">Our Services</h4>
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

          {/* Col 3 — Tools & Guides */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white/80">Tools & Guides</h4>
            <ul className="space-y-3">
              {[
                { label: 'Price Calculator', icon: <Calculator size={14} /> },
                { label: 'Cost Guide', icon: <BookOpen size={14} /> },
                { label: 'Color Visualizer', icon: <Palette size={14} /> },
                { label: 'Weep Screed Assessment', icon: <Shield size={14} /> },
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
              href="#assessment"
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

        {/* SERVICE AREAS — ORANGE COUNTY COASTAL ONLY */}
        <div className="mb-2">
          <h5 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8">
            SERVICE AREAS — ORANGE COUNTY COASTAL ONLY
          </h5>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
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
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} JP Stucco Repair. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/70 transition-colors">Sitemap</a>
            </div>
            <span className="hidden sm:block text-white/20">|</span>
            <div className="leading-tight text-center sm:text-right">
              <span>Powered by </span><span className="text-[#00C9A7] font-semibold">NXLBYLDR CRM</span>
              <br />
              <span>managed by </span><a href="https://vsualdigitalmedia.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">VSUALdigitalmedia.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ════════════════════════════════════════════════════════════════
   6. FREE STUCCO ASSESSMENT — PRICING CARDS
   ════════════════════════════════════════════════════════════════ */
function Assessment() {
  const [selected, setSelected] = useState<string | null>(null)

  const services = [
    {
      id: 'single-patch',
      title: 'Single Area Patch',
      description: 'Small cracks, chips, or isolated damage',
      price: '$650+',
      icon: <Wrench size={24} />,
    },
    {
      id: 'multiple-repairs',
      title: 'Multiple Repairs',
      description: 'Multiple cracks or larger damage areas',
      price: '$998+',
      icon: <Layers size={24} />,
    },
    {
      id: 're-stucco',
      title: 'Re-Stucco',
      description: 'Full exterior stucco replacement',
      price: '$14,800+',
      icon: <HomeIcon size={24} />,
    },
    {
      id: 'weep-screed',
      title: 'Weep Screed Replacement',
      description: 'Moisture protection repair or replacement',
      price: '$1,398+',
      icon: <Droplets size={24} />,
    },
  ]

  return (
    <section id="assessment" className="py-20 md:py-28 bg-gray-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00C9A7]/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0A2540]/[0.03] blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: `${TEAL}15`, color: TEAL }}>
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold" style={{ color: OCEAN }}>
            Get Your Free Stucco Assessment
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Select your service to see pricing and book a free walkthrough.
          </p>
        </motion.div>

        {/* 2×2 Pricing Cards */}
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              {...fadeUp(i * 0.1)}
              onClick={() => setSelected(svc.id)}
              className={`relative cursor-pointer rounded-2xl bg-white p-7 shadow-sm border-2 transition-all duration-300 group hover:shadow-lg ${
                selected === svc.id
                  ? 'border-[#00C9A7] shadow-lg shadow-[#00C9A7]/10'
                  : 'border-gray-100 hover:border-[#00C9A7]/30'
              }`}
            >
              {/* Selected checkmark */}
              {selected === svc.id && (
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: TEAL }}>
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                selected === svc.id ? 'text-white' : ''
              }`}
                style={{ background: selected === svc.id ? TEAL : `${TEAL}10`, color: selected === svc.id ? '#fff' : TEAL }}
              >
                {svc.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-1" style={{ color: OCEAN }}>{svc.title}</h3>

              {/* Description */}
              <p className="text-gray-500 text-sm mb-4">{svc.description}</p>

              {/* Price */}
              <div className="text-2xl font-extrabold" style={{ color: TEAL }}>{svc.price}</div>
            </motion.div>
          ))}
        </div>

        {/* Book Walkthrough CTA */}
        <motion.div {...fadeUp(0.4)} className="mt-10 text-center">
          <a
            href="tel:7149367013"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,.5)]"
            style={{ background: TEAL }}
          >
            <Phone size={18} />
            Book Free Walkthrough — 714-936-7013
          </a>
          <p className="mt-4 text-sm text-gray-400">Select a service above · No hidden fees · Fixed-price estimates</p>
        </motion.div>
      </div>
    </section>
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
        <HiddenDanger />
        <HowItWorks />
        <PatchingServices />
        <Assessment />
        <PreFooterCTA />
      </main>
      <Footer />
    </div>
  )
}
