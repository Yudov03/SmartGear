import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import AxiosInstance from "../axios/AxiosInstance";
import { useEffect } from "react";

const PAGE_SIZE = 5;

const dummyHistory = [
  { id: 1,  timestamp: "2025-05-12 09:15", systemType: "Hệ thống thùng trộn", note: "Trộn bê tông, công suất cao" },
  { id: 2,  timestamp: "2025-05-11 14:45", systemType: "Hệ thống thùng trộn", note: "Trộn xi măng mịn" },
  { id: 3,  timestamp: "2025-05-10 18:20", systemType: "Hệ thống thùng trộn", note: "Thùng trộn di động cho công trường" },
  { id: 4,  timestamp: "2025-05-09 07:50", systemType: "Hệ thống thùng trộn", note: "Tốc độ trộn 60 vòng/phút" },
  { id: 5,  timestamp: "2025-05-08 12:30", systemType: "Hệ thống thùng trộn", note: "Dung tích 1.2 m³" },
  { id: 6,  timestamp: "2025-05-07 16:05", systemType: "Hệ thống thùng trộn", note: "Chống ăn mòn và dễ vệ sinh" },
  { id: 7,  timestamp: "2025-05-06 20:40", systemType: "Hệ thống thùng trộn", note: "Chuyên dụng cho thạch cao" },
  { id: 8,  timestamp: "2025-05-05 08:25", systemType: "Hệ thống thùng trộn", note: "Tự động bơm nước định lượng" },
  { id: 9,  timestamp: "2025-05-04 13:55", systemType: "Hệ thống thùng trộn", note: "Có đảo chiều trộn" },
  { id: 10, timestamp: "2025-05-03 11:10", systemType: "Hệ thống thùng trộn", note: "Trang bị bánh xe cơ động" },
  { id: 11, timestamp: "2025-05-02 17:45", systemType: "Hệ thống thùng trộn", note: "Điều khiển PLC, màn hình cảm ứng" },
  { id: 12, timestamp: "2025-05-01 09:00", systemType: "Hệ thống thùng trộn", note: "Tiết kiệm điện, kết cấu gọn nhẹ" }
];


export default function ProjectsPage() {
  // Chỉ dùng dummy data, không cần loading hay effect
  //const [history] = useState(dummyHistory);
  const [page, setPage] = useState(1);
  const [history, setProjects] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    AxiosInstance.get("/projects/")
      .then((res) => {
        setProjects(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(history);

  const totalPages = Math.ceil(history.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageData = history.slice(start, start + PAGE_SIZE);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mt-[50px] flex-1 px-[50px]">
        <h1 className="text-[30px] font-[700] text-black mb-6">Projects List</h1>

        <div className="space-y-[20px] mt-[50px]">
          {pageData.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 rounded-[15px] shadow-sm ${
                idx % 2 === 0 ? "bg-[#4FD1C5]" : "bg-[#E6FAF8]"
              } flex justify-between items-center`}
            >
              <div>
                <div className="text-[25px] font-semibold text-gray-800">{item.name || "Project Name"}</div>
                <div className="text-[18px] text-gray-700">{item.status || "Status"}</div>
                <div className="text-[18px] text-gray-800 mt-1">{item.description || "Description"}</div>
              </div>
              <button
                className="px-3 py-1 bg-gray-200 ml-[20px] w-[150px] h-[50px] text-[17px] rounded-[16px] disabled:opacity-50"
                onClick={() => navigate(`/projects/${item.id}`)}
              >
                Details
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-[40px] flex justify-center items-center space-x-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 bg-gray-200 mr-[20px] rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 bg-gray-200 ml-[20px] rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <div className="fixed bottom-[50px] right-[50px] z-50">
        {<ChatBox />}
      </div>
      <Footer />
    </div>
  );
}
