import Rail from './Rail.jsx'
import { featuredStories, regionStories } from '../data/stories.js'
import './FieldRows.css'

export default function FieldRows() {
  return (
    <section className="field-rows" id="stories">
      <div className="field-rows-intro">
        <span className="section-label">From the field</span>
        <h2>Real farms. Real seasons. Real recommendations that worked.</h2>
      </div>

      <Rail fieldNumber="01" title="Featured Harvests" stories={featuredStories} />
      <Rail fieldNumber="02" title="By Region" stories={regionStories} />
    </section>
  )
}
