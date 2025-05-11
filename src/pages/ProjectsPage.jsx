import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const PAGE_SIZE = 5;

const dummyHistory = [
  { id: 1, timestamp: "2025-05-10 14:23", systemType: "Hệ thống bánh răng nón", note: "Tính cho động cơ 5kW" },
  { id: 2, timestamp: "2025-05-09 09:10", systemType: "Hệ thống bánh răng trụ", note: "Tải trung bình, tốc độ 1500rpm" },
  { id: 3, timestamp: "2025-05-08 18:45", systemType: "Hệ thống hộp số hành tinh", note: "Dùng cho máy CNC công nghiệp" },
  { id: 4, timestamp: "2025-05-07 11:15", systemType: "Hệ thống truyền đai", note: "Thiết kế đơn giản cho quạt công nghiệp" },
  { id: 5, timestamp: "2025-05-06 16:00", systemType: "Hệ thống truyền xích", note: "Độ bền cao, môi trường nhiều bụi" },
  { id: 6, timestamp: "2025-05-05 08:30", systemType: "Hệ thống hộp giảm tốc", note: "Tải nặng, tốc độ thấp" },
  { id: 7, timestamp: "2025-05-04 19:20", systemType: "Hệ thống dẫn động thủy lực", note: "Ứng dụng trong máy ép thuỷ lực" },
  { id: 8, timestamp: "2025-05-03 13:10", systemType: "Hệ thống hộp số hai cấp", note: "Tối ưu hoá mô-men xoắn" },
  { id: 9, timestamp: "2025-05-02 10:40", systemType: "Hệ thống dẫn động điện", note: "Tính cho xe tự hành AGV" },
  { id: 10, timestamp: "2025-05-01 15:50", systemType: "Hệ thống bánh răng hypoid", note: "Góc lệch trục 90°, tải nặng" },
  { id: 11, timestamp: "2025-04-30 17:05", systemType: "Hệ thống bánh răng xoắn", note: "Tăng độ êm, giảm rung động" },
  { id: 12, timestamp: "2025-04-29 09:30", systemType: "Hệ thống hộp số biến thiên vô cấp (CVT)", note: "Ứng dụng trong xe tay ga" },
];

export default function ProjectsPage() {
  // Chỉ dùng dummy data, không cần loading hay effect
  const [history] = useState(dummyHistory);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

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
                <div className="text-[25px] font-semibold text-gray-800">{item.systemType}</div>
                <div className="text-[18px] text-gray-700">{item.timestamp}</div>
                <div className="text-[18px] text-gray-800 mt-1">{item.note}</div>
              </div>
              <button
                className="px-4 py-2 bg-white text-teal-700 border border-teal-500 rounded-[15px] hover:bg-teal-50"
                onClick={() => navigate(`/projects/${item.id}`)}
              >
                Xem chi tiết
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
      <Footer />
    </div>
  );
}
