import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import HomePage from '@/pages/HomePage';
import TemplatesPage from '@/pages/TemplatesPage';
import TemplatePreviewPage from '@/pages/TemplatePreviewPage';
import CustomizePage from '@/pages/CustomizePage';
import PaymentPage from '@/pages/PaymentPage';
import SuccessPage from '@/pages/SuccessPage';
import GeneratedSitePage from '@/pages/GeneratedSitePage';
import AdminPanel from '@/pages/AdminPanel';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/template/:id" element={<TemplatePreviewPage />} />
          <Route path="/customize/:id" element={<CustomizePage />} />
          <Route path="/payment/:siteId" element={<PaymentPage />} />
          <Route path="/success/:slug" element={<SuccessPage />} />
          <Route path="/site/:slug" element={<GeneratedSitePage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
