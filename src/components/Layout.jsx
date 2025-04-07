import "../App.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import kinhlup from "../assets/kinhlup.svg";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
  }
`;

function Layout({ content }) {
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
          className={`p-3 px-5 flex items-center rounded-[20px] transition-all duration-150 cursor-pointer ${
            activeNav === navItem ? "bg-white" : "bg-transparent hover:bg-white"
          }`}
        >
          <img
            src={isActiveOrHovered ? afterIcon : beforeIcon}
            className="transition-all duration-150 w-10 h-8"
            alt={`${navItem} Icon`}
          />
          <span
            className={`transition-colors duration-150 text-lg ms-2 ${
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
    <div className="flex min-h-screen">
      <nav className="w-[17%] bg-[#F8F9FA] shadow-md p-[10px] flex flex-col items-center rounded-[20px]">
        <div className="flex mt-5 mb-3 mx-4 items-center">
          <img
            src="/Gear_Builder.svg"
            className="w-[50px] h-[30px]"
            alt="Logo"
          />
          <span className="fw-bold text-black ms-[2px]">SMARTGEAR</span>
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
            <img src="/needhelp.svg" alt="Help Icon" className="w-8 h-8 scale-125" />
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
