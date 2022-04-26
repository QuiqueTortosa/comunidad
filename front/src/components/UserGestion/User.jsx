import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as IoIcons from "react-icons/io";
import UserDetails from "./UserDetails";

export default function User({ user }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center text-center justify-center">
        <div className={`flex gap-x-4 items-center`}>
              <img className={`rounded-full w-10 h-10`} src={user.selectedFile != "" ? user.selectedFile : "/images/avatar.png"} alt={"Image not found"}></img>
          </div>    
          <h5 class="font-medium leading-tight text-xl ml-2 w-16">{user.username}</h5>
        </div>
        <button class="max-w-32 right-2" onClick={handleClick}>
          {open ? <IoIcons.IoIosArrowUp /> : <IoIcons.IoIosArrowDown />}
        </button>
      </div>
      <UserDetails open={open} user={user} />
    </div>
  );
}
