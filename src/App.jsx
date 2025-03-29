import { Route, Routes, useLocation } from "react-router-dom";
import WelcomePage from "./WelcomePage/WelcomePage";
import LoginPage from "./login/loginPage";
import Layout from "./components/Layout";
import BuilderPage from "./pages/BuilderPage";
import CatalogPage from "./pages/CatalogPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  const location = useLocation();
  const noNavbar =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname.includes("password");
  return (
    <>
      {noNavbar ? (
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : (
        <Layout
          content={
            <Routes>
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          }
        />
      )}
    </>
  );
}
