# Getting Started with GitHub Copilot

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey nikibhoyar!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

## Running tests

Install dependencies and run the suite locally:

```bash
pip install -r requirements.txt
pytest -q
```

## Example Octofit requests

Create a new workout:

```bash
curl -X POST http://localhost:8000/octofit/workouts \
  -H "Content-Type: application/json" \
  -d '{"name": "Strength Training", "duration_minutes": 40}'
```

Create a new user:

```bash
curl -X POST http://localhost:8000/octofit/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Taylor", "email": "taylor@octofit.app"}'
```

Expected response shape for workout creation:

```json
{
  "id": 3,
  "name": "Strength Training",
  "duration_minutes": 40
}
```

Expected response shape for user creation:

```json
{
  "id": 3,
  "name": "Taylor",
  "email": "taylor@octofit.app"
}
```

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/nikibhoyar/skills-getting-started-with-github-copilot/issues/1)

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

