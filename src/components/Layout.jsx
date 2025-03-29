import "../App.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  // Lưu trạng thái trang đang active, khởi tạo từ localStorage hoặc mặc định "Home"
  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem("activeNav") || "Home";
  });
  // State để theo dõi nav item đang được hover
  const [hoveredNav, setHoveredNav] = useState(null);

  // Khi activeNav thay đổi, lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("activeNav", activeNav);
  }, [activeNav]);

  // Hàm xử lý khi nhấn vào một nav item
  const handleNavClick = useCallback(
    (navItem) => {
      setActiveNav(navItem);
      setHoveredNav(navItem);
      // Sử dụng requestAnimationFrame để chuyển hướng mượt hơn
      requestAnimationFrame(() => {
        navigate(`/${navItem.toLowerCase()}`);
      });
    },
    [navigate]
  );

  // Hàm render một item của sidebar
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
          className={`p-2 flex items-center rounded-3 transition-all duration-150 cursor-pointer ${
            activeNav === navItem
              ? "bg-[white]"
              : "bg-transparent hover:bg-[white]"
          }`}
        >
          <img
            src={isActiveOrHovered ? afterIcon : beforeIcon}
            className="transition-all duration-150 w-25"
            alt={`${navItem} Icon`}
          />
          <span
            className={`transition-colors duration-150 fs-6 ms-2 ${
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
    <>
      <GlobalStyle />
      <div className="bg-[#F8F9FA] flex">
        {/* Sidebar */}
        <div className="bg-[#F8F9FA] shadow-md p-6 flex flex-col items-center rounded-[20px] ">
          <div className="flex items-center justify-center mt-5 mb-3 mx-4">
            <img
              src="/Gear_Builder.svg"
              className="w-[30px] h-[30px]"
              alt="Logo"
            />
            <span className="  fw-bold text-black ms-2 ">SMARTGEAR</span>
          </div>
          <hr className="w-[50%] h-[2px] bg-gray-400 " />

          <nav className=" mt-1">
            <ul className="list-none flex flex-col px-3">
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
          </nav>
        </div>

        {/* Khối bên phải */}
        <div className="flex flex-col bg-white w-full">
          {/* Header */}
          <div className="bg-[#F8F9FA]">
            <div className=" shadow-md flex justify-between items-center">
              {/* Breadcrumb + Title */}
              <div className="shadow-md flex justify-between items-center">
                <div className="flex flex-col fs-7">
                  <span className="text-[#A0AEC0]">Pages / {activeNav}</span>
                  <span className=" mb-[10px] font-semibold mt-[4px] text-black">
                    {activeNav}
                  </span>
                </div>
                {/* Search Input + User Info + Notification */}
                <div className=" flex items-center gap-6">
                  {/* Search Input */}
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

                  {/* User Info */}

                  <div className="flex ml-[50px] items-center gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-2 cursor-pointer">
                      <img
                        src="../public/Profile.svg"
                        className="w-[17px] h-[17px]"
                        alt="User"
                      />
                      <span className="ml-[5px] text-gray-700">Duy Vo</span>
                    </div>

                    {/* Notification */}
                    <div className="cursor-pointer">
                      <img
                        src="../public/Notification.svg"
                        className=" mt-[5px] w-[18px] h-[18px] ml-[15px]"
                        alt="Notification"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nội dung chính được truyền qua prop children */}
          <div className="flex-1 p-6 bg-[white] rounded-[20px] mt-[5px] ml-[50px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 body {
    font-family: Arial, sans-serif;
  }
`;
