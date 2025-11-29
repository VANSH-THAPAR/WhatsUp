const pool = require('../db/db'); 

const getConversationId = async (user1, user2) => {
    const [u1, u2] = [user1, user2].sort();
    try {
        const findQuery = 'SELECT id FROM PrivateConversations WHERE user1_email = ? AND user2_email = ?';
        const [rows] = await pool.query(findQuery, [u1, u2]);
        if (rows.length > 0) return rows[0].id;
        const insertQuery = 'INSERT INTO PrivateConversations (user1_email, user2_email) VALUES (?, ?)';
        const [result] = await pool.query(insertQuery, [u1, u2]);
        return result.insertId;
    } catch (err) { return null; }
};

const PrivateChatRoom = (io) => {
    io.on('connection', (socket) => {

        socket.on('registerUser', (email) => {
            socket.join(email);
        });
        
        socket.on('joinPrivateChat', async (data) => {
            const { myEmail, targetEmail } = data;
            if (!myEmail || !targetEmail) return;

            const conversationId = await getConversationId(myEmail, targetEmail);
            if (!conversationId) return;

            const roomName = `private_${conversationId}`;
            await socket.join(roomName);

            // MARK MESSAGES AS READ
            try {
                const updateQuery = `UPDATE PrivateMessages SET is_read = TRUE WHERE conversation_id = ? AND sender_email != ?`;
                await pool.query(updateQuery, [conversationId, myEmail]);
            } catch(e) { console.error(e); }

            // Fetch History
            try {
                const historyQuery = `SELECT id, sender_email, content, timestamp FROM PrivateMessages WHERE conversation_id = ? ORDER BY timestamp ASC LIMIT 50`;
                const [messages] = await pool.query(historyQuery, [conversationId]);
                const formattedHistory = messages.map(msg => ({
                    id: msg.id,
                    senderEmail: msg.sender_email,
                    text: msg.content,
                    time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));
                socket.emit('privateHistory', { history: formattedHistory, conversationId });
            } catch (err) { console.error(err); }
        });

        // 3. SEND MESSAGE (Trigger Notification)
        socket.on('privateMessage', async (data) => {
            const { conversationId, senderEmail, targetEmail, text } = data; // Note: We need targetEmail now
            if (!conversationId || !text.trim()) return;

            try {
                // Save to DB (Unread by default)
                const saveQuery = 'INSERT INTO PrivateMessages (conversation_id, sender_email, content, is_read) VALUES (?, ?, ?, FALSE)';
                const [res] = await pool.query(saveQuery, [conversationId, senderEmail, text]);

                const msgPayload = {
                    id: res.insertId,
                    senderEmail,
                    text,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                // Emit to the Chat Room (for open window)
                io.to(`private_${conversationId}`).emit('privateMessageReceive', msgPayload);

                // EMIT NOTIFICATION to the Recipient (for Sidebar badge)
                // This updates the UI even if they aren't looking at this specific chat
                io.to(targetEmail).emit('newNotification', {
                    senderEmail,
                    text: "New message received"
                });

            } catch (err) { console.error(err); }
        });
    });
};

module.exports = PrivateChatRoom;