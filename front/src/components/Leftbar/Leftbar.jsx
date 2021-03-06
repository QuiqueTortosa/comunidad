import React, { useState } from 'react'
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import { logout } from '../../store/actions';


export default function () {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);
    const [modalOn, setModalOn] = useState(false);
    const user = useSelector(state => state.USERS.find(u => u._id == state.auth.user.id)) ? useSelector(state => state.USERS.find(u => u._id == state.auth.user.id)) : useSelector(state => state.auth.user)
    const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
    const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "moderator") ? true : false)

    const disconnect = () => {
        window.location.reload(false);
        dispatch(logout())
    }
 
    return (
        <>
            <div className={`flex flex-row hidden bg-gray-900 p-5  py-7  left-0 duration-300 w-full h-8 md:absolute sm:flex`}>  
                <div className="flex flex-row justify-between items-center">  
                    <div className={`flex gap-x-4 items-center mr-8`}  onClick={() => {setModalOn(!modalOn)}}>
                        <img className={`cursor-pointer duration-500  rounded-full ${open && "w-16 h-16 rotate-[360deg]"} ${!open && "absolute w-8 h-8"}  md:w-8 md:h-8`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                    </div> 
                    <div className="flex">
                        <div>
                            <Link to="/home" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                                <FaIcons.FaHome/>
                                <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Home</span>
                            </Link>
                        </div>
                        <div>
                            <Link to="/votaciones" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                                <FaIcons.FaRegChartBar/>
                                <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Votaciones</span>
                            </Link>
                        </div>
                        <div>
                            <Link to="/noticias" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                                <FaIcons.FaNewspaper/>
                                <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Noticias</span>
                            </Link>
                        </div>
                        <div>
                            <Link to="/foro" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                                <FaIcons.FaRegComments/>
                                <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Foro</span>
                            </Link>
                        </div>
                </div>

                {  (isAdmin || isMod) &&      
                <div className='flex'> 
                    <div> 
                        <Link to="/votaciones/crearVotacion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                            <FaIcons.FaPoll/>
                            <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Votaci??n Gesti??n</span>
                        </Link>
                    </div>
                    <div>
                        <Link to="/noticiasGestion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                            <FaIcons.FaRegNewspaper/>
                            <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Noticias Gesti??n</span>
                        </Link>
                    </div>
                    <div> 
                        <Link to="/foroGestion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                            <FaIcons.FaPodcast/>
                            <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Foro Gesti??n</span>
                        </Link>
                    </div>
                    <div>
                        <Link to="/users" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                            <FaIcons.FaRegUser/>
                            <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>User Gesti??n</span>
                        </Link>
                    </div>
                </div>
                }
                    <div onClick={disconnect} className='flex absolute rounded bottom-5 right-5 text-gray-300 hover:bg-light-white text-sm items-center  gap-x-4'>
                        <IoIcons.IoIosExit/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Logout</span>
                    </div>
                </div>  
                {modalOn && <Modal setModalOn={setModalOn} />}    
            </div>

            {
            // ************************ Version PC *********************************************
            }

            <div className={` ${open ? "w-72" : "w-20 "} bg-gray-900 h-screen p-5  pt-8 relative left-0 duration-300 md:w-20 sm:hidden`}>
            <img
                src="/images/control.png"
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"} md:hidden`}
                onClick={() => setOpen(!open)}
            />    
            <div className="flex gap-x-4 items-center">  
                <div className={`flex gap-x-4 items-center`}  onClick={() => {setModalOn(!modalOn)}}>
                    <img className={`cursor-pointer duration-500 rounded-full ${open && "w-16 h-16 rotate-[360deg]"} ${!open && "absolute w-8 h-8"} md:absolute md:w-8 md:h-8`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                </div> 
                <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"} md:scale-0`}>
                    { useSelector(state =>state.auth.user.username) }
                </h1>
             </div>  
            {modalOn && <Modal setModalOn={setModalOn} />}    
            <ul className="pt-6">
                <li>
                    <Link to="/home" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaHome/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/votaciones" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaRegChartBar/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Votaciones</span>
                    </Link>
                </li>
                <li>
                    <Link to="/noticias" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaNewspaper/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Noticias</span>
                    </Link>
                </li>
                <li>
                    <Link to="/foro" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaRegComments/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Foro</span>
                    </Link>
                </li>
            </ul>

            {  (isAdmin || isMod) &&      
            <ul className='mt-5'> 
                <li> 
                    <Link to="/votaciones/crearVotacion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaPoll/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Votaci??n Gesti??n</span>
                    </Link>
                </li>
                <li>
                    <Link to="/noticiasGestion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaRegNewspaper/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Noticias Gesti??n</span>
                    </Link>
                </li>
                <li> 
                    <Link to="/foroGestion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaPodcast/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Foro Gesti??n</span>
                    </Link>
                </li>
                <li>
                    <Link to="/users" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaRegUser/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>User Gesti??n</span>
                    </Link>
                </li>
            </ul>
            }
            <div onClick={disconnect} className='absolute flex rounded bottom-0 p-2 mb-2 text-gray-300 hover:bg-light-white text-sm items-center  gap-x-4'>
                <IoIcons.IoIosExit/>
                <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Logout</span>
            </div>
        </div>
        </>
    )
}

/**
 * 
 *         <div className={` ${open ? "w-72" : "w-20 "} bg-gray-900 h-screen p-5  pt-8 relative left-0 duration-300 md:w-20 md:absolute`}>
            <img
                src="/images/control.png"
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"} md:hidden`}
                onClick={() => setOpen(!open)}
            />    
            <div className="flex gap-x-4 items-center">  
                <div className={`flex gap-x-4 items-center`}  onClick={() => {setModalOn(!modalOn)}}>
                    <img className={`cursor-pointer duration-500 rounded-full ${open && "w-16 h-16 rotate-[360deg]"} ${!open && "absolute w-8 h-8"} md:absolute md:w-8 md:h-8`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                </div> 
                <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"} md:scale-0`}>
                    { useSelector(state =>state.auth.user.username) }
                </h1>
             </div>  
            {modalOn && <Modal setModalOn={setModalOn} />}    
            <ul className="pt-6">
                <li>
                    <Link to="/home" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaHome/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/votaciones" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaRegChartBar/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Votaciones</span>
                    </Link>
                </li>
                <li>
                    <Link to="/noticias" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaNewspaper/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Noticias</span>
                    </Link>
                </li>
                <li>
                    <Link to="/foro" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaRegComments/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Foro</span>
                    </Link>
                </li>
            </ul>

            {  (isAdmin || isMod) &&      
            <ul className='mt-5'> 
                <li> 
                    <Link to="/votaciones/crearVotacion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaPoll/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Votaci??n Gesti??n</span>
                    </Link>
                </li>
                <li>
                    <Link to="/noticiasGestion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaRegNewspaper/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Noticias Gesti??n</span>
                    </Link>
                </li>
                <li> 
                    <Link to="/foroGestion" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaPodcast/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Foro Gesti??n</span>
                    </Link>
                </li>
                <li>
                    <Link to="/users" className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 `}>
                        <FaIcons.FaRegUser/>
                        <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>User Gesti??n</span>
                    </Link>
                </li>
            </ul>
            }
            <div onClick={disconnect} className='absolute flex rounded bottom-0 p-2 mb-2 text-gray-300 hover:bg-light-white text-sm items-center  gap-x-4'>
                <IoIcons.IoIosExit/>
                <span className={`${!open && "hidden"} origin-left duration-200 md:hidden`}>Logout</span>
            </div>
        </div>
 */