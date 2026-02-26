import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaHeart, FaBirthdayCake, FaRing, FaWhatsapp, FaCrown, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, selectedCategory, searchTerm]);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/templates`);
      setTemplates(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load templates');
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTemplates(filtered);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'love': return <FaHeart />;
      case 'birthday': return <FaBirthdayCake />;
      case 'anniversary': return <FaRing />;
      default: return null;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'love': return 'from-pink-500 to-rose-600';
      case 'birthday': return 'from-purple-500 to-indigo-600';
      case 'anniversary': return 'from-amber-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* WhatsApp Support */}
      <a
        href="https://wa.me/919027471389"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all"
        data-testid="whatsapp-support-button"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-purple-100"
              data-testid="back-button"
            >
              <FaArrowLeft className="mr-2" /> Back to Home
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Choose Your Template</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6 text-lg py-6 rounded-full border-2 border-purple-300 focus:border-purple-500"
            data-testid="search-input"
          />

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className={`rounded-full px-6 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'border-purple-300 hover:bg-purple-50'
              }`}
              data-testid="category-all"
            >
              All Templates
            </Button>
            <Button
              onClick={() => setSelectedCategory('love')}
              variant={selectedCategory === 'love' ? 'default' : 'outline'}
              className={`rounded-full px-6 ${
                selectedCategory === 'love'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
                  : 'border-pink-300 hover:bg-pink-50'
              }`}
              data-testid="category-love"
            >
              <FaHeart className="mr-2" /> Love
            </Button>
            <Button
              onClick={() => setSelectedCategory('birthday')}
              variant={selectedCategory === 'birthday' ? 'default' : 'outline'}
              className={`rounded-full px-6 ${
                selectedCategory === 'birthday'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                  : 'border-purple-300 hover:bg-purple-50'
              }`}
              data-testid="category-birthday"
            >
              <FaBirthdayCake className="mr-2" /> Birthday
            </Button>
            <Button
              onClick={() => setSelectedCategory('anniversary')}
              variant={selectedCategory === 'anniversary' ? 'default' : 'outline'}
              className={`rounded-full px-6 ${
                selectedCategory === 'anniversary'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                  : 'border-amber-300 hover:bg-amber-50'
              }`}
              data-testid="category-anniversary"
            >
              <FaRing className="mr-2" /> Anniversary
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-pulse text-4xl mb-4">💝</div>
            <p className="text-gray-600">Loading templates...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredTemplates.map((template) => (
              <div
                key={template._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group hover:scale-105"
                data-testid={`template-card-${template._id}`}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${getCategoryColor(template.category)} text-white px-3 py-1 rounded-full text-sm flex items-center gap-2`}>
                    {getCategoryIcon(template.category)}
                    {template.category}
                  </div>
                  {template.isPremium && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FaCrown /> Premium
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{template.name}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{template.pages?.length || 3} Pages</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => navigate(`/template/${template._id}`)}
                      variant="outline"
                      className="flex-1 border-2 border-purple-500 text-purple-700 hover:bg-purple-50 rounded-full"
                      data-testid={`preview-button-${template._id}`}
                    >
                      Preview
                    </Button>
                    <Button
                      onClick={() => navigate(`/customize/${template._id}`)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full"
                      data-testid={`select-button-${template._id}`}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredTemplates.length === 0 && (
          <div className="text-center py-20" data-testid="no-templates">
            <p className="text-2xl text-gray-600">No templates found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
