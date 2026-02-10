# ROYAL PRIESTHOOD - QUICK REFERENCE

## 🚀 Quick Start
1. Extract ZIP file
2. Install Node.js (if not installed)
3. Open terminal in `backend` folder
4. Run: `npm install`
5. Run: `npm start`
6. Open browser: http://localhost:3000

## 📁 Project Structure
```
royal-priesthood-shop/
├── frontend/          → Website files (HTML, CSS, JS, Images)
│   ├── index.html    → Main page
│   ├── css/          → Styles
│   ├── js/           → JavaScript
│   └── images/       → Product photos & logo
│
└── backend/          → Server & Database
    ├── server.js     → API server
    ├── package.json  → Dependencies
    └── database/     → SQLite database (auto-created)
```

## 🖼️ Add Your Images
Place images in: `frontend/images/`
```
logo/logo.png
kngdm-shirts/black.png, white.png
limited-edition/priesthood collection.png
men-regular/black.png, grey.png, tan.png, white.png
pants-kngdm/black.png, white.png
plain-collection/black.png, grey.png, tan.png, white.png
royal-chosen/black.png, grey.png, tan.png, white.png
shadow-wings/black.png, grey.png, tan.png, white.png
```

## 💻 Backend Commands
```bash
cd backend
npm install          # Install dependencies (first time only)
npm start           # Start server
npm run dev         # Start with auto-reload (development)
```

## 🌐 API Endpoints
```
POST /api/signup    → Create new user account
POST /api/login     → User login
GET  /api/users     → View all users (dev only)
```

## 🔐 User Signup Example
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+27 123 456 7890",
  "password": "securepass"
}
```

## 📦 Features
✅ 7 Product Collections
✅ Shopping Cart (persists in browser)
✅ User Authentication (Login/Signup)
✅ SQLite Database
✅ Responsive Design
✅ Contact Form
✅ About Section
✅ Black & White Premium Design

## 🔧 Customization
- Edit content: `frontend/index.html`
- Edit styles: `frontend/css/styles.css`
- Edit products: `frontend/js/products.js`
- Change API URL: `frontend/js/auth.js` (line 2)

## 📊 Database
Location: `backend/database/users.db`
View with: DB Browser for SQLite or VS Code SQLite extension

Users Table:
- id (auto)
- name
- email (unique)
- phone
- password (hashed)
- created_at (auto)

## 🛠️ Technologies
Frontend: HTML5, CSS3, JavaScript
Backend: Node.js, Express
Database: SQLite
Security: bcryptjs (password hashing)

## 📞 Support
Email: info@royalpriesthood.co.za
Phone: +27 (0) 11 234 5678

## 📄 Documentation
- README.md → Full documentation
- SETUP_GUIDE.md → Step-by-step setup
- This file → Quick reference

---
© 2026 ROYAL PRIESTHOOD - All Rights Reserved
