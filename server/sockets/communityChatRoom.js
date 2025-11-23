const room = 'main-room';
const pool = require('../db/db'); 

// 1. Fetch History
const dbGetHistory = async () => {
    try {
        const query = 
            `SELECT cm.id, cm.sender_email, cm.sender_name AS sender, cm.content AS text, cm.timestamp AS ts
             FROM CommunityMessages cm
             ORDER BY cm.timestamp ASC LIMIT 100`;
        const [rows] = await pool.query(query);
        return rows.map(row => ({
            id: row.id,
            sender: row.sender,
            text: row.text,
            ts: new Date(row.ts).getTime(), 
            time: new Date(row.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
    } catch (error) {
        console.error("DB Error:", error);
        return [];
    }
};

// 2. Save Message
const dbSaveMessage = async ({ senderEmail, senderName, text }) => {
    try {
        const query = 'INSERT INTO CommunityMessages (sender_email, sender_name, content) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [senderEmail, senderName, text]);
        
        return {
            id: result.insertId || Date.now(),
            sender: senderName, 
            text: text,
            ts: Date.now(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    } catch (error) {
        console.error("DB Save Error:", error);
        return null;
    }
};

const CommunityChatRoom = (io) => {
    io.on('connection', (socket) => {
        socket.on('joinRoom', async (data) => {
            const { userName, userEmail } = data;
            if (!userName || !userEmail) return;

            await socket.join(room);
            
            // Send history to the user who joined
            const history = await dbGetHistory(); 
            socket.emit('chatHistory', history); 
        });

        socket.on('chatMessage', async (data) => {
            const { sender, text, senderEmail } = data;
            if (!sender || !text || !senderEmail) return; 

            // Save to SQL
            const validatedMsg = await dbSaveMessage({ 
                senderEmail, senderName: sender, text: text.trim() 
            });

            // Broadcast to everyone in the room
            if (validatedMsg) {
                io.to(room).emit('chatMessage', validatedMsg);
            }
        });
    });
}

module.exports = CommunityChatRoom;