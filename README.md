# 💝 WishLink - Complete SaaS Love Website Generator

**Transform your precious moments into beautiful personalized websites in just 60 seconds!**

WishLink is a production-grade SaaS platform that allows users to create stunning, multi-page romantic websites instantly. Perfect for love messages, birthdays, and anniversaries.

![WishLink Banner](https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200)

---

## ✨ Features

### 🎨 **21 Professional Templates**
- **10 Love Templates**: Eternal Love, Sweet Moments, Love Timeline, Romantic Getaway, Love Diary, Heart & Soul, Magical Moments, Love Chronicles, Modern Romance, Elegant Love
- **8 Birthday Templates**: Birthday Celebration, Birthday Surprise, Golden Birthday, Fun Birthday, Milestone Birthday, Party Time, Birthday Bliss, Grand Celebration
- **3 Anniversary Templates**: Anniversary Special, Forever Together, Anniversary Memories

### 🚀 **Core Features**
- ✅ **Multi-Page Templates** (7-8 pages per template)
- ✅ **Photo Galleries** (Up to 10 images)
- ✅ **Love Messages & Custom Text**
- ✅ **Favorite Song Integration**
- ✅ **Password Protection** (Optional)
- ✅ **Instant Live URL** (shareable everywhere)
- ✅ **Mobile Responsive** (Perfect on all devices)

### 🔑 **Generate by Ankuu Code**
- Special secret code feature: **PAPAJII**
- Users with this code can create websites **FREE**
- Code verification before customization

### 💳 **Flexible Payment Options**
- **Payment Screenshot Upload** (Easiest method)
- **Transaction ID Verification**
- Manual UPI payment (₹79 only)
- Auto-verification system

### 🎯 **Additional Features**
- **"Made by Ankuu" Watermark** (Subtle branding)
- **WhatsApp Support Integration** (9027471389)
- **Admin Panel** for complete management
- **Real-time Preview** before customization
- **Beautiful Animations** throughout

---

## 🏗️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **JWT** (Authentication)
- **Multer** (File uploads)
- **bcrypt** (Password hashing)

### Frontend
- **React 19**
- **React Router** (Navigation)
- **Tailwind CSS** (Styling)
- **Shadcn/UI** (Components)
- **Axios** (API calls)
- **Sonner** (Toast notifications)
- **React Icons** (Icons)
- **React Confetti** (Celebrations)

---

## 📁 Project Structure

```
wishlink/
├── backend/
│   ├── models/
│   │   ├── Template.js          # Template schema
│   │   ├── UserSite.js          # User site schema
│   │   └── Admin.js             # Admin schema
│   ├── routes/
│   │   ├── templates.js         # Template routes
│   │   ├── sites.js             # Site creation routes
│   │   ├── payments.js          # Payment routes
│   │   └── admin.js             # Admin routes
│   ├── uploads/                 # Image storage
│   ├── server.js                # Express server
│   ├── seedTemplates.js         # Database seeder
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── TemplatesPage.js
│   │   │   ├── TemplatePreviewPage.js
│   │   │   ├── CustomizePage.js
│   │   │   ├── PaymentPage.js
│   │   │   ├── SuccessPage.js
│   │   │   ├── GeneratedSitePage.js
│   │   │   └── AdminPanel.js
│   │   ├── components/ui/       # Shadcn components
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── .env
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB installed and running
- Yarn package manager

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/ankushsoni399-coder/wishlink.git
cd wishlink
```

2. **Backend Setup**
```bash
cd backend
yarn install

# Create .env file
echo "MONGO_URL=mongodb://localhost:27017" > .env
echo "DB_NAME=wishlink_db" >> .env
echo "CORS_ORIGINS=*" >> .env
echo "JWT_SECRET=your-secret-key" >> .env

# Seed database with templates
node seedTemplates.js

# Start backend server
yarn start
# Server runs on http://localhost:8001
```

3. **Frontend Setup**
```bash
cd ../frontend
yarn install

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start frontend
yarn start
# App runs on http://localhost:3000
```

4. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- Admin Panel: http://localhost:3000/admin

---

## 🎯 User Flow

### For Regular Users

1. **Browse Templates** → Choose from 21 beautiful templates
2. **Preview** → See full template with sample data
3. **Customize** → Fill form with:
   - Your name & partner's name
   - Special date
   - Love message
   - Custom message
   - Favorite song
   - Upload 3-10 photos
   - Optional password
4. **Payment** → Pay ₹79 via UPI (Screenshot or Transaction ID)
5. **Success** → Get instant live URL
6. **Share** → WhatsApp, Instagram, anywhere!

### For Code Users

1. **Browse Templates**
2. **Customize** → Click "Generate by Ankuu Code"
3. **Enter Code** → `PAPAJII`
4. **Verify** → Code verified ✅
5. **Create Free** → Skip payment, get instant URL!

### For Admins

1. **Login** → admin@wishlink.com / admin123
2. **Dashboard** → View stats (total sites, revenue, etc.)
3. **Manage Sites** → View all created sites
4. **Delete Sites** → Remove if needed
5. **Monitor Payments** → Track verified/pending

---

## 🔐 Secret Code

**Code**: `PAPAJII`

Users who know this code can:
- Create websites completely FREE
- Skip payment verification
- Instant live website

Perfect for beta testers, special users, or promotional campaigns!

---

## 💳 Payment Integration

### Current Setup
- **Manual UPI Payment** (₹79)
- **UPI ID**: wishlink@paytm *(Change in PaymentPage.js)*
- **Two verification methods**:
  1. Payment Screenshot Upload (Recommended)
  2. Transaction ID Entry

### Future Enhancements
- Razorpay/Stripe integration
- Automatic payment verification
- Multiple pricing tiers
- Discount codes

