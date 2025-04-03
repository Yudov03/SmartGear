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
              <button className="btn">
                <img
                  src="../public/Profile.svg"
                  className="w-[20px] h-[20px]"
                  alt="User"
                />
              </button>
              <span className="ml-[5px] text-gray-700">Duy Vo</span>
            </div>
            <div className="">
              <button className="btn mt-[4px]">
                <img
                  src="../public/Notification.svg"
                  className="w-[25px]"
                  alt="Notification"
                />
              </button>
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
export default Header;