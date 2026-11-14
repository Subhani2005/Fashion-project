import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { footerColumns, socials } from '../../data/site'
import Newsletter from '../ui/Newsletter'
import Reveal from '../ui/Reveal'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__statement">
              A quiet
              <br />
              <em>wardrobe.</em>
            </p>
            <p className="footer__blurb">
              Considered clothing made in small runs with family-run mills in Italy and Portugal.
              Designed to be worn often and kept for years.
            </p>
            <div className="footer__newsletter">
              <p className="footer__label">Letters from the atelier</p>
              <Newsletter variant="footer" />
            </div>
          </div>

          <div className="footer__columns">
            {footerColumns.map((column) => (
              <nav className="footer__col" key={column.title} aria-label={column.title}>
                <p className="footer__label">{column.title}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="footer__col footer__col--visit">
              <p className="footer__label">Visit</p>
              <p className="footer__address">
                Atelier Studio
                <br />
                Vlaamsekaai 14
                <br />
                2000 Antwerp, Belgium
              </p>
              <a className="footer__link" href="mailto:studio@atelier.example">
                studio@atelier.example
              </a>
              <div className="footer__socials">
                {socials.map((social) =>
                  social.href === '#' ? (
                    <Link key={social.label} to="/collections" className="footer__social">
                      {social.label}
                      <ArrowUpRight size={12} strokeWidth={1.6} />
                    </Link>
                  ) : (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer__social"
                    >
                      {social.label}
                      <ArrowUpRight size={12} strokeWidth={1.6} />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <Reveal className="footer__wordmark-wrap" y={18}>
          <p className="footer__wordmark" aria-hidden="true">
            ATELIER
          </p>
        </Reveal>

        <div className="footer__bottom">
          <span>© 2026 Atelier Studio. All rights reserved.</span>
          <span>Designed in Antwerp — Made in Italy</span>
          <span>EUR € / EN</span>
        </div>
      </div>
    </footer>
  )
}
