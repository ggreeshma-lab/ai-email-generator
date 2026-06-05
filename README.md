# 📧 AI Email Generator

A web-based application that helps users generate professional and personalized emails using Google Gemini AI. Users can customize the email tone, define sender and receiver roles, and maintain a history of generated emails for future reference.

## 📌 Features
* 🤖 AI-powered email generation using Google Gemini API
* 👥 Role-based email generation (Sender & Receiver context)
* 🎨 Multiple tone options (Formal, Professional, Friendly, Apology)
* 🔐 Secure User Authentication (JWT + Bcrypt)
* 📚 Email History Management
* 📋 One-click email copy functionality
* 🛡️ Protected routes using JWT authentication
* 📱 Responsive and user-friendly interface


## 🛠️ Tech Stack
| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| Frontend       | React, React Router, Tailwind CSS, Axios, Vite   |
| Backend        | FastAPI, Google Gemini API, SQLAlchemy, Pydantic |
| Database       | SQLite                                           |
| Authentication | JWT, Bcrypt, OAuth2                              |
| AI Model       | Google Gemini                                    |


## 📁 Project Structure
```text
ai-email-generator/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── models.py
│   ├── database.py
│   ├── emails.db
│   └── requirements.txt
│
├── screenshots/
│   ├── login.png
│   ├── signup.png
│   ├── dashboard.png
│   ├── generated-email.png
│   └── history.png
│
└── README.md
```


## 🚀 Getting Started
### Prerequisites
Make sure you have these installed:

* Python 3.10+
* Node.js 16+
* Google Gemini API Key

### Installation
**1. Clone the repository**

```bash
git clone https://github.com/ggreeshma-lab/ai-email-generator.git
cd ai-email-generator
```

**2. Backend Setup**

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside the backend folder:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
uvicorn main:app --reload
```

**3. Frontend Setup**
```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

Backend runs at:

```text
http://localhost:8000
```


## 📖 How to Use
1. Create a new account.
2. Login with your credentials.
3. Enter the purpose or content of the email.
4. Select the desired tone.
5. Specify:

   * Sender Role
   * Receiver Role
6. Click **Generate Email**.
7. Copy the generated email.
8. View previously generated emails in the **History** section.


## 🔗 API Endpoints
| Method | Endpoint    | Description             |
| ------ | ----------- | ----------------------- |
| POST   | `/signup`   | Register a new user     |
| POST   | `/login`    | User login              |
| POST   | `/generate` | Generate email using AI |
| GET    | `/history`  | Retrieve email history  |
| GET    | `/`         | Health check            |


## 🔐 Security Features
* JWT-based authentication
* Password hashing using Bcrypt
* Protected API routes
* Input validation using Pydantic
* User-specific email history


## 📷 Screenshots
### Login Page

<img width="1918" height="970" alt="Screenshot 2026-06-05 121503" src="https://github.com/user-attachments/assets/c8deb82d-db06-4321-b1b4-ad12efe6b35b" />


### Signup Page

<img width="1907" height="958" alt="Screenshot 2026-06-05 121552" src="https://github.com/user-attachments/assets/de642e36-d253-44ba-a371-f423ed94d312" />


### Dashboard

<img width="1897" height="953" alt="Screenshot 2026-06-05 121524" src="https://github.com/user-attachments/assets/d0e5fb70-d076-4728-9a65-dbeef0a4768d" />


### Generated Email

<img width="1895" height="918" alt="Screenshot 2026-06-05 121737" src="https://github.com/user-attachments/assets/504a3b99-f560-40cb-b135-f59b0e0efd0f" />


### Email History

<img width="1898" height="956" alt="Screenshot 2026-06-05 121755" src="https://github.com/user-attachments/assets/63c4e627-89bc-4f06-8457-57f5f533594d" />


## 🎯 Key Highlights
* Integrated Google Gemini API for email generation
* Context-aware emails using sender and receiver roles
* Secure authentication with JWT and Bcrypt
* Email history storage and retrieval
* Responsive UI built with React and Tailwind CSS
* Full-stack development using FastAPI and React


## 👩‍💻 Developed By
**Golconda Greeshma**
B.E. Computer Science Engineering
Neil Gogte Institute of Technology (2023–27)

GitHub: https://github.com/ggreeshma-lab


## 📄 License
This project is for educational and portfolio purposes.
