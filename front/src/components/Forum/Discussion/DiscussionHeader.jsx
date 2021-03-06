import React from "react";
import { useSelector } from "react-redux";

import "../forum.css"
import Poll from "./Poll";

export default function DiscussionHeader({discussion, reply, setReply}) {
    const user = useSelector(state => state.auth.user)
    const isAdmin = useSelector(state=>state.auth.user.roles.find(r => r.name == "admin") ? true : false)
    const isMod = useSelector(state=>state.auth.user.roles.find(r => r.name == "moderator") ? true : false)
  return (
        <div className="flex flex-row my-2 justify-between rounded-xl bg-white lg:space-x-2 sm:flex-col sm:items-center sm:gap-3">
        { discussion.user ? 
            <div className={`flex flex-col items-center justify-between w-auto min-w-[130px] max-w-[130px]  min-h-[350px] bg-gray-700 px-2 pt-3 rounded-l-xl sm:max-w-full sm:rounded-t-xl sm:rounded-b-none sm:pb-2 sm:w-full`}> 
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
                    <p className="text-gray-200 sm:pb-1">{discussion.user.username}</p>
                    <p className="text-xl font-bold italic font-extrabold text-gray-200">{discussion.user.roles ? discussion.user.roles[discussion.user.roles.length-1].name : "nada"}</p>
                        <div className="flex justify-center">
                            <p className="text-gray-300">Mensajes: &nbsp;</p>
                            <p className="text-gray-200">{discussion.user.roles ? discussion.user.forumMessages.length : 0}</p>
                        </div>
                    </div>
                    <div className="pb-3">
                     <p className="relative text-xs text-gray-200 sm:top-[55px]">{discussion.user.createdAt ? discussion.user.createdAt.substring(0,10)+"," +discussion.user.createdAt.substring(11,16) : ""}</p>
                    </div>
                    <p className={`relative hidden max-h-0 text-left top-[18px] text-xs text-gray-700 sm:flex`}>{discussion.createdAt.substring(0,10)+"," +discussion.createdAt.substring(11,16)}</p>
            </div>
            :
            <div className={`flex flex-col items-center justify-between w-auto min-w-[130px] max-w-[130px]  min-h-[350px] bg-gray-700 px-2 pt-3 rounded-l-xl sm:max-w-full sm:rounded-t-xl sm:rounded-b-none sm:pb-2 sm:w-full `}> 
                <div className="text-center">
                <img className={`rounded-full w-28 h-28 my-2`} src="/images/avatar.png" alt={"Image not found"}></img>
                    <p className="text-gray-200 text-xs">Usuario eliminado</p>
                    <p className="text-xl font-bold italic font-extrabold text-gray-200">Banned</p>
                        <div className="flex justify-center">
                            <p className="text-gray-300">Mensajes: &nbsp;</p>
                            <p className="text-gray-200">0</p>
                        </div>
                    </div>
                    <div className="pb-3 sm:pb-1">
                        <p className="relative text-xs text-gray-200 sm:top-[55px]">Hace mucho tiempo</p>
                    </div>
                    <p className={`relative hidden max-h-0 text-left top-[18px] text-xs text-gray-700 sm:flex`}>{discussion.createdAt.substring(0,10)+"," +discussion.createdAt.substring(11,16)}</p>
            </div>
        }
            <div className={`flex flex-col text-center w-full my-10 min-h-[350px] h-full ${discussion.poll.question ? "justify-between" : "justify-center"} px-8 sm:pb-2 sm:w-full `}>
                <div id="texto" className="text-center">
                    <div className="break-all" dangerouslySetInnerHTML={{ __html: discussion.body}}/>
                </div>
                {discussion.poll.question && <Poll poll={discussion.poll}/>}
            </div>
    </div>  
  )
}

// ${discussion.poll.question ? "text-right" : "-top-[150px]"