import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const MainLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">KnowledgeOS</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
          <button 
            onClick={handleLogout}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
