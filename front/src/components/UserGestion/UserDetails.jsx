import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUsers, deleteUser } from "../../store/actions";
import {
  Collapse,
  TextField,
  Switch,
  FormControlLabel,
  Container,
} from "@mui/material";

export default function UserDetails({ open, user }) {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) =>
    state.auth.user.roles.find((r) => r.name == "admin") ? true : false
  );

  const [modSwitch, setModSwitch] = useState(
    user.roles.find((r) => r.name == "moderator") ? true : false
  );
  const [adminSwitch, setAdminSwitch] = useState(
    user.roles.find((r) => r.name == "admin") ? true : false
  );
  const [userData, setUserData] = useState({
    email: user.email,
    username: user.username,
    roles: user.roles.map((r) => {
      return r._id;
    }),
  });


  const handleRemove = (id) => {
    dispatch(deleteUser(id));
  };

  const adminChange = () => {
    if (adminSwitch) {
      setUserData({
        ...userData,
        roles: [
          Object.values(
            userData.roles.filter((r) => r != "62530ebeff716236686126d8")
          ),
        ],
      });
      setAdminSwitch(!adminSwitch);
    } else {
      setUserData({
        ...userData,
        roles: [...user.roles, "62530ebeff716236686126d8"],
      });
      setAdminSwitch(!adminSwitch);
    }
  };

  const modChange = () => {
    if (modSwitch) {
      setUserData({
        ...userData,
        roles: [
          Object.values(
            userData.roles.filter((r) => r != "62530ebeff716236686126d7")
          ),
        ],
      });
      setModSwitch(!modSwitch);
    } else {
      setUserData({
        ...userData,
        roles: [...user.roles, "62530ebeff716236686126d7"],
      });
      setModSwitch(!modSwitch);
    }
  };

  const handleUpdate = async (event) => {
    try {
      event.preventDefault();
      console.log("Usuario:");
      console.log(userData);
      console.log(Object.values(userData.roles));

      dispatch(updateUser(user._id, userData));
      dispatch(getUsers());
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="my-5">
      <Collapse in={open} timeout="auto" unmountOnExit>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-row gap-16">
            <div className="flex flex-col">
              <div class="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  defaultValue={user.email}
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
                <label
                  for="email"
                  class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  onChange={(e) => setUserData({...userData, password: e.target.value})}
                />
                <label
                  for="floating_password"
                  class="absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <div className="flex justify-center mb-3">
                <img className={`w-24 h-24 mr-2 rounded-full ${user.selectedFile != "" ? "border-2 border-black" : ""}`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
              </div>
              <div className="text-left ">
                <button 
                  className="bg-blue-900  text-white mt-3 px-4 py-1 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1"
                  onClick={() =>  setUserData({...userData, selectedFile: ""})}
                  >
                  Eliminar imagén
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-1.5">
            <button className="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
              Update
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-red-500 transition-all  active:transform active:translate-y-1"
              onClick={() => {
                handleRemove(user._id);
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </Collapse>
    </div>
  );
}
