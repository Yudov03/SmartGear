import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import SettingPage from './pages/SettingPage.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import Homepage from './pages/Homepage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import RootLayout from './components/RootLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Route mặc định: khi truy cập '/', hiển thị WelcomePage
      {
        index: true,
        element: <WelcomePage />,
      },
      // Các route ứng dụng khi người dùng đã đăng nhập thành công
      {
        path: 'home',
        element: <Homepage />,
      },
      {
        path: 'builder',
        element: <BuilderPage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'setting',
        element: <SettingPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
