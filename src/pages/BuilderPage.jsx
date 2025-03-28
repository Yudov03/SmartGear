 import { useState, useEffect } from "react";
import AxiosInstance from "../axios/AxiosInstance.jsx";
import Layout from "../components/Layout.jsx";

function BuilderPage() {
  const [params, setParams] = useState({
    power: "",
    speed: "",
    lifetime: "",
  });

  const [engines, setEngines] = useState([]); // Danh sách động cơ
  const [variables, setVariables] = useState([]); // Danh sách biến
  const [selectedEngine, setSelectedEngine] = useState(null); // Động cơ được chọn
  const [computedVariables, setComputedVariables] = useState([]); // Kết quả sau tính toán

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const validateParams = () => {
    const { power, speed, lifetime } = params;
    return (
      !isNaN(parseFloat(power)) &&
      !isNaN(parseFloat(speed)) &&
      !isNaN(parseFloat(lifetime)) &&
      power > 0 &&
      speed > 0 &&
      lifetime > 0
    );
  };

  const handleBuild = async () => {
    if (!validateParams()) {
      alert("Vui lòng nhập số hợp lệ!");
      return;
    }

    try {
      const response = await AxiosInstance.get("build/engine", {
        params: {
          P: params.power,
          n: params.speed,
          L: params.lifetime,
        },
      });

      if (response.data) {
        setEngines(response.data[0]); // Danh sách động cơ
        setVariables(response.data[1]); // Danh sách biến
      }
    } catch (error) {
      console.error("Error fetching engines:", error);
      alert("Không thể lấy danh sách động cơ.");
    }
  };

  const handleSelectEngine = async (engineId) => {
    setSelectedEngine(engineId);

    try {
      const response = await AxiosInstance.get(`build/${engineId}`, {
        params: variables, // Gửi toàn bộ danh sách biến
      });

      if (response.data) {
        setComputedVariables(response.data);
      }
    } catch (error) {
      console.error("Error computing transmission:", error);
      alert("Lỗi khi tính toán tỷ số truyền.");
    }
  };

  return (
    <Layout>
      <div>
      <div className="text-[30px] ml-[20px] font-[700] mt-[20px] text-black">
        Gearbox Builder
      </div>
      <div className="mt-[20px] mb-[30px] text-[18px] ml-[20px] text-[#718096]">
        Enter the parameters below
      </div>

        <div className="flex flex-row items-end gap-6 ml-[20px]">
          <div className="flex flex-row gap-[15px]">
            <InputField
              label="P [kW]"
              name="power"
              value={params.power}
              onChange={handleChange}
            />
            <InputField
              label="n [vg/ph]"
              name="speed"
              value={params.speed}
              onChange={handleChange}
            />
            <InputField
              label="L [year]"
              name="lifetime"
              value={params.lifetime}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleBuild}
            className="ml-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[150px] h-[50px] text-[white] text-[20px] rounded-[5px] shadow-md transition-all"
          >
            Build
          </button>
        </div>

        {engines.length > 0 && (
          <div className="mt-8 flex gap-8">
            {/* Phần bên trái (Engine info) */}
            <div className="flex-1 border-none p-4 rounded-md shadow-md">
              <span className="text-[30px] text-[#4FD1C5] font-[800] mb-1">
                Engine
              </span>
              <p className="text-[#A0AEC0] mb-4">
                This is the result based on your input
              </p>

              {/* Giá trị P và n hiển thị ở đây */}
              <div className="mb-6 flex flex-col items-start gap-4">
                {/* Giá trị P */}
                <div className="w-[400px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    P
                  </label>
                  <div className="border mt-[15px] border-[#E2E8F0] h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {params.power} kW
                  </div>
                </div>

                {/* Giá trị n */}
                <div className="w-[400px] mt-[20px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    n
                  </label>
                  <div className="border mt-[15px] border-gray-300 h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {params.speed} rpm
                  </div>
                </div>
              </div>

              <p className="text-[#4FD1C5] font-[700]">
                Choose your Engine based on P and n above
              </p>
            </div>

            {/* Phần bên phải (Danh sách Engine) */}
            <div className="flex-1">
              <h2 className="text-[30px] text-[#4FD1C5] font-[800] mb-4">
                Select an Engine
              </h2>
              <ul>
                {engines.map((engine) => (
                  <li
                    key={engine.id}
                    onClick={() => handleSelectEngine(engine.id)}
                    className={`cursor-pointer p-3 border ${
                      selectedEngine === engine.id ? "bg-gray-300" : ""
                    }`}
                  >
                    {engine.company} - {engine.Type} - {engine.P_dc} kW
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}


        {computedVariables.length > 0 && (
          <div className="mt-8">
            <h2 className="text-[30px] text-[#4FD1C5] font-[800] mb-4">
              Computed Variables
            </h2>
            <ul>
              {computedVariables.map((variable, index) => (
                <li key={index}>
                  {variable.name}: {variable.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}

const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-row items-center gap-[10px]">
    <label className="text-[25px] text-black">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Value"
      className="border pl-[15px] text-[20px] w-[250px] h-[40px] border-gray-300 rounded-[5px] px-4 py-2"
    />
  </div>
);



export default BuilderPage;