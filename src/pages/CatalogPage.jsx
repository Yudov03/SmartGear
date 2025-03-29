import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout.jsx";

export default function CatalogPage() {
  const [catalogData, setCatalogData] = useState([
    {
      name: "Oliver Liam",
      company: "Viking Burrito",
      email: "oliver@burrito.com",
      vat: "FRB1235476",
    },
    {
      name: "Lucas Harper",
      company: "StoneTech",
      email: "lucas@stonetech.com",
      vat: "FRB9876543",
    },
    {
      name: "Ethan James",
      company: "CodeWizard",
      email: "ethan@wizard.io",
      vat: "FRB1239874",
    },
  ]);

  const handleDelete = (index) => {
    const newData = [...catalogData];
    newData.splice(index, 1);
    setCatalogData(newData);
  };

  const handleEdit = (index) => {
    alert(`Edit item index ${index}`);
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <div className="mt-3 ms-3">
        <h6 className="mb-4 fw-bold">Catalog Information</h6>
        {catalogData.map((item, idx) => (
          <CatalogItem
            key={idx}
            name={item.name}
            company={item.company}
            email={item.email}
            vat={item.vat}
            onDelete={() => handleDelete(idx)}
            onEdit={() => handleEdit(idx)}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

const CatalogItem = ({ name, company, email, vat, onDelete, onEdit }) => {
  return (
    <div
      className="card mb-3 shadow-sm border-0"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* Phần thông tin bên trái */}
        <div>
          <h6 className="mb-2 fw-bold fs-5" style={{ color: "#718096" }}>
            {name}
          </h6>
          <p className="mb-1 text-muted" style={{ color: "#A0AEC0" }}>
            Company Name:{" "}
            <span className="fw-bold" style={{ color: "#718096" }}>
              {company}
            </span>
          </p>
          <p className="mb-1 text-muted">
            Email:{" "}
            <span className="fw-bold" style={{ color: "#718096" }}>
              {email}
            </span>
          </p>
          <p className="mb-0 text-muted">
            VAT Number:{" "}
            <span className="fw-bold" style={{ color: "#718096" }}>
              {vat}
            </span>
          </p>
        </div>

        {/* Phần nút hành động bên phải */}
        <div className="text-end fw-bold">
          <button
            type="button"
            className="btn btn-link p-0 me-3 text-decoration-none text-secondary"
            onClick={onEdit}
          >
            EDIT
          </button>
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none text-danger"
            onClick={onDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

import { createGlobalStyle } from "styled-components";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const GlobalStyle = createGlobalStyle`
 body {
    font-family: Arial, sans-serif;
  }
`;
