# Royal Priesthood - Setup Guide

## Quick Start Guide

Follow these steps to get your Royal Priesthood e-commerce site up and running.

### Step 1: Extract Files
Extract the zip file to your desired location.

### Step 2: Install Node.js
If you don't have Node.js installed:
1. Visit https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Install following the installer instructions
4. Verify installation by opening terminal/command prompt and typing:
   ```bash
   node --version
   npm --version
   ```

### Step 3: Install Backend Dependencies

1. Open terminal/command prompt
2. Navigate to the backend folder:
   ```bash
   cd path/to/royal-priesthood-shop/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   
   This will install:
   - express (web server)
   - sqlite3 (database)
   - bcryptjs (password hashing)
   - cors (cross-origin requests)

### Step 4: Add Your Images

1. Navigate to `frontend/images/`
2. Add your logo to `frontend/images/logo/logo.png`
3. Add product images to the respective folders:
   - kngdm-shirts/
   - limited-edition/
   - men-regular/
   - pants-kngdm/
   - plain-collection/
   - royal-chosen/
   - shadow-wings/

**Image naming convention:**
- black.png
- white.png
- grey.png
- tan.png
- priesthood collection.png (for limited edition)

### Step 5: Start the Backend Server

From the backend folder:
```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Connected to SQLite database
Users table ready
```

### Step 6: Access the Website

Open your web browser and go to:
```
http://localhost:3000
```

The website should now be fully functional!

## Testing the Features

### Test User Signup
1. Click "Sign Up" button
2. Fill in the form:
   - Full Name: Test User
   - Email: test@example.com
   - Phone: +27 123 456 7890
   - Password: testpass123
3. Click "Sign Up"
4. You should see "Signup successful! Please login."

### Test User Login
1. Click "Login" button
2. Enter:
   - Email: test@example.com
   - Password: testpass123
3. Click "Login"
4. You should see "Welcome back, Test!"

### Test Shopping Cart
1. Browse products in collections
2. Click "Add to Cart" on any product
3. Click the cart icon (🛒) in the navigation
4. Your cart sidebar should open with the selected item
5. The cart persists even if you refresh the page

### View Database
The database file is created at `backend/database/users.db`

You can view it using:
- DB Browser for SQLite (https://sqlitebrowser.org/)
- VS Code extension: SQLite Viewer
- Command line: `sqlite3 backend/database/users.db`

## Common Issues

### Port Already in Use
If you see "Port 3000 is already in use":
1. Change the port in `backend/server.js`
2. Or stop the other application using port 3000

### Cannot Find Module
If you see "Cannot find module 'express'":
1. Make sure you're in the backend folder
2. Run `npm install` again

### Images Not Loading
1. Check that images are in the correct folders
2. Check image file names match exactly (case-sensitive)
3. Supported formats: .png, .jpg, .jpeg

### Database Connection Error
1. Check that the `backend/database/` folder exists
2. Ensure you have write permissions
3. The database file will be created automatically on first run

## Development Mode

For development with auto-restart on file changes:
```bash
npm run dev
```

This requires nodemon, which is included in devDependencies.

## Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

## Next Steps

### Customize Content
1. Edit `frontend/index.html` to change text content
2. Edit `frontend/css/styles.css` to modify styling
3. Update contact details in the Contact section

### Add More Products
1. Edit `frontend/js/products.js`
2. Add product objects to the appropriate category array
3. Add corresponding images

### Deploy to Production
See README.md for production deployment instructions.

## Need Help?

Contact: info@royalpriesthood.co.za
Phone: +27 (0) 11 234 5678
