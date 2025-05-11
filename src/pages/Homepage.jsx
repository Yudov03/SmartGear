import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Homepage() {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem("activeNav", "Builder");
    navigate("/builder");
  };

  const stats = [
    { label: "Total Projects", value: "156", change: "+12%", trend: "up" },
    { label: "Active Users", value: "2.4k", change: "+8%", trend: "up" },
    { label: "Calculations", value: "32k", change: "+24%", trend: "up" },
    { label: "Success Rate", value: "99.8%", change: "+2%", trend: "up" },
  ];

  const recentActivities = [
    { user: "Nguyễn Văn A", action: "Completed gearbox calculation", time: "2 hours ago", specs: "P=75kW, n=1450rpm" },
    { user: "Trần Thị B", action: "Started new project", time: "4 hours ago", specs: "Industrial conveyor system" },
    { user: "Lê Văn C", action: "Modified parameters", time: "6 hours ago", specs: "Updated lifetime: 5 years" },
  ];

  const performanceData = [
    { name: 'Success', value: 95 },
    { name: 'Failed', value: 5 }
  ];

  const hoverEffect = {
    scale: 1.02,
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <Header />

      {/* Hero Section */}
      <div className="py-5 text-center bg-white text-dark">
        <div className="container">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="display-4 fw-bold mb-3"
          >
            Hệ thống tính toán thiết kế hộp giảm tốc
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="lead mb-4"
          >
            Giải pháp tự động hóa quá trình thiết kế với độ chính xác cao và thời gian thực hiện nhanh chóng
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="btn btn-light btn-lg px-4"
          >
            Bắt đầu thiết kế
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="container mt-n5">
        <div className="row g-3">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={hoverEffect}
              className="col-6 col-md-3"
            >
              <div className="card shadow-sm">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1 text-secondary small">{stat.label}</p>
                    <h5 className="mb-0 fw-bold">{stat.value}</h5>
                  </div>
                  <span className={`badge ${stat.trend === 'up' ? 'bg-success' : 'bg-danger'}`}>{stat.change}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="row gy-4 mt-4">
          {/* Recent Activities */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={hoverEffect}
            className="col-lg-6"
          >
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Hoạt động gần đây</h5>
              </div>
              <div className="card-body">
                {recentActivities.map((act, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ backgroundColor: '#56D3C7' }}
                    className="d-flex mb-4 p-2 rounded"
                  >
                    <div className="flex-shrink-0 me-3">
                      <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        {act.user.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 fw-semibold">{act.user}</p>
                      <p className="mb-1">{act.action}</p>
                      <p className="mb-1 text-info small">{act.specs}</p>
                      <p className="mb-0 text-muted small">{act.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={hoverEffect}
            className="col-lg-6"
          >
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Thông tin hệ thống</h5>
              </div>
              <div className="card-body">
                <h6>Hiệu suất tính toán</h6>
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={performanceData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip />
                    <Bar dataKey="value" fill="#56D3C7" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="row mt-4 g-3">
                  {[
                    { label: 'Avg. Processing Time', value: '1.2s' },
                    { label: 'Total Calculations', value: '32,465' },
                    { label: 'Active Projects', value: '89' },
                    { label: 'System Uptime', value: '99.9%' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ backgroundColor: '#f8f9fa' }}
                      className="col-6"
                    >
                      <div className="p-3 bg-light rounded">
                        <p className="mb-1 small text-secondary">{item.label}</p>
                        <p className="mb-0 fw-semibold">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="row gy-4 mt-4"
        >
          {[
            { title: 'Tính toán nhanh chóng', desc: 'Tối ưu hóa quá trình tính toán với thuật toán hiện đại' },
            { title: 'Độ chính xác cao', desc: 'Kết quả được kiểm chứng và tối ưu hóa theo tiêu chuẩn' },
            { title: 'Dễ dàng sử dụng', desc: 'Giao diện thân thiện, hướng dẫn chi tiết từng bước' },
          ].map((feat, i) => (
            <motion.div
              key={i}
              whileHover={hoverEffect}
              className="col-md-4"
            >
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h6 className="fw-semibold mb-2">{feat.title}</h6>
                  <p className="mb-0 text-secondary">{feat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default Homepage;