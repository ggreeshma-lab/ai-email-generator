# ── Imports ──────────────────────────────────────────────
import os
from dotenv import load_dotenv

import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator

# ── Load environment variables ────────────────────────────
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found. Check your .env file.")

# ── Configure Gemini ──────────────────────────────────────
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-3.5-flash")


# ── FastAPI app ───────────────────────────────────────────
app = FastAPI(
    title="Email Generator",
    description="Generate professional emails using Gemini AI",
    version="1.0.0",
)

# ── CORS ──────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request schema ────────────────────────────────────────
class EmailRequest(BaseModel):
    prompt: str
    tone: str

    @validator("prompt", "tone")
    def must_not_be_empty(cls, v, field):
        if not v.strip():
            raise ValueError(f"'{field.name}' must not be empty or whitespace")
        return v.strip()

# ── Health check ──────────────────────────────────────────
@app.get("/")
async def health_check():
    return {"status": "ok", "message": "Email Generator API is running"}

# ── Main route ────────────────────────────────────────────
@app.post("/generate")
async def generate_email(data: EmailRequest):
    try:
        final_prompt = f"""
        Write a professional {data.tone} email.

        Topic:
        {data.prompt}

        Guidelines:
        - Keep it clear and concise
        - Use proper email structure (subject, greeting, body, closing)
        - Match the tone: {data.tone}
        """

        response = model.generate_content(final_prompt)

        # Guard: Gemini may block or return empty response
        if not response.candidates:
            raise HTTPException(
                status_code=502,
                detail="Gemini returned no response. Try rephrasing your prompt.",
            )

        return {
            "success": True,
            "tone": data.tone,
            "generated_email": response.text,
        }

    except HTTPException:
        raise  # re-raise intentional errors as-is

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}",
        )
