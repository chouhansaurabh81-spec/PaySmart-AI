from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database.database import get_db
from middleware.auth_middleware import get_current_user
from models.user import User
from models.expense import Expense
from models.income import Income

router = APIRouter()


@router.get("/analytics/monthly-income")
def monthly_income(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    result = (
        db.query(
            func.to_char(Income.date, "YYYY-MM").label("month"),
            func.sum(Income.amount).label("total_income")
        )
        .filter(Income.user_id == user.id)
        .group_by(func.to_char(Income.date, "YYYY-MM"))
        .order_by(func.to_char(Income.date, "YYYY-MM"))
        .all()
    )

    return result

@router.get("/analytics/monthly-expense")
def monthly_expense(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    result = (
        db.query(
            func.to_char(Expense.date, "YYYY-MM").label("month"),
            func.sum(Expense.amount).label("total_expense")
        )
        .filter(Expense.user_id == user.id)
        .group_by(func.to_char(Expense.date, "YYYY-MM"))
        .order_by(func.to_char(Expense.date, "YYYY-MM"))
        .all()
    )

    return result