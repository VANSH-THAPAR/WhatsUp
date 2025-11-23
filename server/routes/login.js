const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Note: Table name is 'users' (lowercase) based on your setup
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        
        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.email, email: user.email, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // CRITICAL: Cookie Settings for Cross-Site (Netlify -> Render)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Required for 'SameSite: None'
            sameSite: 'none', // Required for Cross-Site requests
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({ message: 'Login successful', user: { userName: user.userName, email: user.email } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;