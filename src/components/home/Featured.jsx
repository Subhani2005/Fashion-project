import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import Reveal from '../ui/Reveal'

export default function Featured() {
  const featured = products.filter((product) => product.featured).slice(0, 4)

  return (
    <section className="section featured">
      <div className="container">
        <div className="featured__head">
          <div>
            <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
              (04) — Selected pieces
            </Reveal>
            <h2 className="h2 featured__title">
              The <span className="italic">edit.</span>
            </h2>
          </div>
          <Reveal className="featured__aside" delay={0.1}>
            <p className="lede">
              Four pieces we return to. Each is available in limited runs and restocked only when
              the fabric allows.
            </p>
            <Link to="/collections" className="link-arrow">
              View all pieces
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>

        <div className="product-grid product-grid--featured">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.07} y={32}>
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal className="featured__foot" y={16}>
          <p>
            Complimentary shipping and returns on all orders over €250. Pieces can be repaired by
            our atelier for as long as you own them.
          </p>
          <Link to="/about" className="link-arrow">
            Our approach
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
