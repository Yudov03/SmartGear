import "../App.css";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
function WelcomePage() {
  const navigate = useNavigate();
  const handleSignin = () => {
    navigate(`/login`);
  };
  return (
    <>
      <div className="">
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            {/* Logo / Thương hiệu */}
            <div
              className="navbar-brand d-flex align-items-center p-2 rounded-3"
              style={{ backgroundColor: "#4FD1C5" }}
              onClick={navigate(`/`)}
            >
              {/* <img src={gear1} alt="logo" style={{ marginRight: "8px" }} /> */}
              <img
                alt="SmartGear logo"
                className=""
                style={{ maxWidth: "40px" }}
                src="/Gear.svg"
              />
              <span className="fw-bold text-white ms-2">SMARTGEAR</span>
            </div>

            {/* Nút toggle cho mobile */}

            {/* Menu */}
            <div
              className=" navbar-collapse gap-4 fw-bold"
              //   id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                <li className="nav-item mx-2">
                  <a className="nav-link">Service</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link">Equipment</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link">About Us</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link">Blog</a>
                </li>
              </ul>
              {/* Nút Sign In */}
              <button
                className="btn text-white"
                style={{ backgroundColor: "#4fd1c5" }}
                onClick={handleSignin}
              >
                Sign in
              </button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section
          className="container"
          style={{ clipPath: "inset(0 -10% -29%)" }}
        >
          <div className="row align-items-center py-5">
            {/* Cột trái: Tiêu đề và nút */}
            <div className="col-md-10 ">
              <h1 className="display-5">
                CREATE YOUR <span style={{ color: "#4fd1c5" }}>GEAR</span>
              </h1>
              <h1 className="display-5">
                BUILD YOUR <span style={{ color: "#4fd1c5" }}>DREAM</span>
              </h1>
              <p className="lead mt-3">
                {/* Thêm mô tả ngắn ở đây (nếu cần) */}
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. */}
              </p>
              <button
                className="btn btn-primary btn-lg rounded-3 px-4 mt-5"
                style={{
                  background: "#4fd1c5",
                  border: "none",
                }}
              >
                Create an account
              </button>
            </div>

            {/* Cột phải: Hình minh họa */}
            <div
              className="col-md-2 d-flex justify-content-center mt-md-0"
              //   style={{ clipPath: "inset()", overflow: "visible" }}
              //   style={{ marginLeft: "30px" }}
            >
              <Marquee
                className="blueprint-marquee"
                style={{
                  transform: "rotate(-30deg) translateX(-200px)",
                  width: "400px", // tùy chỉnh
                  //   height: "500px", // tùy chỉnh
                  overflow: "visible", // cho hình lướt ra ngoài
                  //   marginTop: "50px",
                }}
                autoFill
              >
                <img
                  src="/public/Image 2.png"
                  alt="Hình 3"
                  style={{ width: "350px", marginRight: "30px" }}
                />
                <img
                  src="/public/Image 3.png"
                  alt="Hình 1"
                  style={{ width: "350px", marginRight: "30px" }}
                />

                <img
                  src="/public/Image 1.png"
                  alt="Hình 2"
                  style={{ width: "350px", marginRight: "30px" }}
                />

                <img
                  src="/public/Image 6.png"
                  alt="Hình 4"
                  style={{ width: "350px", marginRight: "30px" }}
                />
                <img
                  src="/public/Image 4.png"
                  alt="Hình 5"
                  style={{ width: "350px", marginRight: "30px" }}
                />
              </Marquee>
              <Marquee
                className="blueprint-marquee"
                style={{
                  transform: "rotate(-30deg) translateX(-200px)",
                  width: "350px", // tùy chỉnh
                  //   height: "500px", // tùy chỉnh
                  overflow: "visible", // cho hình lướt ra ngoài
                  marginTop: "200px",
                }}
                direction="right"
                autoFill
              >
                <img
                  src="/public/Image 1.png"
                  alt="Hình 2"
                  style={{ width: "350px", marginRight: "30px" }}
                />
                <img
                  src="/public/Image 6.png"
                  alt="Hình 4"
                  style={{ width: "350px", marginRight: "30px" }}
                />
                <img
                  src="/public/Image 2.png"
                  alt="Hình 3"
                  style={{ width: "350px", marginRight: "30px" }}
                />
                <img
                  src="/public/Image 3.png"
                  alt="Hình 1"
                  style={{ width: "350px", marginRight: "30px" }}
                />

                <img
                  src="/public/Image 4.png"
                  alt="Hình 5"
                  style={{ width: "350px", marginRight: "30px" }}
                />
              </Marquee>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default WelcomePage;
