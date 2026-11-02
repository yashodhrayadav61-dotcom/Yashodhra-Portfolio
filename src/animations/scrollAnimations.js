// ============================================================
// scrollAnimations.js — Section entrance animations
// Yashodhra Yadav Portfolio
// ============================================================

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Generic fade-up reveal — uses onEnter so elements are never invisible before trigger
export function initSectionReveal(selector, options = {}) {
  if (prefersReducedMotion()) return

  const config = {
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    start: 'top 85%',
    ...options,
  }

  const elements = document.querySelectorAll(selector)
  if (!elements.length) return

  ScrollTrigger.create({
    trigger: elements[0].closest('section') || elements[0],
    start: config.start,
    once: true,
    onEnter: () => {
      gsap.fromTo(
        elements,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: config.duration, stagger: config.stagger, ease: config.ease }
      )
    },
  })
}

// Skill items — animate on scroll, never hidden before trigger fires
export function initSkillsReveal() {
  if (prefersReducedMotion()) return

  const groups = document.querySelectorAll('.skills__group')
  groups.forEach((group) => {
    const items = group.querySelectorAll('.skill-item')
    if (!items.length) return

    ScrollTrigger.create({
      trigger: group,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          items,
          { x: -16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out' }
        )
      },
    })
  })
}

// Timeline items — animate on scroll
export function initTimelineReveal() {
  if (prefersReducedMotion()) return

  const items = document.querySelectorAll('.experience-item')
  items.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -24 : 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
        )
      },
    })
  })
}
