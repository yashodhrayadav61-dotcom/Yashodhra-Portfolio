import React, { useEffect, useState, useRef } from 'react'
import './ResumeViewer.css'

export default function ResumeViewer({ isOpen, onClose }) {
  const [pdfExists, setPdfExists] = useState(false)
  const [checking, setChecking] = useState(true)
  const closeBtnRef = useRef(null)
  const resumeUrl = '/assets/resume/Yashodhra_Yadav_Resume.pdf'
  const resumeFilename = 'Yashodhra_Yadav_Resume.pdf'

  // Check if PDF is available in public/assets/resume/
  useEffect(() => {
    if (!isOpen) return

    let cancelled = false
    setChecking(true)

    fetch(resumeUrl, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return
        // Check for 200 OK and that it didn't return an HTML SPA fallback
        const contentType = res.headers.get('content-type') || ''
        const isPdf = res.ok && (contentType.includes('pdf') || contentType.includes('octet-stream'))
        setPdfExists(isPdf)
      })
      .catch(() => {
        if (!cancelled) setPdfExists(false)
      })
      .finally(() => {
        if (!cancelled) setChecking(false)
      })

    return () => {
      cancelled = true
    }
  }, [isOpen])

  // ESC key handler, focus trap, and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 60)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="resume-viewer__backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-viewer-title"
    >
      <div
        className="resume-viewer__window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <header className="resume-viewer__header">
          <div className="resume-viewer__title-group">
            <span className="resume-viewer__kicker caption">
              Curriculum Vitae · 2026
            </span>
            <h2 id="resume-viewer-title" className="resume-viewer__title display">
              Yashodhra Yadav
            </h2>
          </div>

          <div className="resume-viewer__actions">
            {/* Open in New Tab */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-viewer__tab-btn caption"
              title="Open resume PDF in new browser tab"
            >
              <span>Open in Tab</span>
              <span className="resume-viewer__btn-arrow" aria-hidden="true">↗</span>
            </a>

            {/* Download Resume Button */}
            <a
              href={resumeUrl}
              download={resumeFilename}
              className="resume-viewer__download-btn caption"
              title="Download resume PDF"
            >
              <span>Download Resume</span>
              <span className="resume-viewer__btn-icon" aria-hidden="true">↓</span>
            </a>

            {/* Close Button */}
            <button
              ref={closeBtnRef}
              type="button"
              className="resume-viewer__close-btn"
              onClick={onClose}
              aria-label="Close resume viewer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="resume-viewer__body">
          {pdfExists ? (
            <div className="resume-viewer__frame-wrap">
              <object
                data={`${resumeUrl}#toolbar=0&navpanes=0`}
                type="application/pdf"
                className="resume-viewer__iframe"
              >
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0`}
                  title="Yashodhra Yadav Resume PDF"
                  className="resume-viewer__iframe"
                >
                  <div className="resume-viewer__fallback">
                    <p className="body-sm text-cream">
                      Your browser does not support embedded PDF viewing.{' '}
                      <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                        Open the resume in a new tab
                      </a>.
                    </p>
                  </div>
                </iframe>
              </object>
            </div>
          ) : (
            <div className="resume-viewer__placeholder">
              <div className="resume-viewer__placeholder-card">
                <div className="resume-viewer__placeholder-icon" aria-hidden="true">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>

                <span className="resume-viewer__placeholder-kicker caption">
                  Dedicated Resume Destination
                </span>

                <h3 className="resume-viewer__placeholder-title display display--md text-cream">
                  Resume Viewer Ready
                </h3>

                <p className="resume-viewer__placeholder-desc body-sm text-muted">
                  The viewer and navigation are configured and ready to present your resume.
                  Place your final PDF document in the dedicated directory:
                </p>

                <div className="resume-viewer__path-box">
                  <span className="resume-viewer__path-label caption">Target Location:</span>
                  <code className="resume-viewer__path-code">
                    public/assets/resume/Yashodhra_Yadav_Resume.pdf
                  </code>
                </div>

                <div className="resume-viewer__placeholder-actions">
                  <a
                    href={resumeUrl}
                    download={resumeFilename}
                    className="resume-viewer__download-btn caption"
                  >
                    <span>Download Resume</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-viewer__tab-btn caption"
                  >
                    <span>Open in New Tab</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

