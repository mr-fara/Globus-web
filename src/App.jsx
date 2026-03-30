import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Branches from './components/sections/Branches'
import Product from './components/sections/Product'
import Intro from './components/sections/Intro'
import VideoReferences from './components/sections/VideoReferences'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import BusinessEcosystem from './components/sections/BusinessEcosystem'
import Earnings from './components/sections/Earnings'

function App() {

  return (
      <div>
        <Navbar/>

        <main>
        <Hero/>
        <About/>
        <Earnings/>
        <BusinessEcosystem/>
        <Branches/>
        <Product/>
        <Intro/>
        <VideoReferences/>
        <Testimonials/>
        <Contact/>
        </main>

        <Footer/>
      </div>
  )
}

export default App
