<h1 align="center">Pastebin Lite – Secure & Scalable Text Sharing Service</h1>


## Project Overview
Pastebin Lite is a full-stack web application built for secure, temporary text sharing. Inspired by pastebin-style platforms, the project was developed as a take-home assignment to showcase practical experience in backend design, frontend integration, and reliable data persistence with testing-friendly architecture.

## 🚀 Key Features


Paste Creation & Sharing
Users can create text snippets and receive a short, shareable URL.

Multiple Access Modes

JSON API endpoint for programmatic access

Clean HTML view for browser-based reading

Configurable Expiration Controls

Time-based expiry (TTL): Pastes expire automatically after a defined duration

View-based expiry: Pastes become unavailable once a maximum view limit is reached

Automatic Invalidation
Pastes are immediately disabled as soon as any configured constraint (time or views) is met.

Deterministic Expiry Testing
Supports controlled, deterministic time testing via custom request headers, enabling predictable and repeatable automated test scenarios.

Persistent Cloud Storage
All data is stored reliably using MongoDB Atlas.

## 🛠️ Tech Stack
Frontend

React.js – Component-based UI development

React Router – Client-side routing

Fetch API – Backend communication

Backend

Node.js – Server-side JavaScript runtime

Express.js – Lightweight web framework

MongoDB Atlas – Cloud-hosted NoSQL database

Mongoose – MongoDB object modeling layer

## 📦 Persistence Layer

MongoDB Atlas (Cloud-hosted MongoDB)

Why MongoDB Atlas?

Scales effortlessly with application growth

Reliable persistence across deployments and restarts

Serverless-friendly, ideal for cloud hosting platforms

Stable testing environment, ensuring consistent automated test results


## ⚙️ Environment Variables
Backend (backend/.env)
PORT=5000
MONGODB_URI=your_mongodb_connection_string
TEST_MODE=0


TEST_MODE=1 enables deterministic time testing using the x-test-now-ms request header.

Frontend (frontend/.env)
REACT_API_URL=https://your-backend-domain.vercel.app

▶️ Running the App Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/pastebin-lite.git
cd pastebin-lite

2️⃣ Start the backend
cd backend
npm install
npm start


Backend runs at:

http://localhost:5000

3️⃣ Start the frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:3000

🔌 API Endpoints
Health Check
GET /api/healthz


Response:

{ "ok": true }

Create Paste
POST /api/pastes


Request body:

{
  "content": "Hello World",
  "ttl_seconds": 60,
  "max_views": 5
}


Response:

{
  "id": "string",
  "url": "https://your-app.vercel.app/p/:id"
}

Fetch Paste (JSON)
GET /api/pastes/:id

View Paste (HTML)
GET /p/:id

## 🧠 Architectural & Design Considerations

Short ID–based access
Pastes are referenced using compact identifiers for clean and shareable URLs.

Strict view tracking
Every API fetch or HTML render increments the view count consistently.

Immediate enforcement of constraints
Expiry rules are evaluated on each request to guarantee correctness.

Secure content rendering
All HTML output is escaped to prevent XSS vulnerabilities.

Clear API/UI separation
Backend logic and frontend presentation are fully decoupled, improving maintainability and testability.


## ✅ Assignment Coverage

✔ Persistent storage
✔ Deterministic time-based testing
✔ Correct HTTP status handling
✔ No in-memory global state
✔ Secure output rendering
✔ Cloud & serverless deployment compatibility


## 🧪 Automated Test Readiness

The application is structured to reliably pass automated evaluation checks, including:

TTL expiration validation

Maximum view enforcement

Combined constraint handling

Concurrent access safety

Consistent error responses

📄 License

This project is licensed under the MIT License.
