import React, { useEffect, useRef } from 'react'
import { personal } from '../../data/content'
import './Hero.css'

// Portrait assets
const PORTRAIT_SRC = `${import.meta.env.BASE_URL}assets/photo/yashodhra_portrait.png`
const BG_PORTRAIT_SRC = `${import.meta.env.BASE_URL}assets/photo/yashodhra_bg_portrait.png`

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { initHeroParallax } = await import('../../animations/heroParallax')
        initHeroParallax()
      } catch (err) {
        console.warn('Hero animations failed to load:', err)
      }
    }

    loadAnimations()
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      className="hero"
      ref={sectionRef}
      aria-label="Hero section"
    >
      {/* Layer 1 — Background atmosphere, textures & architectural geometry */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grain" />
        <div className="hero__bg-vignette" />
        <div className="hero__bg-vertical-stripe" />
        <div className="hero__bg-circle" />
        <div className="hero__bg-glow" />
      </div>

      {/* Layer 2 — Oversized Typography behind portrait */}
      <div className="hero__name-back" aria-hidden="true">
        <span className="hero__name-word-1 display display--hero">
          {personal.nameDisplay[0]}
        </span>
        <span className="hero__name-word-2 display display--hero">
          {personal.nameDisplay[1]}
        </span>
      </div>

      {/* Layer 2.5 — Secondary Background Portrait (Monochrome Editorial Layer) */}
      <div className="hero__bg-portrait-wrap" aria-hidden="true">
        <img
          src={BG_PORTRAIT_SRC}
          alt=""
          className="hero__bg-portrait-img"
          loading="eager"
        />
        <div className="hero__bg-portrait-overlay" />
      </div>

      {/* Layer 3 — Left Editorial Content & Accent Card */}
      <div className="hero__editorial-left">
        <p className="hero__cursive-accent">
          Ideas that<br />
          <em>Leave a Mark.</em>
        </p>
        <p className="hero__role-badge caption">
          CREATIVE THINKER &amp; PROBLEM SOLVER
        </p>

        {/* Botanical / Location Texture Card */}
        <div className="hero__panel hero__panel--left">
          <div className="hero__panel-texture hero__panel-texture--leaves" />
          <div className="hero__panel-content">
            <span className="hero__panel-label caption">BASED IN</span>
            <span className="hero__panel-val">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 5 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {personal.location}
            </span>
          </div>
        </div>
      </div>

      {/* Right side — Section Navigation index */}
      <div className="hero__editorial-nav" aria-hidden="true">
        <a href="#about" onClick={scrollTo('#about')} className="hero__nav-item">
          <span className="hero__nav-num">01</span>
          <span className="hero__nav-text">ABOUT</span>
        </a>
        <a href="#projects" onClick={scrollTo('#projects')} className="hero__nav-item">
          <span className="hero__nav-num">02</span>
          <span className="hero__nav-text">PROJECTS</span>
        </a>
        <a href="#experience" onClick={scrollTo('#experience')} className="hero__nav-item">
          <span className="hero__nav-num">03</span>
          <span className="hero__nav-text">EXPERIENCE</span>
        </a>
        <a href="#contact" onClick={scrollTo('#contact')} className="hero__nav-item">
          <span className="hero__nav-num">04</span>
          <span className="hero__nav-text">CONTACT</span>
        </a>
      </div>

      {/* Layer 4 — Main Foreground Portrait */}
      <div className="hero__portrait-wrap">
        <div className="hero__portrait-frame">
          <img
            src={PORTRAIT_SRC}
            alt="Yashodhra Yadav"
            className="hero__portrait-img"
            loading="eager"
          />
        </div>
      </div>

      {/* Layer 5 — Right Editorial Meta & CTA */}
      <div className="hero__editorial-right">
        <span className="hero__edu-badge caption">
          {personal.education}
        </span>
        <span className="hero__location-mobile caption">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          BASED IN {personal.location.toUpperCase()}
        </span>
        <p className="hero__description body-sm text-muted">
          {personal.tagline}
        </p>

        <a
          href="#contact"
          className="hero__cta-pill"
          onClick={scrollTo('#contact')}
        >
          <span>LET'S CONNECT</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>

        {/* Social Links Row */}
        <div className="hero__socials">
          {personal.github && (
            <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hero__social-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
          {personal.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hero__social-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
          {personal.email && (
            <a href={`mailto:${personal.email}`} aria-label="Email" className="hero__social-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          )}
        </div>

        {/* Bottom-right artistic accent panel */}
        <div className="hero__panel hero__panel--right">
          <div className="hero__panel-texture hero__panel-texture--marble" />
          <p className="hero__panel-script">
            Design<br />Build<br />Create
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-indicator__line" />
        <span className="scroll-indicator__label">Scroll</span>
      </div>
    </section>
  )
}
