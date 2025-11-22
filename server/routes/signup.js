const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const pool = require('../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const tableName = 'users';

router.post('/signup',(req,res)=>{
    const {userName , email , password} = req.body;
    const sql = `INSERT into ${tableName} (userName, email, password) VALUES (?, ?, ?)`;
    const values = [userName, email, password];
    pool.query(sql, values)
    .then(([resultMetadata]) => {
        if (resultMetadata && resultMetadata.affectedRows === 1) {
            const user = { 
                userName: userName, 
                email: email 
            };
            const token = jwt.sign({
                 userName : user.userName, 
                 email: user.email 
            }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ message: 'signup successful', user: user });
        } else {
            res.status(400).json({ message: 'Unable to sign up' });
        }
    })
    .catch((error) => {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    });
})

module.exports = router;