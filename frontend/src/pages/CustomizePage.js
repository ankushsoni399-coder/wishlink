import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FaArrowLeft, FaWhatsapp, FaUpload, FaTrash, FaKey } from 'react-icons/fa';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CustomizePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form data
  const [yourName, setYourName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [relationshipDate, setRelationshipDate] = useState('');
  const [loveMessage, setLoveMessage] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [favoriteSong, setFavoriteSong] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState([]);
  
  // Secret code feature
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    setImages([...images, ...files]);
    toast.success(`${files.length} image(s) added`);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    toast.success('Image removed');
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/sites/verify-code`, {
        code: secretCode
      });
      if (response.data.valid) {
        setCodeVerified(true);
        toast.success('Code verified! You can create for free 🎉');
      } else {
        toast.error('Invalid code');
      }
    } catch (error) {
      toast.error('Failed to verify code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!yourName || !partnerName) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!codeVerified && images.length < 3) {
      toast.error('Please upload at least 3 images');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('templateId', id);
      
      const userData = {
        yourName,
        partnerName,
        relationshipDate,
        loveMessage,
        customMessage,
        favoriteSong,
        password
      };
      formData.append('userData', JSON.stringify(userData));
      
      images.forEach((image) => {
        formData.append('images', image);
      });

      if (codeVerified) {
        formData.append('usedCode', 'true');
        formData.append('secretCode', secretCode);
      }

      const response = await axios.post(`${BACKEND_URL}/api/sites/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (codeVerified && response.data.paymentStatus === 'verified') {
        // Code used, directly go to success
        navigate(`/success/${response.data.slug}`);
      } else {
        // Regular payment flow
        navigate(`/payment/${response.data.siteId}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.error || 'Failed to create site');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <div className="text-center">
          <div className="animate-pulse text-5xl mb-4">💝</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-12">
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

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/templates')}
            variant="ghost"
            className="mb-4"
            data-testid="back-button"
          >
            <FaArrowLeft className="mr-2" /> Back to Templates
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Customize Your {template?.name}
          </h1>
          <p className="text-gray-600">Fill in your details to create your personalized website</p>
        </div>

        {/* Secret Code Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaKey className="text-white text-2xl" />
              <div>
                <h3 className="text-white font-bold text-lg">Generate by Ankuu Code</h3>
                <p className="text-white/90 text-sm">Have a secret code? Create for FREE!</p>
              </div>
            </div>
            <Button
              onClick={() => setShowCodeInput(!showCodeInput)}
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
              data-testid="toggle-code-button"
            >
              {showCodeInput ? 'Hide' : 'Enter Code'}
            </Button>
          </div>

          {showCodeInput && !codeVerified && (
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter secret code"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value.toUpperCase())}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                data-testid="secret-code-input"
              />
              <Button
                onClick={verifyCode}
                className="bg-white text-orange-500 hover:bg-white/90"
                data-testid="verify-code-button"
              >
                Verify
              </Button>
            </div>
          )}

          {codeVerified && (
            <div className="bg-white/20 rounded-lg p-4 flex items-center gap-3" data-testid="code-verified-message">
              <span className="text-3xl">✅</span>
              <div>
                <p className="text-white font-bold">Code Verified!</p>
                <p className="text-white/90 text-sm">You can create this website for FREE</p>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="yourName">Your Name *</Label>
              <Input
                id="yourName"
                type="text"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder="Your name"
                required
                className="mt-2"
                data-testid="your-name-input"
              />
            </div>
            <div>
              <Label htmlFor="partnerName">Partner's Name *</Label>
              <Input
                id="partnerName"
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Partner's name"
                required
                className="mt-2"
                data-testid="partner-name-input"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="relationshipDate">Special Date</Label>
            <Input
              id="relationshipDate"
              type="text"
              value={relationshipDate}
              onChange={(e) => setRelationshipDate(e.target.value)}
              placeholder="e.g., 14 Feb 2023"
              className="mt-2"
              data-testid="relationship-date-input"
            />
          </div>

          <div>
            <Label htmlFor="loveMessage">Love Message</Label>
            <Textarea
              id="loveMessage"
              value={loveMessage}
              onChange={(e) => setLoveMessage(e.target.value)}
              placeholder="Express your feelings..."
              rows={4}
              className="mt-2"
              data-testid="love-message-input"
            />
          </div>

          <div>
            <Label htmlFor="customMessage">Additional Message</Label>
            <Textarea
              id="customMessage"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Any other message..."
              rows={3}
              className="mt-2"
              data-testid="custom-message-input"
            />
          </div>

          <div>
            <Label htmlFor="favoriteSong">Favorite Song (Optional)</Label>
            <Input
              id="favoriteSong"
              type="text"
              value={favoriteSong}
              onChange={(e) => setFavoriteSong(e.target.value)}
              placeholder="e.g., Perfect by Ed Sheeran"
              className="mt-2"
              data-testid="favorite-song-input"
            />
          </div>

          <div>
            <Label htmlFor="password">Password Protect (Optional)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty for no password"
              className="mt-2"
              data-testid="password-input"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label>Upload Photos {!codeVerified && '(Min 3, Max 10) *'}</Label>
            <div className="mt-2">
              <label
                htmlFor="images"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
                data-testid="image-upload-area"
              >
                <div className="text-center">
                  <FaUpload className="mx-auto text-3xl text-purple-500 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload images</p>
                  <p className="text-xs text-gray-400 mt-1">{images.length}/10 uploaded</p>
                </div>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="image-input"
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group" data-testid={`uploaded-image-${index}`}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                      data-testid={`remove-image-${index}`}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full"
            data-testid="submit-button"
          >
            {submitting ? 'Creating...' : codeVerified ? 'Create Free Website 🎉' : 'Continue to Payment'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CustomizePage;
