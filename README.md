PasteBin Lite

A lightweight Pastebin-like web application where users can create and share text snippets with optional expiration time and view limits.


🚀 How to run the app locally
Prerequisites

Node.js (v18 or later recommended)

npm

MongoDB Atlas account (or local MongoDB)
1️⃣ Clone the repository
git clone https://github.com/gayatripuri/pastebin_lite.git
cd pastebin_lite

2️⃣ Backend setup
cd backend
npm install

Create a .env file inside backend/:

MONGODB_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:3000
Start backend:

npm start


Backend will run on:

http://localhost:5000
3️⃣ Frontend setup
cd ../frontend
npm install
npm start


Frontend will run on:

http://localhost:3000

////////////////////////////////////
🗄 Persistence Layer

MongoDB Atlas is used as the persistence layer

Mongoose is used as the ODM (Object Data Modeling)

Data stored:

Paste content

Short unique ID (shortId)

Expiration time (expiresAt)

Maximum allowed views (maxViews)

Current view count (viewCount)


🧠 Important Design Decisions

Monorepo structure
Both frontend and backend are kept in a single repository for simplicity and easier deployment.

Short ID based access
Each paste is identified using a short unique ID instead of MongoDB _id, making URLs clean and shareable.

TTL & View-limit logic handled at API level
Pastes automatically become inaccessible after:

expiration time is reached, or

maximum view count is exceeded

View count increment on access
Fetching a paste increments its view count to enforce max-view constraints accurately.

Separation of concerns

Backend: Express + MongoDB (API & business logic)

Frontend: React (UI only)


🌐 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas




