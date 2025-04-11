import "../App.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import kinhlup from "../assets/kinhlup.svg";

function Layout({ content }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem("activeNav") || "Home";
  });
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    localStorage.setItem("activeNav", activeNav);
  }, [activeNav]);

  const handleNavClick = useCallback(
    (navItem) => {
      setActiveNav(navItem);
      setHoveredNav(navItem);
      requestAnimationFrame(() => {
        navigate(`/${navItem.toLowerCase()}`);
      });
    },
    [navigate]
  );

  // Hàm render một item của navbar
  const renderNavItem = useCallback(
    (navItem, beforeIcon, afterIcon) => {
      const isActiveOrHovered = activeNav === navItem || hoveredNav === navItem;
      return (
        <li
          key={navItem}
          onClick={() => handleNavClick(navItem)}
          onTouchStart={() => handleNavClick(navItem)}
          onMouseEnter={() => setHoveredNav(navItem)}
          onMouseLeave={() => setHoveredNav(null)}
          className={`h-[64px] p-3 px-5 flex items-center rounded-[20px] transition-all duration-150 cursor-pointer ${
            activeNav === navItem ? "bg-white" : "bg-transparent hover:bg-white"
          }`}
        >
          <img
            src={isActiveOrHovered ? afterIcon : beforeIcon}
            className="w-10 h-8 object-contain transition-opacity duration-150"
            alt={`${navItem} Icon`}
          />
          <span
            className={`transition-colors duration-150 fs-6 ms-3 ${
              isActiveOrHovered ? "text-black" : "text-[#A0AEC0]"
            }`}
          >
            {navItem}
          </span>
        </li>
      );
    },
    [activeNav, hoveredNav, handleNavClick]
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-[#F8F9FA] shadow-md p-6 flex flex-col items-center rounded-[20px]">
        <div className="flex mt-5 mb-3 mx-4">
          <img
            src="/Gear_Builder.svg"
            className="w-[30px] h-[30px]"
            alt="Logo"
          />
          <span className="fw-bold text-black ms-2">SMARTGEAR</span>
        </div>
        <hr className="w-[50%] h-[2px] bg-gray-400" />
        <ul className="list-none flex flex-col items-center px-0 mt-1">
          {renderNavItem(
            "Home",
            "/public/Home_Before.svg",
            "/public/Home_After.svg"
          )}
          {renderNavItem(
            "Builder",
            "/public/Builder_Before.svg",
            "/public/Builder_After.svg"
          )}
          {renderNavItem(
            "Catalog",
            "/public/Catalog_Before.svg",
            "/public/Catalog_After.svg"
          )}
          {renderNavItem(
            "Setting",
            "/public/Setting_Before.svg",
            "/public/Setting_After.svg"
          )}

          {/* Tiêu đề phân nhóm Account Pages */}
          <span className="text-black my-4">Account Pages</span>

          {renderNavItem(
            "Profile",
            "/public/Profile_Before.svg",
            "/public/Profile_After.svg"
          )}
          {renderNavItem(
            "History",
            "/public/History_Before.svg",
            "/public/History_After.svg"
          )}
          {renderNavItem(
            "Logout",
            "/public/Logout_Before.svg",
            "/public/Logout_After.svg"
          )}
        </ul>
        <div className="mt-4 bg-[#4FD1C5] rounded-[20px] w-[90%] max-w-sm p-4  relative">
          <div className="w-[25%] h-[30%] bg-white rounded-[15px] flex items-center justify-center">
            <img
              src="/needhelp.svg"
              alt="Help Icon"
              className="w-8 h-8 scale-125"
            />
          </div>

          <div className="mt-4">
            <h2 className="text-white text-[20px] font-semibold">Need help?</h2>
            <p className="text-white text-[15px] mt-1">Please check our docs</p>
          </div>

          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-2 border-none rounded-[15px] bg-white text-black px-4 py-2 mb-3 font-bold shadow-sm hover:bg-gray-100 active:scale-[0.97] active:translate-y-[1px] transition duration-150 ease-in-out">
              <span className="text-[14px]">DOCUMENTATION</span>
            </button>
          </div>
        </div>
      </nav>
      <div className="flex-1 p-6 overflow-auto">{content}</div>
    </div>
  );
}

export default Layout;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 body {
    font-family: Arial, sans-serif;
  }
`;

{
  /* <div className="items-center gap-6">
 
  <div className="flex items-center w-[200px] h-[40px] p-2 border border-[#E2E8F0] rounded-[15px] bg-white shadow-sm">
    <svg
      className="ml-[10px] w-[15px] h-[15px] text-gray-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.55-5.9a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      ></path>
    </svg>
    <input
      type="text"
      placeholder="Type here..."
      className="ml-[10px] flex-1 outline-none border-none bg-transparent text-gray-700 px-3"
    />
  </div>

  

  <div className="flex ml-[50px] items-center gap-4">
    
    <div className="flex items-center gap-2 cursor-pointer">
      <img
        src="../public/Profile.svg"
        className="w-[17px] h-[17px]"
        alt="User"
      />
      <span className="ml-[5px] text-gray-700">Duy Vo</span>
    </div>

    
    <div className="cursor-pointer">
      <img
        src="../public/Notification.svg"
        className=" mt-[5px] w-[18px] h-[18px] ml-[15px]"
        alt="Notification"
      />
    </div>
  </div>
</div>; */
}
