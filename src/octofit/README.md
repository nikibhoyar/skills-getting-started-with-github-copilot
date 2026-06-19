# Octofit Scaffold

This folder contains the starter scaffold for the Octofit application.

## What is included

- `src/octofit/__init__.py`: FastAPI app factory and router registration
- `src/octofit/api.py`: Basic endpoints for service status, workouts, and users
- `src/octofit/models.py`: Pydantic models for `Workout` and `User`

## Run locally

Install dependencies and run:

```bash
pip install -r requirements.txt
uvicorn src.octofit:app --reload --host 127.0.0.1 --port 8000
```

Then view the API:

- `http://127.0.0.1:8000/octofit/status`
- `http://127.0.0.1:8000/octofit/workouts`
- `http://127.0.0.1:8000/octofit/users`
