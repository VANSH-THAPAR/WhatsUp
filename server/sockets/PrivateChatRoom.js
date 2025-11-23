const pool = require('../db/db'); 

// Helper to get or create a conversation ID
const getConversationId = async (user1, user2) => {
    // Sort emails alphabetically so "alice+bob" is same as "bob+alice"
    const [u1, u2] = [user1, user2].sort();

    try {
        // 1. Check if conversation already exists
        const findQuery = 'SELECT id FROM PrivateConversations WHERE user1_email = ? AND user2_email = ?';
        const [rows] = await pool.query(findQuery, [u1, u2]);
        
        if (rows.length > 0) return rows[0].id;

        // 2. If not, create a new one
        const insertQuery = 'INSERT INTO PrivateConversations (user1_email, user2_email) VALUES (?, ?)';
        const [result] = await pool.query(insertQuery, [u1, u2]);
        return result.insertId;
    } catch (err) {
        console.error("DB Error getting Conversation ID:", err);
        return null;
    }
};

const PrivateChatRoom = (io) => {
    io.on('connection', (socket) => {
        
        socket.on('joinPrivateChat', async (data) => {
            const { myEmail, targetEmail } = data;
            if (!myEmail || !targetEmail) return;

            // Get the unique ID from DB
            const conversationId = await getConversationId(myEmail, targetEmail);
            
            if (!conversationId) {
                console.error("Failed to get conversation ID for", myEmail, targetEmail);
                return;
            }

            // Join the specific socket room
            const roomName = `private_${conversationId}`;
            await socket.join(roomName);
            console.log(`User ${myEmail} joined room ${roomName}`);

            // Fetch History
            try {
                const historyQuery = `
                    SELECT id, sender_email, content, timestamp 
                    FROM PrivateMessages 
                    WHERE conversation_id = ? 
                    ORDER BY timestamp ASC LIMIT 50
                `;
                const [messages] = await pool.query(historyQuery, [conversationId]);
                
                const formattedHistory = messages.map(msg => ({
                    id: msg.id,
                    senderEmail: msg.sender_email,
                    text: msg.content,
                    time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));

                // Send history AND the conversationId back to the client
                socket.emit('privateHistory', { history: formattedHistory, conversationId });
            } catch (err) {
                console.error("Error fetching private history:", err);
            }
        });

        socket.on('privateMessage', async (data) => {
            const { conversationId, senderEmail, text } = data;
            if (!conversationId || !text.trim()) return;

            try {
                // Save to DB
                const saveQuery = 'INSERT INTO PrivateMessages (conversation_id, sender_email, content) VALUES (?, ?, ?)';
                const [res] = await pool.query(saveQuery, [conversationId, senderEmail, text]);

                // Broadcast to room
                const msgPayload = {
                    id: res.insertId,
                    senderEmail,
                    text,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                io.to(`private_${conversationId}`).emit('privateMessageReceive', msgPayload);

            } catch (err) {
                console.error("Error saving private message:", err);
            }
        });
    });
};

module.exports = PrivateChatRoom;