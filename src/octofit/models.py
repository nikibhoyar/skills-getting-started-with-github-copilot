from pydantic import BaseModel


class Workout(BaseModel):
    id: int
    name: str
    duration_minutes: int


class CreateWorkout(BaseModel):
    name: str
    duration_minutes: int


class User(BaseModel):
    id: int
    name: str
    email: str


class CreateUser(BaseModel):
    name: str
    email: str
