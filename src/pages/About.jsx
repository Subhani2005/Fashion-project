import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Newsletter from '../components/ui/Newsletter'
import Reveal, { ParallaxImage } from '../components/ui/Reveal'
import SplitText from '../components/ui/SplitText'
import { IMAGES } from '../data/products'
import { philosophy } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

const care = [
  {
    id: 'shipping',
    title: 'Shipping',
    body: 'Orders are dispatched from Antwerp within one business day. Complimentary express delivery on orders over €250; €12 below that. EU delivery in 2–3 days, rest of world in 3–6 days, fully tracked.',
  },
  {
    id: 'returns',
    title: 'Returns',
    body: 'Return any piece within 30 days, unworn and with tags attached. Returns are complimentary within the EU. We will send a prepaid label and refund the original payment method within five days of receipt.',
  },
  {
    id: 'sizing',
    title: 'Size guide',
    body: 'Our pieces are cut true to size with a relaxed line. Womenswear runs XS–XL, menswear S–XXL. Outerwear is intended to layer — take your usual size, or one up if you wear a jacket underneath. Measurements for every style are available on request.',
  },
  {
    id: 'care',
    title: 'Care & repair',
    body: 'Every garment comes with care instructions woven into the label. We also repair what we make: send a piece back to the atelier and we will re-line, re-button or re-stitch it. Repairs are complimentary for the first two years.',
  },
  {
    id: 'contact',
    title: 'Contact',
    body: 'Client services are available Monday to Friday, 9–18 CET, at studio@atelier.example. Private appointments at the Antwerp studio can be booked by email.',
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: 'We collect only the information needed to fulfil an order and to send the letters you ask for. We never sell data. Wishlist and bag contents stay in your browser and are not transmitted to us.',
  },
  {
    id: 'terms',
    title: 'Terms',
    body: 'Prices are shown in euros and include VAT. This site is a demonstration project: no orders are processed and no payment details are collected or stored.',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    body: 'We aim to meet WCAG 2.2 AA. Animations respect the reduced-motion setting of your device, all interactive elements are keyboard accessible, and images carry descriptive alternative text.',
  },
]

export default function About() {
  useDocumentTitle('About')
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const element = document.getElementById(hash.replace('#', ''))
    if (element) {
      const timer = setTimeout(
        () => element.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        220,
      )
      return () => clearTimeout(timer)
    }
    return undefined
  }, [hash])

  return (
    <div className="about">
      <header className="about__header container">
        <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
          The house — Est. 2014
        </Reveal>
        <h1 className="about__title">
          <SplitText text="A quiet" />
          <br />
          <span className="italic">
            <SplitText text="wardrobe." delay={0.08} />
          </span>
        </h1>
        <Reveal className="about__intro" delay={0.2}>
          <p>
            Atelier is an independent house working between Antwerp and a small tailoring workshop
            outside Florence. We make one collection a year, in limited runs, from natural fibres.
          </p>
        </Reveal>
      </header>

      <Reveal className="about__hero" y={30}>
        <img src={IMAGES.aboutRail} alt="Garments in muted green and ivory hanging on a rail in the atelier" />
      </Reveal>

      <section className="section about__story">
        <div className="container about__story-inner">
          <div className="about__story-text">
            <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
              Our story
            </Reveal>
            <h2 className="h2">
              Started with one coat,
              <br />
              <span className="italic">and a refusal to hurry.</span>
            </h2>
            <Reveal delay={0.12}>
              <p className="lede">
                In 2014, our founder Marijke De Smet made a single camel coat for herself and wore
                it for eleven winters. Friends asked for one. Then a shop in Antwerp did.
              </p>
              <p className="lede">
                That coat is still the first piece of every collection. What has changed is the
                number of hands involved: four family-run mills, one tailoring house, and a
                finishing atelier that has worked with us since the beginning.
              </p>
              <p className="lede">
                We produce slowly and in small quantities — not as a marketing position, but because
                good fabric is finite and the people who make our clothes are not machines.
              </p>
            </Reveal>
          </div>

          <div className="about__story-media">
            <ParallaxImage
              src={IMAGES.aboutWorkshop}
              alt="Suit jacket on a mannequin in the tailoring workshop"
              className="about__story-image"
              strength={34}
            />
            <p className="about__caption">The workshop — Florence, Italy</p>
          </div>
        </div>
      </section>

      <section className="section about__values on-dark">
        <div className="container">
          <Reveal as="p" className="eyebrow eyebrow--dark eyebrow--row" y={10}>
            What we hold to
          </Reveal>
          <div className="about__values-grid">
            {philosophy.map((item, index) => (
              <Reveal className="about__value" key={item.index} delay={index * 0.08}>
                <span className="about__value-index">{item.index}</span>
                <h3 className="h3">{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about__care" id="client-care">
        <div className="container">
          <div className="about__care-head">
            <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
              Client care
            </Reveal>
            <h2 className="h2">
              The practical <span className="italic">particulars.</span>
            </h2>
          </div>

          <div className="about__care-grid">
            {care.map((item, index) => (
              <Reveal className="about__care-item" key={item.id} delay={(index % 3) * 0.06} id={item.id}>
                <h3 className="about__care-title">{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about__contact" id="contact">
        <div className="container about__contact-inner">
          <div>
            <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
              Visit & write
            </Reveal>
            <h2 className="h2">
              The studio is open
              <br />
              <span className="italic">by appointment.</span>
            </h2>
          </div>
          <Reveal className="about__contact-body" delay={0.1}>
            <p className="about__address">
              Atelier Studio
              <br />
              Vlaamsekaai 14
              <br />
              2000 Antwerp, Belgium
            </p>
            <a href="mailto:studio@atelier.example" className="link-arrow">
              studio@atelier.example
              <ArrowRight size={14} strokeWidth={1.5} />
            </a>
            <div className="about__newsletter">
              <p className="eyebrow">Letters from the atelier</p>
              <Newsletter />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container about__back">
        <Link to="/collections" className="btn btn--outline">
          <span>
            Explore the collection
            <ArrowRight size={15} strokeWidth={1.5} />
          </span>
        </Link>
      </div>
    </div>
  )
}
