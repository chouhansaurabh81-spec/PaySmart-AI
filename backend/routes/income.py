from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.income import Income
from models.user import User
from schemas.income_schema import IncomeCreate
from middleware.auth_middleware import get_current_user

from schemas.income_schema import IncomeCreate, IncomeUpdate

router = APIRouter()


@router.post("/income")
def add_income(
    income: IncomeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    new_income = Income(
        title=income.title,
        amount=income.amount,
        source=income.source,
        date=income.date,
        description=income.description,
        user_id=user.id
    )

    db.add(new_income)
    db.commit()
    db.refresh(new_income)

    return {
        "message": "Income Added Successfully"
    }

@router.get("/incomes")
def get_all_incomes(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    incomes = db.query(Income).filter(
        Income.user_id == user.id
    ).all()

    return {
        "count": len(incomes),
        "incomes": incomes
    }

@router.get("/income/{income_id}")
def get_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    income = db.query(Income).filter(
        Income.id == income_id,
        Income.user_id == user.id
    ).first()

    if not income:
        return {"message": "Income not found"}

    return income

@router.put("/income/{income_id}")
def update_income(
    income_id: int,
    income: IncomeUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    existing_income = db.query(Income).filter(
        Income.id == income_id,
        Income.user_id == user.id
    ).first()

    if not existing_income:
        return {"message": "Income not found"}

    existing_income.title = income.title
    existing_income.amount = income.amount
    existing_income.source = income.source
    existing_income.date = income.date
    existing_income.description = income.description

    db.commit()
    db.refresh(existing_income)

    return {
        "message": "Income updated successfully",
        "income": existing_income
    }

@router.delete("/income/{income_id}")
def delete_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    income = db.query(Income).filter(
        Income.id == income_id,
        Income.user_id == user.id
    ).first()

    if not income:
        return {"message": "Income not found"}

    db.delete(income)
    db.commit()

    return {
        "message": "Income deleted successfully"
    }