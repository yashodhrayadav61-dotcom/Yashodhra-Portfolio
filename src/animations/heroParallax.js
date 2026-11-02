// ============================================================
// heroParallax.js — GSAP ScrollTrigger + Mouse 3D Parallax
// Yashodhra Yadav Portfolio (Editorial 3D Redesign)
// ============================================================

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Respect reduced motion preference ───────────────────────
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── Hero scroll-driven parallax with 3-phase pinned timeline ──
export function initHeroParallax() {
  if (prefersReducedMotion()) return

  const isMobile = window.innerWidth < 768

  // Target elements
  const hero           = document.querySelector('.hero')
  const nameWord1      = document.querySelector('.hero__name-word-1')
  const nameWord2      = document.querySelector('.hero__name-word-2')
  const portrait       = document.querySelector('.hero__portrait-wrap')
  const bg             = document.querySelector('.hero__bg')
  const bgCircle       = document.querySelector('.hero__bg-circle')
  const bgPortrait     = document.querySelector('.hero__bg-portrait-wrap')
  const editorialLeft  = document.querySelector('.hero__editorial-left')
  const editorialRight = document.querySelector('.hero__editorial-right')
  const editorialNav   = document.querySelector('.hero__editorial-nav')
  const scrollIndicator= document.querySelector('.scroll-indicator')

  if (!hero || !portrait || !nameWord1 || !nameWord2) return

  // Clean up any prior triggers on .hero to prevent duplicate pins
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === hero || st.pin === hero) {
      st.kill()
    }
  })

  // Master pinned timeline:
  // - Pins the hero so the composition stays visible for longer
  // - Phase 1 (0 -> 3.5): Separation (YASHODHRA moves left, YADAV moves right, portrait rises)
  // - Phase 2 (3.5 -> 7.5): Hold (Composition remains stable and visible for a generous duration)
  // - Phase 3 (7.5 -> 10.0): Smooth cinematic transition into the About section
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: isMobile ? '+=120%' : '+=170%',
      pin: true,
      pinSpacing: true,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  // ── PHASE 1: Separation (0s -> 3.5s) ──────────────────────────
  // YASHODHRA moves towards the LEFT
  tl.to(
    nameWord1,
    {
      xPercent: isMobile ? -18 : -32,
      yPercent: isMobile ? -8 : -14,
      ease: 'power1.out',
      duration: 3.5,
    },
    0
  )

  // YADAV moves towards the RIGHT (synchronized opposite direction)
  tl.to(
    nameWord2,
    {
      xPercent: isMobile ? 18 : 32,
      yPercent: isMobile ? -6 : -10,
      ease: 'power1.out',
      duration: 3.5,
    },
    0
  )

  // Foreground portrait rises UPWARD through the parting words
  tl.to(
    portrait,
    {
      yPercent: isMobile ? -12 : -20,
      scale: isMobile ? 1.02 : 1.05,
      ease: 'power1.out',
      duration: 3.5,
    },
    0
  )

  if (bgCircle) {
    tl.to(bgCircle, { yPercent: isMobile ? 5 : 10, scale: 0.96, ease: 'power1.out', duration: 3.5 }, 0)
  }

  if (bgPortrait) {
    tl.to(bgPortrait, { yPercent: isMobile ? -6 : -10, scale: 1.03, ease: 'power1.out', duration: 3.5 }, 0)
  }

  if (editorialLeft) {
    tl.to(editorialLeft, { opacity: 0.45, yPercent: isMobile ? -8 : -14, ease: 'power1.out', duration: 3.5 }, 0)
  }

  if (editorialRight) {
    tl.to(editorialRight, { opacity: 0.45, yPercent: isMobile ? -8 : -16, ease: 'power1.out', duration: 3.5 }, 0)
  }

  if (editorialNav) {
    tl.to(editorialNav, { opacity: 0.35, yPercent: -12, ease: 'power1.out', duration: 3.5 }, 0)
  }

  if (scrollIndicator) {
    tl.to(scrollIndicator, { opacity: 0, duration: 1.5 }, 0)
  }

  // ── PHASE 2: Hold (3.5s -> 7.5s) ──────────────────────────────
  // The separated composition is held stable so visitors can appreciate it.
  // YASHODHRA on the left, YADAV on the right, portrait commanding the center.
  // Subtle organic micro-drift preserves visual life without excessive movement.
  tl.to(
    nameWord1,
    {
      xPercent: isMobile ? -20 : -35,
      yPercent: isMobile ? -10 : -16,
      ease: 'none',
      duration: 4.0,
    },
    3.5
  )

  tl.to(
    nameWord2,
    {
      xPercent: isMobile ? 20 : 35,
      yPercent: isMobile ? -8 : -12,
      ease: 'none',
      duration: 4.0,
    },
    3.5
  )

  tl.to(
    portrait,
    {
      yPercent: isMobile ? -14 : -23,
      scale: isMobile ? 1.03 : 1.06,
      ease: 'none',
      duration: 4.0,
    },
    3.5
  )

  if (bgPortrait) {
    tl.to(bgPortrait, { yPercent: isMobile ? -8 : -13, ease: 'none', duration: 4.0 }, 3.5)
  }

  if (bgCircle) {
    tl.to(bgCircle, { yPercent: isMobile ? 7 : 13, ease: 'none', duration: 4.0 }, 3.5)
  }

  // ── PHASE 3: Transition (7.5s -> 10.0s) ────────────────────────
  // Smooth, cinematic transition into the About section as hero unpins.
  tl.to(
    [nameWord1, nameWord2],
    {
      opacity: 0,
      yPercent: '-=12',
      ease: 'power1.inOut',
      duration: 2.0,
    },
    7.5
  )

  tl.to(
    portrait,
    {
      opacity: 0,
      yPercent: '-=16',
      ease: 'power1.inOut',
      duration: 2.0,
    },
    7.5
  )

  if (editorialLeft) {
    tl.to(editorialLeft, { opacity: 0, yPercent: '-=10', ease: 'power1.inOut', duration: 1.8 }, 7.5)
  }

  if (editorialRight) {
    tl.to(editorialRight, { opacity: 0, yPercent: '-=10', ease: 'power1.inOut', duration: 1.8 }, 7.5)
  }

  if (editorialNav) {
    tl.to(editorialNav, { opacity: 0, duration: 1.8 }, 7.5)
  }

  if (bgPortrait) {
    tl.to(bgPortrait, { opacity: 0, ease: 'power1.inOut', duration: 2.0 }, 7.5)
  }

  if (bg) {
    tl.to(bg, { opacity: 0.2, ease: 'none', duration: 2.2 }, 7.5)
  }
}

