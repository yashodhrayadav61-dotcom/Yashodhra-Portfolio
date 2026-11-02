import React, { useEffect } from 'react'
import { about, personal } from '../../data/content'
import './About.css'

export default function About() {
  useEffect(() => {
    const loadAnim = async () => {
      try {
        const { initSectionReveal } = await import('../../animations/scrollAnimations')
        initSectionReveal('.about__reveal')
      } catch (_) {}
    }
    loadAnim()
  }, [])

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="about section section--light" aria-labelledby="about-heading">
      <div className="container">

        {/* ── Section Header ─────────────────────────────────── */}
        <header className="about__header about__reveal">
          <div className="about__meta-row">
            <span className="about__index caption">01 / ABOUT ME</span>
            <span className="about__status-badge caption">
              <span className="about__status-dot" aria-hidden="true" />
              {personal.education} · {personal.location}
            </span>
          </div>

          <h2 id="about-heading" className="about__heading display text-dark">
            {about.heading}
          </h2>

          <div className="about__divider" />

          {/* Short Personal Introduction */}
          <div className="about__intro-grid">
            <p className="about__lead-text serif text-dark">
              {about.intro}
            </p>
            <div className="about__narrative">
              <p className="about__body-text body-md">
                {about.paragraph1}
              </p>
              <p className="about__body-text body-md">
                {about.paragraph2}
              </p>
            </div>
          </div>
        </header>

        {/* ── 3 Editorial Pillars: BUILD / CREATE / CONNECT ──── */}
        <div className="about__pillars about__reveal" role="region" aria-label="Core Pillars: Build, Create, Connect">
          <div className="about__pillars-grid">
            {about.pillars.map((pillar) => (
              <article key={pillar.id} className="about__pillar-col">
                <div className="about__pillar-top">
                  <span className="about__pillar-num display">{pillar.number}</span>
                  <span className="about__pillar-tag caption">DIMENSION</span>
                </div>
                <h3 className="about__pillar-title display text-dark">
                  {pillar.title}
                </h3>
                <p className="about__pillar-subtitle caption">
                  {pillar.subtitle}
                </p>
                <div className="about__pillar-rule" aria-hidden="true" />
                <p className="about__pillar-desc body-md">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Personal Strengths ─────────────────────────────── */}
        <div className="about__strengths-wrap about__reveal">
          <div className="about__strengths-header">
            <span className="about__strengths-label caption">PERSONAL STRENGTHS &amp; APPROACH</span>
            <div className="about__strengths-line" aria-hidden="true" />
          </div>
          <ul className="about__strengths-grid" role="list">
            {about.strengths.map((strength, index) => (
              <li key={strength} className="about__strength-item">
                <span className="about__strength-marker" aria-hidden="true">✦</span>
                <span className="about__strength-text body-md">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Open to Opportunities (Closing Signature) ─────── */}
        <div className="about__opportunity-banner about__reveal">
          <div className="about__opp-card">
            <div className="about__opp-left">
              <span className="about__opp-kicker caption">
                ✦ OPEN TO OPPORTUNITIES
              </span>
              <p className="about__opp-quote serif">
                &ldquo;{about.opportunity.quote}&rdquo;
              </p>
            </div>
            <div className="about__opp-right">
              <a
                href="#contact"
                className="about__opp-cta"
                onClick={scrollToContact}
              >
                <span>{about.opportunity.cta}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative architectural background watermark */}
      <div className="about__deco" aria-hidden="true">
        <span className="display about__deco-text">YASHODHRA</span>
      </div>
    </section>
  )
}
