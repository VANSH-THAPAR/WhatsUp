# 🟢 WhatsUp - Next Gen Real-time Chat with AI Chatbot

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![TiDB](https://img.shields.io/badge/TiDB-SQL-blue?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-000?style=for-the-badge&logo=chainlink&logoColor=white)

<div align="center">

  <h3>🚀 Experience the Future of Messaging</h3>

  <p>
    A full-stack, real-time chat application featuring a stunning <strong>Neon Glassmorphism UI</strong>, global community channels, private encrypted messaging, and an integrated <strong>AI Chatbot built using LangChain</strong>.
  </p>

<a href="https://whatsup-vansh.netlify.app/"><strong>🔴 View Live Demo</strong></a>
· <a href="https://github.com/VANSH-THAPAR/WhatsUp/issues">Report Bug</a>
· <a href="https://github.com/VANSH-THAPAR/WhatsUp/pulls">Request Feature</a>

</div>

---

## ✨ Key Features

* **🎨 Neon Glassmorphism UI:** Modern design with gradients, blur effects, and smooth transitions.
* **⚡ Real-Time Messaging:** Instant communication via **Socket.io**.
* **🌍 Global Community Channel:** A shared space for server-wide conversations.
* **🔒 Private 1-on-1 Chats:** Secure, persistent SQL storage for encrypted private messaging.
* **🤖 AI Chatbot (LangChain):** A customizable AI assistant integrated directly into chats — powered by LangChain and prompt templates.
* **🔔 Smart Notifications:** Live unread message indicators.
* **🔍 User Search:** Find users instantly to start conversations.
* **🛡️ Secure Authentication:** JWT stored in HTTP-only cookies.
* **📱 Fully Responsive:** Optimized for both mobile and desktop.

---

## 🛠️ Tech Stack

| Component      | Technology                         | Description                              |
| :------------- | :--------------------------------- | :--------------------------------------- |
| **Frontend**   | React + Vite                       | Fast and modern UI framework.            |
| **Styling**    | Tailwind CSS                       | Used for advanced Glassmorphism UI.      |
| **Backend**    | Node.js + Express                  | REST API + Socket server.                |
| **Real-time**  | Socket.io                          | Bidirectional events for messaging.      |
| **Database**   | TiDB Cloud (MySQL)                 | Scalable, serverless SQL storage.        |
| **AI Engine**  | LangChain                          | Customizable AI chatbot pipeline.        |
| **Deployment** | Netlify (Client) + Render (Server) | Distributed cloud hosting.               |

---

## 🚀 Getting Started

### Prerequisites
* Node.js installed.
* A TiDB Cloud account or local MySQL setup.

### 1. Clone the Repository
```bash
git clone https://github.com/VANSH-THAPAR/WhatsUp.git
cd WhatsUp
```

### 2. Backend Setup
```bash
cd server
npm install
```

### Configure Database
Run the SQL schema:
```sql
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE CommunityMessages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_email VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_email) REFERENCES users(email) ON DELETE CASCADE
);

CREATE TABLE PrivateConversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user1_email VARCHAR(255) NOT NULL,
    user2_email VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_email) REFERENCES users(email) ON DELETE CASCADE,
    FOREIGN KEY (user2_email) REFERENCES users(email) ON DELETE CASCADE,
    UNIQUE KEY unique_conversation (user1_email, user2_email)
);

CREATE TABLE PrivateMessages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (conversation_id) REFERENCES PrivateConversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_email) REFERENCES users(email) ON DELETE CASCADE
);
```

### Create `.env`
```
DB_HOST=gateway01.us-west-2.prod.aws.tidbcloud.com
DB_USER=your_tidb_user
DB_PASSWORD=your_tidb_password
DB_NAME=test
DB_PORT=4000
JWT_SECRET=your_super_secret_key
```

### Start Backend
```bash
node server.js
```

---

### 3. Frontend Setup
```bash
cd client
npm install
```

### Create `.env`
```
VITE_BACKEND_URL=http://localhost:3000
```

Start React App:
```bash
npm run dev
```

---

## ☁️ Deployment Architecture
* **Frontend:** Netlify
* **Backend:** Render
* **Database:** TiDB Serverless
* **AI Chatbot:** LangChain pipeline integrated in backend

---

## 🤝 Contributing
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Contact
**GitHub:** https://github.com/VANSH-THAPAR

**Live Demo:** https://whatsup-vansh.netlify.app/
