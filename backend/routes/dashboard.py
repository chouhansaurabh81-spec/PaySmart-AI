from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from middleware.auth_middleware import get_current_user
from models.user import User
from models.income import Income
from models.expense import Expense

router = APIRouter()

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    incomes = db.query(Income).filter(
        Income.user_id == user.id
    ).all()

    expenses = db.query(Expense).filter(
        Expense.user_id == user.id
    ).all()

    total_income = sum(i.amount for i in incomes)
    total_expense = sum(e.amount for e in expenses)

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": total_income - total_expense
    }