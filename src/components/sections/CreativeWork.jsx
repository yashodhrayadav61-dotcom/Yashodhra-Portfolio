import React, { useEffect } from 'react'
import { creativeWork } from '../../data/content'
import './CreativeWork.css'

export default function CreativeWork() {
  useEffect(() => {
    const loadAnim = async () => {
      try {
        const { initSectionReveal } = await import('../../animations/scrollAnimations')
        initSectionReveal('.creative__reveal', { stagger: 0.08 })
      } catch (_) {}
    }
    loadAnim()
  }, [])

  return (
    <section
      id="creative"
      className="creative section section--deeper"
      aria-labelledby="creative-heading"
    >
      <div className="creative__ambient-glow" aria-hidden="true" />

      <div className="container">
        {/* ── Editorial Section Header ───────────────────────── */}
        <header className="creative__header creative__reveal">
          <div className="creative__meta-row">
            <span className="creative__label caption">03 / CREATIVE JOURNAL</span>
            <span className="creative__status-pill caption">
              <span className="creative__status-spark" aria-hidden="true">✦</span>
              PRACTICAL EXPOSURE &amp; INTERESTS
            </span>
          </div>

          <h2 id="creative-heading" className="display display--xl creative__heading text-cream">
            Beyond The{' '}
            <span className="creative__heading-serif serif">
              Code
            </span>
          </h2>

          <div className="creative__lead-grid">
            <p className="creative__intro serif text-cream">
              {creativeWork.subheading}
            </p>
            <p className="creative__context body-sm text-muted">
              {creativeWork.contextNote}
            </p>
          </div>

          <div className="creative__divider" aria-hidden="true" />
        </header>

        {/* ── Creative Journal Ledger (6 Categories) ─────────── */}
        <div className="creative__journal creative__reveal" role="region" aria-label="Creative interests journal">
          <div className="creative__grid">
            {creativeWork.categories.map((item) => (
              <article key={item.id} className="creative__entry">
                <div className="creative__entry-header">
                  <span className="creative__entry-num display">{item.number}</span>
                  <span className="creative__entry-tag caption">{item.tag}</span>
                </div>

                <h3 className="creative__entry-title display text-cream">
                  {item.title}
                </h3>

                <div className="creative__entry-rule" aria-hidden="true" />

                <p className="creative__entry-desc body-md">
                  {item.description}
                </p>

                <div className="creative__entry-focus" aria-label="Key areas of focus">
                  {item.focus.map((f) => (
                    <span key={f} className="creative__focus-pill caption">
                      {f}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Refined Editorial Footnote ─────────────────────── */}
        <footer className="creative__footer creative__reveal">
          <p className="creative__footnote caption">
            <span className="creative__footnote-spark" aria-hidden="true">✦</span>
            Developing creative capabilities through ongoing college initiatives, presentations, and collaborative technical media.
          </p>
        </footer>
      </div>
    </section>
  )
}