// ── Hero entrance animation ──────────────────────────────────
// User requirement: Absolutely NO movement before scrolling.
// All elements remain in their exact resting CSS positions until scroll begins.
export function initHeroEntrance() {
  if (typeof window !== 'undefined') {
    window.__heroEntranceTl = null
  }
}

// ── Mouse-based 3D micro-parallax ────────────────────────────
export function initMouseParallax() {
  if (prefersReducedMotion()) return
  if (window.innerWidth < 1024) return // Desktop only

  const portrait    = document.querySelector('.hero__portrait-frame') || document.querySelector('.hero__portrait-wrap')
  const bgPortrait  = document.querySelector('.hero__bg-portrait-wrap')
  const bgCircle    = document.querySelector('.hero__bg-circle')
  const nameBack    = document.querySelector('.hero__name-back')

  if (!portrait) return

  let mouseX = 0
  let mouseY = 0
  let currentX = 0
  let currentY = 0

  const STRENGTH_FOREGROUND  =  10 // px
  const STRENGTH_BACKGROUND  = -10 // inverse for depth!
  const STRENGTH_CIRCLE      =   6
  const STRENGTH_NAME        =  -5

  const onMouseMove = (e) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    mouseX = (e.clientX - cx) / cx // -1 to 1
    mouseY = (e.clientY - cy) / cy // -1 to 1
  }

  let rafId = null

  const animate = () => {
    currentX += (mouseX - currentX) * 0.05
    currentY += (mouseY - currentY) * 0.05

    // Foreground portrait moves with mouse
    if (portrait) {
      gsap.set(portrait, {
        x: currentX * STRENGTH_FOREGROUND,
        y: currentY * STRENGTH_FOREGROUND * 0.6,
      })
    }

    // Background portrait moves INVERSE to mouse (3D illusion!)
    if (bgPortrait) {
      gsap.set(bgPortrait, {
        x: currentX * STRENGTH_BACKGROUND,
        y: currentY * STRENGTH_BACKGROUND * 0.5,
      })
    }

    // Background circle
    if (bgCircle) {
      gsap.set(bgCircle, {
        x: currentX * STRENGTH_CIRCLE,
        y: currentY * STRENGTH_CIRCLE * 0.4,
      })
    }

    // Name typography
    if (nameBack) {
      gsap.set(nameBack, {
        x: currentX * STRENGTH_NAME,
        y: currentY * STRENGTH_NAME * 0.5,
      })
    }

    rafId = requestAnimationFrame(animate)
  }

  rafId = requestAnimationFrame(animate)

  document.querySelector('.hero')?.addEventListener('mousemove', onMouseMove, { passive: true })

  return () => {
    if (rafId) cancelAnimationFrame(rafId)
    document.querySelector('.hero')?.removeEventListener('mousemove', onMouseMove)
  }
}
