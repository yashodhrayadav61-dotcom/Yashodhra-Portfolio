import React, { useEffect } from 'react'
import { skills } from '../../data/content'
import './Skills.css'

const chapters = [
  { key: 'build',   number: '02', accent: 'var(--dusty-rose)' },
  { key: 'create',  number: '03', accent: 'var(--coral)' },
  { key: 'connect', number: '04', accent: 'var(--soft-grey)' },
]

export default function Skills() {
  useEffect(() => {
    const loadAnim = async () => {
      try {
        const { initSkillsReveal } = await import('../../animations/scrollAnimations')
        initSkillsReveal()
      } catch (_) {}
    }
    loadAnim()
  }, [])

  return (
    <section id="skills" className="skills section section--dark" aria-labelledby="skills-heading">
      <div className="container">
        <div className="skills__header">
          <h2 id="skills-heading" className="visually-hidden">Skills</h2>
          <p className="skills__intro serif serif--lg text-cream">
            Three dimensions of how I work.
          </p>
        </div>

        <div className="skills__chapters">
          {chapters.map(({ key, number, accent }) => {
            const chapter = skills[key]
            return (
              <div key={key} className="skills__group" aria-labelledby={`skills-${key}-heading`}>
                {/* Chapter header */}
                <div className="skills__group-header">
                  <span className="caption text-muted">{number}</span>
                  <h3
                    id={`skills-${key}-heading`}
                    className="display display--lg skills__chapter-title"
                    style={{ color: accent }}
                  >
                    {chapter.label}
                  </h3>
                  <p className="body-sm skills__chapter-desc text-muted">
                    {chapter.description}
                  </p>
                </div>

                {/* Skill items */}
                <ul className="skills__list" role="list">
                  {chapter.items.map((item) => (
                    <li key={item.name} className="skill-item">
                      <span className="skill-item__name body-sm text-cream">
                        {item.name}
                      </span>
                      <span className="skill-item__cat caption text-muted">
                        {item.category}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
