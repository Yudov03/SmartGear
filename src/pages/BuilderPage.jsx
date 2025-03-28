import { useState } from "react";
import AxiosInstance from "../axios/AxiosInstance.jsx";
import Layout from "../components/Layout.jsx";

function BuilderPage() {
  const [params, setParams] = useState({
    power: "",
    speed: "",
    lifetime: "",
  });

  const [engines, setEngines] = useState([]);

  const [variables, setVariables] = useState([]);

  const [displayVariables, setDisplayVariables] = useState({ P_ct: "", n_sb: "" });

  const [selectedEngine, setSelectedEngine] = useState(null);

  const [computedVariables, setComputedVariables] = useState([]);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  // Validate input
  const validateParams = () => {
    const { power, speed, lifetime } = params;
    return (
      !isNaN(parseFloat(power)) &&
      !isNaN(parseFloat(speed)) &&
      !isNaN(parseFloat(lifetime)) &&
      parseFloat(power) > 0 &&
      parseFloat(speed) > 0 &&
      parseFloat(lifetime) > 0
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
        const engineList = response.data[0];
        const vars = response.data[1];

        const sortedEngines = engineList.sort((a, b) => b.P_dc - a.P_dc);
        setEngines(sortedEngines);
        setVariables(vars);

        const filteredVars = {
          P_ct: vars.find((v) => v.name === "P_ct")?.P_ct || "",
          n_sb: vars.find((v) => v.name === "n_sb")?.n_sb || "",
        };
        setDisplayVariables(filteredVars);
      }
    } catch (error) {
      console.error("Error fetching engines:", error);
      alert("Không thể lấy danh sách động cơ.");
    }
  };

  const handleSelectEngine = (engineId) => {
    setSelectedEngine(engineId);
  };

  const handleConfirmEngine = async () => {
    if (!selectedEngine) {
      alert("Vui lòng chọn một động cơ!");
      return;
    }

    try {
      const response = await AxiosInstance.get(`build/${selectedEngine}`, {
        params: variables,
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
            {/* Phần bên trái: Hiển thị thông tin input và 2 biến P_ct, n_sb */}
            <div className="flex-1 border-none p-4 rounded-md shadow-md">
              <span className="text-[30px] text-[#4FD1C5] font-[800] mb-1">
                Engine Info
              </span>
              <p className="text-[#A0AEC0] mb-4">
                This is the result based on your input
              </p>

              <div className="mb-6 flex flex-col items-start gap-4">
                <div className="w-[400px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    P
                  </label>
                  <div className="border mt-[15px] border-[#E2E8F0] h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {params.power} kW
                  </div>
                </div>

                <div className="w-[400px] mt-[20px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    n
                  </label>
                  <div className="border mt-[15px] border-gray-300 h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {params.speed} rpm
                  </div>
                </div>
              </div>

              {/* Hiển thị 2 biến: P_ct và n_sb */}
              <div className="mb-6 flex flex-col items-start gap-4">
                <div className="w-[400px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    P_ct
                  </label>
                  <div className="border mt-[15px] border-[#E2E8F0] h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {displayVariables.P_ct} kW
                  </div>
                </div>

                <div className="w-[400px] mt-[20px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    n_sb
                  </label>
                  <div className="border mt-[15px] border-gray-300 h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {displayVariables.n_sb} rpm
                  </div>
                </div>
              </div>

              <p className="text-[#4FD1C5] font-[700]">
                Choose your Engine based on the above input and computed variables
              </p>
            </div>

            {/* Phần bên phải: Danh sách động cơ để người dùng lựa chọn */}
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
                    {engine.company} - {engine.Type} - {engine.P_dc} kW - {engine.n_dc} rpm
                  </li>
                ))}
              </ul>
              {selectedEngine && (
                <button
                  onClick={handleConfirmEngine}
                  className="mt-4 border-none bg-green-500 hover:bg-green-400 w-[150px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                >
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        )}

        {computedVariables.length > 0 && (
          <div className="mt-8">
            <h2 className="text-[30px] text-[#4FD1C5] font-[800] mb-4">
              Computed Variables Table
            </h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {computedVariables.map((variable, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{variable.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{variable.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Component InputField cho các trường nhập liệu
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
