import { Route, Routes, useLocation } from "react-router-dom";
import WelcomePage from "./WelcomePage/WelcomePage";
import LoginPage from "./login/loginPage";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage"
import BuilderPage from "./pages/BuilderPage";
import CatalogPage from "./pages/CatalogPage";
import HistoryPage from "./pages/HistoryPage";
import Homepage from "./pages/Homepage"

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
              <Route path="/home" element={<Homepage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          }
        />
      )}
    </>
  );
}