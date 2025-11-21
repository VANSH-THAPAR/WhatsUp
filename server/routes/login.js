const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const pool = require('../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const tableName = 'users';

router.post('/login',(req,res)=>{
    const {email , password} = req.body;
    const sql = `SELECT * FROM ${tableName} WHERE email = ? AND password = ?`;
    const values = [email, password];
    pool.query(sql, values)
    .then(([rows]) => {
        if (rows.length > 0) {
            const user = rows[0];
            const token = jwt.sign({
                 userName : user.userName, 
                 email: user.email 
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ message: 'Login successful', user: rows[0] });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    })
    .catch((error) => {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    });
})

module.exports = router;