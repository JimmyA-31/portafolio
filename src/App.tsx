import Navbar from './componentes/Navbar'
import Hero from './componentes/Hero'
import TechTicker from './componentes/Tech'
import About from './componentes/About'
import Proyectos from './componentes/Proyectos'
import Skills from './componentes/Skills'
import Experience from './componentes/Experiencia'
import Contacto from './componentes/Contacto'
import Footer from './componentes/Footer'


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
