
import { useState, useEffect } from "react";
import AxiosInstance from "../axios/AxiosInstance.jsx";
import Layout from "../components/Layout.jsx";

function BuilderPage() {
  // State lưu các tham số đầu vào (P, n, L)
  const [params, setParams] = useState({
    power: "",
    speed: "",
    lifetime: "",
  });
 
  // State lưu danh sách động cơ nhận từ API
  const [engines, setEngines] = useState([10,10,10,10,10,10,10]);

  // State lưu danh sách biến nhận từ API
  const [variables, setVariables] = useState(10);

  // State lưu động cơ đã được chọn
  const [selectedEngine, setSelectedEngine] = useState(10);

  // State lưu kết quả tính toán tỷ số truyền (computed variables)
  const [computedVariables, setComputedVariables] = useState(10);

  // Xử lý thay đổi input
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

  // Xử lý khi nhấn Build: gửi GET request và nhận dữ liệu từ API
  const handleBuild = async () => {
    if (!validateParams()) {
      alert("Vui lòng nhập số hợp lệ!");
      return;
    }
  
    try {
      const response = await AxiosInstance.post("build/engine", {
        P: params.power,
        n: params.speed,
        L: params.lifetime,
      });
  
      if (response.data) {
        const engineList = response.data[0];
        const vars = response.data[1];
  
        setEngines(engineList);
        setVariables(vars);
  
        // Xác định động cơ phù hợp nhất
        if (engineList.length > 0) {
          let bestEngine = engineList[0];
          let minScore = Math.abs(bestEngine.P_dc - vars.P_ct) + Math.abs(bestEngine.n_dc - vars.n_sb);
  
          engineList.forEach((engine) => {
            let score = Math.abs(engine.P_dc - vars.P_ct) + Math.abs(engine.n_dc - vars.n_sb);
            if (score < minScore) {
              minScore = score;
              bestEngine = engine;
            }
          });
  
          setRecommendedEngine(bestEngine.id);
        }
      }
    } catch (error) {
      console.error("Error fetching engines:", error);
      alert("Không thể lấy danh sách động cơ.");
    }
  };
  

  // Xử lý khi chọn 1 động cơ từ danh sách (chỉ lưu lựa chọn, không gửi GET ngay)
  const handleSelectEngine = (engineId) => {
    setSelectedEngine(engineId);
  };

  // Xử lý khi nhấn nút "Xác nhận" sau khi đã chọn động cơ
  const handleConfirmEngine = async () => {
    if (!selectedEngine) {
      alert("Vui lòng chọn một động cơ!");
      return;
    }

    try {
      // Gửi Post request đến build/{engineId} với các biến làm tham số
      const response = await AxiosInstance.post(`build/${selectedEngine}`, {
        ...variables,
      });

      if (response.data) {
        setComputedVariables(response.data); // phản hồi là object not listlist
      }
    } catch (error) {
      console.error("Error computing transmission:", error);
      alert("Lỗi khi tính toán tỷ số truyền.");
    }
  };
  
  // ấn xác nhận lần đầu nó không nhận phải render lại mới nhận
  useEffect(() => {
    console.log('computedVariables đã cập nhật:', computedVariables);
  }, [computedVariables]); // Tự động khi state thay đổi

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
            <div className="ml-[50px] mt-[50px] flex-1 border-none p-4 rounded-md shadow-md">
              <span className="text-[30px] text-[#4FD1C5] font-[650] mb-1">
                Engine Info
              </span>
              <p className="text-[#A0AEC0] mb-4">
                This is the result based on your input
              </p>


              {/* Hiển thị 2 biến: P_ct và n_sb */}
              <div className="mb-6 flex flex-col items-start gap-4">
                <div className="w-[400px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    P_ct
                  </label>
                  <div className="border mt-[15px] border-[#E2E8F0] h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    <span>{variables.P_ct}</span> 
                    <span className="ml-[10px]">kW</span>
                  </div>

                </div>

                <div className="w-[400px] mt-[20px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    n_sb
                  </label>
                  <div className="border mt-[15px] border-[#E2E8F0] h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    <span>{variables.n_sb}</span> 
                    <span className="ml-[10px]">rpm</span>
                  </div>
                </div>
              </div>

              <p className="text-[#4FD1C5] font-[700]">
                Choose your Engine based on the above input and computed variables
              </p>
            </div>

            {/* Phần bên phải: Danh sách động cơ để người dùng lựa chọn */}
            <div className="flex-1">
              <h2 className="text-[30px] mt-[50px] text-[#4FD1C5] font-[800] mb-4">
                Select an Engine
              </h2>
              <div className="space-y-[20px]"> {/* Thêm khoảng cách giữa các khung */}
              {engines.slice(0, 5).map((engine) => (
                <div
                  key={engine.id}
                  onClick={() => handleSelectEngine(engine.id)}
                  className={`cursor-pointer w-[500px] h-[60px] rounded-[20px] flex p-4 border border-gray-300 rounded-lg shadow-md transition-all duration-200 ${
                    selectedEngine === engine.id ? "bg-gray-300" : "bg-white"
                  } ${engine.id === recommendedEngine ? "border-2 border-green-500" : ""}`}
                >
                  <p className="ml-[10px] text-lg font-semibold text-gray-800">{engine.company}</p>
                  <p className="ml-[10px] text-gray-600">Type: {engine.Type}</p>
                  <p className="ml-[10px] text-gray-600">Power: {engine.P_dc} kW</p>
                  <p className="ml-[10px] text-gray-600">Speed: {engine.n_dc} rpm</p>
                  {engine.id === recommendedEngine && (
                    <span className="ml-auto text-white bg-green-500 px-3 py-1 rounded-full text-sm">
                      Recommended
                    </span>
                  )}
                </div>
              ))}

              </div>

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

        {computedVariables && Object.keys(computedVariables).length > 0 && (
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
                {Object.entries(computedVariables).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border border-gray-300 px-4 py-2">{key}</td>
                    <td className="border border-gray-300 px-4 py-2">{value}</td>
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
