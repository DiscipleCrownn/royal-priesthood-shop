const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.send('Royal Priesthood API is running');
});

// Database
const dbPath = path.join(__dirname, 'database', 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error opening database:', err);
    else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});


// Initialize database tables
function initDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table ready');
        }
    });
}

// API Routes

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;
    
    // Validate input
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user into database
        db.run(
            'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone, hashedPassword],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ message: 'Email already exists' });
                    }
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Error creating user' });
                }
                
                res.status(201).json({
                    message: 'User created successfully',
                    userId: this.lastID
                });
            }
        );
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find user in database
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        try {
            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            
            // Return user data (excluding password)
            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
});

// Get all users (admin endpoint - remove in production)
app.get('/api/users', (req, res) => {
    db.all('SELECT id, name, email, phone, created_at FROM users', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(rows);
    });
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
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        }
        console.log('\nDatabase connection closed');
        process.exit(0);
    });
});
