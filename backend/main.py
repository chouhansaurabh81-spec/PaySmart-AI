from fastapi import FastAPI
from database.database import engine, Base
from models.user import User
from routes.auth import router
from models.expense import Expense
from routes.expense import router as expense_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)

app.include_router(expense_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to PaySmart AI Backend 🚀"
    }