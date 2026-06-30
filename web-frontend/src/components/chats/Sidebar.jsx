import { CircleUserRound, MessageCircleMore } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
  <div className="bg-sky-600 w-20 ">
    <ul className="h-full flex flex-col p-5 gap-8 mt-10">
        <li className="cursor-pointer"><MessageCircleMore color="#fff" size={32} /></li>
        <li className="cursor-pointer"><CircleUserRound color="#fff" size={32} /></li>
    </ul>

  </div>
  );
};

export default Sidebar;
