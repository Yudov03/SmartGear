import { useState, useEffect } from "react";
import AxiosInstance from "../axios/AxiosInstance.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ChatBox from "../components/ChatBox.jsx"

function BuilderPage() {
  // State lưu các tham số đầu vào (P, n, L)
  const [params, setParams] = useState({
    power: "",
    speed: "",
    lifetime: "",
  });

  const getTopEngines = () => {
    return engines.slice(0, 5);
  };

  const [engines, setEngines] = useState([]);
  const [variables, setVariables] = useState();
  const [selectedEngine, setSelectedEngine] = useState();
  const [computedVariables, setComputedVariables] = useState();

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
      // Gửi POST request với P, n, L
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
      }
    } catch (error) {
      console.error("Error fetching engines:", error);
      alert("Không thể lấy danh sách động cơ.");
    }
  };

  // Khi người dùng chọn engine, xóa bảng thông số cũ để cập nhật sau khi xác nhận lại
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
      const response = await AxiosInstance.post(`build/${selectedEngine}`, {
        ...variables,
      });
  
      console.log("Dữ liệu nhận về từ API:", response.data); // Debug xem API trả về gì
  
      if (response.data) {
        setComputedVariables(response.data); // Cập nhật bảng thông số mới
      }
    } catch (error) {
      console.error("Error computing transmission:", error);
      alert("Lỗi khi tính toán tỷ số truyền.");
    }
  };

  return (
    <>
      <Header />
      <div className="mt-[50px] min-h-screen">
        <div className="text-[30px] ml-[50px] font-[700] mt-[20px] text-black">
          Gearbox Builder
        </div>
        <div className="mt-[20px] mb-[30px] text-[18px] ml-[50px] text-[#718096]">
          Enter the parameters below
        </div>

        <div className="flex flex-row items-end gap-6 ml-[50px]">
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
            className="ml-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[150px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
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

              {/* Hiển thị 2 biến: P_ct và n_sb */}
              <div className="mb-6 flex flex-col items-start gap-4">
                <div className="w-[400px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    P_ct
                  </label>
                  <div className="border mt-[15px] border-[#E2E8F0] h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {variables.P_ct} kW
                  </div>
                </div>

                <div className="w-[400px] mt-[20px]">
                  <label className="block text-[20px] font-semibold text-[#4A5568] mb-2">
                    n_sb
                  </label>
                  <div className="border mt-[15px] border-gray-300 h-[45px] rounded-[8px] px-4 text-[18px] text-[#A0AEC0] bg-white flex items-center">
                    {variables.n_sb} rpm
                  </div>
                </div>
              </div>

              <p className="text-[#4FD1C5] font-[700] mt-[50px]">
                Choose your Engine based on the above input and computed
                variables
              </p>
            </div>

            {/* Phần bên phải: Danh sách động cơ để người dùng lựa chọn */}
            <div className="flex-1">
              <h2 className="text-[30px] text-[#4FD1C5] font-[800] mb-4 mt-[30px]">
                Select an Engine
              </h2>

              <ul className="list-none space-y-[20px]">
                {getTopEngines().map((engine) => {
                  const isSelected = selectedEngine === engine.id;
                  return (
                    <li
                      key={engine.id}
                      onClick={() => handleSelectEngine(engine.id)}
                      className={`w-[700px] cursor-pointer rounded-[20px] p-3 border transition-all ${
                        isSelected
                          ? "bg-[#3BAFA2] hover:bg-[#3BAFA2] text-white shadow-md"
                          : "bg-[#56D3C7] hover:bg-[#3BAFA2] text-white shadow-md"
                      }`}
                    >
                      {engine.company} - {engine.Type} - {engine.P_dc} kW - {engine.n_dc} rpm
                    </li>
                  );
                })}
              </ul>

              {selectedEngine && (
                <button
                  onClick={handleConfirmEngine}
                  className="mt-4 border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[150px] h-[50px] text-white text-[20px] rounded-[15px] shadow-md transition-all"
                >
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        )}

        {computedVariables && Object.keys(computedVariables).length > 0 && (
          <div className="mt-8 ml-[50px]">
            <h2 className="text-[30px] text-[#4FD1C5] font-[800] mb-4">
              Computed Variables Table
            </h2>
            <div className="overflow-x-auto">
              <table className="table-auto h-[400px] border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th
                      className="text-center border border-gray-300 px-4 py-2 bg-gray-100"
                      rowSpan="2"
                    >
                      Thông số
                    </th>
                    <th
                      className="text-center border border-gray-300 px-4 py-2 bg-gray-100"
                      colSpan="5"
                    >
                      Trục
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center border border-gray-300 px-4 py-2 bg-gray-100">
                      Động cơ
                    </th>
                    <th className="text-center border border-gray-300 px-4 py-2 bg-gray-100">
                      I
                    </th>
                    <th className="text-center border border-gray-300 px-4 py-2 bg-gray-100">
                      II
                    </th>
                    <th className="text-center border border-gray-300 px-4 py-2 bg-gray-100">
                      III
                    </th>
                    <th className="text-center border border-gray-300 px-4 py-2 bg-gray-100">
                      Công tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Công suất P (kW)",
                      keys: ["P_real", "P1", "P2", "P3", "P_ct"],
                    },
                    {
                      label: "Tỷ số truyền u",
                      keys: ["u_d", "u_brc", "u_brt", "u_kn"],
                    },
                    {
                      label: "Moment xoắn M (N.mm)",
                      keys: ["T_dc", "T1", "T2", "T3", "T_tt"],
                    },
                    {
                      label: "Số vòng quay n (vg/ph)",
                      keys: ["n_real", "n1", "n2", "n3", "n"],
                    },
                  ].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.label}
                      </td>
                      {row.keys.length === 4 ? (
                        <td colSpan="5" className="border border-gray-300 px-4 py-2">
                          <div className="flex text-center justify-around">
                            {row.keys.map((key, index) => {
                              const value = computedVariables[key];
                              const displayValue =
                                Number.isInteger(parseFloat(value)) ? value : parseFloat(value).toFixed(4);
                        
                              return <span key={index}>{displayValue}</span>;
                            })}
                          </div>
                        </td>
                      ) : (
                        row.keys.map((key, index) => {
                          const value = computedVariables[key];
                          const displayValue =
                            Number.isInteger(parseFloat(value)) ? value : parseFloat(value).toFixed(4);
                        
                          return (
                            <td key={index} className="text-center border border-gray-300 px-4 py-2">
                              {displayValue}
                            </td>
                          );
                        })                        
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Phần cho Chatbox */}
        <div className="fixed bottom-[50px] right-[50px] z-50">
          <ChatBox />
        </div>

                    


      </div>
      <Footer />
      
    </>
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
