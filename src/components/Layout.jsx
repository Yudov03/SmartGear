import "../App.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Layout({ content, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem("activeNav") || "Home";
  });
  const [hoveredNav, setHoveredNav] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();

    let navName = "Home";
    if (currentPath.startsWith("/builder")) navName = "Builder";
    else if (currentPath.startsWith("/catalog")) navName = "Catalog";
    else if (currentPath.startsWith("/profile")) navName = "Profile";
    else if (currentPath.startsWith("/history")) navName = "History";
    else if (currentPath.startsWith("/logout")) navName = "Logout";

    setActiveNav(navName);
    localStorage.setItem("activeNav", navName);
  }, [location.pathname]);

  const handleNavClick = useCallback(
    (navItem) => {
      if (navItem === "Logout") {
        setShowLogoutModal(true);
        return;
      }

      setActiveNav(navItem);
      setHoveredNav(navItem);
      localStorage.setItem("activeNav", navItem);
      navigate(`/${navItem.toLowerCase()}`);
    },
    [navigate]
  );

  // Confirm logout: close modal, invoke onLogout or navigate
  const confirmLogout = () => {
    setShowLogoutModal(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
  };

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
      <nav className="bg-[#F8F9FA] w-[250px] shadow-md p-6 flex flex-col items-center rounded-[20px]">
        <div className="flex mt-5 mb-3 mx-4">
          <img src="/Gear_Builder.svg" className="w-[30px] h-[30px]" alt="Logo" />
          <span className="fw-bold text-black ms-2">SMARTGEAR</span>
        </div>
        <hr className="w-[50%] h-[2px] bg-gray-400" />

        <ul className="list-none flex flex-col items-center px-0 mt-1">
          {renderNavItem("Home", "/public/Home_Before.svg", "/public/Home_After.svg")}
          {renderNavItem("Builder", "/public/Builder_Before.svg", "/public/Builder_After.svg")}
          {renderNavItem("Catalog", "/public/Catalog_Before.svg", "/public/Catalog_After.svg")}

          <span className="text-black my-4">Account Pages</span>

          {renderNavItem("Profile", "/public/Profile_Before.svg", "/public/Profile_After.svg")}
          {renderNavItem("History", "/public/History_Before.svg", "/public/History_After.svg")}
          {renderNavItem("Logout", "/public/Logout_Before.svg", "/public/Logout_After.svg")}
        </ul>

        {/* Bottom Help Section */}
        <div className="mt-4 bg-[#4FD1C5] rounded-[20px] w-[90%] max-w-sm p-4 relative">
          <div className="w-[25%] h-[30%] rounded-[15px] flex items-center justify-center">
            <img src="/needhelp.svg" alt="Help Icon" className="w-6 h-6 scale-150" />
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

      <div className="flex-1 p-6 overflow-auto relative">
        <div>
        {showLogoutModal && (
          <div className="absolute mt-[200px] ml-[450px] inset-0  flex items-center justify-center z-50">
            <div className="bg-[#4FD1C5] rounded-[20px] p-6 shadow-lg w-[600px] h-[400px] text-center">
              <p className="mt-[50px] text-[30px] text-[white] mb-4">Bạn có chắc chắn muốn đăng xuất không?</p>
              <div className="flex justify-around mt-[150px]">
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 rounded-[15px] bg-[#27c4b5] text-black text-[30px] hover:bg-[#23b8a9] active:scale-[0.97] transition"
                >
                  Có
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 rounded-[15px] bg-[#a4aeb3] text-black text-[30px] hover:bg-[#808080] active:scale-[0.97] transition"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
        {content}
        <div>
        
        </div>
      </div>
    </div>
  );
}

export default Layout;
