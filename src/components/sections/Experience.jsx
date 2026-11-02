import React, { useEffect } from 'react'
import { experience } from '../../data/content'
import './Experience.css'

export default function Experience() {
  useEffect(() => {
    const loadAnim = async () => {
      try {
        const { initTimelineReveal } = await import('../../animations/scrollAnimations')
        initTimelineReveal()
      } catch (_) {}
    }
    loadAnim()
  }, [])

  return (
    <section id="experience" className="experience section section--dark" aria-labelledby="experience-heading">
      <div className="container">
        {/* Section Header */}
        <div className="experience__header">
          <span className="section-label">Experience</span>
          <h2 id="experience-heading" className="display display--xl experience__heading text-cream">
            Along<br />The Way
          </h2>
          <p className="experience__subheading serif serif--md">
            Activities, student communities, and practical exposure gained through campus initiatives and collaborative projects.
          </p>
        </div>

        {/* Timeline */}
        <div className="experience__timeline" role="list">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="experience-item"
              role="listitem"
              aria-labelledby={`exp-${item.id}-role`}
            >
              {/* Timeline marker */}
              <div className="experience-item__marker" aria-hidden="true">
                <div className="experience-item__dot" />
                {index < experience.length - 1 && (
                  <div className="experience-item__connector" />
                )}
              </div>

              {/* Content */}
              <div className="experience-item__content">
                <div className="experience-item__meta">
                  <span className="experience-item__type caption">
                    {item.type}
                  </span>
                  <span className="experience-item__divider" aria-hidden="true" />
                  <span className="experience-item__year caption text-muted">
                    {item.year}
                  </span>
                </div>

                <h3
                  id={`exp-${item.id}-role`}
                  className="experience-item__role display display--md text-cream"
                >
                  {item.role}
                </h3>

                <p className="experience-item__org serif serif--md">
                  {item.organisation}
                </p>

                <p className="experience-item__desc body-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
