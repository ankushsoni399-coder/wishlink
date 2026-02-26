import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const GeneratedSitePage = () => {
  const { slug } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchSite();
  }, [slug]);

  const fetchSite = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/sites/view/${slug}`);
      setSite(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Site not found or payment pending');
      setLoading(false);
    }
  };

  const renderPage = () => {
    if (!site || !site.templateId || !site.templateId.pages) return null;

    const page = site.templateId.pages[currentPage];
    if (!page) return null;

    let html = page.htmlContent;

    // Replace placeholders with actual user data
    html = html.replace(/{{yourName}}/g, site.userData.yourName || '');
    html = html.replace(/{{partnerName}}/g, site.userData.partnerName || '');
    html = html.replace(/{{relationshipDate}}/g, site.userData.relationshipDate || '');
    html = html.replace(/{{loveMessage}}/g, site.userData.loveMessage || '');
    html = html.replace(/{{customMessage}}/g, site.userData.customMessage || '');
    html = html.replace(/{{favoriteSong}}/g, site.userData.favoriteSong || '');

    // Replace image placeholders
    html = html.replace(
      /{{#each images}}([\s\S]*?){{\/#each}}/g,
      (match, content) => {
        if (!site.images || site.images.length === 0) return '';
        return site.images
          .map(img => content.replace(/{{this}}/g, `${BACKEND_URL}${img}`))
          .join('');
      }
    );

    // Handle conditional blocks
    html = html.replace(
      /{{#if favoriteSong}}([\s\S]*?){{\/#if}}/g,
      (match, content) => {
        return site.userData.favoriteSong ? content : '';
      }
    );

    // Add "Made by Ankuu" watermark
    html += `
      <div style="position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; opacity: 0.3; z-index: 9999; font-family: sans-serif;">
        Made by Ankuu
      </div>
    `;

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const nextPage = () => {
    if (site && site.templateId && site.templateId.pages) {
      setCurrentPage((prev) => Math.min(prev + 1, site.templateId.pages.length - 1));
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <div className="text-center">
          <div className="animate-pulse text-6xl mb-4">💝</div>
          <p className="text-gray-600 text-xl">Loading your special website...</p>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Site Not Found</h1>
          <p className="text-gray-600">This site doesn't exist or payment is pending.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" data-testid="generated-site">
      {/* WhatsApp Support */}
      <a
        href="https://wa.me/919027471389"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all"
        data-testid="whatsapp-support-button"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Navigation Controls */}
      {site.templateId && site.templateId.pages && site.templateId.pages.length > 1 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-purple-500 text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-600 transition-all"
            data-testid="prev-page-button"
          >
            ← Prev
          </button>
          <span className="text-gray-700 font-medium">
            {currentPage + 1} / {site.templateId.pages.length}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage >= site.templateId.pages.length - 1}
            className="px-4 py-2 bg-purple-500 text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-600 transition-all"
            data-testid="next-page-button"
          >
            Next →
          </button>
        </div>
      )}

      {/* Page Content */}
      <div>{renderPage()}</div>
    </div>
  );
};

export default GeneratedSitePage;
