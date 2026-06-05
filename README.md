# 📧 AI Email Generator
An intelligent web application that uses **Google Gemini AI** to generate professional, personalized emails in seconds. Perfect for busy professionals, recruiters, and anyone who needs to compose emails quickly.

## 📌 Features
- 🤖 **AI-Powered Email Generation** using Google Gemini LLM
- 👥 **Role-Based Context** (Sender & Receiver roles for personalized emails)
- 🎨 **Tone Customization** (Formal, Professional, Friendly, Apology)
- 📚 **Email History & Tracking** (Save, copy, and reuse past emails)
- 🔐 **Secure Authentication** (JWT + Bcrypt password hashing)
- 🎯 **User Dashboard** (View generated emails and history)
- 🌈 **Modern Beautiful UI** (React + Tailwind CSS with animations)

## 🛠️ Tech Stack
| Layer         | Technology |
|---------------|------------|
| **Frontend**  | React 19, React Router, Tailwind CSS 4.3, Axios, Vite |
| **Backend**   | FastAPI, Google Generative AI, SQLAlchemy, Pydantic |
| **Database**  | MongoDB |
| **Auth**      | JWT, Bcrypt, OAuth2 |
| **Styling**   | Tailwind CSS, Custom Animations |


## 📁 Project Structure
```
ai-email-generator/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── login.jsx      # Authentication page
│   │   │   ├── signup.jsx     # User registration
│   │   │   └── dashboard.jsx  # Main email generator
│   │   ├── components/
│   │   │   └── Navbar.jsx     # Navigation component
│   │   ├── App.jsx            # Main component
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
├── backend/
│   ├── main.py                # FastAPI server & routes
│   ├── auth.py                # JWT & authentication logic
│   ├── database.py            # MongoDB connection
│   ├── models.py              # Database models
│   └── requirements.txt       # Python dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
Make sure you have these installed:
- [Python 3.8+](https://www.python.org/)
- [Node.js 16+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Google Gemini API Key](https://ai.google.dev/)

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd ai-email-generator
```

**2. Backend Setup**
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn google-generativeai sqlalchemy pymongo pydantic python-jose passlib python-multipart python-dotenv

# Create .env file
echo GEMINI_API_KEY=your_api_key_here > .env
echo DATABASE_URL=mongodb://localhost:27017/email_generator >> .env
```

**3. Frontend Setup**
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install
```

**4. Run the Application**

**Start MongoDB** (if local):
```bash
mongod
```

**Start Backend Server:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Start Frontend Dev Server:**
```bash
cd frontend
npm run dev
# Opens at http://localhost:5173
```

## 📖 How to Use

1. **Sign Up** - Create an account with email and password
2. **Login** - Sign in with your credentials
3. **Generate Email** - Fill in:
   - Email context/purpose
   - Select tone (Formal, Professional, Friendly, Apology)
   - Enter your role (HR Manager, Recruiter, etc.)
   - Enter recipient's role (Candidate, Employee, etc.)
4. **Copy & Use** - Click copy button to use the generated email
5. **View History** - Access all your previously generated emails

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/signup` | User registration |
| **POST** | `/login` | User login |
| **POST** | `/generate` | Generate email (requires JWT) |
| **GET** | `/history` | Get user's email history (requires JWT) |
| **GET** | `/` | Health check |

## 🔐 Security Features
✅ **Bcrypt Password Hashing** - Passwords never stored in plain text  
✅ **JWT Authentication** - Secure API endpoints with Bearer tokens  
✅ **Input Validation** - Pydantic validates all requests  
✅ **MongoDB Security** - User data is private and isolated  
✅ **CORS Configuration** - API protection against unauthorized requests

## ⚙️ Environment Variables
Create a `.env` file in the `backend/` folder:
```
GEMINI_API_KEY=your_google_gemini_api_key
DATABASE_URL=mongodb://localhost:27017/email_generator
```

## 🐛 Troubleshooting
| Issue | Solution |
|-------|----------|
| GEMINI_API_KEY not found | Create `.env` file in backend folder |
| Cannot connect to MongoDB | Ensure MongoDB is running or use MongoDB Atlas |
| CORS error in frontend | Verify backend is running on port 8000 |
| Login fails | Check if backend server is running |
| Emails not in history | Ensure you're logged in with valid JWT token |

## 🚀 Deployment
**Backend**: Deploy to Heroku, Railway, or Replit with environment variables  
**Frontend**: Build with `npm run build` and deploy to Vercel or Netlify

## 🎓 Key Highlights
- ✨ **Google Gemini AI** for intelligent email generation
- 👥 **Context-aware** generation based on sender/receiver roles
- 🔐 **Secure** authentication with JWT & Bcrypt
- 📱 **Responsive** and beautiful UI with Tailwind CSS
- 📊 **MongoDB** for scalable data storage
- 🎯 **Production-ready** full-stack application

---

## 👩‍💻 Developed By
**Golconda Greeshma**  
B.E. Computer Science — Neil Gogte Institute of Technology (2023–27)  
GitHub: [github.com/ggreeshma-lab](https://github.com/ggreeshma-lab)

## 📄 License
This project is for educational & portfolio purposes — 2026

---

**Happy Email Generating! 🚀**

