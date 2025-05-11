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
    max-height: 500px;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 20px 0;
  }

  .table-container thead {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
    z-index: 1;
  }

  .sort-icon {
    cursor: pointer;
    margin-left: 5px;
    opacity: 0.6;
  }

  .sort-icon:hover {
    opacity: 1;
    color: #0d6efd;
  }

  .table {
    margin-bottom: 0;
  }

  .table thead th {
    border-top: none;
    background-color: #56D3C7;
    color: white;
    vertical-align: middle;
  }

  .table tbody tr:hover {
    background-color: #f8f9fa;
    transition: background-color 0.2s ease;
  }

  .table td {
    vertical-align: middle;
  }

  .search-container {
    position: relative;
    margin-bottom: 20px;
  }

  .search-container i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
  }

  .search-input {
    padding-left: 35px;
    border-radius: 20px;
  }

  .select-container {
    border-radius: 20px;
  }
`;

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState("engine");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [engines, setEngines] = useState([
    {
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K71-2",
      P_dc: 0.37,
      n_dc: 2670,
      Voltage: "220/380",
      Current: "1.7/0.98",
      Efficiency: 70,
      Power_Fractor: 0.81,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 4.6,
      Weight: 12,
    },
    {
      id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K71-2",
      P_dc: 0.55,
      n_dc: 2670,
      Voltage: "220/380",
      Current: "2.4/1.39",
      Efficiency: 73,
      Power_Fractor: 0.82,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 4.6,
      Weight: 14,
    },
    {
      id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K71-2",
      P_dc: 0.75,
      n_dc: 2850,
      Voltage: "220/380",
      Current: "3.0/1.7",
      Efficiency: 77,
      Power_Fractor: 0.87,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 5.0,
      Weight: 14.5,
    },
    {
      id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K80-2",
      P_dc: 1.1,
      n_dc: 2850,
      Voltage: "220/380",
      Current: "4.0/2.3",
      Efficiency: 78,
      Power_Fractor: 0.87,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 5.0,
      Weight: 19,
    },
    {
      id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K90L-2",
      P_dc: 1.5,
      n_dc: 2860,
      Voltage: "220/380",
      Current: "5.8/3.4",
      Efficiency: 80,
      Power_Fractor: 0.87,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 5.0,
      Weight: 23,
    },
    {
      id: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K100S-2",
      P_dc: 2.2,
      n_dc: 2860,
      Voltage: "220/380",
      Current: "8.1/4.7",
      Efficiency: 83,
      Power_Fractor: 0.87,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 6.0,
      Weight: 28.5,
    },
    {
      id: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K100L-2",
      P_dc: 3.0,
      n_dc: 2870,
      Voltage: "220/380",
      Current: "11.6/6.4",
      Efficiency: 84,
      Power_Fractor: 0.87,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 6.0,
      Weight: 33,
    },
    {
      id: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K112M-2",
      P_dc: 4,
      n_dc: 2880,
      Voltage: "220/380",
      Current: "14.8/8.6",
      Efficiency: 85,
      Power_Fractor: 0.87,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 6.0,
      Weight: 42,
    },
    {
      id: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K132S-2",
      P_dc: 5.5,
      n_dc: 2910,
      Voltage: "220/380",
      Current: "20.5/11.8",
      Efficiency: 87,
      Power_Fractor: 0.87,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 7.0,
      Weight: 55,
    },
    {
      id: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K132M-2",
      P_dc: 7.5,
      n_dc: 2910,
      Voltage: "220/380",
      Current: "27.0/15.6",
      Efficiency: 88,
      Power_Fractor: 0.88,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 7.0,
      Weight: 62,
    },
    {
      id: 13,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K160S-2",
      P_dc: 11,
      n_dc: 2940,
      Voltage: "220/380",
      Current: "41.0/23.7",
      Efficiency: 89,
      Power_Fractor: 0.88,
      Max_Torque_Ratio: 2.0,
      Start_Torque_Ratio: 1.8,
      Start_Current_Ratio: 7.0,
      Weight: 115,
    },
    {
      id: 14,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K160M-2",
      P_dc: 15,
      n_dc: 2940,
      Voltage: "220/380",
      Current: "56.0/32.3",
      Efficiency: 90,
      Power_Fractor: 0.88,
      Max_Torque_Ratio: 2.0,
      Start_Torque_Ratio: 1.8,
      Start_Current_Ratio: 7.0,
      Weight: 145,
    },
    {
      id: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K160L-2",
      P_dc: 18.5,
      n_dc: 2940,
      Voltage: "220/380",
      Current: "68.0/39.1",
      Efficiency: 90.5,
      Power_Fractor: 0.88,
      Max_Torque_Ratio: 2.0,
      Start_Torque_Ratio: 1.8,
      Start_Current_Ratio: 7.0,
      Weight: 170,
    },
    {
      id: 16,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K180M-2",
      P_dc: 22,
      n_dc: 2950,
      Voltage: "380/660",
      Current: "41/23.7",
      Efficiency: 91,
      Power_Fractor: 0.88,
      Max_Torque_Ratio: 2.0,
      Start_Torque_Ratio: 1.8,
      Start_Current_Ratio: 7.0,
      Weight: 203,
    },
    {
      id: 17,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K180L-2",
      P_dc: 30,
      n_dc: 2950,
      Voltage: "380/660",
      Current: "55.5/32.0",
      Efficiency: 91.5,
      Power_Fractor: 0.88,
      Max_Torque_Ratio: 2.0,
      Start_Torque_Ratio: 1.8,
      Start_Current_Ratio: 7.0,
      Weight: 235,
    },
    {
      id: 18,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K200M-2",
      P_dc: 37,
      n_dc: 2950,
      Voltage: "380/660",
      Current: "68/39.2",
      Efficiency: 92,
      Power_Fractor: 0.88,
      Max_Torque_Ratio: 2.0,
      Start_Torque_Ratio: 1.8,
      Start_Current_Ratio: 7.0,
      Weight: 267,
    },
    {
      id: 19,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K200M-4",
      P_dc: 30,
      n_dc: 1470,
      Voltage: "380/660",
      Current: "63.8/36.8",
      Efficiency: 91.5,
      Power_Fractor: 0.88,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 1.9,
      Start_Current_Ratio: 6.8,
      Weight: 260,
    },
    {
      id: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K225S-4",
      P_dc: 37,
      n_dc: 1470,
      Voltage: "380/660",
      Current: "70.2/40.2",
      Efficiency: 92,
      Power_Fractor: 0.89,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 7.0,
      Weight: 315,
    },
    {
      id: 21,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K225S-4",
      P_dc: 45,
      n_dc: 1480,
      Voltage: "380/660",
      Current: "81.3/47",
      Efficiency: 92.5,
      Power_Fractor: 0.89,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 7.0,
      Weight: 340,
    },
    {
      id: 22,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: "HEM",
      Type: "3K225M-4",
      P_dc: 45,
      n_dc: 1480,
      Voltage: "380/660",
      Current: "85.7/50.1",
      Efficiency: 93,
      Power_Fractor: 0.89,
      Max_Torque_Ratio: 2.2,
      Start_Torque_Ratio: 2.0,
      Start_Current_Ratio: 7.0,
      Weight: 360,
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
          <div className="col-md-4">
            <h4 className="mb-0 text-primary"></h4>
          </div>
          <div className="col-md-4">
            <select
              className="form-select select-container"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="engine">Engines</option>
              <option value="bearing">Bearings</option>
            </select>
          </div>
          <div className="col-md-4">
            <div className="search-container mb-0">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search by type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {activeTab === "engine" ? (
          <div className="table-container table-responsive text-center">
            <table className="table table-hover table-striped table-bordered">
              <thead className="fw-bolder text-dark">
                <tr>
                  <th
                    onClick={() => handleSort("Type")}
                    style={{ cursor: "pointer" }}
                  >
                    Type {getSortIcon("Type")}
                  </th>
                  <th
                    onClick={() => handleSort("P_dc")}
                    style={{ cursor: "pointer" }}
                  >
                    Power {getSortIcon("P_dc")}
                  </th>
                  <th
                    onClick={() => handleSort("n_dc")}
                    style={{ cursor: "pointer" }}
                  >
                    Speed {getSortIcon("n_dc")}
                  </th>
                  <th
                    onClick={() => handleSort("Voltage")}
                    style={{ cursor: "pointer" }}
                  >
                    Voltage {getSortIcon("Voltage")}
                  </th>
                  <th
                    onClick={() => handleSort("Current")}
                    style={{ cursor: "pointer" }}
                  >
                    Current {getSortIcon("Current")}
                  </th>
                  <th
                    onClick={() => handleSort("Efficiency")}
                    style={{ cursor: "pointer" }}
                  >
                    Efficiency {getSortIcon("Efficiency")}
                  </th>
                  <th
                    onClick={() => handleSort("Power_Fractor")}
                    style={{ cursor: "pointer" }}
                  >
                    Power Factor {getSortIcon("Power_Fractor")}
                  </th>
                  <th
                    onClick={() => handleSort("Max_Torque_Ratio")}
                    style={{ cursor: "pointer" }}
                  >
                    Max Torque Ratio {getSortIcon("Max_Torque_Ratio")}
                  </th>
                  <th
                    onClick={() => handleSort("Start_Torque_Ratio")}
                    style={{ cursor: "pointer" }}
                  >
                    Start Torque Ratio {getSortIcon("Start_Torque_Ratio")}
                  </th>
                  <th
                    onClick={() => handleSort("Start_Current_Ratio")}
                    style={{ cursor: "pointer" }}
                  >
                    Start Current Ratio {getSortIcon("Start_Current_Ratio")}
                  </th>
                  <th
                    onClick={() => handleSort("Weight")}
                    style={{ cursor: "pointer" }}
                  >
                    Weight {getSortIcon("Weight")}
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th>P (kW)</th>
                  <th>n (rpm)</th>
                  <th>U (V)</th>
                  <th>I (A)</th>
                  <th>&eta; (%)</th>
                  <th>cos&phi;</th>
                  <th>
                    M<sub>max</sub>/M<sub>n</sub>
                  </th>
                  <th>
                    M<sub>s</sub>/M<sub>n</sub>
                  </th>
                  <th>
                    I<sub>s</sub>/I<sub>n</sub>
                  </th>
                  <th>m (kg)</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredData.map((engine, idx) => (
                  <tr key={engine.id}>
                    <td className="fw-bold text-primary">{engine.Type}</td>
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
              <thead className="fw-bolder">
                <tr>
                  <th
                    onClick={() => handleSort("Type")}
                    style={{ cursor: "pointer" }}
                  >
                    Type {getSortIcon("Type")}
                  </th>
                  <th
                    onClick={() => handleSort("d")}
                    style={{ cursor: "pointer" }}
                  >
                    Inner Diameter {getSortIcon("d")}
                  </th>
                  <th
                    onClick={() => handleSort("D")}
                    style={{ cursor: "pointer" }}
                  >
                    Outer Diameter {getSortIcon("D")}
                  </th>
                  <th
                    onClick={() => handleSort("T")}
                    style={{ cursor: "pointer" }}
                  >
                    Width {getSortIcon("T")}
                  </th>
                  <th
                    onClick={() => handleSort("d1")}
                    style={{ cursor: "pointer" }}
                  >
                    Inner Shoulder Dia. {getSortIcon("d1")}
                  </th>
                  <th
                    onClick={() => handleSort("B")}
                    style={{ cursor: "pointer" }}
                  >
                    Inner Width {getSortIcon("B")}
                  </th>
                  <th
                    onClick={() => handleSort("C_m")}
                    style={{ cursor: "pointer" }}
                  >
                    Bearing Width {getSortIcon("C_m")}
                  </th>
                  <th
                    onClick={() => handleSort("r1")}
                    style={{ cursor: "pointer" }}
                  >
                    Radius {getSortIcon("r1")}
                  </th>
                  <th
                    onClick={() => handleSort("a")}
                    style={{ cursor: "pointer" }}
                  >
                    Clearance {getSortIcon("a")}
                  </th>
                  <th
                    onClick={() => handleSort("C_k")}
                    style={{ cursor: "pointer" }}
                  >
                    Dynamic Load {getSortIcon("C_k")}
                  </th>
                  <th
                    onClick={() => handleSort("C_o")}
                    style={{ cursor: "pointer" }}
                  >
                    Static Load {getSortIcon("C_o")}
                  </th>
                  <th
                    onClick={() => handleSort("e")}
                    style={{ cursor: "pointer" }}
                  >
                    e Factor {getSortIcon("e")}
                  </th>
                  <th
                    onClick={() => handleSort("Y")}
                    style={{ cursor: "pointer" }}
                  >
                    Y Factor {getSortIcon("Y")}
                  </th>
                  <th
                    onClick={() => handleSort("Y_o")}
                    style={{ cursor: "pointer" }}
                  >
                    Y<sub>o</sub> Factor {getSortIcon("Y_o")}
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