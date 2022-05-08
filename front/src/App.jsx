import './index.css'
import React, {  useEffect } from "react";
import cookie from "js-cookie";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import { useSelector, useDispatch } from 'react-redux'
import Login from "./pages/AuthPage"
import { setCurrentUser, addError, getPolls, getUsers, getPosts, getDiscussions, getCategories  } from "./store/actions";
import decode from 'jwt-decode';
import Leftbar from "./components/Leftbar/Leftbar";
import PollDetails from './components/voting/PollDetails';
import PollPage from './pages/PollPage';
import CreatePoll from './components/voting/CreatePoll';
import Users from './components/UserGestion/Users';
import Posts from './components/Posts/Posts';
import CreatePost from './components/Posts/CreatePost';
import Post from './components/Posts/Post';
import Discussions from './components/Forum/Discussions';
import Discussion from './components/Forum/Discussion/Discussion';
import userService from './services/users'
import ErrorMessage from './components/ErrorMessage';
import ForoGestion from './components/Forum/ForumGestion/ForoGestion';

export default function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state=>state.auth.isAuthenticated)
  const error = useSelector(state => state.error.message)
  let isAdmin = null
  //console.log(decode(cookie.get("token")))
  useEffect(() => {
    dispatch(getPolls())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getDiscussions())
    dispatch(getCategories())
  }, [dispatch])

  const user = async () => {
    isAdmin = decode(cookie.get("token")).roles.some(r => r.name == "admin" || r.name == "moderator")
    const cUser = await userService.getUserById(decode(cookie.get("token")).id)
    cookie.set("token", cookie.get("token"));
    const u = cUser
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
    <div  id={isAuth ? "" : "login"} className={`flex`}>
      <BrowserRouter>
      {isAuth && <Leftbar/>}
      {error && <ErrorMessage/>}
      <div className="h-screen flex-1 p-7 overflow-auto">
        <Routes>
          <Route exact path="/"element={!isAuth ? <Navigate to="/login"/> : <Home />} />
          <Route exact path="/votaciones" element={!isAuth ? <Navigate to="/login"/> : <PollPage/>} />
          <Route exact path="/home" element={!isAuth ? <Navigate to="/login"/> : <Home />} />
          <Route exact path="/votaciones/:voteId" element={!isAuth ? <Navigate to="/login"/> : <PollDetails/>} />
          <Route exact path="/noticias"  element={!isAuth ? <Navigate to="/login"/> : <Posts/>}/>
          <Route exact path="/noticias/:postId"  element={!isAuth ? <Navigate to="/login"/> : <Post/>}/>
          
          <Route exact path="/foro"  element={!isAuth ? <Navigate to="/login"/> : <Discussions/>}/>
          <Route exact path="/foro/:discId"  element={!isAuth ? <Navigate to="/login"/> : <Discussion/>}/>
          <Route exact path="/foroGestion"  element={!isAuth ? <Navigate to="/login"/> : <ForoGestion/>}/>

          <Route exact path="/votaciones/crearVotacion" element={!isAuth ? <Navigate to="/login"/> : isAdmin ? <CreatePoll/> : <Navigate to="/votaciones/crearVotacion"/>} />
          <Route exact path="/users" element={!isAuth ? <Navigate to="/login"/> : isAdmin ? <Users/> : <Navigate to="/users"/>} />
          <Route exact path="/noticiasGestion"  element={!isAuth ? <Navigate to="/login"/> : isAdmin ? <CreatePost/> : <Navigate to="/noticiasGestion"/>}/>
          <Route exact path="/login" element={isAuth ? <Navigate to="/home"/> : <Login/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}