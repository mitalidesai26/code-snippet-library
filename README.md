# Code Snippet Library

A full-stack code snippet library built as a final project for Advanced Web Technology.

## Features

- 🔐 JWT Authentication with bcrypt password hashing
- 📋 50+ curated code snippets across 9 languages
- 🌙 Dark/Light mode toggle
- 💎 Glassmorphism UI with smooth animations
- 👤 User profiles with custom snippet management
- 📱 Fully responsive (mobile, tablet, desktop)
- 🗄️ MongoDB database with separate collections

## Tech Stack

**Frontend:** React 18, Tailwind CSS, Framer Motion, React Router, Axios
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Languages Covered

C, JavaScript, Java, HTML, CSS, Tailwind, SQL, MongoDB, Linux Shell

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to `http://localhost:5000`.

## Project Structure

```
code-snippet-library/
├── backend/
│   ├── models/          # Mongoose schemas (User, UserSnippet)
│   ├── routes/          # API routes (auth, snippets, userSnippets)
│   ├── middleware/       # JWT auth middleware
│   ├── data/            # Pre-loaded snippet data
│   └── server.js        # Express server entry
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth & Theme context providers
│   │   ├── pages/       # Route pages
│   │   └── utils/       # API client & language config
│   └── index.html
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get user profile |
| GET | /api/snippets | Get all snippets |
| GET | /api/snippets?language=X | Filter by language |
| GET | /api/snippets/dashboard | Get advanced snippets |
| GET | /api/user-snippets | Get user's snippets |
| POST | /api/user-snippets | Add user snippet |
| DELETE | /api/user-snippets/:id | Delete user snippet |
