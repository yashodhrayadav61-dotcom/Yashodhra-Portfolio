import React, { useEffect, useState, useRef } from 'react'
import { projects } from '../../data/content'
import './Projects.css'

export default function Projects() {
  const [activeRowId, setActiveRowId] = useState(null)
  const projectsRef = useRef(null)

  useEffect(() => {
    const loadAnim = async () => {
      try {
        const { initSectionReveal } = await import('../../animations/scrollAnimations')
        initSectionReveal('.project-entry__reveal', { stagger: 0.15 })
      } catch (_) {}
    }
    loadAnim()
  }, [])

  // Close active project on click outside (mobile touch)
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (projectsRef.current && !projectsRef.current.contains(e.target)) {
        setActiveRowId(null)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  const handleRowClick = (project) => {
    if (!project.link) return

    // On touch devices without hover, first tap reveals "VIEW PROJECT ↗"
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) {
      if (activeRowId !== project.id) {
        setActiveRowId(project.id)
        return
      }
    }

    // Direct open on desktop click or second tap on mobile
    window.open(project.link, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="projects section section--light"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="projects__header">
          <div className="projects__meta-row">
            <span className="section-label" style={{ color: 'var(--coral)' }}>Work</span>
          </div>
          <h2 id="projects-heading" className="display display--xl projects__heading text-dark">
            Selected<br />Projects
          </h2>
        </div>

        {/* Project List */}
        <div className="projects__list" role="list">
          {projects.map((project, index) => {
            const hasLink = Boolean(project.link)
            const isActive = activeRowId === project.id

            return (
              <article
                key={project.id}
                role="listitem"
                tabIndex={hasLink ? 0 : undefined}
                className={`project-entry project-entry__reveal ${
                  hasLink ? 'project-entry--link' : 'project-entry--disabled'
                } ${isActive ? 'project-entry--active' : ''} ${
                  project.featured ? 'project-entry--featured' : ''
                }`}
                onClick={() => handleRowClick(project)}
                onKeyDown={(e) => {
                  if (hasLink && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    window.open(project.link, '_blank', 'noopener,noreferrer')
                  }
                }}
                aria-label={`${project.title} — ${project.subtitle}${
                  hasLink ? ' (Click or tap to view project repository)' : ''
                }`}
              >
                {/* Index */}
                <span className="project-entry__index caption text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Main Content */}
                <div className="project-entry__content">
                  <div className="project-entry__meta">
                    <h3
                      id={`project-${project.id}-title`}
                      className="project-entry__title display display--md text-dark"
                    >
                      {project.title}
                    </h3>
                    <span className="project-entry__subtitle caption text-muted">
                      {project.subtitle}
                    </span>
                  </div>

                  <p className="project-entry__desc body-sm" style={{ color: 'rgba(25,23,25,0.75)' }}>
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <ul className="project-entry__tech" aria-label="Technologies used">
                      {project.technologies.map((tech) => (
                        <li key={tech} className="project-entry__tech-tag caption">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Right Side: Status, Year & Contextual VIEW PROJECT ↗ Button */}
                <div className="project-entry__action">
                  <div className="project-entry__meta-info">
                    <span
                      className={`project-entry__status caption ${
                        project.status === 'Completed' ? 'project-entry__status--done' : ''
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="project-entry__year caption text-muted">
                      {project.year}
                    </span>
                  </div>

                  {hasLink ? (
                    <div className="project-entry__cta-wrap">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-entry__btn caption"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        aria-label={`View ${project.title} project repository in new tab`}
                      >
                        <span className="project-entry__btn-text">VIEW PROJECT</span>
                        <span className="project-entry__btn-arrow" aria-hidden="true">↗</span>
                      </a>
                    </div>
                  ) : (
                    <span className="project-entry__coming caption text-muted">
                      Link coming soon
                    </span>
                  )}
                </div>

                {/* Left accent hairline on hover/active */}
                <div className="project-entry__line" aria-hidden="true" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
