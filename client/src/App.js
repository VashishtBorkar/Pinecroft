import { Routes, Route } from 'react-router-dom'; 
import Header from './components/Header/Header.js';
import Sidebar from './components/Sidebar';
import HomePage from "./pages/HomePage.js";
import ProfilePage from "./pages/ProfilePage.js";
import WalletPage from './pages/WalletPage.js';
import CreatePage from './pages/CreatePage.js';
import CommunitiesPage from './pages/CommunitiesPage.js';
import TrendingPage from './pages/TrendingPage.js';
import SinglePostPage from './pages/SinglePostPage.js';
import CommunityPage from './pages/CommunityPage.js';
import LoginLandingPage from './pages/LoginLandingPage.js';
import SignUpPage from './pages/SignUpPage.js';
import LoginPage from './pages/LoginPage.js';
import FollowingPage from './pages/FollowingPage.js';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop.js';
import { useContext } from 'react';
import { UserContext } from './components/Login/UserContext';

function App() {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return (
    <Routes>
      <Route path="/login-landing" element={<LoginLandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* All protected routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute user={user}>

            <div className="flex flex-col h-screen bg-black"> {/* "bg-black min-h-screen flex flex-col overflow-hidden" */}

              <Header />

              <div className="flex flex-1 overflow-hidden"> 

                <Sidebar />
                <main className="flex-1 overflow-y-auto p-12 bg-black text-white rounded-lg">
                  <ScrollToTop/>
                  <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/communities" element={<CommunitiesPage />} />
                    <Route path="/following" element={<FollowingPage />} />
                    <Route path="/auth/posts/:id" element={<SinglePostPage />} />
                    <Route path="/auth/user/:id" element={<ProfilePage />} />
                    <Route path="/community/:id" element={<CommunityPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
