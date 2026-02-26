import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TemplatePreviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplate();
  }, [id]);

  const fetchTemplate = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/templates/${id}`);
      setTemplate(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load template');
      setLoading(false);
    }
  };

  const renderPreview = () => {
    if (!template || !template.pages || !template.pages[currentPage]) return null;

    const page = template.pages[currentPage];
    let html = page.htmlContent;

    // Replace placeholders with sample data
    html = html.replace(/{{yourName}}/g, 'John');
    html = html.replace(/{{partnerName}}/g, 'Sarah');
    html = html.replace(/{{relationshipDate}}/g, '14 Feb 2023');
    html = html.replace(/{{loveMessage}}/g, 'You are the sunshine of my life. Every moment with you is magical.');
    html = html.replace(/{{customMessage}}/g, 'Thank you for being my everything.');
    html = html.replace(/{{favoriteSong}}/g, 'Perfect by Ed Sheeran');

    // Replace image placeholders with sample images
    html = html.replace(
      /{{#each images}}([\s\S]*?){{\/#each}}/g,
      (match, content) => {
        const sampleImages = [
          'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400',
          'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400',
          'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400'
        ];
        return sampleImages.map(img => content.replace(/{{this}}/g, img)).join('');
      }
    );

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <div className="text-center">
          <div className="animate-pulse text-5xl mb-4">💝</div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
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

      {/* Controls */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            onClick={() => navigate('/templates')}
            variant="ghost"
            data-testid="back-button"
          >
            <FaArrowLeft className="mr-2" /> Back
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Page {currentPage + 1} of {template?.pages?.length || 1}
            </span>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                variant="outline"
                size="sm"
                data-testid="prev-page-button"
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentPage(Math.min((template?.pages?.length || 1) - 1, currentPage + 1))}
                disabled={currentPage >= (template?.pages?.length || 1) - 1}
                variant="outline"
                size="sm"
                data-testid="next-page-button"
              >
                Next
              </Button>
            </div>
          </div>

          <Button
            onClick={() => navigate(`/customize/${id}`)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full"
            data-testid="customize-button"
          >
            Customize This Template
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="pt-20" data-testid="template-preview">
        {renderPreview()}
      </div>
    </div>
  );
};

export default TemplatePreviewPage;
