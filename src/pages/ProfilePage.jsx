import { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />

      <div className="mb-6 bg-[#4FD1C5] rounded-bl-[20px] rounded-br-[20px] py-9">
        {/* Profile Card */}
        <div className="w-[95%] px-4 h-[150px] max-w-4xl mx-auto bg-[#f0f1f2] rounded-[20px] p-6 flex items-center justify-between shadow-md">          
          {/* Left: Avatar + Name */}
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/60"
              alt="Avatar"
              className="rounded-full mr-4"
            />
            <div>
              <h2 className=" px-4 text-black text-[20px] font-bold">Võ Lý Đắc Duy</h2>
              <p className="px-4 text-[#718096] text-[16px]">duy.vo09042003@hcmut.edu.vn</p>
            </div>
          </div>

          {/* Right: Tabs */}
          <div className="flex gap-3 px-4">
            <button
              onClick={() => setActiveTab("project")}
              className={`w-[120px] border-none h-[45px] rounded-[20px] font-bold px-4 py-1 transition-all duration-300 border ${
                activeTab === "project"
                  ? "bg-white/40 text-[#2D3748] shadow-md"
                  : "bg-white backdrop-blur-sm text-[#2D3748]"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`w-[120px] border-none h-[45px] rounded-[20px] font-bold px-4 py-1 transition-all duration-300 border ${
                activeTab === "about"
                  ? "bg-white/40 text-[#2D3748] shadow-md"
                  : "bg-white backdrop-blur-sm text-[#2D3748]"
              }`}
            >
              About Me
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-[50px] mx-auto">
        {activeTab === "project" ? (
          <div className="rounded-[20px] bg-white w-full h-[600px]">
            <div className="pt-[30px]"> 
              <span className="text-black text-[25px] font-[900] block ml-[50px]">Projects</span> 
              <span className="text-[#A0AEC0] mt-[10px] text-[15px] block ml-[50px]">Architects design speed reducer</span> 
            </div>
          </div>
        ) : activeTab === "about" ? (
          <div className="rounded-[20px] bg-white w-full h-[600px]">
            <div className="pt-[30px] px-[50px]">
              {/* Tiêu đề Information */}
              <p className="text-black text-[25px] font-[900] mb-6">Information</p>

              <div className="flex flex-wrap">
                {/* Cột bên trái */}
                <div className="w-1/2 pr-[30px]">
                  <div className="py-2">
                    <span className="text-[#718096] text-[20px] font-[800] mb-4">Full Name: </span>
                    <span className="text-[#A0AEC0] text-[20px] mb-4">John Doe</span>
                  </div>

                  <div className="py-2">
                    <span className="text-[#718096] text-[20px] font-[800] mb-4">Email: </span>
                    <span className="text-[#A0AEC0] text-[20px] mb-4">johndoe@example.com</span>
                  </div>

                  <div className="py-2">
                    <span className="text-[#718096] text-[20px] font-[800] mb-4">Phone Number: </span>
                    <span className="text-[#A0AEC0] text-[20px]  mb-4">+123 456 789</span>
                  </div>

                  <div className="py-2">
                    <span className="text-[#718096] text-[20px] font-[800] mb-4">Address: </span>
                    <span className="text-[#A0AEC0] text-[20px]  mb-4">123 Main St, City, Country</span>
                  </div>
                </div>

                {/* Cột bên phải */}
                <div className="w-1/2 pl-[30px]">
                  <div className="py-2">
                    <span className="text-[#718096] text-[20px] font-[800] mb-4">Date of Birth: </span>
                    <span className="text-[#A0AEC0] text-[20px]  mb-4">January 1, 1990</span>
                  </div>

                  <div className="py-2">
                    <span className="text-[#718096] text-[20px] font-[800] mb-4">Gender: </span>
                    <span className="text-[#A0AEC0] text-[20px]  mb-4">Male</span>
                  </div>

                  <div className="py-2">
                    <span className="text-[#718096] text-[20px] font-[800] mb-4">Occupation: </span>
                    <span className="text-[#A0AEC0] text-[20px]  mb-4">Software Engineer</span>
                  </div>

                  <div className="py-2">
                    <span className="text-[#718096] text-[20px] font-[800] mb-4">Nationality: </span>
                    <span className="text-[#A0AEC0] text-[20px] = mb-4">American</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


        ) : null}
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;
