import React from "react";
import gear from "../assets/gear.svg";
import gear1 from "../assets/gear-1.svg";

export const Login = () => {
  return (
    <div className="container-fluid d-flex flex-column">
      {/* Thanh Navigation */}
      <NavigationBar />

      {/* Nội dung chính */}
      <div className="row flex-grow-1">
        {/* Cột trái: Form đăng nhập */}
        <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
          <SignInComponent />
        </div>

        {/* Cột phải: Ảnh/biểu tượng */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#14b8a6" }}
        >
          {/* Giới hạn chiều ngang ảnh bằng chiều ngang form (450px) */}
          <img
            src={gear}
            alt="Gear"
            style={{
              // maxWidth: "1250px",
              width: "100%", // Hoặc "99%", tùy ý
              height: "auto", // Quan trọng: auto để giữ nguyên tỉ lệ
              display: "block", // Tránh khoảng trống dưới ảnh do inline element
              objectFit: "cover", // Tùy chọn, dùng cho ảnh raster. Với SVG thường không cần.
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const SignInComponent = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center px-4 mx-auto w-100"
      style={{ maxWidth: "500px" }}
    >
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <div
          className="mb-3 fs-3 fw-bold text-center"
          style={{ color: "#5eead4" }}
        >
          Welcome Back
        </div>
        <div
          className="mb-4 small fw-bold text-center"
          style={{ color: "#94a3b8" }}
        >
          Enter your email and password to sign in
        </div>
        <div className="mb-4">
          <div className="mb-2 small" style={{ color: "#374151" }}>
            Email
          </div>
          <div
            className="d-flex align-items-center px-4 bg-white rounded"
            style={{ border: "1px solid #e2e8f0", height: "53px" }}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="w-100 bg-transparent"
              style={{
                border: "none",
                color: "#94a3b8",
                outline: "none",
                boxShadow: "none",
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-2 small" style={{ color: "#374151" }}>
            Password
          </div>
          <div
            className="d-flex align-items-center px-4 bg-white rounded"
            style={{ border: "1px solid #e2e8f0", height: "53px" }}
          >
            <input
              type="password"
              placeholder="Your password"
              className="w-100 bg-transparent"
              style={{
                border: "none",
                color: "#94a3b8",
                outline: "none",
                boxShadow: "none",
              }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div
              className="position-relative"
              style={{
                width: "2.25rem",
                height: "19px",
                backgroundColor: "#5eead4",
                borderRadius: "50px",
              }}
            >
              <div
                className="position-absolute"
                style={{
                  top: "2.75px",
                  right: "3px",
                  width: "13.5px",
                  height: "13.5px",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            </div>
            <span className="small" style={{ color: "#374151" }}>
              Remember me
            </span>
          </div>
        </div>
        <button
          className="mb-4 w-100 fw-bold"
          style={{
            fontSize: "0.75rem",
            color: "white",
            backgroundColor: "#5eead4",
            border: "none",
            borderRadius: "0.5rem",
            height: "47px",
          }}
        >
          SIGN IN
        </button>
        <div className="text-center">
          <span className="small" style={{ color: "#94a3b8" }}>
            Don't have an account?
          </span>
          <span
            className="small fw-bold"
            style={{ color: "#5eead4", cursor: "pointer" }}
          >
            {" "}
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="d-flex justify-content-between align-items-center px-4 py-3 mt-auto">
      <div className="small" style={{ color: "#94a3b8" }}>
        <span>@ 2025, Made with ❤️ by </span>
        <span className="fw-bold" style={{ color: "#5eead4" }}>
          Duy
        </span>
        <span> & </span>
        <span className="fw-bold" style={{ color: "#5eead4" }}>
          Vy
        </span>
        <span> & </span>
        <span className="fw-bold" style={{ color: "#5eead4" }}>
          Khoa
        </span>
        <span> & </span>
        <span className="fw-bold" style={{ color: "#5eead4" }}>
          Anh
        </span>
        <span> for helping HCMUT student</span>
      </div>
      <div className="d-flex" style={{ gap: "1.5rem" }}>
        <span className="small" style={{ color: "#94a3b8" }}>
          Group 6
        </span>
        <span className="small" style={{ color: "#94a3b8" }}>
          License
        </span>
      </div>
    </footer>
  );
};

const NavigationBar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "16px",
        paddingBottom: "16px",
        backgroundColor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(10.5px)",
        borderWidth: "1.5px",
        borderStyle: "solid",
        borderColor: "#FFF",
        boxShadow: "0px 7px 23px 0px rgba(0,0,0,0.05)",
        marginBottom: "24px",
        borderRadius: "15px",
      }}
    >
      {/* Logo hoặc tên ứng dụng */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img src={gear1} alt="Logo" />
      </div>

      {/* Menu điều hướng */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a
          href="#"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          Share & Chat
        </a>
        <a
          href="#"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          Home
        </a>
        <a
          href="#"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          Assessment
        </a>
        <a
          href="#"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          Report
        </a>
        <a
          href="#"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          Sign In
        </a>
      </div>
    </nav>
  );
};
