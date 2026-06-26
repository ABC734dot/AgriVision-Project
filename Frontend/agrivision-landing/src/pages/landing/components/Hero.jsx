import ScanReadout from './ScanReadout.jsx'
import './Hero.css'

export default function Hero({ onTurnClick, onWatchStoriesClick }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-drone-shot-of-a-green-field-2633/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow">
          <span className="dot" /> Live field intelligence
        </span>
        <h1>
          Know what to plant <em>before</em> the season tells you.
        </h1>
        <p className="lede">
          AgriVision reads your soil, climate, and season in real time — then
          recommends the crop most likely to thrive on your land, backed by
          data from thousands of farms like yours.
        </p>

        <div className="cta-row">
          <button className="cta-primary" onClick={onTurnClick}>
            Now it&apos;s your turn
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
          <div className="cta-secondary" onClick={onWatchStoriesClick}>
            <span className="play-circle">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch farmer stories
          </div>
        </div>
      </div>

      <ScanReadout />

      <div className="scroll-cue">
        <span className="line" /> Scroll to explore
      </div>
    </section>
  )
}
