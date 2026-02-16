require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER,     // your email
        pass: process.env.EMAIL_PASSWORD  // your email password or app password
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('Royal Priesthood API is running');
});

// Database connection pool
const pool = mysql.createPool({
    host:     process.env.DB_HOST     || 'localhost',
    port:     process.env.DB_PORT     || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'royal_priesthood',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database tables
async function initDatabase() {
    try {
        const conn = await pool.getConnection();

        // Users table with is_admin flag
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id         INT AUTO_INCREMENT PRIMARY KEY,
                name       VARCHAR(255) NOT NULL,
                email      VARCHAR(255) UNIQUE NOT NULL,
                phone      VARCHAR(50)  NOT NULL,
                password   VARCHAR(255) NOT NULL,
                is_admin   TINYINT(1) DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Orders table
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS orders (
                id               INT AUTO_INCREMENT PRIMARY KEY,
                user_id          INT NOT NULL,
                user_name        VARCHAR(255) NOT NULL,
                user_email       VARCHAR(255) NOT NULL,
                delivery_address TEXT NOT NULL,
                email_confirm    VARCHAR(255) NOT NULL,
                order_notes      TEXT,
                cart_items       JSON NOT NULL,
                total            DECIMAL(10,2) NOT NULL,
                status           VARCHAR(50) DEFAULT 'pending',
                created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        conn.release();
        console.log('Connected to MySQL database');
        console.log('Tables ready');
    } catch (err) {
        console.error('Database initialization error:', err);
        process.exit(1);
    }
}

initDatabase();

// ─── AUTH ROUTES ────────────────────────────────────────────────────────────

// Signup
app.post('/api/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password)
        return res.status(400).json({ message: 'All fields are required' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        return res.status(400).json({ message: 'Invalid email format' });

    if (password.length < 6)
        return res.status(400).json({ message: 'Password must be at least 6 characters' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone, hashedPassword]
        );
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY')
            return res.status(400).json({ message: 'Email already exists' });
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'Email and password are required' });

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user)
            return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid email or password' });

        res.json({
            message: 'Login successful',
            user: {
                id:       user.id,
                name:     user.name,
                email:    user.email,
                phone:    user.phone,
                is_admin: user.is_admin
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ─── ORDER ROUTES ────────────────────────────────────────────────────────────

// Place order (checkout simulation)
app.post('/api/orders', async (req, res) => {
    const { user_id, user_name, user_email, delivery_address, email_confirm, order_notes, cart_items, total } = req.body;

    if (!user_id || !delivery_address || !email_confirm || !cart_items || !total)
        return res.status(400).json({ message: 'Missing required order fields' });

    try {
        const [result] = await pool.execute(
            `INSERT INTO orders (user_id, user_name, user_email, delivery_address, email_confirm, order_notes, cart_items, total)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id, user_name, user_email, delivery_address, email_confirm, order_notes || '', JSON.stringify(cart_items), total]
        );

        const orderId = result.insertId;

        // Send email notification
        try {
            const itemsList = cart_items.map(item => 
                `- ${item.name} (${item.color} / ${item.size}) — R${item.price.toFixed(2)}`
            ).join('\n');

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
                subject: `🎉 New Order #${orderId} - Royal Priesthood`,
                text: `
New Order Received!

Order #: ${orderId}
Customer: ${user_name}
Email: ${user_email}
Delivery Address: ${delivery_address}

Items:
${itemsList}

Total: R${parseFloat(total).toFixed(2)}

Order Notes: ${order_notes || 'None'}

Login to admin panel to manage this order.
                `.trim()
            });

            console.log(`Email sent for order #${orderId}`);
        } catch (emailErr) {
            console.error('Email send error:', emailErr);
            // Don't fail the order if email fails
        }

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        console.error('Order error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get orders for a specific user
app.get('/api/orders/user/:userId', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
            [req.params.userId]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ─── ADMIN ROUTES ────────────────────────────────────────────────────────────

// Middleware to check admin
async function requireAdmin(req, res, next) {
    const userId = req.headers['x-admin-id'];
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const [rows] = await pool.execute('SELECT is_admin FROM users WHERE id = ?', [userId]);
        if (!rows[0] || !rows[0].is_admin)
            return res.status(403).json({ message: 'Forbidden' });
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Get all users (admin only)
app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT id, name, email, phone, is_admin, created_at FROM users ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all orders (admin only)
app.get('/api/admin/orders', requireAdmin, async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM orders ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update order status (admin only)
app.patch('/api/admin/orders/:id/status', requireAdmin, async (req, res) => {
    const { status } = req.body;
    try {
        await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Order status updated' });
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ─── FRONTEND ROUTES ─────────────────────────────────────────────────────────

// Admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Handle shutdown
process.on('SIGINT', async () => {
    await pool.end();
    console.log('\nDatabase connection pool closed');
    process.exit(0);
});