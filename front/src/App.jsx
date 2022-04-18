import './index.css'
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Prueba from "./components/voting/Prueba";
import { useSelector, useDispatch } from 'react-redux'
import Login from "./pages/AuthPage"
import { setCurrentUser, addError, getPolls, getUsers  } from "./store/actions";
import decode from 'jwt-decode';
import Leftbar from "./components/Leftbar/Leftbar";
import PollDetails from './components/voting/PollDetails';
import PollPage from './pages/PollPage';
import CreatePoll from './components/voting/CreatePoll';
import Users from './components/UserGestion/Users';
import userService from './services/users'

export default function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state=>state.auth.isAuthenticated)
  useEffect(() => {
    dispatch(getPolls())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  
  console.log(isAuth)

  const user = async () => {
    console.log("cookie: ")
    console.log(decode(cookie.get("token")).id)
    const cUser = await userService.getUserById(decode(cookie.get("token")).id)
    cookie.set("token", cookie.get("token"));
    const u = {
      ...decode(cookie.get("token")),
      selectedFile: cUser.selectedFile
    }
    try {
      dispatch(setCurrentUser(u));
    } catch (err) {
      dispatch(setCurrentUser({}));
      dispatch(addError(err));
    }
  }

  if (cookie.get("token")) {
    user()
  }

  return (
    <div className="flex">
      <BrowserRouter>
      {isAuth && <Leftbar/>}
      <div className="h-screen flex-1 p-7 overflow-auto">
        <Routes>
          <Route exact path="/votaciones" element={!isAuth ? <Navigate to="/login"/> : <PollPage/>} />
          <Route exact path="/prueba" element={!isAuth ? <Navigate to="/login"/> : <Prueba />} />
          <Route exact path="/votaciones/:noteId" element={!isAuth ? <Navigate to="/login"/> : <PollDetails/>} />
          <Route exact path="/votaciones/crearVotacion" element={!isAuth ? <Navigate to="/login"/> : <CreatePoll/>} />
          <Route exact path="/users/" element={!isAuth ? <Navigate to="/login"/> : <Users/>} />
          <Route exact path="/login" element={isAuth ? <Navigate to="/prueba"/> : <Login/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );

  /*
      <BrowserRouter>
        <Routes>
          <Route exact path="/welcome" element={!isAuth ? <Navigate to="/login"/> : <Welcome />} />
          <Route exact path="/votaciones" element={!isAuth ? <Navigate to="/login"/> : <PollPage/>} />
          <Route exact path="/prueba" element={!isAuth ? <Navigate to="/login"/> : <Prueba />} />
          <Route exact path="/votaciones/:noteId" element={!isAuth ? <Navigate to="/login"/> : <PollDetails/>} />
          <Route exact path="/votaciones/crearVotacion" element={!isAuth ? <Navigate to="/login"/> : <CreatePoll/>} />
          <Route exact path="/users/" element={!isAuth ? <Navigate to="/login"/> : <Users/>} />
          <Route exact path="/login" element={isAuth ? <Navigate to="/prueba"/> : <Login/>} />
        </Routes>
      </BrowserRouter>
  */
  /*return (
    <>
    <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <BrowserRouter>
    {isAuth && <Topbar></Topbar>}
    <div className="mainFlex">
      {isAuth && <Leftbar/>}
      <Routes>
        <Route exact path="/welcome" element={!isAuth ? <Navigate to="/login"/> : <Welcome />} />
        <Route exact path="/votaciones" element={!isAuth ? <Navigate to="/login"/> : <PollPage/>} />
        <Route exact path="/prueba" element={!isAuth ? <Navigate to="/login"/> : <Prueba />} />
        <Route exact path="/votaciones/:noteId" element={!isAuth ? <Navigate to="/login"/> : <PollDetails/>} />
        <Route exact path="/votaciones/crearVotacion" element={!isAuth ? <Navigate to="/login"/> : <CreatePoll/>} />
        <Route exact path="/users/" element={!isAuth ? <Navigate to="/login"/> : <Users/>} />
        <Route exact path="/login" element={isAuth ? <Navigate to="/prueba"/> : <Login/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );*/
}