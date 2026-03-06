import React from "react";
import Sidebar from "./components/SideBar";
import { useState } from "react";

const Chats = () => {
  const [userSelected, setUserSelected] = useState(false);
  console.log("avgeh");
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="lg:w-70 bg-zinc-300">
        <h1>Chats</h1>

        <input type="text" placeholder="Search Conversation" />

        {[1, 2, 3, 4, 5].map((user) => (
          <div
            key={user.id}
            onClick={() => setUserSelected(user)}
            className="flex cursor-pointer items-center gap-2 border-b border-white/10 px-3 py-2 hover:bg-white/10"
          >
            <img
              src={user.image}
              alt={user.name}
              className="h-11 w-11 rounded-full"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user.name}
              </p>
              <p className="truncate text-sm text-gray-400">{user.username}</p>
            </div>
          </div>
        ))}
      </div>
      {userSelected ? (
        <></>
      ) : (
        <div>
          <h1>Select a chat to start messaging </h1>
          <p>
            Choose a conversation from the list to view the messages inside your
            chat with them
          </p>
        </div>
      )}
    </div>
  );
};

export default Chats;
