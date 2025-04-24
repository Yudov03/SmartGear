import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function Homepage() {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem("activeNav", "Builder");
    navigate("/builder");
  };

  return (
    <div>
      <Header />
      <div className="px-4 py-8 text-center mt-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tính toán hệ thống dẫn động dễ dàng và nhanh chóng
        </h1>
        <p className="text-lg text-gray-600 mb-6 mt-5 text-[20px]">
          Nhập thông số kỹ thuật đầu vào để nhận đề xuất động cơ, hộp số và các bộ phận phù hợp.
        </p>
        <button
          onClick={handleStart}
          className="mt-5 ml-[60px] border-none bg-[#56D3C7] hover:bg-[#3BAFA2] w-[200px] h-[50px] text-white text-[20px] rounded-[5px] shadow-md transition-all"
        >
          Bắt đầu tính toán
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
