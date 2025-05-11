import { Route, Routes, useLocation } from "react-router-dom";
import WelcomePage from "./WelcomePage/WelcomePage";
import LoginPage from "./login/loginPage";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage"
import BuilderPage from "./pages/BuilderPage";
import CatalogPage from "./pages/CatalogPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails"
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
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/builder/:id" element={<BuilderPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          }
        />

      )}
    </>
  );
}
