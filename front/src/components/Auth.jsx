import React, { useState } from "react";
import { authUser, logout, setCurrentUser, setToken } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../store";
import ErrorMessage from "./ErrorMessage";

export default function Auth() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    try {
      //e.preventDefault()
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
    <div>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input 
            class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="password"
            value={password}
            name="username"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button class="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
          Login
        </button>
      </form>
    </div>
  );
}
