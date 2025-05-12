import { useState, useEffect } from "react";
import AxiosInstance from "../axios/AxiosInstance.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ChatBox from "../components/ChatBox.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function BuilderPage({ readOnly = false, initialData = null, projectId = null }) {
  const [params, setParams] = useState({ power: "", speed: "", lifetime: "" });
  const [engines, setEngines] = useState([]);
  const [variables, setVariables] = useState({});
  const [selectedEngine, setSelectedEngine] = useState();
  const [computedVariables, setComputedVariables] = useState({});
  const [step, setStep] = useState(1);
  const totalSteps = 5
  const [isEngineConfirmed, setIsEngineConfirmed] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [built, setBuilt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predict, setPredict] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      AxiosInstance.get(`/projects/${id}`)
        .then((res) => {
          console.log(res.data);
          setVariables(res.data);
          setComputedVariables(res.data);
          setStep(1);
          setParams({power: res.data.P, speed: res.data.n_def, lifetime: res.data.L_def});
          setBuilt(true);
          setIsEngineConfirmed(true);
          setSelectedEngine(res.data.engineId);
          AxiosInstance.post("build/engine", {
            P: res.data.P,
            n: res.data.n_def,
            L: res.data.L_def,
          }).then((res) => {
            setEngines(res.data[0]);
          });
        })
        .catch((err) => console.log(err));  
    }
  }, [id]);

  useEffect(() => {
    if (initialData) {
      const { params, engines, variables, selectedEngine, computedVariables, step: initStep } = initialData;
      setParams(params || { power: "", speed: "", lifetime: "" });
      setEngines(engines || []);
      setVariables(variables || { P_ct: null, n_sb: null });
      setSelectedEngine(selectedEngine || null);
      setComputedVariables(computedVariables || {});
      setStep(initStep || 1);
      setBuilt(true);
      setIsEngineConfirmed(!!selectedEngine);
    }
  }, [initialData]);

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
    if (readOnly) return;
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
        setBuilt(true);
        setComputedVariables({});
        setIsEngineConfirmed(false);
        setSelectedEngine(null);
      }
    } catch (error) {
      console.error("Error fetching engines:", error);
      alert("Không thể lấy danh sách động cơ.");
    }
  };

  const handleSelectEngine = (engineId) => {
    !readOnly && setSelectedEngine(engineId)
  };

  const handleConfirmEngine = async () => {
    if (readOnly) return;
    if (!selectedEngine) {
      alert("Vui lòng chọn một động cơ!");
      return;
    }
    try {
      const response = await AxiosInstance.post(`build/${selectedEngine}`, {
        ...variables,
      });
  
      console.log("Dữ liệu nhận về từ API:", response.data); 
  
      if (response.data) {
        setComputedVariables(response.data); 
      }
    } catch (error) {
      console.error("Error computing transmission:", error);
      alert("Lỗi khi tính toán tỷ số truyền.");
    }
    setIsEngineConfirmed(true);
  };

  useEffect(() => {
    if (readOnly || !selectedEngine || step !== 2) return;
    setLoading(true);
    AxiosInstance.post(`build/step2`, variables)
      .then(({ data }) => {
        console.log("API Step2 trả về:", data);
        setComputedVariables({...computedVariables, ...data});
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedEngine, variables, readOnly, step]);

  useEffect(() => {
    if (readOnly || !selectedEngine || step !== 3) return;
    setLoading(true);
    AxiosInstance.post(`build/step3`, variables)
      .then(({ data }) => {
        console.log("API Step3 trả về:", data);
        setComputedVariables({...computedVariables, ...data});
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedEngine, variables, readOnly, step]);

  useEffect(() => {
    if (readOnly || !selectedEngine || step !== 4) return;
    setLoading(true);
    AxiosInstance.post(`build/step4`, variables)
      .then(({ data }) => {
        console.log("API Step4 trả về:", data);
        setComputedVariables({...computedVariables, ...data});
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedEngine, variables, readOnly, step]);

  useEffect(() => {
    if (readOnly || !selectedEngine || step !== 5) return;
    setLoading(true);
    AxiosInstance.post(`price/predict`, variables)
      .then(({ data }) => {
        console.log("API Predict trả về:", data);
        setPredict(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedEngine, variables, readOnly, step]);

  useEffect(() => {
    console.log("computedVariables hiện tại:", computedVariables);
  }, [computedVariables]);
    

  const handleNext = () => !readOnly && setStep(s => Math.min(s + 1, totalSteps));
  const handlePrev = () => !readOnly && setStep(s => Math.max(s - 1, 1));
  const handleSave = async () => {
    if (readOnly) return;
    try {
      console.log(selectedEngine);
      const payload = {
        engineId: selectedEngine,
        price: predict[0],
        ...computedVariables,
      };
      console.log("Payload:", payload);
      await AxiosInstance.post(`projects`, payload);
      //console.log("Response from saving project:", response.data);
      setSaveSuccess(true);
      toast.success("Sign Up successful!");
      setTimeout(() => navigate(`/projects`), 1000);
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lưu dữ liệu.");
    }
  };
  
  return (
    <>
      <Header />
      <div className="mt-[50px] min-h-screen">
        <div className="text-[30px] ml-[50px] font-[700] mt-[20px] text-black">
          {readOnly ? "Project Details" : "Gearbox Builder"}
        </div>
        <div className="mt-[20px] mb-[30px] text-[18px] ml-[50px] text-[#718096]">
          Enter the parameters below
        </div>

        <div className="flex flex-row items-end justify-between ml-[50px] mr-[50px]">
          <InputField
            label="P [kW]"
            name="power"
            value={params.power}
            onChange={handleChange}
            disabled={readOnly || step>=2}
          />
          <InputField
            label="n [vg/ph]"
            name="speed"
            value={params.speed}
            onChange={handleChange}
            disabled={readOnly || step>=2}
          />
          <InputField
            label="L [year]"
            name="lifetime"
            value={params.lifetime}
            onChange={handleChange}
            disabled={readOnly || step>=2}
          />

          {!readOnly && (
            <button
              onClick={step < 2 ? handleBuild : handleSave}
              className="ml-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[150px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
            >
              {step < 2 ? "Build" : "Save"}
            </button>
          )}

        </div>

        <ProgressBar currentStep={step} totalSteps={totalSteps} />

        <div className="mt-[50px]">
          {step === 1 && (
            <>
              {engines.length > 0 && (
                <div className="mt-8 flex ml-[25px] gap-8">
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

                    
                  </div>

                  <div className="flex-1 mr-[100px]">
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

                    
                    {selectedEngine && !readOnly && (
                      <div className="flex justify-center">
                        <button
                          onClick={handleConfirmEngine}
                          className="mt-4 border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[150px] h-[50px] text-white text-[20px] rounded-[15px] shadow-md transition-all"
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {computedVariables && Object.keys(computedVariables).length > 0 && (
                <>
                <div className="mt-8 ml-[50px] mr-[50px]">
                  <hr className="h-2 my-8 bg-gray-200 border-1 dark:bg-gray-700" />
                  <h2 className="text-[30px] flex justify-center text-[#4FD1C5] font-[800] mb-4 mt-[25px]">
                    Computed Variables Table
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-3/4 mx-auto h-[400px] border-collapse border border-gray-300">
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
              </>
                
              )}
              {isEngineConfirmed && (
                <div className ="m-[50px]">
                  <hr className="h-2 my-8 bg-gray-200 border-1 dark:bg-gray-700" />
                  <div className="flex items-center justify-center gap-4 mt-[30px]">
                    <button
                      onClick={handlePrev}
                      className="mr-[500px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="mr-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

            </>
            
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col justify-center m-[50px]">
                <h2 className ="text-[30px] flex justify-center text-[#4FD1C5] font-[800] mb-4 mt-[25px]">Belt Drive Type</h2>
                <BeltTable />
              </div>
              <div className ="m-[50px] ">
                <hr className="h-2 my-8 bg-gray-200 border-1 dark:bg-gray-700" />
                <h2 className ="text-[30px] flex justify-center text-[#4FD1C5] font-[800] mb-4 mt-[25px]">Belt Drive Parameters Table</h2>
                <div className = "flex justify-center">
                <table className="mt-10 w-[1000px] mx-auto border border-gray-300 border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-center font-semibold">Thông số</th>
                      <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-center font-semibold">Giá trị</th>
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
                    ].map((item, i) => {
                      const raw = item.value != null
                        ? item.value
                        : computedVariables[item.keys];
                      const display = item.value != null
                        ? item.value
                        : Number.isFinite(+raw)
                          ? parseFloat(raw).toFixed(4)
                          : raw ?? "--";
                      return (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border border-gray-300 text-center">{item.label}</td>
                          <td className="px-4 py-2 border border-gray-300 text-center">{display}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                </div>
              </div>

              <div className ="m-[50px]">
                  <hr className="h-2 my-8 bg-gray-200 border-1 dark:bg-gray-700" />
                  <div className="flex items-center justify-center gap-4 mt-[30px]">
                    <button
                      onClick={handlePrev}
                      className="mr-[500px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="mr-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
            </>
          )}

          {step === 3 && (
          <>
            {/* <ConicalGearTable /> */}
              <div className ="m-[50px] ">
                <h2 className ="text-[30px] flex justify-center text-[#4FD1C5] font-[800] mb-4 mt-[25px]">Conical Gear Details</h2>
                <div className = "flex justify-center">
                <table className="mt-10 w-[1000px] mx-auto border border-gray-300 border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-center font-semibold">Thông số </th>
                      <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-center font-semibold">Bánh dẫn - Bánh bị dẫn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Chiều dài côn ngoài", keys: "R_e" },
                      { label: "Chiều rộng vành răng", keys: "b" },
                      { label: "Chiều dài côn trung bình", keys: "R_m" },
                      { label: "Đường kính vòng chia ngoài", keys: "d_e1" },
                      { label: "Góc chia mặt côn", keys: "goc_1" },
                      { label: "Chiều cao răng ngoài", keys: "h_e" },
                      { label: "Chiều cao đầu răng ngoài", keys: "h_ae1" },
                      { label: "Chiều cao chân răng ngoài", keys: "h_fe1" },
                      { label: "Đường kính trung bình", keys: "d_m1" },
                      { label: "Khoảng cách đến mặt phẳng vòng ngoài", keys: "B_1" },
                      { label: "Đường kính đỉnh răng ngoài", keys: "d_ae1" },
                      { label: "Góc chân răng", keys: "theta_f1" },
                      { label: "Góc côn đỉnh", keys: "goc_a1" },
                      { label: "Góc côn đáy", keys: "goc_f1" },
                    ].map((item, i) => {
                      const raw = item.value != null
                        ? item.value
                        : computedVariables[item.keys];
                      const display = item.value != null
                        ? item.value
                        : Number.isFinite(+raw)
                          ? parseFloat(raw).toFixed(4)
                          : raw ?? "--";
                      return (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border border-gray-300 text-center">{item.label}</td>
                          <td className="px-4 py-2 border border-gray-300 text-center">{display}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                </div>
              </div>
            <div className ="m-[50px]">
              <hr className="h-2 my-8 bg-gray-200 border-1 dark:bg-gray-700" />
              <div className="flex items-center justify-center gap-4 mt-[30px]">
                <button
                  onClick={handlePrev}
                  className="mr-[500px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="mr-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </>)}

          {step === 4 && (
          <>
            {/* <CylindricalGearTable /> */}
            <div className ="m-[50px] ">
                <h2 className ="text-[30px] flex justify-center text-[#4FD1C5] font-[800] mb-4 mt-[25px]">Cylindrical Gear Details</h2>
                <div className = "flex justify-center">
                <table className="mt-10 w-[1000px] mx-auto border border-gray-300 border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-center font-semibold">Thông số hình học</th>
                      <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-center font-semibold">Bánh chủ động – Bánh bị động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Khoảng cách trục", keys: "a_w" },
                      { label: "Đường kính vòng chia", keys: "d1_cd" },
                      { label: "Chiều rộng vành răng", keys: "b_w" },
                      { label: "Đường kính lăn", keys: "d_w1" },
                      { label: "Đường kính đỉnh răng", keys: "d_a1" },
                      { label: "Đường kính đáy răng", keys: "d_f1" },
                      { label: "Đường kính cơ sở", keys: "d_b1" },
                      { label: "Góc profin gốc", keys: "profin" },
                      { label: "Góc profin răng", keys: "profin_rang" },
                      { label: "Góc ăn khớp", keys: "alpha_tw" },
                    ].map((item, i) => {
                      const raw = item.value != null
                        ? item.value
                        : computedVariables[item.keys];
                      const display = item.value != null
                        ? item.value
                        : Number.isFinite(+raw)
                          ? parseFloat(raw).toFixed(4)
                          : raw ?? "--";
                      return (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border border-gray-300 text-center">{item.label}</td>
                          <td className="px-4 py-2 border border-gray-300 text-center">{display}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                </div>
              </div>
            <div className ="m-[50px]">
              <hr className="h-2 my-8 bg-gray-200 border-1 dark:bg-gray-700" />
              <div className="flex items-center justify-center gap-4 mt-[30px]">
                <button
                  onClick={handlePrev}
                  className="mr-[500px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="mr-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </>)}

          {step === 5 && (
            <div className="mx-auto ml-[50px] mt-[10px]">
              <h2 className="text-[30px] flex justify-center text-[#4FD1C5] font-[800] mb-4">Expected Price</h2>
              <div className=" mt-[80px] flex flex-col items-center gap-12">
                {predict.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border-4 border-[#4FD1C5] rounded-3xl shadow-2xl px-24 py-16 text-[48px] text-[#2D3748] font-extrabold w-[900px] h-[200px] flex items-center justify-center text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <h3 className="mt-[80px] text-[40px] font-extrabold text-[#3BAFA2] drop-shadow-lg flex justify-center">
                The gearbox construction process has been completed. Save it please!
              </h3>
              <div className ="m-[50px]">
                <hr className="h-2 my-8 bg-gray-200 border-1 dark:bg-gray-700" />
                <div className="flex items-center justify-center gap-4 mt-[30px]">
                  <button
                    onClick={handlePrev}
                    className="mr-[500px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="mr-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
        

        <div className="fixed bottom-[50px] right-[50px] z-50">
          {!readOnly && <ChatBox />}
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

const DEFAULT_BELT_DATA = {
  type: "A",
  bp: 11,
  b0: 13,
  h: 8,
  y0: 2.8,
  area: 81,
  diameterRange: "100 ÷ 200",
  lengthRange: "560 ÷ 4000",
};

const BeltTable = () => {
  const beltData = DEFAULT_BELT_DATA;

  return (
    <div className="overflow-x-auto">
      <table className="w-auto mx-auto border-collapse border border-gray-400 text-center text-sm">
        <thead>
          <tr>
            <th rowSpan="2" className="border border-gray-400 px-3 py-1 bg-gray-100">Loại đai</th>
            <th colSpan="4" className="border border-gray-400 px-3 py-1 bg-gray-100">Kích thước tiết diện, mm</th>
            <th rowSpan="2" className="border border-gray-400 px-3 py-1 bg-gray-100">Diện tích tiết diện A, mm²</th>
            <th rowSpan="2" className="border border-gray-400 px-3 py-1 bg-gray-100">Đường kính bánh đai nhỏ d1, mm</th>
            <th rowSpan="2" className="border border-gray-400 px-3 py-1 bg-gray-100">Chiều dài giới hạn l, mm</th>
          </tr>
          <tr>
            <th className="border border-gray-400 px-3 py-1 bg-gray-100">bp</th>
            <th className="border border-gray-400 px-3 py-1 bg-gray-100">b0</th>
            <th className="border border-gray-400 px-3 py-1 bg-gray-100">h</th>
            <th className="border border-gray-400 px-3 py-1 bg-gray-100">y0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-3 py-1">{beltData.type}</td>
            <td className="border border-gray-400 px-3 py-1">{beltData.bp}</td>
            <td className="border border-gray-400 px-3 py-1">{beltData.b0}</td>
            <td className="border border-gray-400 px-3 py-1">{beltData.h}</td>
            <td className="border border-gray-400 px-3 py-1">{beltData.y0}</td>
            <td className="border border-gray-400 px-3 py-1">{beltData.area}</td>
            <td className="border border-gray-400 px-3 py-1">{beltData.diameterRange}</td>
            <td className="border border-gray-400 px-3 py-1">{beltData.lengthRange}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const DEFAULT_CONICAL_DATA = [
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

const ConicalGearTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    AxiosInstance.get("/api/gear/conical")
      .then((res) => {
        setData(res.data || DEFAULT_CONICAL_DATA);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu bánh côn:", err);
        setData(DEFAULT_CONICAL_DATA);
      });
  }, []);

  if (!data) return <div className="text-center">Đang tải dữ liệu...</div>;

  return (
    <div className=" mx-auto m-[50px] mt-[10px]">
      <h2 className="text-[30px] flex justify-center text-[#4FD1C5] font-[800] mb-4">Conical Gear Details</h2>
      <div className="flex justify-center">
        <table className="border-collapse border border-gray-300 w-[1000px]">
          <thead>
            <tr>
              <th className="text-center border px-4 py-2 bg-gray-100">Thông số</th>
              <th className="text-center border px-4 py-2 bg-gray-100">Bánh dẫn – Bánh bị dẫn</th>
            </tr>
          </thead>
          <tbody>
            {data.map(([label, value], i) => (
              <tr key={i}>
                <td className="text-center border px-4 py-2">{label}</td>
                <td className="text-center border px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DEFAULT_CYLINDRICAL_DATA = [
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

const CylindricalGearTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    AxiosInstance.get("/api/gear/cylindrical")
      .then((res) => {
        setData(res.data || DEFAULT_CYLINDRICAL_DATA);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu bánh trụ:", err);
        setData(DEFAULT_CYLINDRICAL_DATA);
      });
  }, []);

  if (!data) return <div className="text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="flex flex-col justify-center mx-auto mt-[10px]">
      <h2 className="text-[30px] flex justify-center text-[#4FD1C5] font-[800] mb-4">Cylindrical Gear Details</h2>
      <div className="flex justify-center">
        <table className="border-collapse border border-gray-300 w-[1000px]">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-100">Thông số hình học</th>
              <th className="border px-4 py-2 bg-gray-100">Bánh chủ động – Bánh bị động</th>
            </tr>
          </thead>
          <tbody>
            {data.map(([label, value], i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{label}</td>
                <td className="border px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuilderPage;