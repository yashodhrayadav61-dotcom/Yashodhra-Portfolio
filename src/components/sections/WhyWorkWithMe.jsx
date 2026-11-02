import React, { useEffect } from 'react'
import { whyWorkWithMe } from '../../data/content'
import './WhyWorkWithMe.css'

export default function WhyWorkWithMe() {
  useEffect(() => {
    const loadAnim = async () => {
      try {
        const { initSectionReveal } = await import('../../animations/scrollAnimations')
        initSectionReveal('.why-me__reveal', { stagger: 0.1 })
      } catch (_) {}
    }
    loadAnim()
  }, [])

  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="why-work"
      className="why-me section section--dark"
      aria-labelledby="why-work-heading"
    >
      <div className="why-me__ambient-glow" aria-hidden="true" />

      <div className="container">
        <div className="why-me__split">

          {/* Left Column: Heading & Value Proposition */}
          <div className="why-me__sidebar why-me__reveal">
            <span className="why-me__kicker caption">
              ✦ PERSPECTIVE &amp; VALUE
            </span>

            <h2 id="why-work-heading" className="display display--xl why-me__heading text-cream">
              Why Work <br />
              <span className="why-me__heading-serif serif">
                With Me
              </span>
            </h2>

            <div className="why-me__divider" aria-hidden="true" />

            <p className="why-me__subheading serif text-cream">
              {whyWorkWithMe.subheading}
            </p>

            <p className="why-me__context body-sm text-muted">
              {whyWorkWithMe.contextNote}
            </p>

            <div className="why-me__cta-wrap">
              <a
                href="#contact"
                className="why-me__cta"
                onClick={scrollToContact}
              >
                <span>Let's Discuss Opportunities</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: 5 Numbered Core Qualities */}
          <div className="why-me__content why-me__reveal" role="region" aria-label="Core reasons to collaborate">
            <ol className="why-me__list" role="list">
              {whyWorkWithMe.reasons.map((reason) => (
                <li key={reason.number} className="why-me__item">
                  <div className="why-me__item-top">
                    <span className="why-me__item-num display">{reason.number}</span>
                    <span className="why-me__item-tag caption">{reason.tag}</span>
                  </div>

                  <h3 className="why-me__item-title display text-cream">
                    {reason.title}
                  </h3>

                  <div className="why-me__item-rule" aria-hidden="true" />

                  <p className="why-me__item-desc body-md">
                    {reason.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  )
}

