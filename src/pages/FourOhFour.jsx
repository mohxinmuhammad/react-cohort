import { Link } from 'react-router-dom'
import './FourOhFour.css'

export default function FourOhFour() {
  return (
    <section
      className="four-oh-four"
      aria-labelledby="four-oh-four-title"
    >
      <span className="four-oh-four__glow" aria-hidden />
      <span className="four-oh-four__grid" aria-hidden />
      <div className="four-oh-four__inner">
        <p className="four-oh-four__eyebrow">Off the map</p>
        <h1 id="four-oh-four-title" className="four-oh-four__code">
          404
        </h1>
        <p className="four-oh-four__lead">
          This URL does not match any route. The page may have moved or the
          link could be mistyped.
        </p>
        <p className="four-oh-four__hint">
          Try the navigation above, or head back to a known good place.
        </p>
        <Link className="four-oh-four__btn" to="/">
          <span className="four-oh-four__btn-icon" aria-hidden>
            ←
          </span>
          Back to home
        </Link>
      </div>
    </section>
  )
}
