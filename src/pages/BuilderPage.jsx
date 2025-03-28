import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout.jsx";

function BuilderPage() {
  // State cho form
  const [params, setParams] = useState({
    power: "",
    speed: "",
    lifetime: "",
  });

  // State để hiển thị khối Engine Info
  const [showEngineResult, setShowEngineResult] = useState(false);

  // State lưu giá trị "chốt" sau khi nhấn Build (chỉ cập nhật khi Build)
  const [builtValues, setBuiltValues] = useState({
    power: "",
    speed: "",
  });

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  // Kiểm tra các giá trị nhập vào phải là số dương
  const validateParams = () => {
    const { power, speed, lifetime } = params;
    const p = parseFloat(power);
    const s = parseFloat(speed);
    const l = parseFloat(lifetime);

    if (isNaN(p) || isNaN(s) || isNaN(l)) {
      return false;
    }
    if (p <= 0 || s <= 0 || l <= 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateParams()) {
      alert("Vui lòng nhập các giá trị số dương cho P, n, và L!");
      return;
    }

    // Tạm thời comment logic gọi API
    // try {
    //   const response = await axios.post("https://your-api.com/build", params);
    //   console.log("Response:", response.data);
    //   // ...
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Có lỗi xảy ra khi gọi API!");
    // }

    // Cập nhật giá trị "chốt" để hiển thị
    setBuiltValues({
      power: params.power,
      speed: params.speed,
    });

    // Hiển thị khối Engine Info
    setShowEngineResult(true);
  };

  return (
    <Layout>
      <div>
        {/* Tiêu đề và mô tả */}
        <div className="text-[35px] font-bold mt-[20px] text-black">
          Gearbox Builder
        </div>
        <div className="text-[#718096] text-[20px] mt-[20px] mb-[50px]">
          Enter the parameters below
        </div>

        {/* Form Builder */}
        <div className="flex flex-row items-end gap-6">
          <div className="flex flex-row gap-6">
            {/* P [kW] */}
            <div className="flex flex-row items-center gap-2">
              <label className="text-[25px] text-black">P [kW]</label>
              <input
                type="text"
                name="power"
                value={params.power}
                onChange={handleChange}
                placeholder="Value"
                className="border pl-[15px] ml-[20px] text-[20px] w-[250px] h-[40px] border-gray-300 rounded-[5px] px-4 py-2"
              />
            </div>

            {/* n [vg/ph] */}
            <div className="flex flex-row items-center gap-2 ml-[20px]">
              <label className="text-[25px] text-black">n [vg/ph]</label>
              <input
                type="text"
                name="speed"
                value={params.speed}
                onChange={handleChange}
                placeholder="Value"
                className="border pl-[15px] ml-[20px] text-[20px] w-[250px] h-[40px] border-gray-300 rounded-[5px] px-4 py-2"
              />
            </div>

            {/* L [year] */}
            <div className="flex flex-row items-center gap-2 ml-[20px]">
              <label className="text-[25px] text-black">L [year]</label>
              <input
                type="text"
                name="lifetime"
                value={params.lifetime}
                onChange={handleChange}
                placeholder="Value"
                className="border pl-[15px] ml-[10px] text-[20px] w-[250px] h-[40px] border-gray-300 rounded-[5px] px-4 py-2"
              />
            </div>
          </div>

          {/* Nút Build */}
          <button
            onClick={handleSubmit}
            className="ml-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] active:bg-[#2E8B87] w-[150px] h-[50px] text-[white] text-[20px] px-4 py-2 rounded-[5px] shadow-md transition-all focus:outline-none focus:ring-0"
          >
            Build
          </button>
        </div>

        {/* Nếu showEngineResult = true thì hiển thị khối Engine Info */}
        {showEngineResult && (
          <div className="mt-8 flex flex-row gap-8">
            {/* Phần bên trái (Engine info) */}
            <div className="flex-1 border-none mt-[50px] p-4 rounded-md shadow-md">
              <span className="text-[30px] text-[#4FD1C5] font-[800] mb-1">
                Engine
              </span>
              <p className="text-[#A0AEC0] mb-4">
                This is the result based on your input
              </p>

              {/* Giá trị P và n hiển thị ở đây (dùng builtValues) */}
              <div className="mb-6 flex flex-col items-start gap-4">
                {/* Khung cho giá trị P */}
                <div className="w-[400px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    P
                  </label>
                  {/* flex items-center để canh giữa theo chiều dọc */}
                  <div className="border mt-[15px] border-[#E2E8F0] h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {builtValues.power} kW
                  </div>
                </div>

                {/* Khung cho giá trị n */}
                <div className="w-[400px] mt-[20px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    n
                  </label>
                  <div className="border mt-[15px] border-gray-300 h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {builtValues.speed} rpm
                  </div>
                </div>
              </div>

              <p className="text-[#4FD1C5] font-[700]">
                Choose your Engine base on P and n above
              </p>
            </div>

            {/* Phần bên phải (Kết quả API) - Đã comment lại */}
            {/* 
            <div className="flex-1 border p-4 rounded-md shadow-md flex flex-col items-center">
              {apiResult && (
                <>
                  {apiResult.imageUrl ? (
                    <img
                      src={apiResult.imageUrl}
                      alt="Engine Result"
                      className="w-[200px] h-[200px] object-contain mb-4"
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] mb-4 flex items-center justify-center bg-gray-200">
                      No Image
                    </div>
                  )}
                  <div className="text-lg">
                    <p>
                      <strong>Power:</strong> {apiResult.power} kW
                    </p>
                    <p>
                      <strong>Speed:</strong> {apiResult.speed} rpm/m
                    </p>
                  </div>
                </>
              )}
            </div>
            */}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default BuilderPage;
