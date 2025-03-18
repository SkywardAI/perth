import '../style/global.css'
import Carousel from '../components/carousel/carousel'
import FeatureButtons from '../components/featureButton/featureButtons'

export default function HomePage() {
  return (
    <section className="home-container">
      <h1>Welcome to SkywardAI</h1>
      <p>Your one-stop destination for innovative AI solutions.</p>
      <FeatureButtons />
      <div className="carousel-wrapper">
        <Carousel />
      </div>
    </section>
  )
}
