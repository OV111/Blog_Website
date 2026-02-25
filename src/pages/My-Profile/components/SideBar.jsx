import { sidebarArr } from "../../../../constants/Sidebars.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../../context/useAuthStore";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SideBar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [userInfo, setUserInfo] = useState(null);
  const fullName =
    `${userInfo?.firstName ?? ""} ${userInfo?.lastName ?? ""}`.trim() ||
    "Name Surname";
  const email = userInfo?.email ?? "example@.com";

  const handleLogOut = async () => {
    try {
      const request = await fetch(`${API_BASE_URL}/log-out`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include", // sending cookie
      });
      let response = await request.json();
      if (request.ok) {
        localStorage.removeItem("JWT");
        toast.success(response.message, { duration: 1500 });
        logout();
        navigate("/get-started");
      } else {
        toast.error("Log Out Failed!");
        console.error("Log Out failed!");
        // toast(response.message, {duration:1500});
      }
    } catch (err) {
      console.log(err);
      toast.error("Log Out Failed", { position: "top-center" });
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("JWT");
      if (!token) {
        navigate("/get-started");
        return;
      }
      const request = await fetch(`${API_BASE_URL}/my-profile`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!request.ok) {
        if (request.status === 403) {
          console.log("Invalid Token");
          localStorage.removeItem("JWT");
          navigate("/get-started");
        }
      }
      const response = await request.json();
      console.log(response);
      setUserInfo(response.userWithoutPassword ?? null);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  //   useEffect(() => {
  //   let isMounted = true;

  //   const fetchUserInfo = async () => {
  //     try {
  //       const token = localStorage.getItem("JWT");
  //       if (!token) return;

  //       const req = await fetch(`${API_BASE_URL}/my-profile`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       if (!req.ok) return;

  //       const res = await req.json();
  //       if (isMounted) setUserInfo(res?.userWithoutPassword ?? null);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchUserInfo();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <>
      {isOpen && <div className="" onClick={onClose} />}

      <aside className="flex h-full-screen w-10 flex-col bg-white border-r border-gray-200 transition-all duration-300 lg:h-screen lg:w-54 lg:static lg:sticky lg:top-0">
        <div className=" flex items-center gap-3 border-b border-gray-100 pt-4 pb-2 px-0 lg:px-3">
          <img
            src=""
            alt=""
            className="lg:mx-0 mx-auto w-8 h-8 rounded-full bg-purple-100"
          />
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-gray-800 overflow-x-auto">
              {fullName}
            </p>
            <p className="text-xs text-gray-500 overflow-x-auto">{email}</p>
          </div>
        </div>

        <nav className="grid py-2 px-0 lg:py-2 lg:px-3">
          {sidebarArr.map((group) => (
            <div
              key={group.section}
              className="grid font-normal items-center  gap-1.5 py-1 lg:pt-2"
            >
              <p className="hidden px-2 py-0 text-[12px] uppercase tracking-wider text-gray-400 font-semibold lg:block">
                {group.section}
              </p>

              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `mx-auto flex w-10 items-center justify-center gap-2 rounded-lg py-2 px-0 text-gray-700 transition-colors hover:bg-purple-50 hover:text-gray-900 lg:w-full lg:justify-start lg:px-3 ${
                      isActive ? "bg-purple-50" : ""
                    }`
                  }
                >
                  <p className="flex items-center">{item.icon}</p>
                  <p className="hidden text-sm lg:block">{item.label}</p>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div
          onClick={() => {
            handleLogOut();
          }}
          className="group mt-auto flex cursor-pointer items-center justify-center border-t border-gray-100 py-3.5 text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600 lg:justify-between lg:px-4"
        >
          <p className="hidden text-sm font-medium lg:block">Logout</p>
          <LogoutRoundedIcon
            fontSize="small"
            className="mx-auto transition-colors group-hover:text-red-600 lg:mx-0"
            sx={{ color: "currentColor" }}
          />
        </div>
      </aside>
    </>
  );
}
