const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Fix case sensitivity imports based on your file names
const CommunityChatRoom = require('./sockets/communityChatRoom'); 
const PrivateChatRoom = require('./sockets/privateChatRoom'); 
const pool = require('./db/db'); 
const checkJwt = require('./middleware/checkJwt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 1. Trust Proxy (REQUIRED for Render to set Secure cookies)
app.set('trust proxy', 1);

app.use(cookieParser());

// 2. CORS Configuration
app.use(cors({
    origin: ["http://localhost:5173", "https://whatsup-vansh.netlify.app"], 
    credentials: true, // Essential for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://whatsup-vansh.netlify.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Initialize Socket Logic
CommunityChatRoom(io);
PrivateChatRoom(io);

// Auth Routes
app.use('/', require('./routes/login'));
app.use('/', require('./routes/signup'));

// --- API Routes ---

app.get('/', (req, res) => res.send('API Running'));

// Get Current User
app.get('/me', checkJwt, (req, res) => {
    try {
        res.status(200).json({
            userName: req.user.userName,
            email: req.user.email, 
        })
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Contacts (with Unread Counts)
app.get('/contacts', checkJwt, async (req, res) => {
    try {
        const myEmail = req.user.email;
        const query = `
            SELECT 
                u.userName, 
                u.email,
                (
                    SELECT COUNT(*) 
                    FROM PrivateMessages pm 
                    JOIN PrivateConversations pc2 ON pm.conversation_id = pc2.id
                    WHERE pm.sender_email = u.email 
                    AND (pc2.user1_email = ? OR pc2.user2_email = ?)
                    AND pm.is_read = FALSE
                ) as unreadCount
            FROM users u
            JOIN PrivateConversations pc 
                ON (u.email = pc.user1_email OR u.email = pc.user2_email)
            WHERE (pc.user1_email = ? OR pc.user2_email = ?)
            AND u.email != ? 
            GROUP BY u.email
        `;
        const [contacts] = await pool.query(query, [myEmail, myEmail, myEmail, myEmail, myEmail]);
        res.status(200).json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ message: 'DB Error' });
    }
});

// Search Users
app.get('/search-users', checkJwt, async (req, res) => {
    try {
        const searchTerm = req.query.q;
        if (!searchTerm) return res.json([]);

        const query = `
            SELECT userName, email FROM users 
            WHERE (userName LIKE ? OR email LIKE ?) 
            AND email != ?
            LIMIT 20
        `;
        const wildCard = `%${searchTerm}%`;
        const [users] = await pool.query(query, [wildCard, wildCard, req.user.email]);
        res.status(200).json(users);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: 'DB Error' });
    }
});

// Get All Users
app.get('/allusers', checkJwt, async (req, res) => {
    try {
        const query = 'SELECT userName, email FROM users WHERE email != ?';
        const [users] = await pool.query(query, [req.user.email]);
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Database error fetching users' });
    }
});

// Logout (Clear Cookie)
app.post('/logout', (req, res) => {
    res.clearCookie('token', { 
        httpOnly: true, 
        secure: true, 
        sameSite: 'none' 
    });
    res.status(200).json({ message: 'Logged out successfully' });
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});