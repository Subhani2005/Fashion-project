import Newsletter from '../ui/Newsletter'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'

export default function NewsletterBlock() {
  return (
    <section className="section newsletter-block">
      <div className="container">
        <div className="newsletter-block__inner">
          <div className="newsletter-block__title">
            <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
              (08) — Correspondence
            </Reveal>
            <h2 className="h1">
              <SplitText text="Letters from" />
              <br />
              <span className="italic">
                <SplitText text="the atelier." delay={0.06} />
              </span>
            </h2>
          </div>

          <Reveal className="newsletter-block__body" delay={0.12}>
            <p className="lede">
              First looks at each collection, notes on fabric and craft, and invitations to private
              appointments in Antwerp. No more than six letters a year.
            </p>
            <Newsletter />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
