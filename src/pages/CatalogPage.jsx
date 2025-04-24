import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout.jsx";
import { createGlobalStyle } from "styled-components";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
  }
  
  .table-container {
    max-height: 400px;
    overflow-y: auto;
  }

  .table-container thead {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;
  }

  .sort-icon {
    cursor: pointer;
    margin-left: 5px;
  }

  .sort-icon:hover {
    color: #0d6efd;
  }
`;

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState("engine");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [engines, setEngines] = useState([
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "Siemens",
      Type: "AC Motor",
      P_dc: 5.5,
      n_dc: 1450,
      Voltage: "400V",
      Current: "12A",
      Efficiency: 0.92,
      Power_Fractor: 0.85,
      Max_Torque_Ratio: 2.5,
      Start_Torque_Ratio: 1.8,
      Start_Current_Ratio: 6.2,
      Weight: 120.5,
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "ABB",
      Type: "DC Motor",
      P_dc: 3.0,
      n_dc: 1750,
      Voltage: "220V",
      Current: "15A",
      Efficiency: 0.88,
      Power_Fractor: 0.9,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 5.5,
      Weight: 98.0,
    },
  ]);
  const [bearings, setBearings] = useState([
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "SKF",
      Type: "Ball Bearing",
      d: 25.0,
      D: 52.0,
      T: 15.0,
      d1: 27.0,
      B: 14.0,
      C_m: 12.5,
      r1: 1.0,
      r2: 1.0,
      r3: 0.8,
      r4: 0.8,
      a: 0.5,
      C_k: 13.2,
      C_o: 8.5,
      e: 0.3,
      Y: 1.4,
      Y_o: 0.9,
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "NSK",
      Type: "Roller Bearing",
      d: 35.0,
      D: 72.0,
      T: 17.0,
      d1: 36.5,
      B: 16.0,
      C_m: 14.0,
      r1: 1.2,
      r2: 1.2,
      r3: 0.9,
      r4: 0.9,
      a: 0.6,
      C_k: 15.0,
      C_o: 9.3,
      e: 0.32,
      Y: 1.5,
      Y_o: 1.0,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (index) => {
    if (activeTab === "engine") {
      const newData = [...engines];
      newData.splice(index, 1);
      setEngines(newData);
    } else {
      const newData = [...bearings];
      newData.splice(index, 1);
      setBearings(newData);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredData =
    activeTab === "engine"
      ? getSortedData(
          engines.filter((item) =>
            item.Type.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : getSortedData(
          bearings.filter((item) =>
            item.Type.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <i className="bi bi-sort-down"></i>
      ) : (
        <i className="bi bi-sort-down-alt"></i>
      );
    }
    return null;
  };

  return (
    <>
      <GlobalStyle />
      <Header />

      <div className="container mt-4">
        <div className="row align-items-center mb-4">
          <div className="col-md-4">{/* <h3>Catalog</h3> */}</div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="engine">Engine</option>
              <option value="bearing">Bearing</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {activeTab === "engine" ? (
          <div className="table-container table-responsive text-center">
            <table className="table table-hover table-striped table-bordered">
              <thead className="table-success fw-bolder">
                <tr>
                  <th
                    onClick={() => handleSort("Type")}
                    style={{ cursor: "pointer" }}
                  >
                    Kiểu {getSortIcon("Type")}
                  </th>
                  <th
                    onClick={() => handleSort("P_dc")}
                    style={{ cursor: "pointer" }}
                  >
                    Công Suất {getSortIcon("P_dc")}
                  </th>
                  <th
                    onClick={() => handleSort("n_dc")}
                    style={{ cursor: "pointer" }}
                  >
                    Tốc độ {getSortIcon("n_dc")}
                  </th>
                  <th
                    onClick={() => handleSort("Voltage")}
                    style={{ cursor: "pointer" }}
                  >
                    Điện áp {getSortIcon("Voltage")}
                  </th>
                  <th
                    onClick={() => handleSort("Current")}
                    style={{ cursor: "pointer" }}
                  >
                    Dòng điện {getSortIcon("Current")}
                  </th>
                  <th
                    onClick={() => handleSort("Efficiency")}
                    style={{ cursor: "pointer" }}
                  >
                    Hiệu suất {getSortIcon("Efficiency")}
                  </th>
                  <th
                    onClick={() => handleSort("Power_Fractor")}
                    style={{ cursor: "pointer" }}
                  >
                    Hệ số công suất {getSortIcon("Power_Fractor")}
                  </th>
                  <th
                    onClick={() => handleSort("Max_Torque_Ratio")}
                    style={{ cursor: "pointer" }}
                  >
                    Bội số mô men cực đại {getSortIcon("Max_Torque_Ratio")}
                  </th>
                  <th
                    onClick={() => handleSort("Start_Torque_Ratio")}
                    style={{ cursor: "pointer" }}
                  >
                    Bội số mô men khởi động {getSortIcon("Start_Torque_Ratio")}
                  </th>
                  <th
                    onClick={() => handleSort("Start_Current_Ratio")}
                    style={{ cursor: "pointer" }}
                  >
                    Bội số dòng điện khởi động{" "}
                    {getSortIcon("Start_Current_Ratio")}
                  </th>
                  <th
                    onClick={() => handleSort("Weight")}
                    style={{ cursor: "pointer" }}
                  >
                    Khối lượng {getSortIcon("Weight")}
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th>P (kW)</th>
                  <th>n (vg/ph)</th>
                  <th>U (V)</th>
                  <th>I (A)</th>
                  <th>&eta; (%)</th>
                  <th>cos&phi;</th>
                  <th>
                    M<sub>max</sub>/M<sub>đm</sub>
                  </th>
                  <th>
                    M<sub>kđ</sub>/M<sub>đm</sub>
                  </th>
                  <th>
                    I<sub>kđ</sub>/I<sub>đm</sub>
                  </th>
                  <th>m (kg)</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredData.map((engine, idx) => (
                  <tr key={engine.id}>
                    <td
                      style={{ color: "pr" }}
                      className="fw-bold text-primary"
                    >
                      {engine.Type}
                    </td>
                    <td>{engine.P_dc}</td>
                    <td>{engine.n_dc}</td>
                    <td>{engine.Voltage}</td>
                    <td>{engine.Current}</td>
                    <td>{engine.Efficiency}</td>
                    <td>{engine.Power_Fractor}</td>
                    <td>{engine.Max_Torque_Ratio}</td>
                    <td>{engine.Start_Torque_Ratio}</td>
                    <td>{engine.Start_Current_Ratio}</td>
                    <td>{engine.Weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-container table-responsive text-center">
            <table className="table table-hover table-striped table-bordered">
              <thead className="table-success fw-bolder">
                <tr>
                  <th
                    onClick={() => handleSort("Type")}
                    style={{ cursor: "pointer" }}
                  >
                    Kiểu {getSortIcon("Type")}
                  </th>
                  <th
                    onClick={() => handleSort("d")}
                    style={{ cursor: "pointer" }}
                  >
                    Đường kính trong {getSortIcon("d")}
                  </th>
                  <th
                    onClick={() => handleSort("D")}
                    style={{ cursor: "pointer" }}
                  >
                    Đường kính ngoài {getSortIcon("D")}
                  </th>
                  <th
                    onClick={() => handleSort("T")}
                    style={{ cursor: "pointer" }}
                  >
                    Chiều rộng {getSortIcon("T")}
                  </th>
                  <th
                    onClick={() => handleSort("d1")}
                    style={{ cursor: "pointer" }}
                  >
                    Đường kính vai trong {getSortIcon("d1")}
                  </th>
                  <th
                    onClick={() => handleSort("B")}
                    style={{ cursor: "pointer" }}
                  >
                    Chiều rộng trong {getSortIcon("B")}
                  </th>
                  <th
                    onClick={() => handleSort("C_m")}
                    style={{ cursor: "pointer" }}
                  >
                    Chiều rộng bạc {getSortIcon("C_m")}
                  </th>
                  <th
                    onClick={() => handleSort("r1")}
                    style={{ cursor: "pointer" }}
                  >
                    Bán kính lượn {getSortIcon("r1")}
                  </th>
                  <th
                    onClick={() => handleSort("a")}
                    style={{ cursor: "pointer" }}
                  >
                    Khoảng hở {getSortIcon("a")}
                  </th>
                  <th
                    onClick={() => handleSort("C_k")}
                    style={{ cursor: "pointer" }}
                  >
                    Tải trọng động {getSortIcon("C_k")}
                  </th>
                  <th
                    onClick={() => handleSort("C_o")}
                    style={{ cursor: "pointer" }}
                  >
                    Tải trọng tĩnh {getSortIcon("C_o")}
                  </th>
                  <th
                    onClick={() => handleSort("e")}
                    style={{ cursor: "pointer" }}
                  >
                    Số e {getSortIcon("e")}
                  </th>
                  <th
                    onClick={() => handleSort("Y")}
                    style={{ cursor: "pointer" }}
                  >
                    Hệ số Y {getSortIcon("Y")}
                  </th>
                  <th
                    onClick={() => handleSort("Y_o")}
                    style={{ cursor: "pointer" }}
                  >
                    Hệ số Yo {getSortIcon("Y_o")}
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th>d (mm)</th>
                  <th>D (mm)</th>
                  <th>T (mm)</th>
                  <th>d₁ (mm)</th>
                  <th>B (mm)</th>
                  <th>C (mm)</th>
                  <th>r₁₋₂,₃₋₄ (mm)</th>
                  <th>a (mm)</th>
                  <th>
                    C<sub>k</sub> (kN)
                  </th>
                  <th>
                    C<sub>o</sub> (kN)
                  </th>
                  <th>e</th>
                  <th>Y</th>
                  <th>
                    Y<sub>o</sub>
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredData.map((bearing, idx) => (
                  <tr key={bearing.id}>
                    <td className="fw-bold text-primary">{bearing.Type}</td>
                    <td>{bearing.d}</td>
                    <td>{bearing.D}</td>
                    <td>{bearing.T}</td>
                    <td>{bearing.d1}</td>
                    <td>{bearing.B}</td>
                    <td>{bearing.C_m}</td>
                    <td>{`${bearing.r1}-${bearing.r2},${bearing.r3}-${bearing.r4}`}</td>
                    <td>{bearing.a}</td>
                    <td>{bearing.C_k}</td>
                    <td>{bearing.C_o}</td>
                    <td>{bearing.e}</td>
                    <td>{bearing.Y}</td>
                    <td>{bearing.Y_o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
