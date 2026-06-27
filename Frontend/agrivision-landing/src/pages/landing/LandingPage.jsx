import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'
import Hero from './components/Hero.jsx'
import FieldRows from './components/FieldRows.jsx'
import TurnSection from './components/TurnSection.jsx'
import AboutSection from './components/AboutSection.jsx'

export default function LandingPage({ onLoginClick }) {
  const scrollToStories = () => {
    document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header onProfileClick={onLoginClick} />
      <Hero onTurnClick={onLoginClick} onWatchStoriesClick={scrollToStories} />
      <FieldRows />
      <TurnSection onTurnClick={onLoginClick} onLoginClick={onLoginClick} />
      {/* <TurnSection onTurnClick={onLoginClick} onLoginClick={onLoginClick} /> */}
      <AboutSection />

      <Footer />
    </>
  )
}
