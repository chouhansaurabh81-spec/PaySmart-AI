from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from database.database import get_db
from middleware.auth_middleware import get_current_user
from models.expense import Expense
from models.user import User
from schemas.expense_schema import ExpenseCreate, ExpenseUpdate

router = APIRouter()


def get_logged_in_user(db: Session, current_user):
    return db.query(User).filter(
        User.email == current_user["sub"]
    ).first()


@router.post("/expense")
def add_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = get_logged_in_user(db, current_user)

    new_expense = Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        date=expense.date,
        description=expense.description,
        user_id=user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return {"message": "Expense Added Successfully"}


@router.get("/expenses")
def get_all_expenses(
    search: str = Query(default=""),
    category: str = Query(default=""),
    from_date: str = Query(default=""),
    to_date: str = Query(default=""),
    min_amount: float | None = None,
    max_amount: float | None = None,
    sort: str = Query(default="latest"),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = get_logged_in_user(db, current_user)

    query = db.query(Expense).filter(
        Expense.user_id == user.id
    )

    if search:
        query = query.filter(
            Expense.title.ilike(f"%{search}%") |
            Expense.category.ilike(f"%{search}%")
        )

    if category:
        query = query.filter(
            Expense.category == category
        )

    if from_date:
        query = query.filter(
            Expense.date >= from_date
        )

    if to_date:
        query = query.filter(
            Expense.date <= to_date
        )

    if min_amount is not None:
        query = query.filter(
            Expense.amount >= min_amount
        )

    if max_amount is not None:
        query = query.filter(
            Expense.amount <= max_amount
        )

    if sort == "oldest":
        query = query.order_by(Expense.date.asc())
    else:
        query = query.order_by(Expense.date.desc())

    expenses = query.all()

    return {
        "count": len(expenses),
        "expenses": expenses
    }


@router.get("/expense/{expense_id}")
def get_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = get_logged_in_user(db, current_user)

    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user.id
    ).first()

    if not expense:
        return {"message": "Expense Not Found"}

    return expense


@router.put("/expense/{expense_id}")
def update_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = get_logged_in_user(db, current_user)

    existing_expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user.id
    ).first()

    if not existing_expense:
        return {"message": "Expense not found"}

    existing_expense.title = expense.title
    existing_expense.amount = expense.amount
    existing_expense.category = expense.category
    existing_expense.date = expense.date
    existing_expense.description = expense.description

    db.commit()
    db.refresh(existing_expense)

    return {
        "message": "Expense updated successfully",
        "expense": existing_expense
    }


@router.delete("/expense/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = get_logged_in_user(db, current_user)

    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user.id
    ).first()

    if not expense:
        return {"message": "Expense not found"}

    db.delete(expense)
    db.commit()

    return {"message": "Expense deleted successfully"}


@router.get("/expense-summary")
def expense_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = get_logged_in_user(db, current_user)

    summary = (
        db.query(
            Expense.category,
            func.sum(Expense.amount).label("total")
        )
        .filter(Expense.user_id == user.id)
        .group_by(Expense.category)
        .all()
    )

    return [
        {
            "category": category,
            "total": total
        }
        for category, total in summary
    ]