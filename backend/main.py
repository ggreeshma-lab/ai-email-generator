# ── Imports ──────────────────────────────────────────────
from auth import (
    hash_password,
    verify_password,
    create_access_token
)

from models import User
import os
from dotenv import load_dotenv

import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator

from database import SessionLocal, engine
from models import EmailHistory, Base

# ── Load environment variables ────────────────────────────
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found. Check your .env file.")

# ── Configure Gemini ──────────────────────────────────────
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-3.5-flash")  # ✅ fixed: gemini-3.5-flash does not exist

# ── Create Database Tables ────────────────────────────────
Base.metadata.create_all(bind=engine)

# ── FastAPI app ───────────────────────────────────────────
app = FastAPI(
    title="Email Generator",
    description="Generate professional emails using Gemini AI",
    version="1.0.0",
)
Base.metadata.create_all(bind=engine)
# ── CORS ──────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request Schema ────────────────────────────────────────
class EmailRequest(BaseModel):
    prompt: str
    tone: str

    @validator("prompt", "tone")
    def must_not_be_empty(cls, v, field):
        if not v.strip():
            raise ValueError(f"'{field.name}' must not be empty")
        return v.strip()

# ── Health Check ──────────────────────────────────────────
@app.get("/")
async def health_check():
    return {"status": "ok", "message": "Email Generator API is running"}

# ── Generate Email Route ──────────────────────────────────
@app.post("/generate")
async def generate_email(data: EmailRequest):

    final_prompt = f"""
    Write a professional {data.tone} email.

    Topic:
    {data.prompt}

    Keep it clear and concise.
    """

    response = model.generate_content(final_prompt)

    generated_text = ""

    if response and hasattr(response, "text"):
        generated_text = response.text
    else:
        generated_text = "No response generated."

    # Save to database
    db = SessionLocal()

    new_email = EmailHistory(
        prompt=data.prompt,
        tone=data.tone,
        generated_email=generated_text
    )

    db.add(new_email)
    db.commit()

    return {
        "generated_email": generated_text
    }
@app.get("/history")
def get_history():

    db = SessionLocal()

    emails = db.query(EmailHistory).all()

    return emails
class SignupRequest(BaseModel):

    email: str
    password: str

@app.post("/signup")
def signup(data: SignupRequest):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:

        return {
            "message": "User already exists"
        }

    new_user = User(
        email=data.email,
        password=hash_password(data.password)
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "User created successfully"
    }

@app.post("/login")
def login(data: SignupRequest):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:

        return {
            "message": "Invalid email"
        }

    if not verify_password(
        data.password,
        user.password
    ):

        return {
            "message": "Invalid password"
        }

    token = create_access_token(
        {"user_id": user.id}
    )

    return {
        "access_token": token
    }