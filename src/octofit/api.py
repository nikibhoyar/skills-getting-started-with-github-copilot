from fastapi import APIRouter, HTTPException
from typing import List

from .models import Workout, CreateWorkout, User, CreateUser

router = APIRouter()

workouts: List[Workout] = [
    Workout(id=1, name="Morning Run", duration_minutes=30),
    Workout(id=2, name="Yoga Flow", duration_minutes=45),
]

users: List[User] = [
    User(id=1, name="Ashley", email="ashley@octofit.app"),
    User(id=2, name="Jordan", email="jordan@octofit.app"),
]

@router.get("/status")
def status() -> dict:
    return {"service": "Octofit", "status": "ready"}

@router.get("/workouts")
def list_workouts() -> dict:
    return {"workouts": [workout.model_dump() for workout in workouts]}

@router.post("/workouts", response_model=Workout)
def create_workout(workout: CreateWorkout) -> Workout:
    new_id = max((item.id for item in workouts), default=0) + 1
    new_workout = Workout(id=new_id, **workout.model_dump())
    workouts.append(new_workout)
    return new_workout

@router.get("/users")
def list_users() -> dict:
    return {"users": [user.model_dump() for user in users]}

@router.post("/users", response_model=User)
def create_user(user: CreateUser) -> User:
    if any(existing.email == user.email for existing in users):
        raise HTTPException(status_code=400, detail="Email already exists")

    new_id = max((item.id for item in users), default=0) + 1
    new_user = User(id=new_id, **user.model_dump())
    users.append(new_user)
    return new_user
