import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IMAGES, productImages } from '../../data/products'
import Reveal, { ImageReveal } from '../ui/Reveal'
import SplitText from '../ui/SplitText'

const looks = [
  {
    id: '01',
    title: 'The Sculpted Coat',
    note: 'Italian wool, camel',
    to: '/product/aw26-01',
    image: productImages.coat,
    className: 'new-season__item--a',
  },
  {
    id: '02',
    title: 'Tailoring, softened',
    note: 'Blazers and wide-leg trousers',
    to: '/collections?category=women',
    image: IMAGES.seasonTall,
    className: 'new-season__item--b',
  },
  {
    id: '03',
    title: 'Quiet essentials',
    note: 'Cashmere and fine knits',
    to: '/collections?category=essentials',
    image: productImages.knitPortrait,
    className: 'new-season__item--c',
  },
]

export default function NewSeason() {
  return (
    <section className="section new-season" id="new-season">
      <div className="container">
        <div className="section-head">
          <div className="section-head__title">
            <Reveal as="p" className="eyebrow eyebrow--row" y={12}>
              (01) — Autumn / Winter 2026
            </Reveal>
            <h2 className="h1 section-head__heading">
              <SplitText text="THE NEW" />
              <br />
              <span className="italic">
                <SplitText text="SEASON" delay={0.08} />
              </span>
            </h2>
          </div>

          <Reveal className="section-head__aside" delay={0.15}>
            <p className="lede">
              Twenty-two pieces built around a single idea: clothing that earns its place. Cut in
              Antwerp, made in Italy, finished by hand.
            </p>
            <Link to="/collections" className="link-arrow">
              Explore the collection
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>

        <div className="new-season__grid">
          {looks.map((look, index) => (
            <Reveal
              className={`new-season__item ${look.className}`}
              key={look.id}
              delay={index * 0.08}
              y={40}
            >
              <Link to={look.to} className="new-season__link" data-cursor="view" data-cursor-label="View">
                <ImageReveal src={look.image} alt={look.title} className="new-season__media" />
                <div className="new-season__caption">
                  <span className="new-season__index">{look.id}</span>
                  <div>
                    <h3 className="new-season__name">{look.title}</h3>
                    <p className="new-season__note">{look.note}</p>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.3} className="new-season__arrow" />
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal className="new-season__quote" delay={0.2} y={40}>
            <p className="new-season__quote-text">
              “We design for the <em>second</em> winter, not the first.”
            </p>
            <p className="new-season__quote-cite">M. De Smet — Creative Director</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