---

## 👨‍💼 Admin Panel

**Default Login**:
- Email: `admin@wishlink.com`
- Password: `admin123`

**Features**:
- Dashboard with statistics
- View all created sites
- Delete sites
- Monitor payment status
- Track revenue
- Filter by status (verified/pending)
- See code usage

**Access**: `/admin`

---

## 🎨 Template Structure

Each template has:
- **3-7 pages** (customizable)
- **Dynamic placeholders**:
  - `{{yourName}}`
  - `{{partnerName}}`
  - `{{relationshipDate}}`
  - `{{loveMessage}}`
  - `{{customMessage}}`
  - `{{favoriteSong}}`
  - `{{#each images}}` loop
- **Full HTML/CSS** styling
- **Responsive design**
- **Animations included**

---

## 🌐 API Endpoints

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID

### Sites
- `POST /api/sites/verify-code` - Verify secret code
- `POST /api/sites/create` - Create new site
- `GET /api/sites/view/:slug` - View generated site

### Payments
- `POST /api/payments/submit` - Submit payment proof
- `GET /api/payments/status/:siteId` - Check payment status

### Admin (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/sites` - Get all sites
- `DELETE /api/admin/sites/:id` - Delete site
- `POST /api/admin/templates` - Add new template
- `DELETE /api/admin/templates/:id` - Delete template

---

## 🎯 Key Highlights

✨ **Production-Ready**
- Scalable architecture
- Error handling
- Input validation
- Security best practices

✨ **User-Friendly**
- Beautiful UI/UX
- Smooth animations
- Mobile responsive
- WhatsApp support

✨ **Business Model**
- Pay-per-site (₹79)
- Secret code system
- Future subscription plans
- Scalable pricing

✨ **Admin Control**
- Complete dashboard
- Site management
- Revenue tracking
- User analytics

---

## 📸 Screenshots

### Homepage
![Homepage](https://via.placeholder.com/800x400?text=Homepage+Screenshot)

### Templates
![Templates](https://via.placeholder.com/800x400?text=Templates+Page)

### Customize
![Customize](https://via.placeholder.com/800x400?text=Customize+Form)

### Generated Site
![Generated](https://via.placeholder.com/800x400?text=Generated+Website)

---

## 🔧 Configuration

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=wishlink_db
CORS_ORIGINS=*
JWT_SECRET=your-secret-key-here
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 📝 Database Models

### Template
- name, category, description
- thumbnail, isPremium, isActive
- pages[] (multi-page content)
- videoPreview (future)

### UserSite
- templateId, slug, userData
- images[], paymentStatus
- transactionId, paymentScreenshot
- usedCode, secretCode

### Admin
- email, password (hashed)

---

## 🚀 Deployment

### Backend (Node.js)
```bash
# Build
cd backend
yarn install --production

# Start
PORT=8001 node server.js
```

### Frontend (React)
```bash
# Build
cd frontend
yarn build

# Deploy build/ folder to:
# - Vercel
# - Netlify
# - AWS S3 + CloudFront
# - Any static hosting
```

### Database
- MongoDB Atlas (Cloud)
- Or self-hosted MongoDB

---

## 🛠️ Customization

### Add New Template
1. Open `/backend/seedTemplates.js`
2. Add template object with pages
3. Run `node seedTemplates.js`
4. Restart backend

### Change Payment Amount
1. Open `/frontend/src/pages/PaymentPage.js`
2. Update `AMOUNT` constant
3. Update admin stats calculation

### Change UPI ID
1. Open `/frontend/src/pages/PaymentPage.js`
2. Update `UPI_ID` constant

### Change Secret Code
1. Open `/backend/routes/sites.js`
2. Update `validCode` in `/verify-code` route
3. Update frontend placeholder

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb
```

### Port Already in Use
```bash
# Kill process on port 8001
kill -9 $(lsof -t -i:8001)

# Kill process on port 3000
kill -9 $(lsof -t -i:3000)
```

### Images Not Loading
- Check `/backend/uploads/` directory exists
- Verify file permissions
- Check CORS settings

---

## 📞 Support

**WhatsApp Support**: [+91 9027471389](https://wa.me/919027471389)

**Issues**: Create an issue on GitHub

**Email**: wishlink@example.com *(Update with actual email)*

---

## 🎯 Future Enhancements

- [ ] Video previews for templates
- [ ] Rich text editor for messages
- [ ] Music player integration
- [ ] Download as PDF
- [ ] QR code generation
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Social media auto-sharing
- [ ] Custom domain mapping
- [ ] White-label options
- [ ] Mobile app (React Native)

---

## 📄 License

MIT License - Feel free to use for personal or commercial projects

---

## 👨‍💻 Developer

**Made with ❤️ by Ankuu**

Repository: [github.com/ankushsoni399-coder/wishlink](https://github.com/ankushsoni399-coder/wishlink)

---

## 🙏 Acknowledgments

- Shadcn UI for beautiful components
- Unsplash for template images
- MongoDB for database
- React team for amazing framework
- Express.js for backend simplicity

---

## 📊 Statistics

- **21 Templates** (10 Love, 8 Birthday, 3 Anniversary)
- **7-8 Pages per template**
- **10 Image upload capacity**
- **60 seconds** website creation
- **₹79** per website
- **FREE with code PAPAJII**

---

## 🎉 Quick Commands

```bash
# Development
yarn start          # Start both frontend & backend

# Backend only
cd backend && yarn start

# Frontend only  
cd frontend && yarn start

# Seed database
cd backend && node seedTemplates.js

# Production build
cd frontend && yarn build
```

---

**Ready to launch! 🚀**

Create your first love website now at [http://localhost:3000](http://localhost:3000)
