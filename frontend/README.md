# 👑 Royal Priesthood - E-Commerce Platform

A full-stack e-commerce website for Royal Priesthood clothing brand with user authentication, shopping cart, checkout simulation, and admin dashboard.

---

## 🚀 Features

### Customer Features
- **User Authentication** - Sign up, login, and session management
- **Product Browsing** - 7 curated collections with product filtering
- **Shopping Cart** - Add items, manage quantities, persistent storage
- **Checkout System** - Order placement with delivery details and notes
- **Email Notifications** - Automatic order confirmation emails to customers

### Admin Features
- **Admin Dashboard** - Secure admin panel at `/admin`
- **User Management** - View all registered users
- **Order Management** - View all orders with full details (items, delivery address, notes)
- **Order Status Tracking** - Update order status (pending → paid → shipped)
- **Real-time Notifications** - Email alerts for new orders

---

## 📁 Project Structure

```
royal-priesthood-shop/
├── backend/
│   ├── server.js           # Express API server
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables (create this)
│   └── database/          # SQLite database (auto-generated)
└── frontend/
    ├── index.html         # Main store page
    ├── admin.html         # Admin dashboard
    ├── css/
    │   └── styles.css     # Styling
    ├── js/
    │   ├── products.js    # Product catalog
    │   ├── cart.js        # Shopping cart logic
    │   ├── auth.js        # Authentication
    │   └── main.js        # Event handlers
    └── images/            # Product images
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database (via Railway)
- **bcryptjs** - Password hashing
- **Resend** - Email delivery service
- **dotenv** - Environment configuration

### Frontend
- **Vanilla JavaScript** - No frameworks
- **HTML5/CSS3** - Responsive design
- **LocalStorage** - Cart persistence

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL database (local or Railway)
- Resend account (free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/royal-priesthood-shop.git
cd royal-priesthood-shop
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` folder:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database - MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=royal_priesthood

# Email Configuration (Resend)
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=your-email@gmail.com
ADMIN_URL=http://localhost:3000
```

### 4. Set Up Database

**Option A: Local MySQL**
```sql
CREATE DATABASE royal_priesthood;
```

**Option B: Railway (Cloud)**
1. Sign up at [railway.app](https://railway.app)
2. Create a MySQL database
3. Copy connection details to `.env`

Tables are created automatically on first run.

### 5. Get Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys → Create API Key
3. Copy the key (starts with `re_...`)
4. Add to `.env` as `RESEND_API_KEY`

### 6. Start the Server
```bash
npm start
```

Server runs at: **http://localhost:3000**

---

## 👨‍💼 Create Admin Account

1. Sign up as a normal user through the website
2. Connect to your MySQL database (HeidiSQL, MySQL Workbench, etc.)
3. Run this query:
```sql
UPDATE users SET is_admin = 1 WHERE email = 'your-email@example.com';
```
4. Log in and access admin panel at `/admin`

---

## 🌐 Deployment (Render)

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect your GitHub repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Add Environment Variables on Render
Go to Environment tab and add:
```
DB_HOST=yamanote.proxy.rlwy.net
DB_PORT=39575
DB_USER=root
DB_PASSWORD=your_railway_password
DB_NAME=royal_priesthood
NODE_ENV=production
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=your-email@gmail.com
ADMIN_URL=https://your-app.onrender.com
```

### 4. Deploy
Render automatically deploys. Your site will be live at:
- Main site: `https://your-app.onrender.com`
- Admin panel: `https://your-app.onrender.com/admin`

---

## 📧 Email Configuration

### Development (Free Testing)
Use Resend's test email:
```
FROM_EMAIL=onboarding@resend.dev
```

### Production (Custom Domain)
1. Verify your domain in Resend
2. Add DNS records
3. Update `.env`:
```
FROM_EMAIL=orders@royalpriesthood.co.za
```

### Email Types Sent
1. **Customer Confirmation** - Sent to customer after order
2. **Admin Notification** - Sent to admin email on new order

---

## 🗂️ Database Schema

### Users Table
```sql
id              INT PRIMARY KEY AUTO_INCREMENT
name            VARCHAR(255)
email           VARCHAR(255) UNIQUE
phone           VARCHAR(50)
password        VARCHAR(255)  # Hashed with bcrypt
is_admin        TINYINT(1) DEFAULT 0
created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
```

### Orders Table
```sql
id                  INT PRIMARY KEY AUTO_INCREMENT
user_id             INT FOREIGN KEY → users(id)
user_name           VARCHAR(255)
user_email          VARCHAR(255)
delivery_address    TEXT
email_confirm       VARCHAR(255)
order_notes         TEXT
cart_items          JSON
total               DECIMAL(10,2)
status              VARCHAR(50) DEFAULT 'pending'
created_at          DATETIME DEFAULT CURRENT_TIMESTAMP
```

---

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ SQL injection prevention (parameterized queries)
- ✅ Admin routes protected with middleware
- ✅ Environment variables for sensitive data
- ✅ CORS enabled for API access
- ✅ SSL/TLS for production database connections

---

## 🧪 Testing

### Local Testing
1. Start server: `npm start`
2. Open: `http://localhost:3000`
3. Test checkout flow:
   - Sign up → Login → Add to cart → Checkout
4. Check email at your admin email address
5. Access admin panel: `http://localhost:3000/admin`

### Production Testing
1. Test on live URL
2. Verify emails arrive
3. Check admin panel access
4. Test order status updates

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <number> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Database Connection Error
- Check `.env` credentials
- Verify database exists
- For Railway: check public networking is enabled

### Emails Not Sending
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for errors
- Confirm `FROM_EMAIL` format is correct

### Admin Login Not Working
- Verify `is_admin = 1` in database
- Clear browser cache/cookies
- Check browser console for errors

---

## 📝 API Endpoints

### Authentication
- `POST /api/signup` - Create new user
- `POST /api/login` - Login user

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders/user/:userId` - Get user's orders

### Admin (Requires Admin Auth Header)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/orders/:id/status` - Update order status

---

## 🎨 Product Collections

1. **KNGDM Shirts** - Signature kingdom collection
2. **Limited Edition** - Exclusive priesthood pieces
3. **Men Regular Fit** - Everyday wear
4. **Pants KNGDM** - Kingdom bottoms
5. **Plain Collection** - Minimalist essentials
6. **Royal Chosen Collection** - Premium line
7. **Shadow of His Wings Collection** - Faith-inspired designs

---

## 📦 NPM Scripts

```bash
npm start       # Start production server
npm run dev     # Start with auto-reload (nodemon)
```

---

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayFast)
- [ ] Order tracking system
- [ ] Customer order history page
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Size guide modal
- [ ] Inventory management
- [ ] Sales analytics dashboard
- [ ] Discount codes/promotions
- [ ] Mobile app

---

## 📄 License

© 2026 Royal Priesthood - All Rights Reserved

---

## 👥 Contact

**Email**: info@royalpriesthood.co.za  
**Phone**: +27 (0) 11 234 5678  
**Address**: 123 Fashion Street, Johannesburg, Gauteng, South Africa

---

## 🙏 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review [Render documentation](https://render.com/docs)
3. Check [Resend documentation](https://resend.com/docs)
4. Contact via email above

---

**Built with ❤️ for Royal Priesthood**