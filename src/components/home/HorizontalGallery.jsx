import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../../data/products'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'

gsap.registerPlugin(ScrollTrigger)

const panels = [
  { image: IMAGES.campaign[0], label: 'Look 01', title: 'The shoulder, unlined' },
  { image: IMAGES.campaign[1], label: 'Look 02', title: 'Knitted weight' },
  { image: IMAGES.campaign[2], label: 'Look 03', title: 'Leather, softened' },
  { image: IMAGES.campaign[3], label: 'Look 04', title: 'A collar held high' },
  { image: IMAGES.campaign[4], label: 'Look 05', title: 'One uninterrupted line' },
  { image: IMAGES.campaign[5], label: 'Look 06', title: 'The everyday knit' },
]

export default function HorizontalGallery() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || window.innerWidth < 900) return undefined

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="h-gallery" ref={sectionRef} aria-label="Campaign gallery">
      <div className="h-gallery__track" ref={trackRef}>
        <div className="h-gallery__intro">
          <p className="eyebrow eyebrow--row">(06) — The gallery</p>
          <h2 className="h-gallery__title">
            <SplitText text="SIX STUDIES" />
            <br />
            <span className="italic">
              <SplitText text="IN FORM" delay={0.08} />
            </span>
          </h2>
          <p className="h-gallery__copy">
            The collection in sequence, shown as it was photographed. Scroll sideways through the
            season.
          </p>
          <Link to="/collections" className="link-arrow">
            See every piece
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        {panels.map((panel, index) => (
          <figure className="h-panel" key={panel.label}>
            <div className="h-panel__media">
              <img src={panel.image} alt={panel.title} loading="lazy" />
            </div>
            <figcaption className="h-panel__caption">
              <span>{panel.label}</span>
              <span>{panel.title}</span>
              <span className="h-panel__count">0{index + 1} / 06</span>
            </figcaption>
          </figure>
        ))}

        <Reveal className="h-gallery__end" y={20}>
          <p className="h-gallery__end-text">
            The full collection,
            <br />
            <em>in the atelier.</em>
          </p>
          <Link to="/collections" className="btn btn--outline">
            <span>
              Shop AW26
              <ArrowRight size={15} strokeWidth={1.5} />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
