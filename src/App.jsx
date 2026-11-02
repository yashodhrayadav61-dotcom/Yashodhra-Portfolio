import React, { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import WhyWorkWithMe from './components/sections/WhyWorkWithMe'
import Projects from './components/sections/Projects'
import CreativeWork from './components/sections/CreativeWork'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import ResumeViewer from './components/ui/ResumeViewer'
import './styles/globals.css'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)

  // Listen for #resume hash to open viewer directly
  useEffect(() => {
    if (window.location.hash === '#resume') {
      setResumeOpen(true)
    }
    const onHashChange = () => {
      if (window.location.hash === '#resume') {
        setResumeOpen(true)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Initialise Lenis smooth scroll
  useEffect(() => {
    let lenis = null

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.9,
        })

        lenis.on('scroll', ScrollTrigger.update)

        const raf = (time) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch (err) {
        console.warn('Lenis not loaded, using native scroll:', err)
      }
    }

    initLenis()

    return () => {
      if (lenis) lenis.destroy()
    }
  }, [])

  return (
    <div className="portfolio" id="portfolio-root">
      <Navbar onOpenResume={() => setResumeOpen(true)} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <WhyWorkWithMe />
        <Projects />
        <CreativeWork />
        <Experience />
        <Contact />
      </main>

      {/* Dedicated Resume Viewer Modal */}
      <ResumeViewer
        isOpen={resumeOpen}
        onClose={() => {
          setResumeOpen(false)
          if (window.location.hash === '#resume') {
            history.replaceState(null, '', ' ')
          }
        }}
      />
    </div>
  )
}
