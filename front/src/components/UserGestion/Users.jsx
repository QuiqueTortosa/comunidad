import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import AddUser from "./AddUser"
import { getUsersBySearch, getUsers } from "../../store/actions";
import { FaSearch } from 'react-icons/fa';


export default function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.USERS);
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState('')
  const searchUsers = () => {
    if(search.trim()){
      console.log(search)
      dispatch(getUsersBySearch(search))
    }else {
      console.log("jeje")
      dispatch(getUsers())
    }
  }

  return (
    <div className="shadow-3xl p-16 rounded-xl bg-white">
      <div className="flex flex-row mb-5 justify-between sm:flex-col">
         <div className="sm:text-right sm:mb-3">
          <button 
            className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={() => setOpenModal(!openModal)}
          >
            Añadir usuario
          </button>
        </div>
        <div className="flex flex-row sm:justify-end">
          <input 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            >
          </input>
          <button 
            className="bg-blue-900 text-white px-4  py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
            onClick={searchUsers}>
            <FaSearch></FaSearch>
          </button>
        </div>
      </div>
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
      {openModal && <AddUser setModalOn={setOpenModal}/>}
    </div>
  );
}
