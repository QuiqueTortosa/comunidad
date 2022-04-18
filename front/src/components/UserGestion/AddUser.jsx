import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUser, getUsers, setCurrentUser } from "../../store/actions";
import {  FormControlLabel, Switch } from "@mui/material";

export default function AddUser({ setModalOn }) {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) =>
    state.auth.user.roles.find((r) => r.name == "admin") ? true : false
  );
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        password: "",
        roles: ["user"]
      });
    const [confirmP, setConfirmP] = useState("")
    const [coincide, setCoinciden] = useState(false)
    const [modSwitch, setModSwitch] = useState(
        userData.roles.find((r) => r == "moderator") ? true : false
      );
      const [adminSwitch, setAdminSwitch] = useState(
        userData.roles.find((r) => r == "admin") ? true : false
      );
      console.log("userdata")
      console.log(userData)

    const handleSubmit = e => {
        e.preventDefault()
        try {
            if(!(userData.password === confirmP)) {
                setCoinciden(true)
                setTimeout(() => {
                    setCoinciden(false)
                },5000)           
             }
            dispatch(createUser(userData));
            dispatch(getUsers());
            setModalOn(false)
          } catch (err) {
            console.error(err);
          }
    }

    const clear = () => {
        setUserData({
            email: "",
            username: "",
            password: "",
            roles: ["user"]
        })
        console.log(userData)
        setModalOn(false)
    }

    const adminChange = () => {
        if (adminSwitch) {
          setUserData({
            ...userData,
            roles: userData.roles.filter((r) => r != "admin")
          });
          setAdminSwitch(!adminSwitch);
        } else {
          setUserData({
            ...userData,
            roles: [...userData.roles, "admin"],
          });
          setAdminSwitch(!adminSwitch);
        }
      };
    
      const modChange = () => {
        if (modSwitch) {
          setUserData({
            ...userData,
            roles: userData.roles.filter((r) => r != "moderator")
          });
          setModSwitch(!modSwitch);
        } else {
          setUserData({
            ...userData,
            roles: [...userData.roles, "moderator"],
        });
          setModSwitch(!modSwitch);
        }
      };

    return (
        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center  bg-white py-12 px-24 border-4 border-sky-500 rounded-xl items-center w-[500px]">
                    <h1 className="text-center mb-3"><strong>Nuevo Usuario</strong></h1>
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="email" className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" onChange={(e) => setUserData({ ...userData, username: e.target.value })} name="floating_username" id="floating_username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_username" className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                        </div> 
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" onChange={(e) => setUserData({ ...userData, password: e.target.value })} name="floating_username" id="floating_username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_username" className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                        </div>  
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text"  onChange={(e) => setConfirmP(e.target.value)} name="floating_username" id="floating_username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_username" className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                        </div> 
                        <div className="flex flex-col items-start">
                            <FormControlLabel
                                value="Moderador"
                                control={
                                <Switch
                                    checked={modSwitch}
                                    color="primary"
                                    onChange={modChange}
                                />
                                }
                                label="Moderador"
                                labelPlacement="start"
                            />
                            {isAdmin && (
                                <FormControlLabel
                                value="Administrador"
                                control={
                                    <Switch
                                    checked={adminSwitch}
                                    color="primary"
                                    onChange={adminChange}
                                    />
                                }
                                label="Administrador"
                                labelPlacement="start"
                                />
                            )}
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
                        {coincide && 
                        <div id="alert-border-2" className="flex p-4 mt-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200" role="alert">
                            <div className="ml-3 text-sm font-medium text-red-700">
                                Las contraseñas no coinciden
                            </div>
                            <button type="button" onClick={() => setCoinciden(false)} className="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        }
                    </form>                  
                </div>
            </div>
        </div>

    );
}
