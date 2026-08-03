import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import TechTicker from './components/Tech/Tech'
import About from './components/About/About'
import Proyectos from './components/Proyectos/Proyectos'
import Skills from './components/Skills/Skills'
import Experience from './components/Experiencia/Experiencia'
import Contacto from './components/Contacto/Contacto'
import Footer from './components/Footer/Footer'


function App() {
  //const [count, setCount] = useState(0)

 return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechTicker />
        <About />
        <Proyectos />
        <Skills />
        <Experience />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}

export default App
