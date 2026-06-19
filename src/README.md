# Mergington High School Activities API

A super simple FastAPI application that allows students to view and sign up for extracurricular activities.

## Features

- View all available extracurricular activities
- Sign up for activities

## Getting Started

1. Install the dependencies:

   ```
   pip install fastapi uvicorn
   ```

2. Run the application:

   ```
   python app.py
   ```

3. Open your browser and go to:
   - API documentation: http://localhost:8000/docs
   - Alternative documentation: http://localhost:8000/redoc

## Testing

Install test dependencies and run the suite:

```bash
pip install -r ../requirements.txt
pytest -q
```

## API Endpoints

| Method | Endpoint                                                          | Description                                                         |
| ------ | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| GET    | `/activities`                                                     | Get all activities with their details and current participant count |
| POST   | `/activities/{activity_name}/signup?email=student@mergington.edu` | Sign up for an activity                                             |
| GET    | `/octofit/status`                                                 | Check Octofit service availability                                  |
| GET    | `/octofit/workouts`                                               | List example Octofit workouts                                       |
| POST   | `/octofit/workouts`                                               | Create a new Octofit workout                                        |
| GET    | `/octofit/users`                                                  | List example Octofit users                                          |
| POST   | `/octofit/users`                                                  | Create a new Octofit user                                            |

## Octofit Scaffold

The repository also includes an Octofit scaffold under `src/octofit`.
It provides a small fitness API with sample workouts, users, and creation routes.

## Data Model

The application uses a simple data model with meaningful identifiers:

1. **Activities** - Uses activity name as identifier:

   - Description
   - Schedule
   - Maximum number of participants allowed
   - List of student emails who are signed up

2. **Students** - Uses email as identifier:
   - Name
   - Grade level

All data is stored in memory, which means data will be reset when the server restarts.
