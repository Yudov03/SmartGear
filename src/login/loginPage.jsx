import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import gear from "../assets/gear.svg";
import gear1 from "../assets/gear-1.svg";
import "./login.css";
import AxiosInstance from "../axios/AxiosInstance";
import { cssTransition, toast } from "react-toastify";

const LoginPage = () => {
  // const navigate = useNavigate();
  const [form, setForm] = useState(false);
  const [img, setImg] = useState(true);

  const togglePosition = () => {
    setForm(!form);
    setImg(!img);
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AxiosInstance.post(`auth/signin/`, {
      email: email,
      pass: pass,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("Token", res.data);
        navigate(`/home`);
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.error("There was an error logging in: ", error);
        toast.error("Login failed!");
      });
  };

  const handleRegister = (e) => {
    AxiosInstance.post(`auth/signup/`, {
      email: email,
      pass: pass,
      firstName: firstName,
      lastName: lastName,
    })
      .then((res) => {
        console.log(res);
        navigate(`/home`);
        toast.success("Sign Up successful!");
      })
      .catch((error) => {
        console.error("There was an error register in: ", error);
        toast.error("Sign Up failed!");
      });
  };
  return (
    <div className="login-page">
      {/* Thanh điều hướng (Navbar) */}
      <div>
        <FixedTopNavbar togglePosition={togglePosition} form={form} />
      </div>

      {/* Nội dung chính: Form + Hình */}
      <div className="container-fluid" style={{ minHeight: "100vh" }}>
        <div className="row">
          <div
            className={`col-md-6 d-flex align-items-center justify-content-center p-5 `}
            style={
              form
                ? {
                    transform: "translateX(0%)",
                    transition: "transform 0.3s ease-in-out",
                  }
                : {
                    transform: "translateX(100%)",
                    transition: "transform 0.3s ease-in-out",
                  }
            }
          >
            {form ? (
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
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        role="switch"
                      />
                      <label className="form-check-label">Remember me</label>
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
                    <a
                      href="#"
                      style={{ color: "#4fd1c5" }}
                      onClick={togglePosition}
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-75">
                <div className="mb-3">
                  <h1 className="fw-bold" style={{ color: "#4fd1c5" }}>
                    Create an Account
                  </h1>
                  <p
                    className="fw-bold"
                    style={{ color: "#a0aec0", fontSize: "12px" }}
                  >
                    Fill in your details to register
                  </p>
                </div>

                <form onSubmit={handleRegister}>
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
                    <label htmlFor="firstName" className="form-label mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 font-Arial fw-bold text-white"
                    style={{ backgroundColor: "#4fd1c5", fontSize: "15px" }}
                  >
                    Sign Up
                  </button>
                </form>

                <div className="text-center mt-3">
                  <p href="#login" style={{ color: "#a0aec0" }}>
                    Already have an account?{" "}
                    <a
                      href="#"
                      style={{ color: "#4fd1c5" }}
                      onClick={togglePosition}
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light"
            style={
              img
                ? {
                    transform: "scaleX(-1) translateX(100%)",
                    transition: "transform 0.3s ease-in-out",
                  }
                : {
                    transform: "scaleX(1) translateX(0%)",
                    transition: "transform 0.3s ease-in-out",
                  }
            }
          >
            <div className="text-center">
              <img src={gear} className="img-fluid" />
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

const FixedTopNavbar = ({ togglePosition, form }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow d-flex fixed-top rounded-4 container-xxl mt-3 w-75"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.78)", // nền bán trong suốt
        backdropFilter: "blur(10px)", // hiệu ứng làm mờ
      }}
    >
      <div className="container">
        {/* Logo / Thương hiệu */}
        <a className="navbar-brand ms-4" href="#home">
          <img src={gear1} alt="logo" style={{ height: "40px" }} />
        </a>
        <div id="navbarText" className="navbar-text">
          <ul className="navbar-nav fw-bold gap-4">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                SERVICE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                EQUIPMENT
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                ABOUT US
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                BLOG
              </a>
            </li>
          </ul>
        </div>
        <div id="navbarText" className="navbar-text">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <button
              className="px-4 text-white btn rounded-5"
              style={{
                background:
                  "linear-gradient(41deg, rgba(49,56,96,1) 0%, rgba(21,25,40,1) 100%)",
              }}
              onClick={togglePosition}
            >
              {form ? "Free Sign Up!" : "Sign In!"}
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};
