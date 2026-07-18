from fastapi import FastAPI
from database.database import engine, Base
from models.user import User
from routes.auth import router
from models.expense import Expense
from routes.expense import router as expense_router
from routes.income import router as income_router
from routes.dashboard import router as dashboard_router
from routes.analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)

app.include_router(expense_router)

app.include_router(income_router)

app.include_router(dashboard_router)

app.include_router(analytics_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5179"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to PaySmart AI Backend 🚀"
    }