const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query('INSERT INTO users (userName, email, password) VALUES (?, ?, ?)', [userName, email, hashedPassword]);

        const token = jwt.sign(
            { userId: email, email: email, userName: userName },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // CRITICAL: Cookie Settings
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;