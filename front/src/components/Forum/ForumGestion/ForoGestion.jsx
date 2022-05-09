import React, {useState} from 'react'
import ActualizarDisc from './ActualizarDisc'
import CreateDiscussion from './CreateDiscussion'

export default function ForoGestion() {
    const [vistaCrear,setVistaCrear] = useState(true) 
  return (
    <div className='my-5 mx-2  sm:mx-2'>
        <div className='flex gap-4 mb-4'>
            <button onClick={() => setVistaCrear(true)} className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Crear</button>
            <button onClick={() => setVistaCrear(false)} className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Actualizar</button>
        </div>
        <div className='shadow-3xl bg-white pt-4 pb-8 px-16 rounded-xl sm:px-4'>
            { vistaCrear ? <CreateDiscussion/> : <ActualizarDisc/>}
        </div>
    </div>
  )
}
