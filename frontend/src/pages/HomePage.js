import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaWhatsapp, FaHeart, FaBirthdayCake, FaRing, FaStar, FaCheck } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* WhatsApp Support Button */}
      <a
        href="https://wa.me/919027471389"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all"
        data-testid="whatsapp-support-button"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="mb-6 animate-float">
              <span className="text-7xl">💝</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Your Love Website
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Turn your precious moments into a beautiful personalized website in just 60 seconds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate('/templates')}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                data-testid="get-started-button"
              >
                Get Started - ₹79 Only
              </Button>
              <Button
                onClick={() => navigate('/templates')}
                size="lg"
                variant="outline"
                className="border-2 border-purple-500 text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg rounded-full"
                data-testid="browse-templates-button"
              >
                Browse Templates
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105" data-testid="step-1">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Choose Template</h3>
              <p className="text-gray-600">Pick from 20+ romantic templates</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105" data-testid="step-2">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Customize</h3>
              <p className="text-gray-600">Add your photos, messages & details</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105" data-testid="step-3">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Share</h3>
              <p className="text-gray-600">Get instant link & share anywhere</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Template Categories</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 rounded-3xl text-white text-center cursor-pointer hover:scale-105 transition-all shadow-xl" onClick={() => navigate('/templates?category=love')} data-testid="category-love">
              <FaHeart size={50} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Love</h3>
              <p className="opacity-90">10+ Templates</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-3xl text-white text-center cursor-pointer hover:scale-105 transition-all shadow-xl" onClick={() => navigate('/templates?category=birthday')} data-testid="category-birthday">
              <FaBirthdayCake size={50} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Birthday</h3>
              <p className="opacity-90">8+ Templates</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-3xl text-white text-center cursor-pointer hover:scale-105 transition-all shadow-xl" onClick={() => navigate('/templates?category=anniversary')} data-testid="category-anniversary">
              <FaRing size={50} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Anniversary</h3>
              <p className="opacity-90">2+ Templates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg" data-testid={`testimonial-${i}`}>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"Amazing service! Created a beautiful website for my girlfriend in minutes."</p>
                <p className="font-semibold text-gray-800">- Happy Customer</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">FAQ</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg" data-testid="faq-1">
              <h3 className="font-bold text-lg mb-2 text-gray-800">How long does it take?</h3>
              <p className="text-gray-600">Just 60 seconds! Choose template, customize, and get your link instantly.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg" data-testid="faq-2">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Can I edit later?</h3>
              <p className="text-gray-600">Once created, the site is permanent. Choose carefully during customization.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg" data-testid="faq-3">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Payment methods?</h3>
              <p className="text-gray-600">UPI payment with instant verification via screenshot or transaction ID.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">WishLink</h3>
            <p className="opacity-90">Create Love Websites in 60 Seconds</p>
          </div>
          <div className="flex justify-center items-center gap-4 mb-6">
            <a href="https://wa.me/919027471389" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all">
              <FaWhatsapp size={24} />
            </a>
          </div>
          <p className="opacity-80">WhatsApp Support: 9027471389</p>
          <p className="text-sm opacity-70 mt-4">© 2025 WishLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
