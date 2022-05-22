import React from 'react'
import {  getMessages, getCurrentPoll } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Home() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user0 = useSelector(state => state.USERS.find(u => u._id === state.auth.user.id))
  const user1 = useSelector(state => state.auth.user)
  const user = user0 ? user0 : user1
  const poll = useSelector(state => state.VOTACIONES[state.VOTACIONES.length - 1])
  const post = useSelector(state => state.POSTS[0])
  let dataOnGoing = null;

  const color = () => {
    return (
      '#' + 
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
  };


  if(poll){
   dataOnGoing = {
      datasets: [
        {
          label: "Votación en curso",
          data: [1],
          backgroundColor: "rgba(17,24,39,0.6)",
        },
      ],
    };
  }

  const txt = (p) => {
    if(p.substring(0,150).includes("img")){
      return p.substring(0,p.indexOf("<img")).concat(p.substring(p.indexOf('g">')+3, p.length))
    }else if(p.substring(0,150).includes("figure")){
      return p.substring(0,p.indexOf("<figure")).concat(p.substring(p.indexOf('re>')+3, p.length))
    }
    else {
      return p
    }
  }

  const handleSelectPost = (id) => {
    dispatch(getMessages(id));
    navigate(`/noticias/${id}`);
  }; 

  const handleSelectPoll = (id) => {
    dispatch(getCurrentPoll(id));
    navigate(`/votaciones/${poll._id}`);
  };
  return (
    <>
      <div className='flex flex-row justify-center justify-items-center h-full xl:flex-col xl:h-auto sm:hidden'>
          <div className='flex flex-col items-center w-full h-full '>
            <div className='flex flex-col shadow-3xl px-16 py-8 w-auto h-5/6 m-9 rounded-xl bg-white lg:h-auto lg:w-4/6 lg:p-5'>
                <div className="flex justify-center mb-3">
                  <img className="w-32 h-32 mr-2 rounded-full" src={user.selectedFile !== "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                </div>
                <div className='flex flex-col lg:pl-4'>
                  <h1 className='mb-2 italic'><strong>Bienvenido {user.username}</strong></h1>
                  <p><strong>Usuario: </strong>{user.username}</p>
                  <p><strong>Email: </strong>{user.email}</p>
                  <p><strong>Teléfono: </strong>{user.telefono}</p>
                  <p><strong>Dirección: </strong>{user.direccion}</p>
                  <p><strong>Número de mensajes: </strong>{user1.messages ? user1.messages.length : "Hola"}</p>
                  <p><strong>Rol: </strong>{user.roles[user.roles.length-1].name}</p>
                </div>
            </div>
          </div>
          <div className='flex flex-col items-center w-full h-full'>
            { post &&
            <div className='flex flex-row items-center shadow-3xl w-auto max-w-[400px] h-2/6 m-9 rounded-xl bg-white lg:flex-col lg:w-4/6 xl:max-w-[400px] xl:my-1'>
                <div className='w-3/6 h-full rounded-xl lg:w-full'>
                  <img className='h-full rounded-l-xl lg:w-full lg:rounded-t-xl lg:rounded-none xl:h-[150px] lg:max-h-[200px]' src={post.selectedFile} alt="Loading" />
                </div>
                <div className='flex flex-col w-3/6 p-2 text-center justify-evenly lg:w-5/6'>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title.substring(0,10)+"..."}</h5>
                    <div className="mb-3 font-normal text-gray-700 break-words lg:hidden" dangerouslySetInnerHTML={{__html:`${txt(post.post).substring(0,55)}...`}} />
                    <div className="hidden mb-3 font-normal text-gray-700 break-words lg:flex" dangerouslySetInnerHTML={{__html:`${txt(post.post).substring(0,155)}...`}} />
                    <div className="flex justify-center">
                      <button onClick={() => handleSelectPost(post._id)} className="bg-blue-900 text-white w-32 px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
                      Leer mas...
                    </button>
                  </div>
                </div>
            </div>
            }
            { poll &&
            <div className='flex flex-row justify-between shadow-3xl min-w-[400px] w-auto mx-5 max-h-[300px] max-w-[400px] h-2/6 m-9 rounded-xl bg-white md:min-w-[100px] lg:flex-col lg:w-4/6 lg:items-center '>
              <div className="flex mx-4 items-center h-auto w-2/6 min-w-[150px]">
                <Doughnut data={dataOnGoing} />
              </div>
              <div className='flex flex-col justify-center align-middle px-5'>
                <div>
                  <p><strong>{poll.question.length > 19 ? (poll.question.substring(0,20).concat("...") ) : poll.question}</strong></p>
                </div>
                <div>
                  {
                  poll.options.map((option, index) => (
                    <h1 key={index}>{index+1}. {option.name.length > 19 ? option.name.substring(0,20).concat("...") : option.name}</h1>
                  ))
                  }
                </div>
                
              </div>
              <div className='flex flex-col justify-end mr-4 mb-4 lg:mt-4'>
                <button onClick={() => handleSelectPoll(poll._id)} className="bg-blue-900 text-white h-8 w-16 px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Ir</button>
              </div>
            </div>
            }
          </div>
      </div>
          {
            // ************************** Version movil. 
          }

        <div className='hidden flex-row justify-center justify-items-center h-full xl:flex-col xl:h-auto sm:flex'>
          <div className='flex flex-col items-center w-full h-full '>
            <div className='flex flex-col shadow-3xl px-16 py-8 w-auto h-5/6 m-9 rounded-xl bg-white lg:h-auto lg:w-4/6 lg:p-5 sm:min-w-max'>
                <div className="flex justify-center mb-3">
                  <img className="w-32 h-32 mr-2 rounded-full" src={user.selectedFile !== "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                </div>
                <div className='flex flex-col lg:pl-4'>
                  <h1 className='mb-2 italic'><strong>Bienvenido {user.username}</strong></h1>
                  <p><strong>Usuario: </strong>{user.username}</p>
                  <p><strong>Email: </strong>{user.email}</p>
                  <p><strong>Teléfono: </strong>{user.telefono}</p>
                  <p><strong>Dirección: </strong>{user.direccion}</p>
                  <p><strong>Número de mensajes: </strong>{user1.messages ? user1.messages.length : "Hola"}</p>
                  <p><strong>Rol: </strong>{user.roles[user.roles.length-1].name}</p>
                </div>
            </div>
          </div>
          <div className='flex flex-col items-center w-full h-full'>
            { post &&
            <div className='flex flex-col shadow-3xl w-auto  h-5/6 m-4 rounded-xl bg-white max-w-max'>
                <div className='w-full h-full rounded-xl'>
                  <img className='h-full w-full rounded-t-xl rounded-b-none' src={post.selectedFile} alt="Loading" />
                </div>
                <div className='flex flex-col w-full p-2 text-center justify-evenly max-w-max'>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title.substring(0,10)+"..."}</h5>
                    <div className="flex mb-3 font-normal text-gray-700 break-words" dangerouslySetInnerHTML={{__html:`${txt(post.post).substring(0,155)}...`}} />
                    <div className="flex justify-center">
                      <button onClick={() => handleSelectPost(post._id)} className="bg-blue-900 text-white w-32 px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
                      Leer mas...
                    </button>
                  </div>
                </div>
            </div>
            }
            <div className='flex flex-col items-center w-full h-full m-4 px-4'>
            { poll &&
            <div className='flex flex-col shadow-3xl w-auto h-auto m-4 rounded-xl bg-white min-w-full max-w-max'>
            <div className="flex ml-9 mr-4 items-center h-auto w-2/6 min-w-[75%] justify-center align-middle">
                <Doughnut data={dataOnGoing} />
              </div>
              <div className='flex flex-col justify-center align-middle px-5 text-center'>
                <div>
                  <p><strong>{poll.question.length > 19 ? (poll.question.substring(0,20).concat("...") ) : poll.question}</strong></p>
                </div>
                <div>
                  {
                  poll.options.map((option, index) => (
                    <h1 key={index}>{index+1}. {option.name.length > 19 ? option.name.substring(0,20).concat("...") : option.name}</h1>
                  ))
                  }
                </div>
                
              </div>
              <div className="flex justify-center pb-5">
                <button onClick={() => handleSelectPoll(poll._id)} className="bg-blue-900 text-white h-8 w-16 px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Ir</button>
              </div>
            </div>
            }
            </div>
          </div>
      </div>
    </>
  )
}
