import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FaWhatsapp, FaCopy, FaHome } from 'react-icons/fa';
import { toast } from 'sonner';
import Confetti from 'react-confetti';

const FRONTEND_URL = window.location.origin;

const SuccessPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const siteUrl = `${FRONTEND_URL}/site/${slug}`;

  useEffect(() => {
    // Celebrate!
    const timer = setTimeout(() => {
      toast.success('Your website is ready! 🎉');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    toast.success('Link copied to clipboard!');
  };

  const shareWhatsApp = () => {
    const message = encodeURIComponent(`Check out this special website I created for you! 💝 ${siteUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
      />

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

      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative z-10 animate-fade-in">
        {/* Success Icon */}
        <div className="mb-6 animate-bounce">
          <div className="text-8xl mb-4">🎉</div>
          <div className="text-6xl">✅</div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Congratulations!
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your personalized website is ready and live! 🚀
        </p>

        {/* Website URL */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
          <p className="text-sm text-gray-600 mb-2">Your Website Link</p>
          <div className="bg-white rounded-xl p-4 mb-4 break-all">
            <p className="text-lg font-mono text-purple-700" data-testid="site-url">{siteUrl}</p>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              onClick={copyLink}
              variant="outline"
              className="border-purple-500 text-purple-700 hover:bg-purple-50"
              data-testid="copy-link-button"
            >
              <FaCopy className="mr-2" /> Copy Link
            </Button>
            <Button
              onClick={shareWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white"
              data-testid="share-whatsapp-button"
            >
              <FaWhatsapp className="mr-2" /> Share on WhatsApp
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={() => window.open(`/site/${slug}`, '_blank')}
            className="w-full py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full"
            data-testid="view-site-button"
          >
            View Your Website
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full py-4 rounded-full border-2 border-purple-500 text-purple-700 hover:bg-purple-50"
            data-testid="create-another-button"
          >
            <FaHome className="mr-2" /> Create Another Website
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-yellow-50 rounded-xl p-4 text-left">
          <p className="font-bold text-gray-800 mb-2">💡 Pro Tips:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Share the link on social media</li>
            <li>• Send it via WhatsApp to your loved one</li>
            <li>• Bookmark the link for future access</li>
            <li>• Screenshot and save as memory</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
