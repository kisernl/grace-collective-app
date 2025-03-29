import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircleAlert, Lock, LogIn, Mail, UserPlus } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Redirect based on user role
        if (email === 'counselor@example.com') {
          navigate('/dashboard/counselor');
        } else if (email === 'admin@example.com') {
          navigate('/dashboard/admin');
        } else {
          // Check if there's a stored intended path (for redirecting after login)
          const intendedPath = localStorage.getItem('intendedPath');
          if (intendedPath) {
            localStorage.removeItem('intendedPath');
            navigate(intendedPath);
          } else {
            navigate('/counselors');
          }
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="card shadow-lg">
        <h1 className="text-2xl font-bold font-serif text-center text-gray-900 mb-8">
          Sign in to your account
        </h1>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-md p-3 flex items-start">
            <CircleAlert size={20} className="mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="youremail@example.com"
                required
              />
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
              />
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center">
                <LogIn size={18} className="mr-2" />
                Sign in
              </span>
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-center text-sm text-gray-600 mb-4">
            Don't have an account?
          </p>
          <Link 
            to="/register" 
            className="btn-secondary w-full flex justify-center items-center"
          >
            <UserPlus size={18} className="mr-2" />
            Create Account
          </Link>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts (for testing)</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Counselor:</strong> counselor@example.com / password</p>
            <p><strong>Admin:</strong> admin@example.com / password</p>
            <p><strong>Client:</strong> client@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
