import './Topbar.css'

export default function Topbar({
  name = 'Tanish',
  eyebrow = 'Rabi season · Week 2',
  title,
  subtitle = "Here's what your field is telling us right now.",
}) {
  return (
    <div className="topbar">
      <div>
        <span className="greeting">{eyebrow}</span>
        <h1>{title || `Welcome back, ${name}`}</h1>
        <p className="sub">{subtitle}</p>
      </div>
      <div className="season-badge">
        <span className="dot" /> Live soil feed connected
      </div>
    </div>
  )
}