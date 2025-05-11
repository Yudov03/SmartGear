<<<<<<< HEAD
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation().pathname.substring(1).toLocaleUpperCase(1);

  return (
    <div className="bg-white w-full">
      <div className="bg-[#F8F9FA]">
        <div className=" d-flex justify-content-between align-items-center">
          <div className="mt-2 mb-2 ms-4">
            <span className="">
              <span className="text-[#A0AEC0] text-[10px] mb-0">Pages </span>
              <span className="text-[12px]" style={{ color: "#2D3748" }}>
                / {location}
              </span>
            </span>
            <p className=" fw-bold mb-0 text-[14px]">{location}</p>
          </div>
          {/* Search Input + User Info + Notification */}
          <div className="d-flex gap-4 me-4">
            <div className=" flex items-center w-[200px] h-[40px] p-2 border border-[#E2E8F0] rounded-[15px] bg-white shadow-sm">
              <input
                type="text"
                placeholder="Type here..."
                className="ml-[10px] flex-1 outline-none border-none bg-transparent text-gray-700 px-3"
              />
            </div>
            <div className="flex items-center gap-2 ">
              <img
                src="../public/Profile.svg"
                className="w-[20px] h-[20px]"
                alt="User"
              />
              <span className="ml-[5px] text-gray-700">Duy Vo</span>
            </div>
            <div className="">
              <img
                src="../public/Notification.svg"
                className="w-[25px]"
                alt="Notification"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex-1 p-6 bg-[white] rounded-[20px] mt-[5px] ml-[50px]">
            {children}
          </div> */}
    </div>
  );
};
=======
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation().pathname.substring(1).toUpperCase();
  const navigate = useNavigate();

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
            <span className="text-gray-700">Duy Vo</span>
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

>>>>>>> origin/front-end
export default Header;
