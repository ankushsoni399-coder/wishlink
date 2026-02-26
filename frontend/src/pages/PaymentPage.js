import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaWhatsapp, FaCopy, FaUpload } from 'react-icons/fa';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PaymentPage = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('screenshot');

  const UPI_ID = 'wishlink@paytm'; // Replace with actual UPI ID
  const AMOUNT = 79;

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    toast.success('UPI ID copied!');
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setScreenshot(file);
      toast.success('Screenshot uploaded');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'transaction' && !transactionId) {
      toast.error('Please enter transaction ID');
      return;
    }

    if (paymentMethod === 'screenshot' && !screenshot) {
      toast.error('Please upload payment screenshot');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('siteId', siteId);
      formData.append('paymentMethod', paymentMethod);

      if (paymentMethod === 'transaction') {
        formData.append('transactionId', transactionId);
      } else {
        formData.append('screenshot', screenshot);
      }

      const response = await axios.post(`${BACKEND_URL}/api/payments/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Payment submitted successfully!');
      navigate(`/success/${response.data.slug}`);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.error || 'Payment submission failed');
      setSubmitting(false);
    }
  };

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

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">💳</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Complete Payment
            </h1>
            <p className="text-2xl font-bold text-gray-800">₹{AMOUNT} Only</p>
            <p className="text-gray-600 mt-2">Pay and get your live website link instantly</p>
          </div>

          {/* UPI Payment Info */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Pay via UPI</h3>
            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">UPI ID</p>
                  <p className="font-bold text-lg text-gray-800">{UPI_ID}</p>
                </div>
                <Button
                  onClick={copyUpiId}
                  variant="outline"
                  size="sm"
                  className="border-purple-500 text-purple-700"
                  data-testid="copy-upi-button"
                >
                  <FaCopy className="mr-2" /> Copy
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• Open your UPI app (PhonePe, GPay, Paytm)</p>
              <p>• Pay ₹{AMOUNT} to the above UPI ID</p>
              <p>• Submit payment proof below</p>
            </div>
          </div>

          {/* Payment Proof Tabs */}
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="screenshot" data-testid="screenshot-tab">Payment Screenshot</TabsTrigger>
              <TabsTrigger value="transaction" data-testid="transaction-tab">Transaction ID</TabsTrigger>
            </TabsList>

            <TabsContent value="screenshot">
              <div className="space-y-4">
                <Label>Upload Payment Screenshot *</Label>
                <label
                  htmlFor="screenshot"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
                  data-testid="screenshot-upload-area"
                >
                  {screenshot ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(screenshot)}
                        alt="Payment Screenshot"
                        className="max-h-36 mx-auto mb-2 rounded-lg"
                      />
                      <p className="text-sm text-gray-600">{screenshot.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FaUpload className="mx-auto text-4xl text-purple-500 mb-2" />
                      <p className="text-gray-600">Click to upload screenshot</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    className="hidden"
                    data-testid="screenshot-input"
                  />
                </label>
              </div>
            </TabsContent>

            <TabsContent value="transaction">
              <div className="space-y-4">
                <Label htmlFor="transactionId">Transaction ID / UTR Number *</Label>
                <Input
                  id="transactionId"
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter 12-digit transaction ID"
                  className="text-lg"
                  data-testid="transaction-id-input"
                />
                <p className="text-sm text-gray-500">Find this in your UPI app's transaction history</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full"
            data-testid="submit-payment-button"
          >
            {submitting ? 'Verifying...' : 'Submit Payment'}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Need help? <a href="https://wa.me/919027471389" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
