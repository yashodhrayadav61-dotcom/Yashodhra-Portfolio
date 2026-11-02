import React, { useState } from 'react'
import { personal } from '../../data/content'
import './Contact.css'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (_) {
      window.location.href = `mailto:${personal.email}`
    }
  }

  return (
    <section id="contact" className="contact section section--charcoal" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__inner">

          {/* Headline */}
          <div className="contact__headline">
            <span className="section-label contact__label">Let's Talk</span>
            <h2
              id="contact-heading"
              className="display contact__heading"
            >
              <span className="contact__heading-line">Let's Create</span>
              <span className="contact__heading-line contact__heading-line--accent serif">
                Something Meaningful.
              </span>
            </h2>
          </div>

          {/* Links */}
          <div className="contact__links">
            {/* Email */}
            <div className="contact__email-wrap">
              <button
                className="contact__email"
                onClick={handleEmailCopy}
                aria-label={`Copy email address ${personal.email} to clipboard`}
              >
                <span className="contact__email-text">{personal.email}</span>
                <span className="contact__email-action caption">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>

            <div className="contact__socials">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                aria-label="Yashodhra Yadav on LinkedIn"
              >
                <span className="contact__social-platform caption">LinkedIn</span>
                <span className="contact__social-handle body-sm">
                  Yashodhra Yadav
                </span>
                <span className="contact__social-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                aria-label="Yashodhra Yadav on GitHub"
              >
                <span className="contact__social-platform caption">GitHub</span>
                <span className="contact__social-handle body-sm">
                  yashodhrayadav61-dotcom
                </span>
                <span className="contact__social-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="contact__footer" role="contentinfo">
          <p className="caption text-muted">
            Yashodhra Yadav · Portfolio 2026 · {personal.location}
          </p>
          <div className="contact__footer-links">
            <a href="#top" className="contact__footer-link caption text-muted"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Back to top
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
