import React, {useState} from 'react'
import ActualizarDisc from './ActualizarDisc'
import CreateDiscussion from './CreateDiscussion'

export default function ForoGestion() {
    const [vistaCrear,setVistaCrear] = useState(true) 
  return (
    <div className='my-5 mx-16'>
        <div className='flex gap-4'>
            <button onClick={() => setVistaCrear(true)} className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Crear</button>
            <button onClick={() => setVistaCrear(false)} className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Actualizar</button>
        </div>
        <div>
            { vistaCrear ? <CreateDiscussion/> : <ActualizarDisc/>}
        </div>
    </div>
  )
}
