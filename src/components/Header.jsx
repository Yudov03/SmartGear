import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const location = useLocation().pathname.substring(1).toUpperCase();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/users/me");
        const user = response.data;
        if (user && user.firstName && user.lastName) {
          setUserName(`${user.firstName} ${user.lastName}`);
        } else {
          setUserName("Guest");
        }
      } catch (error) {
        // Giữ lại "Guest" nếu có lỗi
        console.warn("Không thể lấy thông tin người dùng, hiển thị Guest.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full bg-[#4FD1C5] py-4 ">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div>
          <span className="text-white text-xs">Pages</span>
          <span className="text-white text-sm"> / {location}</span>
          <p className="text-white font-bold text-md">{location}</p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center w-[200px] h-[40px] p-2 border border-[#E2E8F0] rounded-[15px] bg-white shadow-sm">
            <input
              type="text"
              placeholder="Type here..."
              className="ml-[10px] flex-1 outline-none border-none bg-transparent text-gray-700 px-3"
            />
          </div>

          <div
            className="flex items-center ml-[10px] gap-2 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <button className="btn">
              <img
                src="../public/Profile.svg"
                className="w-[20px] h-[20px]"
                alt="User"
              />
            </button>
            <span className="text-gray-700">{userName}</span>
          </div>

          <button className="btn mt-[4px]">
            <img
              src="/Notification.svg"
              className="w-[25px]"
              alt="Notification"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
