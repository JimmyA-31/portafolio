import {useState} from 'react'
//rafc
const Prueba = () => {
    
    const [contador, setContador] = useState(0)

  return (
    <div>

        <button onClick={() => setContador(contador >= 20 ? 0 : contador + 1)}>
            {contador<20 ? 'incrementar': 'reiniciar'} contador: {contador}
        </button>
    </div>

  )
}

export default Prueba