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
  const [openImage, setOpenImage] = useState(false);
  const fullName =
    `${userInfo?.firstName ?? ""} ${userInfo?.lastName ?? ""}`.trim() ||
    "Name Surname";
  const email = userInfo?.email ?? "example@.com";
  const avatarSrc = userInfo?.profileImage ?? "";

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
      setUserInfo({
        ...(response.userWithoutPassword ?? {}),
        profileImage: response?.stats?.profileImage ?? "",
      });
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
    <div className="">
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Need to correct the height for responsive */}
      <aside className="flex h-full w-10 flex-col bg-white border-r border-gray-200 transition-all duration-300 lg:h-screen lg:w-54 lg:static lg:sticky lg:top-0">
        <div className=" flex items-center gap-3 border-b border-gray-100 pt-4 pb-2 px-0 lg:px-3 ">
          <button
            onClick={() => {
              if (avatarSrc) setOpenImage(true);
            }}
            className="cursor-pointer"
          >
            <img
              src={avatarSrc}
              alt="Profile"
              className="lg:mx-0 mx-auto w-8 h-8 rounded-full bg-purple-100"
            />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-gray-800 overflow-x-auto">
              {fullName}
            </p>
            <p className="text-xs text-gray-500 overflow-x-auto">{email}</p>
          </div>
        </div>
        {openImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setOpenImage(false)}
          >
            <img
              src={avatarSrc}
              alt="Profile"
              className="max-w-[90vw] max-h-[90vh] rounded-2xl object-contain transition duration-200 scale-100"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        )}

        <nav className="grid min-h-0 flex-1 overflow-y-auto py-0 px-0 lg:py-2 lg:px-3">
          {sidebarArr.map((group) => (
            <div
              key={group.section}
              className="grid font-normal items-center py-0 lg:pt-2"
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
                    `flex w-10 items-center justify-center gap-0 rounded-none py-0 px-0 text-gray-700 transition-colors hover:bg-purple-50 lg:mx-auto lg:w-full lg:justify-start lg:gap-2 lg:rounded-lg lg:py-2 lg:px-3 ${
                      isActive ? "lg:bg-purple-50 text-purple-600" : ""
                    }`
                  }
                >
                  <p className="flex items-center">{item.icon}</p>
                  <p className="hidden text-xs lg:block">{item.label}</p>
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
    </div>
  );
}
