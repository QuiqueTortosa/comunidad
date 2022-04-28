import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getUsers, deleteUser, setCurrentUser, changePassword, addError } from "../store/actions";
import FileBase from 'react-file-base64'
import bcrypt from "bcryptjs";
import * as FaIcons from "react-icons/fa";

const Modal = ({ setModalOn }) => {

    const dispatch = useDispatch();
    //const user2 = useSelector(state => state.USERS.find(u => u._id == state.auth.user.id))
    const [resetPassword, setResetPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [password_, setPassword_] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const user = useSelector(state => state.auth.user)
    const [userData, setUserData] = useState({
        email: user.email,
        username: user.username,
        selectedFile: user.selectedFile,
        roles: user.roles
      });
    const [file, setFile] = useState()
    console.log(user)
    
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if(!resetPassword) {
                setModalOn(false)
                console.log("Usuario:");
                console.log(userData);      
                dispatch(updateUser(user._id, userData));
                dispatch(setCurrentUser({
                            ...user,
                            email: userData.email,
                            username: userData.username,
                            selectedFile: userData.selectedFile,
                }))
            }else {
                if(newPassword === confirmPassword) {
                    dispatch(changePassword(user._id,{password: password_, newPassword: newPassword}))
                }else {
                    dispatch(addError(1,"Las contraseñas no coinciden"))
                }
                setResetPassword(!resetPassword)
            }
           dispatch(getUsers());
          } catch (err) {
            console.error(err);
          }
    }

    const clear = () => {
        setUserData({
            email: user.email,
            username: user.username,
            roles: user.roles
        })
        console.log(file)
        setModalOn(false)
    }

    return (

        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center  bg-white py-12 px-24 border-4 border-sky-900 rounded-xl items-center">
                    { !resetPassword ?
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-3">
                            <img className="w-32 h-32 mr-2 rounded-full" src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="email" defaultValue={resetPassword ? "" : user.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="email" class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                            <input type="text" defaultValue={resetPassword ? "" : user.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_username" className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                        </div>                    
                       <div>
                            <FileBase
                                type="file"
                                multiple={false} //Solo permite un archivo
                                onDone={({base64}) => setUserData({...userData, selectedFile: base64})}
                            />
                       </div>
                       <button type="button" onClick={() => setResetPassword(!resetPassword)} className="hidden bg-blue-900 text-white mt-3 px-2  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1 md:flex">
                                Cambiar contraseña
                        </button>
                       <div>
                        <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Guardar</button>
                        <button
                                type="button"
                                class="bg-red-600 text-white mt-3 ml-3 px-4 py-1 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1"
                                onClick={() => {
                                    clear();
                                }}
                            >
                                Cerrar
                            </button>
                            <button type="button" onClick={() => setResetPassword(!resetPassword)} className="bg-blue-900 text-white ml-3 px-2  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1 md:hidden">
                                Cambiar contraseña
                            </button>
                        </div>
                    </form>
                    :
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-3">
                            <img className="w-32 h-32 mr-2 rounded-full" src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                        </div>
                        <input className="hidden"></input>
                        <input className="hidden"></input>
                        <div className="flex relative z-0 mb-6 w-full group items-end">
                            <input type={showPassword ? "text" : "password"} onChange={(e) =>  {setPassword_(e.target.value)}}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
                            <FaIcons.FaEye className={`ml-2 ${showPassword ? "" : "opacity-40"}`} onClick={() => setShowPassword(!showPassword)}/>
                        </div>
                        <div className="flex relative z-0 mb-6 w-full group items-end">
                            <input type={showNewPassword ? "text" : "password"} onChange={(e) => {setNewPassword(e.target.value)}}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nueva Contraseña</label>
                            <FaIcons.FaEye className={`ml-2 ${showNewPassword ? "" : "opacity-40"}`} onClick={() => setShowNewPassword(!showNewPassword)}/>
                        </div>     
                        <div className="flex relative z-0 mb-6 w-full group items-end">
                            <input type={showConfirmPassword ? "text" : "password"}  onChange={(e) => {setConfirmPassword(e.target.value)}} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar Contraseña</label>
                            <FaIcons.FaEye className={`ml-2 ${showConfirmPassword ? "" : "opacity-40"}`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
                        </div>                
                       <button type="button" onClick={() => setResetPassword(!resetPassword)} className="hidden bg-blue-900 text-white mt-3 px-2  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1 md:flex">
                             Cancelar
                        </button>
                       <div>
                        <button className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Guardar</button>
                        <button
                                type="button"
                                class="bg-red-600 text-white mt-3 ml-3 px-4 py-1 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1"
                                onClick={() => {
                                    clear();
                                }}
                            >
                                Cerrar
                            </button>
                            <button type="button" onClick={() => setResetPassword(!resetPassword)} className="bg-blue-900 text-white ml-3 px-2  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1 md:hidden">
                                Cancelar
                            </button>
                        </div>
                    </form>
                    }
                </div>
            </div>
        </div>

    );
}

export default Modal