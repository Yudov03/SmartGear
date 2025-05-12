import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import AxiosInstance from "../axios/AxiosInstance.jsx";

const dummyHistoryItem = {
  id: 1,
  systemType: "Hệ thống bánh răng nón",
  timestamp: "2025-05-10 14:23",
  note: "Tính cho động cơ 5kW"
};

const dummyBuilderData = {
  params: { power: "5", speed: "1500", lifetime: "2" },
  engines: [
    { id: "E1", company: "ABC", Type: "X1", P_dc: 5, n_dc: 1500 },
    { id: "E2", company: "XYZ", Type: "Y2", P_dc: 6, n_dc: 1400 }
  ],
  variables: { P_ct: 4.8, n_sb: 1480 },
  selectedEngine: "E1",
  computedVariables: {
    P_real: 4.8, P1: 5, P2: 4.9, P3: 5.1, P_ct: 4.7,
    u_d: 2.5, u_brc: 1.5, u_brt: 1.2, u_kn: 1.0,
    T_dc: 3000, T1: 3200, T2: 3100, T3: 3300, T_tt: 3400,
    n_real: 1480, n1: 1300, n2: 1200, n3: 1100, n: 1000,
    a: 250, L: 1200, alpha_1: 30, circle: 2,
    d1: 150, d2: 300, phi_max: 5.5, F_0_final: 200, F_r: 500
  },
  step: 1
};

const BeltDriveParametersTable = ({computedVariables}) => {
  // const rows = [
  //   { label: "Dạng đai", value: "Đai thẳng" },
  //   { label: "Tiết diện đai", value: "A" },
  //   { label: "Khoảng cách trục", value: data.a },
  //   { label: "Chiều dài đai", value: data.L },
  //   { label: "Góc ôm đai", value: data.alpha_1 },
  //   { label: "Số vòng đai chạy trong 1 giây", value: data.circle },
  //   { label: "Đường kính bánh dẫn", value: data.d1 },
  //   { label: "Đường kính bánh bị dẫn", value: data.d2 },
  //   { label: "Ứng suất lớn nhất", value: data.phi_max },
  //   { label: "Lực căng đai ban đầu", value: data.F_0_final },
  //   { label: "Lực tác dụng lên trục", value: data.F_r },
  // ];

  return (
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
  );
};


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
    ["Góc côn đáy", "δ_f = 16.99°, 70.12°"]
  ];
  return (
    <table className="table-auto border-collapse border border-gray-300 w-3/4 mx-auto mt-4">
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
    ["Góc ăn khớp", "α_tw = 20°"]
  ];
  return (
    <table className="table-auto border-collapse border border-gray-300 w-3/4 mx-auto mt-4">
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
const ExpectedPrice = ({project}) => {
  return (
    <div>
              <div className=" mt-[80px] flex flex-col items-center gap-12">
                  <div
                    className="bg-white border-4 border-[#4FD1C5] rounded-3xl shadow-2xl px-24 py-16 text-[48px] text-[#2D3748] font-extrabold w-[900px] h-[200px] flex items-center justify-center text-center"
                  >
                    {project.price}
                  </div>
              </div>
    </div>
  )
}
const ComputedVariablesTable = ({computedVariables}) => {
  return (
    <div>
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
  );
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(dummyBuilderData.step);
  const [project, setProject] = useState({});
  const [engines, setEngines] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState(null);
  useEffect(() => {
    if (id) {
      AxiosInstance.get(`/projects/${id}`)
        .then((res) => {
          setProject(res.data);
          console.log(res.data.engineId);
          AxiosInstance.post("build/engine", {
            P: res.data.P,
            n: res.data.n_def,
            L: res.data.L_def,
          }).then((res) => {
            const engineList = res.data[0];
            setEngines(engineList);
          })
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const steps = [
    {
      label: "Input Parameters",
      content: (
        <div className="flex flex-row justify-center items-center space-x-[100px] text-[20px] text-gray-800">
          <span>P: {project.P} kW</span>
          <span>n: {project.n_def} rpm</span>
          <span>L: {project.L_def} years</span>
        </div>
      )
       
    },
    {
      label: "Selected Engine",
      content: (
        <ul className="list-disc mt-[50px] space-y-[40px] ml-[200px] text-gray-800">
          {engines.map((e) => (
            <li key={e.id} className={e.id === project.engineId ? "font-[700] text-[20px] text-[#3BAFA2]" : "text-[20px] text-gray-700"}>
              {e.company} - {e.Type} - {e.P_dc} kW - {e.n_dc} rpm {e.id === dummyBuilderData.selectedEngine && " (selected)"}
            </li>
          ))}
        </ul>
      )
    },
    { label: "Computed Variables", content: <ComputedVariablesTable computedVariables={project}/> },
    { label: "Belt Drive Parameters Table", content: <BeltDriveParametersTable computedVariables={project}/>},
    { label: "Conical Gear Details", content: <ConicalGearTable /> },
    { label: "Cylindrical Gear Details", content: <CylindricalGearTable /> },
    { label: "Expected Price", content: <ExpectedPrice project={project}/>},
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mt-[50px]  px-12 flex-1">
      <div className="flex items-center ml-[50px] justify-between mb-4">
        <div>
          <h1 className="text-[30px] mb-[20px] font-bold">Project Details #{id}</h1>
          <p className="text-[20px] text-gray-600">{dummyHistoryItem.systemType} | {dummyHistoryItem.timestamp}</p>
        </div>
        <button
          onClick={() => navigate(`/builder/${id}`)}
          className="bg-[#56D3C7] border-none mr-[50px] hover:bg-[#3BAFA2] w-[150px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
        >
          Edit
        </button>
      </div>

        <ProgressBar currentStep={step} totalSteps={steps.length} />

        <section className="rounded-md p-6 mt-[50px] mr-[50px] ml-[50px]">
          <h2 className="text-[30px] font-[700] text-center text-[#4FD1C5] mb-4">{steps[step - 1].label}</h2>
          {steps[step - 1].content}
        </section>

        <div className="flex justify-between justify-center mt-[100px] gap-[500px] w-full ">
            <div className="w-[100px]">
                {step >= 1 && (
                <button
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className="border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-full h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                >
                    Back
                </button>
                )}
            </div>

            <div className="flex gap-[100px]">
                {step <= steps.length && (
                <button
                    onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
                    className="border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[100px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
                >
                    Next
                </button>
                )}
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
}