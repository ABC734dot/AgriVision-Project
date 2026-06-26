import './TurnSection.css'

export default function TurnSection({ onTurnClick, onLoginClick }) {
  return (
    <section className="turn-section" id="turnSection">
      <div className="turn-rows" />
      <div className="turn-content">
        <span className="section-label">Your field is waiting</span>
        <h2>
          Stop guessing. <em>Start growing</em> with data on your side.
        </h2>
        <p>
          Enter your land&apos;s details once — soil type, location, and
          season — and get a ranked list of crops built for your exact
          field, not a national average.
        </p>
        <button className="turn-btn" onClick={onTurnClick}>
          Now it&apos;s your turn
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
        <p className="turn-footnote">
          Already scanning your fields?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onLoginClick()
            }}
          >
            Log in here
          </a>
        </p>
      </div>
    </section>
  )
}
