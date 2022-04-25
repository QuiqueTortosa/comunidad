import React, { useState } from "react";
import { authUser } from "../store/actions";
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
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input 
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            type="password"
            value={password}
            name="username"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="bg-blue-900 text-white px-4  py-2 rounded shadow-md focus:ring hover:bg-blue-500 transition-all  active:transform active:translate-y-1">
          Login
        </button>
      </form>
    </div>
  );
}
