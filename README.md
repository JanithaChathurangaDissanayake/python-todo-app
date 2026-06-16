# ✅ TodoFlow — Full Stack MERN Todo App

![TodoFlow Banner](https://via.placeholder.com/900x300/7c7fef/ffffff?text=TodoFlow+%E2%80%94+MERN+Stack)

> **A production-ready full stack todo app** built with MongoDB, Express, React, and Node.js — featuring JWT authentication, full CRUD, filtering, priorities, and due dates.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-black?style=for-the-badge)](https://your-app.vercel.app)
[![API](https://img.shields.io/badge/🔌_API-Render-46e3b7?style=for-the-badge)](https://your-api.onrender.com)

---

## 📸 Screenshots

> *(Add your own screenshots here — use ScreenToGif for a GIF demo!)*

| Login | Dashboard | Add Todo |
|-------|-----------|----------|
| ![Login](screenshot-login.png) | ![Dashboard](screenshot-dashboard.png) | ![Add](screenshot-add.png) |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register & login
- ✅ **Full CRUD** — Create, Read, Update, Delete todos
- 🔍 **Search & Filter** — By status, priority, or keyword
- 🔴🟡🟢 **Priority Levels** — High, Medium, Low
- 📅 **Due Dates** — With overdue detection
- 📊 **Live Stats** — Total, active, and completed count
- 🌙 **Dark Theme** — Easy on the eyes
- 📱 **Responsive** — Works on mobile and desktop
- ⚡ **Fast** — Built with Vite + React 18

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| Deployment | Vercel (frontend) + Render (backend) |
| Tooling | Vite, nodemon |

---

## 📁 Project Structure

```
mern-todo/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT protect middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Todo.js            # Todo schema
│   ├── routes/
│   │   ├── auth.js            # POST /register, /login, GET /me
│   │   └── todos.js           # GET/POST/PUT/DELETE /todos
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── TodoFilters.jsx
    │   │   ├── TodoForm.jsx
    │   │   └── TodoItem.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx  # Global auth state
    │   ├── hooks/
    │   │   └── useTodos.js      # All todo logic
    │   ├── pages/
    │   │   ├── AuthPage.jsx
    │   │   └── HomePage.jsx
    │   ├── utils/
    │   │   └── api.js           # Axios instance + API calls
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── vercel.json
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)
- Git

---

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/mern-todo.git
cd mern-todo
```

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/mern-todo
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev   # starts on http://localhost:5000
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
# VITE_API_URL is already set to /api (proxied to backend via Vite)
npm run dev   # starts on http://localhost:5173
```

> Both servers must be running simultaneously for full functionality.

---

## 🔌 API Reference

### Auth Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & get JWT | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Todo Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/todos` | Get all user todos | ✅ |
| POST | `/api/todos` | Create a todo | ✅ |
| PUT | `/api/todos/:id` | Update a todo | ✅ |
| DELETE | `/api/todos/:id` | Delete a todo | ✅ |
| DELETE | `/api/todos/completed/clear` | Clear all completed | ✅ |

#### Query Params for GET /api/todos

| Param | Values | Description |
|-------|--------|-------------|
| `status` | `all`, `active`, `completed` | Filter by status |
| `priority` | `low`, `medium`, `high` | Filter by priority |
| `search` | any string | Search in title |
| `sort` | `newest`, `oldest`, `priority`, `dueDate` | Sort order |

---

## ☁️ Deployment

### Backend → Render (Free)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `npm start`
7. Add Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` → your Vercel frontend URL
   - `NODE_ENV` → `production`

### Frontend → Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add Environment Variable:
   - `VITE_API_URL` → `https://your-api.onrender.com/api`
5. Deploy!

---

## 🎯 What I Learned

- Setting up a MERN stack from scratch
- JWT authentication flow (register → token → protected routes)
- Mongoose schemas, models, and queries
- React Context API for global state
- Custom hooks to separate business logic
- Deploying fullstack apps for free (Vercel + Render)
- Environment variables for different environments

---

## 📄 License

MIT — feel free to use for your own portfolio!

---

> Built with ❤️ as a portfolio project. Star ⭐ this repo if it helped you!
