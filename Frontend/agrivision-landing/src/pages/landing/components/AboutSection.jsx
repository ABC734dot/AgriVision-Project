import './AboutSection.css'

const stats = [
  { value: '4,800+', label: 'Fields in our training data' },
  { value: '94%', label: 'Model confidence on matched soil profiles' },
  { value: '12', label: 'Regions across 3 countries' },
]

const steps = [
  {
    num: '01',
    title: 'We read your field',
    body: 'Soil moisture, pH, nitrogen, and rainfall forecasts — pulled from sensors or entered manually.',
  },
  {
    num: '02',
    title: 'The model finds the match',
    body: 'Your readings are compared against thousands of similar fields and seasons to rank crops by fit.',
  },
  {
    num: '03',
    title: 'You get a ranked call',
    body: 'Not one verdict — a ranked list, with the reasoning shown, so you decide with the full picture.',
  },
]

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-intro">
        <span className="section-label">About AgriVision</span>
        <h2>
          Built because farming decisions deserve <em>better than a guess.</em>
        </h2>
        <p className="about-mission">
          Most crop choices are still made on instinct, habit, or whatever
          worked last year — even as rainfall patterns and soil health keep
          shifting under them. AgriVision exists to put real field data
          behind that decision, without asking a farmer to become a data
          scientist to use it. We started with a few fields in Punjab and
          built outward, region by region, keeping the model grounded in
          actual harvests, not just lab conditions.
        </p>
      </div>

      <div className="about-stats">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="about-steps">
        {steps.map((step) => (
          <div className="step-card" key={step.num}>
            <span className="step-num">{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}