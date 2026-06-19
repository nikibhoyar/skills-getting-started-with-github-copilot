from fastapi import APIRouter

from .models import Workout, User

router = APIRouter()

@router.get("/status")
def status() -> dict:
    return {"service": "Octofit", "status": "ready"}

@router.get("/workouts")
def list_workouts() -> dict:
    return {
        "workouts": [
            {"id": 1, "name": "Morning Run", "duration_minutes": 30},
            {"id": 2, "name": "Yoga Flow", "duration_minutes": 45},
        ]
    }

@router.get("/users")
def list_users() -> dict:
    return {
        "users": [
            {"id": 1, "email": "ashley@octofit.app", "name": "Ashley"},
            {"id": 2, "email": "jordan@octofit.app", "name": "Jordan"},
        ]
    }
