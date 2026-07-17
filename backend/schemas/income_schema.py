from pydantic import BaseModel
from datetime import date


class IncomeCreate(BaseModel):
    title: str
    amount: float
    source: str
    date: date
    description: str

class IncomeUpdate(BaseModel):
    title: str
    amount: float
    source: str
    date: date
    description: str