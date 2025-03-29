import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Pages
import Home from './pages/Home';
import BrowseCounselors from './pages/BrowseCounselors';
import CounselorProfile from './pages/CounselorProfile';
import CounselorDashboard from './pages/CounselorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import JoinAsCounselor from './pages/JoinAsCounselor';

// Layout
import Layout from './components/Layout';

function App() {
  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="counselors" element={<BrowseCounselors />} />
              <Route path="counselors/:id" element={<CounselorProfile />} />
              <Route path="dashboard/counselor" element={<CounselorDashboard />} />
              <Route path="dashboard/admin" element={<AdminDashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="join" element={<JoinAsCounselor />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
