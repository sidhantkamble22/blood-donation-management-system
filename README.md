# 🩸 Blood Donation Management System

A full-stack Blood Donation Management System built to connect blood donors with patients efficiently.  
The system ensures **one donor is matched to only one request at a time**, prioritizes **emergency cases**, and provides a clean, responsive user interface.

---

## 🚀 Features

### 👤 Donor Management
- Register as a blood donor
- Edit and delete donor details
- Search donors by name, blood group, or phone number

### 🩸 Blood Request System
- Submit blood requests with urgency level
- Emergency requests are visually highlighted
- Requests remain **Pending** if no donor is available

### 🔁 Smart Donor Matching Logic
- One donor can be matched to **only one request**
- Already matched donors are not reused
- If all donors of a blood group are busy, request stays pending

### 📊 Dashboard Overview
- Total donors count
- Recent blood requests count
- Fully responsive cards and tables

### 🎨 UI / UX
- Fully responsive (mobile, tablet, desktop)
- Clean modern UI using Tailwind CSS
- Emergency tags with highlighted badges
- Scrollable tables for large data

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## 📂 Project Structure
Blood-donation-management-system/
│
├── client/ # React frontend
│ ├── components/
│ ├── pages/
│ └── assets/
│
├── server/ # Node + Express backend
│ └── server.js
│
└── README.md


---

## ⚙️ How to Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/sidhantkamble22/blood-donation-management-system.git

2️⃣ Backend Setup
cd server
npm install
node server.js


Server runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173

npm install
node server.js
