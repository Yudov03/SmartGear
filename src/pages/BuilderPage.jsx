import { useState } from "react";
import AxiosInstance from "../axios/AxiosInstance.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ChatBox from "../components/ChatBox.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

function BuilderPage() {
  const [params, setParams] = useState({ power: "", speed: "", lifetime: "" });
  const [engines, setEngines] = useState([10,10,10,10,10],[10,10,10,10,10],[10,10,10,10,10],[10,10,10,10,10]);
  const [variables, setVariables] = useState({
    P_ct: 10,
    n_sb: 10
  });
  const [selectedEngine, setSelectedEngine] = useState(10,10,10,10,10);
  const [computedVariables, setComputedVariables] = useState(10,10,10,10,10);
  const [step, setStep] = useState(1);
  const totalSteps = 4
  const [isEngineConfirmed, setIsEngineConfirmed] = useState(false);


  const getTopEngines = () => engines.slice(0, 5);

  const handleChange = (e) => setParams({ ...params, [e.target.name]: e.target.value });

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

  const handleSelectEngine = (engineId) => {
    setSelectedEngine(engineId);
  };

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
    setIsEngineConfirmed(true);
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

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

        <ProgressBar currentStep={step} totalSteps={totalSteps} />

        <div className="mt-[100px]">
          {step === 1 && (
            <>
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
              {isEngineConfirmed && (
                <div className="mt-8 text-right">
                  <button
                    onClick={handleNext}
                    className="mr-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                  >
                    Next
                  </button>
                </div>
              )}

            </>
            
          )}

          {step === 2 && (
            <>
              <table className="ml-[50px] mt-[150px] table-auto border-collapse border border-gray-300 w-[1000px]">
                <thead>
                  <tr>
                    <th className="text-center border border-gray-300 px-4 py-2 bg-gray-100">
                      Thông số
                    </th>
                    <th className="text-center border border-gray-300 px-4 py-2 bg-gray-100">
                      Giá trị
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Dạng đai", value: "Đai thẳng" },
                    { label: "Tiết diện đai", value: "A" },
                    { label: "Khoảng cách trục", keys: "a" },
                    { label: "Chiều dài đai", keys: "L" },
                    { label: "Góc ôm đai", keys: "alpha_1" },
                    { label: "Số vòng đai chạy trong 1 giây", keys: "circle" },
                    { label: "Đường kính bánh dẫn", keys: "d1" },
                    { label: "Đường kính bánh bị dẫn", keys: "d2" },
                    { label: "Ứng suất lớn nhất", keys: "phi_max" },
                    { label: "Lực căng đai ban đầu", keys: "F_0_final" },
                    { label: "Lực tác dụng lên trục", keys: "F_r" },
                  ].map((item, index) => {
                    let value;
                    if (item.value !== undefined) {
                      value = item.value;
                    } else {
                      const raw = computedVariables[item.keys];
                      value = Number.isInteger(parseFloat(raw))
                        ? raw
                        : parseFloat(raw).toFixed(4);
                    }

                    return (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{item.label}</td>
                        <td className="text-center border border-gray-300 px-4 py-2">
                          {value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-8 text-right">
                <button
                  onClick={handleNext}
                  className="mr-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                >
                  Next
                </button>
              </div>
            </>
          )}





          {step === 3 && (
          <>
            <ConicalGearTable />
            <div className="mt-8 text-right">
              <button
                onClick={handleNext}
                className="mr-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
              >
                Next
              </button>
            </div>
          </>)}

          {step === 4 && (
          <>
            <CylindricalGearTable />
            
          </>)}
        </div>

        <div className="fixed bottom-[50px] right-[50px] z-50">
          <ChatBox />
        </div>
      </div>
      <Footer />
    </>
  );
}

const InputField = ({ label, name, value, onChange, disabled }) => (
  <div className="flex flex-row items-center gap-[10px]">
    <label className="text-[25px] text-black">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`border pl-[15px] text-[20px] w-[250px] h-[40px] border-gray-300 rounded-[5px] px-4 py-2 ${disabled ? "bg-gray-100" : "bg-white"}`}
    />
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between mb-2">
    <span className="font-semibold">{label}</span><span className="text-gray-700">{value}</span>
  </div>
);

const ConicalGearTable = () => {
  const data = [
    ["Chiều dài côn ngoài", "Rₑ = 0.5mₜₑ√z₁²+z₂² = 142.3 (mm)"],
    ["Chiều rộng vành răng", "b = K_beRₑ = 39.84 (mm)"],
    ["Chiều dài côn trung bình", "Rₘ = Rₑ - 0.5b = 122.38 (mm)"],
    ["Đường kính vòng chia ngoài", "dₑ₁ = 90, dₑ₂ = 270 (mm)"],
    ["Góc chia mặt côn", "δ₁ = 18.43°, δ₂ = 71.57°"],
    ["Chiều cao răng ngoài", "hₑ = 6.6 (mm)"],
    ["Chiều cao đầu răng ngoài", "hₐc = 3 (mm)"],
    ["Chiều cao chân răng ngoài", "h_fₑ = 3.6 (mm)"],
    ["Đường kính trung bình", "dₘ₁ = 77.4, dₘ₂ = 232.2 (mm)"],
    ["Khoảng cách đến mặt phẳng vòng ngoài", "B₁ = 134.05, B₂ = 42.15 (mm)"],
    ["Đường kính đỉnh răng ngoài", "dₐₑ₁ = 95.69, dₐₑ₂ = 271.90 (mm)"],
    ["Góc chân răng", "θ_f = 1.45°"],
    ["Góc côn đỉnh", "δₐ = 19.88°, 73.01°"],
    ["Góc côn đáy", "δ_f = 16.99°, 70.12°"],
  ];
  return (
    <table className="table-auto ml-[50px] mt-[150px] border-collapse border border-gray-300 w-[1000px]">
      <thead>
        <tr>
          <th className="border px-4 py-2 bg-gray-100">Thông số</th>
          <th className="border px-4 py-2 bg-gray-100">Bánh dẫn – Bánh bị dẫn</th>
        </tr>
      </thead>
      <tbody>
        {data.map(([l, v], i) => (
          <tr key={i}>
            <td className="border px-4 py-2">{l}</td>
            <td className="border px-4 py-2">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CylindricalGearTable = () => {
  const data = [
    ["Khoảng cách trục", "a_w = 223.5 (mm)"],
    ["Đường kính vòng chia", "d₁ = 99, d₂ = 348 (mm)"],
    ["Chiều rộng vành răng", "b_w = 55.875 (mm)"],
    ["Đường kính lăn", "d_w1 = 99, d_w2 = 348 (mm)"],
    ["Đường kính đỉnh răng", "d_a1 = 105, d_a2 = 354 (mm)"],
    ["Đường kính đáy răng", "d_f1 = 91.5, d_f2 = 340.5 (mm)"],
    ["Đường kính cơ sở", "d_b1 = 93.03, d_b2 = 327.01 (mm)"],
    ["Góc profin gốc", "α = 20°"],
    ["Góc profin răng", "α_t = 20°"],
    ["Góc ăn khớp", "α_tw = 20°"],
  ];
  return (
    <table className="table-auto ml-[50px] mt-[150px] border-collapse border border-gray-300 w-[1000px]">
      <thead>
        <tr>
          <th className="border px-4 py-2 bg-gray-100">Thông số hình học</th>
          <th className="border px-4 py-2 bg-gray-100">Bánh chủ động – Bánh bị động</th>
        </tr>
      </thead>
      <tbody>
        {data.map(([l, v], i) => (
          <tr key={i}>
            <td className="border px-4 py-2">{l}</td>
            <td className="border px-4 py-2">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BuilderPage;
