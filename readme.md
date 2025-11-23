# 🟢 WhatsUp - Next Gen Real-time Chat

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge\&logo=socket.io\&badgeColor=010101)
![TiDB](https://img.shields.io/badge/TiDB-SQL-blue?style=for-the-badge\&logo=mysql\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)

<div align="center">

  <h3>🚀 Experience the Future of Messaging</h3>

  <p>
    A full-stack, real-time chat application featuring a stunning <strong>Neon Glassmorphism UI</strong>, global community channels, and private encrypted messaging.
  </p>

<a href="https://whatsup-vansh.netlify.app/"><strong>🔴 View Live Demo</strong></a>
· <a href="https://github.com/VANSH-THAPAR/WhatsUp/issues">Report Bug</a>
· <a href="https://github.com/VANSH-THAPAR/WhatsUp/pulls">Request Feature</a>

</div>

---

<!-- ## 📸 Interface

> **"Intuitive messaging designed for speed and privacy."**

*(Add your screenshots here)* -->

<!-- --- -->

## ✨ Key Features

* **🎨 Neon Glassmorphism UI:** A cutting-edge design aesthetic using backdrop filters, gradients, and smooth transitions tailored for a premium user experience.
* **⚡ Real-Time Communication:** Powered by **Socket.io**, messages are delivered instantly without page reloads.
* **🌍 Global Community:** A public channel to connect with everyone on the server.
* **🔒 Private 1-on-1 Chats:** Secure private rooms with persistent chat history stored in SQL.
* **🔔 Smart Notifications:** Real-time unread message badges in the sidebar.
* **🔍 User Search:** Instantly find users to start new conversations.
* **🛡️ Secure Authentication:** JWT stored in HTTP-Only Secure Cookies (Cross-Site compatible).
* **📱 Fully Responsive:** Works seamlessly on desktop and mobile devices.

---

## 🛠️ Tech Stack

| Component      | Technology                         | Description                              |
| :------------- | :--------------------------------- | :--------------------------------------- |
| **Frontend**   | React + Vite                       | Blazing fast UI development.             |
| **Styling**    | Tailwind CSS                       | For complex Glassmorphism effects.       |
| **Backend**    | Node.js + Express                  | Scalable REST API & Socket server.       |
| **Real-time**  | Socket.io                          | Bidirectional event-based communication. |
| **Database**   | **TiDB Cloud (MySQL)**             | Serverless, auto-scaling SQL database.   |
| **Deployment** | Netlify (Client) + Render (Server) | Distributed deployment architecture.     |

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

* Node.js installed.
* A free account on [TiDB Cloud](https://tidbcloud.com/) (or a local MySQL server).

### 1. Clone the Repository

```bash
git clone https://github.com/VANSH-THAPAR/WhatsUp.git
cd WhatsUp
```

### 2. Backend Setup

#### Navigate to the server directory:

```bash
cd server
npm install
```

#### Configure Database:

Connect to your TiDB/MySQL database and run the following SQL commands:

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

#### Create `.env` file in `/server`:

```
DB_HOST=gateway01.us-west-2.prod.aws.tidbcloud.com
DB_USER=your_tidb_user
DB_PASSWORD=your_tidb_password
DB_NAME=test
DB_PORT=4000
JWT_SECRET=your_super_secret_key
```

#### Start Server:

```bash
node server.js
```

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
```

#### Create `.env` file in `/client`:

```
VITE_BACKEND_URL=http://localhost:3000
```

Start React App:

```bash
npm run dev
```

---

## ☁️ Deployment Architecture

This app handles Cross-Site Cookies (SameSite: None, Secure: True) to allow communication between the Frontend and Backend domains.

* **Frontend:** Netlify
* **Backend:** Render (Web Service)
* **Database:** TiDB Serverless

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

**Github Profile Link** – [https://github.com/VANSH-THAPAR](https://github.com/VANSH-THAPAR)

**Project Link:** [https://whatsup-vansh.netlify.app/](https://whatsup-vansh.netlify.app/)
