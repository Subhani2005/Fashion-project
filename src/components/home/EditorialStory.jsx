import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../../data/products'
import Reveal, { ParallaxImage } from '../ui/Reveal'
import SplitText from '../ui/SplitText'

export default function EditorialStory() {
  return (
    <section className="story on-dark" id="story">
      <div className="story__inner">
        <div className="story__text">
          <Reveal as="p" className="eyebrow eyebrow--dark eyebrow--row" y={10}>
            (05) — The campaign
          </Reveal>

          <h2 className="story__title display">
            <SplitText text="BEYOND" />
            <br />
            <span className="italic">
              <SplitText text="THE ORDINARY" delay={0.08} />
            </span>
          </h2>

          <Reveal className="story__copy" delay={0.15}>
            <p>
              Photographed over two mornings in Antwerp, between the harbour and the empty winter
              gardens. No stylists, no set — only the pieces, the light, and a little patience.
            </p>
            <p>
              The collection began with a single coat and the question of how little it could carry.
              Everything since has answered that question in wool, silk and leather.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <Link to="/about" className="btn btn--outline-light">
              <span>
                Discover more
                <ArrowRight size={15} strokeWidth={1.5} />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="story__media-wrap">
          <ParallaxImage
            src={IMAGES.story}
            alt="A woman in a flowing dress descending a dark stone staircase"
            className="story__media"
            strength={46}
          />
          <Reveal className="story__caption" delay={0.2} y={14}>
            <span>Campaign AW26</span>
            <span>Antwerp, Belgium</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
