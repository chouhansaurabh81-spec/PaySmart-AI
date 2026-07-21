from pydantic import BaseModel, EmailStr


class RegisterUser(BaseModel):
    fullname: str
    email: EmailStr
    password: str

class LoginUser(BaseModel):
    email: EmailStr
    password: str

class UpdateProfile(BaseModel):
    fullname: str
    email: EmailStr