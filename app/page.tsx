import Carousel from '../components/Carousel/Carousel'
import FeatureButtons from '../components/FeatureButton/FeatureButtons'

export default function HomePage() {
  return (
    <section>
      <h1>Welcome to SkywardAI</h1>
      <p>Your one-stop destination for innovative AI solutions.</p>
      <FeatureButtons />
      <Carousel />
    </section>
  )
}
