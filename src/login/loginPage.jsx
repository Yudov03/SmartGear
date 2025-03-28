import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import gear from "../assets/gear.svg";
import gear1 from "../assets/gear-1.svg";
import "./login.css";
import AxiosInstance from "../axios/AxiosInstance";
import { toast } from "react-toastify";

const LoginPage = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AxiosInstance.post(`auth/signin/`, {
      email: email,
      pass: pass,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("Token", res.data);
        // navigate(`/home`);
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.error("There was an error logging in: ", error);
        toast.error("Login failed!");
      });
  };
  return (
    <div className="login-page">
      {/* Thanh điều hướng (Navbar) */}
      <div>
        <FixedTopNavbar />
      </div>

      {/* Nội dung chính: Form + Hình */}
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row">
          {/* Cột bên trái: Form đăng nhập */}
          <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
            <div className="w-75">
              <div className="mb-5">
                <h1 className="fw-bold" style={{ color: "#4fd1c5" }}>
                  Welcome Back
                </h1>
                <p
                  className="fw-bold"
                  style={{ color: "#a0aec0", fontSize: "12px" }}
                >
                  Enter your email and password to sign in
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label mb-3">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Your password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input "
                      type="checkbox"
                      role="switch"
                      //   style={{ backgroundColor: "#4fd1c5" }}
                      //   checked
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn w-100 font-Arial fw-bold text-white"
                  style={{ backgroundColor: "#4fd1c5", fontSize: "15px" }}
                >
                  Sign In
                </button>
              </form>

              <div className="text-center mt-3">
                <p href="#signup" style={{ color: "#a0aec0" }}>
                  Don't have an account?{" "}
                  <a href="#" style={{ color: "#4fd1c5" }}>
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Cột bên phải: Icon hoặc hình ảnh */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
            {/* Ví dụ dùng icon Font Awesome hoặc SVG thay thế */}
            <div className="text-center">
              <img src={gear} className="img-fluid" />
              {/* <p className="mt-3">Your Icon / Image Here</p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer (tuỳ chọn) */}
      <footer className="p-3 row text-center" style={{ fontSize: "12px" }}>
        <div className="col" style={{ fontFamily: "initial" }}>
          @ 2025, Made with <span style={{ color: "red" }}>❤</span> by Duy & Vy
          & Khoa & Anh for helping HCMUT student
        </div>

        <div className="col">Group 6 License</div>
        {/* <p className="mb-0">
          © 2025. Bảo lưu mọi quyền. |
          <a href="#privacy" className="ms-1">
            Privacy Policy
          </a>{" "}
          |
          <a href="#terms" className="ms-1">
            Terms & Conditions
          </a>
        </p> */}
      </footer>
    </div>
  );
};

export default LoginPage;

const FixedTopNavbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top rounded-4 container-xxl mt-3 w-75 "
      style={{ height: "60px" }}
    >
      <div className="container">
        {/* Logo / Thương hiệu */}
        <a className="navbar-brand ms-4" href="#home">
          {/* Thay gear1 bằng đường dẫn hình/logo của bạn */}
          <img src={gear1} alt="logo" style={{ height: "40px" }} />
        </a>
        <div class=" navbar" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 fw-bold gap-4">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">
                SERVICE
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                EQUIPMENT
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                ABOUT US
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                BLOG
              </a>
            </li>
          </ul>
        </div>
        <div class=" navbar" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <button className="px-4  text-white btn [background:linear-gradient(41deg,rgba(49,56,96,1)_0%,rgba(21,25,40,1)_100%)] rounded-5">
              Free Sign Up!
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};
