import React from 'react'
import votes from '../../services/votes'
import cookie from "js-cookie";
import { addError, setCurrentUser } from '../../store/actions';
import "./Prueba.css"


export default function Prueba() {

  const prueba = () => {
    console.log("Añadiendo cookie")
    cookie.set("token2", "aaaa")
  }
  
  const prueba3 = () => {
    console.log(cookie.get("token2"))
  }

  const prueba2 = () => {
    console.log("Borrando cookie")
    cookie.remove("token2")
  }

  if(cookie.get("token2")) {
    try{
    }catch(err) {

    }
  }

  return (
    <div className='divComponent'>
        <div>App Works</div>
        <button onClick={prueba}>SISISISI</button>
        <button onClick={prueba2}>NONONONO</button>
        <button onClick={prueba3}>Mostrar</button>
    </div>
  )
}

