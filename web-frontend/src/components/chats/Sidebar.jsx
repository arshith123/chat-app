"use client";
import React, { useState, useEffect } from "react";
import { CircleUserRound, LogOut, MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUserById } from "@/services/user.service";
import ToolTip from "@/components/common/ToolTip";

const Sidebar = () => {
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (userStr) {
          const userObj = JSON.parse(userStr);

          // Pre-populate with cached avatar from localStorage if available
          if (userObj.avatar) {
            setAvatar(userObj.avatar);
          }

          // Fetch fresh user profile from backend to get the latest avatar URL
          if (userObj._id) {
            const res = await getUserById(userObj._id, token, ["avatar"]);
            if (res.success && res.data && res.data.avatar) {
              setAvatar(res.data.avatar);

              // Sync updated avatar back to local storage
              const updatedUserObj = { ...userObj, avatar: res.data.avatar };
              localStorage.setItem("user", JSON.stringify(updatedUserObj));
            }
          }
        }
      } catch (err) {
        console.error("Failed to load user profile in sidebar:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to the login/landing page
    router.replace("/");
  };

  return (
    <div className="bg-sky-600 w-20 h-full flex flex-col items-center relative z-20">
      <ul className="flex flex-col p-5 gap-8 items-center">
        <li className="cursor-pointer hover:opacity-85 transition-opacity">
          <ToolTip text="Profile" position="right">
            {avatar ? (
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <CircleUserRound color="#fff" size={32} />
            )}
          </ToolTip>
        </li>
        <li className="cursor-pointer hover:opacity-85 transition-opacity">
          <ToolTip text="Chats" position="right">
            <MessageCircleMore color="#fff" size={32} />
          </ToolTip>
        </li>

        <li
          onClick={handleLogout}
          className="cursor-pointer hover:opacity-85 transition-opacity"
        >
          <ToolTip text="Logout" position="right">
            <LogOut color="#fff" size={32} />
          </ToolTip>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
