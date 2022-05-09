import React, { useState } from "react";
import { authUser } from "../../store/actions";
import { useDispatch } from "react-redux";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";


export default function Auth() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const credentials = {
        email: username,
        password: password,
      };
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
        <div className="relative h-4 flex justify-center -top-[150px]">
           <img className="h-32 w-32 rounded-full m-2 border-2" src="images/descarga.png"></img>
        </div>
        <div className="max-w-[212px] ml-[38px] max-h-[75px]">
          <div className="relative flex flex-col justify-center rounded-lg bg-cyan-700  w-8 h-8  top-10 right-10">
            <IoIcons.IoMdMail className="relative pointer-events-none w-6 h-6 ml-1 text-white"/>
         </div>
         <div className="relative z-0 mb-6 w-full group">
            <input type="text" defaultValue="" onChange={(e) => setUsername(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div> 
        </div>
        <div className="max-w-[212px] ml-[38px] max-h-[100px]">
          <div className="relative flex flex-col justify-center rounded-lg bg-cyan-700  w-8 h-8  top-10 right-10">
              <IoIcons.IoMdKey className="relative pointer-events-none w-6 h-6 ml-1 text-white"/>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type={showPassword ? "text" : "password"} defaultValue="" onChange={(e) => setPassword(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
          </div>  
          <FaIcons.FaEye className={`relative ml-2 -top-12 left-[210px] ${showPassword ? "" : "opacity-40"}`} onClick={() => setShowPassword(!showPassword)}/>
        </div>
        <button className="bg-cyan-700 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-cyan-900 transition-all  active:transform active:translate-y-1">
          Login
        </button>
      </form>
    </div>
  );
}
