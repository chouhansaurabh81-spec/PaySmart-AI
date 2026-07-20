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

    return [
    {
        "month": row.month,
        "total_income": float(row.total_income)
    }
    for row in result
]


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

    return [
    {
        "month": row.month,
        "total_expense": float(row.total_expense)
    }
    for row in result
]

@router.get("/analytics/summary")
def analytics_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = (
        db.query(User)
        .filter(User.email == current_user["sub"])
        .first()
    )

    if not user:
        return {
            "total_income": 0,
            "total_expense": 0,
            "balance": 0
        }

    total_income = (
        db.query(func.coalesce(func.sum(Income.amount), 0))
        .filter(Income.user_id == user.id)
        .scalar()
    )

    total_expense = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(Expense.user_id == user.id)
        .scalar()
    )

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": total_income - total_expense
    }

@router.get("/analytics/category-expense")
def category_expense(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = (
        db.query(User)
        .filter(User.email == current_user["sub"])
        .first()
    )

    if not user:
        return []

    result = (
        db.query(
            Expense.category.label("category"),
            func.sum(Expense.amount).label("total")
        )
        .filter(Expense.user_id == user.id)
        .group_by(Expense.category)
        .order_by(func.sum(Expense.amount).desc())
        .all()
    )

    return [
    {
        "category": row.category,
        "total": float(row.total)
    }
    for row in result
]