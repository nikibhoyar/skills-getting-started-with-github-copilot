from fastapi import FastAPI

from .api import router


def create_app() -> FastAPI:
    app = FastAPI(
        title="Octofit",
        description="Octofit fitness app scaffold for tracking workouts and users",
        version="0.1.0",
    )
    app.include_router(router, prefix="/octofit")
    return app


app = create_app()
