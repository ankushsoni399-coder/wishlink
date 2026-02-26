import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { FaUsers, FaFileAlt, FaDollarSign, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [stats, setStats] = useState(null);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchStats();
      fetchSites();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, {
        email,
        password
      });

      const { token: newToken } = response.data;
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setIsLoggedIn(true);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
    toast.success('Logged out');
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const fetchSites = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/sites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSites(response.data);
    } catch (error) {
      console.error('Failed to fetch sites');
    }
  };

  const deleteSite = async (siteId) => {
    if (!window.confirm('Are you sure you want to delete this site?')) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/admin/sites/${siteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Site deleted');
      fetchSites();
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete site');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wishlink.com"
                required
                className="mt-2"
                data-testid="admin-email-input"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="mt-2"
                data-testid="admin-password-input"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6"
              data-testid="admin-login-button"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Default: admin@wishlink.com / admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">WishLink Management</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              data-testid="view-site-button"
            >
              View Site
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              data-testid="logout-button"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Sites</p>
                  <p className="text-4xl font-bold">{stats.totalSites}</p>
                </div>
                <FaUsers size={40} className="opacity-50" />
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Verified</p>
                  <p className="text-4xl font-bold">{stats.verifiedSites}</p>
                </div>
                <FaFileAlt size={40} className="opacity-50" />
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Pending</p>
                  <p className="text-4xl font-bold">{stats.pendingSites}</p>
                </div>
                <FaFileAlt size={40} className="opacity-50" />
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Revenue</p>
                  <p className="text-4xl font-bold">₹{stats.revenue}</p>
                </div>
                <FaDollarSign size={40} className="opacity-50" />
              </div>
            </Card>
          </div>
        )}

        {/* Sites Table */}
        <Card className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">All Sites</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Slug</th>
                  <th className="text-left py-3 px-4">Names</th>
                  <th className="text-left py-3 px-4">Template</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Created</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site) => (
                  <tr key={site._id} className="border-b hover:bg-gray-50" data-testid={`site-row-${site._id}`}>
                    <td className="py-3 px-4">
                      <a
                        href={`/site/${site.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        {site.slug}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      {site.userData?.yourName} & {site.userData?.partnerName}
                    </td>
                    <td className="py-3 px-4">{site.templateId?.name || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          site.paymentStatus === 'verified'
                            ? 'bg-green-100 text-green-700'
                            : site.paymentStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {site.paymentStatus}
                      </span>
                      {site.usedCode && (
                        <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Code</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(site.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        onClick={() => deleteSite(site._id)}
                        variant="destructive"
                        size="sm"
                        data-testid={`delete-site-${site._id}`}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
