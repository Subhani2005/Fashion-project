import { philosophy } from '../../data/site'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'

export default function Philosophy() {
  return (
    <section className="section philosophy" id="philosophy">
      <div className="container">
        <div className="philosophy__head">
          <Reveal as="p" className="eyebrow eyebrow--row" y={10}>
            (07) — Our approach
          </Reveal>
          <h2 className="philosophy__statement h1">
            <SplitText text="Timeless is not" />
            <br />
            <span className="italic">
              <SplitText text="a style." delay={0.06} />
            </span>{' '}
            <SplitText text="It is a decision." delay={0.14} />
          </h2>
        </div>

        <div className="philosophy__grid">
          {philosophy.map((item, index) => (
            <Reveal className="philosophy__item" key={item.index} delay={index * 0.08}>
              <span className="philosophy__index">{item.index}</span>
              <h3 className="philosophy__title">{item.title}</h3>
              <p className="philosophy__body">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
