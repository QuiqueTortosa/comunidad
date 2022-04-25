import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getUsers, deleteUser, setCurrentUser } from "../store/actions";
import FileBase from 'react-file-base64'

const Modal = ({ setModalOn }) => {

    const dispatch = useDispatch();
    const user2 = useSelector(state => state.USERS.find(u => u._id == state.auth.user.id))
    const user = useSelector(state => state.auth.user)
    const [userData, setUserData] = useState({
        email: user.email,
        username: user.username,
        selectedFile: user.selectedFile,
        roles: user.roles
      });
    const [file, setFile] = useState()
    console.log(user)
    
    const handleSubmit = e => {
        setModalOn(false)
        e.preventDefault()
        try {
            console.log("Usuario:");
            console.log(userData);      
            dispatch(updateUser(user._id, userData));
            dispatch(setCurrentUser({
                        ...user,
                        email: userData.email,
                        username: userData.username,
                        selectedFile: userData.selectedFile,
            }))
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

        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center  bg-white py-12 px-24 border-4 border-sky-900 rounded-xl items-center">
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <div className="flex justify-center mb-3">
                            <img className="w-32 h-32 mr-2 rounded-full" src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="email" defaultValue={user.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="email" class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                            <input type="text" defaultValue={user.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} name="floating_username" id="floating_username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_username" class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                        </div>                    
                       <div>
                            <FileBase
                                type="file"
                                multiple={false} //Solo permite un archivo
                                onDone={({base64}) => setUserData({...userData, selectedFile: base64})}
                            />
                       </div>
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
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Modal