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

class ChangePassword(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str