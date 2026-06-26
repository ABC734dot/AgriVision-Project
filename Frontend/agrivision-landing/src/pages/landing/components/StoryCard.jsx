import './StoryCard.css'

export default function StoryCard({ story }) {
  const { region, title, sub, img } = story

  return (
    <div className="story-card" tabIndex={0}>
      <img src={img} alt={title} loading="lazy" />
      <div className="card-shade" />
      <div className="play-badge">
        <svg viewBox="0 0 24 24" fill="#F2E8D5">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div className="card-info">
        <span className="card-region">{region}</span>
        <div className="card-title">{title}</div>
        <div className="card-sub">{sub}</div>
      </div>
    </div>
  )
}
