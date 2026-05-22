from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    password = Column(String)

class EmailHistory(Base):

    __tablename__ = "email_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    prompt = Column(String)
    tone = Column(String)
    generated_email = Column(String)