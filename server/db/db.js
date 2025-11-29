const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: process.env.DB_PORT || 3306,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
    // uncomment the following lines when working on local host and comment the above lines
    // ssl: {
    //     rejectUnauthorized: false
    // }
})
pool.query('SELECT 1+1').then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});

module.exports = pool;