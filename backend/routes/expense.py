from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.expense import Expense
from schemas.expense_schema import ExpenseCreate

from models.user import User
from middleware.auth_middleware import get_current_user

from schemas.expense_schema import ExpenseCreate, ExpenseUpdate

from sqlalchemy import func

router = APIRouter()


@router.post("/expense")
def add_expense( expense: ExpenseCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):

    user = db.query(User).filter(User.email == current_user["sub"]).first()

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

    return {
        "message": "Expense Added Successfully"
    }

@router.get("/expenses")
def get_all_expenses(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    expenses = db.query(Expense).filter(
        Expense.user_id == user.id
    ).all()

    return {
        "count": len(expenses),
        "expenses": expenses
    }

@router.get("/expense/{expense_id}")
def get_expense(expense_id: int, db: Session = Depends(get_db)):

    expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

    if not expense:
        return {
            "message": "Expense Not Found"
        }

    return expense

@router.put("/expense/{expense_id}")
def update_expense(
    expense_id: int,
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):

    db_expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

    if not db_expense:
        return {
            "message": "Expense Not Found"
        }

    db_expense.title = expense.title
    db_expense.amount = expense.amount
    db_expense.category = expense.category
    db_expense.date = expense.date
    db_expense.description = expense.description

    db.commit()
    db.refresh(db_expense)

    return {
        "message": "Expense Updated Successfully"
    }

@router.delete("/expense/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):

    expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

    if not expense:
        return {
            "message": "Expense Not Found"
        }

    db.delete(expense)
    db.commit()

    return {
        "message": "Expense Deleted Successfully"
    }

@router.put("/expense/{expense_id}")
def update_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

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
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user.id
    ).first()

    if not expense:
        return {"message": "Expense not found"}

    db.delete(expense)
    db.commit()

    return {
        "message": "Expense deleted successfully"
    }

@router.get("/expense-summary")
def expense_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

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