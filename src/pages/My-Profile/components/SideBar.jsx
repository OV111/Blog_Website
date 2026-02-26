import { sidebarArr } from "../../../../constants/Sidebars.jsx";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../context/useAuthStore";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SideBar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
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
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Need to correct the height for responsive */}
      <aside className="flex h-dvh w-10 flex-col overflow-hidden border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-950 lg:h-screen lg:w-56 lg:static lg:sticky lg:top-0">
        <div className=" flex items-center gap-3 border-b border-gray-100 pt-4 pb-2 px-0 dark:border-gray-800 lg:px-3 ">
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
            <p className="text-sm font-medium text-gray-800 overflow-x-auto dark:text-gray-100">
              {fullName}
            </p>
            <p className="text-xs text-gray-500 overflow-x-auto dark:text-gray-400">
              {email}
            </p>
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

        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-0 py-0 lg:px-2 lg:py-2">
          {sidebarArr.map((group) => (
            <div
              key={group.section}
              className="grid font-normal py-0 lg:pt-2 first:lg:pt-0"
            >
              <p className="hidden px-2 py-0 text-[10px] uppercase tracking-wider text-gray-400 font-semibold dark:text-gray-500 lg:block">
                {group.section}
              </p>

              {group.items.map((item) => (
                <NavLink
                  key={`${item.to}-${item.label}`}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    (() => {
                      const isAliasActive = item.activePaths?.includes(
                        location.pathname,
                      );
                      const active = isActive || isAliasActive;
                      return `flex w-10 items-center justify-center gap-0 rounded-none py-0 px-0 text-gray-700 transition-colors hover:bg-purple-50 lg:mx-auto lg:w-full lg:justify-start lg:gap-2 lg:rounded-lg lg:py-2 lg:px-3 ${
                        active ? "lg:bg-purple-50 text-purple-600" : ""
                      }`;
                    })()
                  }
                >
                  <p className="flex items-center">{item.icon}</p>
                  <p className="hidden text-[14px] lg:block">{item.label}</p>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div
          onClick={() => {
            handleLogOut();
          }}
          className="group mt-auto flex cursor-pointer items-center justify-center border-t border-gray-100 py-3.5 text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-red-950/40 dark:hover:text-red-400 lg:justify-between lg:px-4"
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
