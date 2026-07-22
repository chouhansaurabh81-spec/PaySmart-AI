from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import get_db
from models.user import User
from utils.password import hash_password
from schemas.user_schema import RegisterUser, LoginUser, UpdateProfile
from utils.password import verify_password
from utils.jwt_handler import create_access_token 
from middleware.auth_middleware import get_current_user

from schemas.user_schema import ChangePassword
from utils.password import verify_password, hash_password

router = APIRouter()


@router.post("/register")
def register(user: RegisterUser, db: Session = Depends(get_db)):

    new_user = User(
        fullname=user.fullname,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }

@router.post("/login")
def login(user: LoginUser, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        return {"message": "User not found"}

    if not verify_password(user.password, db_user.password):
        return {"message": "Invalid Password"}

    token = create_access_token(
       {"sub": db_user.email}
)

    return {
    "message": "Login Successful",
    "access_token": token,
    "token_type": "Bearer"
}

@router.get("/profile")
def profile(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    return {
        "fullname": db_user.fullname,
        "email": db_user.email
    }

@router.put("/profile")
def update_profile(
    profile: UpdateProfile,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    user.fullname = profile.fullname
    user.email = profile.email

    db.commit()
    db.refresh(user)

    return {
        "message": "Profile Updated Successfully",
        "user": {
            "fullname": user.fullname,
            "email": user.email
        }
    }

@router.put("/change-password")
def change_password(
    password_data: ChangePassword,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    user = db.query(User).filter(
        User.email == current_user["sub"]
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    if not verify_password(
        password_data.current_password,
        user.password
    ):
        return {
            "message": "Current password is incorrect"
        }

    if password_data.new_password != password_data.confirm_password:
        return {
            "message": "New password and Confirm password do not match"
        }

    user.password = hash_password(password_data.new_password)

    db.commit()

    return {
        "message": "Password changed successfully"
    }