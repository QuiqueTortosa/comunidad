import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiscussionMessage, getDiscussionMessages } from "../../../store/actions";
import decode from 'jwt-decode';
import cookie from "js-cookie";
import * as FaIcons from "react-icons/fa";
import "../forum.css"
import Poll from "./Poll";

export default function DiscussionHeader({discussion, reply, setReply}) {
    const user = useSelector(state => state.auth.user)
    const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
    const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "moderator") ? true : false)
  return (
        <div className="flex my-2 border-2 rounded-xl lg:space-x-2 sm:flex-col sm:items-center sm:gap-3">
        { discussion.user ? 
            <div className={`flex flex-col items-center justify-between w-auto min-w-[130px] max-w-[130px]  min-h-[350px] bg-gray-700 px-2 pt-3 rounded-l-xl sm:max-w-full sm:rounded-t-xl sm:rounded-b-none sm:pb-2 sm:w-full sm:border-b-2 sm:border-gray-300`}> 
                <div className="text-center">
                { user.email == discussion.user.email ?
                    <div>
                    {  discussion.user.selectedFile ? 
                        <img className={`rounded-full w-28 h-28 my-2`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                        :
                        <img className={`rounded-full w-28 h-28 my-2`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                        }
                    </div>
                    :
                    <div>
                    { discussion.user.selectedFile ? 
                        <img className={`rounded-full w-28 h-28 my-2`}  src={discussion.user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
                        :
                        <img className={`rounded-full w-28 h-28 my-2`} src="/images/avatar.png" alt={"Image not found"}></img>
                    }
                    </div>
                    }
                    <p className="text-gray-200">{discussion.user.username}</p>
                    <p className="text-xl font-bold italic font-extrabold text-gray-200">{discussion.user.roles ? discussion.user.roles[discussion.user.roles.length-1].name : "nada"}</p>
                        <div className="flex justify-center">
                            <p className="text-gray-300">Mensajes: &nbsp;</p>
                            <p className="text-gray-200">{discussion.user.roles ? discussion.user.forumMessages.length : 0}</p>
                        </div>
                    </div>
                    <div className="pb-3">
                     <p className="relative text-xs text-gray-200">{discussion.user.createdAt ? discussion.user.createdAt.substring(0,10)+"," +discussion.user.createdAt.substring(11,16) : ""}</p>
                    </div>
            </div>
            :
            <div className={`flex flex-col items-center justify-between w-auto min-w-[130px] max-w-[130px]  min-h-[350px] bg-gray-700 px-2 pt-3 rounded-l-xl sm:max-w-full sm:rounded-t-xl sm:rounded-b-none sm:pb-2 sm:w-full sm:border-b-2 sm:border-gray-300`}> 
                <div className="text-center">
                <img className={`rounded-full w-28 h-28 my-2`} src="/images/avatar.png" alt={"Image not found"}></img>
                    <p className="text-gray-200 text-xs">Usuario eliminado</p>
                    <p className="text-xl font-bold italic font-extrabold text-gray-200">Banned</p>
                        <div className="flex justify-center">
                            <p className="text-gray-300">Mensajes: &nbsp;</p>
                            <p className="text-gray-200">0</p>
                        </div>
                    </div>
                    <div className="pb-3">
                        <p className="relative text-xs text-gray-200">Hace mucho tiempo</p>
                    </div>
            </div>
        }
            <div className={`flex flex-col text-center w-full min-h-[350px] h-full ${discussion.poll.question ? "justify-between" : "justify-center"} px-8 sm:pb-2 sm:w-full sm:border-b-2 sm: border-gray-300`}>
                <div className="text-right pt-2">
                    <p className={`relative text-xs text-gray-700 ${discussion.poll.question ? "text-right" : "-top-[150px]"}`}>{discussion.createdAt.substring(0,10)+"," +discussion.createdAt.substring(11,16)}</p>
                </div>
                <div id="texto" className="text-center">
                    <div className="break-all" dangerouslySetInnerHTML={{ __html: discussion.body}}/>
                </div>
                {discussion.poll.question && <Poll poll={discussion.poll}/>}
            </div>
    </div>  
  )
}
