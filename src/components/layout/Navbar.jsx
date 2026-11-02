import React, { useState, useEffect, useRef } from 'react'
import '../../styles/components.css'

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (!navRef.current?.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [menuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: 'About',      href: '#about' },
    { label: 'Work',       href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume',     href: '/assets/resume/Yashodhra_Yadav_Resume.pdf', isResume: true },
    { label: 'Contact',    href: '#contact' },
  ]

  const handleLinkClick = (e, link) => {
    if (link.isResume) {
      e.preventDefault()
      setMenuOpen(false)
      if (typeof onOpenResume === 'function') {
        onOpenResume()
      }
      return
    }

    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(link.href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <a href="#top" className="navbar__wordmark" aria-label="Yashodhra Yadav — Portfolio Home">
        Y<span>.</span>Y — <span>Portfolio 2026</span>
      </a>

      <nav className={`navbar__nav ${menuOpen ? 'is-open' : ''}`} role="navigation" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`navbar__link ${link.isResume ? 'navbar__link--resume' : ''}`}
            onClick={(e) => handleLinkClick(e, link)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className="navbar__menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <span style={{ transform: menuOpen ? 'translateY(6px) rotate(45deg)' : '' }} />
        <span style={{ opacity: menuOpen ? 0 : 1 }} />
        <span style={{ transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : '' }} />
      </button>
    </header>
  )
}
