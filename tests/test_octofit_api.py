from fastapi.testclient import TestClient
from src.app import app

client = TestClient(app)


def test_octofit_status():
    response = client.get("/octofit/status")
    assert response.status_code == 200
    assert response.json() == {"service": "Octofit", "status": "ready"}


def test_list_workouts():
    response = client.get("/octofit/workouts")
    assert response.status_code == 200
    data = response.json()
    assert "workouts" in data
    assert isinstance(data["workouts"], list)
    assert any(workout["name"] == "Morning Run" for workout in data["workouts"])


def test_create_workout():
    new_workout = {"name": "Strength Training", "duration_minutes": 40}
    response = client.post("/octofit/workouts", json=new_workout)
    assert response.status_code == 200
    created = response.json()
    assert created["name"] == new_workout["name"]
    assert created["duration_minutes"] == new_workout["duration_minutes"]
    assert response.json()["id"] > 0

    follow_up = client.get("/octofit/workouts")
    assert any(workout["name"] == new_workout["name"] for workout in follow_up.json()["workouts"])


def test_list_users():
    response = client.get("/octofit/users")
    assert response.status_code == 200
    data = response.json()
    assert "users" in data
    assert isinstance(data["users"], list)
    assert any(user["email"] == "ashley@octofit.app" for user in data["users"])


def test_create_user():
    new_user = {"name": "Taylor", "email": "taylor@octofit.app"}
    response = client.post("/octofit/users", json=new_user)
    assert response.status_code == 200
    created = response.json()
    assert created["name"] == new_user["name"]
    assert created["email"] == new_user["email"]

    follow_up = client.get("/octofit/users")
    assert any(user["email"] == new_user["email"] for user in follow_up.json()["users"])


def test_create_user_duplicate_email_fails():
    duplicate_user = {"name": "Taylor", "email": "ashley@octofit.app"}
    response = client.post("/octofit/users", json=duplicate_user)
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already exists"
