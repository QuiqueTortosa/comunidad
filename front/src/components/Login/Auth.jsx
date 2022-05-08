import React, { useState } from "react";
import { authUser } from "../../store/actions";
import { useDispatch } from "react-redux";


export default function Auth() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const credentials = {
        email: username,
        password: password,
      };
      console.log(credentials)
      dispatch(authUser(credentials));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-3xl">
      <form className="flex flex-col justify-center w-96 h-auto rounded-3xl p-16" onSubmit={handleLogin}>
        <div className="relative h-4 flex justify-center -top-[139px]">
           <img className="h-32 w-32 rounded-full m-2 border-2" src="images/descarga.png"></img>
        </div>
        <div className="relative z-0 mb-6 w-full group">
        <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
          <input type="text" defaultValue="" onChange={(e) => setUsername(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        </div>   
        <div class="relative z-0 mb-6 w-full group">
          <input type="text" defaultValue="" onChange={(e) => setPassword(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
        </div>  
        <button className="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
          Login
        </button>
      </form>
    </div>
  );
}
