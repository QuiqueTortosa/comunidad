import React from 'react'
import votes from '../../services/votes'
import {  getMessages } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Prueba() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user0 = useSelector(state => state.USERS.find(u => u._id == state.auth.user.id))
  const user1 = useSelector(state => state.auth.user)
  const user = user0 ? user0 : user1
  const poll = useSelector(state => state.VOTACIONES[state.VOTACIONES.length - 1])
  const post = useSelector(state => state.POSTS[3])
  let data = null;

  const color = () => {
    return (
      '#' +
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
  };


  if(poll){
    data = {
      datasets: [
        {
          label: poll.question,
          data: poll.options.map(option => option.votes),
          backgroundColor: poll.options.map(() => color()),
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
  }

  const handleSelect = (id) => {
    dispatch(getMessages(id));
    navigate(`/noticias/${id}`);
  }; 

  console.log(post)
  return (
    <div className='flex flex-row justify-center justify-items-center h-full xl:flex-col xl:h-auto'>
        <div className='flex flex-col items-center w-full h-full'>
           <div className='flex flex-col shadow-3xl p-16 w-auto h-5/6 m-9 rounded-xl bg-white lg:h-auto lg:w-4/6 lg:p-5'>
              <div className="flex justify-center mb-3">
                <img className="w-32 h-32 mr-2 rounded-full" src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
              </div>
              <div className='flex flex-col lg:pl-4'>
                <h1 className='mb-2 italic'><strong>Bienvenido {user.username}</strong></h1>
                <p><strong>Usuario: </strong>{user.username}</p>
                <p><strong>Email: </strong>{user.email}</p>
                <p><strong>Número de mensajes: </strong>{user1.messages ? user1.messages.length : "Hola"}</p>
                <p><strong>Rol: </strong>{user.roles[0].name}</p>
              </div>
          </div>
        </div>
        <div className='flex flex-col items-center w-full h-full'>
          { post &&
          <div className='flex flex-row items-center shadow-3xl w-auto h-2/6 m-9 rounded-xl bg-white lg:flex-col lg:w-4/6 xl:my-1'>
              <div className='w-3/6 h-full rounded-xl lg:w-full'>
                <img className='h-full rounded-l-xl lg:w-full lg:rounded-t-xl lg:rounded-none' src={post.selectedFile} alt="Loading" />
              </div>
              <div className='flex flex-col w-3/6 p-2 text-center justify-evenly lg:w-5/6'>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{post.title}</h5>
                  <div className="mb-3 font-normal text-gray-700 break-words lg:hidden" dangerouslySetInnerHTML={{__html:`${post.post.substring(0,55)}...`}} />
                  <div className="hidden mb-3 font-normal text-gray-700 break-words lg:flex" dangerouslySetInnerHTML={{__html:`${post.post.substring(0,155)}...`}} />
                  <div className="flex justify-center">
                    <button onClick={() => handleSelect(post._id)} className="bg-blue-900 text-white w-32 px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
                    Leer mas...
                  </button>
                 </div>
              </div>
          </div>
          }
          { poll &&
           <div className='flex flex-row justify-between shadow-3xl w-auto h-2/6 m-9 rounded-xl bg-white lg:flex-col lg:w-4/6 lg:items-center '>
            <div className="flex mx-4 items-center h-auto w-2/6">
              <Doughnut data={data} />
            </div>
            <div className='flex flex-col justify-center align-middle'>
              <div>
                <p><strong>{poll.question}</strong></p>
              </div>
              <div>
                {
                poll.options.map((option, index) => (
                  <h1>{index+1}. {option.name}</h1>
                ))
                }
              </div>
            </div>
            <div className='flex flex-col justify-end mr-4 mb-4 lg:mt-4'>
              <button className="bg-blue-900 text-white h-8 w-16 px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Ir</button>
            </div>
           </div>
          }
        </div>
    </div>
  )
}


/*
            <div className='flex flex-col shadow-3xl p-16 w-auto h-5/6 m-10 rounded-xl bg-white'>
                <div className="flex justify-center mb-3">
                    <img className="w-32 h-32 mr-2 rounded-full" src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                  </div>
                  <h1 className='mb-2 italic'><strong>Bienvenido {user.username}</strong></h1>
                  <p><strong>Usuario: </strong>{user.username}</p>
                  <p><strong>Email: </strong>{user.email}</p>
                  <p><strong>Número de mensajes: </strong>{user0.messages.length}</p>
                  <p><strong>Rol: </strong>{user.roles[0].name}</p>
            </div>
*/