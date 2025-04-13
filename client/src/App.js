import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header/Header.js';
import Sidebar from './components/Sidebar';
import AuthModal from './components/Login/AuthModal';
import { AuthModalProvider } from "./components/Login/AuthModalContext";
import { UserProvider } from "./components/Login/UserContext.js";
import HomePage from "./pages/HomePage.js";
import ProfilePage from "./pages/ProfilePage.js";
import WalletPage from './pages/WalletPage.js';
import CreatePage from './pages/CreatePage.js';
import CommunitiesPage from './pages/CommunitiesPage.js';
import TrendingPage from './pages/TrendingPage.js';
import SinglePostPage from './pages/SinglePostPage.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [modalType, setModalType] = useState("hidden"); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/user', { 
          withCredentials: true 
        });
        
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.log('Not authenticated');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  function logout(){
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true});
  }

  return (
    <div className="min-h-screen bg-black overscroll-none">
      <AuthModalProvider> 
          {!loading && (
            <div className="bg-black min-h-screen overflow-auto">
              <AuthModal />
              <Header />
              <Sidebar />
              <div className="w-screen h-full ml-64 mt-24 p-12 px-24 bg-black text-white rounded-lg">
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="/create" element={<CreatePage />} />
                  <Route path="/communities" element={<CommunitiesPage />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  <Route path="/auth/posts/:id" element={<SinglePostPage />} />
                  <Route path="/auth/user/:id" element={<ProfilePage />} />
                </Routes>
              </div>
            </div>
          )}
      </AuthModalProvider>
    </div>
  );
}

export default App;