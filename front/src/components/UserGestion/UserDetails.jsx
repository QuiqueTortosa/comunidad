import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUsers, deleteUser, addError } from "../../store/actions";
import {
  Collapse,
  Switch,
  FormControlLabel,
} from "@mui/material";
import * as FaIcons from "react-icons/fa";

export default function UserDetails({ open, user, confirmDelete, setConfirmDelete }) {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) =>
    state.auth.user.roles.find((r) => r.name == "admin") ? true : false
  );
  const users = useSelector((state) => state.USERS);
  const [confirmPassword, setConfirmPassword] = useState("")

  const [modSwitch, setModSwitch] = useState(
    user.roles.find((r) => r.name == "moderator") ? true : false
  );
  const [adminSwitch, setAdminSwitch] = useState(
    user.roles.find((r) => r.name == "admin") ? true : false
  );

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [modal, setModal] = useState(false)
  const [userData, setUserData] = useState({
    email: user.email,
    username: user.username,
    direccion: user.direccion,
    telefono: user.telefono,
    password: "",
    roles:  user.roles.map((r) => {
      return {_id: r._id};
    }),
  });

  const handleRemove = (id) => {
    setConfirmDelete(false)
    dispatch(deleteUser(id));
  };


  const adminChange = () => {
    if (adminSwitch) {
      setUserData({
        ...userData,
        roles: userData.roles.filter((r) => r._id != "62530ebeff716236686126d8")        
      });
      setAdminSwitch(!adminSwitch);
    } else {
      setUserData({
        ...userData,
        roles: [...userData.roles, {_id: "62530ebeff716236686126d8"}],
      });
      setAdminSwitch(!adminSwitch);
    }
  };

  const modChange = () => {
    if (modSwitch) {
      setUserData({
        ...userData,
        roles:  userData.roles.filter((r) => r._id != "62530ebeff716236686126d7")
      });
      setModSwitch(!modSwitch);
    } else {
      setUserData({
        ...userData,
        roles: [...userData.roles, {_id: "62530ebeff716236686126d7"}],
      });
      setModSwitch(!modSwitch);
    }
  };

  const handleModal = (event) => {
    event.preventDefault(event) 
    setModal(!modal)
  }

  const handleUpdate = async (event) => {
    try {
      event.preventDefault();
      if(userData.password.length >= 1 && userData.password !== confirmPassword){
        dispatch(addError(1,"Las contraseñas no coinciden"))
      }else if(userData.roles[0]._id == undefined){
        setUserData({...userData, roles: user.roles})
        dispatch(updateUser(user._id, userData));
        setUserData({...userData, password: ""}) 
        setConfirmPassword("")
      }else {
        dispatch(updateUser(user._id, userData));
        setUserData({...userData, password: ""}) 
        setConfirmPassword("")
      }
      dispatch(getUsers());
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="my-5">
      <Collapse in={open} timeout="auto" unmountOnExit>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-row gap-16 justify-evenly sm:gap-0 sm:flex-col">
            <div className="flex flex-col">
              <div class="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  defaultValue={user.email}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
                <label
                  for="email"
                  className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  defaultValue={user.username}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  onChange={(e) => setUserData({...userData, username: e.target.value})}
                />
                <label
                  for="floating_password"
                  className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  defaultValue={user.telefono}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => setUserData({...userData, telefono: e.target.value})}
                />
                <label
                  for="email"
                  className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Telefono
                </label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  defaultValue={user.direccion}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => setUserData({...userData, direccion: e.target.value})}
                />
                <label
                  for="email"
                  className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Direccion
                </label>
              </div>
            </div>
            <div className="flex flex-col">
            <div className="flex relative z-0 mb-6 w-full group items-end">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={userData.password}
                  onChange={(e) => setUserData({...userData, password: e.target.value})}
                />
                <label
                  className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nueva contraseña
                </label>
                <FaIcons.FaEye className={`ml-2 ${showNewPassword ? "" : "opacity-40"}`} onClick={() => setShowNewPassword(!showNewPassword)}/>
              </div>
              <div className="flex relative z-0 mb-6 w-full group items-end">
                <input  
                  type={showConfirmPassword ? "text" : "password"}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label
                  className="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
               >
                  Confirmar contraseña
                </label>
                <FaIcons.FaEye className={`ml-2 ${showConfirmPassword ? "" : "opacity-40"}`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
              </div>
              <div className="flex flex-col sm:items-start">
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
            </div>
            <div className="flex flex-col justify-between sm:items-center sm:mt-3">
              <div className="flex flex-col">
                <div className="flex justify-center mb-3">
                  <img className={`w-24 h-24 mr-2 rounded-full ${user.selectedFile != "" ? "border-2 border-black" : ""}`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                </div>
                <div className="text-left sm:text-center sm:mb-3">
                  <button 
                    className="bg-blue-900  text-white mt-3 px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
                    onClick={() =>  setUserData({...userData, selectedFile: ""})}
                    >
                    Eliminar imagén
                  </button>
                </div>
            </div>
            </div>
          </div>
          <div className="flex flex-row space-x-1.5 pl-16 sm:justify-center sm:pl-0">
            <button className="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
              Actualizar
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1"
              onClick={() => {
                setConfirmDelete(true)
              }}
            >
              Borrar
            </button>
          </div>
        </form>
      </Collapse>
      { modal &&
        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
              <div className="flex h-screen justify-center items-center">
                  <div className="flex-col justify-center  bg-white pt-12 pb-6 px-16 border-4 border-sky-900 rounded-xl items-center">
                    <h1 className="italic"><strong>¿Estas seguro de actualizar a: </strong>{userData.username}<strong>?</strong></h1>
                    <div className="mt-3 flex justify-evenly">
                      <button onClick={handleUpdate} className="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">Actualizar</button>
                      <button onClick={() => setModal(!modal)} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">Cancelar</button>
                    </div>
                  </div>
              </div>
          </div>
      }
      { confirmDelete &&
        <div className="bg-opacity-70 bg-gray-800 fixed inset-0 z-30">
          <div className="flex h-screen justify-center items-center ">
            <div className="flex-col justify-center  bg-white py-12 px-12 border-4 border-sky-900 rounded-xl items-center">
            <p className="text-black">¿Estas seguro de eliminar a {userData.username}?</p>
            <div className="flex justify-evenly mt-4">
              <button onClick={() => handleRemove(user._id)} className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1">
                Eliminar
              </button>
              <button onClick={() => setConfirmDelete(false)} className="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
                Cancelar
              </button>
            </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
